<template>
    <div>
        <div class="row  mt-2">
            <v-switch
                label=""
                class="my-0 mr-2"
            >
            </v-switch>
            <h3 class="text-h6 font-weight-regular">Student Applied for YEA</h3>
        </div>
        <v-card class="default row mb-5">
            <div class="col-md-6">
                <div class="row my-n2">
                    <div class="col-md-6">
                        <h3 class="text-subtitle-1 mt-1">Left High School</h3>
                    </div> 
                    <div class="col-md-3">
                        <v-text-field 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Year"
                        >
                        </v-text-field>
                    </div>  
                    <div class="col-md-3">
                        <v-text-field 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label="Month"
                        >
                        </v-text-field>
                    </div>  
                </div>
                <div class="row my-n2">
                    <div class="col-md-6">
                        <h3 class="text-subtitle-1 mt-1">Current YEA Balance</h3>
                    </div> 
                    <div class="col-md-6">
                        <v-text-field 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label=""
                        >
                        </v-text-field>
                    </div>
                </div>
                <div class="row my-n2">
                    <div class="col-md-6">
                        <h3 class="text-subtitle-1 mt-1">YEA Requested Amount</h3>
                    </div> 
                    <div class="col-md-6">
                        <v-text-field 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label=""
                        >
                        </v-text-field>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="row my-n2">
                    <div class="col-md-6 d-md-flex justify-end">
                        <h3 class="text-subtitle-1 mt-1">YEA Expire Date</h3>
                    </div> 
                    <div class="col-md-6">
                        <v-text-field 
                            outlined 
                            dense 
                            background-color="white" 
                            hide-details 
                            label=""
                        >
                        </v-text-field>
                    </div>
                </div>

                <div class="col-md-12 my-6">
                </div>
                
                <div class="row my-n2">
                    <div class="col-md-7 d-flex justify-end"></div>
                    <div class="col-md-5 d-flex justify-end">
                        <v-btn
                            class="my-0"
                            block
                            color="success"
                        >
                            VIEW RECEIPT(S)
                        </v-btn>
                    </div>
                </div>
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

        <!-- YEA earned -->
        <v-card class="default row mb-5">
            <div class="col-md-12">
                <h3 class="text-h6 font-weight-regular">YEA earned</h3>
            </div>

            <div class="col-md-2 pr-1">
                <h3 class="text-subtitle-1 text-center font-weight-bold">First Name</h3>
                <v-text-field
                    class="my-1" 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="First Name"
                >
                </v-text-field>
                <v-text-field 
                    class="my-1" 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="First Name"
                >
                </v-text-field>
                <v-text-field 
                    class="my-1"    
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="First Name"
                >
                </v-text-field>
                <v-text-field 
                    class="my-1" 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="First Name"
                >
                </v-text-field>
            </div>
            <div class="col-md-2 px-1">
                <h3 class="text-subtitle-1 text-center font-weight-bold">Last Name</h3>
                <v-text-field
                    class="my-1" 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Last Name"
                >
                </v-text-field>
                <v-text-field 
                    class="my-1" 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Last Name"
                >
                </v-text-field>
                <v-text-field 
                    class="my-1"    
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Last Name"
                >
                </v-text-field>
                <v-text-field 
                    class="my-1" 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Last Name"
                >
                </v-text-field>
            </div>
            <div class="col-md-4 px-1">
                <h3 class="text-subtitle-1 text-center font-weight-bold">Course</h3>
                <v-text-field
                    class="my-1" 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Course"
                >
                </v-text-field>
                <v-text-field 
                    class="my-1" 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Course"
                >
                </v-text-field>
                <v-text-field 
                    class="my-1"    
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Course"
                >
                </v-text-field>
                <v-text-field 
                    class="my-1" 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Course"
                >
                </v-text-field>
            </div>
            <div class="col-md-2 px-1">
                <h3 class="text-subtitle-1 text-center font-weight-bold">Amount</h3>
                <v-text-field
                    class="my-1" 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Amount"
                >
                </v-text-field>
                <v-text-field 
                    class="my-1" 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Amount"
                >
                </v-text-field>
                <v-text-field 
                    class="my-1"    
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Amount"
                >
                </v-text-field>
                <v-text-field 
                    class="my-1" 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Amount"
                >
                </v-text-field>
            </div>
            <div class="col-md-2 pl-1">
                <h3 class="text-subtitle-1 text-center font-weight-bold">Year</h3>
                <v-text-field
                    class="my-1" 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Year"
                >
                </v-text-field>
                <v-text-field 
                    class="my-1" 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Year"
                >
                </v-text-field>
                <v-text-field 
                    class="my-1"    
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Year"
                >
                </v-text-field>
                <v-text-field 
                    class="my-1" 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details 
                    label="Year"
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
};
</script>