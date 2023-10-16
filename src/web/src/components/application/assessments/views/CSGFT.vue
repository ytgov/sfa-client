<template>
  <div>
    <div class="d-flex">
      <v-btn :to="`/application/${applicationId}/status`" color="warning" x-small fab class="mt-2 mr-5">
        <v-icon>mdi-keyboard-backspace</v-icon>
      </v-btn>
      <h1 class="mb-0">Funding Status</h1>
    </div>

    <div class="mt-4">
      <v-card class="default mb-1 bg-color-blue">
        <v-card-title
          >Assessment - CSGFT
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
                :value="formatMoney(assessment.spouse_ln150_income || 0)"
                append-icon="mdi-lock"
              ></v-text-field>
              <v-text-field
                outlined
                dense
                background-color="#ddd"
                label="Parent 1 income"
                readonly
                :value="formatMoney(assessment.parent1_income || 0)"
                append-icon="mdi-lock"
              ></v-text-field>
              <v-text-field
                outlined
                dense
                background-color="#ddd"
                label="Parent 2 income"
                readonly
                :value="formatMoney(assessment.parent2_income || 0)"
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
          <csg-disbursements
            store="csgFullTimeStore"
            v-on:showError="showError"
            v-on:showSuccess="showSuccess"
          ></csg-disbursements>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { isNumber, isUndefined } from "lodash";
import { mapActions, mapGetters, mapState } from "vuex";
import CsgDisbursements from "../components/csg-disbursements.vue";

export default {
  name: "Home",
  components: { CsgDisbursements },
  data: () => ({
    assessed_date_menu: false,
    numberOfDisbursements: 2,
  }),
  async created() {
    this.applicationId = this.$route.params.id;
    let storeApp = store.getters.selectedApplication;
    store.dispatch("setAppSidebar", true);

    if (this.applicationId != storeApp.id) {
      await store.dispatch("loadApplication", this.applicationId).then(async (res) => {
        await this.initialize({ app: store.getters.selectedApplication }).then((r) => {
          if (isUndefined(this.parentAssessment)) {
            this.$emit("showError", "Please create the CSLFT Assessment first");
            this.$emit("close");
          }
        });
      });
    } else {
      await this.initialize({app: storeApp}).then((r) => {
        if (isUndefined(this.parentAssessment)) {
          this.$emit("showError", "Please create the CSLFT Assessment first");
          this.$emit("close");
        }
      });
    }

    await this.setCslClassifications();
    await this.setDisbursementTypes();
    await this.setChangeReasons();
  },
  computed: {
    ...mapState({ application: "selectedApplication" }),
    ...mapState("csgFullTimeStore", ["csgThresholds", "cslft", "assessment", "disbursements", "parentAssessment"]),
    ...mapGetters(["cslClassifications", "disbursementTypes", "changeReasons"]),

    ...mapGetters("csgFullTimeStore", [
      "familyIncome",
      "phaseOutRate",
      "assessedNeed",
      "assessedAmount",
      "monthlyRate",
      "previousDisbursements",
      "netAmount",
      "netAmountRaw",
      "thresholdRange",
      "threshold",
    ]),
    classification(state) {
      if (this.application && this.cslClassifications) {
        let val = this.cslClassifications.filter((c) => c.id == this.application.csl_classification)[0];
        return val ? val.description : "";
      }
      return "";
    },
  },
  methods: {
    ...mapActions("csgFullTimeStore", ["initialize", "makeDisbursements", "recalculate", "save", "removeDisbursement"]),
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
      if (isNumber(input)) {
        return Intl.NumberFormat("en", {
          currency: "USD",
          style: "currency",
        }).format(input);
      }
      return "$0.00";
    },
    showSuccess(mgs) {
      this.$emit("showSuccess", mgs);
    },
    showError(mgs) {
      this.$emit("showError", mgs);
    },
  },
};
</script>
