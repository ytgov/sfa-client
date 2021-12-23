<template>
  <div>
    <v-card class="default mb-5">
      <v-card-title>Basic Demographics</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Language"
              v-model="student.LANGUAGE_ID"
              item-text="DESCRIPTION"
              item-value="LANGUAGE_ID"
              :items="languageOptions"
              @change="doSaveStudent('LANGUAGE_ID', student.LANGUAGE_ID)"
            ></v-select>
          </div>
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Sex"
              v-model="student.SEX"
              :items="sexOptions"
              @change="doSaveStudent('SEX', student.SEX)"
            ></v-select>
          </div>

          <div class="col-md-3">
            <v-menu
              v-model="birth_date_menu"
              :close-on-content-click="false"
              transition="scale-transition"
              left
              nudge-top="26"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="student.BIRTH_DATE"
                  label="Birth date"
                  append-icon="mdi-calendar"
                  readonly
                  outlined
                  dense
                  background-color="white"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="student.BIRTH_DATE"
                :max="maxDate"
                @input="birth_date_menu = false"
                @change="doSaveStudent('BIRTH_DATE', student.BIRTH_DATE)"
              ></v-date-picker>
            </v-menu>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="SFA number"
              v-model="student.YUKON_ID"
              @change="doSaveStudent('YUKON_ID', student.YUKON_ID)"
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Records locator number"
              v-model="student.LOCATOR_NUMBER"
              @change="
                doSaveStudent('LOCATOR_NUMBER', student.LOCATOR_NUMBER)
              "
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Funded since"
              v-model="student.FUNDED_SINCE"
              @change="
                doSaveStudent('FUNDED_SINCE', student.FUNDED_SINCE)
              "
              :items="yearOptions"
            ></v-select>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import store from "../store";
import { mapState } from "vuex";
import { LANGUAGE_URL } from "../urls";

export default {
  computed: {
    ...mapState(["selectedStudent"]),
    student: function () {
      return store.getters.selectedStudent;
    },
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  data: () => ({
    languageOptions: [],
    sexOptions: [
      { value: 1, text: "Male" },
      { value: 2, text: "Female" },
      { value: 3, text: "Unknown" },
    ],
    yearOptions: [],
    maxDate: moment().format("YYYY-MM-DD"),
    birth_date_menu: null,
  }),
  async created() {
    this.loadLanguages();
    this.yearOptions = [];

    let startYear = 1990;
    let currentYear = moment().year();

    for (let i = currentYear; i >= startYear; i--) {
      this.yearOptions.push(`${i}`);
    }

    //this.updateView(this.application);
  },
  methods: {
    loadLanguages() {
      axios.get(LANGUAGE_URL).then((resp) => {
        this.languageOptions = resp.data;
      });
    },

    //updateView(application) {
    //this.sfa_number = student.STUDENT_ID;
    //this.records_locator = student.LOCATOR_NUMBER;
    //this.funded_since = application
    //},

    addConsent() {
      this.consents.push({});
    },
    removeConsent(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this consent.",
        () => {
          this.consents.splice(index, 1);
        },
        () => {}
      );
    },
    doSaveStudent(field, value) {
      store.dispatch("updateStudent", [field, value, this]);
    },
  },
};
</script>
