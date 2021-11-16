<template>
  <div>
    <v-card class="default mb-5">
      <v-card-title>Name and SIN</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Last name"
              v-model="student.LAST_NAME"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="First name"
              v-model="student.FIRST_NAME"
            ></v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Initial"
              v-model="student.INITIAL"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Previous last name"
              v-model="student.PREVIOUS_LAST_NAME"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="SIN"
              v-model="student.SIN"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="default mb-5">
      <v-card-title>Permanent Mailing Address</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Address line 1"
              v-model="student.HOME_ADDRESS1"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Address line 2"
              v-model="student.HOME_ADDRESS2"
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              label="City"
              item-value="CITY_ID"
              item-text="DESCRIPTION"
              :items="cityOptions"
              v-model="student.HOME_CITY_ID"
            ></v-autocomplete>
          </div>
          <div class="col-md-3">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              label="Province"
              :items="provinceOptions"
              item-value="PROVINCE_ID"
              item-text="DESCRIPTION"
              v-model="student.HOME_PROVINCE_ID"
            ></v-autocomplete>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Postal code"
              v-model="student.HOME_POSTAL_CODE"
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              label="Country"
              :items="countryOptions"
              item-value="COUNTRY_ID"
              item-text="DESCRIPTION"
              v-model="student.HOME_COUNTRY_ID"
            ></v-autocomplete>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Phone"
              v-model="student.HOME_PHONE"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="E-mail"
              v-model="student.HOME_EMAIL"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="default mb-5">
      <v-card-title>Mailing Address While at School</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Address line 1"
              v-model="student.address_line_1"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Address line 2"
              v-model="student.address_line_2"
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              label="City"
              item-value="CITY_ID"
              item-text="DESCRIPTION"
              :items="cityOptions"
              v-model="student.city"
            ></v-autocomplete>
          </div>
          <div class="col-md-3">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              label="Province"
              :items="provinceOptions"
              item-value="PROVINCE_ID"
              item-text="DESCRIPTION"
              v-model="student.province"
            ></v-autocomplete>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Postal code"
              v-model="student.postal"
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              label="Country"
              :items="countryOptions"
              item-value="COUNTRY_ID"
              item-text="DESCRIPTION"
              v-model="student.country"
            ></v-autocomplete>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Phone"
              v-model="student.SCHOOL_PHONE"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="E-mail"
              v-model="student.SCHOOL_EMAIL"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
import { CITY_URL, COUNTRY_URL, PROVINCE_URL } from "../urls";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["selectedStudent"]),
    student: function () {
      return store.getters.selectedStudent;
    },
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  data: () => ({
    countryOptions: [],
    provinceOptions: [],
    cityOptions: [],
  }),
  created() {
    this.loadCountries();
    this.loadProvinces();
    this.loadCities();
  },
  methods: {
    loadCountries() {
      axios.get(COUNTRY_URL).then((resp) => {
        this.countryOptions = resp.data;
      });
    },
    loadProvinces() {
      axios.get(PROVINCE_URL).then((resp) => {
        this.provinceOptions = resp.data;
      });
    },
    loadCities() {
      axios.get(CITY_URL).then((resp) => {
        this.cityOptions = resp.data;
      });
    },
  },
};
</script>
