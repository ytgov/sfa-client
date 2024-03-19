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
            :value="formatMoney(assessment.cslft_scholastic_total)"
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
        <v-col cols="2" style="font-weight: 500; font-size: .95rem">
          Actual
        </v-col>
        <v-col cols="3" style="font-weight: 700; font-size: .95rem">
          Total
        </v-col>
      </v-row>
      <v-divider class="my-2" />

      <v-row>
        <v-col cols="4" style="line-height: 36px; font-weight: 700; font-size: .95rem">
          Shelter/Food/Misc (Monthly)
        </v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            :value="formatMoney(assessment.shelter_month)"
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
            :value="formatMoney(assessment.shelter_total)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" style="line-height: 36px; font-weight: 700; font-size: .95rem">
          Public Trans (Monthly)
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
            :value="formatMoney(assessment.p_trans_total)"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" style="line-height: 36px; font-weight: 700; font-size: .95rem">
          Extended Trans (Irregular)
        </v-col>
        <v-col cols="3"></v-col>
        <v-col cols="2"> </v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-calculator"
            readonly
            hide-details
            :value="formatMoney(assessment.x_trans_total)"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" style="line-height: 36px; font-weight: 700; font-size: .95rem">
          Return Trans (16 weeks)
        </v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            :value="formatMoney(assessment.r_trans_16wk)"
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
            :value="formatMoney(assessment.r_trans_total)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" style="line-height: 36px; font-weight: 700; font-size: .95rem">
          Relocation (Annual)
        </v-col>
        <v-col cols="3"></v-col>
        <v-col cols="2"></v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-calculator"
            readonly
            hide-details
            :value="formatMoney(assessment.relocation_total)"
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
            :value="formatMoney(assessment.day_care_total)"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" style="line-height: 36px; font-weight: 700; font-size: .95rem">
          Dependent Shelter/Food/Misc (Monthly)
        </v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            :value="formatMoney(assessment.depend_food_allowable)"
        /></v-col>
        <v-col cols="2"></v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-calculator"
            readonly
            hide-details
            :value="formatMoney(assessment.depend_food_total)"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" style="line-height: 36px; font-weight: 700; font-size: .95rem">
          Dependent Public Trans (Monthly)
        </v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            :value="formatMoney(assessment.depend_tran_allowable)"
        /></v-col>
        <v-col cols="2"></v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-calculator"
            readonly
            hide-details
            :value="formatMoney(assessment.depend_tran_total)"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" style="line-height: 36px; font-weight: 700; font-size: .95rem">
          Discretionary Costs (Annual)
        </v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            :value="formatMoney(assessment.discretionary_cost)"
        /></v-col>
        <v-col cols="2">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-lock"
            readonly
            hide-details
            :value="formatMoney(assessment.discretionary_cost_actual)"
        /></v-col>
        <v-col cols="3">
          <v-text-field
            outlined
            dense
            background-color="#ddd"
            append-icon="mdi-calculator"
            readonly
            hide-details
            :value="formatMoney(assessment.discretionary_cost_total)"
          />
        </v-col>
      </v-row>

      <v-divider class="my-5" />

      <h3>Uncapped Expenses</h3>

      <div v-if="assessment.uncapped_expenses && assessment.uncapped_expenses.length > 0">
        <v-row>
          <v-col cols="3" class="pb-0">
            Expense Type
          </v-col>
          <v-col cols="4" class="pb-0">
            Description
          </v-col>
          <v-col cols="2" class="pb-0">
            Amount
          </v-col>
          <v-col cols="3" class="pb-0">
            Yearly Total
          </v-col>
        </v-row>

        <v-row v-for="(item, index) in assessment.uncapped_expenses">
          <v-col cols="3">
            <v-text-field
              outlined
              dense
              background-color="#ddd"
              append-icon="mdi-lock"
              readonly
              hide-details
              :value="item.category"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              outlined
              dense
              background-color="#ddd"
              append-icon="mdi-lock"
              readonly
              hide-details
              :value="item.description"
          /></v-col>
          <v-col cols="2">
            <v-text-field
              outlined
              dense
              background-color="#ddd"
              append-icon="mdi-lock"
              readonly
              hide-details
              :value="formatMoney(item.amount)"
          /></v-col>
          <v-col cols="3">
            <v-text-field
              outlined
              dense
              background-color="#ddd"
              append-icon="mdi-calculator"
              readonly
              hide-details
              :value="formatMoney(item.amount)"
            />
          </v-col>
        </v-row>
      </div>
      <div v-else>
        None
      </div>

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
            :value="formatMoney(assessment.total_costs)"
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
