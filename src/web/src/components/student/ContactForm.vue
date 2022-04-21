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
              v-model="student.last_name"
              @change="doSaveStudent('last_name', student.last_name)"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="First name"
              v-model="student.first_name"
              @change="doSaveStudent('first_name', student.first_name)"
            ></v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Initial"
              v-model="student.initials"
              @change="doSaveStudent('initials', student.initials)"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Previous last name"
              v-model="student.previous_last_name"
              @change="
                doSaveStudent(
                  'previous_last_name',
                  student.previous_last_name
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
              v-model="student.sin"
              @change="doSaveStudent('sin', student.sin)"
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
              v-model="student.home_address1"
              @change="
                doSaveStudent('home_address1', student.home_address1)
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
              item-value="id"
              item-text="description"
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
              item-value="id"
              item-text="description"
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
              item-value="id"
              item-text="description"
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
              v-model="student.home_phone"
              @change="doSaveStudent('home_phone', student.home_phone)"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="E-mail"
              v-model="student.home_email"
              @change="doSaveStudent('home_email', student.home_email)"
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
              v-model="student.MAILING_ADDRESS1"
              @change="
                doSaveStudent('MAILING_ADDRESS1', student.MAILING_ADDRESS1)
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
              v-model="student.MAILING_ADDRESS2"
              @change="
                doSaveStudent('MAILING_ADDRESS2', student.MAILING_ADDRESS2)
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
              item-value="id"
              item-text="description"
              :items="cityOptions"
              v-model="student.MAILING_CITY_ID"
              @change="
                doSaveStudent('MAILING_CITY_ID', student.MAILING_CITY_ID)
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
              item-value="id"
              item-text="description"
              v-model="student.MAILING_PROVINCE_ID"
              @change="
                doSaveStudent('MAILING_PROVINCE_ID', student.MAILING_PROVINCE_ID)
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
              v-model="student.MAILING_POSTAL_CODE"
              @change="
                doSaveStudent('MAILING_POSTAL_CODE', student.MAILING_POSTAL_CODE)
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
              item-value="id"
              item-text="description"
              v-model="student.MAILING_COUNTRY_ID"
              @change="
                doSaveStudent('MAILING_COUNTRY_ID', student.MAILING_COUNTRY_ID)
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
import store from "../../store";
import { CITY_URL, COUNTRY_URL, PROVINCE_URL } from "../../urls";
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
    doSaveStudent(field, value) {
      store.dispatch("updateStudent", [field, value, this]);
    },
  },
};
</script>
