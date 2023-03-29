<template>
    <div>
        <v-card class="default row mb-8">
            <div class="col-md-6">
                <h3 class="text-h6 font-weight-regular">Parent {{ index }}</h3>
            </div>
            <v-spacer></v-spacer>
            <div class="col-md-3">
                <v-btn block color="success" class="my-0">VIEW PARENT {{ index }} NOA</v-btn>
            </div>

            <div class="col-md-4">
                <v-text-field 
                    outlined
                    dense
                    background-color="white"
                    hide-details
                    label="First Name"
                    v-model="parent.first_name"
                    @change="update( parent.id, {first_name: parent.first_name} )"
                >
                </v-text-field>
            </div>
            <div class="col-md-5">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Last Name"
                    v-model="parent.last_name"
                    @change="update( parent.id, {last_name: parent.last_name} )"
                >
                </v-text-field>
            </div>
            <v-spacer></v-spacer>
            <div class="col-md-3">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :items="relationships"
                    item-text="description"
                    item-value="id"
                    label="Relationship"
                    v-model="parent.relationship_id"
                    @change="update( parent.id, {relationship_id: parent.relationship_id} )"
                >
                </v-autocomplete>
            </div>

            <div class="col-md-4">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Phone"
                    v-model="parent.telephone"
                    oninput="
                        console.log(this);
                        if (this.value.length > 12) {
                            this.value = this.value.slice(0, 12);
                        }
                    "
                    @keypress="validate.isNumber($event)"
                    @change="e => {
                        if (validate.telephone(parent.telephone) || 
                            !String(parent.telephone).length) {
                            return update( parent.id, {phone: parent.telephone} );
                        } else {
                            $store.dispatch('loadApplication', application.id);
                            return $emit('showError', 'Invalid Telephone');
                        }
                    }"
                >
                </v-text-field>
            </div>
            <div class="col-md-5">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Email"
                    v-model="parent.email"
                    @change="e => {
                        if (validate.email(parent.email) || 
                        !String(parent.email).length) {
                          return update( parent.id, {email: parent.email} );
                        } else {
                            $store.dispatch('loadApplication', application.id);
                            return $emit('showError', 'Invalid Email');
                        }
                    }"
                >
                </v-text-field>
            </div>
            <v-spacer></v-spacer>
            <div class="col-md-3">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :items="citizenships"
                    item-text="description"
                    item-value="id"
                    label="Citizenship"
                    v-model="parent.citizenship_id"
                    @change="update( parent.id, {citizenship_id: parent.citizenship_id} )"
                >
                </v-autocomplete>
            </div>

            <div class="col-md-3">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Income Ln 15000"
                >
                </v-text-field>
            </div>
            <div class="col-md-3">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Income Ln 23600"
                >
                </v-text-field>
            </div>
            <div class="col-md-3">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Income Ln 43500"
                >
                </v-text-field>
            </div>
            <div class="col-md-3">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="SIN"
                    @keypress="validate.isNumber($event)"
                    v-model="parent.sin"
                    @change="e => {
                        if (validate.SIN(parent.sin) || !String(parent.sin).length) {
                          return update( parent.id, {sin: parent.sin} );
                        } else {
                          $store.dispatch('loadApplication', application.id);
                          return $emit('showError', 'Invalid SIN');
                        }
                      }"
                    
                >
                </v-text-field>
            </div>

        </v-card>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import store from '@/store';
import axios from 'axios';
import { STUDENT_URL, APPLICATION_URL } from '@/urls';
import validator from "@/validator";

export default {
    components: {

    },
    computed: {
        ...mapGetters(["relationships", "citizenships"]),
        studentId: function () {
            return store.getters.selectedStudent.id;
        },
        application() {
            return store.getters.selectedApplication;
        },
        'parent.telephone': function(value, oldValue) {
        if (value?.length === 3 || value?.length === 7) {
            this.parent.telephone = this.parent.telephone+"-";
        }
        },
    },
    data: () => ({
        validate: {},
    }),
    async created() {
        store.dispatch('setRelationships');
        store.dispatch('setCitizenships');
        this.validate = { ...validator };
    },
    watch: {

    },
    methods: {
        doSaveStudent() {
            store.dispatch("updateStudent", [field, value, type, extraId, this, addressType]);
        },
        async update(personId, data) {
            try {
                if (this.parent?.id) {
                    const resUpdate = await axios.patch(
                        `${STUDENT_URL}/${personId}/person`,
                        { data }
                    );
                    
                    const message = resUpdate?.data?.messages[0];

                    if (message?.variant === "success") {
                        this.$emit("showSuccess", message.text);
                        //this.setClose();
                    } else {
                        this.$emit("showError", message.text);
                    }
                } else {
                    const resInsert = await axios.post(
                        `${APPLICATION_URL}/${this.application.id}/person`,
                        { data, typeId: `parent${this.index}_id` }
                    );
                    
                    const message = resInsert?.data?.messages[0];

                    if (message?.variant === "success") {
                        this.$emit("showSuccess", message.text);
                        //this.setClose();
                    } else {
                        this.$emit("showError", message.text);
                    }
                }

            } catch (error) {
                console.log(error);
                this.$emit("showError", "Error to insert");
                
            } finally {
                store.dispatch("loadApplication", this.application.id);
            }
        },
    },
    props: {
        index: Number,
        parent: Object,
    }
};
</script>