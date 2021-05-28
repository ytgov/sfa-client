<template>
  <div class="home">
    <h1>Academic Year</h1>

    <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
      <v-tab key="0">Program</v-tab>
      <v-tab key="1">Credit Check</v-tab>
      <v-tab key="2">CSL Restrictions</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="padding: 20px">
      <v-tab-item key="0">
        <program-information></program-information>
      </v-tab-item>
      <v-tab-item key="1">
        <credit-check></credit-check>
      </v-tab-item>
      <v-tab-item key="2">
        <csl-restriction></csl-restriction>
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
