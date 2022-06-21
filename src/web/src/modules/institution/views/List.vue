<template>
  <div>
    <v-breadcrumbs
      divider="/"
      large
      :items="[
        { text: 'Administration Home', to: '/administration', exact: true },
        {
          text: 'Institutions',
          to: '/administration/institutions',
          exact: true,
        },
      ]"
    >
    </v-breadcrumbs>
    <h1>Institutions</h1>

    <v-row>
      <v-col cols="6"
        ><v-text-field
          v-model="search"
          label="Search"
          dense
          outlined
        ></v-text-field
      ></v-col>
      <v-col
        ><v-switch
          label="Active only?"
          class="mt-1"
          v-model="activeOnly"
        ></v-switch
      ></v-col>
      <v-col>
        <v-btn
          color="primary"
          class="my-0 float-right"
          to="/administration/institutions/create"
        >
          <v-icon>mdi-plus</v-icon> Create</v-btn
        >
      </v-col>
    </v-row>

    <v-data-table
      :search="search"
      :headers="[
        { text: 'Name', value: 'name' },
        {
          text: 'Federal Code (Campus Codes)',
          value: 'federal_institution_code',
        },
        { text: 'Campuses', value: 'campuses.length' },
        { text: 'Level', value: 'level.description' },
        { text: 'Active', value: 'is_active_text' },
      ]"
      :items="filteredList"
      @click:row="openDetail"
    >
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import { INSTITUTION_URL } from "@/urls";
import store from "@/store";

export default {
  data: () => ({
    isLoading: false,
    search: "",
    activeOnly: false,
    items: [],
  }),
  computed: {
    filteredList: function () {
      let l = _.clone(this.items);

      if (this.activeOnly) l = l.filter((i) => i.is_active);

      return l;
    },
    storedSearch: function () {
      return store.getters.searchText;
    },
    storedActive: function () {
      return store.getters.activeOnly;
    },
  },
  watch: {
    search: function (val) {
      store.dispatch("setInstitutionSearch", val);
    },
    activeOnly: function (val) {
      store.dispatch("setInstitutionActiveOnly", val);
    },
  },
  created() {
    this.loadInstitutions();
    this.search = this.storedSearch;
    this.activeOnly = this.storedActive;
  },
  methods: {
    loadInstitutions() {
      this.isLoading = true;

      axios
        .get(`${INSTITUTION_URL}`)
        .then((resp) => {
          this.items = resp.data.data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    openDetail(item) {
      this.$router.push(`/administration/institutions/${item.id}`);
    },
  },
};
</script>
