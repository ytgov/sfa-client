<template>
  <div>
    <div class="row  mt-2">
      <v-switch label="" class="my-0 mr-2" v-model="checkSTARequest" @change="toggle($event)"> </v-switch>
      <h3 class="text-h6 font-weight-regular">Student Applied for Training Allowance</h3>
    </div>
    <v-card class="default row mb-5">
      <div class="col-md-6 mb-n2"></div>
      <div class="col-md-6 mb-n2">
        <v-select
          outlined
          append-icon=""
          dense
          background-color="white"
          hide-details
          v-model="application.csl_classification"
          :items="cslClassifications"
          item-text="description"
          item-value="id"
          disabled
        >
        </v-select>
      </div>

      <div class="col-md-2 my-n2">
        <v-select
          outlined
          :disabled="!checkSTARequest"
          dense
          background-color="white"
          hide-details
          :items="itemOptions"
          :value="!!STARequest.student_meet_residency_req"
          @input="
            (e) => {
              STARequest.student_meet_residency_req = e;
            }
          "
          @change="
            updateFundingRequest(
              {
                student_meet_residency_req: STARequest.student_meet_residency_req,
              },
              STARequest.id
            )
          "
        >
        </v-select>
      </div>
      <div class="col-md-10 my-n2">
        <h3 class="text-subtitle-1 mt-1">Student meets residency requirement</h3>
      </div>

      <div class="col-md-2 my-n2">
        <v-select
          outlined
          :disabled="!checkSTARequest"
          dense
          background-color="white"
          hide-details
          :items="itemOptions"
          :value="!!STARequest.student_is_mov_to_anth_cmm_to_attd_prgm"
          @input="
            (e) => {
              STARequest.student_is_mov_to_anth_cmm_to_attd_prgm = e;
            }
          "
          @change="
            updateFundingRequest(
              {
                student_is_mov_to_anth_cmm_to_attd_prgm: STARequest.student_is_mov_to_anth_cmm_to_attd_prgm,
              },
              STARequest.id
            )
          "
        >
        </v-select>
      </div>
      <div class="col-md-10 my-n2">
        <h3 class="text-subtitle-1 mt-1">Student is moving to another community to attend program</h3>
      </div>

      <div class="col-md-2">
        <v-select
          outlined
          :disabled="!checkSTARequest"
          dense
          background-color="white"
          hide-details
          :items="itemOptions"
          :value="!!application.is_two_residence"
          @input="
            (e) => {
              application.is_two_residence = e;
            }
          "
          @change="doSaveApp('is_two_residence', application.is_two_residence, application.id)"
        >
        </v-select>
      </div>
      <div class="col-md-10 my-n2">
        <h3 class="text-subtitle-1 mt-1">Student is maintening two residences</h3>
      </div>

      <div class="col-md-2 my-n2">
        <v-select
          outlined
          :disabled="!checkSTARequest"
          dense
          background-color="white"
          hide-details
          :items="itemOptions"
          :value="!!STARequest.student_is_in_ft_study"
          @input="
            (e) => {
              STARequest.student_is_in_ft_study = e;
            }
          "
          @change="
            updateFundingRequest(
              {
                student_is_in_ft_study: STARequest.student_is_in_ft_study,
              },
              STARequest.id
            )
          "
        >
        </v-select>
      </div>
      <div class="col-md-10 my-n2">
        <h3 class="text-subtitle-1 mt-1">Student is in Full-Time study</h3>
      </div>

      <div class="col-md-2 my-n2">
        <v-select
          outlined
          :disabled="!checkSTARequest"
          dense
          background-color="white"
          hide-details
          :items="itemOptions"
          :value="!!STARequest.student_w_not_receive_fund_from_otr_org"
          @input="
            (e) => {
              STARequest.student_w_not_receive_fund_from_otr_org = e;
            }
          "
          @change="
            updateFundingRequest(
              {
                student_w_not_receive_fund_from_otr_org: STARequest.student_w_not_receive_fund_from_otr_org,
              },
              STARequest.id
            )
          "
        >
        </v-select>
      </div>
      <div class="col-md-10 my-n2">
        <h3 class="text-subtitle-1 mt-1">
          Student will not receive funding from any other organization for the study period
        </h3>
      </div>

      <div class="col-md-12 mt-n2">
        <v-textarea
          :disabled="!checkSTARequest"
          rows="3"
          outlined
          dense
          background-color="white"
          hide-details
          label="Comment"
          v-model="STARequest.comments"
          @change="
            updateFundingRequest(
              {
                comments: STARequest.comments,
              },
              STARequest.id
            )
          "
        >
        </v-textarea>
      </div>
    </v-card>

    <OtherFunding
      v-if="!STARequest.student_w_not_receive_fund_from_otr_org && checkSTARequest"
      v-on:showSuccess="showSuccess"
      v-on:showError="showError"
    >
    </OtherFunding>
    <confirm-dialog ref="confirm"></confirm-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "@/store";
