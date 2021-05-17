<template>
  <div class="home">
    <h1>Education History</h1>

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
        </div>
      </v-card-text>
    </v-card>

    <hr class="mt-5 mb-5" />
    <h3>Post-Secondary Education</h3>
    <v-card class="default mb-5" v-for="(item, i) of post_secondary" :key="i">
      <v-card-title
        >Education {{ 1 + i }}
        <v-spacer></v-spacer>
        <v-btn color="warning" x-small fab class="my-0" @click="removeEducation(i)"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Institution"
              v-model="item.institution"
              :items="institutionOptions"
            ></v-select>
          </div>
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Study area"
              v-model="item.study_area"
              :items="studyAreaOptions"
            ></v-select>
          </div>
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
          <div class="col-md-3">
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
          <div class="col-md-3">
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
        </div>
      </v-card-text>
    </v-card>
    <v-btn color="info" @click="addEducation()">Add post-secondary education</v-btn>

    <confirm-dialog ref="confirm"></confirm-dialog>
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
    high_school_city: "",
    high_school_province: "",
    high_school_country: "",
    last_high_year: "",
    last_high_month: "",
    last_grade_completed: "",
    eduction_level: "",

    post_secondary: [],
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
  methods: {
    addEducation() {
      this.post_secondary.push({ amount: 0 });
    },
    removeEducation(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this post-secondary education.",
        () => {
          this.post_secondary.splice(index, 1);
        },
        () => {}
      );
    },
  },
};
</script>
