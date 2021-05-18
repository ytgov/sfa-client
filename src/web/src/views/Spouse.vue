<template>
  <div class="home">
    <h1>Spouse</h1>

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
              v-model="last_name"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="First name"
              v-model="first_name"
            ></v-text-field>
          </div>
          <div class="col-md-2">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Initial"
              v-model="initial"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="SIN"
              v-model="sin"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Income (line 150)"
              v-model="income_150"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="default mb-5">
      <v-card-title>Pre-Study Period</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-8">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Pre-study employment status"
              v-model="pre_study_employment_status"
              :items="employmentStatusOptions"
            ></v-select>
          </div>
          <div class="col-md-4">
            If employed, enter employment details under income tab
          </div>
          <div class="col-md-2">Post secondary Information</div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="In school from"
              v-model="pre_study_post_secondary_from"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="In school to"
              v-model="pre_study_post_secondary_to"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="default mb-5">
      <v-card-title>Study Period</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-8">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Pre-study employment status"
              v-model="study_employment_status"
              :items="employmentStatusOptions"
            ></v-select>
          </div>
          <div class="col-md-4">
            * If employed, enter employment details under income tab
          </div>
          <div class="col-md-2">Post secondary Information</div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="In school from"
              v-model="study_post_secondary_from"
            ></v-text-field>
          </div>
          <div class="col-md-5">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="In school to"
              v-model="study_post_secondary_to"
            ></v-text-field>
          </div>
          <div class="col-md-12 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Applying for Canada Student Loan"
              v-model="study_applying_for_csl"
            ></v-switch>
          </div>
          <div class="col-md-2">Employment information</div>

          <div class="col-md-3 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Living with spouse"
              v-model="living_with_spouse"
            ></v-switch>
          </div>
          <div class="col-md-3 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Bus service available"
              v-model="bus_service_available"
            ></v-switch>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="In no, distance from school/work (km)"
              v-model="distance_from_school"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    employmentStatusOptions: ["Status 1", "Status 2"],

    last_name: "",
    first_name: "",
    initial: "",
    sin: "",
    income_150: 0,
    pre_study_employment_status: "",
    pre_study_post_secondary_from: "",
    pre_study_post_secondary_to: "",
    study_employment_status: "",
    study_post_secondary_from: "",
    study_post_secondary_to: "",
    study_applying_for_csl: false,
    living_with_spouse: false,
    bus_service_available: false,
    distance_from_school: null,
  }),
  async created() {},
  methods: {},
};
</script>
