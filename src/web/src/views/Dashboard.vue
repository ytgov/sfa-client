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
          <v-card-text>This will be a list of students/applications you recently viewed</v-card-text>
        </v-card>
      </div>
      <div class="col-md-6">
        <v-card class="mt-5" color="#fff2d5">
          <v-card-title>New Applications</v-card-title>
          <v-card-text>Maybe use STATUS=ONLINE to filter and find items that may require action</v-card-text>
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
          <v-list-item-title>Students</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-data-table
        hide-default-footer
        :headers="[
          { text: 'SIN', value: 'sin' },
          { text: 'Name', value: 'name' },
          { text: 'Locator', value: 'locator' },
        ]"
        :items="[
          { sin: '111-111-111', name: 'Frodo Baggins', locator: '2014-0379' },
          { sin: '222-222-222', name: 'Harry Potter', locator: '2014-1123' },
        ]"
        @click:row="selectStudent"
      ></v-data-table>

      <v-divider></v-divider>

      <v-card class="default my-4 mx-5" v-if="selectedStudent">
        <v-card-title>Applications for {{ selectedStudent.name }}</v-card-title>
        <v-card-text>
          <v-list-item two-line to="/application/1234/personal">
            <v-list-item-content>
              <v-list-item-title>2021: Okanogan College</v-list-item-title>
              <v-list-item-subtitle
                >Business Administration (Diploma)<br />Applications:
                YG</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item two-line to="/application/1234/personal">
            <v-list-item-content>
              <v-list-item-title>2020: Okanogan College</v-list-item-title>
              <v-list-item-subtitle
                >Business Administration (Diploma)<br />Applications: YG,
                YEA</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    search: "",
    drawer: null,
    selectedStudent: null,
  }),
  methods: {
    searchKeyUp(event) {
      if (event.key == "Enter") this.doSearch();
    },
    doSearch() {
      this.drawer = true;
    },
    selectStudent(item) {
      this.selectedStudent = item;
    },
  },
};
</script>
