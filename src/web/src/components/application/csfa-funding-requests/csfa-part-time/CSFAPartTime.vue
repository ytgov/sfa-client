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
                <v-select
                    :disabled="!checkCSFAPartTimeRequest"
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
                            :disabled="!checkCSFAPartTimeRequest"
                            class="my-0"
                            label="Full amount requested"
                            v-model="CSFAPartTimeRequest.is_csl_full_amount"
                            @change="toggleForBoth($event, 'is_csl_full_amount')"
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
                            label="Requested amount"
                            @keypress="validate.isNumber($event)"
                            :value="'$'+CSFAPartTimeRequest.csl_request_amount"
                            @input="e => {
                                CSFAPartTimeRequest.csl_request_amount = Number(e.slice(1));
                            }"
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
                    :disabled="!checkCSFAPartTimeRequest"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Student gross income (Ln 15000)"
                    @keypress="validate.isNumber($event)"
                    :value="'$'+application.student_ln150_income"
                    @input="e => {
                        application.student_ln150_income = Number(e.slice(1));
                    }"
                    @change="doSaveApp('student_ln150_income', application.student_ln150_income)"
                >
                </v-text-field>
            </div>
            <div class="col-md-6">
                <v-switch 
                    :disabled="!checkCSFAPartTimeRequest"
                    class="my-0"
                    label="Applied for Canada Student Grant Only"
                    v-model="CSFAPartTimeRequest.is_csg_only"
                    @change="toggleForBoth($event, 'is_csg_only')"
                >
                </v-switch>
            </div>
            <div class="col-md-6">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    :disabled="!checkCSFAPartTimeRequest"
                    label="Outstanding principal from previous CSFA Loan"
                    v-model="application.outstanding_cslpt_amount"
                    @change="doSaveApp('outstanding_cslpt_amount', application.outstanding_cslpt_amount)"
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
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="% of full course load"
                            v-model="application.percent_of_full_time"
                            @change="doSaveApp('percent_of_full_time', application.percent_of_full_time)"
                            value="40"
                        >
                        </v-text-field>
                    </div>
                    <div class="col-md-4">
                        <v-text-field
                            :disabled="!checkCSFAPartTimeRequest"
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Study Weeks"
                            v-model="application.study_weeks_count"
                            @change="doSaveApp('study_weeks_count', application.study_weeks_count)"
                        >
                        </v-text-field>
                    </div>
                    <div class="col-md-4">
                        <v-text-field
                            :disabled="!checkCSFAPartTimeRequest"
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Courses/Wk"
                            v-model="application.courses_per_week"
                            @change="doSaveApp('courses_per_week', application.courses_per_week)"
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
            <div class="col-md-12">
                <div class="row" v-for="course, index in application.courses_enrolled" :key="index">
                    <div class="col-md-6 pr-1">
                        <h3 class="text-subtitle-1 text-center font-weight-bold">Course Description</h3>
                        <v-text-field 
                            :disabled="showAdd"
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details
                            v-model="course.description"
                            @change="updateCourse({ description: course.description }, course.id)"
                        >
                        </v-text-field>
                    </div>
                    <div class="col-md-2 px-1">
                        <h3 class="text-subtitle-1 text-center font-weight-bold">Course Code</h3>
                        <v-text-field 
                            :disabled="showAdd"
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details
                            v-model="course.course_code"
                            @change="updateCourse({ course_code: course.course_code }, course.id)"
                        >
                        </v-text-field>
                    </div>
                    <div class="col-md-3 px-1">
                        <h3 class="text-subtitle-1 text-center font-weight-bold">Instruction Type</h3>
                        <v-select
                            :disabled="showAdd"
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details
                            :items="instructionTypes"
                            item-text="description"
                            item-value="id"
                            v-model="course.instruction_type_id"
                            @change="updateCourse({ instruction_type_id: course.instruction_type_id }, course.id)"
                        >
                        </v-select>
                    </div>
                    <div class="col-md-1 mt-11 d-md-flex justify-center">
                        <v-btn
                            v-if="(index+1 === application.courses_enrolled.length && !showAdd)"
                            :disabled="showAdd"
                            color="success" 
                            x-small
                            fab 
                            class="my-0"
                            @click="showAdd = true"
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        <v-btn
                            :disabled="showAdd"
                            color="error" 
                            x-small
                            fab 
                            class="my-0 ml-1"
                            @click="removeCourse(course.id)"
                        >
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                    </div>
                </div>
                <div class="row" v-if="showAdd || !application?.courses_enrolled?.length">
                    <div class="col-md-6 pr-1">
                        <h3 class="text-subtitle-1 text-center font-weight-bold">Course Description</h3>
                        <v-text-field
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details
                            v-model="newRecord.description"
                        >
                        </v-text-field>
                    </div>
                    <div class="col-md-2 px-1">
                        <h3 class="text-subtitle-1 text-center font-weight-bold">Course Code</h3>
                        <v-text-field
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details
                            v-model="newRecord.course_code"
                        >
                        </v-text-field>
                    </div>
                    <div class="col-md-3 px-1">
                        <h3 class="text-subtitle-1 text-center font-weight-bold">Instruction Type</h3>
                        <v-select
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details
                            :items="instructionTypes"
                            item-text="description"
                            item-value="id"
                            v-model="newRecord.instruction_type_id"
                        >
                        </v-select>
                    </div>
                    <div class="col-md-1 mt-11 d-md-flex justify-center">
                            <v-btn
                                color="success" 
                                x-small
                                fab 
                                class="my-0"
                                @click="addCourse"
                            >
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                            <v-btn
                                color="error" 
                                x-small
                                fab 
                                class="my-0 ml-1"
                                @click="setClose"
                            >
                                <v-icon>mdi-close</v-icon>
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
import validator from "@/validator";

