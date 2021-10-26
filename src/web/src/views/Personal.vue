<template>
  <div class="home">
    <h1>Personal</h1>

    <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
      <v-tab key="0">Contact</v-tab>
      <v-tab key="1">Demographics</v-tab>
      <v-tab key="2">Consent</v-tab>
      <v-tab key="3">Residence History</v-tab>
      <v-tab key="4">Education</v-tab>
      <v-tab key="5">Dependents</v-tab>
      <v-tab key="6">YEA Info</v-tab>
      <v-tab key="7">Yukon Grant/STA Info</v-tab>
      <v-tab key="8">Parent Info</v-tab>
      <v-tab key="9">Spouse</v-tab>
      <v-tab key="10">CSL Info</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="padding: 20px">
      <v-tab-item key="0">
        <contact-form :student="student"></contact-form>
      </v-tab-item>
      <v-tab-item key="1">
        <basic-demographics-form :student="student"></basic-demographics-form>
        <statistical-form :student="student"></statistical-form>
      </v-tab-item>
      <v-tab-item key="2">
        <consent-form :student="student"></consent-form>
      </v-tab-item>
      <v-tab-item key="3">
        <residence-history-form :student="student"></residence-history-form>
      </v-tab-item>
      <v-tab-item key="4">
        <education-history-form :student="student"></education-history-form>
      </v-tab-item>
      <v-tab-item key="5">
        <student-dependents-form :student="student"></student-dependents-form>
      </v-tab-item>
      <v-tab-item key="6"
        ><yea-info-form :student="student"></yea-info-form
      ></v-tab-item>
      <v-tab-item key="7"
        ><yg-sta-info-form :student="student"></yg-sta-info-form
      ></v-tab-item>
      <v-tab-item key="8">
        <parent-info-form :student="student"></parent-info-form>
        <hr class="mt-5 mb-2" />
        <h2>Dependents</h2>
        <parent-dependents-form :student="student"></parent-dependents-form>
      </v-tab-item>
      <v-tab-item key="9">
        <spouse-form :student="student"></spouse-form>
      </v-tab-item>
      <v-tab-item key="10">
        <csl-restriction :student="student"></csl-restriction>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
import { APPLICATION_URL } from "../urls";

export default {
  name: "Home",
  data: () => ({
    tab: 0,
    studentId: -1,
    student: {},
  }),
  async created() {
    this.studentId = this.$route.params.id;
    this.loadStudent(this.studentId);
  },
  methods: {
    loadStudent(id) {
      axios
        .get(`${APPLICATION_URL}/${id}`)
        .then((resp) => {
          this.student = resp.data.data.student;
          store.dispatch("setStudent", this.student);
        })
        .catch((err) => console.log("ERROR LOADING STUDENT", err));
    },
  },
};
</script>
