<template>
  <div>
    <div class="d-flex">
      <v-btn :to="`/application/${applicationId}/status`" color="warning" x-small fab class="mt-2 mr-5">
        <v-icon>mdi-keyboard-backspace</v-icon>
      </v-btn>
      <h1 class="mb-0">Funding Status</h1>
    </div>

    <div class="mt-4">
      <v-card class="default mb-1 bg-color-blue">
        <v-card-title class="pb-3"
          >Assessment - CSLPT
          <v-spacer></v-spacer>
          <v-btn dense color="primary" class="my-0" @click="saveClick" :disabled="!assessment.id">
            Recalculate
          </v-btn>
        </v-card-title>
        <v-divider class="mt-1"></v-divider>

        <v-tabs v-model="tab">
          <v-tab key="0">BASE</v-tab>
          <v-tab key="1">COSTS</v-tab>
          <v-tab key="2">AWARD</v-tab>
          <v-tab key="3">MSFAA</v-tab>
        </v-tabs>
        <v-divider></v-divider>
        <v-card-text v-if="assessment" class="pt-0">
          <v-tabs-items v-model="tab" class="pt-4">
            <v-tab-item key="0">
              <tab-base></tab-base>
            </v-tab-item>
            <v-tab-item key="1">
              <tab-costs></tab-costs>
            </v-tab-item>
            <v-tab-item key="2">
              <tab-award></tab-award>
            </v-tab-item>
            <v-tab-item key="3">
              <tab-msfaa></tab-msfaa>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
    </div>
    <div class="mt-4" v-if="tab == 2">
      <v-card class="default mb-5 bg-color-blue">
        <v-card-text>
          <cslpt-disbursements
            :disbursements="disbursements"
            v-on:showError="showError"
            v-on:showSuccess="showSuccess"
          ></cslpt-disbursements>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { mapActions, mapGetters, mapState } from "vuex";
import CslptDisbursements from "../components/cslpt-disbursements.vue";

import TabBase from "../components/csl-pt/tab-base.vue";
import TabCosts from "../components/csl-pt/tab-costs.vue";
import TabAward from "../components/csl-pt/tab-award.vue";
import TabMsfaa from "../components/csl-pt/tab-msfaa.vue";

export default {
  name: "Home",
  components: { CslptDisbursements, TabBase, TabCosts, TabAward, TabMsfaa },
  data: () => ({
    tab: 0,
  }),
  async created() {
    this.applicationId = this.$route.params.id;
    store.dispatch("setAppSidebar", true);

    if (this.application && this.application.id == this.applicationId) {
      await this.initialize(this.application).then((r) => {});
    } else {
      await store.dispatch("loadApplication", this.applicationId).then(async (res) => {
        await this.initialize(this.application).then((r) => {});
      });
    }

    await this.setCslClassifications();
    await this.setDisbursementTypes();
    await this.setChangeReasons();
    await this.setMaritalStatusList();
    await this.setStudyAreas();
    await this.setProvinces();
    await this.setPrograms();
  },
  computed: {
    ...mapState({ application: "selectedApplication" }),
    ...mapState("cslPartTimeStore", ["assessment", "disbursements"]),
    ...mapGetters(["cslClassifications", "disbursementTypes", "changeReasons"]),
  },
  methods: {
    ...mapActions("cslPartTimeStore", ["initialize"]),
    ...mapActions([
      "setCslClassifications",
      "setDisbursementTypes",
      "setChangeReasons",
      "setMaritalStatusList",
      "setStudyAreas",
      "setProvinces",
      "setPrograms",
    ]),

    showSuccess(mgs) {
      this.$emit("showSuccess", mgs);
    },
    showError(mgs) {
      this.$emit("showError", mgs);
    },
    saveClick() {},
  },
};
</script>

<style scoped>
.v-tabs-items,
.theme--light.v-tabs > .v-tabs-bar {
  background-color: #ffffff00 !important;
}
</style>
