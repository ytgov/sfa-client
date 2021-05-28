<template>
  <div>
    <v-switch
      outlined
      dense
      hide-details
      label="Applying for Canada Student Loan"
      v-model="is_applying"
    ></v-switch>

    <v-card v-if="is_applying" class="default mt-5">
      <v-card-title>Canada Student Loan (Full-Time)</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Last CSL Province"
              v-model="province"
              :items="provinceOptions"
            ></v-select>
          </div>

          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Study classification"
              v-model="study_classification"
              :items="classificationOptions"
            ></v-select>
          </div>

          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Requested amount"
              v-model="requested_amount"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-4 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Full amount requested"
              v-model="full_amount_requested"
            ></v-switch>
          </div>
          <div class="col-md-4 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Crown ward"
              v-model="crown_ward"
            ></v-switch>
          </div>

          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Student gross income (Ln 150)"
              v-model="student_income"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>

          <div class="col-md-4 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Applying for Canada Student Grant only"
              v-model="applying_for_csg_only"
            ></v-switch>
          </div>

          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Indigenous learner"
              v-model="indigenous_learner"
              :items="indigenousLearnerOptions"
            ></v-select>
          </div>

          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Left high school year"
              v-model="left_high_year"
              :items="yearOptions"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Left high school month"
              v-model="left_high_month"
              :items="monthOptions"
            ></v-select>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data: () => ({
    provinceOptions: ["Yukon", "British Columbia"],
    classificationOptions: [
      "Single Dependent",
      "Single Independent - 2 year workforce",
      "Single Independent - 4 year high school",
      "Married / Common Law",
      "Single Parent",
    ],
    yearOptions: [],
    monthOptions: [],
    indigenousLearnerOptions: ["No", "Yes", "Prefer not to say"],

    is_applying: true,
    province: "",
    study_classification: "",
    requested_amount: 0,
    student_income: 0,
    full_amount_requested: false,
    applying_for_csg_only: false,
    crown_ward: false,
    left_high_year: "",
    left_high_month: "",
    indigenous_learner: "",
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
  methods: {},
};
</script>
