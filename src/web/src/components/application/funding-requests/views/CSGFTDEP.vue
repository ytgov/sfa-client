<template>
  <div>
    <h1>Funding Status - CSGFTDEP</h1>

    <v-card class="default mb-4">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="8">
            <h3 class="text-h6 font-weight-regular">Dependents</h3>

            <v-simple-table class="mb-5">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Birth Date</th>
                    <th>Is CSG Eligible</th>
                    <th>Birth Certificate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item of dependents">
                    <td>{{ item.name }}</td>
                    <td>{{ item.birth_date }}</td>
                    <td>
                      <v-icon color="success" v-if="item.is_csg_eligible" @click="item.is_csg_eligible = false"
                        >mdi-check</v-icon
                      >
                      <v-icon color="red" v-else @click="item.is_csg_eligible = true">mdi-close</v-icon>
                    </td>
                    <td>
                      <v-icon color="success" v-if="item.birth_cert" @click="item.birth_cert = false">mdi-check</v-icon>
                      <v-icon color="red" v-else @click="item.birth_cert = true">mdi-close</v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>

            <v-text-field
              readonly
              label="Attendance"
              value="Full-Time"
              dense
              outlined
              background-color="white"
              hide-details
            ></v-text-field>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="12" md="4">
            <div v-if="dependents.filter((d) => d.is_csg_eligible).length == 0">
              <v-alert type="error" class="mb-5" v-for="error of isValid">
                <div class="text-h5">Not Qualified</div>
                This application does not quality for CSGFTDEP without CSG Eligible dependents
              </v-alert>

              <v-select
                label="Reason"
                dense
                outlined
                background-color="white"
                :value="'No eligible dependents'"
                :items="['No eligible dependents', 'Not enrolled Full-Time']"
              ></v-select>

              <v-btn color="primary">Save</v-btn>
            </div>

            <div v-else-if="isValid.length == 0 && !showIt">
              <v-alert type="success" class="mb-5">
                <div class="text-h5">
                  Ready for Assessment
                </div>
                This application qualifies and contains all of the necessary information to begin an assessment.
              </v-alert>
              <v-btn color="success" @click="showIt = true">Begin Assessment</v-btn>
            </div>
            <div v-else-if="showIt">
              <p>
                For CSGFTDEP, only a single assessment can be created. If the below values have been changed in the
                application, click 'Recalculate'.
              </p>
              <p>Once the assessment is complete, click 'Disburse' below.</p>

              <strong>Total Disbursements: $0.00</strong>
            </div>
            <div v-else>
              <v-alert type="error" class="mb-5" v-for="error of isValid">
                <div class="text-h5">Not Ready for Assessment</div>
                {{ error }}
              </v-alert>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <div class="mt-4" v-if="showIt">
      <v-expansion-panels :value="[0]" multiple flat style="border: 1px #cecece solid">
        <v-expansion-panel :key="0" style="">
          <v-expansion-panel-header class="pb-3">
           Assessment 1 : {{ now }}
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-card class="default mb-1 bg-color-blue">
              <v-card-text v-if="assessment">
                <!-- <v-alert type="warning">
                  Based on changes to this application, an overpayment may have occurred
                </v-alert> -->

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
                          label="Assessed date"
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
                    <v-text-field
                      v-model="assessment.classes_start_date"
                      label="Classes start date"
                      readonly
                      outlined
                      dense
                      background-color="#ddd"
                      append-icon="mdi-lock"
                    ></v-text-field>
                    <v-text-field
                      v-model="assessment.classes_end_date"
                      label="Classes end date"
                      hide-details
                      readonly
                      outlined
                      dense
                      background-color="#ddd"
                      append-icon="mdi-lock"
                    ></v-text-field>
                  </v-col>

                  <v-col>
                    <div style="height: 66px"></div>
                    <v-text-field
                      outlined
                      dense
                      background-color="#ddd"
                      label="Study weeks"
                      readonly
                      v-model="assessment.study_weeks"
                      append-icon="mdi-calculator"
                    ></v-text-field>
                    <v-text-field
                      outlined
                      dense
                      background-color="#ddd"
                      hide-details
                      readonly
                      label="Study months"
                      v-model="assessment.study_months"
                      append-icon="mdi-calculator"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      outlined
                      dense
                      background-color="#ddd"
                      label="Family size"
                      readonly
                      v-model="assessment.family_size"
                      append-icon="mdi-lock"
                    ></v-text-field>
                    <v-text-field
                      outlined
                      dense
                      background-color="#ddd"
                      label="Dependents"
                      readonly
                      v-model="assessment.dependent_count"
                      append-icon="mdi-lock"
                    ></v-text-field>
                    <v-text-field
                      outlined
                      dense
                      background-color="#ddd"
                      hide-details
                      label="Student category"
                      readonly
                      v-model="classification"
                      append-icon="mdi-lock"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-divider class="my-5" />

                <v-row>
                  <v-col>
                    <v-text-field
                      outlined
                      dense
                      background-color="#ddd"
                      label="Student income"
                      readonly
                      :value="formatMoney(assessment.student_ln150_income)"
                      append-icon="mdi-lock"
                    ></v-text-field>
                    <v-text-field
                      outlined
                      dense
                      background-color="#ddd"
                      label="Spouse income"
                      readonly
                      :value="formatMoney(assessment.spouse_ln150_income)"
                      append-icon="mdi-lock"
                    ></v-text-field>
                    <v-text-field
                      outlined
                      dense
                      background-color="#ddd"
                      hide-details
                      label="Family income"
                      readonly
                      v-model="familyIncome"
                      append-icon="mdi-calculator"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      outlined
                      dense
                      background-color="#ddd"
                      label="Monthly phase out rate"
                      readonly
                      v-model="phaseOutRate"
                      append-icon="mdi-lock"
                    ></v-text-field>
                    <v-text-field
                      outlined
                      dense
                      background-color="#ddd"
                      readonly
                      label="Monthly rate"
                      v-model="monthlyRate"
                      append-icon="mdi-lock"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      outlined
                      dense
                      background-color="#ddd"
                      label="Assessed need"
                      readonly
                      v-model="assessedNeed"
                      append-icon="mdi-lock"
                    ></v-text-field>
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
                  <v-col>
                    <v-text-field
                      outlined
                      dense
                      :label="`Threshold range: family of ${assessment.family_size}`"
                      background-color="#ddd"
                      append-icon="mdi-lock"
                      :value="thresholdRange"
                    ></v-text-field>
                  </v-col>
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
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        hide-details
                        v-model="numberOfDisbursements"
                        append-icon="mdi-pencil"
                      ></v-text-field>
                      <v-btn
                        :disabled="Math.abs(netAmountRaw) == 0"
                        dense
                        color="success"
                        class="my-0 ml-3"
                        @click="disburseClick"
                      >
                        Disburse
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <div class="mt-4" v-if="showIt">
      <v-card class="default mb-5 bg-color-blue">
        <v-card-text>
          <h3 class="text-h6 font-weight-regular">Disbursements</h3>

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
                  <td>
                    <v-text-field
                      v-model="item.transaction_number"
                      dense
                      hide-details
                      outlined
                      @change="saveDisbursement"
                      class="narrowInput"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      :value="formatMoney(item.disbursed_amount)"
                      dense
                      readonly
                      outlined
                      background-color="#ccc"
                      hide-details
                      class="narrowInput"
                    ></v-text-field>
                  </td>
                  <td>
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
                      class="narrowInput"
                      @change="saveDisbursement"
                    ></v-autocomplete>
                  </td>
                  <td>
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
                          class="narrowInput"
                          v-bind="attrs"
                          v-on="on"
                          @change="saveDisbursement"
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
                  <td>
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
                  <td>
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
                  <td>
                    <v-text-field
                      v-model="item.financial_batch_id"
                      dense
                      hide-details
                      outlined
                      readonly
                      background-color="#ccc"
                      class="narrowInput"
                    ></v-text-field>
                  </td>
                  <td>
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
import moment from "moment";
import store from "@/store";
import { isNumber, isUndefined } from "lodash";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Home",
  data: () => ({
    assessed_date_menu: false,
    numberOfDisbursements: 2,
    menus1: {},
    menus2: {},
    showIt: false,
    dependents: [
      {
        name: "Michael Johnson",
        birth_date: "Nov 2, 1980",
        is_csg_eligible: false,
        birth_cert: false,
      },
      {
        name: "Sawyer Johnson",
        birth_date: "Nov 7, 2007",
        is_csg_eligible: false,
        birth_cert: false,
      },
    ],
  }),
  async created() {
    this.applicationId = this.$route.params.id;
    let storeApp = store.getters.selectedApplication;
    store.dispatch("setAppSidebar", true);

    if (this.applicationId != storeApp.HISTORY_DETAIL_ID) {
      await store.dispatch("loadApplication", this.applicationId);
    }

    /* await this.initialize(storeApp).then((r) => {
      if (isUndefined(this.parentAssessment)) {
        this.$emit("showError", "Please create the CSLFT Assessment first");
        this.$emit("close");
      }
    }); */

    await this.setCslClassifications();
    await this.setDisbursementTypes();
    await this.setChangeReasons();
  },
  computed: {
    now() {
      return moment().format("YYYY-MM-DD h:m a");
    },
    ...mapState({ application: "selectedApplication" }),
    ...mapState("csgDependentStore", ["csgThresholds", "cslft", "assessment", "disbursements", "parentAssessment"]),
    ...mapGetters(["cslClassifications", "disbursementTypes", "changeReasons"]),

    ...mapGetters("csgDependentStore", [
      "familyIncome",
      "phaseOutRate",
      "assessedNeed",
      "assessedAmount",
      "monthlyRate",
      "previousDisbursements",
      "netAmount",
      "netAmountRaw",
      "thresholdRange",
    ]),
    classification(state) {
      if (this.application && this.cslClassifications) {
        let val = this.cslClassifications.filter((c) => c.id == this.application.csl_classification)[0];
        return val ? val.description : "";
      }
      return "";
    },

    isValid() {
      let errors = [];
      let eligibleList = this.dependents.filter((d) => d.is_csg_eligible);

      if (eligibleList == 0) {
        return ["This student does not have any eligible dependents so this grant may not be relevant"];
      }

      for (let dep of this.dependents) {
        if (dep.is_csg_eligible && !dep.birth_cert) {
          errors.push(`No birth certificate for ${dep.name}`);
        }
      }

      return errors;
    },
  },
  methods: {
    ...mapActions("csgDependentStore", [
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
      await this.save()
        .then((resp) => {
          this.$emit("showSuccess", "Assessment saved");
        })
        .catch((err) => {
          this.$emit("showError", "Error saving assessment");
        });
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
<style scoped>
.v-data-table.narrow td {
  padding: 0 2px;
}
.v-expansion-panel {
    height: 50px;
}
.v-expansion-panel--active {
    height: auto !important;
}
</style>
