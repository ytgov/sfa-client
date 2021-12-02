<template>
  <div>
    <h1>Search <small>: {{ searchResults.length }} matches</small></h1>

    <v-row>
      <v-col cols="4">
        <v-text-field
          label="Search"
          outlined
          dense
          v-model="search"
          @click:append="doSearch"
          @keydown="searchKeyUp"
          persistent-hint
          hint="Name, SIN, Locator, Vendor, Email"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          label="SIN"
          outlined
          dense
          v-model="search"
          @click:append="doSearch"
          @keydown="searchKeyUp"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          label="Search"
          outlined
          dense
          v-model="search"
          @click:append="doSearch"
          @keydown="searchKeyUp"
        ></v-text-field>
      </v-col>

      <v-col></v-col>
      <v-col><v-btn color="primary" class="float-right" @click="createStudent">Create student</v-btn></v-col>
    </v-row>

    <v-data-table
      :items="searchResults"
      :headers="[
        { text: 'Name', value: 'name' },
        { text: 'Sin', value: 'sin' },
        { text: 'Locator', value: 'locator_number' },
        { text: 'Birth date', value: 'birth_date' },
        { text: 'Vendor', value: 'vendor_id' },
        { text: 'Email', value: 'home_email' },
        { text: 'Applications', value: 'application_count' },
      ]"
      @click:row="selectStudent"
      show-expand
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="student_id"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td
          :colspan="headers.length"
          style="padding: 10px 70px; background-color: #ddd"
        >
          Home email: <strong>{{ item.home_email }}</strong
          ><br />
          School email: <strong>{{ item.school_email }}</strong
          ><br />
        </td>
      </template>
    </v-data-table>

    <v-navigation-drawer
      v-model="showDrawer"
      absolute
      right
      temporary
      width="600"
    >
      <application-list
        :selectedStudent="selectedStudent"
        :studentApplications="studentApplications"
      ></application-list>

      <v-btn color="primary" class="mx-5" @click="createApplication">Create application</v-btn>
    </v-navigation-drawer>
  </div>
</template>

<script>
import axios from "axios";
import { STUDENT_URL, STUDENT_SEARCH_URL } from "../urls";

export default {
  data: () => ({
    search: "",
    searchResults: [],
    selectedStudent: {},
    studentApplications: [],
    showDrawer: false,
    expanded: [],
    singleExpand: true,
  }),
  created() {
    if (this.$route.query && this.$route.query.text) {
      this.search = this.$route.query.text;
      this.doSearch();
    }
  },
  methods: {
    searchKeyUp(event) {
      if (event.key == "Enter") this.doSearch();
    },
    doSearch() {
      this.selectedStudent = null;
      this.studentApplications = [];

      let cleanSearch = this.search.trim().toLowerCase();
      if (cleanSearch.length == 0) return;

      axios
        .post(`${STUDENT_SEARCH_URL}`, { terms: cleanSearch })
        .then((resp) => {
          this.searchResults = resp.data.data;
          this.resultCount = resp.data.meta.item_count;
        })
        .catch((err) => {
          this.$emit("showError", err);
        });
    },
    selectStudent(item) {
      this.selectedStudent = item;

      axios
        .get(`${STUDENT_URL}/${item.student_id}/applications`)
        .then((resp) => {
          this.studentApplications = resp.data.data;
          this.showDrawer = true;
        })
        .catch((err) => console.log(err));
    },
    createStudent() {
      console.log("CREATEING STUDENT")

    },
    createApplication() {
      console.log("CREATEING App for " + this.selectedStudent.student_id)
    }
  },
};
</script>
