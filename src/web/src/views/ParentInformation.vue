<template>
  <div class="home">
    <h1>Parent Information</h1>

    <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
      <v-tab key="0">Parent Info</v-tab>
      <v-tab key="1">Parent Dependents</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="padding: 20px">
      <v-tab-item key="0">
        <parent-info-form></parent-info-form>
      </v-tab-item>
      <v-tab-item key="1">
        <parent-dependents-form></parent-dependents-form>
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
