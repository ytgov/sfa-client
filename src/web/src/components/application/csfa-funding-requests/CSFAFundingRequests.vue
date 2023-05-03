<template>
  <div class="home">
    <h1>CSL Funding Requests</h1>

    <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
      <v-tab key="0">CSFA Full-Time</v-tab>
      <v-tab key="1">CSFA Part-Time</v-tab>
      <v-tab key="2">CSG Disability</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="padding: 20px">

      <v-tab-item key="0">
        <CSFAFullTime
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></CSFAFullTime>
      </v-tab-item>
      <v-tab-item key="1">
        <CSFAPartTime
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></CSFAPartTime>
      </v-tab-item>
      <v-tab-item key="2">
        <CSGDisabilityForm
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></CSGDisabilityForm>
      </v-tab-item>
     
    </v-tabs-items>
  </div>
</template>

<script>
import store from "@/store";
import CSFAFullTime from "./csfa-full-time/CSFAFullTime.vue";
import CSFAPartTime from "./csfa-part-time/CSFAPartTime.vue";
import CSGDisabilityForm from "./csg-disability/CSGDisabilityForm.vue";

export default {
  name: "Home",
  components: {
    CSFAFullTime,
    CSFAPartTime,
    CSGDisabilityForm,
  },
  data: () => ({
    tab: 0,
    applicationId: -1,
  }),
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
