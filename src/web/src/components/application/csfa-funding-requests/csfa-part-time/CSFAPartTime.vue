<template>
    <div>
        <!-- TITLE AND SWITCH -->
        <div class="row  mt-2">
            <v-switch
                label=""
                class="my-0 mr-2"
                :value="!!CSFAPartTimeRequest?.id"
                v-model="checkCSFAPartTimeRequest"
                @change="toggle($event)"
            >
            </v-switch>
            <h3 class="text-h6 font-weight-regular">Student Applied for CSFA Part-Time Studies</h3>
        </div>
        <!--  -->
        
        <v-card class="default row mb-5">

            <div class="col-md-6">
                <v-autocomplete 
                    :disabled="!checkCSFAPartTimeRequest"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Last CSFA Province"
                    :items="provinces"
                    item-text="description"
                    item-value="id"
                    v-model="application.csl_previous_province_id"
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
                    :value="cslClassifications?.find(cc => cc.id === application?.csl_classification)?.description || 'CSL Classification'"
                    disabled
                >
                </v-text-field>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-6">
                        <v-switch 
                            :disabled="!checkCSFAPartTimeRequest"
                            class="my-0"
                            label="Full amount requested"
                            v-model="CSFAPartTimeRequest.is_csl_full_amount"
                            @change="updateFundingRequest({
                                is_csl_full_amount: CSFAPartTimeRequest.is_csl_full_amount
                            }, CSFAPartTimeRequest.id)"
                        >
                        </v-switch>
                    </div>
                    <div class="col-md-6">
                        <v-text-field 
                            :disabled="!checkCSFAPartTimeRequest"
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Requested Amount"
                            @keypress="validate.isNumber($event)"
                            v-model="CSFAPartTimeRequest.csl_request_amount"
                            @change="updateFundingRequest({
                                csl_request_amount: CSFAPartTimeRequest.csl_request_amount
                            }, CSFAPartTimeRequest.id)"
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
                    :disabled="!checkCSFAPartTimeRequest"
                    class="my-0"
                    label="Applied for Canada Student Grant Only"
                    v-model="CSFAPartTimeRequest.is_csg_only"
                    @change="updateFundingRequest({
                        is_csg_only: CSFAPartTimeRequest.is_csg_only
                    }, CSFAPartTimeRequest.id)"
                >
                </v-switch>
            </div>
            <div class="col-md-6">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Outstanding principal from previous CSFA Loan"
                    disabled
                    value="<$325.00>"
                >
                </v-text-field>
            </div>
            <div class="col-md-6">
                <v-switch 
                    :disabled="!checkCSFAPartTimeRequest"
                    class="my-0"
                    label="This is a part of a Full-time program"
                    v-model="application.is_part_of_ft"
                    @change="doSaveApp('is_part_of_ft', application.is_part_of_ft)"
                >
                </v-switch>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-4">
                        <v-text-field 
                            disabled
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="% of full course load"
                            value="40"
                        >
                        </v-text-field>
                    </div>
                    <div class="col-md-4">
                        <v-text-field 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Study Weeks"
                            disabled
                            value="16"
                        >
                        </v-text-field>
                    </div>
                    <div class="col-md-4">
                        <v-text-field 
                            disabled
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Courses/Wk"
                            value="3"
                        >
                        </v-text-field>
                    </div>
                </div>
            </div>

            <!-- QUESTIONS -->
            <div class="col-md-2">
                <v-select
                    :disabled="!checkCSFAPartTimeRequest"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :items="itemOptions"
                    :value="!!CSFAPartTimeRequest?.student_meet_residency_req"
                    @input="e => {
                        CSFAPartTimeRequest.student_meet_residency_req = e;
                    }"
                    @change="updateFundingRequest({
                        student_meet_residency_req: CSFAPartTimeRequest.student_meet_residency_req
                    }, CSFAPartTimeRequest.id)"
                >
                </v-select>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student meets residency requirement</h3>
            </div>

            <div class="col-md-2 my-n2">
                <v-select 
                    :disabled="!checkCSFAPartTimeRequest"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :items="itemOptions"
                    :value="!!CSFAPartTimeRequest?.student_isnt_elig_f_fund_in_another_jur"
                    @input="e => {
                        CSFAPartTimeRequest.student_isnt_elig_f_fund_in_another_jur = e;
                    }"
                    @change="updateFundingRequest({
                        student_isnt_elig_f_fund_in_another_jur: CSFAPartTimeRequest.student_isnt_elig_f_fund_in_another_jur
                    }, CSFAPartTimeRequest.id)"
                >
                </v-select>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student is not eligible for funding in another jurisdiction</h3>
            </div>

            <div class="col-md-2 my-n2">
                <v-select 
                    :disabled="!checkCSFAPartTimeRequest"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :items="itemOptions"
                    :value="!!CSFAPartTimeRequest?.student_is_in_ft_study"
                    @input="e => {
                        CSFAPartTimeRequest.student_is_in_ft_study = e;
                    }"
                    @change="updateFundingRequest({
                        student_is_in_ft_study: CSFAPartTimeRequest.student_is_in_ft_study
                    }, CSFAPartTimeRequest.id)"
                >
                </v-select>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student is in Full-Time study</h3>
            </div>

            <div class="col-md-2 my-n2">
                <v-select
                    :disabled="!checkCSFAPartTimeRequest" 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :items="itemOptions"
                    :value="!!CSFAPartTimeRequest?.student_is_att_in_elig_prog_des_ps_inst"
                    @input="e => {
                        CSFAPartTimeRequest.student_is_att_in_elig_prog_des_ps_inst = e;
                    }"
                    @change="updateFundingRequest({
                        student_is_att_in_elig_prog_des_ps_inst: CSFAPartTimeRequest.student_is_att_in_elig_prog_des_ps_inst
                    }, CSFAPartTimeRequest.id)"
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
                    :disabled="!checkCSFAPartTimeRequest"
                    rows="3"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Comment"
                    v-model="CSFAPartTimeRequest.comments"
                    @change="updateFundingRequest({
                        comments: CSFAPartTimeRequest.comments
                    }, CSFAPartTimeRequest.id)"
                >

                </v-textarea>
            </div>
            <!--  -->

        </v-card>
        <v-card class="default row mb-5">
            <div class="col-md-12 mb-n5">
                <h3 class="text-h6 font-weight-regular">Courses</h3>
            </div>
            
            <div class="col-md-6 pr-1">
                <h3 class="text-subtitle-1 text-center font-weight-bold">Course Description</h3>
                <v-text-field 
                    :disabled="!checkCSFAPartTimeRequest"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                >
                </v-text-field>
            </div>
            <div class="col-md-2 px-1">
                <h3 class="text-subtitle-1 text-center font-weight-bold">Course Code</h3>
                <v-text-field 
                    :disabled="!checkCSFAPartTimeRequest"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                >
                </v-text-field>
            </div>
            <div class="col-md-3 px-1">
                <h3 class="text-subtitle-1 text-center font-weight-bold">Instruction Type</h3>
                <v-select
                    :disabled="!checkCSFAPartTimeRequest"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                >
                </v-select>
            </div>
            <div class="col-md-1 mt-11 d-md-flex justify-center">
                    <v-btn
                        :disabled="!checkCSFAPartTimeRequest"
                        color="success" 
                        x-small
                        fab 
                        class="my-0"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn
                        :disabled="!checkCSFAPartTimeRequest"
                        color="error" 
                        x-small
                        fab 
                        class="my-0 ml-1"
                        @click="setClose"
                    >
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>
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
        CSFAPartTimeRequest: function () {
            const request = this.application
                ?.funding_requests
                ?.find(fr => fr.request_type_id === 5);

            this.checkCSFAPartTimeRequest = !!request;

            return request || {};
        },
    },
    data: () => ({
        itemOptions: [{text: 'Yes', value: true}, {text: 'No', value: false}],
        checkCSFAPartTimeRequest: false,
        validate: {},
    }),
    async created() {
        this.validate = validator;
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
                    this.checkCSFAPartTimeRequest = false;
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
                    this.deleteRecord(this.CSFAPartTimeRequest.id);
                },
                () => {
                    this.checkCSFAPartTimeRequest = !this.checkCSFAPartTimeRequest;
                }
            );
            
        },
        async addFundingRequest() {
            try {
                const resInsert = await axios.post(
                    APPLICATION_URL+`/${this.application.id}/status`,
                    { request_type_id: 5, received_date: new Date(),},
                );
                const message = resInsert?.data?.messages[0];

                if (message?.variant === "success") {
                    this.$emit("showSuccess", message.text);
                    this.checkCSFAPartTimeRequest = true;
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
            if (!event && this.CSFAPartTimeRequest?.id) {
                this.removeRecord();
            } else {
                if (!this.CSFAPartTimeRequest?.id) {
                    this.addFundingRequest();
                }
            }
        },
    },
};
</script>