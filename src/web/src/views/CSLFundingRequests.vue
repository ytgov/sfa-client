<template>
  <div class="home">
    <h1>CSL Funding Requests</h1>

    <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
      <v-tab key="0">CSL Full-Time</v-tab>
      <v-tab key="1">CSL Part-Time</v-tab>
      <v-tab key="2">CSG Disability</v-tab>
      <v-tab key="3">Credit Check</v-tab>
      <v-tab key="4">Accommodation</v-tab>
      <v-tab key="5">Expenses</v-tab>
      <v-tab key="6">Income</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="padding: 20px">
      <v-tab-item key="0">
        <csl-fulltime></csl-fulltime>
      </v-tab-item>
      <v-tab-item key="1">
        <csl-parttime></csl-parttime>
      </v-tab-item>
      <v-tab-item key="2">
        <csg-disability></csg-disability>
      </v-tab-item>
      <v-tab-item key="3">
        <credit-check></credit-check>
      </v-tab-item>
      <v-tab-item key="4">
        <accommodation></accommodation>
      </v-tab-item>
      <v-tab-item key="5">
        <h2>Pre-Study Expenses</h2>
        <prestudy-expenses></prestudy-expenses>
        <h2>Study Expenses</h2>
        <study-expenses></study-expenses>
      </v-tab-item>
      <v-tab-item key="6">
        <study-income></study-income>
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
