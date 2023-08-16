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
              @change="doSaveStudent('last_name', student.last_name, 'personInfo')"
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
              @change="doSaveStudent('first_name', student.first_name, 'personInfo')"
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
              @change="doSaveStudent('initials', student.initials, 'personInfo')"
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
              @change="doSaveStudent('previous_last_name', student.previous_last_name, 'personInfo')"
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
              oninput="
                if (this.value.length > 9) this.value = this.value.slice(0, 9);
              "
              @keypress="validate.isNumber($event)"
              @change="
                (e) => {
                  if (validate.SIN(student.sin) || !String(student.sin).length) {
                    return doSaveStudent('sin', student.sin, 'personInfo');
                  } else {
                    $store.dispatch('loadStudent', student.id);
                    return $emit('showError', 'Invalid SIN');
                  }
                }
              "
            ></v-text-field>
          </div>
          <div class="col-md-2">
            <v-menu
              v-model="show_menu"
              :close-on-content-click="false"
              transition="scale-transition"
              left
              nudge-top="26"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Birth date"
                  append-icon="mdi-calendar"
                  :value="student.birth_date?.slice(0, 10)"
                  hide-details
                  readonly
                  outlined
                  dense
                  background-color="white"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                :value="student.birth_date?.slice(0, 10)"
                @input="
                  (e) => {
                    student.birth_date = e;
                    show_menu = false;
                  }
                "
                @change="doSaveStudent('birth_date', student.birth_date, 'personInfo', student.id)"
              ></v-date-picker>
            </v-menu>
          </div>

          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Student phone"
              v-model="student.telephone"
              @change="doSaveStudent('telephone', student.telephone, 'personInfo')"
            ></v-text-field>
          </div>

          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Student email"
              v-model="student.email"
              @change="doSaveStudent('email', student.email, 'personInfo')"
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
              :value="student.permanentAddress?.address1"
              @change="
                doSaveStudent(
                  'address1',
                  student.permanentAddress?.address1,
                  'addressInfo',
                  student.permanentAddress.id,
                  'permanent'
                )
              "
              @input="
                (e) => {
                  student.permanentAddress.address1 = e;
                }
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
              :value="student.permanentAddress?.address2"
              @change="
                doSaveStudent(
                  'address2',
                  student.permanentAddress.address2,
                  'addressInfo',
                  student.permanentAddress.id,
                  'permanent'
                )
              "
              @input="
                (e) => {
                  student.permanentAddress.address2 = e;
                }
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
              :value="student.permanentAddress?.city_id"
              @change="
                doSaveStudent(
                  'city_id',
                  student.permanentAddress.city_id,
                  'addressInfo',
                  student.permanentAddress.id,
                  'permanent'
                )
              "
              @input="
                (e) => {
                  student.permanentAddress.city_id = e;
                }
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
              :value="student.permanentAddress?.province_id"
              @change="
                doSaveStudent(
                  'province_id',
                  student.permanentAddress.province_id,
                  'addressInfo',
                  student.permanentAddress.id,
                  'permanent'
                )
              "
              @input="
                (e) => {
                  student.permanentAddress.province_id = e;
                }
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
              :value="student.permanentAddress?.postal_code"
              @change="
                doSaveStudent(
                  'postal_code',
                  student.permanentAddress.postal_code,
                  'addressInfo',
                  student.permanentAddress.id,
                  'permanent'
                )
              "
              @input="
                (e) => {
                  student.permanentAddress.postal_code = e;
                }
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
              :value="student.permanentAddress?.country_id"
              @change="
                doSaveStudent(
                  'country_id',
                  student.permanentAddress.country_id,
                  'addressInfo',
                  student.permanentAddress.id,
                  'permanent'
                )
              "
              @input="
                (e) => {
                  student.permanentAddress.country_id = e;
                }
              "
            ></v-autocomplete>
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
              :value="student.temporalAddress?.address1"
              @change="
                doSaveStudent(
                  'address1',
                  student.temporalAddress?.address1,
                  'addressInfo',
                  student.temporalAddress.id,
                  'temporal'
                )
              "
              @input="
                (e) => {
                  student.temporalAddress.address1 = e;
                }
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
              :value="student.temporalAddress?.address2"
              @change="
                doSaveStudent(
                  'address2',
                  student.temporalAddress.address2,
                  'addressInfo',
                  student.temporalAddress.id,
                  'temporal'
                )
              "
              @input="
                (e) => {
                  student.temporalAddress.address2 = e;
                }
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
              :value="student.temporalAddress?.city_id"
              @change="
                doSaveStudent(
                  'city_id',
                  student.temporalAddress.city_id,
                  'addressInfo',
                  student.temporalAddress.id,
                  'temporal'
                )
              "
              @input="
                (e) => {
                  student.temporalAddress.city_id = e;
                }
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
              :value="student.temporalAddress?.province_id"
              @change="
                doSaveStudent(
                  'province_id',
                  student.temporalAddress.province_id,
                  'addressInfo',
                  student.temporalAddress.id,
                  'temporal'
                )
              "
              @input="
                (e) => {
                  student.temporalAddress.province_id = e;
                }
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
              :value="student.temporalAddress?.postal_code"
              @change="
                doSaveStudent(
                  'postal_code',
                  student.temporalAddress.postal_code,
                  'addressInfo',
                  student.temporalAddress.id,
                  'temporal'
                )
              "
              @input="
                (e) => {
                  student.temporalAddress.postal_code = e;
                }
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
              :value="student.temporalAddress?.country_id"
              @change="
                doSaveStudent(
                  'country_id',
                  student.temporalAddress.country_id,
                  'addressInfo',
                  student.temporalAddress.id,
                  'temporal'
                )
              "
              @input="
                (e) => {
                  student.temporalAddress.country_id = e;
                }
              "
            ></v-autocomplete>
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

export default {
  computed: {
    ...mapState(["selectedStudent"]),
    student: function() {
      return store.getters.selectedStudent;
    },
    application: function() {
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
    },
  },
  watch: {
    permanentTelephone: function(value, oldValue) {
      if (value?.length === 3 || value?.length === 7) {
        this.student.permanentAddress.telephone = this.student.permanentAddress.telephone + "-";
      }
    },
    temporalTelephone: function(value) {
      if (value?.length === 3 || value?.length === 7) {
        this.student.temporalAddress.telephone = this.student.temporalAddress.telephone + "-";
      }
    },
  },
  data: () => ({
    countryOptions: [],
    provinceOptions: [],
    cityOptions: [],
    validate: {},
    show_menu: false,
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
