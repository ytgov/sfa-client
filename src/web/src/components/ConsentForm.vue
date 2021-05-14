<template>
  <div>
    <v-card class="default mb-5">
      <v-card-title>Next of Kin</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Last name"
              v-model="last_name"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="First name"
              v-model="first_name"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Address line 1"
              v-model="address_line_1"
            ></v-text-field>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Address line 2"
              v-model="address_line_2"
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="City"
              v-model="city"
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Province"
              :items="provinceOptions"
              v-model="province"
            ></v-select>
          </div>
          <div class="col-md-3">
            <v-text-field
              outlined
              dense
              background-color="white"
              hide-details
              label="Postal code"
              v-model="postal"
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <v-select
              outlined
              dense
              background-color="white"
              hide-details
              label="Country"
              :items="countryOptions"
              v-model="country"
            ></v-select>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <h2 class="mb-0">Consent</h2>
    <p>People that the student is giving consent to view their funding information.</p>

    <div v-for="(item, i) of consents" :key="i">
      <v-card class="default mb-5">
        <v-card-title
          >Consent {{ 1 + i }}
          <v-spacer></v-spacer>
          <v-btn
            color="warning"
            x-small
            fab
            class="my-0"
            @click="removeConsent(i)"
            ><v-icon>mdi-close</v-icon></v-btn
          ></v-card-title
        >
        <v-card-text>
          <div class="row">
            <div class="col-md-8">
              <v-text-field
                outlined
                dense
                background-color="white"
                hide-details
                label="Consent person"
                v-model="item.person"
              ></v-text-field>
            </div>
            <div class="col-md-2">
              <v-switch
                outlined
                dense
                hide-details
                label="SFA"
                v-model="item.sfa"
              ></v-switch>
            </div>
            <div class="col-md-2">
              <v-switch
                outlined
                dense
                hide-details
                label="CSL"
                v-model="item.csl"
              ></v-switch>
            </div>

            <div class="col-md-4">
              <v-text-field
                outlined
                dense
                background-color="white"
                hide-details
                label="Academic year start"
                v-model="item.year_start"
              ></v-text-field>
            </div>
            <div class="col-md-4">
              <v-text-field
                outlined
                dense
                background-color="white"
                hide-details
                label="Academic year end"
                v-model="item.year_end"
              ></v-text-field>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <v-btn color="info" @click="addConsent">Add Consent Person</v-btn>
    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    countryOptions: ["Canada", "United States"],
    provinceOptions: ["Yukon", "British Columbia"],

    last_name: "",
    first_name: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    province: "",
    postal: "",
    country: "",

    consents: [],
  }),
  async created() {},
  methods: {
    addConsent() {
      this.consents.push({});
    },
    removeConsent(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this consent.",
        () => {
          this.consents.splice(index, 1);
        },
        () => {}
      );
    },
  },
};
</script>
