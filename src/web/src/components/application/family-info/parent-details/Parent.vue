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
                    :items="cities"
                    item-text="description"
                    item-value="id"
                    label="Relationship"
                >
                </v-autocomplete>
            </div>

            <div class="col-md-4">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Email"
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
                    :items="cities"
                    item-text="description"
                    item-value="id"
                    label="Citizenship"
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
                >
                </v-text-field>
            </div>

        </v-card>
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

    }),
    async created() {
    },
    watch: {

    },
    methods: {

    },
    props: {
        index: Number,
    }
};
</script>