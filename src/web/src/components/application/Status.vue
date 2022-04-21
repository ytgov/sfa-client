<template>
  <div class="home">
    <h1>Assessment & Status</h1>

    <v-card class="default mb-5">
      <v-card-text>
        <div class="row">
          <div class="col-md-12">
            <h3>Funding</h3>
            <div
              v-for="(item, i) of application.funding_requests"
              :key="i"
              class="row"
            >
              <div class="col-md-6">
                <v-select
                  outlined
                  dense
                  background-color="#ffaaaa"
                  hide-details
                  label="Funding Type"
                  v-model="item.REQUEST_TYPE_ID"
                  :items="fundingTypeOptions"
                  item-text="DESCRIPTION"
                  item-value="REQUEST_TYPE_ID"
                ></v-select>
              </div>
              <div class="col-md-3">
                <v-menu
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
                      v-model="item.RECEIVED_DATE"
                      label="Date app received"
                      append-icon="mdi-calendar"
                      hide-details
                      readonly
                      outlined
                      dense
                      background-color="#ffaaaa"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="item.RECEIVED_DATE"
                    @input="item.received_date_menu = false"
                  ></v-date-picker>
                </v-menu>
              </div>

              <div class="col-md-3">
                <v-select
                  outlined
                  dense
                  background-color="#ffaaaa"
                  hide-details
                  label="Status"
                  v-model="item.STATUS_ID"
                  :items="statusOptions"
                  item-text="DESCRIPTION"
                  item-value="STATUS_ID"
                ></v-select>
              </div>
              <div class="col-md-6">
                <v-autocomplete
                  outlined
                  dense
                  background-color="#ffaaaa"
                  hide-details
                  label="Reason"
                  v-model="item.STATUS_REASON_ID"
                  :items="reasonOptions"
                  item-text="DESCRIPTION"
                  item-value="STATUS_REASON_ID"
                ></v-autocomplete>
              </div>
              <div class="col-md-3">
                <v-menu
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
                      v-model="item.STATUS_DATE"
                      label="Status date"
                      append-icon="mdi-calendar"
                      hide-details
                      readonly
                      outlined
                      dense
                      background-color="#ffaaaa"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="item.STATUS_DATE"
                    @input="item.status_date_menu = false"
                  ></v-date-picker>
                </v-menu>
              </div>

              <div class="col-md-3">
                <v-btn
                  color="warning"
                  x-small
                  fab
                  title="Remove"
                  class="my-0 float-right"
                  @click="removeDocumentation(i)"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </div>
              <div
                v-if="i < application.funding_requests.length - 1"
                class="col-md-12"
              >
                <hr />
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-btn color="info" @click="addDocumentation()" class="mb-5"
      >Add funding record</v-btn
    >

    <v-card class="default mb-5">
      <v-card-text>
        <div class="row">
          <div class="col-md-12">
            <h3>Requirements</h3>
            <div
              v-for="(item, i) of application.requirements"
              :key="i"
              class="row"
            >
              <div class="col-md-6">
                <v-autocomplete
                  outlined
                  dense
                  background-color="#ffaaaa"
                  hide-details
                  label="Requirement Type"
                  v-model="item.REQUIREMENT_TYPE_ID"
                  :items="requirementTypeOptions"
                  item-value="REQUIREMENT_TYPE_ID"
                  item-text="DESCRIPTION"
                  required
                ></v-autocomplete>
              </div>
              <div class="col-md-3">
                <v-menu
                  v-model="item.completed_date_menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  left
                  nudge-top="26"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="item.COMPLETED_DATE"
                      label="Completed date"
                      append-icon="mdi-calendar"
                      hide-details
                      readonly
                      outlined
                      dense
                      background-color="#ffaaaa"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="item.COMPLETED_DATE"
                    @input="item.completed_date_menu = false"
                  ></v-date-picker>
                </v-menu>
              </div>

              <div class="col-md-3">
                <v-btn
                  color="warning"
                  x-small
                  fab
                  title="Remove"
                  class="my-0 float-right"
                  @click="removeRequirement(i)"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </div>
              <div
                v-if="i < application.requirements.length - 1"
                class="col-md-12"
              >
                <hr />
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-btn color="info" @click="addRequirement()">Add requirement</v-btn>

    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>

<script>
import store from "../../store";
import axios from "axios";
import moment from "moment";
import {
  REQUIREMENT_TYPE_URL,
  FUNDING_TYPE_URL,
  FUNDING_STATUS_URL,
  FUNDING_REASON_URL,
} from "../../urls";

export default {
  name: "Home",
  computed: {
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  data: () => ({
    applicationId: -1,
    fundingTypeOptions: [],
    reasonOptions: [],
    requirementTypeOptions: [],
    statusOptions: [],
  }),
  async created() {
    this.loadRequirementTypes();
    this.loadFundingTypes();
    this.loadStatus();
    this.loadReasons();

    this.applicationId = this.$route.params.id;
    let storeApp = store.getters.selectedApplication;

    if (this.applicationId != storeApp.HISTORY_DETAIL_ID) {
      console.log("LOADING APPLICTION BASED ON URL");
      await store.dispatch("loadApplication", this.applicationId);
    }

    store.dispatch("setAppSidebar", true);
  },
  methods: {
    loadRequirementTypes() {
      axios.get(REQUIREMENT_TYPE_URL).then((resp) => {
        this.requirementTypeOptions = resp.data;
      });
    },
    loadFundingTypes() {
      axios.get(FUNDING_TYPE_URL).then((resp) => {
        this.fundingTypeOptions = resp.data;
      });
    },
    loadStatus() {
      axios.get(FUNDING_STATUS_URL).then((resp) => {
        this.statusOptions = resp.data;
      });
    },
    loadReasons() {
      axios.get(FUNDING_REASON_URL).then((resp) => {
        this.reasonOptions = resp.data;
      });
    },

    addDocumentation() {
      this.application.funding_requests.push({ status_date: "" });
    },
    removeDocumentation(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this funding record.",
        () => {
          this.application.funding_requests.splice(index, 1);
        },
        () => {}
      );
    },

    addRequirement() {
      this.application.requirements.push({
        COMPLETED_DATE: moment().format("YYYY-MM-DD"),
      });
    },
    removeRequirement(index) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this funding requirement.",
        () => {
          this.application.requirements.splice(index, 1);
        },
        () => {}
      );
    },
  },
};
</script>
