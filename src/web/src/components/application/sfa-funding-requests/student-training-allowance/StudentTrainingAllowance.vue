<template>
    <div>
        <div class="row  mt-2">
            <v-switch
                label=""
                class="my-0 mr-2"
            >
            </v-switch>
            <h3 class="text-h6 font-weight-regular">Student Applied for Training Allowance</h3>
        </div>
        <v-card class="default row mb-5">
            <div class="col-md-6 mb-n2">
            </div>
            <div class="col-md-6 mb-n2">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Single Independent - 2 years in workforce"
                    disabled
                >
                </v-text-field>
            </div>

            <div class="col-md-2 my-n2">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :value="true"
                    :items="itemOptions"
                >
                </v-autocomplete>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student meets residency requirement</h3>
            </div>

            <div class="col-md-2 my-n2">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :value="true"
                    :items="itemOptions"
                >
                </v-autocomplete>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student is moving to another community to attend program</h3>
            </div>

            <div class="col-md-2">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :value="true"
                    :items="itemOptions"
                >
                </v-autocomplete>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student is maintening two residences</h3>
            </div>

            <div class="col-md-2 my-n2">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :value="true"
                    :items="itemOptions"
                >
                </v-autocomplete>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student is in Full-Time study</h3>
            </div>

            <div class="col-md-2 my-n2">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    v-model="otherFunding"
                    :items="itemOptions"
                >
                </v-autocomplete>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student will not receive funding from any other organization for the study period</h3>
            </div>

            <div class="col-md-12 mt-n2">
                <v-textarea
                    rows="3"
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Comment"
                >

                </v-textarea>
            </div>


        </v-card>

        <OtherFunding v-if="!otherFunding">
        </OtherFunding>

    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import store from '@/store';
import OtherFunding from "./OtherFunding.vue";

export default {
    components: {
        OtherFunding,
    },
    computed: {
    },
    data: () => ({
        itemOptions: [{text: "Yes", value: true}, {text: "No", value: false}],
        otherFunding: true
    }),
    async created() {
    },
    watch: {

    },
    methods: {

    },
};
</script>