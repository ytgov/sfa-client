<template>
  <div>
    <v-card class="default mb-5">
      <v-card-title>Name and SIN</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-5">
            <v-text-field outlined dense background-color="white" hide-details label="Last name"
              v-model="student.last_name"
              @change="doSaveStudent('last_name', student.last_name, 'personInfo')"></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field outlined dense background-color="white" hide-details label="First name"
              v-model="student.first_name"
              @change="doSaveStudent('first_name', student.first_name, 'personInfo')"></v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field outlined dense background-color="white" hide-details label="Initial"
              v-model="student.initials"
              @change="doSaveStudent('initials', student.initials, 'personInfo')"></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field outlined dense background-color="white" hide-details label="Previous last name"
              v-model="student.previous_last_name" @change="
                doSaveStudent(
                  'previous_last_name',
                  student.previous_last_name,
                  'personInfo'
                )
              "></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field outlined dense background-color="white" hide-details label="SIN" v-model="student.sin"
            oninput="
                if (this.value.length > 9) this.value = this.value.slice(0, 9);
              "
            @keypress="validate.isNumber($event)"
            @change="e => {
              if (validate.SIN(student.sin) || !String(student.sin).length) {
                return doSaveStudent('sin', student.sin, 'personInfo');
              } else {
                $store.dispatch('loadStudent', student.id);
                return $emit('showError', 'Invalid SIN');
              }
            }"></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="default mb-5">
      <v-card-title>Permanent Mailing Address</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-text-field outlined dense background-color="white" hide-details label="Address line 1"
              v-model="student.permanentAddress.address1" @change="
                doSaveStudent('address1', student.permanentAddress?.address1, 'addressInfo', student.permanentAddress.id, 'permanent')
              "></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field outlined dense background-color="white" hide-details label="Address line 2"
              v-model="student.permanentAddress.address2" @change="
                doSaveStudent('address2', student.permanentAddress.address2, 'addressInfo', student.permanentAddress.id, 'permanent')
              "></v-text-field>
          </div>
          <div class="col-md-3">
            <v-autocomplete outlined dense background-color="white" hide-details label="City" item-value="id"
              item-text="description" :items="[{id: null, description: 'No choice'}, ...cityOptions]" v-model="student.permanentAddress.city_id" @change="
                doSaveStudent('city_id', student.permanentAddress.city_id, 'addressInfo', student.permanentAddress.id, 'permanent')
              "></v-autocomplete>
          </div>
          <div class="col-md-3">
            <v-autocomplete outlined dense background-color="white" hide-details label="Province"
              :items="[{id: null, description: 'No choice'}, ...provinceOptions]" item-value="id" item-text="description"
              v-model="student.permanentAddress.province_id" @change="
                doSaveStudent(
                  'province_id',
                  student.permanentAddress.province_id,
                  'addressInfo', student.permanentAddress.id, 'permanent'
                )
              "></v-autocomplete>
          </div>
          <div class="col-md-3">
            <v-text-field outlined dense background-color="white" hide-details label="Postal code"
              v-model="student.permanentAddress.postal_code" @change="
                doSaveStudent(
                  'postal_code',
                  student.permanentAddress.postal_code,
                  'addressInfo', student.permanentAddress.id, 'permanent'
                )
              "></v-text-field>
          </div>
          <div class="col-md-3">
            <v-autocomplete outlined dense background-color="white" hide-details label="Country" :items="[{id: null, description: 'No choice'}, ...countryOptions]"
              item-value="id" item-text="description" v-model="student.permanentAddress.country_id" @change="
                doSaveStudent('country_id', student.permanentAddress.country_id, 'addressInfo', student.permanentAddress.id, 'permanent')
              "></v-autocomplete>
          </div>
          <div class="col-md-6">
            <v-text-field outlined dense background-color="white" hide-details label="Phone"
              v-model="student.permanentAddress.telephone"
              oninput="
                if (this.value.length > 12) this.value = this.value.slice(0, 12);
              "
              @keypress="validate.isNumber($event)"
              @change="e => {
                if (validate.telephone(student.permanentAddress.telephone) || 
                  !String(student.permanentAddress.telephone).length) {
                  return doSaveStudent('telephone', student.permanentAddress.telephone, 'addressInfo', student.permanentAddress.id, 'permanent');
                } else {
                  $store.dispatch('loadStudent', student.id);
                  return $emit('showError', 'Invalid Telephone');
                }
              }"></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field outlined dense background-color="white" hide-details label="E-mail"
              v-model="student.permanentAddress.email"
              @change="e => {
                if (validate.email(student.permanentAddress.email) || 
                !String(student.permanentAddress.email).length) {
                  return doSaveStudent('email', student.permanentAddress.email, 'addressInfo', student.permanentAddress.id, 'permanent');
                } else {
                  $store.dispatch('loadStudent', student.id);
                  return $emit('showError', 'Invalid Email');
                }
              }"></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="default mb-5">
      <v-card-title>Mailing Address While at School</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-text-field outlined dense background-color="white" hide-details label="Address line 1"
              v-model="student.temporalAddress.address1" @change="
                doSaveStudent('address1', student.temporalAddress?.address1, 'addressInfo', student.temporalAddress.id, 'temporal')
              "></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field outlined dense background-color="white" hide-details label="Address line 2"
              v-model="student.temporalAddress.address2" @change="
                doSaveStudent('address2', student.temporalAddress.address2, 'addressInfo', student.temporalAddress.id, 'temporal')
              "></v-text-field>
          </div>
          <div class="col-md-3">
            <v-autocomplete outlined dense background-color="white" hide-details label="City" item-value="id"
              item-text="description" :items="cityOptions" v-model="student.temporalAddress.city_id" @change="
                doSaveStudent('city_id', student.temporalAddress.city_id, 'addressInfo', student.temporalAddress.id, 'temporal')
              "></v-autocomplete>
          </div>
          <div class="col-md-3">
            <v-autocomplete outlined dense background-color="white" hide-details label="Province"
              :items="provinceOptions" item-value="id" item-text="description"
              v-model="student.temporalAddress.province_id" @change="
                doSaveStudent('province_id', student.temporalAddress.province_id, 'addressInfo', student.temporalAddress.id, 'temporal')
              "></v-autocomplete>
          </div>
          <div class="col-md-3">
            <v-text-field outlined dense background-color="white" hide-details label="Postal code"
              v-model="student.temporalAddress.postal_code" @change="
                doSaveStudent('postal_code', student.temporalAddress.postal_code, 'addressInfo', student.temporalAddress.id, 'temporal')
              "></v-text-field>
          </div>
          <div class="col-md-3">
            <v-autocomplete outlined dense background-color="white" hide-details label="Country" :items="countryOptions"
              item-value="id" item-text="description" v-model="student.temporalAddress.country_id" @change="
                doSaveStudent('country_id', student.temporalAddress.country_id, 'addressInfo', student.temporalAddress.id, 'temporal')
              "></v-autocomplete>
          </div>
          <div class="col-md-6">
            <v-text-field outlined dense background-color="white" hide-details label="Phone"
              v-model="student.temporalAddress.telephone"
              oninput="
                if (this.value.length > 12) this.value = this.value.slice(0, 12);
              "
              @keypress="validate.isNumber($event)"
              @change="e => {
                if (validate.telephone(student.temporalAddress.telephone) || 
                !String(student.temporalAddress.telephone).length) {
                  return doSaveStudent('telephone', student.temporalAddress.telephone, 'addressInfo', student.temporalAddress.id, 'temporal');
                } else {
                  $store.dispatch('loadStudent', student.id);
                  return $emit('showError', 'Invalid Telephone');
                }
              }"
              ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field outlined dense background-color="white" hide-details label="E-mail"
              v-model="student.temporalAddress.email"
              @change="e => {
                if (validate.email(student.temporalAddress.email) || 
                !String(student.temporalAddress.email).length) {
                  return doSaveStudent('email', student.temporalAddress.email, 'addressInfo', student.temporalAddress.id, 'temporal');
                } else {
                  $store.dispatch('loadStudent', student.id);
                  return $emit('showError', 'Invalid Email');
                }
              }"
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
import validator from "@/validator";

