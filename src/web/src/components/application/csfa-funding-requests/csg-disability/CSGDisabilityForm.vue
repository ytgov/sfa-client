<template>
  <div>
      <!-- TITLE AND SWITCH -->
      <div class="row  mt-2">
          <v-switch
            label=""
            class="my-0 mr-2"
            :value="!!CSGDisabilityRequest?.id"
            v-model="checkCSGDisabilityRequest"
            @change="toggle($event, 29, CSGDisabilityRequest)"
          >
          </v-switch>
          <h3 class="text-h6 font-weight-regular">Student Applied for CSG for Students with Disabilities</h3>
      </div>
      <!--  -->
      
      <v-card class="default row mb-5">
        <div class="col-md-4">
          <v-switch
            label="Permenant Disability"
            class="my-0"
            :disabled="!checkCSGDisabilityRequest"
          >
          </v-switch>
        </div>
        <div class="col-md-4">
          <v-switch
              label="Presistent/Prolonged Disability"
              class="my-0"
              :disabled="!checkCSGDisabilityRequest"
          >
          </v-switch>
        </div>
        <div class="col-md-3">
          <v-text-field 
            outlined 
            dense 
            background-color="white" 
            hide-details
            label="Disability start date"
            :disabled="!checkCSGDisabilityRequest"
          >
          </v-text-field>
        </div>
      </v-card>
      <!-- DISABILITIES -->
      <v-card class="default row mb-5">
        <div class="col-md-12">
          <h3 class="text-h6 mb-n2 font-weight-regular">Disabilities</h3>
        </div>
        <div class="col-md-6">
          <v-autocomplete 
            outlined 
            dense 
            background-color="white" 
            hide-details
            :disabled="!checkCSGDisabilityRequest"
          >
          </v-autocomplete>
        </div>
        <div class="col-md-4">
          <v-switch
            label="Verified"
            class="my-1"
            :disabled="!checkCSGDisabilityRequest"
          >
          </v-switch>
        </div>
        <div class="col-md-2">
          <div class="row">
            <div class="col-4 d-flex justify-center">
              <v-btn
                color="success"
                x-small
                fab
                title="Add"
                class="my-0"
                :disabled="!checkCSGDisabilityRequest"
              >
              <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            <div class="col-4 d-flex justify-center">
              <v-btn
                color="error"
                x-small
                fab
                title="Remove"
                class="my-0"
                :disabled="!checkCSGDisabilityRequest"
              >
              <v-icon>mdi-minus</v-icon>
              </v-btn>
            </div>
            <div class="col-4 d-flex justify-center">
              <v-btn
                color="warning"
                x-small
                fab
                title=""
                class="my-0"
                :disabled="!checkCSGDisabilityRequest"
              >
              <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>
      <!--  -->
      <!-- TITLE AND SWITCH -->
      <div class="row  mt-2">
        <v-switch
          label=""
          class="my-0 mr-2"
          :value="!!CSGDServicesAndEquipmentRequest?.id"
          v-model="checkCSGDServicesAndEquipmentRequest"
          @change="toggle($event, 30, CSGDServicesAndEquipmentRequest)"
        >
        </v-switch>
        <h3 class="text-h6 font-weight-regular">Student Applied for CSG for Services and Equipment</h3>
      </div>
      <!--  -->
      <v-card class="default row mb-5">
        <div class="col-md-12">
          <h3 class="text-h6 mb-n2 font-weight-regular">Service required</h3>
        </div>
        <div class="col-md-6">
          <v-autocomplete 
            outlined 
            dense 
            background-color="white" 
            hide-details
            :disabled="!checkCSGDServicesAndEquipmentRequest"
          >
          </v-autocomplete>
        </div>
        <div class="col-md-4">
          <v-switch
            label="Verified"
            class="my-1"
            :disabled="!checkCSGDServicesAndEquipmentRequest"
          >
          </v-switch>
        </div>
        <div class="col-md-2">
          <div class="row">
            <div class="col-4 d-flex justify-center">
              <v-btn
                color="success"
                x-small
                fab
                title="Add"
                class="my-0"
                :disabled="!checkCSGDServicesAndEquipmentRequest"
              >
              <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            <div class="col-4 d-flex justify-center">
              <v-btn
                color="error"
                x-small
                fab
                title="Remove"
                class="my-0"
                :disabled="!checkCSGDServicesAndEquipmentRequest"
              >
              <v-icon>mdi-minus</v-icon>
              </v-btn>
            </div>
            <div class="col-4 d-flex justify-center">
              <v-btn
                color="warning"
                x-small
                fab
                title=""
                class="my-0"
                :disabled="!checkCSGDServicesAndEquipmentRequest"
              >
              <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </div>
          </div>
        </div>

        <div class="col-md-3 pr-2 mr-n2">
          <v-text-field 
            outlined 
            dense 
            background-color="white" 
            hide-details
            label="Requested Amount"
            value="$5,000.00"
            :disabled="!checkCSGDServicesAndEquipmentRequest"
          >
          </v-text-field>
        </div>
        <div class="col-md-3 px-2 mr-n2">
          <v-text-field 
            outlined 
            dense 
            background-color="white" 
            hide-details
            label="Maximum allowed amount"
            value="$2,000.00"
            :disabled="!checkCSGDServicesAndEquipmentRequest"
          >
          </v-text-field>
        </div>
        <div class="col-md-3 pl-2 mr-n2">
          <v-text-field 
            outlined 
            dense 
            background-color="white" 
            hide-details
            label="Approve amount"
            value="$2,000.00"
            :disabled="!checkCSGDServicesAndEquipmentRequest"
          >
          </v-text-field>
        </div>
        <div class="col-md-3  pl-1 mb-0">
          <div class="row">
            <div class="col-md-6 mx-0">
              <v-btn
              color="blue"
              block
              class="text-subtitle-2 mt-0"
              :disabled="!checkCSGDServicesAndEquipmentRequest"
            >
            View quote
            </v-btn>
            </div>
            <div class="col-md-6 mx-0">
              <v-btn
              color="blue"
              block
              class="text-subtitle-2 mt-0"
              disabled
            >
            View receipt
            </v-btn>
            </div>
          </div>
        </div>

      </v-card>
      <v-card class="default row mb-5">
        <div class="col-md-12">
          <h3 class="text-h6 mb-n2 font-weight-regular">Equipment required</h3>
        </div>
        <div class="col-md-6">
          <v-autocomplete 
            outlined 
            dense 
            background-color="white" 
            hide-details
            :disabled="!checkCSGDServicesAndEquipmentRequest"
          >
          </v-autocomplete>
        </div>
        <div class="col-md-4">
          <v-switch
            label="Verified"
            class="my-1"
            :disabled="!checkCSGDServicesAndEquipmentRequest"
          >
          </v-switch>
        </div>
        <div class="col-md-2">
          <div class="row">
            <div class="col-4 d-flex justify-center">
              <v-btn
                color="success"
                x-small
                fab
                title="Add"
                class="my-0"
                :disabled="!checkCSGDServicesAndEquipmentRequest"
              >
              <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            <div class="col-4 d-flex justify-center">
              <v-btn
                color="error"
                x-small
                fab
                title="Remove"
                class="my-0"
                :disabled="!checkCSGDServicesAndEquipmentRequest"
              >
              <v-icon>mdi-minus</v-icon>
              </v-btn>
            </div>
            <div class="col-4 d-flex justify-center">
              <v-btn
                color="warning"
                x-small
                fab
                title=""
                class="my-0"
                :disabled="!checkCSGDServicesAndEquipmentRequest"
              >
              <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </div>
          </div>
        </div>

        <div class="col-md-3 pr-2 mr-n2">
          <v-text-field 
            outlined 
            dense 
            background-color="white" 
            hide-details
            label="Requested Amount"
            value="$5,000.00"
            :disabled="!checkCSGDServicesAndEquipmentRequest"
          >
          </v-text-field>
        </div>
        <div class="col-md-3 px-2 mr-n2">
          <v-text-field 
            outlined 
            dense 
            background-color="white" 
            hide-details
            label="Maximum allowed amount"
            value="$2,000.00"
            disabled
          >
          </v-text-field>
        </div>
        <div class="col-md-3 pl-2 mr-n2">
          <v-text-field 
            outlined 
            dense 
            background-color="white" 
            hide-details
            label="Approve amount"
            value="$2,000.00"
            :disabled="!checkCSGDServicesAndEquipmentRequest"
          >
          </v-text-field>
        </div>
        <div class="col-md-3  pl-1 mb-0">
          <div class="row">
            <div class="col-md-6 mx-0">
              <v-btn
              color="blue"
              block
              class="text-subtitle-2 mt-0"
              :disabled="!checkCSGDServicesAndEquipmentRequest"
            >
            View quote
            </v-btn>
            </div>
            <div class="col-md-6 mx-0">
              <v-btn
              color="blue"
              block
              class="text-subtitle-2 mt-0"
              disabled
            >
            View receipt
            </v-btn>
            </div>
          </div>
        </div>

      </v-card>
      <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import store from '@/store';
