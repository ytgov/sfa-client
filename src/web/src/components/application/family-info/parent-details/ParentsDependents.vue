<template>
    <div>
        <h3 class="text-h5 font-weight-regular my-5">Parent’s Dependents</h3>
        <v-card class="default row mb-5" v-for="index in 2" :key="index">
            <div class="col-md-6">
                <h3 class="text-h6 font-weight-regular">Dependent {{index}}</h3>
            </div>
            <v-spacer></v-spacer>
            <div class="col-md-6">
                <v-btn
                    :disabled="showAdd"
                    color="error" 
                    x-small
                    fab 
                    class="my-0 float-right"
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
                    label="Last Name"
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
                    :disabled="showAdd"
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
                    :disabled="showAdd"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Relationship"
                >
                </v-autocomplete>
            </div>

            <div class="col-md-3">
                <v-switch
                    :disabled="showAdd"
                    class="my-0"
                    label="Resides with"
                >
                </v-switch>
            </div>
            <div class="col-md-3">
                <v-switch
                    :disabled="showAdd"
                    class="my-0"
                    label="Shared Custody"
                >
                </v-switch>
            </div>
            <div class="col-md-3">
                <v-switch
                    :disabled="showAdd"
                    class="my-0"
                    label="In Post-Secondary"
                >
                </v-switch>
            </div>
            <div class="col-md-3">
                <v-switch
                    :disabled="showAdd"
                    class="my-0"
                    label="Eligible Dependent"
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

            <div class="col-md-3">
                <v-switch
                    class="my-0"
                    label="Resides with"
                >
                </v-switch>
            </div>
            <div class="col-md-3">
                <v-switch
                    class="my-0"
                    label="Shared Custody"
                >
                </v-switch>
            </div>
            <div class="col-md-3">
                <v-switch
                    class="my-0"
                    label="In Post-Secondary"
                >
                </v-switch>
            </div>
            <div class="col-md-3">
                <v-switch
                    class="my-0"
                    label="Eligible Dependent"
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
            ADD PARENT’S DEPENDENT
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
    },
    data: () => ({
        showAdd: false,
    }),
    async created() {
    },
    watch: {

    },
    methods: {
        setClose() {
            this.showAdd = !this.showAdd;
        },
    },
    props: {
        index: Number,
    }
};
</script>