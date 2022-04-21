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
              background-color="#ffaaaa"
              hide-details
              label="Address line 1"
              v-model="mailingAddress.address1"
            ></v-text-field>
          </div>
          <div class="col-md-12">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Address line 2"
              v-model="mailingAddress.address2"
            ></v-text-field>
          </div>

          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="City"
              v-model="mailingAddress.city"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="#ffaaaa"
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
              background-color="#ffaaaa"
              hide-details
              label="Postal code"
              v-model="mailingAddress.postal"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-select
              outlined
              dense
              background-color="#ffaaaa"
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
              background-color="#ffaaaa"
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
              background-color="#ffaaaa"
              hide-details
              label="Last name"
              v-model="application.PARENT1_LAST_NAME"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="First name"
              v-model="application.PARENT1_FIRST_NAME"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Relationship"
              :items="relationshipOptions"
              v-model="application.PARENT1_RELATIONSHIP_ID"
              item-text="DESCRIPTION"
              item-value="RELATIONSHIP_ID"
            ></v-select>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="SIN"
              v-model="application.PARENT1_SIN"
            ></v-text-field>
          </div>
          <div class="col-md-12">
            <v-select
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Citizenship"
              :items="citizenshipOptions"
              v-model="application.PARENT1_CITIZENSHIP_CODE"
            ></v-select>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Income (Ln 150)"
              v-model="application.PARENT1_INCOME"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Income (Ln 236)"
              v-model="application.PARENT1_NET_INCOME"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Tax paid (Ln 435)"
              v-model="application.PARENT1_TAX_PAID"
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
              background-color="#ffaaaa"
              hide-details
              label="Last name"
              v-model="application.PARENT2_LAST_NAME"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="First name"
              v-model="application.PARENT2_FIRST_NAME"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-select
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Relationship"
              :items="relationshipOptions"
              v-model="application.PARENT2_RELATIONSHIP_ID"
              item-text="DESCRIPTION"
              item-value="RELATIONSHIP_ID"
            ></v-select>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="SIN"
              v-model="application.PARENT2_SIN"
            ></v-text-field>
          </div>
          <div class="col-md-12">
            <v-select
              outlined
              dense
              background-color="#ffaaaa"
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
              background-color="#ffaaaa"
              hide-details
              label="Income (Ln 150)"
              v-model="application.PARENT2_INCOME"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Income (Ln 236)"
              v-model="application.PARENT2_NET_INCOME"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-4">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Tax paid (Ln 435)"
              v-model="application.PARENT2_TAX_PAID"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import store from "../../store";
import axios from "axios";
import { RELATIONSHIP_URL } from "../../urls";

export default {
  computed: {
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  data: () => ({
    relationshipOptions: [],
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
  async created() {
    this.loadRelationships();
  },
  methods: {
    loadRelationships() {
      axios.get(RELATIONSHIP_URL).then((resp) => {
        this.relationshipOptions = resp.data;
      });
    },
    doSaveStudent(field, value) {
      store.dispatch("updateStudent", [field, value, this]);
    },
  },
};
</script>
