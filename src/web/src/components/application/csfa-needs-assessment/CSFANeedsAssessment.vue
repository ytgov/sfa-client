<template>
    <div class="home">
      <h1>CSFA Needs Assessment</h1>
  
      <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
        <v-tab key="0">ACCOMMODATION</v-tab>
        <v-tab key="1">RESOURCES</v-tab>
        <v-tab key="2">COSTS</v-tab>
        <v-tab key="3">SCREENING</v-tab>
      </v-tabs>
  
      <v-tabs-items v-model="tab" style="padding: 20px">
  
        <v-tab-item key="0">
          <AccommodationForm
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
          ></AccommodationForm>
        </v-tab-item>
        <v-tab-item key="1">
          <StudyIncomeForm 
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
          ></StudyIncomeForm>
        </v-tab-item>
        <v-tab-item key="2">
          <Costs
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
          ></Costs>
        </v-tab-item>
        <v-tab-item key="3">
          <Screening
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
          ></Screening>
        </v-tab-item>
       
      </v-tabs-items>
    </div>
  </template>
  
  <script>
  import store from "@/store";
import AccommodationForm from "./AccommodationForm.vue";
import StudyIncomeForm from "./StudyIncomeForm.vue";
import Costs from './costs/Costs.vue';
import Screening from './screening/Screening.vue';

  export default {
    name: "Home",
    components: {
      AccommodationForm,
      StudyIncomeForm,
      Costs,
      Screening,
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
  