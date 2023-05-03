<template>
    <div>
        <h3 class="text-h5 font-weight-regular mb-5">Student’s Dependents</h3>
        <v-card class="default row mb-5" v-for="dependent, index in filterList" :key="index">
            <div class="col-md-6">
                <h3 class="text-h6 font-weight-regular">Dependent {{index + 1}}</h3>
            </div>
            <div class="col-md-6">
                <v-row>
                    <div class="col-md-6">
                        <v-btn :disabled="showAdd" block color="error" 
                        @click="removeRecord(dependent.d_id, dependent.de_id)"
                        class="my-0">Remove dependent</v-btn>
                    </div>
                    <div class="col-md-6">
                        <v-btn :disabled="showAdd" block color="success" class="my-0">View BCERT</v-btn>
                    </div>
                </v-row>
            </div>

            <div class="col-md-3">
                <v-text-field 
                    :disabled="showAdd"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Last Name"
                    oninput="
                        if (this.value.length > 100) this.value = this.value?.slice(0, 10);
                        const arr = this.value.split(' ');


                        for (var i = 0; i < arr.length; i++) {
                            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i]?.slice(1);

                        }

                        this.value = arr.join(' ');
                    "
                    @change="updateDependent(
                        dependent.d_id, 
                        { last_name: dependent.last_name },
                        'dependent'
                        )"
                    v-model="dependent.last_name"
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
                    label="First Name"
                    oninput="
                        if (this.value.length > 100) this.value = this.value?.slice(0, 10);
                        const arr = this.value.split(' ');


                        for (var i = 0; i < arr.length; i++) {
                            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i]?.slice(1);

                        }

                        this.value = arr.join(' ');
                    " 
                    @change="updateDependent(
                        dependent.d_id, 
                        { first_name: dependent.first_name },
                        'dependent'
                        )"
                    v-model="dependent.first_name"
                >
                </v-text-field>
            </div>
            <div class="col-md-2">
                <v-menu 
                    :disabled="showAdd"
                    v-model="dependent.show_menu"
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
                            :value="dependent.birth_date?.slice(0, 10)"
                            outlined dense background-color="white" 
                            v-bind="attrs" v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        :value="dependent.birth_date?.slice(0, 10)"
                        @input="e => {
                            dependent.birth_date = e;
                            dependent.show_menu = false;
                        }"
                        @change="updateDependent(
                            dependent.d_id, 
                            { birth_date: dependent.birth_date },
                            'dependent'
                            )"
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
                    :value="moment().diff(dependent.birth_date, 'years') || 0"
                    hide-details 
                    label="Age"
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
                    @change="updateDependent(
                            dependent.d_id, 
                            { relationship_id: dependent.relationship_id },
                            'dependent'
                        )"
                    v-model="dependent.relationship_id"
                    :items="relationships"
                    item-text="description"
                    item-value="id"
                >
                </v-autocomplete>
            </div>

            <div class="col-md-4">
                <v-switch
                    :disabled="showAdd"
                    class="my-n5"
                    label="Resides with"
                    v-model="dependent.resides_with_student"
                    @change="updateDependent(
                            dependent.de_id, 
                            { resides_with_student: dependent.resides_with_student },
                            'd_eligibility'
                        )"
                >
                </v-switch>
            </div>
            <div class="col-md-4">
                <v-switch
                    :disabled="showAdd"
                    class="my-n5"
                    label="Shared Custody"
                    v-model="dependent.is_shares_custody"
                    @change="updateDependent(
                            dependent.de_id, 
                            { is_shares_custody: dependent.is_shares_custody },
                            'd_eligibility'
                        )"
                >
                </v-switch>
            </div>
            <div class="col-md-4">
                <v-switch
                    :disabled="showAdd"
                    class="my-n5"
                    label="In Post-Secondary"
                    v-model="dependent.is_post_secondary"
                    @change="updateDependent(
                            dependent.de_id, 
                            { is_post_secondary: dependent.is_post_secondary },
                            'd_eligibility'
                        )"
                >
                </v-switch>
            </div>

            <div class="col-md-4">
                <v-switch
                    :disabled="showAdd"
                    class="my-n5"
                    label="STA Eligible"
                    
                >
                </v-switch>
            </div>
            <div class="col-md-4">
                <v-switch
                    :disabled="showAdd"
                    class="my-n5"
                    label="CSG Eligible"
                    v-model="dependent.is_csg_eligible"
                    @change="updateDependent(
                            dependent.de_id, 
                            { is_csg_eligible: dependent.is_csg_eligible },
                            'd_eligibility'
                        )"
                >
                </v-switch>
            </div>
            <div class="col-md-4">
                <v-switch
                    :disabled="showAdd"
                    class="my-n5"
                    label="CSL Eligible"
                    v-model="dependent.is_csl_eligible"
                    @change="updateDependent(
                            dependent.de_id, 
                            { is_csl_eligible: dependent.is_csl_eligible },
                            'd_eligibility'
                        )"
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
                    @change="updateDependent(
                            dependent.d_id, 
                            { comments: dependent.comments },
                            'dependent'
                        )"
                >
                </v-textarea>
            </div>   

        </v-card>

        <v-card class="default row mb-5" v-if="showAdd">
            <div class="col-md-6">
                <h3 class="text-h6 font-weight-regular">Add Dependent</h3>
            </div>
            <div class="col-md-6">
                <v-row>
                    <div class="col-md-6">
                        <v-btn @click="setClose" block color="error" class="my-0">CANCEL</v-btn>
                    </div>
                    <div class="col-md-6">
                        <v-btn block color="success" class="my-0" @click="insertDependent">ADD</v-btn>
                    </div>
                </v-row>
            </div>

            <div class="col-md-3">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Last Name"
                    v-model="dependentData.last_name"
                >
                </v-text-field>
            </div>
            <div class="col-md-3">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="First Name"
                    v-model="dependentData.first_name"
                >
                </v-text-field>
            </div>
            <div class="col-md-2">
                <v-menu
                    v-model="show_menu_add"
                    :close-on-content-click="false" 
                    transition="scale-transition" 
                    left
                    nudge-top="26" offset-y min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field 
                            label="Birth date" 
                            append-icon="mdi-calendar"
                            v-model="dependentData.birth_date"
                            readonly
                            outlined dense background-color="white" 
                            v-bind="attrs" v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        :value="dependentData.birth_date"
                        @input="e => {
                            dependentData.birth_date = e;
                            show_menu_add = false;
                        }"
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
                    :value="moment().diff(dependentData.birth_date, 'years') || 0"
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
                    v-model="dependentData.relationship_id"
                    :items="relationships"
                    item-text="description"
                    item-value="id"
                >
                </v-autocomplete>
            </div>

            <div class="col-md-4">
                <v-switch
                    class="my-n5"
                    label="Resides with"
                    v-model="dEligibilityData.resides_with_student"
                >
                </v-switch>
            </div>
            <div class="col-md-4">
                <v-switch
                    class="my-n5"
                    label="Shared Custody"
                    v-model="dEligibilityData.is_shares_custody"
                >
                </v-switch>
            </div>
            <div class="col-md-4">
                <v-switch
                    class="my-n5"
                    label="In Post-Secondary"
                    v-model="dEligibilityData.is_post_secondary"
                >
                </v-switch>
            </div>

            <div class="col-md-4">
                <v-switch
                    class="my-n5"
                    label="STA Eligible"
                >
                </v-switch>
            </div>
            <div class="col-md-4">
                <v-switch
                    
                    class="my-n5"
                    label="CSG Eligible"
                    v-model="dEligibilityData.is_csg_eligible"
                >
                </v-switch>
            </div>
            <div class="col-md-4">
                <v-switch
                    class="my-n5"
                    label="CSL Eligible"
                    v-model="dEligibilityData.is_csl_eligible"
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
                    v-model="dependentData.comments"
                >
                </v-textarea>
            </div>   

        </v-card>

        <v-btn
            color="primary"
            @click="setClose"
            v-if="!showAdd"
        >
            ADD DEPENDENT
        </v-btn>
        <v-btn
            v-else
            color="primary"
            @click="setClose"
        >
            CANCEL
        </v-btn>
        <confirm-dialog ref="confirm"></confirm-dialog>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import store from '@/store';
