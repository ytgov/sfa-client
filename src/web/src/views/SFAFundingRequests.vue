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
export default {
  name: "Home",
  data: () => ({
    tab: 0,
  }),
  async created() {
    this.studentId = this.$route.params.id;
  },
  methods: {},
};
</script>
