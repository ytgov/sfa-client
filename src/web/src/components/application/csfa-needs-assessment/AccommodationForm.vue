<template>
  <div>
    <v-card class="default mb-5">
      <v-card-title>Pre-study Accommodation</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Accommodation type"
              v-model="study.housing"
              :items="housingOptions"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Amount of rent paid to parents (receipts may be requested)"
              v-model="study.rent"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-4 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="I own my home"
              v-model="application.prestudy_own_home"
              @change="doSaveApp('prestudy_own_home', application.prestudy_own_home)"
            ></v-switch>
          </div>

          <div class="col-md-6">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              label="City"
              v-model="application.prestudy_city_id"
              @change="doSaveApp('prestudy_city_id', application.prestudy_city_id)"
              :items="cities"
              item-text="description"
              item-value="id"

            ></v-autocomplete>
          </div>
          <div class="col-md-6">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              label="Province"
              v-model="application.prestudy_province_id"
              @change="doSaveApp('prestudy_province_id', application.prestudy_province_id)"
              :items="provinces"
              item-text="description"
              item-value="id"
            ></v-autocomplete>
          </div>
          <div class="col-md-4 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Living with spouse (see Spouse data)"
            ></v-switch>
          </div>
          <div class="col-md-4 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Bus service available"
              v-model="application.prestudy_bus"
              @change="doSaveApp('prestudy_bus', application.prestudy_bus)"
            ></v-switch>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="If no, distance from school/work (km)"
              @keypress="validate.isNumber($event)"
              v-model="application.prestudy_distance"
              @change="doSaveApp('prestudy_distance', application.prestudy_distance)"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="default mb-5">
      <v-card-title>Study Accommodation</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Accommodation type"
              v-model="study.housing"
              :items="housingOptions"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Amount of rent paid to parents (receipts may be requested)"
              v-model="study.rent"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-4 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="I own my home"
              v-model="application.study_own_home"
              @change="doSaveApp('study_own_home', application.study_own_home)"
            ></v-switch>
          </div>

          <div class="col-md-6">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              label="City"
              v-model="application.study_city_id"
              @change="doSaveApp('study_city_id', application.study_city_id)"
              :items="cities"
              item-text="description"
              item-value="id"
            ></v-autocomplete>
          </div>
          <div class="col-md-6">
            <v-autocomplete
              outlined
              dense
              background-color="white"
              hide-details
              label="Province"
              v-model="application.study_province_id"
              @change="doSaveApp('study_province_id', application.study_province_id)"
              :items="provinces"
              item-text="description"
              item-value="id"
            ></v-autocomplete>
          </div>
          <div class="col-md-4 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Living with spouse (see Spouse data)"
              v-model="application.study_living_w_spouse"
              @change="doSaveApp('study_living_w_spouse', application.study_living_w_spouse)"
            ></v-switch>
          </div>
          <div class="col-md-4 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Bus service available"
              v-model="application.study_bus"
              @change="doSaveApp('study_bus', application.study_bus)"
            ></v-switch>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="If no, distance from school/work (km)"
              @keypress="validate.isNumber($event)"
              v-model="application.study_distance"
              @change="doSaveApp('study_distance', application.study_distance)"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';
import validator from "@/validator";
export default {
  data: () => ({
    provinceOptions: ["Yukon", "British Columbia"],
    housingOptions: ["Living at Parents", "Living on Own", "Both"],
    study: {
      housing: "",
      rent: 0,
      own: false,
      city: "",
      province: "",
      living_with_spouse: false,
      bus_available: false,
      distance_from_school: 0,
    },
    validate: {},
  }),
  computed: {
    ...mapGetters(["cities", "provinces"]),
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  async created() {
    store.dispatch("setCities");
    store.dispatch("setProvinces");
    this.validate = { ...validator };
    
  },
  methods: {
    doSaveApp(field, value) {
      store.dispatch("updateApplication", [field, value, this]);
    },
  },
};
</script>
