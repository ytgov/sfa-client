<template>
  <div class="home">
    <h1>Application Basics</h1>

    <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
      <v-tab key="0">Academic Year</v-tab>
      <v-tab key="1">Demographics</v-tab>
      <v-tab key="2">Residence History</v-tab>
      <v-tab key="3">Education</v-tab>
      <v-tab key="5">YEA Info</v-tab>
      <v-tab key="6">Yukon Grant/STA Info</v-tab>
      <v-tab key="7">Parent Info</v-tab>
      <v-tab key="8">Spouse</v-tab>
      <v-tab key="9">CSL Info</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="padding: 20px">
      <v-tab-item key="0">
        <program-information
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"></program-information>
      </v-tab-item>
      <v-tab-item key="1">
        <statistical-form
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></statistical-form>
      </v-tab-item>
      <v-tab-item key="2">
        <residence-history-form
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></residence-history-form>
      </v-tab-item>
      <v-tab-item key="3">
        <education-history-form
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></education-history-form>
      </v-tab-item>
      <v-tab-item key="5"
        ><yea-info-form
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></yea-info-form
      ></v-tab-item>
      <v-tab-item key="6"
        ><yg-sta-info-form
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></yg-sta-info-form
      ></v-tab-item>
      <v-tab-item key="7">
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
      <v-tab-item key="8">
        <spouse-form
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></spouse-form>
      </v-tab-item>
      <v-tab-item key="9">
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
