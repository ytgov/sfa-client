<template>
  <div class="home">
    <h1>SFA Funding Requests</h1>

    <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
      <v-tab key="0">Training Allowance</v-tab>
      <v-tab key="1">Yukon Grant</v-tab>
      <v-tab key="2">Yukon Excellence Awards</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="padding: 20px">
      <v-tab-item key="0">
        <training-allowance></training-allowance>
      </v-tab-item>
      <v-tab-item key="1">
        <yukon-grant></yukon-grant>
      </v-tab-item>
      <v-tab-item key="2">
        <yukon-excellence></yukon-excellence>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import store from "../../store";

export default {
  name: "Home",
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
  methods: {},
};
</script>
