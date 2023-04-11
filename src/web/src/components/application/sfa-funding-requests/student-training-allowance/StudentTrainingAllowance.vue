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

            <div class="col-md-2 my-n2">
                <v-autocomplete 
                    outlined 
                    dense 
                    background-color="white" 
                    hide-details
                    :items="itemOptions"
                    :value="!!application.student_is_mov_to_anth_cmm_to_attd_prgm"
                    @input="e => {
                        application.student_is_mov_to_anth_cmm_to_attd_prgm = e;
                    }"
                    @change="doSaveApp('student_is_mov_to_anth_cmm_to_attd_prgm', application.student_is_mov_to_anth_cmm_to_attd_prgm)"
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
                    :items="itemOptions"
                    :value="!!application.student_is_maintening_two_residences"
                    @input="e => {
                        application.student_is_maintening_two_residences = e;
                    }"
                    @change="doSaveApp('student_is_maintening_two_residences', application.student_is_maintening_two_residences)"
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
                    :items="itemOptions"
                    :value="!!application.student_w_not_receive_fund_from_otr_org"
                    @input="e => {
                        application.student_w_not_receive_fund_from_otr_org = e;
                    }"
                    @change="doSaveApp('student_w_not_receive_fund_from_otr_org', application.student_w_not_receive_fund_from_otr_org)"
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
                    v-model="application.applied_sta_comment"
                    @change="doSaveApp('applied_sta_comment', application.applied_sta_comment)"
                >

                </v-textarea>
            </div>


        </v-card>

        <OtherFunding v-if="!!!application.student_w_not_receive_fund_from_otr_org">
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