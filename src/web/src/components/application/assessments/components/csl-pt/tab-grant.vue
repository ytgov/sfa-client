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
      <div v-if="!fundingRequest?.id">
        <v-alert type="warning" style="line-height: 36px" class="">
          A funding request does not exist for CSG-PT.
        </v-alert>
        <v-btn class="" color="primary" @click="createFundingRequestClick">Add Funding Request</v-btn>
      </div>

      <div v-if="fundingRequest?.id && assessableStatus.includes(fundingRequest.status_id)">
        <v-row>
          <v-col cols="12" md="4">
            <v-menu
              v-model="assessed_date_menu"
              :close-on-content-click="false"
              transition="scale-transition"
              left
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="assessment.assessed_date"
                  label="Assessed date"
                  append-icon="mdi-calendar"
                  hide-details
                  readonly
                  outlined
                  dense
                  background-color="white"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="assessment.assessed_date" @input="assessed_date_menu = false"></v-date-picker>
            </v-menu>
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
              :label="`Threshold range: family of ${assessment.family_size}`"
              readonly
              outlined
              dense
              hide-details
              background-color="#ddd"
              append-icon="mdi-lock"
              :value="thresholdRange"
            />
          </v-col>

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
              label="Actual award"
              readonly
              outlined
              dense
              hide-details
              background-color="#ddd"
              append-icon="mdi-calculator"
              :value="formatMoney(assessedAmount)"
            />
          </v-col>
        </v-row>
        <v-divider class="my-5" />
        <v-row>
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
      <div v-if="fundingRequest?.id && disbursements.length > 0">
        <v-divider class="my-5" />
        <csg-disbursements
          class="mt-4"
          store="csgPartTimeStore"
          v-on:showError="showError"
          v-on:showSuccess="showSuccess"
        ></csg-disbursements>
      </div>
    </v-card-text>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { isNumber, isEmpty } from "lodash";
import moment, { isDate } from "moment";
import CsgDisbursements from "../csg-disbursements.vue";

export default {
  components: { CsgDisbursements },
  data: () => ({
    disburseCount: 1,
    assessed_date_menu: false,
    assessableStatus: [6, 7],
  }),
  computed: {
    ...mapGetters(["statusReasons", "statusList"]),
    ...mapState("csgPartTimeStore", ["assessment", "fundingRequest", "disbursements"]),
    ...mapGetters("csgPartTimeStore", [
      "totalCosts",
      "familyIncome",
      "requestedAmount",
      "maxAllowable",
      "assessedAmount",
      "previousDisbursements",
      "totalGrants",
      "netAmount",
      "threshold",
      "needRemaining",
      "thresholdRange",
    ]),
  },
  methods: {
    ...mapActions("csgPartTimeStore", [
      "makeDisbursements",
      "createFundingRequest",
      "recalculate",
      "updateFundingRequest",
    ]),
    disburseClick() {
      this.makeDisbursements(this.disburseCount);
    },

    createFundingRequestClick() {
      this.createFundingRequest().then(() => {
        this.$emit("showSuccess", "Funding Request Created");
      });
    },
    recalculateClick() {
      this.recalculate();
    },

    showSuccess(mgs) {
      this.$emit("showSuccess", mgs);
    },
    showError(mgs) {
      this.$emit("showError", mgs);
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
