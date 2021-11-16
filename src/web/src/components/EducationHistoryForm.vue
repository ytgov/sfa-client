<template>
  <div class="home">
    <v-card class="default">
      <v-card-title>Secondary Education History</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-12">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              label="High school"
              v-model="selectedHighSchool"
              :items="highSchoolOptions"
              item-text="NAME"
              item-value="HIGH_SCHOOL_ID"
            ></v-autocomplete>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="High school student number"
              v-model="application.student.YUKON_ID"
            ></v-text-field>
          </div>
          <div class="col-md-8">
            <v-select
              outlined
              dense
              hide-details
              background-color="white"
              label="Checked for high school student number"
              v-model="application.student.CHECKED_FOR_YTID_FLG"
              :items="['Yes','No']"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="High school city"
              v-model="high_school_city"
              :items="cityOptions"
              item-text="DESCRIPTION"
              item-value="CITY_ID"
            ></v-select>
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
              item-text="DESCRIPTION"
              item-value="PROVINCE_ID"
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
              item-text="DESCRIPTION"
              item-value="COUNTRY_ID"
            ></v-select>
          </div>

          <div class="col-md-2">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Left high school year"
              v-model="application.student.HIGH_SCHOOL_LEFT_YEAR"
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
              v-model="application.student.HIGH_SCHOOL_LEFT_MONTH"
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
              v-model="application.student.HIGH_SCHOOL_FINAL_GRADE"
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
              v-model="application.student.EDUCATION_LEVEL_ID"
              :items="educationLevelOptions"
              item-value="EDUCATION_LEVEL_ID"
              item-text="DESCRIPTION"
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
              v-model="application.student.HIGH_SCHOOL_FINAL_GRADE"
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
import axios from "axios";
import store from "../store";
import { EDUCATION_LEVEL_URL, HIGH_SCHOOOL_URL, CITY_URL, COUNTRY_URL, PROVINCE_URL } from "../urls";

export default {
  computed: {
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  data: () => ({
    countryOptions: [],
    provinceOptions: [],
    cityOptions: [],
    yearOptions: [],
    monthOptions: [],
    gradeOptions: ["13", "12", "11", "10", "9", "8", "7", "6", "5"],
    highSchoolOptions: [],
    educationLevelOptions: [],
    institutionOptions: ["Yukon U"],
    studyAreaOptions: ["Business administration"],

    selectedHighSchool: {},

    high_school_student_number: "",
    checked_student_number: false,
    high_school_city: -1,
    high_school_province: -1,
    high_school_country: -1,
    eduction_level: "",
    high_school_12_mark: "",
  }),
  async created() {
    this.loadHighSchools();
    this.loadCountries();
    this.loadProvinces();
    this.loadCities();
    this.loadEducationLevels();

    this.selectedHighSchool = this.application.student.HIGH_SCHOOL_ID;

    this.monthOptions = [];
    this.yearOptions = [];

    for (let i = 1; i <= 12; i++) {
      this.monthOptions.push(i);
    }

    let startYear = 1950;
    let currentYear = moment().year();

    for (let i = currentYear; i >= startYear; i--) {
      this.yearOptions.push(i);
    }
  },
  watch: {
    selectedHighSchool: function (val) {
      this.setHighSchool(val);
    },
  },
  methods: {
    setHighSchool(val) {
      let schoolFiltered = this.highSchoolOptions.filter(
        (h) => h.HIGH_SCHOOL_ID == val
      );

      if (schoolFiltered.length > 0) {
        let school = schoolFiltered[0];
        this.high_school_city = school.CITY_ID;
        this.high_school_province = school.PROVINCE_ID;
        this.high_school_country = school.COUNTRY_ID;
      }
    },

    loadHighSchools() {
      axios.get(HIGH_SCHOOOL_URL).then((resp) => {
        this.highSchoolOptions = resp.data;
        this.setHighSchool(this.application.student.HIGH_SCHOOL_ID);
      });
    },
    loadEducationLevels() {
      axios.get(EDUCATION_LEVEL_URL).then((resp) => {
        this.educationLevelOptions = resp.data;
      });
    },
    loadCountries() {
      axios.get(COUNTRY_URL).then((resp) => {
        this.countryOptions = resp.data;
      });
    },
    loadProvinces() {
      axios.get(PROVINCE_URL).then((resp) => {
        this.provinceOptions = resp.data;
      });
    },
    loadCities() {
      axios.get(CITY_URL).then((resp) => {
        this.cityOptions = resp.data;
      });
    },
  },
};
</script>
