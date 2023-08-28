<template>
  <div class="home">
    <h1>Family Info</h1>

    <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
      <v-tab key="0">PARENT DETAILS</v-tab>
      <v-tab key="1">SPOUSE DETAILS</v-tab>
      <v-tab key="2">DEPENDENT DETAILS</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="padding: 20px">

      <v-tab-item key="0">
        <academic-year></academic-year>
        <ParentDetails
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></ParentDetails>
      </v-tab-item>

      <v-tab-item key="1">
        <SpouseForm 
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        >
        </SpouseForm>
      </v-tab-item>

      <v-tab-item key="2">
        <StudentDependents 
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        >
        </StudentDependents>
      </v-tab-item>
  
    </v-tabs-items>
  </div>
</template>
<script>
import { mapState } from "vuex";
import store from "@/store";
import ParentDetails from "./parent-details/Main.vue";
import SpouseForm from "./spouse-details/SpouseForm.vue";
import StudentDependents from "./dependents-details/StudentDependents";
import ProgramInformationForm from "../ProgramInformationForm.vue";
import StatisticalForm from "../StatisticalForm.vue";
import AcademicYear from '../AcademicYear.vue';
import ResidenceHistoryForm from '../ResidenceHistoryForm.vue';
import EducationForm from '../EducationForm.vue';

export default {
  components: {
    ProgramInformationForm,
    StatisticalForm,
    ParentDetails,
    SpouseForm,
    StudentDependents,
    ResidenceHistoryForm,
    EducationForm,
  },
  name: "Home",
    AcademicYear,
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