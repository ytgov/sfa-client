<template>
  <div>
    <v-card class="default mb-5">
      <v-card-title>Institution</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-4">
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

          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Entering year #"
              @keypress="validate.isNumber($event)"
              @change="doSaveApp('program_year', application.program_year)"
              v-model="application.program_year"
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
              :value="application.classes_start_date?.slice(0, 10)"
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
              :value="application.classes_end_date?.slice(0, 10)"
            ></v-text-field>
          </div>

          <div class="col-md-4">
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

          <div class="col-md-8">
            <v-expansion-panels flat>
              <v-expansion-panel key="1" style="padding-top: 0">
                <v-expansion-panel-header
                  style="padding-top: 7px; padding-left: 10px"
                  >Institution details</v-expansion-panel-header
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
                        v-model="selectedInstitution.address_line_1"
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
                        v-model="selectedInstitution.address_city_id"
                        :items="cities"
                        item-value="id"
                        item-text="description"
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
                        v-model="selectedInstitution.address_province_id"
                        :items="provinces"
                        item-value="id"
                        item-text="description"
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
                        v-model="selectedInstitution.address_postal_code"
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
                        :items="countries"
                        v-model="selectedInstitution.address_country_id"
                        readonly
                        item-value="id"
                        item-text="description"
                      ></v-select>
                    </div>
                    <div class="col-md-12">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Care of"
                        v-model="selectedInstitution.care_of"
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
                        v-model="selectedInstitution.federal_institution_code"
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
                        v-model="selectedInstitution.institution_level_id"
                        :items="institutionLevels"
                        item-text="description"
                        item-value="id"
                      ></v-select>
                    </div>
                    <div class="col-md-4">
                      <v-text-field
                        outlined
                        dense
                        readonly
                        background-color="#ffaaaa"
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

    <v-card class="default mb-5">
      <v-card-title>Program</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-5">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              label="Program study area"
              v-model="application.study_area_id"
              @change="doSaveApp('study_area_id', application.study_area_id)"
              :items="studyAreas"
              item-text="description"
              item-value="id"
            ></v-autocomplete>
          </div>
          <div class="col-md-4">
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
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              @change="doSaveApp('program_year_total', application.program_year_total)"
              @keypress="validate.isNumber($event)"
              label="Duration"
              v-model="application.program_year_total"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-select
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Program division"
              v-model="application.PROGRAM_DIVISION"
              :items="programDivisionOptions"
            ></v-select>
          </div>

          <div class="col-md-7">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Student category"
              @change="doSaveApp('category_id', application.category_id)"
              v-model="application.category_id"
              :items="yukonGrantEligibilityList"
              item-text="description"
              item-value="id"
            ></v-select>
          </div>

          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Attendance"
              v-model="application.attendance"
              :items="attendanceOptions"
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
                  :value="application.classes_start_date?.slice(0, 10)"
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
                :value="application.classes_start_date?.slice(0, 10)"
                @input="e => {
                  application.classes_start_date = e;
                  classes_start_menu = false;
                }"
                @change="doSaveApp('classes_start_date', application.classes_start_date)"
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
                  :value="application.classes_end_date?.slice(0, 10)"
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
                :value="application.classes_end_date?.slice(0, 10)"
                @input="e => {
                  application.classes_end_date = e;
                  classes_end_menu = false;
                }"
                @change="doSaveApp('classes_end_date', application.classes_end_date)"
              ></v-date-picker>
            </v-menu>
          </div>

          <div class="col-md-4 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="By correspondence"
              v-model="application.is_correspondence"
            ></v-switch>
          </div>
          <div class="col-md-8 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              background-color="#ffaaaa"
              label="STEP and GRAD Corp data sharing consent"
              v-model="sharing_consent"
            ></v-switch>
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
    ...mapGetters(["yearOptions", "countries", "cities", "provinces", "institutionLevels", "studyAreas", "yukonGrantEligibilityList", "programs"]),
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
