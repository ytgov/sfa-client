<template>
  <div class="home">
    <div class="row">
      <div class="col-md-12">
        <v-card class="default">
          <v-card-title>Residences</v-card-title>
          <v-card-text>
            <vue-editable-grid
              class="my-grid-class"
              ref="grid"
              id="mygrid"
              :column-defs="columnDefs"
              :row-data="application.residences"
              row-data-key="shipmentId"
              :enable-filters="false"
              :multiple-selection="false"
              @cell-updated="cellUpdated"
              @link-clicked="linkClicked"
            >
            </vue-editable-grid>
            <v-subheader style="height: 28px"
              >* Double-click cell to edit</v-subheader
            >

            <v-btn color="info" @click="addResidence()">Add residence</v-btn>

            <hr class="mt-5 mb-2" />

            <div class="row">
              <div class="col-md-6">
                <h3>Canadian resident from</h3>
                <div class="row">
                  <div class="col-md-6">
                    <v-select
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Year"
                      :items="yearOptions"
                      v-model="canadian_from_year"
                    ></v-select>
                  </div>

                  <div class="col-md-6">
                    <v-select
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Month"
                      :items="monthOptions"
                      v-model="canadian_from_month"
                    ></v-select>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <h3>Yukon resident from</h3>
                <div class="row">
                  <div class="col-md-6">
                    <v-select
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Year"
                      :items="yearOptions"
                      v-model="yukon_from_year"
                    ></v-select>
                  </div>

                  <div class="col-md-6">
                    <v-select
                      outlined
                      dense
                      background-color="white"
                      hide-details
                      label="Month"
                      :items="monthOptions"
                      v-model="yukon_from_month"
                    ></v-select>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <div class="col-md-6">
        <v-card class="default mb-5">
          <v-card-title>Tax Year 1</v-card-title>
          <v-card-text>
            <div class="row">
              <div class="col-md-6">
                <v-select
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Year"
                  :items="yearOptionNums"
                  v-model="application.TAXES_FILED_YEAR1"
                ></v-select>
              </div>
              <div class="col-md-6">
                <v-select
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Where taxes filed"
                  v-model="application.TAXES_FILED1_PROVINCE_ID"
                  :items="provinceOptions"
                  item-text="DESCRIPTION"
                  item-value="PROVINCE_ID"
                ></v-select>
              </div>
              <div class="col-md-6 pt-0">
                <v-switch
                  outlined
                  dense
                  hide-details
                  label="Taxes not filed"
                  v-model="application.TAXES_NOT_FILED_YR1_FLG"
                ></v-switch>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <div class="col-md-6">
        <v-card class="default mb-5">
          <v-card-title>Tax Year 2</v-card-title>
          <v-card-text>
            <div class="row">
              <div class="col-md-6">
                <v-select
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Year"
                  :items="yearOptionNums"
                  v-model="application.TAXES_FILED_YEAR2"
                ></v-select>
              </div>
              <div class="col-md-6">
                <v-select
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Where taxes filed"
                  v-model="application.TAXES_FILED2_PROVINCE_ID"
                  :items="provinceOptions"
                  item-text="DESCRIPTION"
                  item-value="PROVINCE_ID"
                ></v-select>
              </div>
              <div class="col-md-6 pt-0">
                <v-switch
                  outlined
                  dense
                  hide-details
                  label="Taxes not filed"
                  v-model="application.TAXES_NOT_FILED_YR2_FLG"
                ></v-switch>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<style>
.my-grid-class {
  background-color: white;
  border: 1px #999 solid;
  border-radius: 4px;
  min-height: 200px;
  color: #000000de;
}
.my-grid-class .grid-tools {
  height: 45px !important;
  padding-left: 10px;
  display: none;
}
</style>
<script>
import moment from "moment";
import store from "../store";
import axios from "axios";
import { CITY_URL, PROVINCE_URL } from "../urls";

