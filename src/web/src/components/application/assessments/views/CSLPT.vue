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
          <v-tab key="2">INCOME</v-tab>
          <v-tab key="3">AWARD</v-tab>
          <v-tab key="4">MSFAA</v-tab>
        </v-tabs>
        <v-divider></v-divider>
        <v-card-text v-if="assessment" class="pt-0">
          <v-tabs-items v-model="tab" class="pt-4">
            <v-tab-item key="0">
              <tab-base></tab-base>
            </v-tab-item>
            <v-tab-item key="1">
              COSTS
              <tab-base></tab-base>
            </v-tab-item>
            <v-tab-item key="2">
              INCOME
              <tab-base></tab-base>
            </v-tab-item>
            <v-tab-item key="3">
              AWARD
              <tab-base></tab-base>
            </v-tab-item>
            <v-tab-item key="4">
              MSFAA
              <tab-base></tab-base>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
    </div>

    <div class="mt-4">
      <v-card class="default mb-5 bg-color-blue">
        <v-card-text>
          <csl-disbursements
            store="cslPTStore"
            v-on:showError="showError"
            v-on:showSuccess="showSuccess"
          ></csl-disbursements>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { isNumber } from "lodash";
import { mapActions, mapGetters, mapState } from "vuex";
import CslDisbursements from "../components/csl-disbursements.vue";

import TabBase from "../components/csl-pt/tab-base.vue";

export default {
  name: "Home",
  components: { CslDisbursements, TabBase },
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
  },
  computed: {
    ...mapState({ application: "selectedApplication" }),
    ...mapState("cslPTStore", ["assessment"]),
    ...mapGetters(["cslClassifications", "disbursementTypes", "changeReasons"]),
  },
  methods: {
    ...mapActions("cslPTStore", ["initialize"]),
    ...mapActions(["setCslClassifications", "setDisbursementTypes", "setChangeReasons", "setMaritalStatusList"]),

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
