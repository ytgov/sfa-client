<template>
  <div v-if="assessment">
    <v-card-text>
      <h3 class="mb-5">Student Contribution</h3>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            label="Gross income"
            :value="formatMoney(assessment.student_ln150_income)"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            label="Exempt reason"
            :value="`${assessment.student_contrib_exempt} - ${assessment.student_exemption_reason ?? ''}`"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-checkbox
            class="mb-0 mt-1"
            label="Reduce on re-assess?"
            v-model="assessment.student_contribution_review"
            hide-details
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            hide-details
            append-icon="mdi-lock"
            readonly
            label="Expected contribution"
            :value="formatMoney(assessment.student_expected_contribution)"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            label="Previous contribution"
            :value="formatMoney(assessment.student_previous_contribution)"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            hide-details
            readonly
            label="Net contribution"
            :value="formatMoney(assessment.student_contribution)"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            dense
            background-color="#fff"
            hide-details
            label="Contribution override"
            v-currency
            v-model="assessment.student_contribution_override"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-divider class="my-5" />

      <h3 class="mb-5">Spouse Contribution</h3>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            label="Gross income"
            :value="formatMoney(assessment.spouse_ln150_income)"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            label="Exempt reason"
            :value="`${assessment.spouse_contrib_exempt} - ${assessment.spouse_exemption_reason}`"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-checkbox
            class="mb-0 mt-1"
            label="Reduce on re-assess?"
            hide-details
            v-model="assessment.spouse_contribution_review"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            hide-details
            append-icon="mdi-lock"
            readonly
            label="Expected contribution"
            :value="formatMoney(assessment.spouse_expected_contribution)"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            label="Previous contribution"
            :value="formatMoney(assessment.spouse_previous_contribution)"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            hide-details
            readonly
            label="Net contribution"
            :value="formatMoney(assessment.spouse_contribution)"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            dense
            background-color="#fff"
            hide-details
            label="Contribution override"
            v-currency
            v-model="assessment.spouse_contribution_override"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-divider class="my-5" />

      <v-row>
        <v-col cols="12" md="3">
          <h3 class="mb-5">Parent 1</h3>
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            label="Income"
            :value="formatMoney(assessment.parent1_income)"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            label="Tax paid"
            :value="formatMoney(assessment.parent1_tax_paid)"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <h3 class="mb-5">Parent 2</h3>

          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            label="Income"
            :value="formatMoney(assessment.parent2_income)"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            label="Tax paid"
            :value="formatMoney(assessment.parent2_tax_paid)"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <h3 class="mb-5">Total</h3>

          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            label="Income"
            :value="formatMoney(assessment.parent_income_total)"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            label="Tax paid"
            :value="formatMoney(assessment.parent_tax_total)"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <h3 class="mb-5">&nbsp;</h3>

          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            label="Moderate standard of living"
            :value="formatMoney(assessment.parent_msol)"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            label="Discretionary Income"
            :value="formatMoney(assessment.parent_discretionary_income)"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="9" class="pt-0"> </v-col>
        <v-col cols="12" md="3" class="pt-0">
          <v-checkbox
            class="mb-0 mt-1"
            label="Reduce on re-assess?"
            hide-details
            v-model="assessment.parent_contribution_review"
          ></v-checkbox>
        </v-col>
        <v-col cols="12" md="3"> </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            label="Weekly contribution per student"
            :value="formatMoney(assessment.parent_weekly_contrib)"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            label="Parental contribution"
            :value="formatMoney(assessment.parent_contribution)"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            outlined
            dense
            background-color="#fff"
            hide-details
            label="Contribution override"
            v-currency
            v-model="assessment.parent_contribution_override"
          ></v-text-field>
        </v-col>
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
    ...mapState("cslFullTimeStore", ["csgThresholds", "assessment"]),
    ...mapGetters("cslFullTimeStore", [
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