export default {
  name: "Home",
  computed: {
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  data: () => ({
    cityOptions: [],
    countryOptions: ["Canada", "United States"],
    provinceOptions: [],
    inSchoolOptions: ["Not in School", "Full Time", "Part Time"],
    monthOptions: [],
    yearOptions: [],
    yearOptionNums: [],

    canadian_from_year: null,
    canadian_from_month: null,
    yukon_from_year: null,
    yukon_from_month: null,
    tax_year_1: {
      year: null,
      where_filed: "",
      taxes_not_filed: false,
    },
    tax_year_2: {
      year: null,
      where_filed: "",
      taxes_not_filed: false,
    },
    columnDefs: [
      {
        sortable: true,
        filter: true,
        field: "FROM_YEAR",
        headerName: "From year",
        type: "select",
        editable: true,
      },
      {
        sortable: true,
        filter: true,
        field: "FROM_MONTH",
        headerName: "From month",
        editable: true,
        type: "select",
      },
      {
        sortable: true,
        filter: true,
        field: "TO_YEAR",
        headerName: "To year",
        type: "select",
        editable: true,
      },
      {
        sortable: true,
        filter: true,
        field: "TO_MONTH",
        headerName: "To month",
        editable: true,
        type: "select",
        maxlength: 30,
      },
      {
        sortable: true,
        filter: true,
        field: "CITY_ID",
        headerName: "City",
        type: "select",
        editable: true,
      },
      {
        sortable: true,
        filter: true,
        field: "PROVINCE_ID",
        headerName: "Province",
        editable: true,
        type: "select",
      },
      {
        sortable: true,
        filter: true,
        field: "IN_SCHOOL",
        headerName: "In school",
        editable: true,
        type: "select",
        maxlength: 30,
      },
      {
        sortable: false,
        filter: false,
        field: "remove",
        headerName: "Remove",
        type: "link",
        editable: false,
      },
    ],
  }),
  async created() {
    this.loadCities();
    this.loadProvinces();
    this.monthOptions = [];
    this.yearOptions = [];
    this.yearOptionNums = [];

    for (let i = 1; i <= 12; i++) {
      let m = `0${i}`;
      this.monthOptions.push(m.substring(m.length - 2));
    }

    let startYear = 1960;
    let currentYear = moment().year();

    for (let i = currentYear; i >= startYear; i--) {
      this.yearOptions.push(`${i}`);
      this.yearOptionNums.push(i);
    }

    this.columnDefs[0].selectOptions = this.columnDefs[2].selectOptions =
      this.yearOptions.map((y) => {
        return { value: y, text: y };
      });

    this.columnDefs[1].selectOptions = this.columnDefs[3].selectOptions =
      this.monthOptions.map((y) => {
        return { value: y, text: y };
      });

    this.columnDefs[5].selectOptions = this.provinceOptions.map((y) => {
      return { value: y, text: y };
    });

    this.columnDefs[6].selectOptions = this.inSchoolOptions.map((y) => {
      return { value: y, text: y };
    });
  },
  methods: {
    loadCities() {
      axios.get(CITY_URL).then((resp) => {
        this.cityOptions = resp.data;

        this.columnDefs[4].selectOptions = this.cityOptions.map((y) => {
          return { value: y.CITY_ID, text: y.DESCRIPTION };
        });
        console.log(this.cityOptions.length, this.columnDefs[4]);
      });
    },
    loadProvinces() {
      axios.get(PROVINCE_URL).then((resp) => {
        this.provinceOptions = resp.data;
      });
    },
    addResidence() {
      this.application.residences.push({ remove: "Remove" });
    },
    removeResidence(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this residence.",
        () => {
          this.application.residences.splice(index, 1);
        },
        () => {}
      );
    },

    cellUpdated(item) {
      console.log("UPDATED", item);
    },
    rowSelected(item) {
      console.log("SELECTED", item);
    },
    linkClicked(item) {
      this.removeResidence(item.rowIndex);
    },
    doSaveStudent(field, value) {
      store.dispatch("updateStudent", [field, value, this]);
    },
  },
};
</script>
