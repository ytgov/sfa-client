<template>
  <div>
    <v-card class="default mb-5">
      <v-card-title>Institution</v-card-title>
      <v-card-text class="row">
        <div class="col-md-3">
          <div class="row">
            <div class="col-12 pr-md-0">
              <v-select
                outlined
                dense
                background-color="white"
                hide-details
                label="Academic year"
                :items="yearOptions"
                v-model="application.academic_year_id"
                @change="doSaveApp('academic_year_id', application.academic_year_id)"
              ></v-select>
            </div>
            <div class="col-md-8">
              <div class="row">
                <div class="col-md-9">
                  <h3 class="text-subtitle-2 pt-md-2 my-sm-0 my-xs-0">Entering Year</h3>
                </div>
                <div class="col-md-3 px-md-0">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    @keypress="validate.isNumber($event)"
                    @change="doSaveApp('program_year', application.program_year)"
                    v-model="application.program_year"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="row">
                <div class="col-md-6">
                  <h3 class="text-subtitle-2 pt-md-2 my-sm-0 my-xs-0">of</h3>
                </div>
                <div class="col-md-6 px-md-0">
                  <v-text-field
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    @keypress="validate.isNumber($event)"
                    @change="doSaveApp('program_year', application.program_year)"
                    v-model="application.program_year"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="col-md-12 pr-md-0">
              <v-text-field
                outlined
                dense
                background-color="white"
                hide-details
                label="Student number"
                @keypress="validate.isNumber($event)"
                v-model="application.student_number"
              ></v-text-field>
            </div>
          </div>
          
            
        </div>
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-12">
              <v-autocomplete
                outlined
                dense
                background-color="white"
                hide-details
                label="Institution"
                v-model="application.institution_campus_id"
                :items="institutionOptions"
                item-text="name"
                item-value="id"
                @change="doSaveApp('institution_campus_id', application.institution_campus_id)"
              ></v-autocomplete>
            </div>
            <div class="col-md-6">
              <v-text-field
                disabled
                outlined
                dense
                background-color="white"
                hide-details
                label="Address"
                v-model="selectedInstitution.address_line_1"
              ></v-text-field>
            </div>
            <div class="col-md-3">
              <v-text-field
                disabled
                outlined
                dense
                background-color="white"
                hide-details
                label="City"
                :value="cities.find(c => c.id === selectedInstitution.address_city_id)?.description"
              ></v-text-field>
            </div>
            <div class="col-md-3">
              <v-text-field
                disabled
                outlined
                dense
                background-color="white"
                hide-details
                label="Province"
                :value="provinces.find(c => c.id === selectedInstitution.address_province_id)?.description"
              ></v-text-field>
            </div>
            <div class="col-md-2">
              <v-text-field
                disabled
                outlined
                dense
                background-color="white"
                hide-details
                label="Postal code"
                :value="selectedInstitution.address_postal_code"
              ></v-text-field>
            </div>
            <div class="col-md-2">
              <v-text-field
                disabled
                outlined
                dense
                background-color="white"
                hide-details
                label="Country"
                :value="countries.find(c => c.id === selectedInstitution.address_country_id)?.description"
              ></v-text-field>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-2">
              <v-text-field
                disabled
                outlined
                dense
                background-color="white"
                hide-details
                label="GUAB"
              ></v-text-field>
            </div>
            <div class="col-md-3">
              <v-text-field
                disabled
                outlined
                dense
                background-color="white"
                hide-details
                label="Institution level"
                :value="institutionLevels.find(i => i.id = selectedInstitution.institution_level_id)?.description"
              ></v-text-field>
            </div>
            <div class="col-md-2">
              <v-text-field
                disabled
                outlined
                dense
                background-color="white"
                hide-details
                label="FOS"
              ></v-text-field>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="default mb-5">
      <v-card-title>Program</v-card-title>
      <v-card-text class="row">
        <div class="col-md-4">
          <div class="row">
            <div class="col-md-12">
              <v-autocomplete
                outlined
                dense
                background-color="white"
                hide-details
                label="Study area"
                v-model="application.study_area_id"
                @change="doSaveApp('study_area_id', application.study_area_id)"
                :items="studyAreas"
                item-text="description"
                item-value="id"
              ></v-autocomplete>
            </div>
            <div class="col-md-6">
              <v-btn
              class="mt-0"
              color="success"
              >
                View PIF
              </v-btn>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div class="row">
            <div class="col-md-6 px-1">
              <v-select
                outlined
                dense
                background-color="white"
                hide-details
                label="Program type"
                @change="doSaveApp('program_id', application.program_id)"
                v-model="application.program_id"
                :items="programs"
                item-text="description"
                item-value="id"
              ></v-select>
            </div>
            <div class="col-md-6 px-1">
              <v-select
                outlined
                dense
                background-color="white"
                hide-details
                label="Program division"
                :items="programDivisions"
                item-text="description"
                item-value="id"
                v-model="application.program_division" 
                @change="doSaveApp('program_division', application.program_division)"
              ></v-select>
            </div>
            <div class="col-md-6 px-1">
              <v-select
                outlined
                dense
                background-color="white"
                hide-details
                label="Attendance"
                :items="attendances"
                item-text="description"
                item-value="id"
                v-model="application.attendance_id"
                @change="doSaveApp('attendance_id', application.attendance_id)"
                
              ></v-select>
            </div>
            <div class="col-md-6 px-1">
              <v-switch
                class="my-0"
                label="By correspondance"
                v-model="application.is_correspondence"
                @change="doSaveApp('is_correspondence', application.is_correspondence)"
              ></v-switch>
            </div>
            <div class="col-md-6 px-1">
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
                    :value="application.classes_start_date?.slice(0, 10)"
                    label="Class start date"
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
                  :value="application.classes_start_date?.slice(0, 10)"
                  @input="e => {
                    application.classes_start_date = e;
                    classes_start_menu = false;
                  }"
                  @change="doSaveApp('classes_start_date', application.classes_start_date)"
                ></v-date-picker>
              </v-menu>
            </div>
            <div class="col-md-6 px-1">
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
                    :value="application.classes_end_date?.slice(0, 10)"
                    label="Class end date"
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
                  :value="application.classes_end_date?.slice(0, 10)"
                  @input="e => {
                    application.classes_end_date = e;
                    classes_end_menu = false;
                  }"
                  @change="doSaveApp('classes_end_date', application.classes_end_date)"
                ></v-date-picker>
              </v-menu>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row justify-end">
            <div class="col-md-9">
              <v-text-field
                outlined
                dense
                background-color="white"
                hide-details
                label="Study weeks"
                v-model="application.study_weeks_count"
                @change="doSaveApp('study_weeks_count', application.study_weeks_count)"
              ></v-text-field>
            </div>
          </div>
        </div>  
      </v-card-text>
    </v-card>
  </div>
