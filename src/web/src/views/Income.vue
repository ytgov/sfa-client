<template>
  <div class="home">
    <h1>Income</h1>

    <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
      <v-tab key="0">Pre-Study Income</v-tab>
      <v-tab key="1">Study Income</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="padding: 20px">
      <v-tab-item key="0">
        <prestudy-income></prestudy-income>
      </v-tab-item>
      <v-tab-item key="1">
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
