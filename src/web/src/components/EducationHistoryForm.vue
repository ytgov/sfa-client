<template>
  <div class="home">
    <v-card class="default">
      <v-card-title>Secondary Education History</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-12">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="High school"
              v-model="high_school"
              :items="highSchoolOptions"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="High school student number"
              v-model="high_school_student_number"
            ></v-text-field>
          </div>
          <div class="col-md-8 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Checked for high school student number"
              v-model="checked_student_number"
            ></v-switch>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="High school city"
              v-model="high_school_city"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="High school province"
              v-model="high_school_province"
              :items="provinceOptions"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="High school country"
              v-model="high_school_country"
              :items="countryOptions"
            ></v-select>
          </div>

          <div class="col-md-2">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Left high school year"
              v-model="last_high_year"
              :items="yearOptions"
            ></v-select>
          </div>
          <div class="col-md-2">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Left high school month"
              v-model="last_high_month"
              :items="monthOptions"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Last grade completed"
              v-model="last_grade_completed"
              :items="gradeOptions"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Highest education level"
              v-model="last_grade_completed"
              :items="educationLevelOptions"
            ></v-select>
          </div>

          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Average 12th grade mark"
              type="number"
              step="0.01"
              v-model="high_school_12_mark"
            ></v-text-field>
          </div>

          <div class="col-md-8 pt-0 text-right">
            <v-btn color="primary">View transcipt</v-btn>
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
    countryOptions: ["Canada", "United States"],
    provinceOptions: ["Yukon", "British Columbia"],
    yearOptions: [],
    monthOptions: [],
    gradeOptions: ["13", "12", "11", "10", "9", "8", "7", "6", "5"],
    highSchoolOptions: ["FH Collins"],
    educationLevelOptions: ["High school", "Some University Undergraduate"],
    institutionOptions: ["Yukon U"],
    studyAreaOptions: ["Business administration"],

    high_school: "",
    high_school_student_number: "",
    checked_student_number: false,
    high_school_city: "",
    high_school_province: "",
    high_school_country: "",
    last_high_year: "",
    last_high_month: "",
    last_grade_completed: "",
    eduction_level: "",
    high_school_12_mark: "",
  }),
  async created() {
    this.monthOptions = [];
    this.yearOptions = [];

    for (let i = 1; i <= 12; i++) {
      let m = `0${i}`;
      this.monthOptions.push(m.substring(m.length - 2));
    }

    let startYear = 2000;
    let currentYear = moment().year();

    for (let i = currentYear; i >= startYear; i--) {
      this.yearOptions.push(`${i}`);
    }
  },
  methods: {},
};
</script>
