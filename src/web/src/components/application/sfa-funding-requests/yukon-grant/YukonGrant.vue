<template>
    <div>
        <div class="row  mt-2">
            <v-switch
                label=""
                class="my-0 mr-2"
                v-model="checkYGRequest"
                @change="toggle($event)"
            >
            </v-switch>
            <h3 class="text-h6 font-weight-regular">Student Applied for Yukon Grant</h3>
        </div>
        <v-card class="default row mb-8">
            <div class="col-md-6 mb-n2">
            </div>
            <div class="col-md-6 mb-n2">
                <v-select 
                    outlined
                    append-icon=""
                    dense 
                    background-color="white" 
                    hide-details
                    :value="application.csl_classification || 'CSL Classification'"
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
                    :disabled="!checkYGRequest"
                    dense 
                    background-color="white" 
                    hide-details
                    label=""
                    :items="itemOptions"
                    :value="!!yukonGrantRequest?.student_meet_hs_o_equiv_req"
                    @input="e => {
                        yukonGrantRequest.student_meet_hs_o_equiv_req = e;
                    }"
                    @change="updateFundingRequest({
                        student_meet_hs_o_equiv_req: yukonGrantRequest.student_meet_hs_o_equiv_req
                    }, yukonGrantRequest.id)"
                >
                </v-select>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student meets high school requirement or equivalency</h3>
            </div>

            <div class="col-md-2 my-n2">
                <v-select 
                    outlined
                    :disabled="!checkYGRequest"
                    dense 
                    background-color="white" 
                    hide-details
                    label=""
                    :items="itemOptions"
                    :value="!!yukonGrantRequest?.student_meet_residency_req"
                    @input="e => {
                        yukonGrantRequest.student_meet_residency_req = e;
                    }"
                    @change="updateFundingRequest({
                        student_meet_residency_req: yukonGrantRequest.student_meet_residency_req
                    }, yukonGrantRequest.id)"
                >
                </v-select>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student meets residency requirement</h3>
            </div>

            <div class="col-md-2">
                <v-select 
                    outlined
                    :disabled="!checkYGRequest"
                    dense 
                    background-color="white" 
                    hide-details
                    label=""
                    :items="itemOptions"
                    :value="!!yukonGrantRequest?.student_isnt_elig_f_fund_in_another_jur"
                    @input="e => {
                        yukonGrantRequest.student_isnt_elig_f_fund_in_another_jur = e;
                    }"
                    @change="updateFundingRequest({
                        student_isnt_elig_f_fund_in_another_jur: yukonGrantRequest.student_isnt_elig_f_fund_in_another_jur
                    }, yukonGrantRequest.id)"
                >
                </v-select>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student is not eligible for funding in another jurisdiction</h3>
            </div>

            <div class="col-md-2 my-n2">
                <v-select 
                    outlined
                    :disabled="!checkYGRequest"
                    dense 
                    background-color="white" 
                    hide-details
                    label=""
                    :items="itemOptions"
                    :value="!!yukonGrantRequest?.student_is_in_ft_study"
                    @input="e => {
                        yukonGrantRequest.student_is_in_ft_study = e;
                    }"
                    @change="updateFundingRequest({
                        student_is_in_ft_study: yukonGrantRequest.student_is_in_ft_study
                    }, yukonGrantRequest.id)"
                >
                </v-select>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student is in Full-Time study</h3>
            </div>

            <div class="col-md-2 my-n2">
                <v-select 
                    outlined
                    :disabled="!checkYGRequest"
                    dense 
                    background-color="white" 
                    hide-details
                    label=""
                    :items="itemOptions"
                    :value="!!yukonGrantRequest?.student_is_att_in_elig_prog_des_ps_inst"
                    @input="e => {
                        yukonGrantRequest.student_is_att_in_elig_prog_des_ps_inst = e;
                    }"
                    @change="updateFundingRequest({
                        student_is_att_in_elig_prog_des_ps_inst: yukonGrantRequest.student_is_att_in_elig_prog_des_ps_inst
                    }, yukonGrantRequest.id)"
                >
                </v-select>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student is attending in eligible program at a designated post-secondary institution</h3>
            </div>

            <div class="col-md-2 my-n2">
                <v-select 
                    outlined
                    :disabled="!checkYGRequest"
                    dense 
                    background-color="white" 
                    hide-details
                    label=""
                    :items="itemOptions"
                    :value="!!yukonGrantRequest?.student_is_elig_for_airfare_trvl_amount"
                    @input="e => {
                        yukonGrantRequest.student_is_elig_for_airfare_trvl_amount = e;
                    }"
                    @change="updateFundingRequest({
                        student_is_elig_for_airfare_trvl_amount: yukonGrantRequest.student_is_elig_for_airfare_trvl_amount
                    }, yukonGrantRequest.id)"
                >
                </v-select>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student is eligible for Airfare Travel amount</h3>
            </div>

            <div class="col-md-12 mt-n2">
                <v-textarea
                    :disabled="!checkYGRequest"
                    rows="3"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Comment"
                    v-model="yukonGrantRequest.comments"
                    @change="updateFundingRequest({
                        comments: yukonGrantRequest.comments
                    }, yukonGrantRequest.id)"
                >

                </v-textarea>
            </div>


        </v-card>
        <confirm-dialog ref="confirm"></confirm-dialog>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import store from '@/store';
import axios from 'axios';
import {
  REQUIREMENT_TYPE_URL,
  FUNDING_TYPE_URL,
  FUNDING_STATUS_URL,
  FUNDING_REASON_URL,
  APPLICATION_URL
} from "@/urls";

export default {
    components: {

    },
    computed: {
        ...mapGetters(["cslClassifications"]),
        student() {
            return store.getters.selectedStudent;
        },
        application: function () {
            return store.getters.selectedApplication;
        },
        yukonGrantRequest: function () {
            const ygRequest = this.application
                ?.funding_requests
                ?.find(fr => fr.request_type_id === 2);

            this.checkYGRequest = !!ygRequest;

            return ygRequest ? ygRequest : {};
        },
        
    },
    data: () => ({
        itemOptions: [{text: "Yes", value: true}, {text: "No", value: false}],
        otherFunding: true,
        checkYGRequest: false,
    }),
    async created() {
        store.dispatch("setCslClassifications");
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
                APPLICATION_URL+`/${id}/status`,
                );

                const message = resDelete.data.messages[0];

                if (message.variant == "success") {
                    this.$emit("showSuccess", message.text);
                    this.checkYGRequest = false;
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
                    this.deleteRecord(this.yukonGrantRequest.id);
                },
                () => {
                    this.checkYGRequest = !this.checkYGRequest;
                }
            );
            
        },
        async addFundingRequest() {
            try {
                const resInsert = await axios.post(
                    APPLICATION_URL+`/${this.application.id}/status`,
                    { request_type_id: 2, received_date: new Date(),},
                );
                const message = resInsert?.data?.messages[0];

                if (message?.variant === "success") {
                    this.$emit("showSuccess", message.text);
                    this.checkYGRequest = true;
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
                    APPLICATION_URL+`/${this.application.id}/status/${id}`,
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
        toggle(event) {
            if (!event && this.yukonGrantRequest?.id) {
                this.removeRecord();
            } else {
                this.addFundingRequest();
            }
        },
    },
};
</script>