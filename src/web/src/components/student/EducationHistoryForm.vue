<template>
  <div class="home">
    <v-card class="default mb-5">
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
              v-model="student.high_school_id"
              :items="highSchools"
              item-text="name"
              item-value="id"
              @change="doSaveEducation('high_school_id', student.high_school_id, 'studentInfo', student.id)"
            ></v-autocomplete>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <v-text-field
              disabled
              outlined
              dense
              background-color="white"
              hide-details
              label="City"
              :value="cities.find((c) => Number(c.id) === Number(student.high_school_info.city_id))?.description"
              item-value="id"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field
              disabled
              outlined
              dense
              background-color="white"
              hide-details
              label="Province"
              :value="provinces.find((c) => Number(c.id) === Number(student.high_school_info.province_id))?.description"
              item-value="id"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field
              disabled
              outlined
              dense
              background-color="white"
              hide-details
              label="Country"
              :value="countries.find((c) => Number(c.id) === Number(student.high_school_info.country_id))?.description"
              item-value="id"
            ></v-text-field>
          </div>
        </div>

        <div class="row mb-n8">
          <div class="col-md-6">
            <h3>Left High School</h3>
          </div>
        </div>

        <div class="row">
          <div class="col-md-2">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Year"
              v-model="student.high_school_left_year"
              :items="yearOptions"
              @change="
                doSaveEducation('high_school_left_year', student.high_school_left_year, 'studentInfo', student.id)
              "
            ></v-select>
          </div>
          <div class="col-md-2">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Month"
              v-model="student.high_school_left_month"
              :items="monthOptions"
              @change="
                doSaveEducation('high_school_left_month', student.high_school_left_month, 'studentInfo', student.id)
              "
            ></v-select>
          </div>
          <div class="col-md-2">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Last Grade Completed"
              v-model="student.high_school_final_grade"
              :items="gradeOptions"
              @change="
                doSaveEducation('high_school_final_grade', student.high_school_final_grade, 'studentInfo', student.id)
              "
            ></v-select>
          </div>
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Highest education level"
              v-model="student.education_level_id"
              :items="educationLevels"
              item-value="id"
              item-text="description"
              @change="doSaveEducation('education_level_id', student.education_level_id, 'studentInfo', student.id)"
            ></v-select>
          </div>
        </div>

        <vue-editable-grid
          class="my-grid-class"
          ref="grid"
          id="mygrid"
          :column-defs="columnDefs"
          :row-data="student.residences"
          row-data-key="shipmentId"
          :enable-filters="false"
          :multiple-selection="false"
          @cell-updated="cellUpdated"
          @link-clicked="linkClicked"
        >
        </vue-editable-grid>
      </v-card-text>
    </v-card>

    <v-card class="default mb-5">
      <v-card-title>Post-Secondary Education</v-card-title>

      <v-card-text>
        <template>
          <div class="row" v-for="(education, index) of student?.education_info" :key="index">
            <div class="col-md-3">
              <v-autocomplete
                :disabled="showAdd"
                outlined
                dense
                background-color="white"
                hide-details
                label="Institution"
                v-model="education.institution_campus_id"
                @change="
                  doSaveEducation(
                    'institution_campus_id',
                    education.institution_campus_id,
                    'educationInfo',
                    education.id
                  )
                "
                :items="filteredList"
                item-text="name"
                item-value="id"
              ></v-autocomplete>
            </div>
            <div class="col-md-3">
              <v-autocomplete
                :disabled="showAdd"
                outlined
                dense
                background-color="white"
                hide-details
                label="Study Area"
                v-model="education.study_area_id"
                :items="studyAreaOptions"
                @change="doSaveEducation('study_area_id', education.study_area_id, 'educationInfo', education.id)"
                item-text="description"
                item-value="id"
              ></v-autocomplete>
            </div>
            <div class="col-md">
              <v-select
                :disabled="showAdd"
                outlined
                dense
                background-color="white"
                hide-details
                label="From Year"
                @change="
                  (e) => {
                    if (validate.year(education.from_year)) {
                      return doSaveEducation('from_year', education.from_year, 'educationInfo', education.id);
                    } else {
                      $store.dispatch('loadStudent', student.id);
                      return $emit('showError', 'Invalid Year');
                    }
                  }
                "
                :items="yearOptions"
                v-model="education.from_year"
                @keypress="validate.isNumber($event)"
              >
              </v-select>
            </div>
            <div class="col-md">
              <v-select
                :disabled="showAdd"
                outlined
                dense
                background-color="white"
                hide-details
                label="From Month"
                @change="
                  (e) => {
                    if (validate.month(education.from_month)) {
                      return doSaveEducation('from_month', education.from_month, 'educationInfo', education.id);
                    } else {
                      $store.dispatch('loadStudent', student.id);
                      return $emit('showError', 'Invalid Month');
                    }
                  }
                "
                :items="monthOptions"
                v-model="education.from_month"
                @keypress="validate.isNumber($event)"
              >
              </v-select>
            </div>
            <div class="col-md">
              <v-select
                :disabled="showAdd"
                outlined
                dense
                background-color="white"
                hide-details
                label="To Year"
                @change="
                  (e) => {
                    if (validate.year(education.to_year)) {
                      return doSaveEducation('to_year', education.to_year, 'educationInfo', education.id);
                    } else {
                      $store.dispatch('loadStudent', student.id);
                      return $emit('showError', 'Invalid Year');
                    }
                  }
                "
                :items="yearOptions"
                v-model="education.to_year"
                @keypress="validate.isNumber($event)"
              >
              </v-select>
            </div>
            <div class="col-md">
              <v-select
                :disabled="showAdd"
                outlined
                dense
                background-color="white"
                hide-details
                label="To Month"
                @change="
                  (e) => {
                    if (validate.month(education.to_month)) {
                      return doSaveEducation('to_month', education.to_month, 'educationInfo', education.id);
                    } else {
                      $store.dispatch('loadStudent', student.id);
                      return $emit('showError', 'Invalid Month');
                    }
                  }
                "
                :items="monthOptions"
                v-model="education.to_month"
                @keypress="validate.isNumber($event)"
              >
              </v-select>
            </div>

            <div class="col-md">
              <v-btn :disabled="showAdd" color="red" class="my-0" @click="deleteRecord(education.id)">
                <v-icon color="white font-weight-thin" size="21">
                  {{ "mdi-trash-can-outline" }}
                </v-icon>
              </v-btn>
            </div>
          </div>
        </template>
      </v-card-text>

      <v-card-text v-if="showAdd">
        <div class="row">
          <div class="col-md-3">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              label="Institution"
              v-model="newRegister.institution_campus_id"
              :items="filteredList"
              item-text="name"
              item-value="id"
            ></v-autocomplete>
          </div>
          <div class="col-md-3">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              label="Study Area"
              v-model="newRegister.study_area_id"
              :items="studyAreaOptions"
              item-text="description"
              item-value="id"
            ></v-autocomplete>
          </div>
          <div class="col-md">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="From Year"
              :items="yearOptions"
              v-model="newRegister.from_year"
              @keypress="validate.isNumber($event)"
            >
            </v-select>
          </div>
          <div class="col-md">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="From Month"
              :items="monthOptions"
              v-model="newRegister.from_month"
              @keypress="validate.isNumber($event)"
            >
            </v-select>
          </div>
          <div class="col-md">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="To Year"
              :items="yearOptions"
              v-model="newRegister.to_year"
              @keypress="validate.isNumber($event)"
            >
            </v-select>
          </div>
          <div class="col-md">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="To Month"
              :items="monthOptions"
              v-model="newRegister.to_month"
              @keypress="validate.isNumber($event)"
            >
            </v-select>
          </div>
        </div>
        <div class="row justify-end">
          <div class="col-md-2">
            <v-btn color="red" class="my-0" @click="setClose">
              <v-icon color="white font-weight-thin" size="21">
                {{ "mdi-close" }}
              </v-icon>
            </v-btn>
            <v-btn
              color="success"
              class="my-0 ml-5"
              @click="
                (e) => {
                  doSaveEducation('data', { ...newRegister }, 'educationInfo', null, true);
                }
              "
            >
              <v-icon color="white font-weight-thin" size="21">
                {{ "mdi-content-save" }}
              </v-icon>
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-btn color="primary" class="my-0 float-left" @click="setClose">
      <template v-if="!showAdd"> <v-icon>mdi-plus</v-icon> Add </template>
      <template v-else>
        Cancel
      </template>
    </v-btn>
    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import store from "../../store";
