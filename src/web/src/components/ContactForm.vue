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
              v-model="contactInfo.last_name"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="First name"
              v-model="contactInfo.first_name"
            ></v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Initial"
              v-model="contactInfo.initial"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Previous last name"
              v-model="contactInfo.previous_last_name"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="SIN"
              v-model="contactInfo.sin"
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
              v-model="permanent_address.address_line_1"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Address line 2"
              v-model="permanent_address.address_line_2"
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
              v-model="permanent_address.city"
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
              v-model="permanent_address.province"
            ></v-autocomplete>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Postal code"
              v-model="permanent_address.postal"
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
              v-model="permanent_address.country"
            ></v-autocomplete>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Phone"
              v-model="permanent_address.phone"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="E-mail"
              v-model="permanent_address.email"
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
              v-model="school_address.address_line_1"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Address line 2"
              v-model="school_address.address_line_2"
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
              v-model="school_address.city"
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
              v-model="school_address.province"
            ></v-autocomplete>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Postal code"
              v-model="school_address.postal"
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
              v-model="school_address.country"
            ></v-autocomplete>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Phone"
              v-model="school_address.phone"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="E-mail"
              v-model="school_address.email"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { CITY_URL, COUNTRY_URL, PROVINCE_URL } from "../urls";

export default {
  props: ["student"],
  data: () => ({
    countryOptions: [],
    provinceOptions: [],
    cityOptions: [],

    contactInfo: {
      last_name: "",
      first_name: "",
      initial: "",
      previous_last_name: "",
      sin: "",
    },
    permanent_address: {
      address_line_1: "",
      address_line_2: "",
      city: "",
      province: "",
      postal: "",
      country: "",
      phone: "",
      email: "",
    },
    school_address: {
      address_line_1: "",
      address_line_2: "",
      city: "",
      province: "",
      postal: "",
      country: "",
      phone: "",
      email: "",
    },
  }),
  created() {
    this.loadCountries();
    this.loadProvinces();
    this.loadCities();
  },
  watch: {
    student: function (val) {
      console.log("CONTACT", val);

      if (val) this.updateView(val);
    },
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

    updateView(student) {
      this.contactInfo.first_name = student.FIRST_NAME;
      this.contactInfo.last_name = student.LAST_NAME;
      this.contactInfo.initial = student.INITIALS;
      this.contactInfo.sin = student.SIN;
      this.contactInfo.previous_last_name = student.PREVIOUS_LAST_NAME;

      this.permanent_address.address_line_1 = student.HOME_ADDRESS1;
      this.permanent_address.address_line_2 = student.HOME_ADDRESS2;
      this.permanent_address.city = student.HOME_CITY_ID;
      this.permanent_address.province = student.HOME_PROVINCE_ID;
      this.permanent_address.postal = student.HOME_POSTAL_CODE;
      this.permanent_address.country = student.HOME_COUNTRY_ID;
      this.permanent_address.phone = student.HOME_PHONE;
      this.permanent_address.email = student.HOME_EMAIL;

      this.school_address.email = student.SCHOOL_EMAIL;
      this.school_address.phone = student.SCHOOL_PHONE;
    },
  },
};
</script>
