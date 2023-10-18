<template>
  <div>
  <!--   <div class="d-flex">
      <v-btn :to="`/application/${applicationId}/status`" color="warning" x-small fab class="mt-2 mr-5">
        <v-icon>mdi-keyboard-backspace</v-icon>
      </v-btn>
      <h1 class="mb-0">Funding Status</h1>
    </div> -->

    <div class="mt-4">
      <v-card class="default mb-1 bg-color-blue">
        <v-card-title class="pb-3"
          >
      <v-btn :to="`/application/${applicationId}/status`" color="warning" x-small fab class="my-0 mr-5">
        <v-icon>mdi-keyboard-backspace</v-icon>
      </v-btn>Assessment: CSFA-PT

          <v-spacer />
          <div>
            <v-chip class="my-0 ml-3 text-regular" color="brown lighten-4" style="font-weight: 400"
              >Total Awarded: {{ totalAwarded }}</v-chip
            >
            <v-chip class="my-0 ml-3" color="indigo lighten-4" style="font-weight: 400"
              >{{ percentAwarded }} of Need</v-chip
            >
            <v-chip
              class="my-0 ml-3"
              :color="msfaa.msfaa_status == 'Received' ? 'green lighten-3' : 'orange lighten-4'"
              style="font-weight: 400"
              >MSFAA: {{ msfaa?.msfaa_status ?? "Not Sent" }}</v-chip
            >
          </div>
        </v-card-title>
        <v-divider class="mt-1"></v-divider>

        <v-tabs v-model="tab">
          <v-tab key="0">Base</v-tab>
          <v-tab key="1">Costs<br />{{ formatMoney(totalCosts) }}</v-tab>
          <v-tab key="2"
            >CSGD<br />
            {{ formatMoney(disAmount) }}</v-tab
          >
          <v-tab key="3">CSG-PT<br />{{ formatMoney(grantAmount) }}</v-tab>
          <v-tab key="4"
            >CSG-PTDEP<br />
            {{ formatMoney(depAmount) }}</v-tab
          >
          <v-tab key="5">CSL-PT<br />{{ formatMoney(assessedAmount) }}</v-tab>
          <v-tab key="6">MSFAA</v-tab>
        </v-tabs>
        <v-divider></v-divider>
        <!--  <v-card-text class="pt-0"> -->
        <v-tabs-items v-if="assessment" v-model="tab">
          <v-tab-item key="0">
            <tab-base></tab-base>
          </v-tab-item>
          <v-tab-item key="1">
            <tab-costs></tab-costs>
          </v-tab-item>
          <v-tab-item key="2">
            <tab-disability v-on:showError="showError" v-on:showSuccess="showSuccess"></tab-disability>
          </v-tab-item>
          <v-tab-item key="3">
            <tab-grant></tab-grant>
          </v-tab-item>
          <v-tab-item key="4">
            <tab-dependent></tab-dependent>
          </v-tab-item>
          <v-tab-item key="5">
            <tab-award></tab-award>
          </v-tab-item>
          <v-tab-item key="6">
            <tab-msfaa></tab-msfaa>
          </v-tab-item>
        </v-tabs-items>
        <!-- </v-card-text> -->
      </v-card>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { isNumber } from "lodash";
import { mapActions, mapGetters, mapState } from "vuex";

import TabBase from "../components/csl-pt/tab-base.vue";
import TabCosts from "../components/csl-pt/tab-costs.vue";
import TabAward from "../components/csl-pt/tab-award.vue";
import TabGrant from "../components/csl-pt/tab-grant.vue";
import TabDependent from "../components/csl-pt/tab-dependent.vue";
import TabDisability from "../components/csl-pt/tab-disability.vue";
import TabMsfaa from "../components/csl-pt/tab-msfaa.vue";

export default {
  name: "Home",
  components: {
    TabBase,
    TabCosts,
    TabGrant,
    TabDependent,
    TabDisability,
    TabAward,
    TabMsfaa,
  },
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
    await this.setStatus();
    await this.setStatusReasons();
  },
  computed: {
    ...mapState({ application: "selectedApplication" }),
    ...mapState("cslPartTimeStore", ["assessment", "disbursements", "msfaa"]),
    ...mapGetters("cslPartTimeStore", ["totalCosts", "assessedAmount"]),
    ...mapGetters("csgPartTimeStore", { grantAmount: "assessedAmount" }),
    ...mapGetters("csgPartTimeDependentStore", { depAmount: "assessedAmount" }),
    ...mapGetters("csgPartTimeDisabilityStore", { disAmount: "assessedAmount" }),
    ...mapGetters(["cslClassifications", "disbursementTypes", "changeReasons"]),
    totalAwarded() {
      return this.formatMoney(this.disAmount + this.grantAmount + this.depAmount + this.assessedAmount);
    },
    percentAwarded() {
      return `${Math.round(
        (100 * (this.disAmount + this.grantAmount + this.depAmount + this.assessedAmount)) / this.totalCosts
      )}%`;
    },
  },
  methods: {
    ...mapActions("cslPartTimeStore", ["initialize", "recalculate"]),
    ...mapActions([
      "setCslClassifications",
      "setDisbursementTypes",
      "setChangeReasons",
      "setMaritalStatusList",
      "setStudyAreas",
      "setProvinces",
      "setPrograms",
      "setStatus",
      "setStatusReasons",
    ]),

    showSuccess(mgs) {
      this.$emit("showSuccess", mgs);
    },
    showError(mgs) {
      this.$emit("showError", mgs);
    },
    formatMoney(input, defaultVal = false) {
      if (isNumber(input)) {
        return Intl.NumberFormat("en", {
          currency: "USD",
          style: "currency",
        }).format(input);
      }
      if (defaultVal) return input;
      return "$0.00";
    },
  },
};
</script>

<style scoped>
.v-tabs-items,
.theme--light.v-tabs > .v-tabs-bar {
  background-color: #ffffff00 !important;
}
</style>
