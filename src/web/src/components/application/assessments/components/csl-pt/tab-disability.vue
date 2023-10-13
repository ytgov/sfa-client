<template>
  <div v-if="assessment">
    <v-card-text>
      <div v-if="!fundingRequest?.id">
        <v-alert type="warning" style="line-height: 36px" class="">
          A funding request does not exist for CSGD.
        </v-alert>
        <v-btn class="" color="primary" @click="createFundingRequestClick">Add Funding Request</v-btn>
      </div>

      <v-alert type="warning" v-else-if="!fundingRequest?.id" class="mb-0">
        This student does not have a qualifying disability
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

          <v-col>
            <v-text-field
              label="Disability status"
              append-icon="mdi-lock"
              readonly
              :value="
                application.permanent_disability
                  ? 'Permanent disability'
                  : application.pers_or_prolong_disability
                  ? 'Persistent/prolonged disability'
                  : ''
              "
              outlined
              dense
              background-color="#ddd"
            ></v-text-field>

            <v-text-field
              label="Disability start date"
              append-icon="mdi-lock"
              readonly
              :value="application.disability_start_date?.slice(0, 10)"
              outlined
              dense
              background-color="#ddd"
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

      <v-divider class="my-5" v-if="fundingRequest?.id" />
      <csg-disbursements
        class="mt-4"
        v-if="fundingRequest?.id"
        store="csgPartTimeDisabilityStore"
        v-on:showError="showError"
        v-on:showSuccess="showSuccess"
      ></csg-disbursements>
    </v-card-text>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { isNumber } from "lodash";
import CsgDisbursements from "../csg-disbursements.vue";

export default {
  components: { CsgDisbursements },
  data: () => ({
    disburseCount: 1,
    assessed_date_menu: false,
  }),
  computed: {
    ...mapState({ application: "selectedApplication" }),
    ...mapState("csgPartTimeDisabilityStore", ["assessment", "fundingRequest"]),
    ...mapGetters("csgPartTimeDisabilityStore", [
      "assessedAmount",
      "previousDisbursements",
      "netAmount",
      "needRemaining",
    ]),

    hasDisability() {
      if (this.application) return this.application.permanent_disability || this.application.pers_or_prolong_disability;
      return false;
    },
  },
  methods: {
    ...mapActions("csgPartTimeDisabilityStore", ["makeDisbursements", "createFundingRequest"]),
    disburseClick() {
      this.makeDisbursements(this.disburseCount);
    },

    createFundingRequestClick() {
      this.createFundingRequest().then(() => {
        this.$emit("showSuccess", "Funding Request Created");
      });
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
