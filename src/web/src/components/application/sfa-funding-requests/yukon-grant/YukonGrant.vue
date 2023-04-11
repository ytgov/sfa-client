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
                <v-select 
                    outlined
                    append-icon=""
                    dense 
                    background-color="white" 
                    hide-details
                    v-model="application.csl_classification"
                    :items="cslClassifications"
                    item-text="description"
                    item-value="id"
                    disabled
                >
                </v-select>
            </div>

            <div class="col-md-2 my-n2">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    label=""
                    :items="itemOptions"
                    :value="!!application.student_meet_hs_o_equiv_req"
                    @input="e => {
                        application.student_meet_hs_o_equiv_req = e;
                    }"
                    @change="doSaveApp('student_meet_hs_o_equiv_req', application.student_meet_hs_o_equiv_req)"
                >
                </v-autocomplete>
            </div>
            <div class="col-md-10 my-n2">
                <h3 class="text-subtitle-1 mt-1">Student meets high school requirement or equivalency</h3>
            </div>

            <div class="col-md-2 my-n2">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    label=""
                    :items="itemOptions"
                    :value="!!application.student_meet_residency_req"
                    @input="e => {
                        application.student_meet_residency_req = e;
                    }"
                    @change="doSaveApp('student_meet_residency_req', application.student_meet_residency_req)"
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
                    label=""
                    :items="itemOptions"
                    :value="!!application.student_isnt_elig_f_fund_in_another_jur"
                    @input="e => {
                        application.student_isnt_elig_f_fund_in_another_jur = e;
                    }"
                    @change="doSaveApp('student_isnt_elig_f_fund_in_another_jur', application.student_isnt_elig_f_fund_in_another_jur)"
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
                    label=""
                    :items="itemOptions"
                    :value="!!application.student_is_in_ft_study"
                    @input="e => {
                        application.student_is_in_ft_study = e;
                    }"
                    @change="doSaveApp('student_is_in_ft_study', application.student_is_in_ft_study)"
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
                    label=""
                    :items="itemOptions"
                    :value="!!application.student_is_att_in_elig_prog_des_ps_inst"
                    @input="e => {
                        application.student_is_att_in_elig_prog_des_ps_inst = e;
                    }"
                    @change="doSaveApp('student_is_att_in_elig_prog_des_ps_inst', application.student_is_att_in_elig_prog_des_ps_inst)"
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
                    label=""
                    :items="itemOptions"
                    :value="!!application.student_is_elig_for_airfare_trvl_amount"
                    @input="e => {
                        application.student_is_elig_for_airfare_trvl_amount = e;
                    }"
                    @change="doSaveApp('student_is_elig_for_airfare_trvl_amount', application.student_is_elig_for_airfare_trvl_amount)"
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
                    v-model="application.applied_yk_comment"
                    @change="doSaveApp('applied_yk_comment', application.applied_yk_comment)"
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
        ...mapGetters(["cslClassifications"]),
        student() {
            return store.getters.selectedStudent;
        },
        application: function () {
            return store.getters.selectedApplication;
        },
    },
    data: () => ({
        itemOptions: [{text: "Yes", value: true}, {text: "No", value: false}],
        otherFunding: true
    }),
    async created() {
        store.dispatch("setCslClassifications");
    },
    watch: {

    },
    methods: {
        doSaveApp(field, value) {
            store.dispatch("updateApplication", [field, value, this]);
        },
    },
};
</script>