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
        {
          text: institution.name,
          to: `/administration/institutions/${institutionId}`,
          exact: true,
        },
        {
          text: campus.name,
          to: `/administration/institutions/${institutionId}/campus/${campus.id}`,
          exact: true,
        },
      ]"
    >
    </v-breadcrumbs>
    <h1>
      {{ institution.name }} : <small>{{ campus.name }}</small>
    </h1>

    <v-row>
      <v-col cols="6">
        <v-card class="default mb-5">
          <v-card-title>Campus details</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="campus.name"
              label="Name"
              dense
              outlined
              background-color="white"
              @change="doSave('name', campus.name)"
            ></v-text-field>

            <v-text-field
              v-model="campus.federal_institution_code"
              dense
              outlined
              label="Federal code"
              background-color="white"
              @change="
                doSave(
                  'federal_institution_code',
                  campus.federal_institution_code
                )
              "
            ></v-text-field>

            <v-text-field
              v-model="campus.care_of"
              label="Care of"
              dense
              outlined
              background-color="white"
              @change="doSave('care_of', campus.care_of)"
            ></v-text-field>

            <v-row>
              <v-col cols="6">
                <v-switch
                  v-model="campus.is_primary"
                  label="Primary"
                  class="mt-1"
                  dense
                  outlined
                  @change="doSave('is_primary', campus.is_primary)"
                ></v-switch>
              </v-col>
              <v-col cols="6">
                <v-switch
                  v-model="campus.is_active"
                  label="Active"
                  class="mt-1"
                  dense
                  outlined
                  @change="doSave('is_active', campus.is_active)"
                ></v-switch
              ></v-col>
            </v-row>

            <v-text-field
              v-model="campus.email_address"
              label="Email address"
              dense
              outlined
              background-color="white"
              hide-details
              @change="doSave('email_address', campus.email_address)"
            ></v-text-field>
          </v-card-text>
        </v-card>

        <v-card class="default mb-5">
          <v-card-text>
            <v-btn
              color="primary"
              x-small
              fab
              @click="addNote"
              class="float-right mt-0 mb-2"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
            <h3 class="float-left">Notes</h3>

            <div style="clear: both"></div>

            <v-expansion-panels
              v-if="campus.notes.length > 0"
              v-model="noteExpand"
              accordion
            >
              <v-expansion-panel v-for="(note, idx) of campus.notes" :key="idx">
                <v-expansion-panel-header>
                  {{ note.create_user.first_name }}
                  {{ note.create_user.last_name }} - {{ note.create_date }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-textarea
                    v-model="note.note"
                    label="Note text"
                    outlined
                    dense
                    background-color="white"
                    rows="3"
                    hide-details
                    @change="saveNote(note)"
                    append-outer-icon="mdi-delete"
                    @click:append-outer="removeNote(note)"
                  ></v-textarea>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="default mb-5">
          <v-card-title>Address</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="campus.address_line_1"
              dense
              outlined
              background-color="white"
              label="Line 1"
              @change="doSave('address_line_1', campus.address_line_1)"
            ></v-text-field>
            <v-text-field
              v-model="campus.address_line_2"
              dense
              outlined
              background-color="white"
              label="Line 2"
              @change="doSave('address_line_2', campus.address_line_2)"
            ></v-text-field>

            <v-row>
              <v-col cols="6">
                <v-autocomplete
                  v-model="campus.address_city_id"
                  dense
                  outlined
                  background-color="white"
                  label="City"
                  item-value="id"
                  item-text="description"
                  hide-details
                  :items="cityOptions"
                  @change="doSave('address_city_id', campus.address_city_id)"
                ></v-autocomplete
              ></v-col>
              <v-col cols="6"
                ><v-autocomplete
                  v-model="campus.address_province_id"
                  dense
                  outlined
                  background-color="white"
                  label="Province"
                  :items="provinceOptions"
                  item-value="id"
                  item-text="description"
                  hide-details
                  @change="
                    doSave('address_province_id', campus.address_province_id)
                  "
                ></v-autocomplete
              ></v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="campus.address_postal_code"
                  dense
                  outlined
                  background-color="white"
                  label="Postal code"
                  hide-details
                  @change="
                    doSave('address_postal_code', campus.address_postal_code)
                  "
                ></v-text-field
              ></v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="campus.address_country_id"
                  dense
                  outlined
                  background-color="white"
                  label="Country"
                  :items="countryOptions"
                  item-value="id"
                  item-text="description"
                  hide-details
                  @change="
                    doSave('address_country_id', campus.address_country_id)
                  "
                ></v-autocomplete
              ></v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="default mb-5">
          <v-card-text>
            <v-btn
              color="primary"
              x-small
              fab
              @click="addDate"
              class="float-right mt-0 mb-2"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
            <h3 class="float-left">Dates</h3>

            <div style="clear: both"></div>

            <v-expansion-panels
              v-if="campus.dates.length > 0"
              v-model="dateExpand"
              accordion
            >
              <v-expansion-panel v-for="(date, idx) of campus.dates" :key="idx">
                <v-expansion-panel-header>
                  Academic Year: {{ date.academic_year_id }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col>
                      <v-menu
                        v-model="date.start_date_menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        left
                        nudge-top="26"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date.class_start_date"
                            label="Class start date"
                            append-icon="mdi-calendar"
                            readonly
                            outlined
                            dense
                            background-color="white"
                            v-bind="attrs"
                            v-on="on"
                            hide-details
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date.class_start_date"
                          @input="date.start_date_menu = false"
                          @change="saveDate(date)"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col>
                      <v-menu
                        v-model="date.end_date_menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        left
                        nudge-top="26"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date.class_end_date"
                            label="Class end date"
                            append-icon="mdi-calendar"
                            readonly
                            outlined
                            dense
                            hide-details
                            background-color="white"
                            v-bind="attrs"
                            v-on="on"
                            append-outer-icon="mdi-delete"
                            @click:append-outer="removeDate(date)"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date.class_end_date"
                          @input="date.end_date_menu = false"
                          @change="saveDate(date)"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import {
  INSTITUTION_URL,
  CITY_URL,
  COUNTRY_URL,
  PROVINCE_URL,
  ACADEMIC_YEAR_URL,
} from "../../../urls";
import store from "../../../store";

export default {
  data: () => ({
    isLoading: false,
    institutionId: -1,
    campusId: -1,
    institution: {},
    campus: { notes: [], dates: [] },

    countryOptions: [],
    provinceOptions: [],
    cityOptions: [],
    yearOptions: [],

    start_date_menu: null,
    end_date_menu: null,
    noteExpand: 0,
    dateExpand: 0,
    openYearOptions: [],
  }),
  watch: {
    "$route.params.id": {
      handler: function (id) {
        this.institutionId = id;
        this.loadInstitution(id);
      },
      deep: true,
      immediate: true,
    },
    "$route.params.campus_id": {
      handler: function (id) {
        this.campusId = id;
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.loadCountries();
    this.loadProvinces();
    this.loadCities();
    this.loadYears();
  },
  methods: {
    loadCountries() {
      axios.get(COUNTRY_URL).then((resp) => {
        this.countryOptions = resp.data.data;
      });
    },
    loadProvinces() {
      axios.get(PROVINCE_URL).then((resp) => {
        this.provinceOptions = resp.data.data;
      });
    },
    loadCities() {
      axios.get(CITY_URL).then((resp) => {
        this.cityOptions = resp.data.data;
      });
    },
    loadYears() {
      axios.get(ACADEMIC_YEAR_URL).then((resp) => {
        this.yearOptions = resp.data.data;
      });
    },
    loadInstitution(id) {
      this.isLoading = true;

      axios
        .get(`${INSTITUTION_URL}/${id}`)
        .then((resp) => {
          this.institution = resp.data.data;
          this.loadCampus(this.campusId);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    loadCampus(id) {
      this.campus = this.institution.campuses.filter((c) => c.id == id)[0];
    },
    async doSave(field, value) {
      let isError = await store.dispatch("updateCampus", [
        field,
        value,
        this,
        this.institutionId,
        this.campusId,
      ]);

      if (isError) this.loadInstitution(this.institutionId);
    },

    addNote() {
      let body = {
        note: "Enter note text",
      };

      axios
        .post(
          `${INSTITUTION_URL}/${this.institutionId}/campus/${this.campusId}/note`,
          body
        )
        .then((resp) => {
          if (resp.errors) {
            console.log(resp.error);
          }

          this.loadInstitution(this.institutionId);
        });
    },

    saveNote(item) {
      let body = { note: item.note };

      axios
        .put(
          `${INSTITUTION_URL}/${this.institutionId}/campus/${this.campusId}/note/${item.id}`,
          body
        )
        .then((resp) => {
          this.$emit("showAPIMessages", resp.data);
        });
    },

    removeNote(item) {
      axios
        .delete(
          `${INSTITUTION_URL}/${this.institutionId}/campus/${this.campusId}/note/${item.id}`
        )
        .then((resp) => {
          this.$emit("showAPIMessages", resp.data);
          this.loadInstitution(this.institutionId);
        });
    },

    addDate() {
      let openDates = this.campus.dates.map((d) => d.academic_year_id);
      this.openYearOptions = this.yearOptions.filter(
        (y) => y.status == "Open" && openDates.indexOf(y.id) == -1
      );

      if (this.openYearOptions.length == 0) {
        this.$emit("showError", "All Open Academic Years already exist");
        return;
      }

      let newYear = this.openYearOptions[0];
      let baseStart = `${newYear.id}/08/15`;
      let baseEnd = `${newYear.id + 1}/05/15`;

      let body = {
        academic_year_id: newYear.id,
        class_start_date: baseStart,
        class_end_date: baseEnd,
      };

      axios
        .post(
          `${INSTITUTION_URL}/${this.institutionId}/campus/${this.campusId}/dates`,
          body
        )
        .then((resp) => {
          if (resp.errors) {
            console.log(resp.error);
          }

          this.loadInstitution(this.institutionId);
        });
    },

    saveDate(item) {
      let body = {
        academic_year_id: item.academic_year_id,
        class_start_date: item.class_start_date,
        class_end_date: item.class_end_date,
      };

      axios
        .put(
          `${INSTITUTION_URL}/${this.institutionId}/campus/${this.campusId}/dates/${item.id}`,
          body
        )
        .then((resp) => {
          this.$emit("showAPIMessages", resp.data);
        });
    },

    removeDate(item) {
      axios
        .delete(
          `${INSTITUTION_URL}/${this.institutionId}/campus/${this.campusId}/dates/${item.id}`
        )
        .then((resp) => {
          this.$emit("showAPIMessages", resp.data);
          this.loadInstitution(this.institutionId);
        });
    },
  },
};
</script>