import axios from 'axios';
import { APPLICATION_URL } from "@/urls";

export default {
  components: {

  },
  computed: {
    student() {
      return store.getters.selectedStudent;
    },
    application: function () {
      return store.getters.selectedApplication;
    },
    CSGDisabilityRequest: function () {
      const request = this.application
        ?.funding_requests?.find(fr => fr.request_type_id === 29);
        this.checkCSGDisabilityRequest = !!request;
      return request || {};
    },
    CSGDServicesAndEquipmentRequest: function () {
      const request = this.application
        ?.funding_requests?.find(fr => fr.request_type_id === 30);
        this.checkCSGDServicesAndEquipmentRequest = !!request;
      return request || {};
    },
  },
  data: () => ({
      itemOptions: [{text: '', value: null}, {text: 'Yes', value: 1}, {text: 'No', value: 0}],
      checkCSGDisabilityRequest: false,
      checkCSGDServicesAndEquipmentRequest: false,
  }),
  async created() {
  },
  watch: {

  },
  methods: {
    doSaveApp(field, value) {
      store.dispatch("updateApplication", [field, value, this]);
    },
    async deleteRecord(id) {
      try {
        const resDelete = await axios.delete(
          APPLICATION_URL + `/${id}/status`,
        );

        const message = resDelete.data.messages[0];

        if (message.variant == "success") {
          this.$emit("showSuccess", message.text);
          this.checkCSGDisabilityRequest = false;
        } else {
          this.$emit("showError", message.text);
        }
      } catch (error) {
        this.$emit("showError", "Error to delete");
      } finally {
        store.dispatch("loadApplication", this.application.id);
      }
    },
    removeRecord(request) {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this funding record.",
        () => {
          this.deleteRecord(request.id);
        },
        () => {
          if (request.request_type_id === 29) {
            this.checkCSGDisabilityRequest = !this.checkCSGDisabilityRequest;
          }
          if (request.request_type_id === 30) {
            this.checkCSGDServicesAndEquipmentRequest = !this.checkCSGDServicesAndEquipmentRequest;
          }
        }
      );

    },
    async addFundingRequest(type = null) {
      try {
        
        if (!type) {
          return;
        }

        const resInsert = await axios.post(
          APPLICATION_URL + `/${this.application.id}/status`,
          { request_type_id: type, received_date: new Date(), },
        );

        const message = resInsert?.data?.messages[0];

        if (message?.variant === "success") {
          this.$emit("showSuccess", message.text);
          this.checkCSGDisabilityRequest = true;
        } else {
          this.$emit("showError", message.text);
        }

      } catch (error) {
        this.$emit("showError", "Error to insert");
      } finally {
        store.dispatch("loadApplication", this.application.id);
      }
    },
    async updateFundingRequest(itemToUpdate, id) {
      try {
        const resInsert = await axios.put(
          APPLICATION_URL + `/${this.application.id}/status/${id}`,
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
        store.dispatch("loadApplication", this.application.id);
      }
    },
    toggle(event, request_type, request) {
      if (!event && request?.id) {
        this.removeRecord(request);
      } else {
        if (!request?.id) {
          this.addFundingRequest(request_type);
        }
      }
    },
  },
};
</script>