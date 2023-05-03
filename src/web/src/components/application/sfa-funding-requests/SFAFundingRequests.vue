<template>
  <div class="home">
    <h1>SFA Funding Requests</h1>

    <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
      <v-tab key="0">Yukon Grant</v-tab>
      <v-tab key="1">YUKON EXCELLENCE AWARD</v-tab>
      <v-tab key="2">STUDENT TRAINING ALLOWANCE</v-tab>
      <v-tab key="3">SCHOLARSHIPS</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="padding: 20px">
      <v-tab-item key="0">
        <yukon-grant
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></yukon-grant>
      </v-tab-item>
      <v-tab-item key="1">
        <YukonExcellenceAward
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></YukonExcellenceAward>
      </v-tab-item>
      <v-tab-item key="2">
        <StudentTrainingAllowance
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></StudentTrainingAllowance>
      </v-tab-item>
      <v-tab-item key="3">
        <ScholarshipApplications
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></ScholarshipApplications>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import store from "@/store";
import YukonGrant from "./yukon-grant/YukonGrant.vue";
import YukonExcellenceAward from "./yukon-excellence-award/YukonExcellenceAward.vue";
import StudentTrainingAllowance from "./student-training-allowance/StudentTrainingAllowance.vue";
import ScholarshipApplications from "./scholarships/ScholarshipApplications.vue";

export default {
  name: "Home",
  data: () => ({
    tab: 0,
    applicationId: -1,
  }),
  components: {
    YukonGrant,
    YukonExcellenceAward,
    StudentTrainingAllowance,
    ScholarshipApplications,
  },
  async created() {
    this.applicationId = this.$route.params.id;
    let storeApp = store.getters.selectedApplication;

    if (this.applicationId != storeApp.HISTORY_DETAIL_ID) {
      await store.dispatch("loadApplication", this.applicationId);
    }

    store.dispatch("setAppSidebar", true);
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
