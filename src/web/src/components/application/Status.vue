<template>
  <div class="home">
    <div class="col-md-12 d-flex">
      <v-btn
        v-if="!showFundings"
        @click="showFundingStatus"
        color="warning"
        x-small
        fab
        class="mt-2 mr-5"
        title="Cancel"
      >
        <v-icon>mdi-keyboard-backspace</v-icon>
      </v-btn>

      <h1>Funding Status</h1>
    </div>
    <div class="col-md-12"  v-if="showFundings">
      <v-card class="default mb-5" v-for="item, index in application.funding_requests" :key="index">
        <v-card-text>
          <div class="row">
            <div class="col-md-4" :title="fundingTypeOptions?.find(ft => ft.REQUEST_TYPE_ID === item?.request_type_id)?.DESCRIPTION || 'Funding Status' ">
              <v-select
                disabled
                outlined
                dense
                background-color="white"
                hide-details
                label="Funding type"
                v-model="item.request_type_id"
                :items="fundingTypeOptions"
                item-text="DESCRIPTION"
                item-value="REQUEST_TYPE_ID"
              ></v-select>
            </div>
            <div class="col-md-2">
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
            <div class="col-md-3">
              <v-btn 
                :disabled="showAdd"
                dense
                color="blue" 
                class="my-0"
                @click="showAssessment(item?.request_type_id || null)"
                block
              >
                Assessment
              </v-btn>
          </div>
            <div class="col-md-3">
              <v-btn 
                :disabled="showAdd"
                dense
                color="success" 
                class="my-0"
                block
              >
                  Print Letter
              </v-btn>
          </div>
            
          </div>
          <div class="row">
            <div class="col-md-4">
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
            <div class="col-md-2">
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
            <div class="col-md-6">
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
          </div>

        </v-card-text>
      </v-card>
    </div>
    <component v-if="!showFundings && assessmentTypeId" :is="assessmentTypeC" />
  </div>
</template>

<script>
import store from "../../store";
import axios from "axios";
//Grants and Scholarships
import { assessmentType } from "@/components/application/assessmentType.js";
import {
  REQUIREMENT_TYPE_URL,
  FUNDING_TYPE_URL,
  FUNDING_STATUS_URL,
  FUNDING_REASON_URL,
  APPLICATION_URL
} from "../../urls";

export default {
  name: "Home",
  components: {
  },
  computed: {
    assessmentTypeC() {
      const id = this.assessmentTypeId;
      return assessmentType(id);
    },
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  data: () => ({
    assessmentTypeId: null,
    showFundings: true,
    showAdd: false,
    applicationId: -1,
    fundingTypeOptions: [],
    reasonOptions: [],
    requirementTypeOptions: [],
    statusOptions: [],
    newRecord: {
      request_type_id: null,
      received_date: null,
      status_id: null,
      status_reason_id: null,
      status_date: null,
      status_date_menu: false,
      received_date_menu: false,
      assessmentsComponents: {}
    },
  }),
  async created() {
    this.loadRequirementTypes();
    this.loadFundingTypes();
    this.loadStatus();
    this.loadReasons();

    this.applicationId = this.$route.params.id;
    let storeApp = store.getters.selectedApplication;

    if (this.applicationId != storeApp.HISTORY_DETAIL_ID) {
      await store.dispatch("loadApplication", this.applicationId);
    }

    store.dispatch("setAppSidebar", true);
  },
  methods: {
    showAssessment(id) {
      this.showFundings = false;
      this.assessmentTypeId = id;
    },
    showFundingStatus() {
      this.showFundings = true;
    },
    setClose() {
      this.newRecord = {
      request_type_id: null,
      received_date: null,
      status_id: null,
      status_reason_id: null,
      status_date: null,
      status_date_menu: false,
      received_date_menu: false,
    };
      this.showAdd = !this.showAdd;
    },
    assessmentLoadForm: function (items) {
      console.log("Value: ", items.request_type_id);
    },
    loadRequirementTypes() {
      axios.get(REQUIREMENT_TYPE_URL).then((resp) => {
        this.requirementTypeOptions = resp.data;
      });
    },
    loadFundingTypes() {
      axios.get(FUNDING_TYPE_URL).then((resp) => {
        this.fundingTypeOptions = resp.data;
        console.log(resp);
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
    async updateFundingRequest(itemToUpdate, id) {
      try {
        const resInsert = await axios.put(
            APPLICATION_URL+`/${this.applicationId}/status/${id}`,
            { data: { ...itemToUpdate } },
          );
          const message = resInsert?.data?.messages[0];

          if (message?.variant === "success") {
            this.$emit("showSuccess", message.text);
          } else {
            this.$emit("showError", message.text);
          }
          
      } catch (error) {
        this.$emit("showError", "Error to update");
      } finally {
        store.dispatch("loadApplication", this.applicationId);
      }
    },
  },
};
</script>
