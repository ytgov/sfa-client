<template>
  <div class="home">
    <h1>CSL Funding Requests</h1>
    <hr />

    <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
      <v-tab key="0">CSL Full-Time</v-tab>
      <v-tab key="1">CSL Part-Time</v-tab>
      <v-tab key="2">CSG Disability</v-tab>
      <v-tab key="3">CSG/CAG Other</v-tab>
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
        <canada-study></canada-study>
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
