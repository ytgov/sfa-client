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
              v-model="student_info.study_area"
              :items="programAreaOptions"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Program type"
              v-model="student_info.program_type"
              :items="programTypeOptions"
            ></v-select>
          </div>
          <div class="col-md-3">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Program division"
              v-model="student_info.program_division"
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
              v-model="student_info.program_duration"
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Entering year #"
              v-model="student_info.enter_year"
            ></v-text-field>
          </div>

          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Academic year"
              v-model="academic_year"
            ></v-text-field>
          </div>

          <div class="col-md-3">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Student category"
              v-model="student_info.student_category"
              :items="categoryOptions"
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
              v-model="student_info.attendance"
              :items="attendanceOptions"
            ></v-select>
          </div>

          <div class="col-md-4 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="By correspondence"
              v-model="by_correspondence"
            ></v-switch>
          </div>
          <div class="col-md-8 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="STEP and GRAD Corp data shaing consent"
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
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Institution"
              v-model="institution.name"
              :items="institutionOptions"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Student number"
              v-model="institution.student_number"
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
              v-model="institution.classes_start"
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
              v-model="institution.classes_end"
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
                        v-model="institution.address"
                      ></v-text-field>
                    </div>
                    <div class="col-md-6">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="City"
                        v-model="institution.city"
                      ></v-text-field>
                    </div>
                    <div class="col-md-6">
                      <v-select
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Province"
                        v-model="institution.province"
                        :items="provinceOptions"
                      ></v-select>
                    </div>
                    <div class="col-md-6">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Postal code"
                        v-model="institution.postal"
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
                        v-model="institution.country"
                      ></v-select>
                    </div>
                    <div class="col-md-12">
                      <v-text-field
                        outlined
                        dense
                        background-color="white"
                        hide-details
                        label="Care of"
                        v-model="institution.care_of"
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
                        v-model="institution.inst_code"
                      ></v-text-field>
                    </div>

                    <div class="col-md-4">
                      <v-text-field
                        outlined
                        dense
                        readonly
                        background-color="white"
                        hide-details
                        label="Inst. level"
                        v-model="institution.inst_level"
                      ></v-text-field>
                    </div>
                    <div class="col-md-4">
                      <v-text-field
                        outlined
                        dense
                        readonly
                        background-color="white"
                        hide-details
                        label="FOS"
                        v-model="institution.fos"
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
export default {
  data: () => ({
    countryOptions: ["Canada", "United States"],
    provinceOptions: ["Yukon", "British Columbia"],
    institutionOptions: ["Yukon University", "UBC"],
    programAreaOptions: ["Business Administration", "Computer Science"],
    programTypeOptions: ["Diploma", "Degree"],
    programDivisionOptions: ["Quarters", "Semesters"],
    categoryOptions: ["Option 1", "Option 2"],
    attendanceOptions: ["Full time", "Part time"],

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
  async created() {},
  methods: {},
};
</script>
