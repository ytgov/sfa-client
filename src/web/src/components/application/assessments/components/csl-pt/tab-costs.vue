<template>
  <div v-if="assessment">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="4">
          <h3 style="line-height: 36px;" class="mb-0">Scholastic Expenses</h3>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            label="Tuition fees"
            :value="formatMoney(assessment.tuition_estimate)"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            label="Books"
            :value="formatMoney(assessment.books_supplies_cost)"
          ></v-text-field
        ></v-col>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-calculator"
            readonly
            hide-details
            label="Total"
            :value="formatMoney(assessment.uncapped_costs_total)"
          />
        </v-col>
      </v-row>
      <v-divider class="my-5" />

      <h3>Capped Expenses</h3>

      <v-row>
        <v-col cols="4" style="font-weight: 700; font-size: .95rem">
          <h4>Expense Type (Frequency)</h4>
        </v-col>
        <v-col cols="3" style="font-weight: 700; font-size: .95rem">
          Max Allowable
        </v-col>
        <v-col cols="2" style="font-weight: 700; font-size: .95rem">
          Actual
        </v-col>
        <v-col cols="3" style="font-weight: 700; font-size: .95rem">
          Total
        </v-col>
      </v-row>
      <v-divider class="my-2" />
      <v-row>
        <v-col cols="4" style="line-height: 36px; font-weight: 700; font-size: .95rem">
          Public Transportation (Monthly)
        </v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            :value="formatMoney(assessment.p_trans_month)"
        /></v-col>
        <v-col cols="2"> </v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-calculator"
            readonly
            hide-details
            :value="formatMoney(totalTransportation)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" style="line-height: 36px; font-weight: 700; font-size: .95rem">
          Day Care (Monthly)
        </v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            :value="formatMoney(assessment.day_care_allowable)"
        /></v-col>
        <v-col cols="2">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            :value="formatMoney(assessment.day_care_actual)"
        /></v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-calculator"
            readonly
            hide-details
            :value="formatMoney(totalDayCare)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" style="line-height: 36px; font-weight: 700; font-size: .95rem">
          Miscellaneous Allowance (Weekly)
        </v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            :value="formatMoney(maxMiscellaneous)"
        /></v-col>
        <v-col cols="2"> </v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-calculator"
            readonly
            hide-details
            :value="formatMoney(totalMiscellaneous)"
          />
        </v-col>
      </v-row>
      <v-divider class="my-5" />

      <v-row>
        <v-col cols="12" md="9" class="d-none d-sm-flex text-right"><h3>Total Costs</h3></v-col>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-calculator"
            readonly
            hide-details
            :value="formatMoney(totalCosts)"
        /></v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { isNumber } from "lodash";

export default {
  data: () => ({}),
  computed: {
    ...mapState({ application: "selectedApplication" }),
    ...mapGetters(["cslClassifications", "maritalStatusList", "provinces", "studyAreas", "programs"]),
    ...mapState("cslPartTimeStore", ["csgThresholds", "assessment"]),
    ...mapGetters("cslPartTimeStore", [
      "totalStudyCosts",
      "totalTransportation",
      "totalDayCare",
      "maxMiscellaneous",
      "totalMiscellaneous",
      "totalCosts",
    ]),
  },
  methods: {
    formatMoney(input) {
      if (isNumber(input)) {
        return Intl.NumberFormat("en", {
          currency: "USD",
          style: "currency",
        }).format(input);
      }
      return "$0.00";
    },
  },
};
</script>
