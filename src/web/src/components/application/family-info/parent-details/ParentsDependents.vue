<template>
    <div>
        <h3 class="text-h5 font-weight-regular my-5">Parent’s Dependents</h3>
        <v-card class="default row mb-5" v-for="dependent, index in application?.parent_dependents" :key="index">
            <div class="col-md-6">
                <h3 class="text-h6 font-weight-regular">Dependent {{index + 1}}</h3>
            </div>
            <v-spacer></v-spacer>
            <div class="col-md-6">
                <v-btn
                    :disabled="showAdd"
                    color="error" 
                    x-small
                    fab 
                    class="my-0 float-right"
                    @click="removeRecord(dependent.id)"
                >
                    <v-icon>mdi-minus</v-icon>
                </v-btn>
            </div>

            <div class="col-md-3">
                <v-text-field 
                    :disabled="showAdd"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Last name"
                    oninput="
                        if (this.value.length > 100) this.value = this.value.slice(0, 10);
                        const arr = this.value.split(' ');


                        for (var i = 0; i < arr.length; i++) {
                            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

                        }

                        this.value = arr.join(' ');
                    " 
                    v-model="dependent.last_name"
                    @change="updateValue({ last_name: dependent.last_name, id: dependent.id })"
                >
                </v-text-field>
            </div>
            <div class="col-md-3">
                <v-text-field 
                    :disabled="showAdd"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="First name"
                    oninput="
                        if (this.value.length > 100) this.value = this.value.slice(0, 10);
                        const arr = this.value.split(' ');


                        for (var i = 0; i < arr.length; i++) {
                            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

                        }

                        this.value = arr.join(' ');
                    " 
                    v-model="dependent.first_name"
                    @change="updateValue({ first_name: dependent.first_name, id: dependent.id })"
                >
                </v-text-field>
            </div>
            <div class="col-md-2">
                <v-menu 
                    :disabled="showAdd"
                    :close-on-content-click="false" 
                    transition="scale-transition" 
                    left
                    nudge-top="26" offset-y min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field 
                            :disabled="showAdd" 
                            label="Birth date" 
                            append-icon="mdi-calendar" 
                            readonly
                            outlined dense background-color="white" 
                            v-model="dependent.birth_date"
                            v-bind="attrs" v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="dependent.birth_date"
                        @change="updateValue({ birth_date: dependent.birth_date, id: dependent.id })"
                        :disabled="showAdd"
                    >
                    </v-date-picker>
                </v-menu>
            </div>
            <div class="col-md-2 d-flex">
                <h3 class="text-subtitle-1 mt-1 mr-2">Age</h3>
                <v-text-field 
                    disabled
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Age"
                    v-model="dependent.age"
                >
                </v-text-field>
            </div>
            <div class="col-md-2">
                <v-autocomplete
                    :disabled="showAdd"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Relationship"
                    v-model="dependent.relationship_id"
                    @change="updateValue({ relationship_id: dependent.relationship_id, id: dependent.id })"
                    :items="relationships"
                    item-text="description"
                    item-value="id"
                >
                </v-autocomplete>
            </div>

            <div class="col-md-3">
                <v-switch
                    :disabled="showAdd"
                    class="my-0"
                    label="Resides with"
                    v-model="dependent.is_residing"
                    @change="updateValue({ is_residing: dependent.is_residing, id: dependent.id })"
                >
                </v-switch>
            </div>
            <div class="col-md-3">
                <v-switch
                    :disabled="showAdd"
                    class="my-0"
                    label="Shared custody"
                    v-model="dependent.is_shared_custody"
                    @change="updateValue({ is_shared_custody: dependent.is_shared_custody, id: dependent.id })"
                >
                </v-switch>
            </div>
            <div class="col-md-3">
                <v-switch
                    :disabled="showAdd"
                    class="my-0"
                    label="In post-secondary"
                    v-model="dependent.is_attend_post_secondary"
                    @change="updateValue({ is_attend_post_secondary: dependent.is_attend_post_secondary, id: dependent.id })"
                >
                </v-switch>
            </div>
            <div class="col-md-3">
                <v-switch
                    :disabled="showAdd"
                    class="my-0"
                    label="Eligible dependent"
                    v-model="dependent.is_eligible"
                    @change="updateValue({ is_eligible: dependent.is_eligible, id: dependent.id })"
                >
                </v-switch>
            </div>

            <div class="col-md-12">
                <v-textarea
                    :disabled="showAdd"
                    outlined 
                    rows="1"
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Comment"
                    v-model="dependent.comments"
                    @change="updateValue({ comments: dependent.comments, id: dependent.id })"
                >
                </v-textarea>
            </div>   

        </v-card>

        <v-card class="default row mb-5" v-if="showAdd">
            <div class="col-md-6">
                <h3 class="text-h6 font-weight-regular">Add Dependent</h3>
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
                    @click="addRecord"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </div>

            <div class="col-md-3">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Last name"
                    oninput="
                        if (this.value.length > 100) this.value = this.value.slice(0, 10);
                        const arr = this.value.split(' ');


                        for (var i = 0; i < arr.length; i++) {
                            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

                        }

                        this.value = arr.join(' ');
                    " 
                    v-model="newRecord.last_name"
                    
                >
                </v-text-field>
            </div>
            <div class="col-md-3">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="First name"
                    oninput="
                        if (this.value.length > 100) this.value = this.value.slice(0, 10);
                        const arr = this.value.split(' ');


                        for (var i = 0; i < arr.length; i++) {
                            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

                        }

                        this.value = arr.join(' ');
                    " 
                    v-model="newRecord.first_name"
                >
                </v-text-field>
            </div>
            <div class="col-md-2">
                <v-menu 
                    v-model="show_menu_insert"
                    :close-on-content-click="false" 
                    transition="scale-transition" 
                    left
                    nudge-top="26" offset-y min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field 
                            label="Birth date" 
                            append-icon="mdi-calendar" 
                            readonly
                            outlined dense background-color="white" 
                            :value="newRecord.birth_date"
                            @input="e => {
                                newRecord.birth_date = e;
                                show_menu_insert = false;
                            }"
                            v-bind="attrs" v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="newRecord.birth_date"
                        @input="show_menu_insert = false"
                    >
                    </v-date-picker>
                </v-menu>
            </div>
            <div class="col-md-2 d-flex">
                <h3 class="text-subtitle-1 mt-1 mr-2">Age</h3>
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Age"
                    disabled
                    :value="moment().diff(newRecord.birth_date, 'years') || 0"
                >
                </v-text-field>
            </div>
            <div class="col-md-2">
                <v-autocomplete
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Relationship"
                    v-model="newRecord.relationship_id"
                    :items="relationships"
                    item-text="description"
                    item-value="id"
                >
                </v-autocomplete>
            </div>

            <div class="col-md-3">
                <v-switch
                    class="my-0"
                    label="Resides with"
                    v-model="newRecord.is_residing"
                >
                </v-switch>
            </div>
            <div class="col-md-3">
                <v-switch
                    class="my-0"
                    label="Shared custody"
                    v-model="newRecord.is_shared_custody"
                >
                </v-switch>
            </div>
            <div class="col-md-3">
                <v-switch
                    class="my-0"
                    label="In post-secondary"
                    v-model="newRecord.is_attend_post_secondary"
                >
                </v-switch>
            </div>
            <div class="col-md-3">
                <v-switch
                    class="my-0"
                    label="Eligible dependent"
                    v-model="newRecord.is_eligible"
                >
                </v-switch>
            </div>

            <div class="col-md-12">
                <v-textarea
                    outlined 
                    rows="1"
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Comment"
                    v-model="newRecord.comments"
                >
                </v-textarea>
            </div>   

        </v-card>

        <v-btn
            color="primary"
            @click="setClose"
            v-if="!showAdd"
        >
            Add parent’s dependent
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
import moment from 'moment';
import { APPLICATION_URL } from '@/urls';