import axios from "axios";
import OtherFunding from "./OtherFunding.vue";
import { APPLICATION_URL } from "@/urls";
import Vue from "vue";

export default {
  components: {
    OtherFunding,
  },
  computed: {
    ...mapGetters(["cslClassifications"]),
    student() {
      return store.getters.selectedStudent;
    },
    application: function() {
      return store.getters.selectedApplication;
    },
    STARequest: function() {
      const request = this.application?.funding_requests?.find((fr) => fr.request_type_id === 1);

      this.checkSTARequest = !!request;

      return request || {};
    },
  },
  data: () => ({
    itemOptions: [
      { text: "Yes", value: true },
      { text: "No", value: false },
    ],
    otherFunding: true,
    checkSTARequest: false,
    staEligibleInstitutions: [4664, 5326, 3488, 5648],
  }),
  async created() {
    store.dispatch("setCslClassifications");
  },
  watch: {},
  methods: {
    doSaveApp(field, value) {
      store.dispatch("updateApplication", [field, value, this]);
    },
    showSuccess(mgs) {
      this.$emit("showSuccess", mgs);
    },
    showError(mgs) {
      this.$emit("showError", mgs);
    },
    async deleteRecord(id) {
      try {
        const resDelete = await axios.delete(APPLICATION_URL + `/${id}/status`);

        const message = resDelete.data.messages[0];

        if (message.variant == "success") {
          this.$emit("showSuccess", message.text);
          this.checkSTARequest = false;
        } else {
          this.$emit("showError", message.text);
        }
      } catch (error) {
        this.$emit("showError", "Error to delete");
      } finally {
        store.dispatch("loadApplication", this.application.id);
      }
    },
    removeRecord() {
      this.$refs.confirm.show(
        "Are you sure?",
        "Click 'Confirm' below to permanently remove this funding record.",
        () => {
          this.deleteRecord(this.STARequest.id);
        },
        () => {
          this.checkSTARequest = !this.checkSTARequest;
        }
      );
    },
    async addFundingRequest() {
      if (!this.staEligibleInstitutions.includes(this.application.institution_campus_id)) {
        return;
      }

      try {
        const resInsert = await axios.post(APPLICATION_URL + `/${this.application.id}/status`, {
          status_id: 3,
          request_type_id: 1,
          received_date: new Date(),
        });
        const message = resInsert?.data?.messages[0];

        if (message?.variant === "success") {
          this.$emit("showSuccess", message.text);
          this.checkSTARequest = true;
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
        const resInsert = await axios.put(APPLICATION_URL + `/${this.application.id}/status/${id}`, {
          data: { ...itemToUpdate },
        });
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
    toggle(event) {
      if (this.checkSTARequest && !this.staEligibleInstitutions.includes(this.application.institution_campus_id)) {
        this.$emit("showError", "STA is not applicable to the student's institution");
        Vue.nextTick(() => {
          this.checkSTARequest = false;
        });
        return;
      }

      if (!event && this.STARequest?.id) {
        this.removeRecord();
      } else {
        this.addFundingRequest();
      }
    },
  },
};
</script>
