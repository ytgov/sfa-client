<template>
    <div>
        <h3 class="text-h5 font-weight-regular mb-5">Student’s Dependents</h3>
        <v-card class="default row mb-5" v-for="dependent, index in application.parent_dependents" :key="index">
            <div class="col-md-6">
                <h3 class="text-h6 font-weight-regular">Dependent {{index + 1}}</h3>
            </div>
            <div class="col-md-6">
                <v-row>
                    <div class="col-md-6">
                        <v-btn :disabled="showAdd" block color="error" class="my-0">REMOVE DEPENDENT</v-btn>
                    </div>
                    <div class="col-md-6">
                        <v-btn :disabled="showAdd" block color="success" class="my-0">VIEW BCERT</v-btn>
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
                        if (this.value.length > 100) this.value = this.value.slice(0, 10);
                        const arr = this.value.split(' ');


                        for (var i = 0; i < arr.length; i++) {
                            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

                        }

                        this.value = arr.join(' ');
                    " 
                    @change="doSaveDependent('last_name', dependent.last_name, 'dependentInfo', dependent.id)"
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
                        if (this.value.length > 100) this.value = this.value.slice(0, 10);
                        const arr = this.value.split(' ');


                        for (var i = 0; i < arr.length; i++) {
                            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

                        }

                        this.value = arr.join(' ');
                    " 
                    @change="doSaveDependent('first_name', dependent.first_name, 'dependentInfo', dependent.id)"
                    v-model="dependent.first_name"
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
                            v-model="dependent.birth_date"
                            outlined dense background-color="white" 
                            v-bind="attrs" v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
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
                    v-model="dependent.age"
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
                    v-model="dependent.is_residing"
                >
                </v-switch>
            </div>
            <div class="col-md-4">
                <v-switch
                    :disabled="showAdd"
                    class="my-n5"
                    label="Shared Custody"
                    v-model="dependent.is_shared_custody"
                >
                </v-switch>
            </div>
            <div class="col-md-4">
                <v-switch
                    :disabled="showAdd"
                    class="my-n5"
                    label="In Post-Secondary"
                    v-model="dependent.is_attend_post_secondary"
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
                    label="CSG Eligible "
                >
                </v-switch>
            </div>
            <div class="col-md-4">
                <v-switch
                    :disabled="showAdd"
                    class="my-n5"
                    label="CSL Eligible"
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
                        <v-btn block color="success" class="my-0">ADD</v-btn>
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
                >
                </v-text-field>
            </div>
            <div class="col-md-2">
                <v-menu 
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
                            v-bind="attrs" v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
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
                >
                </v-autocomplete>
            </div>

            <div class="col-md-4">
                <v-switch
                    class="my-n5"
                    label="Resides with"
                >
                </v-switch>
            </div>
            <div class="col-md-4">
                <v-switch
                    class="my-n5"
                    label="Shared Custody"
                >
                </v-switch>
            </div>
            <div class="col-md-4">
                <v-switch
                    class="my-n5"
                    label="In Post-Secondary"
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
                    label="CSG Eligible "
                >
                </v-switch>
            </div>
            <div class="col-md-4">
                <v-switch
                    class="my-n5"
                    label="CSL Eligible"
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
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import store from '@/store';

export default {
    components: {

    },
    computed: {
        ...mapGetters(["relationships"]),
        application: function () {
            return store.getters.selectedApplication;
        },
    },
    data: () => ({
        showAdd: false,
    }),
    async created() {
        store.dispatch("setRelationships");
    },
    watch: {

    },
    methods: {
        setClose() {
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
    },
    props: {
        index: Number,
    }
};
</script>