export default {
    components: {

    },
    computed: {
        ...mapGetters(["relationships"]),
        application: function () {
            return store.getters.selectedApplication;
        },
        application_id() {
            return this.application?.id;
        }
    },
    data: () => ({
        showAdd: false,
        show_menu: false,
        show_menu_insert: false,
        moment: null,
        newRecord: {
            last_name: null,
            first_name: null,
            birth_date: null,
            relationship_id: null,
            is_residing: false,
            is_shared_custody: false,
            is_attend_post_secondary: false,
            is_eligible: false,
            comments: null,
        },
    }),
    async created() {
        store.dispatch("setRelationships");
        this.moment = moment;

    },
    watch: {

    },
    methods: {
        setClose() {

            this.newRecord = {
                last_name: null,
                first_name: null,
                birth_date: null,
                relationship_id: null,
                is_residing: false,
                is_shared_custody: false,
                is_attend_post_secondary: false,
                is_eligible: false,
                comments: null,
            };

            this.showAdd = !this.showAdd;
        },
        async deleteRecord(id_record) {
            try {
                const resDelete = await axios.delete(`${APPLICATION_URL}/${id_record}/parent-dependent`);

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
                store.dispatch("loadApplication", this.application_id);
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
        async updateValue(values) {
            try {
                let id = values.id;
                delete values.id;

                const resUpdate = await axios.put(`${APPLICATION_URL}/${this.application_id}/parent-dependent/${id}`, {
                    data: { ...values },
                });

                const message = resUpdate?.data?.messages[0];

                if (message?.variant === "success") {
                    this.$emit("showSuccess", message.text);
                } else {
                    this.$emit("showError", message.text);
                }

            } catch (error) {
                console.log(error);
                this.$emit("showError", "Error to update");
            } finally {
                store.dispatch("loadApplication", this.application_id);
            }
        },
        async addRecord() {
            try {
                const resInsert = await axios.post(`${APPLICATION_URL}/${this.application_id}/parent-dependent`, {
                    data: { ...this.newRecord, age: moment().diff(this.newRecord.birth_date, 'years') || 0 },
                });

                const message = resInsert?.data?.messages[0];

                if (message?.variant === "success") {
                    this.$emit("showSuccess", message.text);
                    this.setClose();
                } else {
                    this.$emit("showError", message.text);
                }

            } catch (error) {
                console.log(error);
                this.$emit("showError", "Error to Insert");
            } finally {
                store.dispatch("loadApplication", this.application_id);
            }
        },
    },
    props: {
        index: Number,
    }
};
</script>