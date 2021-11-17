<template>
  <div>
    <v-card class="default mb-5">
      <v-card-title>Program</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-5">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Program study area"
              v-model="application.STUDY_AREA_ID"
              :items="programAreaOptions"
              item-text="DESCRIPTION"
              item-value="STUDY_AREA_ID"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Program type"
              v-model="application.PROGRAM_ID"
              :items="programTypeOptions"
              item-text="DESCRIPTION"
              item-value="PROGRAM_ID"
            ></v-select>
          </div>
          <div class="col-md-3">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Program division"
              v-model="application.PROGRAM_DIVISION"
              :items="programDivisionOptions"
            ></v-select>
          </div>

          <div class="col-md-2">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Duration"
              v-model="application.PROGRAM_YEAR_TOTAL"
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Entering year #"
              v-model="application.PROGRAM_YEAR"
            ></v-text-field>
          </div>

          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Academic year"
              v-model="application.ACADEMIC_YEAR"
            ></v-text-field>
          </div>

          <div class="col-md-3">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Student category"
              v-model="application.CATEGORY_ID"
              :items="categoryOptions"
              item-text="DESCRIPTION"
              item-value="STUDENT_CATEGORY_CODE"
            ></v-select>
          </div>

          <div class="col-md-4">
            <v-menu
              v-model="classes_start_menu"
              :close-on-content-click="false"
              transition="scale-transition"
              left
              nudge-top="26"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="fall_classes_start"
                  label="Fall classes start date"
                  append-icon="mdi-calendar"
                  readonly
                  outlined
                  hide-details
                  dense
                  background-color="white"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="fall_classes_start"
                @input="classes_start_menu = false"
              ></v-date-picker>
            </v-menu>
          </div>
          <div class="col-md-4">
            <v-menu
              v-model="classes_end_menu"
              :close-on-content-click="false"
              transition="scale-transition"
              left
              nudge-top="26"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="winter_classes_end"
                  label="Winter classes end date"
                  append-icon="mdi-calendar"
                  hide-details
                  readonly
                  outlined
                  dense
                  background-color="white"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="winter_classes_end"
                @input="classes_end_menu = false"
              ></v-date-picker>
            </v-menu>
          </div>

          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Attendance"
              v-model="application.attendance"
              :items="attendanceOptions"
            ></v-select>
          </div>

          <div class="col-md-4 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="By correspondence"
              v-model="application.CORRESPONDENCE_FLAG"
            ></v-switch>
          </div>
          <div class="col-md-8 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="STEP and GRAD Corp data sharing consent"
              v-model="sharing_consent"
            ></v-switch>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="default mb-5">
      <v-card-title>Institution</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-8">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              label="Institution"
              v-model="application.INSTITUTION_ID"
              :items="institutionOptions"
              item-text="NAME"
              item-value="INSTITUTION_ID"
            ></v-autocomplete>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Student number"
              v-model="application.STUDENT_NUMBER"
            ></v-text-field>
          </div>

          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              readonly
              background-color="white"
              hide-details
              label="Fall classes start date"
              v-model="selectedInstitution.CLASSES_START_DATE"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              readonly
              background-color="white"
              hide-details
              label="Winter classes end date"
              v-model="selectedInstitution.CLASSES_END_DATE"
            ></v-text-field>
          </div>

          <div class="col-md-12">
            <v-expansion-panels flat>
              <v-expansion-panel key="1">
                <v-expansion-panel-header
                  >More details</v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <div class="row">
                    <div class="col-md-12">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Address"
                        v-model="selectedInstitution.ADDRESS"
                        readonly
                      ></v-text-field>
                    </div>
                    <div class="col-md-6">
                      <v-select
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="City"
                        v-model="selectedInstitution.CITY_ID"
                        :items="cityOptions"
                        item-value="CITY_ID"
                        item-text="DESCRIPTION"
                        readonly
                      ></v-select>
                    </div>
                    <div class="col-md-6">
                      <v-select
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Province"
                        v-model="selectedInstitution.PROVINCE_ID"
                        :items="provinceOptions"
                        item-value="PROVINCE_ID"
                        item-text="DESCRIPTION"
                        readonly
                      ></v-select>
                    </div>
                    <div class="col-md-6">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Postal code"
                        v-model="selectedInstitution.POSTAL_CODE"
                        readonly
                      ></v-text-field>
                    </div>
                    <div class="col-md-6">
                      <v-select
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Country"
                        :items="countryOptions"
                        v-model="selectedInstitution.COUNTRY_ID"
                        readonly
                        item-value="COUNTRY_ID"
                        item-text="DESCRIPTION"
                      ></v-select>
                    </div>
                    <div class="col-md-12">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Care of"
                        v-model="selectedInstitution.CARE_OF"
                        readonly
                      ></v-text-field>
                    </div>

                    <div class="col-md-4">
                      <v-text-field
                        outlined
                        dense
                        readonly
                        background-color="white"
                        hide-details
                        label="Inst. code"
                        v-model="selectedInstitution.INSTITUTION_CODE"
                      ></v-text-field>
                    </div>

                    <div class="col-md-4">
                      <v-select
                        outlined
                        dense
                        readonly
                        background-color="white"
                        hide-details
                        label="Inst. level"
                        v-model="selectedInstitution.INSTITUTION_LEVEL_ID"
                        :items="institutionLevelOptions"
                        item-text="DESCRIPTION"
                        item-value="INSTITUTION_LEVEL_ID"
                      ></v-select>
                    </div>
                    <div class="col-md-4">
                      <v-text-field
                        outlined
                        dense
                        readonly
                        background-color="white"
                        hide-details
                        label="FOS"
                        v-model="selectedInstitution.fos"
                      ></v-text-field>
                    </div>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import store from "../store";
