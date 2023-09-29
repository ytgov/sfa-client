<template>
  <div class="home">
    <h1>Family Info</h1>

    <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
      <v-tab key="0">PARENT DETAILS</v-tab>
      <v-tab key="1">SPOUSE DETAILS</v-tab>
      <v-tab key="2">DEPENDENT DETAILS</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="padding: 20px 0">
      <v-tab-item key="0">
        <ParentDetails v-on:showSuccess="showSuccess" v-on:showError="showError"></ParentDetails>
      </v-tab-item>

      <v-tab-item key="1">
        <SpouseForm v-on:showSuccess="showSuccess" v-on:showError="showError"> </SpouseForm>
      </v-tab-item>

      <v-tab-item key="2">
        <StudentDependents v-on:showSuccess="showSuccess" v-on:showError="showError"> </StudentDependents>
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

export default {
  components: {
    ParentDetails,
    SpouseForm,
    StudentDependents,
  },
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

    if (this.applicationId != storeApp.id) {
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
