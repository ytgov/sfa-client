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

    <v-row class="mt-3">
      <v-col cols="12" md="9">
        <v-select label="Choose a report" :items="reportOptions" v-model="report" return-object outlined dense />
        <div>
          <div v-for="item of report?.parameters">
            <v-select
              v-if="item.options"
              :items="getOptions(item.options)"
              :item-text="item.itemText"
              :item-value="item.itemValue"
              :label="item.name"
              v-model="item.value"
              dense
              outlined
            ></v-select>

            <v-text-field v-else :label="item.name" v-model="item.value" dense outlined></v-text-field>
          </div>
        </div>
      </v-col>
      <v-col class="d-flex">
        <div class="align-self-end text-right mb-7" style="width: 100%;">
          <v-btn color="primary" @click="runClick" class="align-self-end">
            <v-icon class="mr-2">mdi-eye</v-icon> Preview
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-card class="default">
      <v-card-text>
        <v-row>
          <v-col class="d-flex">
            <v-text-field
              v-model="search"
              label="Search"
              dense
              outlined
              background-color="white"
              hide-details
              class="mb-2"
            />

            <v-btn
              v-for="item of selectedReport?.downloadFormat"
              color="info"
              @click="downloadClick(item)"
              class="my-0 ml-4"
              style="width: 183px"
            >
              <v-icon class="mr-2">mdi-download</v-icon> Download {{ item.replace(".", "").toUpperCase() }}</v-btn
            >
          </v-col>
        </v-row>
        <v-data-table
          :search="search"
          :headers="reportHeaders"
          :items="reportData"
          dense
          :footer-props="{ 'items-per-page-options': [15, 30, 50, 100, -1] }"
        >
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import store from "@/store";

export default {
  data: () => ({
    search: "",
  }),
  computed: {
    ...mapState(["showSideBarAdmin"]),
    ...mapGetters("reportsStore", ["reportHeaders", "reportData"]),
    ...mapState("reportsStore", ["reportOptions", "selectedReport"]),
    ...mapState(["academicYears"]),
    report: {
      get() {
        return this.selectedReport;
      },
      set(value) {
        this.setReport(value);
      },
    },
  },
  async created() {
    await store.dispatch("setAppSideBarAdmin", this.$route.path.startsWith("/administration"));
    await store.dispatch("setAcademicYears");
  },
  methods: {
    ...mapActions("reportsStore", ["runReport", "setReport", "downloadReport"]),
    getOptions(input) {
      return store.getters[input];
    },
    runClick() {
      this.search = "";
      this.runReport();
    },
    downloadClick(format) {
      this.downloadReport(format);
    },
  },
};
</script>