</template>


<style>
.v-expansion-panel {
  height: 38px;
}
.v-expansion-panel--active {
  height: auto;
}
</style>



<script>
import store from "../../store";
import axios from "axios";
import moment from "moment";
import validator from "@/validator";
import {
  INSTITUTION_URL,
  INSTITUTION_LEVEL_URL,
  CITY_URL,
  COUNTRY_URL,
  PROVINCE_URL,
  PROGRAM_AREA_URL,
  PROGRAM_TYPE_URL,
  PROGRAM_DIVISION_URL,
  CATEGORY_URL,
} from "../../urls";
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(["yearOptions", "countries", "cities", "provinces", 
      "institutionLevels", "studyAreas", "yukonGrantEligibilityList",
      "programs", "attendances", "programDivisions"]),
    application: function () {
      return store.getters.selectedApplication;
    },
    selectedInstitution() {
      const finded = this.institutionOptions.find(
        (i) => i.id === this.application.institution_campus_id
      );
      return  finded ? finded : {};
    },
  },
  data: () => ({
    validate: {},
    institutionOptions: [],

    programAreaOptions: [],
    programTypeOptions: [],
    programDivisionOptions: [],
    attendanceOptions: ["Full time", "Part time"],

    classes_start_menu: null,
    classes_end_menu: null,

    fall_classes_start: null,
    winter_classes_end: null,
    sharing_consent: false,
  }),
  async created() {
    this.validate = validator;
    this.loadInstitutions();
    store.dispatch("setYearOptions");
    store.dispatch("setCountries");
    store.dispatch("setProvinces");
    store.dispatch("setCities");
    store.dispatch("setInstitutionLevels");
    store.dispatch("setStudyAreas");
    store.dispatch("setYukonGrantEligibility");
    store.dispatch("setPrograms");
    store.dispatch("setProgramDivisions");
    store.dispatch("setAttendances");

  },
  methods: {
    loadInstitutions() {
      axios
        .get(`${INSTITUTION_URL}`)
        .then((resp) => {
          this.institutionOptions = resp.data.data
            .map(data => {
              const campuses = data.campuses?.map(c => ({ ...c, name: `${c.name} - ${data.name}`, institution_level_id: data.institution_level_id }));
              return [...campuses];
            })
            .flat();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadPrograms() {
      axios.get(PROGRAM_DIVISION_URL).then((resp) => {
        this.programDivisionOptions = resp.data;
      });
    },
    doSaveApp(field, value) {
      store.dispatch("updateApplication", [field, value, this]);
    },
  },
};
</script>
