<template>
  <div class="home">
    <h1>Expenses</h1>

    <v-tabs v-model="tab" background-color="#fff2d5" color="primary">
      <v-tab key="0">Pre-study Expenses</v-tab>
      <v-tab key="1">Study Expenses</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="padding: 20px">
      <v-tab-item key="0">
        <prestudy-expenses></prestudy-expenses>
      </v-tab-item>
      <v-tab-item key="1">
        <study-expenses></study-expenses>
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
    this.loadStudent(this.studentId);},
  methods: {},
};
</script>
