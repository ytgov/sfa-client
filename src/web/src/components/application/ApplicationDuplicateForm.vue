<template>
  <v-dialog v-model="visible" persistent max-width="600px">
    <v-card class="">
      <v-card-title>Duplicate Application</v-card-title>
      <v-card-text>
        <v-divider class="mb-5"></v-divider>
        <v-form v-model="valid">
          <v-text-field
            :value="studentName"
            dense
            outlined
            label="Student"
            readonly
          ></v-text-field>

          <v-autocomplete
            label="Academic year"
            outlined
            dense
            :items="yearOptions"
            background-color="white"
            v-model="academicYear"
            :rules="requiredRule"
          ></v-autocomplete>
          <v-autocomplete
            label="Institution"
            outlined
            dense
            background-color="white"
            :items="institutionOptions"
            item-text="NAME"
            item-value="INSTITUTION_ID"
            v-model="institutionId"
            :rules="requiredRule"
          ></v-autocomplete>

          <p>This form does not work yet</p>

          <v-btn color="secondary" @click="hide">Cancel</v-btn>
          <!-- <v-btn
            color="primary"
            class="float-right"
            @click="create"
            :disabled="!valid"
            >Create</v-btn
          > -->
        </v-form>
      </v-card-text>
    </v-card></v-dialog
  >
</template>

<script>
import moment from "moment";
import axios from "axios";
import store from "../../store";
import { APPLICATION_URL, INSTITUTION_URL } from "../../urls";

export default {
  computed: {
    student: function () {
      return store.getters.selectedStudent;
    },
  },
  data: () => ({
    visible: false,
    valid: false,
    yearOptions: [],
    institutionOptions: [],

    studentId: -1,
    studentName: "",
    academicYear: 0,
    institutionId: null,
    requiredRule: [(v) => !!v || "This is required"],
  }),
  methods: {
    show(student) {
      this.studentId = student.STUDENT_ID;
      this.institutionId = null;
      this.studentName = `${this.student.FIRST_NAME} ${this.student.INITIALS} ${this.student.LAST_NAME}`;

      if (this.student.SIN) this.studentName += ` (${this.student.SIN})`;

      this.loadInstitutions();

      this.yearOptions = [];

      let startYear = 1990;
      let currentYear = moment().year() + 1;

      for (let i = currentYear; i >= startYear; i--) {
        this.yearOptions.push(`${i}`);
      }

      this.academicYear = `${moment().year()}`;
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    loadInstitutions() {
      axios.get(INSTITUTION_URL).then((resp) => {
        this.institutionOptions = resp.data.filter(
          (i) => i.IS_ACTIVE_FLG == "Y"
        );
      });
    },
    create() {
      let body = {
        studentId: this.studentId,
        academicYear: this.academicYear,
        institutionId: this.institutionId,
      };

      axios.post(`${APPLICATION_URL}`, body).then((resp) => {
        this.$emit("showAPIMessages", resp.data);

        if (resp.data && resp.data.data && resp.data.data.id) {
          let newId = resp.data.data.id;
          this.visible = false;
          store.dispatch("clearStudent");
          store.dispatch("loadApplication", newId);
          this.$router.push(`/application/${newId}/personal`);
        }
      });
    },
  },
};
</script>
