<template>
  <div>
    <v-card class="default mt-5">
      <v-card-title>Canada Student Loan (Part-Time)</v-card-title>
      <v-card-text>
        <div class="row">
          <div class="col-md-6 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Applying for Canada Student Loan Part-Time"
              v-model="is_applying_csl"
            ></v-switch>
          </div>
          <div class="col-md-6 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Applying for grant for Part-Time Studies"
              v-model="is_applying_csg"
            ></v-switch>
          </div>
          <div class="col-md-6">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Requested loan amount"
              v-model="requested_loan_amount"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-6"></div>

          <div class="col-md-6 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Received previous CSL full-time loan"
              v-model="received_previous_fulltime"
            ></v-switch>
          </div>
          <div class="col-md-6 pt-0">
            <v-switch
              outlined
              dense
              hide-details
              label="Received previous CSL part-time loan"
              v-model="received_previous_parttime"
            ></v-switch>
          </div>

          <div class="col-md-12">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Outstanding principal from previous CSL loans"
              v-model="outstanding_previous"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>
          <div class="col-md-12">
            <v-text-field
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Amount of grant for part-time studies received this academic year"
              v-model="outstanding_previous"
              v-currency="{ currency: 'USD', locale: 'en' }"
            ></v-text-field>
          </div>

          <div class="col-md-12">
            <v-textarea
              outlined
              dense
              background-color="#ffaaaa"
              hide-details
              label="Comments"
              v-model="comments"
            ></v-textarea>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    is_applying_csl: false,
    is_applying_csg: false,
    requested_loan_amount: 0,
    received_previous_fulltime: false,
    received_previous_parttime: false,
    outstanding_previous: 0,
    amount_received: 0,
    comments: "",
  }),
  async created() {},
  methods: {},
};
</script>
