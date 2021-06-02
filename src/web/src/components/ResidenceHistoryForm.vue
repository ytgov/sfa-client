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
              :row-data="residences"
              row-data-key="shipmentId"
              :enable-filters="false"
              :multiple-selection="false"
              @cell-updated="cellUpdated"
              @link-clicked="linkClicked"
            >
            </vue-editable-grid>
            <v-subheader style="height: 28px">* Double-click cell to edit</v-subheader>

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
                  :items="yearOptions"
                  v-model="tax_year_1.year"
                ></v-select>
              </div>
              <div class="col-md-6">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Where taxes filed"
                  v-model="tax_year_1.where_filed"
                ></v-text-field>
              </div>
              <div class="col-md-6 pt-0">
                <v-switch
                  outlined
                  dense
                  hide-details
                  label="Taxes not filed"
                  v-model="tax_year_1.taxes_not_filed"
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
                  :items="yearOptions"
                  v-model="tax_year_2.year"
                ></v-select>
              </div>
              <div class="col-md-6">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  hide-details
                  label="Where taxes filed"
                  v-model="tax_year_2.where_filed"
                ></v-text-field>
              </div>
              <div class="col-md-6 pt-0">
                <v-switch
                  outlined
                  dense
                  hide-details
                  label="Taxes not filed"
                  v-model="tax_year_2.taxes_not_filed"
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

export default {
  name: "Home",
  data: () => ({
    countryOptions: ["Canada", "United States"],
    provinceOptions: ["Yukon", "British Columbia"],
    inSchoolOptions: ["Not in School", "Full Time", "Part Time"],
    monthOptions: [],
    yearOptions: [],

    residences: [
      {
        from_year: "2020",
        from_month: "06",
        to_year: "2021",
        to_month: "12",
        city: "Vancouver",
        province: "British Columbia",
        in_school: "Full Time",
        remove: "Remove",
      },
    ],

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
        field: "from_year",
        headerName: "From year",
        type: "select",
        editable: true,
      },
      {
        sortable: true,
        filter: true,
        field: "from_month",
        headerName: "From month",
        editable: true,
        type: "select",
      },
      {
        sortable: true,
        filter: true,
        field: "to_year",
        headerName: "To year",
        type: "select",
        editable: true,
      },
      {
        sortable: true,
        filter: true,
        field: "to_month",
        headerName: "To month",
        editable: true,
        type: "select",
        maxlength: 30,
      },
      {
        sortable: true,
        filter: true,
        field: "city",
        headerName: "City",
        editable: true,
      },
      {
        sortable: true,
        filter: true,
        field: "province",
        headerName: "Province",
        editable: true,
        type: "select",
      },
      {
        sortable: true,
        filter: true,
        field: "in_school",
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
    this.monthOptions = [];
    this.yearOptions = [];

    for (let i = 1; i <= 12; i++) {
      let m = `0${i}`;
      this.monthOptions.push(m.substring(m.length - 2));
    }

    let startYear = 1960;
    let currentYear = moment().year();

    for (let i = currentYear; i >= startYear; i--) {
      this.yearOptions.push(`${i}`);
    }

    this.columnDefs[0].selectOptions = this.columnDefs[2].selectOptions = this.yearOptions.map(
      (y) => {
        return { value: y, text: y };
      }
    );

    this.columnDefs[1].selectOptions = this.columnDefs[3].selectOptions = this.monthOptions.map(
      (y) => {
        return { value: y, text: y };
      }
    );

    this.columnDefs[5].selectOptions = this.provinceOptions.map((y) => {
      return { value: y, text: y };
    });
    this.columnDefs[6].selectOptions = this.inSchoolOptions.map((y) => {
      return { value: y, text: y };
    });
  },
  methods: {
    addResidence() {
      this.residences.push({ remove: "Remove" });
    },
    removeResidence(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this residence.",
        () => {
          this.residences.splice(index, 1);
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
  },
};
</script>
