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
        <contact-form></contact-form>
      </v-tab-item>
      <v-tab-item key="1">
        <basic-demographics-form></basic-demographics-form>
        <statistical-form></statistical-form>
      </v-tab-item>
      <v-tab-item key="2">
        <consent-form></consent-form>
      </v-tab-item>
      <v-tab-item key="3">
        <residence-history-form></residence-history-form>
      </v-tab-item>
      <v-tab-item key="4">
        <education-history-form></education-history-form>
      </v-tab-item>
      <v-tab-item key="5">
        <student-dependents-form></student-dependents-form>
      </v-tab-item>
      <v-tab-item key="6"><yea-info-form></yea-info-form></v-tab-item>
      <v-tab-item key="7"><yg-sta-info-form></yg-sta-info-form></v-tab-item>
      <v-tab-item key="8">
        <parent-info-form></parent-info-form>
        <hr class="mt-5 mb-2" />
        <h2>Dependents</h2>
        <parent-dependents-form></parent-dependents-form>
      </v-tab-item>
      <v-tab-item key="9">
        <spouse-form></spouse-form>
      </v-tab-item>
      <v-tab-item key="10">
        <csl-restriction></csl-restriction>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store";

export default {
  name: "Home",
  computed: {
    ...mapState(["selectedStudent"]),
  },
  data: () => ({
    tab: 0,
    applicationId: -1,
  }),
  async created() {
    this.applicationId = this.$route.params.id;
    let storeApp = store.getters.selectedApplication;

    console.log(
      "URL WANTS: ",
      this.applicationId,
      "HAS",
      storeApp.HISTORY_DETAIL_ID
    );

    if (this.applicationId != storeApp.HISTORY_DETAIL_ID) {
      console.log("LOADING APPLICTION BASED ON URL");
      await store.dispatch("loadApplication", this.applicationId);
    }

    store.dispatch("setAppSidebar", true);
  },
  watch: {
    student: function (val) {
      console.log("WATCH STUDENT", val);

      if (val) this.updateView(val);
    },
    selectedStudent: function (val) {
      console.log("WATCH selectedStudent", val);
    },
  },
  methods: {},
};
</script>
