<template>
  <div class="home">
    <div class="row">
      <div class="col-md-12">
        <v-card class="default">
          <v-card-title>Residences</v-card-title>
          <v-card-text>
            <div class="mb-5" v-for="(item, i) of residences" :key="i">
              <div class="row pb-3">
                <div class="col-md-3">
                  <v-select
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="From year"
                    v-model="item.from_year"
                    :items="yearOptions"
                  ></v-select>
                </div>

                <div class="col-md-2">
                  <v-select
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="From month"
                    v-model="item.from_month"
                    :items="monthOptions"
                  ></v-select>
                </div>
                <div class="col-md-3">
                  <v-select
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="To year"
                    v-model="item.to_year"
                    :items="yearOptions"
                  ></v-select>
                </div>
                <div class="col-md-2">
                  <v-select
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="To month"
                    v-model="item.to_month"
                    :items="monthOptions"
                  ></v-select>
                </div>
                <div class="col-md-2">
                  <v-btn
                    color="warning"
                    x-small
                    fab
                    class="my-0 float-right"
                    title="Remove"
                    @click="removeResidence(i)"
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </div>

                <div class="col-md-4">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="City"
                    v-model="item.city"
                  ></v-text-field>
                </div>
                <div class="col-md-4">
                  <v-select
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="Province"
                    v-model="item.province"
                    :items="provinceOptions"
                  ></v-select>
                </div>
                <div class="col-md-4">
                  <v-select
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="In school"
                    v-model="item.in_school"
                    :items="inSchoolOptions"
                  ></v-select>
                </div>
              </div>
              <hr v-if="i < residences.length - 1" />
            </div>

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

    residences: [],

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
  },
  methods: {
    addResidence() {
      this.residences.push({});
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
  },
};
</script>
