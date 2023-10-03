<template>
  <div>
    <div class="float-right">
      <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" class="mt-2" v-bind="attrs" v-on="on">Add Funding Request</v-btn>
        </template>

        <v-card>
          <v-list dense>
            <v-list-item v-for="item of addableFundingTypes" @click="menu = false">
              <v-list-item-title>
                <v-icon color>mdi-plus</v-icon>
                {{ item.description }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>

    <h1>Funding Status</h1>

    <div v-if="application">
      <v-card
        class="default mb-5"
        v-for="(item, index) in application.funding_requests"
        :key="index"
        :to="`/application/${application.id}/funding-requests/${item.id}`"
      >
        <v-card-title class="d-block mb-2">
          <div class="float-right text-right">
            <!-- <v-btn
              :disabled="!(item?.status_id === 6 || item?.status_id === 7 || item?.status_id === 40)"
              dense
              small
              color="info"
              class="my-0"
              @click="showAssessment(item?.request_type_id || null, item?.id || null)"
              block
            >
              Assessment
            </v-btn> -->
            <v-chip v-if="item.status_id == 1" color="error">Not Ready for Assessment</v-chip>
            <v-chip v-else-if="item.status_id == 6" color="warning">Ready for Assessment</v-chip>
            <v-chip v-else-if="item.status_id == 7" color="success">Assessment Complete </v-chip>
            <v-chip v-else color="info">Pending </v-chip>
          </div>

          <div class="text-h6 font-weight-regular">
            {{ fundingTypeOptions?.find((ft) => ft.id === item?.request_type_id)?.description }}
          </div>
        </v-card-title>
        <v-card-text>
          <div class="row">
            <div class="col-md-3">
              <v-menu
                :disabled="showAdd"
                v-model="item.received_date_menu"
                :close-on-content-click="false"
                transition="scale-transition"
                left
                nudge-top="26"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :disabled="showAdd"
                    v-model="item.received_date"
                    label="Date app received"
                    append-icon="mdi-calendar"
                    hide-details
                    readonly
                    outlined
                    dense
                    background-color="white"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  :disabled="showAdd"
                  v-model="item.received_date"
                  @change="updateFundingRequest({ received_date: item.received_date }, item.id)"
                  @input="item.received_date_menu = false"
                ></v-date-picker>
              </v-menu>
            </div>
            <div class="col-md-6">
              <v-select
                :disabled="showAdd"
                outlined
                dense
                background-color="white"
                hide-details
                label="Funding status"
                @change="updateFundingRequest({ status_id: item.status_id }, item.id)"
                v-model="item.status_id"
                :items="statusOptions"
                item-text="DESCRIPTION"
                item-value="STATUS_ID"
              ></v-select>
            </div>
            <div class="col-md-3">
              <v-menu
                :disabled="showAdd"
                v-model="item.status_date_menu"
                :close-on-content-click="false"
                transition="scale-transition"
                left
                nudge-top="26"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :disabled="showAdd"
                    v-model="item.status_date"
                    label="Status date"
                    append-icon="mdi-calendar"
                    hide-details
                    readonly
                    outlined
                    dense
                    background-color="white"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  :disabled="showAdd"
                  @change="updateFundingRequest({ status_date: item.status_date }, item.id)"
                  v-model="item.status_date"
                  @input="item.status_date_menu = false"
                ></v-date-picker>
              </v-menu>
            </div>

            <div class="col-md-9">
              <v-autocomplete
                :disabled="showAdd"
                outlined
                dense
                background-color="white"
                hide-details
                label="Reason"
                @change="updateFundingRequest({ status_reason_id: item.status_reason_id }, item.id)"
                v-model="item.status_reason_id"
                :items="reasonOptions"
                item-text="DESCRIPTION"
                item-value="STATUS_REASON_ID"
              ></v-autocomplete>
            </div>

            <div class="col-md-3">
              <status-documents
                :item="item"
                :type="fundingTypeOptions?.find((ft) => ft.REQUEST_TYPE_ID === item?.request_type_id)?.description"
                v-on:showError="showError"
              ></status-documents>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import store from "@/store";
import { isNumber, isUndefined } from "lodash";
import { mapActions, mapGetters, mapState } from "vuex";
import StatusDocuments from "@/components/application/StatusDocuments.vue";
import { REQUEST_TYPE_URL, STATUS, STATUS_REASON } from "@/urls";

export default {
  name: "Home",
  components: { StatusDocuments },
  data: () => ({
    assessed_date_menu: false,
    numberOfDisbursements: 2,
    menus1: {},
    menus2: {},
    menu: false,

    fundingTypeOptions: [],
    reasonOptions: [],
    requirementTypeOptions: [],
    statusOptions: [],
    showAdd: false,
    showError: false,
  }),
  async created() {
    this.applicationId = this.$route.params.id;
    let storeApp = store.getters.selectedApplication;
    store.dispatch("setAppSidebar", true);

    if (this.applicationId != storeApp.id) {
      await store.dispatch("loadApplication", this.applicationId);
    }

    this.loadFundingTypes();
    this.loadStatus();
    this.loadReasons();

    /* await this.initialize(storeApp).then((r) => {
      if (isUndefined(this.parentAssessment)) {
        this.$emit("showError", "Please create the CSLFT Assessment first");
        this.$emit("close");
      }
    }); */
  },
  computed: {
    ...mapState({ application: "selectedApplication" }),
    ...mapState("csgDependentStore", ["csgThresholds", "cslft", "assessment", "disbursements", "parentAssessment"]),

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

    addableFundingTypes() {
      if (this.fundingTypeOptions && this.application && this.application.funding_requests) {
        let items = this.fundingTypeOptions.filter((f) => f.is_active);
        let existing = this.application.funding_requests.map((f) => f.request_type_id);

        items = items.filter((i) => !existing.includes(i.id));
        items = items.filter((i) => i.description.indexOf("PT") == -1);
        items = items.filter((i) => i.description.indexOf("Part-") == -1);

        return items;
      }

      return [];
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

    loadFundingTypes() {
      axios.get(REQUEST_TYPE_URL).then((resp) => {
        this.fundingTypeOptions = resp.data.data;
      });
    },
    loadStatus() {
      axios.get(STATUS).then((resp) => {
        this.statusOptions = resp.data.data;
      });
    },
    loadReasons() {
      axios.get(STATUS_REASON).then((resp) => {
        this.reasonOptions = resp.data.data;
      });
    },

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

    updateFundingRequest() {},

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
</style>
