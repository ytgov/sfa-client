<template>
  <div class="home">
    <h1>Personal</h1>

    <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
      <v-tab key="0">Contact</v-tab>
      <v-tab key="1">Demographics</v-tab>
      <v-tab key="2">Consent</v-tab>
      <v-tab key="3">Residence History</v-tab>
      <v-tab key="4">YEA Info</v-tab>
      <v-tab key="5">Yukon Grant/STA Info</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="padding: 20px">
      <v-tab-item key="0">
        <contact-form></contact-form>
      </v-tab-item>
      <v-tab-item key="1">
        <basic-demographics-form></basic-demographics-form>
        <statistical-form></statistical-form>
      </v-tab-item>
      <v-tab-item key="2">
        <consent-form></consent-form>
      </v-tab-item>
      <v-tab-item key="3">
        <residence-history-form></residence-history-form>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    tab: 0,
  }),
  async created() {},
  methods: {},
};
</script>
