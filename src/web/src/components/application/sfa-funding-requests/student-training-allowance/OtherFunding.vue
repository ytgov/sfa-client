<template>
    <div>
        <h3 class="text-h5 font-weight-regular my-5">Other Funding</h3>
        <v-card class="default row mb-5" v-for="agency, index in application?.agencies_assistance" :key="index">
            <div class="col-md-6">
                <h3 class="text-h6 font-weight-regular">Agency {{ index + 1 }}</h3>
            </div>
            <v-spacer></v-spacer>
            <div class="col-md-6">
                <v-btn
                    :disabled="showAdd"
                    color="warning" 
                    x-small
                    fab 
                    class="my-0 float-right"
                    @click="removeRecord(agency.id)"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>

            <div class="col-md-8 mt-n4">
                <v-autocomplete
                    :disabled="showAdd"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Agency Name"
                    :items="agencies"
                    item-text="description"
                    item-value="id"
                    v-model="agency.agency_id"
                    @change="updateRecord({agency_id: agency.agency_id}, agency.id)"
                >
                </v-autocomplete>
            </div>
            <div class="col-md-4 mt-n4">
                <v-text-field 
                    :disabled="showAdd"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    validate
                    label="Amount"
                    @keypress="validate.isNumber($event)"
                    v-model="agency.amount"
                    @change="e => {
                        if (e === '') {
                            agency.amount = 0
                        } 
                        updateRecord({amount: agency.amount}, agency.id);
                    }"
                >
                </v-text-field>
            </div>

            <div class="col-md-2">
                <v-switch
                    :disabled="showAdd"
                    class="my-0"
                    label="Tuition"
                    v-model="agency.is_tuition"
                    @change="updateRecord({is_tuition: agency.is_tuition}, agency.id)"
                >
                </v-switch>
            </div>
            <div class="col-md-2">
                <v-switch
                    :disabled="showAdd"
                    class="my-0"
                    label="Books"
                    v-model="agency.is_books"
                    @change="updateRecord({is_books: agency.is_books}, agency.id)"
                >
                </v-switch>
            </div>
            <div class="col-md-2">
                <v-switch
                    :disabled="showAdd"
                    class="my-0"
                    label="Living expenses"
                    v-model="agency.is_living_expenses"
                    @change="updateRecord({is_living_expenses: agency.is_living_expenses}, agency.id)"
                >
                </v-switch>
            </div>
            <div class="col-md-2">
                <v-switch
                    :disabled="showAdd"
                    class="my-0"
                    label="Transportation"
                    v-model="agency.is_transportation"
                    @change="updateRecord({is_transportation: agency.is_transportation}, agency.id)"
                >
                </v-switch>
            </div>

            <div class="col-md-4">
                <v-text-field 
                    :disabled="showAdd"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Other purposes"
                    v-model="agency.other_purpose"
                    @change="updateRecord({other_purpose: agency.other_purpose}, agency.id)"
                ></v-text-field>
            </div>

            <div class="col-md-12 mt-n5">
                <v-textarea
                    :disabled="showAdd"
                    outlined 
                    rows="4"
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Comments"
                    v-model="agency.agency_comment"
                    @change="updateRecord({agency_comment: agency.agency_comment}, agency.id)"
                >
                </v-textarea>
            </div>   

        </v-card>

        <v-card class="default row mb-5" v-if="showAdd">
            <div class="col-md-6">
                <h3 class="text-h6 font-weight-regular">Add Agency</h3>
            </div>
            <v-spacer></v-spacer>
            <div class="col-md-6 d-flex justify-end">
                <v-btn
                    color="error" 
                    x-small
                    fab 
                    class="my-0"
                    @click="setClose"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn
                    color="success" 
                    x-small
                    fab 
                    class="my-0 ml-5"
                    @click="insertRecord"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </div>

            <div class="col-md-8 mt-n4">
                <v-autocomplete
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Agency Name"
                    :items="agencies"
                    item-text="description"
                    item-value="id"
                    v-model="newRecord.agency_id"

                >
                </v-autocomplete>
            </div>
            <div class="col-md-4 mt-n4">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Amount"
                    @keypress="validate.isNumber($event)"
                    v-model="newRecord.amount"
                    @change="e => {
                        if (e === '') {
                            newRecord.amount = 0
                        }
                    }"
                >
                </v-text-field>
            </div>

            <div class="col-md-2">
                <v-switch
                    class="my-0"
                    label="Tuition"
                    v-model="newRecord.is_tuition"
                >
                </v-switch>
            </div>
            <div class="col-md-2">
                <v-switch
                    class="my-0"
                    label="Books"
                    v-model="newRecord.is_books"
                >
                </v-switch>
            </div>
            <div class="col-md-2">
                <v-switch
                    class="my-0"
                    label="Living expenses"
                    v-model="newRecord.is_living_expenses"
                >
                </v-switch>
            </div>
            <div class="col-md-2">
                <v-switch
                    class="my-0"
                    label="Transportation"
                    v-model="newRecord.is_transportation"
                >
                </v-switch>
            </div>

            <div class="col-md-4">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Other purposes"
                    v-model="newRecord.other_purpose"
                ></v-text-field>
            </div>

            <div class="col-md-12 mt-n5">
                <v-textarea
                    outlined 
                    rows="4"
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Comment"
                    v-model="newRecord.agency_comment"
                >
                </v-textarea>
            </div>   

        </v-card>

        <v-btn
            color="primary"
            @click="setClose"
            v-if="!showAdd"
        >
            Add Agency
        </v-btn>
        <v-btn
            v-else
            color="primary"
            @click="setClose"
        >
            Cancel
        </v-btn>

        <confirm-dialog ref="confirm"></confirm-dialog>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import store from '@/store';
