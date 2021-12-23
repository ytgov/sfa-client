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
              @change="doSaveStudent('LAST_NAME', student.LAST_NAME)"
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
              @change="doSaveStudent('FIRST_NAME', student.FIRST_NAME)"
            ></v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Initial"
              v-model="student.INITIALS"
              @change="doSaveStudent('INITIALS', student.INITIALS)"
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
              @change="
                doSaveStudent(
                  'PREVIOUS_LAST_NAME',
                  student.PREVIOUS_LAST_NAME
                )
              "
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
              @change="doSaveStudent('SIN', student.SIN)"
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
              @change="
                doSaveStudent('HOME_ADDRESS1', student.HOME_ADDRESS1)
              "
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
              @change="
                doSaveStudent('HOME_ADDRESS2', student.HOME_ADDRESS2)
              "
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
              @change="
                doSaveStudent('HOME_CITY_ID', student.HOME_CITY_ID)
              "
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
              @change="
                doSaveStudent(
                  'HOME_PROVINCE_ID',
                  student.HOME_PROVINCE_ID
                )
              "
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
              @change="
                doSaveStudent(
                  'HOME_POSTAL_CODE',
                  student.HOME_POSTAL_CODE
                )
              "
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
              @change="
                doSaveStudent('HOME_COUNTRY_ID', student.HOME_COUNTRY_ID)
              "
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
              @change="doSaveStudent('HOME_PHONE', student.HOME_PHONE)"
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
              @change="doSaveStudent('HOME_EMAIL', student.HOME_EMAIL)"
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
              v-model="student.SCHOOL_ADDR1"
              @change="
                doSaveStudent('SCHOOL_ADDR1', student.SCHOOL_ADDR1)
              "
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Address line 2"
              v-model="student.SCHOOL_ADDR2"
              @change="
                doSaveStudent('SCHOOL_ADDR2', student.SCHOOL_ADDR2)
              "
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
              v-model="student.SCHOOL_CITY"
              @change="
                doSaveStudent('SCHOOL_CITY', student.SCHOOL_CITY)
              "
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
              v-model="student.SCHOOL_PROVINCE"
              @change="
                doSaveStudent('SCHOOL_PROVINCE', student.SCHOOL_PROVINCE)
              "
            ></v-autocomplete>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Postal code"
              v-model="student.SCHOOL_POSTAL"
              @change="
                doSaveStudent('SCHOOL_POSTAL', student.SCHOOL_POSTAL)
              "
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
              v-model="student.SCHOOL_COUNTRY"
              @change="
                doSaveStudent('SCHOOL_COUNTRY', student.SCHOOL_COUNTRY)
              "
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
              @change="
                doSaveStudent('SCHOOL_PHONE', student.SCHOOL_PHONE)
              "
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
              @change="
                doSaveStudent('SCHOOL_EMAIL', student.SCHOOL_EMAIL)
              "
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
    doSaveStudent(field, value) {
      store.dispatch("updateStudent", [field, value, this]);
    },
  },
};
</script>
