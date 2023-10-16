<template>
  <div v-if="assessment">
    <v-toolbar flat :color="assessableStatus.includes(fundingRequest.status_id) ? '#c7d4de' : 'error lighten-3'">
      <v-row>
        <v-col>
          <v-autocomplete
            :items="statusList"
            v-model="fundingRequest.status_id"
            item-text="description"
            item-value="id"
            dense
            outlined
            background-color="white"
            label="Status"
            @change="updateRequest"
            hide-details
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-autocomplete
            :items="statusReasons"
            v-model="fundingRequest.status_reason_id"
            item-text="description"
            item-value="id"
            dense
            outlined
            background-color="white"
            hide-details
            clearable
            label="Reason"
            @change="updateRequest"
          ></v-autocomplete>
        </v-col>
        <v-col>
          <v-text-field
            :value="formatDate(fundingRequest.status_date)"
            label="Status date"
            dense
            outlined
            readonly
            hide-details
            background-color="#ddd"
            append-icon="mdi-lock"
          />
        </v-col>
        <v-col class="text-right">
          <v-btn
            @click="recalculateClick"
            v-if="assessableStatus.includes(fundingRequest.status_id)"
            :disabled="!assessment.id"
            color="secondary"
            >Recalculate</v-btn
          >
        </v-col>
      </v-row>
    </v-toolbar>
    <v-card-text>
      <div v-if=" assessableStatus.includes(fundingRequest.status_id)">
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

    </div>  
      <v-divider class="my-5" />

      <cslpt-disbursements v-on:showError="showError" v-on:showSuccess="showSuccess"></cslpt-disbursements>
    </v-card-text>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { isEmpty, isNumber } from "lodash";
import moment from "moment";
import CslptDisbursements from "../cslpt-disbursements.vue";

export default {
  components: { CslptDisbursements },
  data: () => ({
    disburseCount: 1,
    assessableStatus: [6, 7],
  }),
  computed: {
    ...mapGetters(["statusReasons", "statusList"]),
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
    ...mapActions("cslPartTimeStore", ["makeDisbursements", "recalculate", "updateFundingRequest"]),
    disburseClick() {
      this.makeDisbursements(this.disburseCount);
    },

    showSuccess(mgs) {
      this.$emit("showSuccess", mgs);
    },
    showError(mgs) {
      this.$emit("showError", mgs);
    },
    recalculateClick() {
      this.recalculate();
    },
    async updateRequest() {
      this.updateFundingRequest();
    },
    formatDate(input) {
      if (isEmpty(input)) return "";
      return moment.utc(input).format("YYYY-MM-DD");
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
