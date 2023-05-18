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
                <v-select
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    v-model="application.csl_classification"
                    @change="doSaveApp('csl_classification', application.csl_classification)"
                    :items="cslClassifications"
                    item-text="description"
                    item-value="id"
                >
                </v-select>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-6">
                        <v-switch 
                            :disabled="!checkCSFAFullTimeRequest"
                            class="my-0"
                            label="Full amount requested"
                            v-model="CSFAFullTimeRequest.is_csl_full_amount"
                            @change="e => {
                                toggleForBoth(e, 'is_csl_full_amount');
                            }"
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
                            label="Requested amount"
                            @keypress="validate.isNumber($event)"
                            :value="'$'+CSFAFullTimeRequest.csl_request_amount"
                            @input="e => {
                                CSFAFullTimeRequest.csl_request_amount = Number(e.slice(1));
                            }"
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
                    :value="'$'+application.student_ln150_income"
                    @input="e => {
                        application.student_ln150_income = Number(e.slice(1));
                    }"
                    @change="doSaveApp('student_ln150_income', application.student_ln150_income)"
                >
                </v-text-field>
            </div>
            <div class="col-md-12">
                <v-switch 
                    :disabled="!checkCSFAFullTimeRequest"
                    class="my-0"
                    label="Applied for Canada Student Grant Only"
                    v-model="CSFAFullTimeRequest.is_csg_only"
                    @change="e => {
                            toggleForBoth(e, 'is_csg_only');
                    }"
                >
                </v-switch>
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
        GrantFullTimeRequest: function () {
            const request = this.application
                ?.funding_requests
                ?.find(fr => fr.request_type_id === 35);

            //this.checkGrantFullTimeRequest = !!request;

            return request || {};
        },
        GrantTopUpFullTimeRequest: function () {
            const request = this.application
                ?.funding_requests
                ?.find(fr => fr.request_type_id === 28);

            //this.checkGrantTopUpFullTimeRequest = !!request;

            return request || {};
        },
    },
    data: () => ({
        itemOptions: [{text: 'Yes', value: true}, {text: 'No', value: false}],
        checkCSFAFullTimeRequest: false,
        //checkGrantFullTimeRequest: false,
        //checkGrantTopUpFullTimeRequest: false,
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
        async deleteBothRecord(idGrant, idGranTopUp) {
            try {
                const resDeleteG = await axios.delete(
                APPLICATION_URL+`/${idGrant}/status`,
                );

                const resDeleteGTU = await axios.delete(
                APPLICATION_URL+`/${idGranTopUp}/status`,
                );

                const messageG = resDeleteG.data.messages[0];
                const messageGTU = resDeleteGTU.data.messages[0];

                if (messageG.variant === "success" && messageGTU.variant === "success") {
                    this.$emit("showSuccess", messageG.text);
                    this.checkCSFAFullTimeRequest = false;
                } else {
                    this.$emit("showError", messageG.text);
                }
            } catch (error) {
                this.$emit("showError", "Error to delete");
            } finally {
                store.dispatch("loadApplication", this.application.id);
            }
        },
        removeBothRecord(requestType) {
            this.$refs.confirm.show(
                    "Are you sure?",
                    "Click 'Confirm' below to permanently remove this funding record.",
                () => {
                    this.deleteBothRecord(this.GrantFullTimeRequest.id, this.GrantTopUpFullTimeRequest.id);
                    if (requestType === "is_csl_full_amount") {
                        this.updateFundingRequest({
                            is_csl_full_amount: this.CSFAFullTimeRequest.is_csl_full_amount
                        }, this.CSFAFullTimeRequest.id);
                    }
                    if (requestType === "is_csg_only") {
                        this.updateFundingRequest({
                            is_csg_only: this.CSFAFullTimeRequest.is_csg_only
                        }, this.CSFAFullTimeRequest.id);
                    }
                    
                },
                () => {
                }
            );
            
        },
        async addFundingRequest(type = null, typeTwo = null) {
            try {
                const resInsert = await axios.post(
                    APPLICATION_URL+`/${this.application.id}/status`,
                    { request_type_id: type, received_date: new Date(),},
                );

                if (typeTwo === 35 || typeTwo === 28) {
                    const resInsert = await axios.post(
                        APPLICATION_URL+`/${this.application.id}/status`,
                        { request_type_id: typeTwo, received_date: new Date(),},
                    ); 
                }

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
                    this.addFundingRequest(4);
                }
            }
        },
        toggleForBoth(event, requestType = "") {
            if (!event && (this.GrantFullTimeRequest?.id && this.GrantTopUpFullTimeRequest?.id)) {
                this.removeBothRecord(requestType);
            } else {
                if (event && (!this.GrantFullTimeRequest?.id && !this.GrantTopUpFullTimeRequest?.id)) {
                    this.addFundingRequest(28, 35);
                    if (requestType === "is_csl_full_amount") {
                    this.updateFundingRequest({
                            is_csl_full_amount: this.CSFAFullTimeRequest.is_csl_full_amount
                        }, this.CSFAFullTimeRequest.id);
                    }
                    if (requestType === "is_csg_only") {
                        this.updateFundingRequest({
                            is_csg_only: this.CSFAFullTimeRequest.is_csg_only
                        }, this.CSFAFullTimeRequest.id);
                    }
                }else if (
                    event && (!!this.GrantFullTimeRequest?.id && !!this.GrantTopUpFullTimeRequest?.id)
                    || !event && (!this.GrantFullTimeRequest?.id && !this.GrantTopUpFullTimeRequest?.id)
                ) {
                    if (requestType === "is_csl_full_amount") {
                        this.updateFundingRequest({
                            is_csl_full_amount: this.CSFAFullTimeRequest.is_csl_full_amount
                        }, this.CSFAFullTimeRequest.id);
                    }
                    if (requestType === "is_csg_only") {
                        this.updateFundingRequest({
                            is_csg_only: this.CSFAFullTimeRequest.is_csg_only
                        }, this.CSFAFullTimeRequest.id);
                    }
                }
            }
            
        },
    },
};
</script>