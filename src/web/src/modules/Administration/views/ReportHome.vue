<template>
  <div>
    <v-breadcrumbs
      divider="/"
      large
      :items="[
        {
          text: 'Administration Home',
          to: '/administration',
          exact: true,
        },
        {
          text: 'Reports',
          to: '/administration/reports',
          exact: true,
        },
      ]"
    >
    </v-breadcrumbs>
    <h1>Reports</h1>

    <v-divider></v-divider>

    <v-row>
      <v-col class="d-flex">
        <v-select :items="reportOptions" v-model="report" return-object></v-select>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="runClick">Run</v-btn>
      </v-col>
    </v-row>
    <v-card class="default">
      <v-card-text>
        <v-data-table :headers="reportHeaders" :items="reportData"> </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import store from "@/store";

export default {
  data: () => ({}),
  computed: {
    ...mapState(["showSideBarAdmin"]),
    ...mapGetters("reportsStore", ["reportHeaders", "reportData"]),
    ...mapState("reportsStore", ["reportOptions", "selectedReport"]),
    report: {
      get() {
        return this.selectedReport;
      },
      set(value) {
        this.setReport(value)
      }
    }
  },
  async created() {
    await store.dispatch("setAppSideBarAdmin", this.$route.path.startsWith("/administration"));
  },
  methods: {
    ...mapActions("reportsStore", ["runReport", "setReport"]),
    runClick() {
      this.runReport();
    },
  },
};
</script>