export default {
    computed: {
        ...mapGetters(["cslClassifications", "provinces", "instructionTypes"]),
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
        GrantPartTimeRequest: function () {
            const request = this.application
                ?.funding_requests
                ?.find(fr => fr.request_type_id === 31);

            this.checkCSFAPartTimeRequest = !!request;

            return request || {};
        },
    },
    data: () => ({
        itemOptions: [{text: 'Yes', value: true}, {text: 'No', value: false}],
        checkCSFAPartTimeRequest: false,
        validate: {},
        showAdd: false,
        newRecord: {
            description: "",
            course_code: "",
            instruction_type_id: null,
        },
    }),
    async created() {
        this.validate = validator;
        store.dispatch("setProvinces");
        store.dispatch("setInstructionTypes");
    },
    watch: {

    },
    methods: {
        setClose() {
            this.newRecord = {
                description: "",
                course_code: "",
                instruction_type_id: null,
            };

            this.showAdd = false;
        },
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
        async deleteCourse(id) {
            try {
                const resDelete = await axios.delete(
                APPLICATION_URL+`/${id}/course`,
                );

                const message = resDelete.data.messages[0];

                if (message.variant == "success") {
                    this.$emit("showSuccess", message.text);
                } else {
                    this.$emit("showError", message.text);
                }
            } catch (error) {
                this.$emit("showError", "Error to delete");
            } finally {
                store.dispatch("loadApplication", this.application.id);
            }
        },
        removeCourse(id) {
            this.$refs.confirm.show(
                    "Are you sure?",
                    "Click 'Confirm' below to permanently remove this course.",
                () => {
                    this.deleteCourse(id);
                },
                () => {

                }
            );
            
        },
        async addFundingRequest(type) {
            try {
                const resInsert = await axios.post(
                    APPLICATION_URL+`/${this.application.id}/status`,
                    { request_type_id: type, received_date: new Date(),},
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
        async addCourse() {
            try {
                if (!this.newRecord.description.length) {
                    this.$emit("showError", "Description is required");
                    return;
                }
                if (!this.newRecord.instruction_type_id) {
                    this.$emit("showError", "Instruction Type is required");
                    return;
                }

                const resInsert = await axios.post(
                    APPLICATION_URL+`/${this.application.id}/course`,
                    { data: { ...this.newRecord, application_id: this.application.id} },
                );
                const message = resInsert?.data?.messages[0];

                if (message?.variant === "success") {
                    this.$emit("showSuccess", message.text);
                    this.setClose();
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
        async updateCourse(itemToUpdate, id) {
            try {
                const resUpdate = await axios.patch(
                    APPLICATION_URL+`/${this.application.id}/course/${id}`,
                    { data: { ...itemToUpdate } },
                );
                const message = resUpdate?.data?.messages[0];

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
                    this.addFundingRequest(5);
                }
            }
        },
        toggleForBoth(event, requestType = "") {
            if (!event && (this.GrantPartTimeRequest?.id)) {
                this.removeBothRecord(requestType);
            } else {
                if (event && (!this.GrantPartTimeRequest?.id)) {
                    this.addFundingRequest(31);
                    if (requestType === "is_csl_full_amount") {
                    this.updateFundingRequest({
                            is_csl_full_amount: this.CSFAPartTimeRequest.is_csl_full_amount
                        }, this.CSFAPartTimeRequest.id);
                    }
                    if (requestType === "is_csg_only") {
                        this.updateFundingRequest({
                            is_csg_only: this.CSFAPartTimeRequest.is_csg_only
                        }, this.CSFAPartTimeRequest.id);
                    }
                }else if (
                    event && (!!this.GrantPartTimeRequest?.id)
                    || !event && (!this.GrantTopUpFullTimeRequest?.id)
                ) {
                    if (requestType === "is_csl_full_amount") {
                        this.updateFundingRequest({
                            is_csl_full_amount: this.CSFAPartTimeRequest.is_csl_full_amount
                        }, this.CSFAPartTimeRequest.id);
                    }
                    if (requestType === "is_csg_only") {
                        this.updateFundingRequest({
                            is_csg_only: this.CSFAPartTimeRequest.is_csg_only
                        }, this.CSFAPartTimeRequest.id);
                    }
                }
            }
            
        },
        async deleteBothRecord(id) {
            try {
                const resDelete = await axios.delete(
                APPLICATION_URL+`/${id}/status`,
                );

                const message = resDelete.data.messages[0];

                if (message.variant === "success") {
                    this.$emit("showSuccess", message.text);
                } else {
                    this.$emit("showError", message.text);
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
                    this.deleteBothRecord(this.GrantPartTimeRequest?.id);
                    if (requestType === "is_csl_full_amount") {
                        this.updateFundingRequest({
                            is_csl_full_amount: this.CSFAPartTimeRequest.is_csl_full_amount
                        }, this.CSFAPartTimeRequest.id);
                    }
                    if (requestType === "is_csg_only") {
                        this.updateFundingRequest({
                            is_csg_only: this.CSFAPartTimeRequest.is_csg_only
                        }, this.CSFAPartTimeRequest.id);
                    }
                    
                },
                () => {
                }
            );
            
        },
    },
};
</script>