<template>
  <div class="home">
    <h1>Student Details</h1>

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
        <contact-form
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></contact-form>
      </v-tab-item>
      <v-tab-item key="1">
        <basic-demographics-form
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></basic-demographics-form>
      </v-tab-item>
      <v-tab-item key="2">
        <consent-form
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></consent-form>
      </v-tab-item>
      <v-tab-item key="3">
        <residence-history-form
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></residence-history-form>
      </v-tab-item>
      <v-tab-item key="4">
        <education-history-form
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></education-history-form>
      </v-tab-item>
      <v-tab-item key="5">
        <student-dependents-form
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></student-dependents-form>
      </v-tab-item>
      <v-tab-item key="6"
        ><yea-info-form
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></yea-info-form
      ></v-tab-item>
      <v-tab-item key="7"
        ><yg-sta-info-form
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></yg-sta-info-form
      ></v-tab-item>
      <v-tab-item key="8">
        <parent-info-form
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></parent-info-form>
        <hr class="mt-5 mb-2" />
        <h2>Dependents</h2>
        <parent-dependents-form
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></parent-dependents-form>
      </v-tab-item>
      <v-tab-item key="9">
        <spouse-form
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></spouse-form>
      </v-tab-item>
      <v-tab-item key="10">
        <csl-restriction
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></csl-restriction>
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

    if (this.$route.path.indexOf("/student/") >= 0) {
      //console.log("LOADING STUDENT BASED ON URL");
      await store.dispatch("loadStudent", this.applicationId);
      store.dispatch("setAppSidebar", true);
    } else {
      if (this.applicationId != storeApp.HISTORY_DETAIL_ID) {
        //console.log("LOADING APPLICTION BASED ON URL");
        await store.dispatch("loadApplication", this.applicationId);
        store.dispatch("setAppSidebar", true);
      }
    }
  },
  watch: {
    student: function (val) {
      if (val) this.updateView(val);
    },
    //selectedStudent: function (val) {
    //console.log("WATCH selectedStudent", val);
    //},
  },
  methods: {
    showSuccess(mgs) {
      this.$emit("showSuccess", mgs);
    },
    showError(mgs) {
      this.$emit("showError", mgs);
    },
  },
};
</script>
