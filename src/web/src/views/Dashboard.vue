<template>
  <div class="home">
    <h1>Dashboard</h1>

    <v-card class="mt-5" color="#fff2d5">
      <v-card-title>Find a Student or Application</v-card-title>
      <v-card-text>
        <v-text-field
          dense
          outlined
          background-color="white"
          label="Search"
          append-icon="mdi-magnify"
          @click:append="doSearch"
          @keydown="searchKeyUp"
          hint="Enter a Name, SIN or locator number and press Enter"
          v-model="search"
        ></v-text-field>
        <router-link to="/search">Advanced search</router-link>
      </v-card-text>
    </v-card>

    <div class="row">
      <div class="col-md-6">
        <v-card class="mt-5" color="#fff2d5">
          <v-card-title>Recently Viewed Applications</v-card-title>
          <v-card-text>
            This will be a list of students/applications you recently viewed

            <div v-for="(item, idx) of recentStudents" :key="idx">
              <router-link :to="`/student/${item.STUDENT_ID}`"
                >{{ item.FIRST_NAME }} {{ item.INITIALS }}
                {{ item.LAST_NAME }} ({{item.SIN}})
                </router-link
              >
            </div>
          </v-card-text>
        </v-card>
      </div>
      <div class="col-md-6">
        <v-card class="mt-5" color="#fff2d5">
          <v-card-title>New Applications</v-card-title>
          <v-card-text
            >Maybe use STATUS=ONLINE to filter and find items that may require
            action</v-card-text
          >
        </v-card>
      </div>
    </div>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      right
      temporary
      width="600"
      loading
    >
      <v-list-item loading>
        <v-list-item-content>
          <v-list-item-title>
            <div class="float-right">
              <v-btn
                x-small
                color="primary"
                text
                :to="'/search?text=' + search"
                class="my-0"
                style="font-size: 12px !important"
              >
                Advanced search</v-btn
              >
            </div>
            <div class="float-left">Students ({{ resultCount }} matches)</div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <div style="max-height: 400px; overflow-y: scroll">
        <v-data-table
          hide-default-footer
          :headers="[
            { text: '', value: 'action', width: '40px' },
            { text: 'SIN', value: 'sin' },
            { text: 'Name', value: 'name' },
            { text: 'Locator', value: 'locator_number' },
          ]"
          :items="searchResults"
          :items-per-page="-1"
          @click:row="selectStudent"
        >
          <template v-slot:item.action="{ item }">
            <v-btn
              outlined
              icon
              color="primary"
              :to="`/student/${item.student_id}`"
              title="View student record"
              ><v-icon>mdi-school</v-icon></v-btn
            >
          </template>
        </v-data-table>
      </div>

      <v-divider></v-divider>

      <v-card class="default my-4 mx-5" v-if="selectedStudent">
        <v-card-title
          >Applications for {{ selectedStudent.name }} ({{
            selectedStudent.sin
          }})</v-card-title
        >
        <v-card-text>
          <div v-for="(app, i) of studentApplications" :key="i">
            <v-list-item
              two-line
              :to="'/application/' + app.HISTORY_DETAIL_ID + '/personal'"
            >
              <v-list-item-content>
                <v-list-item-title
                  >{{ app.ACADEMIC_YEAR }}:
                  {{ app.institution_name }}</v-list-item-title
                >
                <v-list-item-subtitle
                  >{{ app.study_area_name }} ({{
                    app.program_name
                  }})<br />Applications: YG</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="i < studentApplications.length - 1"></v-divider>
          </div>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { STUDENT_URL, STUDENT_SEARCH_URL } from "../urls";

export default {
  name: "Home",
  computed: {
    ...mapState(["recentStudents"]),
  },
  data: () => ({
    search: "",
    drawer: null,
    selectedStudent: null,
    studentApplications: [],
    searchResults: [],
    resultCount: 0,
  }),
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
          this.drawer = true;
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
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
