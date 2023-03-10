<template>
  <div class="home">
    <h1>Application Basics</h1>

    <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
      <v-tab key="0">Program</v-tab>
      <v-tab key="1">Residence History</v-tab>
      <v-tab key="2">Education</v-tab>
      <v-tab key="3">Demographics</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="padding: 20px">

      <v-tab-item key="0">
        <academic-year></academic-year>
        <program-information-form
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        ></program-information-form>
      </v-tab-item>

      <v-tab-item key="1">
        <ResidenceHistoryForm 
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        >
        </ResidenceHistoryForm>
      </v-tab-item>

      <v-tab-item key="2">
        <EducationForm 
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        >
        </EducationForm>
      </v-tab-item>
      
      <v-tab-item key="3">
        <StatisticalForm 
          v-on:showSuccess="showSuccess"
          v-on:showError="showError"
        >
        </StatisticalForm>
      </v-tab-item>
  
    </v-tabs-items>
  </div>
</template>
<script>
import { mapState } from "vuex";
import store from "../../store";
import ParentDependentsForm from "./ParentDependentsForm.vue";
import ParentInfoForm from "./ParentInfoForm.vue";
import ProgramInformationForm from "./ProgramInformationForm.vue";
import StatisticalForm from "./StatisticalForm.vue";
import AcademicYear from './AcademicYear.vue';
import ResidenceHistoryForm from './ResidenceHistoryForm.vue';
import EducationForm from './EducationForm.vue';

export default {
  components: {
    ProgramInformationForm,
    StatisticalForm,
    ParentDependentsForm,
    ParentInfoForm,
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
