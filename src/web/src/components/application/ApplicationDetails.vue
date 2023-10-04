<template>
  <div class="home">
    <h1>Application Basics</h1>

    <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
      <v-tab key="0">Program Details</v-tab>
      <v-tab key="1">Residency</v-tab>
      <v-tab key="2">Education History</v-tab>
      <v-tab key="3">Statistical Info</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="padding: 20px 0">
      <v-tab-item key="0">
        <!-- TODO Review academic-year component -->
        <!-- <academic-year></academic-year> -->
        <program-information-form v-on:showSuccess="showSuccess" v-on:showError="showError"></program-information-form>
      </v-tab-item>

      <v-tab-item key="1">
        <ResidenceHistoryForm v-on:showSuccess="showSuccess" v-on:showError="showError"> </ResidenceHistoryForm>
      </v-tab-item>

      <v-tab-item key="2">
        <EducationForm v-on:showSuccess="showSuccess" v-on:showError="showError"> </EducationForm>
      </v-tab-item>

      <v-tab-item key="3">
        <StatisticalForm v-on:showSuccess="showSuccess" v-on:showError="showError"> </StatisticalForm>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import { mapState } from "vuex";
import store from "../../store";
import ProgramInformationForm from "./ProgramInformationForm.vue";
import StatisticalForm from "./StatisticalForm.vue";
import ResidenceHistoryForm from "./ResidenceHistoryForm.vue";
import EducationForm from "./EducationForm.vue";

export default {
  components: {
    ProgramInformationForm,
    StatisticalForm,
    ResidenceHistoryForm,
    EducationForm,
  },
  name: "Home",
  computed: {
    ...mapState(["selectedStudent"]),
    ...mapState(["selectedApplication"]),
  },
  data: () => ({
    tab: 0,
    applicationId: -1,
  }),
  async created() {
    await store.dispatch("clearApplication");
    await store.dispatch("clearStudent");
    this.applicationId = this.$route.params.id;

    if (this.$route.path.indexOf("/application/") >= 0) {
      await store.dispatch("loadApplication", this.applicationId);
    } else {
      if (this.applicationId != storeApp.id) {
        await store.dispatch("loadApplication", this.applicationId);
      }
    }

    store.dispatch("setAppSidebar", true);
  },
  watch: {
    student: function(val) {
      if (val) this.updateView(val);
    },
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