import axios from 'axios';
import { APPLICATION_URL } from '@/urls';
import validator from "@/validator";

export default {
    components: {

    },
    computed: {
        ...mapGetters(["agencies"]),
        application: function () {
            return store.getters.selectedApplication;
        },
    },
    data: () => ({
        showAdd: false,
        newRecord: {
            agency_id: null,
            amount: 0,
            is_tuition: false,
            is_living_expenses: false,
            is_books: false,
            is_transportation: false,
            other_purpose: null,
            agency_comment: null,
        },
        validate: {}
    }),
    async created() {
        this.validate = validator;
        store.dispatch("setAgencies");
    },
    watch: {

    },
    methods: {
        setClose() {
            this.newRecord = {
                agency_id: null,
                amount: 0,
                is_tuition: false,
                is_living_expenses: false,
                is_books: false,
                is_transportation: false,
                other_purpose: null,
                agency_comment: null,
            };
            this.showAdd = !this.showAdd;
        },
        async deleteRecord(recordId) {
            try {
                const resDelete = await axios.delete(`${APPLICATION_URL}/${recordId}/agency-assistance`);

                const message = resDelete?.data?.messages[0];

                if (message?.variant === "success") {
                    this.$emit("showSuccess", message.text);
                } else {
                    this.$emit("showError", message.text);
                }

            } catch (error) {
                console.log(error);
                this.$emit("showError", "Error to delete");
            } finally {
                store.dispatch("loadApplication", this.application.id);
            }
        },
        removeRecord(index) {
            this.$refs.confirm.show(
                "Are you sure?",
                "Click 'Confirm' below to permanently remove this dependent.",
                () => {
                this.deleteRecord(index);
                },
                () => {}
            );
        },
        async updateRecord(data, recordId) {
            try {
                const resUpdate = await axios.patch(`${APPLICATION_URL}/${this.application.id}/agency-assistance/${recordId}`, { data });

                const message = resUpdate?.data?.messages[0];

                if (message?.variant === "success")  {
                    this.$emit("showSuccess", message.text);
                } else {
                    this.$emit("showError", message.text);
                }

            } catch (error) {
                console.log(error);
                this.$emit("showError", "Error to Insert");
            } finally {
                store.dispatch("loadApplication", this.application.id);
            }
        },
        async insertRecord() {
            try {
                const resInsert = await axios.post(`${APPLICATION_URL}/${this.application.id}/agency-assistance`, {
                    data: { ...this.newRecord },
                });

                const message = resInsert?.data?.messages[0];

                if (message?.variant === "success")  {
                    this.$emit("showSuccess", message.text);
                    this.setClose();
                } else {
                    this.$emit("showError", message.text);
                }

            } catch (error) {
                console.log(error);
                this.$emit("showError", "Error to Insert");
            } finally {
                store.dispatch("loadApplication", this.application.id);
            }
        },
    },
    props: {
        index: Number,
    }
};
</script>