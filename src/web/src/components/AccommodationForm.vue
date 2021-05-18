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
              v-model="pre_study.housing"
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
              v-model="pre_study.rent"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-4 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="I own my home"
              v-model="pre_study.own"
            ></v-switch>
          </div>

          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="City"
              v-model="pre_study.city"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Province"
              v-model="pre_study.province"
              :items="provinceOptions"
            ></v-select>
          </div>
          <div class="col-md-4 pt-0">
          </div>
          <div class="col-md-4 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Bus service available"
              v-model="pre_study.bus_available"
            ></v-switch>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="If no, distance from school/work (km)"
              v-model="pre_study.distance_from_school"
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
              v-model="study.own"
            ></v-switch>
          </div>

          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="City"
              v-model="study.city"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Province"
              v-model="study.province"
              :items="provinceOptions"
            ></v-select>
          </div>
          <div class="col-md-4 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Living with spouse (see Spouse data)"
              v-model="study.living_with_spouse"
            ></v-switch>
          </div>
          <div class="col-md-4 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Bus service available"
              v-model="study.bus_available"
            ></v-switch>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="If no, distance from school/work (km)"
              v-model="study.distance_from_school"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    provinceOptions: ["Yukon", "British Columbia"],
    housingOptions: ["Living at Parents", "Living on Own", "Both"],
    pre_study: {
      housing: "",
      rent: 0,
      own: false,
      city: "",
      province: "",
      bus_available: false,
      distance_from_school: 0,
    },
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
  }),
  async created() {},
  methods: {},
};
</script>