import { INSTITUTION_URL, STUDY_AREA } from "../../urls";
import { mapGetters, mapState } from "vuex";
import validator from "@/validator";

export default {
  computed: {
    ...mapGetters([
      "educationLevels",
      "highSchools",
      "cities",
      "provinces",
      "countries",
      "monthOptions",
      "yearOptions",
    ]),
    ...mapState(["selectedStudent"]),
    student: function() {
      return store.getters.selectedStudent;
    },
    application: function() {
      return store.getters.selectedApplication;
    },
    filteredList: function() {
      let l = _.clone(this.institutionOptions);

      return l.filter((i) => i.is_active);
    },
  },
  data: () => ({
    showAdd: false,
    validate: {},
    countryOptions: [],
    provinceOptions: [],
    cityOptions: [],
    gradeOptions: ["13", "12", "11", "10", "9", "8", "7", "6", "5"],
    highSchoolOptions: [],
    educationLevelOptions: [],
    institutionOptions: [],
    studyAreaOptions: [],

    selectedHighSchool: {},

    high_school_student_number: "",
    checked_student_number: false,
    high_school_city: -1,
    high_school_province: -1,
    high_school_country: -1,
    eduction_level: "",
    high_school_12_mark: "",
    newRegister: {
      institution_campus_id: null,
      study_area_id: null,
      from_year: null,
      from_month: null,
      to_year: null,
      to_month: null,
    },
  }),
  async created() {
    this.validate = { ...validator };

    store.dispatch("setEducationLevels");
    store.dispatch("setCities");
    store.dispatch("setProvinces");
    store.dispatch("setCountries");
    store.dispatch("setHighSchools");

    store.dispatch("loadApplication", 12707);
    this.loadInstitutions();
    this.loadStudyAreas();
    this.selectedHighSchool = this.student.high_school_id.toString();

    this.high_school_city = this.student.high_school_info.city_id;
    this.high_school_province = this.student.high_school_info.province_id;
    this.high_school_country = this.student.high_school_info.country_id;
  },
  watch: {
    selectedHighSchool: function(val) {
      this.setHighSchool(val);
    },
  },
  methods: {
    setClose() {
      if (this.showAdd) {
        this.newRegister = {
          institution_campus_id: null,
          study_area_id: null,
          from_year: null,
          from_month: null,
          to_year: null,
          to_month: null,
        };
      }
      this.showAdd = !this.showAdd;
    },
    loadInstitutions() {
      this.isLoading = true;

      axios
        .get(`${INSTITUTION_URL}`)
        .then((resp) => {
          this.institutionOptions = resp.data.data
            .map((data) => {
              const campuses = data.campuses?.map((c) => ({ ...c, name: `${c.name} - ${data.name}` }));
              return [...campuses];
            })
            .flat();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadStudyAreas() {
      this.isLoading = true;

      axios
        .get(`${STUDY_AREA}?filter=true`)
        .then((resp) => {
          this.studyAreaOptions = resp.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    doSaveEducation(field, value, type, extraId = null, isInsertion = false) {
      if (isInsertion) {
        const validate = { ...value };

        for (const property in validate) {
          if (!validate[property]) {
            return this.$emit("showError", `${property} is required`);
          }
          if ((property === "to_month" || property === "from_month") && !validator.month(validate[property])) {
            store.dispatch("loadStudent", this.student.id);
            return this.$emit("showError", `Month is incorrect`);
          }
          if ((property === "to_year" || property === "from_year") && !validator.year(validate[property])) {
            store.dispatch("loadStudent", this.student.id);
            return this.$emit("showError", `Year is incorrect`);
          }
        }
      }
      const url = type === "educationInfo" ? "/education" : "";

      store.dispatch("updateStudent", [field, value, type, extraId, this, null, url, isInsertion]);
    },
    deleteRecord(idToDelete) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this consent.",
        () => {
          store.dispatch("deleteEducation", [this, idToDelete]);
        },
        () => {}
      );
    },
  },
};
</script>