import axios from 'axios';
import { APPLICATION_URL, STUDENT_URL } from "@/urls";
import moment from 'moment';

export default {
    components: {

    },
    computed: {
        ...mapGetters(["relationships"]),
        application: function () {
            return store.getters.selectedApplication;
        },
        student: function () {
            return store.getters.selectedStudent;
        },
        filterList() {
            return this.student?.dependent_info?.filter(d => d.application_id === this.application?.id) || [];
        }
    },
    data: () => ({
        showAdd: false,
        moment: {},
        show_menu_add: false,
        dependentData: {
            birth_date: null,
            comments: null,
            first_name: null,
            last_name: null,
            relationship_id: null,
        },
        dEligibilityData: {
            is_csg_eligible: false,
            is_csl_eligible: false,
            is_post_secondary: false,
            is_shares_custody: false,
            resides_with_student: false,
        },
    }),
    async created() {
        this.moment = moment;
        store.dispatch("setRelationships");
    },
    watch: {

    },
    methods: {
        setClose() {
            this.dependentData = {
                birth_date: null,
                comments: null,
                first_name: null,
                last_name: null,
                relationship_id: null,
            };
            this.dEligibilityData = {
                is_csg_eligible: false,
                is_csl_eligible: false,
                is_post_secondary: false,
                is_shares_custody: false,
                resides_with_student: false,
            };
            this.showAdd = !this.showAdd;
        },
        doSaveDependent(field, value, type, extraId = null, isInsertion = false) {
            if (isInsertion) {
                const validate = { ...value };
            }

            const url = type === "dependentInfo" ? "/dependent" : "";

            store.dispatch(
                "updateStudent",
                [field, value, type, extraId, this, null, url, isInsertion],
            );

        },
        async updateDependent(id, data, type) {
            try {
                const resUpdate = await axios.put(
                    `${STUDENT_URL}/${this.student.id}/${this.application.id}/dependent/${id}`,
                    { data, type }
                    );
                
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
                store.dispatch("loadStudent", this.student.id);
            }
        },
        async insertDependent() {
            try {
                const resInsert = await axios.post(
                    `${STUDENT_URL}/${this.student.id}/${this.application.id}/dependent`,
                    { 
                        dependentData: this.dependentData, 
                        dEligibilityData: this.dEligibilityData 
                    }
                );
                
                const message = resInsert?.data?.messages[0];

                if (message?.variant === "success") {
                    this.$emit("showSuccess", message.text);
                    this.setClose();
                } else {
                    this.$emit("showError", message.text);
                }

            } catch (error) {
                console.log(error);
                this.$emit("showError", "Error to insert");
                
            } finally {
                store.dispatch("loadStudent", this.student.id);
            }
        },
        async deleteRecord(dependentId, dEligibilityId) {
            try {
                const resDelete = await axios.delete(`${STUDENT_URL}/${dEligibilityId}/${dependentId}/dependent`);

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
                store.dispatch("loadStudent", this.student.id);
            }
        },
        removeRecord(dependentId, dEligibilityId) {
        this.$refs.confirm.show(
            "Are you sure?",
            "Click 'Confirm' below to permanently remove this dependent.",
            () => {
            this.deleteRecord(dependentId, dEligibilityId);
            },
            () => {}
        );
        },
    },
    props: {
        index: Number,
    }
};
</script>