import axios from "axios";
import moment from "moment";
import { INSTITUTION_URL, INSTITUTION_LEVEL_URL, CITY_URL, COUNTRY_URL, PROVINCE_URL, PROGRAM_AREA_URL, PROGRAM_TYPE_URL, PROGRAM_DIVISION_URL, CATEGORY_URL } from "../urls";

export default {
  computed: {
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  watch: {
    "application.INSTITUTION_ID": function () {
      this.selectInstitution();
    },
  },
  data: () => ({
    countryOptions: [],
    provinceOptions: [],
    institutionOptions: [],
    institutionLevelOptions: [],
    cityOptions: [],

    programAreaOptions: [],
    programTypeOptions: [],
    programDivisionOptions: [],
    categoryOptions: ["Option 1", "Option 2"],
    attendanceOptions: ["Full time", "Part time"],

    selectedInstitution: {},

    classes_start_menu: null,
    classes_end_menu: null,

    institution: {
      student_number: "",
      name: "",
      address: "",
      city: "",
      province: "",
      postal: "",
      country: "",
      care_of: "",

      inst_code: "",
      inst_level: "",
      fos: "",
      classes_start: "",
      classes_end: "",
    },
    student_info: {
      study_area: "",
      program_type: "",
      program_duration: "",
      enter_year: "",
      program_division: "",
      student_category: "",
      attendance: "",
    },
    academic_year: "",
    fall_classes_start: null,
    winter_classes_end: null,
    by_correspondence: false,
    sharing_consent: false,
  }),
  async created() {
    this.loadInstitutions();
    this.loadCountries();
    this.loadProvinces();
    this.loadCities();
    this.loadPrograms();
    this.loadCategories();
  },
  methods: {
    loadInstitutions() {
      axios.get(INSTITUTION_URL).then((resp) => {
        this.institutionOptions = resp.data;
        this.selectInstitution();
      });
      axios.get(INSTITUTION_LEVEL_URL).then((resp) => {
        this.institutionLevelOptions = resp.data;
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
    loadPrograms() {
      axios.get(PROGRAM_AREA_URL).then((resp) => {
        this.programAreaOptions = resp.data;
      });
      axios.get(PROGRAM_TYPE_URL).then((resp) => {
        this.programTypeOptions = resp.data;
      });
      axios.get(PROGRAM_DIVISION_URL).then((resp) => {
        this.programDivisionOptions = resp.data;
      });
    },
    loadCategories() {
      axios.get(CATEGORY_URL).then((resp) => {
        this.categoryOptions = resp.data;
      });
    },
    selectInstitution() {
      let filtered = this.institutionOptions.filter(
        (i) => i.INSTITUTION_ID == this.application.INSTITUTION_ID
      );

      if (filtered.length > 0) {
        this.selectedInstitution = filtered[0];

        if (this.selectedInstitution.CLASSES_START_DATE)
          this.selectedInstitution.CLASSES_START_DATE = moment(
            this.selectedInstitution.CLASSES_START_DATE
          ).format("YYYY-MM-DD");

        if (this.selectedInstitution.CLASSES_END_DATE)
          this.selectedInstitution.CLASSES_END_DATE = moment(
            this.selectedInstitution.CLASSES_END_DATE
          ).format("YYYY-MM-DD");
      } else this.selectedInstitution = {};
    },
  },
};
</script>
