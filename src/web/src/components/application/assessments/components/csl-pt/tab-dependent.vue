<template>
  <div v-if="assessment">
    <v-alert type="warning" v-if="assessment.dependent_count == 0" class="mb-0">
      This student has no CSG Eligible dependents
    </v-alert>

    <div v-else>
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
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            label="Dependents"
            v-model="assessment.dependent_count"
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
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            label="Study weeks"
            v-model="assessment.study_weeks"
          />
        </v-col>
        <v-col cols="12" md="4" offset-md="4">
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
            outlined
            dense
            background-color="#ddd"
            label="Weekly phase out rate"
            readonly
            :value="phaseOutRate"
            append-icon="mdi-lock"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            readonly
            label="Weekly rate"
            append-icon="mdi-lock"
            :value="formatMoney(weeklyRate)"
          ></v-text-field>
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
        <v-col cols="12" md="4" offset-md="4">
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
  {{ fundingRequest }}
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { isNumber } from "lodash";

export default {
  data: () => ({
    disburseCount: 2,
    assessed_date_menu: false,
  }),
  computed: {
    ...mapState("csgPartTimeDependentStore", ["assessment", "fundingRequest"]),
    ...mapGetters("csgPartTimeDependentStore", [
      "totalCosts",
      "familyIncome",
      "requestedAmount",
      "maxAllowable",
      "assessedAmount",
      "previousDisbursements",
      "netAmount",
      "threshold",
      "phaseOutRate",
      "weeklyRate",
    ]),
  },
  methods: {
    ...mapActions("csgPartTimeDependentStore", ["makeDisbursements"]),
    disburseClick() {
      this.makeDisbursements(this.disburseCount);
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
