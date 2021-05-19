<template>
  <div class="home">
    <h1>Personal</h1>
    <hr />

    <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
      <v-tab key="0">Contact</v-tab>
      <v-tab key="1">Basic</v-tab>
      <v-tab key="2">Statistical</v-tab>
      <v-tab key="4">Next of kin / consent</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="padding: 20px">
      <v-tab-item key="0">
        <contact-form></contact-form>
      </v-tab-item>
      <v-tab-item key="1">
        <basic-demographics-form></basic-demographics-form>
      </v-tab-item>
      <v-tab-item key="2">
        <statistical-form></statistical-form>
      </v-tab-item>
      <v-tab-item key="4">
        <consent-form></consent-form>
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
  async created() {
  },
  methods: {},
};
</script>
