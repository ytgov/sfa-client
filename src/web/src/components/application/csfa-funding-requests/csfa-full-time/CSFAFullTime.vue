<template>
    <div>
        <!-- TITLE AND SWITCH -->
        <div class="row  mt-2">
            <v-switch
                label=""
                class="my-0 mr-2"
                :value="!!CSFAFullTimeRequest?.id"
                v-model="checkCSFAFullTimeRequest"
                @change="toggle($event)"
            >
            </v-switch>
            <h3 class="text-h6 font-weight-regular">Student Applied for CSFA Full-Time Studies</h3>
        </div>
        <!--  -->
        
        <v-card class="default row mb-8">

            <div class="col-md-6">
                <v-autocomplete
                    :disabled="!checkCSFAFullTimeRequest"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    v-model="application.csl_previous_province_id"
                    label="Last CSFA Province"
                    :items="provinces"
                    item-text="description"
                    item-value="id"
                    @change="doSaveApp('csl_previous_province_id', application.csl_previous_province_id)"
                >
                </v-autocomplete>
            </div>
            <div class="col-md-6">
                <v-text-field
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    disabled
                    :value="cslClassifications.find(cc => cc.id === application?.csl_classification)?.description || 'CSL Classification'"
                    :items="cslClassifications"
                    item-text="description"
                    item-value="id"
                >
                </v-text-field>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-6">
                        <v-switch 
                            :disabled="!checkCSFAFullTimeRequest"
                            class="my-0"
                            label="Full amount requested"
                            v-model="CSFAFullTimeRequest.is_csl_full_amount"
                            @change="updateFundingRequest({
                                is_csl_full_amount: CSFAFullTimeRequest.is_csl_full_amount
                            }, CSFAFullTimeRequest.id)"
                        >
                        </v-switch>
                    </div>
                    <div class="col-md-6">
                        <v-text-field
                            :disabled="!checkCSFAFullTimeRequest"
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Requested Amount"
                            @keypress="validate.isNumber($event)"
                            v-model="CSFAFullTimeRequest.csl_request_amount"
                            @change="updateFundingRequest({
                                csl_request_amount: CSFAFullTimeRequest.csl_request_amount
                            }, CSFAFullTimeRequest.id)"
                        >
                        </v-text-field>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Student gross income (Ln 15000)"
                    disabled
                    value="$0.00"
                >
                </v-text-field>
            </div>
            <div class="col-md-6">
                <v-switch 
                    :disabled="!checkCSFAFullTimeRequest"
                    class="my-0"
                    label="Applied for Canada Student Grant Only"
                    v-model="CSFAFullTimeRequest.is_csg_only"
                    @change="updateFundingRequest({
                        is_csg_only: CSFAFullTimeRequest.is_csg_only
                    }, CSFAFullTimeRequest.id)"
                >
                </v-switch>
            </div>
            <div class="col-md-6">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Overaward from previous application"
                    disabled
                    value="<$325.00>"
                >
                </v-text-field>
            </div>

            <!-- QUESTIONS -->
            <div class="col-md-2">
                <v-select 
                    :disabled="!checkCSFAFullTimeRequest"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :items="itemOptions"
                    :value="!!CSFAFullTimeRequest?.student_meet_residency_req"
                    @input="e => {
                        CSFAFullTimeRequest.student_meet_residency_req = e;
                    }"
                    @change="updateFundingRequest({
                        student_meet_residency_req: CSFAFullTimeRequest.student_meet_residency_req
                    }, CSFAFullTimeRequest.id)"
                >
                </v-select>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student meets residency requirement</h3>
            </div>

            <div class="col-md-2 my-n2">
                <v-select 
                    :disabled="!checkCSFAFullTimeRequest"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :items="itemOptions"
                    :value="!!CSFAFullTimeRequest?.student_isnt_elig_f_fund_in_another_jur"
                    @input="e => {
                        CSFAFullTimeRequest.student_isnt_elig_f_fund_in_another_jur = e;
                    }"
                    @change="updateFundingRequest({
                        student_isnt_elig_f_fund_in_another_jur: CSFAFullTimeRequest.student_isnt_elig_f_fund_in_another_jur
                    }, CSFAFullTimeRequest.id)"
                >
                </v-select>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student is not eligible for funding in another jurisdiction</h3>
            </div>

            <div class="col-md-2 my-n2">
                <v-select 
                    :disabled="!checkCSFAFullTimeRequest"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :items="itemOptions"
                    :value="!!CSFAFullTimeRequest?.student_is_in_ft_study"
                    @input="e => {
                        CSFAFullTimeRequest.student_is_in_ft_study = e;
                    }"
                    @change="updateFundingRequest({
                        student_is_in_ft_study: CSFAFullTimeRequest.student_is_in_ft_study
                    }, CSFAFullTimeRequest.id)"
                >
                </v-select>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student is in Full-Time study</h3>
            </div>

            <div class="col-md-2 my-n2">
                <v-select 
                    :disabled="!checkCSFAFullTimeRequest"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :items="itemOptions"
                    :value="!!CSFAFullTimeRequest?.student_is_att_in_elig_prog_des_ps_inst"
                    @input="e => {
                        CSFAFullTimeRequest.student_is_att_in_elig_prog_des_ps_inst = e;
                    }"
                    @change="updateFundingRequest({
                        student_is_att_in_elig_prog_des_ps_inst: CSFAFullTimeRequest.student_is_att_in_elig_prog_des_ps_inst
                    }, CSFAFullTimeRequest.id)"
                >
                </v-select>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student is attending in eligible program at a designated post-secondary institution</h3>
            </div>
            <!--  -->

            <!-- COMMENT -->
            <div class="col-md-12 mt-n2">
                <v-textarea
                    :disabled="!checkCSFAFullTimeRequest"
                    rows="3"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Comment"
                    v-model="CSFAFullTimeRequest.comments"
                    @change="updateFundingRequest({
                        comments: CSFAFullTimeRequest.comments
                    }, CSFAFullTimeRequest.id)"
                >

                </v-textarea>
            </div>
            <!--  -->

        </v-card>
        <confirm-dialog ref="confirm"></confirm-dialog>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import store from '@/store';
