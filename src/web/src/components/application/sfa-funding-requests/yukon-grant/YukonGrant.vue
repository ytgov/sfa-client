<template>
    <div>
        <div class="row  mt-2">
            <v-switch
                label=""
                class="my-0 mr-2"
            >
            </v-switch>
            <h3 class="text-h6 font-weight-regular">Student Applied for Yukon Grant</h3>
        </div>
        <v-card class="default row mb-8">
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
                    label="Yes"
                >
                </v-autocomplete>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student Applied for Yukon Grant</h3>
            </div>

            <div class="col-md-2 my-n2">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    label="Yes"
                >
                </v-autocomplete>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student meets residency requirement</h3>
            </div>

            <div class="col-md-2">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    label="Yes"
                >
                </v-autocomplete>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student is not eligible for funding in another jurisdiction</h3>
            </div>

            <div class="col-md-2 my-n2">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    label="Yes"
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
                    label="Yes"
                >
                </v-autocomplete>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student is attending in eligible program at a designated post-secondary institution</h3>
            </div>

            <div class="col-md-2 my-n2">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    label="Yes"
                >
                </v-autocomplete>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student is eligible for Airfare Travel amount</h3>
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
};
</script>