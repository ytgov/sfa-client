<template>
  <div class="">
    <div class="mt-4">
      <v-card class="default mb-1 bg-color-blue">
        <v-card-title
          >Assessment - CSGD
          <v-spacer></v-spacer>
          <v-btn dense color="primary" class="my-0" @click="saveClick" :disabled="!assessment.id">
            Recalculate
          </v-btn>
        </v-card-title>
        <v-divider class="my-1"></v-divider>

        <v-card-text v-if="assessment">
          <v-row>
            <v-col>
              <v-menu
                v-model="assessed_date_menu"
                :close-on-content-click="false"
                transition="scale-transition"
                left
                nudge-top="26"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="assessment.assessed_date"
                    label="Assesssed date"
                    append-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    background-color="white"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="assessment.assessed_date"
                  @input="
                    saveAssessment();
                    assessed_date_menu = false;
                  "
                ></v-date-picker>
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
            <v-col>
              <v-text-field
                outlined
                dense
                background-color="#ddd"
                label="Assessed amount"
                readonly
                v-model="assessedAmount"
                append-icon="mdi-calculator"
              ></v-text-field>
              <v-text-field
                outlined
                dense
                background-color="#ddd"
                hide-details
                label="Previous disbursements"
                readonly
                v-model="previousDisbursements"
                append-icon="mdi-calculator"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider class="my-5" />
          <v-row>
            <v-col> </v-col>
            <v-col>
              <v-text-field
                outlined
                dense
                :background-color="
                  netAmountRaw > 0 ? 'success lighten-3' : netAmountRaw < 0 ? 'error lighten-3' : '#ddd'
                "
                hide-details
                label="Net amount"
                readonly
                v-model="netAmount"
                append-icon="mdi-calculator"
              ></v-text-field
            ></v-col>
            <v-col>
              <div class="d-flex">
                <v-text-field
                  outlined
                  dense
                  background-color="white"
                  label="No. of disbursements"
                  readonly
                  hide-details
                  v-model="numberOfDisbursements"
                  append-icon="mdi-lock"
                ></v-text-field>
                <v-btn :disabled="netAmountRaw <= 0" dense color="success" class="my-0 ml-3" @click="disburseClick">
                  Disburse
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>

    <div class="mt-4">
      <v-card class="default mb-5 bg-color-blue">
        <v-card-text>
          <h3>Disbursements</h3>

          <v-simple-table class="text-left narrow">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="narrow">Reference #</th>
                  <th class="narrow">Amount</th>
                  <th class="narrow">Type</th>
                  <th class="narrow">Issue Date</th>
                  <th class="narrow">Due Date</th>
                  <th class="narrow">Change Reason</th>
                  <th class="narrow">Batch ID</th>
                  <th class="narrow"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) of disbursements">
                  <td class="narrow">
                    <v-text-field
                      v-model="item.transaction_number"
                      dense
                      hide-details
                      outlined
                      @change="saveDisbursement"
                      class="narrowInput"
                    ></v-text-field>
                  </td>
                  <td class="narrow">
                    <v-text-field
                      :value="formatMoney(item.disbursed_amount)"
                      dense
                      readonly
                      outlined
                      background-color="#ccc"
                      class="narrowInput"
                      hide-details
                    ></v-text-field>
                  </td>
                  <td class="narrow">
                    <v-text-field
                      :value="getType(item.disbursement_type_id)"
                      v-if="item.financial_batch_id"
                      dense
                      readonly
                      hide-details
                      outlined
                      background-color="#ccc"
                      class="narrowInput"
                    ></v-text-field>
                    <v-autocomplete
                      v-model="item.disbursement_type_id"
                      v-else
                      :items="disbursementTypes"
                      item-text="description"
                      item-value="id"
                      dense
                      hide-details
                      outlined
                      :readyonly="!item.financial_batch_id"
                      @change="saveDisbursement"
                      class="narrowInput"
                    ></v-autocomplete>
                  </td>
                  <td class="narrow">
                    <v-text-field
                      :value="item.issue_date"
                      v-if="item.financial_batch_id"
                      dense
                      readonly
                      hide-details
                      outlined
                      background-color="#ccc"
                      class="narrowInput"
                    ></v-text-field>

                    <v-menu
                      v-else
                      v-model="menus1[idx]"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      left
                      nudge-top="26"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="item.issue_date"
                          readonly
                          outlined
                          clearable
                          dense
                          hide-details
                          background-color="white"
                          v-bind="attrs"
                          v-on="on"
                          @change="saveDisbursement"
                      class="narrowInput"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="item.issue_date"
                        @input="
                          menus1[idx] = false;
                          saveDisbursement();
                        "
                      ></v-date-picker>
                    </v-menu>
                  </td>
                  <td class="narrow">
                    <v-text-field
                      :value="item.due_date"
                      v-if="item.financial_batch_id"
                      dense
                      readonly
                      hide-details
                      outlined
                      background-color="#ccc"
                      class="narrowInput"
                    ></v-text-field>

                    <v-menu
                      v-else
                      v-model="menus2[idx]"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      left
                      nudge-top="26"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="item.due_date"
                          readonly
                          outlined
                          clearable
                          dense
                          hide-details
                          background-color="white"
                          v-bind="attrs"
                          v-on="on"
                          @change="saveDisbursement"
                      class="narrowInput"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="item.due_date"
                        @input="
                          menus2[idx] = false;
                          saveDisbursement();
                        "
                      ></v-date-picker>
                    </v-menu>
                  </td>
                  <td class="narrow">
                    <v-autocomplete
                      v-model="item.change_reason_id"
                      :items="changeReasons"
                      item-text="description"
                      item-value="id"
                      dense
                      hide-details
                      outlined
                      @change="saveDisbursement"
                      class="narrowInput"
                    ></v-autocomplete>
                  </td>
                  <td class="narrow">
                    <v-text-field
                      v-model="item.financial_batch_id"
                      dense
                      hide-details
                      outlined
                      readonly
                      class="narrowInput"
                    ></v-text-field>
                  </td>
                  <td class="narrow">
                    <v-btn
                      fab
                      class="my-0 mr-1"
                      color="warning"
                      x-small
                      @click="deleteDisbursement(item, idx)"
                      v-if="!item.financial_batch_id"
                      ><v-icon>mdi-delete</v-icon></v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { isNumber } from "lodash";
