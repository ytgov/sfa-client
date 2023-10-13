<template>
  <div>
    <v-card-text v-if="assessment">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            label="Total study costs"
            readonly
            outlined
            dense
            hide-details
            background-color="#ddd"
            append-icon="mdi-calculator"
            :value="formatMoney(totalCosts)"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Family size"
            readonly
            outlined
            dense
            hide-details
            background-color="#ddd"
            append-icon="mdi-lock"
            :value="assessment.family_size"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Family income"
            readonly
            outlined
            dense
            hide-details
            background-color="#ddd"
            append-icon="mdi-calculator"
            :value="formatMoney(familyIncome)"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Need remaining"
            readonly
            outlined
            dense
            hide-details
            background-color="#ddd"
            append-icon="mdi-calculator"
            :value="formatMoney(needRemaining)"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Outstanding loans"
            readonly
            outlined
            dense
            hide-details
            background-color="#ddd"
            append-icon="mdi-lock"
            :value="formatMoney(application.outstanding_cslpt_amount)"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Max allowable"
            readonly
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            hide-details
            :value="formatMoney(maxAllowable)"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            label="Requested amount"
            readonly
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            hide-details
            :value="formatMoney(requestedAmount, true)"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Total grants"
            readonly
            outlined
            dense
            hide-details
            background-color="#ddd"
            append-icon="mdi-calculator"
            :value="formatMoney(assessment.total_grant_awarded)"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Calculated award"
            readonly
            outlined
            dense
            hide-details
            background-color="#ddd"
            append-icon="mdi-calculator"
            :value="formatMoney(assessedAmount)"
          />
        </v-col>
        <v-col cols="12" md="4" offset-md="4">
          <v-text-field
            label="Returned/Uncashable"
            v-currency
            outlined
            dense
            hide-details
            background-color="white"
            v-model="assessment.return_uncashable_cert"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Actual award"
            readonly
            outlined
            dense
            hide-details
            background-color="#ddd"
            append-icon="mdi-calculator"
            :value="formatMoney(actualAward)"
          />
        </v-col>
      </v-row>
      <v-divider class="my-5" />
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="assessment.number"
            label="Previous cert"
            readonly
            outlined
            dense
            hide-details
            background-color="#ddd"
            append-icon="mdi-lock"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Previous disbursements"
            readonly
            outlined
            dense
            hide-details
            background-color="#ddd"
            append-icon="mdi-calculator"
            :value="formatMoney(previousDisbursements)"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Net amount"
            readonly
            outlined
            dense
            hide-details
            background-color="#ddd"
            append-icon="mdi-calculator"
            :value="formatMoney(netAmount)"
          />
        </v-col>
        <v-col cols="12" md="4" offset-md="8" class="d-flex">
          <v-text-field
            label="No. of disbursements"
            type="number"
            step="1"
            outlined
            dense
            hide-details
            background-color="white"
            append-icon="mdi-pencil"
            v-model="disburseCount"
          />
          <v-btn color="primary" class="ml-3" @click="disburseClick" :disabled="netAmount == 0">Disburse</v-btn>
        </v-col>
      </v-row>

      <v-divider class="my-5" />

      <cslpt-disbursements
        v-on:showError="showError"
        v-on:showSuccess="showSuccess"
      ></cslpt-disbursements>
    </v-card-text>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { isNumber } from "lodash";
import CslptDisbursements from "../cslpt-disbursements.vue";

export default {
  components: { CslptDisbursements },
  data: () => ({
    disburseCount: 1,
  }),
  computed: {
    ...mapState({ application: "selectedApplication" }),
    ...mapState("cslPartTimeStore", ["assessment", "fundingRequest"]),
    ...mapGetters("cslPartTimeStore", [
      "totalCosts",
      "familyIncome",
      "requestedAmount",
      "maxAllowable",
      "assessedAmount",
      "previousDisbursements",
      "actualAward",
      "netAmount",
      "needRemaining",
    ]),
  },
  methods: {
    ...mapActions("cslPartTimeStore", ["makeDisbursements"]),
    disburseClick() {
      this.makeDisbursements(this.disburseCount);
    },

    showSuccess(mgs) {
      this.$emit("showSuccess", mgs);
    },
    showError(mgs) {
      this.$emit("showError", mgs);
    },

    formatMoney(input, defaultVal = false) {
      if (isNumber(input)) {
        return Intl.NumberFormat("en", {
          currency: "USD",
          style: "currency",
        }).format(input);
      }
      if (defaultVal) return input;
      return "$0.00";
    },
  },
};
</script>
