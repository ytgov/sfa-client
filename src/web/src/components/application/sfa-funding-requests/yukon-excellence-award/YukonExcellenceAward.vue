<template>
    <div>
        <div class="row  mt-2">
            <v-switch
                label=""
                class="my-0 mr-2"
                :value="!!YEARequest?.id"
                v-model="checkYEARequest"
                @change="toggle($event)"
            >
            </v-switch>
            <h3 class="text-h6 font-weight-regular">Student Applied for YEA</h3>
        </div>
        <v-card class="default row mb-5">
            <div class="col-md-6">
                <div class="row my-n2">
                    <div class="col-md-6">
                        <h3 class="text-subtitle-1 mt-1">Left High School</h3>
                    </div> 
                    <div class="col-md-3">
                        <v-text-field
                            disabled
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Year"
                            :value="student.high_school_left_year"
                        >
                        </v-text-field>
                    </div>  
                    <div class="col-md-3">
                        <v-text-field
                            disabled
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Month"
                            :value="student.high_school_left_month"
                        >
                        </v-text-field>
                    </div>  
                </div>
                <div class="row my-n2">
                    <div class="col-md-6">
                        <h3 class="text-subtitle-1 mt-1">Current YEA Balance</h3>
                    </div> 
                    <div class="col-md-6">
                        <v-text-field 
                            :disabled="!checkYEARequest"
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label=""
                        >
                        </v-text-field>
                    </div>
                </div>
                <div class="row my-n2">
                    <div class="col-md-6">
                        <h3 class="text-subtitle-1 mt-1">YEA Requested Amount</h3>
                    </div> 
                    <div class="col-md-6">
                        <v-text-field 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label=""
                            @keypress="validate.isNumber($event)"
                            :disabled="!checkYEARequest"
                            v-model="YEARequest.yea_request_amount"
                            @change="updateFundingRequest({
                                yea_request_amount: YEARequest.yea_request_amount
                            }, YEARequest.id)"
                        >
                        </v-text-field>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="row my-n2">
                    <div class="col-md-6 d-md-flex justify-end">
                        <h3 class="text-subtitle-1 mt-1">YEA Expire Date</h3>
                    </div> 
                    <div class="col-md-6">
                        <v-menu
                            :disabled="!checkYEARequest"
                            v-model="show_menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            left
                            nudge-top="26"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                :disabled="!checkYEARequest"
                                append-icon="mdi-calendar"
                                :value="student.yea_expiry_date?.slice(0, 10)"
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
                                :value="student.yea_expiry_date?.slice(0, 10)"
                                @input="e => {
                                student.yea_expiry_date = e;
                                show_menu = false;
                                }"
                                @change="doSaveStudent('yea_expiry_date', student.yea_expiry_date, 'studentInfo', student.id)"
                            ></v-date-picker>
                        </v-menu>
                    </div>
                </div>

                <div class="col-md-12 my-6">
                </div>
                
                <div class="row my-n2">
                    <div class="col-md-7 d-flex justify-end"></div>
                    <div class="col-md-5 d-flex justify-end">
                        <v-btn
                            :disabled="!checkYEARequest"
                            class="my-0"
                            block
                            color="success"
                        >
                            VIEW RECEIPT(S)
                        </v-btn>
                    </div>
                </div>
            </div>

            <div class="col-md-12 mt-n2">
                <v-textarea
                    :disabled="!checkYEARequest"
                    rows="3"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Comment"
                    v-model="YEARequest.comments"
                    @change="updateFundingRequest({
                        comments: YEARequest.comments
                    }, YEARequest.id)"
                >

                </v-textarea>
            </div>
        </v-card>

        <!-- YEA earned -->
        <v-card class="default row mb-5">
            <div class="col-md-12">
                <h3 class="text-h6 font-weight-regular">YEA earned</h3>
            </div>
            
            <div class="col-md-2 pr-1">
                <h3 class="text-subtitle-1 text-center font-weight-bold">First Name</h3>
                <div  v-for="yea, index in student.yea_list" :key="index">
                    <v-text-field
                        disabled
                        class="my-1" 
                        outlined 
                        dense 
                        background-color="white" 
                        hide-details 
                        label="First Name"
                        v-model="yea.first_name"
                    >
                    </v-text-field>
                </div>
                <template v-if="student.yea_list?.length < 4">
                    <div v-for="index in MAX_TO_SHOW - student.yea_list.length" :key="index">
                        <v-text-field
                            disabled
                            class="my-1" 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="First Name"
                        >
                        </v-text-field>
                    </div>
                </template>
            </div>
            <div class="col-md-2 px-1">
                <h3 class="text-subtitle-1 text-center font-weight-bold">Last Name</h3>
                <div  v-for="yea, index in student.yea_list" :key="index">
                    <v-text-field
                        class="my-1"
                        disabled
                        outlined 
                        dense 
                        background-color="white" 
                        hide-details 
                        label="Last Name"
                        v-model="yea.last_name"
                    >
                    </v-text-field>
                </div>
                <template v-if="student.yea_list?.length < 4">
                    <div v-for="index in MAX_TO_SHOW - student.yea_list.length" :key="index">
                        <v-text-field
                            disabled
                            class="my-1" 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Last Name"
                        >
                        </v-text-field>
                    </div>
                </template>
            </div>
            <div class="col-md-4 px-1">
                <h3 class="text-subtitle-1 text-center font-weight-bold">Course</h3>
                <div  v-for="yea, index in student.yea_list" :key="index">
                    <v-text-field
                        class="my-1"
                        disabled
                        outlined 
                        dense 
                        background-color="white" 
                        hide-details 
                        label="Course"
                        v-model="yea.course"
                    >
                    </v-text-field>
                </div>
                <template v-if="student.yea_list?.length < 4">
                    <div v-for="index in MAX_TO_SHOW - student.yea_list.length" :key="index">
                        <v-text-field
                            disabled
                            class="my-1" 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Course"
                        >
                        </v-text-field>
                    </div>
                </template>
            </div>
            <div class="col-md-2 px-1">
                <h3 class="text-subtitle-1 text-center font-weight-bold">Amount</h3>
                <div  v-for="yea, index in student.yea_list" :key="index">
                    <v-text-field
                        class="my-1"
                        disabled
                        outlined 
                        dense 
                        background-color="white"
                        hide-details 
                        label="Amount"
                        v-model="yea.yea_amount"
                    >
                    </v-text-field>
                </div>
                <template v-if="student.yea_list?.length < 4">
                    <div v-for="index in MAX_TO_SHOW - student.yea_list.length" :key="index">
                        <v-text-field
                            disabled
                            class="my-1" 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Amount"
                        >
                        </v-text-field>
                    </div>
                </template>
            </div>
            <div class="col-md-2 pl-1">
                
                <h3 class="text-subtitle-1 text-center font-weight-bold">Year</h3>
                <div  v-for="yea, index in student.yea_list" :key="index">
                    <v-text-field
                        class="my-1" 
                        disabled
                        outlined 
                        dense 
                        background-color="white" 
                        hide-details 
                        label="Year"
                        v-model="yea.school_year"
                    >
                    </v-text-field>
                </div>
                <template v-if="student.yea_list?.length < 4">
                    <div v-for="index in MAX_TO_SHOW - student.yea_list.length" :key="index">
                        <v-text-field
                            disabled
                            class="my-1" 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Year"
                        >
                        </v-text-field>
                    </div>
                </template>
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
        student() {
            return store.getters.selectedStudent;
        },
        application: function () {
            return store.getters.selectedApplication;
        },
        fundingRequest() {
            const funding = this.application?.funding_requests[0];
            return funding || {};
        },
        YEARequest: function () {
            const request = this.application
                ?.funding_requests
                ?.find(fr => fr.request_type_id === 3);

            this.checkYEARequest = !!request;

            return request || {};
        },

    },
    data: () => ({
        show_menu: false,
        MAX_TO_SHOW: 4,
        checkYEARequest: false,
        validate: {},
    }),
    async created() {
        this.validate = validator;
    },
    watch: {

    },
    methods: {
        async deleteRecord(id) {
            try {
                const resDelete = await axios.delete(
                APPLICATION_URL+`/${id}/status`,
                );

                const message = resDelete.data.messages[0];

                if (message.variant == "success") {
                    this.$emit("showSuccess", message.text);
                    this.checkYEARequest = false;
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
                    this.deleteRecord(this.YEARequest.id);
                },
                () => {
                    this.checkYEARequest = !this.checkYEARequest;
                }
            );
            
        },
        async addFundingRequest() {
            try {
                const resInsert = await axios.post(
                    APPLICATION_URL+`/${this.application.id}/status`,
                    { request_type_id: 3, received_date: new Date(),},
                );
                const message = resInsert?.data?.messages[0];

                if (message?.variant === "success") {
                    this.$emit("showSuccess", message.text);
                    this.checkYEARequest = true;
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
            if (!event && this.YEARequest?.id) {
                this.removeRecord();
            } else {
                if (!this.YEARequest?.id) {
                    this.addFundingRequest();
                }
            }
        },
    },
};
</script>