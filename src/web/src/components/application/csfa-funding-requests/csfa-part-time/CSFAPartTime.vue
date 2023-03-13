<template>
    <div>
        <!-- TITLE AND SWITCH -->
        <div class="row  mt-2">
            <v-switch
                label=""
                class="my-0 mr-2"
            >
            </v-switch>
            <h3 class="text-h6 font-weight-regular">Student Applied for CSFA Part-Time Studies</h3>
        </div>
        <!--  -->
        
        <v-card class="default row mb-5">

            <div class="col-md-6">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Last CSFA Province"
                >
                </v-autocomplete>
            </div>
            <div class="col-md-6">
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
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-6">
                        <v-switch 
                            class="my-0"
                            label="Full amount requested"
                        >
                        </v-switch>
                    </div>
                    <div class="col-md-6">
                        <v-text-field 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Requested Amount"
                        >
                        </v-text-field>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Student gross income (Ln 15000)"
                    disabled
                    value="$0.00"
                >
                </v-text-field>
            </div>
            <div class="col-md-6">
                <v-switch 
                    class="my-0"
                    label="Applied for Canada Student Grant Only"
                >
                </v-switch>
            </div>
            <div class="col-md-6">
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Overaward from previous application"
                    disabled
                    value="<$325.00>"
                >
                </v-text-field>
            </div>
            <div class="col-md-6">
                <v-switch 
                    class="my-0"
                    label="This is a part of a Full-time program"
                >
                </v-switch>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-4">
                        <v-text-field 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Overaward from previous application"
                            value="40"
                        >
                        </v-text-field>
                    </div>
                    <div class="col-md-4">
                        <v-text-field 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Overaward from previous application"
                            disabled
                            value="16"
                        >
                        </v-text-field>
                    </div>
                    <div class="col-md-4">
                        <v-text-field 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Overaward from previous application"
                            value="3"
                        >
                        </v-text-field>
                    </div>
                </div>
            </div>

            <!-- QUESTIONS -->
            <div class="col-md-2">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :items="itemOptions"
                    :value="1"
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
                    :items="itemOptions"
                    :value="1"
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
                    :items="itemOptions"
                    :value="1"
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
                    :items="itemOptions"
                    :value="1"
                >
                </v-autocomplete>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student is attending in eligible program at a designated post-secondary institution</h3>
            </div>
            <!--  -->

            <!-- COMMENT -->
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
            <!--  -->

        </v-card>
        <v-card class="default row mb-5">
            <div class="col-md-12 mb-n5">
                <h3 class="text-h6 font-weight-regular">Courses</h3>
            </div>
            
            <div class="col-md-6 pr-1">
                <h3 class="text-subtitle-1 text-center font-weight-bold">Course Description</h3>
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                >
                </v-text-field>
            </div>
            <div class="col-md-2 px-1">
                <h3 class="text-subtitle-1 text-center font-weight-bold">Course Code</h3>
                <v-text-field 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                >
                </v-text-field>
            </div>
            <div class="col-md-3 px-1">
                <h3 class="text-subtitle-1 text-center font-weight-bold">Instruction Type</h3>
                <v-autocomplete
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                >
                </v-autocomplete>
            </div>
            <div class="col-md-1 mt-11 d-md-flex justify-center">
                    <v-btn
                        color="success" 
                        x-small
                        fab 
                        class="my-0"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn
                        color="error" 
                        x-small
                        fab 
                        class="my-0 ml-1"
                        @click="setClose"
                    >
                        <v-icon>mdi-minus</v-icon>
                    </v-btn>
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
        itemOptions: [{text: '', value: null}, {text: 'Yes', value: 1}, {text: 'No', value: 0}]
    }),
    async created() {
    },
    watch: {

    },
    methods: {

    },
};
</script>