import axios from 'axios';
import { APPLICATION_URL } from "@/urls";
import validator from "@/validator";

export default {
    components: {

    },
    computed: {
        ...mapGetters(["cslClassifications", "provinces"]),
        student() {
            return store.getters.selectedStudent;
        },
        application: function () {
            return store.getters.selectedApplication;
        },
        CSFAFullTimeRequest: function () {
            const request = this.application
                ?.funding_requests
                ?.find(fr => fr.request_type_id === 4);

            this.checkCSFAFullTimeRequest = !!request;

            return request || {};
        },
    },
    data: () => ({
        itemOptions: [{text: 'Yes', value: true}, {text: 'No', value: false}],
        checkCSFAFullTimeRequest: false,
        validate: {},
    }),
    async created() {
        this.validate = validator;
        store.dispatch("setCslClassifications");
        store.dispatch("setProvinces");
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
                    this.checkCSFAFullTimeRequest = false;
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
                    this.deleteRecord(this.CSFAFullTimeRequest.id);
                },
                () => {
                    this.checkCSFAFullTimeRequest = !this.checkCSFAFullTimeRequest;
                }
            );
            
        },
        async addFundingRequest() {
            try {
                const resInsert = await axios.post(
                    APPLICATION_URL+`/${this.application.id}/status`,
                    { request_type_id: 4, received_date: new Date(),},
                );
                const message = resInsert?.data?.messages[0];

                if (message?.variant === "success") {
                    this.$emit("showSuccess", message.text);
                    this.checkCSFAFullTimeRequest = true;
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
            if (!event && this.CSFAFullTimeRequest?.id) {
                this.removeRecord();
            } else {
                if (!this.CSFAFullTimeRequest?.id) {
                    this.addFundingRequest();
                }
            }
        },
    },
};
</script>