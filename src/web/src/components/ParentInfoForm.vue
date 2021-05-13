<template>
  <div>
    <v-card class="default">
      <v-card-title>Mailing address</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-12">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Address line 1"
              v-model="mailingAddress.address1"
            ></v-text-field>
          </div>
          <div class="col-md-12">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Address line 2"
              v-model="mailingAddress.address2"
            ></v-text-field>
          </div>

          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="City"
              v-model="mailingAddress.city"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Province"
              :items="provinceOptions"
              v-model="mailingAddress.province"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Postal code"
              v-model="mailingAddress.postal"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Country"
              :items="countryOptions"
              v-model="mailingAddress.country"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Telephone"
              v-model="mailingAddress.telephone"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="default mt-5">
      <v-card-title>Parent 1</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Last name"
              v-model="parent1.last_name"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="First name"
              v-model="parent1.first_name"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Relationship"
              :items="relationshipOptions"
              v-model="parent1.relationship"
            ></v-select>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="SIN"
              v-model="parent1.sin"
            ></v-text-field>
          </div>
          <div class="col-md-12">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Citizenship"
              :items="citizenshipOptions"
              v-model="parent1.citizenship"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Income (Ln 150)"
              v-model="parent1.income150"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Income (Ln 236)"
              v-model="parent1.income236"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Tax paid (Ln 435)"
              v-model="parent1.taxPaid"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="default mt-5">
      <v-card-title>Parent 2</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Last name"
              v-model="parent2.last_name"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="First name"
              v-model="parent2.first_name"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Relationship"
              :items="relationshipOptions"
              v-model="parent2.relationship"
            ></v-select>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="SIN"
              v-model="parent2.sin"
            ></v-text-field>
          </div>
          <div class="col-md-12">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Citizenship"
              :items="citizenshipOptions"
              v-model="parent2.citizenship"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Income (Ln 150)"
              v-model="parent2.income150"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Income (Ln 236)"
              v-model="parent2.income236"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Tax paid (Ln 435)"
              v-model="parent2.taxPaid"
              v-currency="{ currency: 'USD', locale: 'en' }"
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
    relationshipOptions: ["Mother", "Father"],
    citizenshipOptions: ["Canada", "United States"],
    provinceOptions: ["Yukon", "British Columbia"],
    countryOptions: ["Canada", "United States"],
    mailingAddress: {
      address1: "",
      address2: "",
      city: "",
      province: "",
      country: "",
      postal: "",
      telephone: "",
    },
    parent1: {
      last_name: "",
      first_name: "",
      relationship: "",
      sin: "",
      citizenship: "",
      income150: 0,
      income236: 0,
      taxPaid: 0,
    },
    parent2: {
      last_name: "",
      first_name: "",
      relationship: "",
      sin: "",
      income150: 0,
      income236: 0,
      taxPaid: 0,
    },
  }),
  async created() {},
  methods: {},
};
</script>