function myFunc() {
  console.log(this);
  if (this.value.length > 12) this.value = this.value.slice(0, 12);
}

export default {
  computed: {
    ...mapState(["selectedStudent"]),
    student: function () {
      return store.getters.selectedStudent;
    },
    application: function () {
      return store.getters.selectedApplication;
    },
    SIN() {
      return this.student.sin;
    },
    permanentTelephone() {
      return this.student?.permanentAddress?.telephone;
    },
    temporalTelephone() {
      return this.student?.temporalAddress?.telephone;
    }
  },
  watch: {
    permanentTelephone: function(value, oldValue) {
      if (value?.length === 3 || value?.length === 7) {
        this.student.permanentAddress.telephone = this.student.permanentAddress.telephone+"-";
      }
    },
    temporalTelephone: function(value) {
      if (value?.length === 3 || value?.length === 7) {
        this.student.temporalAddress.telephone = this.student.temporalAddress.telephone+"-";
      }
    },
  },
  data: () => ({
    countryOptions: [],
    provinceOptions: [],
    cityOptions: [],
    validate: {}
  }),
  created() {
    this.loadCountries();
    this.loadProvinces();
    this.loadCities();
    this.validate = { ...validator };
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
    doSaveStudent(field, value, type, extraId = null, addressType = "") {
      store.dispatch("updateStudent", [field, value, type, extraId, this, addressType]);
    },
  },
};
</script>
