<template>
    <div>
        <h3 class="text-h5 font-weight-regular my-5">Other Funding</h3>
        <v-card class="default row mb-5" v-for="index in 2" :key="index">
            <div class="col-md-6">
                <h3 class="text-h6 font-weight-regular">Agency {{index}}</h3>
            </div>
            <v-spacer></v-spacer>
            <div class="col-md-6">
                <v-btn
                    :disabled="showAdd"
                    color="warning" 
                    x-small
                    fab 
                    class="my-0 float-right"
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
                    label="Amount"
                >
                </v-text-field>
            </div>

            <div class="col-md-2">
                <v-switch
                    :disabled="showAdd"
                    class="my-0"
                    label="Tuition"
                >
                </v-switch>
            </div>
            <div class="col-md-2">
                <v-switch
                    :disabled="showAdd"
                    class="my-0"
                    label="Books"
                >
                </v-switch>
            </div>
            <div class="col-md-2">
                <v-switch
                    :disabled="showAdd"
                    class="my-0"
                    label="Living expenses"
                >
                </v-switch>
            </div>
            <div class="col-md-2">
                <v-switch
                    :disabled="showAdd"
                    class="my-0"
                    label="Transportation"
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
                >
                </v-text-field>
            </div>

            <div class="col-md-2">
                <v-switch
                    class="my-0"
                    label="Tuition"
                >
                </v-switch>
            </div>
            <div class="col-md-2">
                <v-switch
                    class="my-0"
                    label="Books"
                >
                </v-switch>
            </div>
            <div class="col-md-2">
                <v-switch
                    class="my-0"
                    label="Living expenses"
                >
                </v-switch>
            </div>
            <div class="col-md-2">
                <v-switch
                    class="my-0"
                    label="Transportation"
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
                >
                </v-textarea>
            </div>   

        </v-card>

        <v-btn
            color="primary"
            @click="setClose"
            v-if="!showAdd"
        >
            ADD AGENCY
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