import { mapActions, mapGetters, mapState } from "vuex";
import Vue from "vue";

export default {
  name: "Home",
  data: () => ({
    assessed_date_menu: false,
    numberOfDisbursements: 1,
    menus1: {},
    menus2: {},
  }),
  async created() {
    this.applicationId = this.$route.params.id;
    let storeApp = store.getters.selectedApplication;

    if (this.applicationId != storeApp.HISTORY_DETAIL_ID) {
      await store.dispatch("loadApplication", this.applicationId);
    }

    await this.initialize(storeApp);
    await this.setCslClassifications();
    await this.setDisbursementTypes();
    await this.setChangeReasons();
  },
  computed: {
    ...mapState({ application: "selectedApplication" }),
    ...mapState("csgDisabilityStore", ["csgThresholds", "cslft", "assessment", "disbursements"]),
    ...mapGetters(["cslClassifications", "disbursementTypes", "changeReasons"]),

    ...mapGetters("csgDisabilityStore", ["previousDisbursements", "assessedAmount", "netAmount", "netAmountRaw"]),
    classification(state) {
      if (this.application && this.cslClassifications) {
        let val = this.cslClassifications.filter((c) => c.id == this.application.csl_classification)[0];
        return val ? val.description : "";
      }
      return "";
    },
  },
  methods: {
    ...mapActions("csgDisabilityStore", [
      "initialize",
      "makeDisbursements",
      "recalculate",
      "save",
      "removeDisbursement",
    ]),
    ...mapActions(["setCslClassifications", "setDisbursementTypes", "setChangeReasons"]),

    getReason(item) {
      let val = this.changeReasons.filter((r) => r.id == item);
      return val[0] ? val[0].description : "";
    },
    getType(item) {
      let val = this.disbursementTypes.filter((r) => r.id == item);
      return val[0] ? val[0].description : "";
    },

    disburseClick() {
      this.makeDisbursements(this.numberOfDisbursements);
    },
    async deleteDisbursement(item, index) {
      await this.removeDisbursement({ item, index });
    },
    async saveClick() {
      await this.recalculate();
      this.$emit("showSuccess", "Assessment saved");
    },
    async saveAssessment() {
      await this.save();
      this.$emit("showSuccess", "Assessment saved");
    },
    async saveDisbursement() {
      await this.save();
      this.$emit("showSuccess", "Disbursements saved");
    },

    formatMoney(input) {
      if (input && isNumber(input)) {
        return Intl.NumberFormat("en", {
          currency: "USD",
          style: "currency",
        }).format(input);
      }
      return "";
    },
  },
};
</script>