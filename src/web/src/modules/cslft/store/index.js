import axios from "axios";
import { CSLFT_ASSESS_INFO } from "@/urls";
import moment from "moment";

const state = {
    funding_request: {},
    cslft: {
        id: null,
        air_travel_disbursement_period: null,
        airfare_amount: null,
        allowed_books: null,
        allowed_months: null,
        allowed_percent: null,
        allowed_tuition: null,
        assessed_amount: null,
        assessed_date: null,
        assessment_adj_amount: null,
        assessment_type_id: null,
        asset_tax_rate: null,
        books_supplies_cost: null,
        change_reason_comment: null,
        classes_end_date: null,
        classes_start_date: null,
        csl_assessed_need: null,
        csl_classification: null,
        csl_full_amt_flag: null,
        csl_non_reason_id: null,
        csl_over_reason_id: null,
        csl_request_amount: null,
        day_care_actual: null,
        day_care_allowable: null,
        depend_food_allowable: null,
        depend_tran_allowable: null,
        dependent_count: null,
        destination_city_id: null,
        disbursements_required: null,
        discretionary_cost: null,
        discretionary_cost_actual: null,
        effective_rate_date: null,
        entitlement_days: null,
        family_size: null,
        funding_request_id: null,
        home_city_id: null,
        living_costs: null,
        marital_status_id: null,
        married_assets: null,
        married_pstudy: null,
        married_study: null,
        new_calc: null,
        over_award: null,
        over_award_applied_flg: null,
        over_award_disbursement_period: null,
        p_trans_month: null,
        parent1_income: null,
        parent1_tax_paid: null,
        parent2_income: null,
        parent2_tax_paid: null,
        parent_contribution_override: null,
        parent_contribution_review: null,
        parent_province: null,
        parent_ps_depend_count: null,
        period: null,
        pre_leg_amount: null,
        prestudy_accom_code: null,
        prestudy_bus_flag: null,
        prestudy_csl_classification: null,
        prestudy_distance: null,
        prestudy_living_w_spouse_flag: null,
        prestudy_province_id: null,
        program_id: null,
        pstudy_day_care_actual: null,
        pstudy_day_care_allow: null,
        pstudy_depend_food_allow: null,
        pstudy_depend_tran_allow: null,
        pstudy_end_date: null,
        pstudy_expected_contrib: null,
        pstudy_p_trans_month: null,
        pstudy_shelter_month: null,
        pstudy_start_date: null,
        pstudy_x_trans_total: null,
        r_trans_16wk: null,
        relocation_total: null,
        return_uncashable_cert: null,
        second_residence_rate: null,
        shelter_month: null,
        spouse_contrib_exempt: null,
        spouse_contribution: null,
        spouse_contribution_override: null,
        spouse_contribution_review: null,
        spouse_expected_contribution: null,
        spouse_expected_income: null,
        spouse_gross_income: null,
        spouse_ln150_income: null,
        spouse_previous_contribution: null,
        spouse_province_id: null,
        spouse_pstudy_gross: null,
        spouse_pstudy_tax_rate: null,
        spouse_tax_rate: null,
        stud_pstudy_gross: null,
        stud_pstudy_tax_rate: null,
        student_contrib_exempt: null,
        student_contribution: null,
        student_contribution_override: null,
        student_contribution_review: null,
        student_expected_contribution: null,
        student_family_size: null,
        student_gross_income: null,
        student_ln150_income: null,
        student_previous_contribution: null,
        student_tax_rate: null,
        study_accom_code: null,
        study_area_id: null,
        study_bus_flag: null,
        study_distance: null,
        study_living_w_spouse_flag: null,
        study_months: null,
        study_province_id: null,
        study_weeks: null,
        total_grant_awarded: null,
        travel_allowance: null,
        tuition_estimate: null,
        uncapped_costs_total: null,
        uncapped_pstudy_total: null,
        weekly_amount: null,
        weeks_allowed: null,
        x_trans_total: null,
        years_funded_equivalent: null,
        combined_contribution: null,
        parent_msol: null,
        parent_discretionary_income: null,
        parent_weekly_contrib: null,
    }
};
const mutations = {
    getCslftAssessInfo(state, cslft) {
        state.cslft = cslft;
    },
    loadFundingRequest(state, funding_request) {
        state.funding_request = funding_request;
    },
    setCslftClassesStartDate(state, value) {
        state.cslft.classes_start_date = moment(value).format();
    },
    setCslftClassesEndDate(state, value) {
        state.cslft.classes_end_date = moment(value).format();
    },
    setCslftAssessDate(state, value) {
        state.cslft.assessed_date = moment(value).format();
    },
    setCslftPrestudyStartDate(state, value) {
        state.cslft.pstudy_start_date = moment(value).format();
    },
    setCslftPrestudyEndDate(state, value) {
        state.cslft.pstudy_end_date = moment(value).format();
    },
};
const actions = {
    async loadFundingRequest(state, funding_request) {
        if (funding_request) {
            state.commit("loadFundingRequest", funding_request);
        }
    },
    async getCslftAssessInfo(state, funding_request_id) {
        const res = await axios.get(`${CSLFT_ASSESS_INFO}/${funding_request_id}`);
        console.log(res);
        if (res?.data?.success) {                        
            state.commit("getCslftAssessInfo", res.data.data);
        }
    },
    async setClsftFieldDate(state, name, value) {
        if (value) {
            switch (name) {
                case "classes_start_date":
                    state.commit("setCslftClassesStartDate", value);
                    break;
                case "classes_end_date":
                    state.commit("setCslftClassesEndDate", value);
                    break;
                case "assess_date":
                    state.commit("setCslftAssessDate", value);
                    break;
                case "pstudy_start_date":
                    state.commit("setCslftPrestudyStartDate", value);
                    break;
                case "pstudy_end_date":
                    state.commit("setCslftPrestudyEndDate", value);
                    break;
            }
        }
    }
};
const getters = {
    cslft_classes_start_date_formatted (state) {
        if (state.cslft.classes_start_date) {
            return moment(state.cslft.classes_start_date).format("YYYY-MM-DD");
        }
        return state.cslft.classes_start_date;
    },
    cslft_classes_end_date_formatted (state) {
        if (state.cslft.classes_end_date) {
            return moment(state.cslft.classes_end_date).format("YYYY-MM-DD");
        }
        return state.cslft.classes_end_date;
    },
    cslft_assess_date_formatted(state) {
        if (state.cslft.assessed_date) {
            return moment(state.cslft.assessed_date).format('YYYY-MM-DD');
        }
        return state.cslft.assessed_date;
    },
    cslft_pstudy_start_date_formatted(state) {
        if (state.cslft.pstudy_start_date) {
            return moment(state.cslft.pstudy_start_date).format('YYYY-MM-DD');
        }
        return state.cslft.pstudy_start_date;
    },
    cslft_pstudy_end_date_formatted(state) {
        if (state.cslft.pstudy_end_date) {
            return moment(state.cslft.pstudy_end_date).format('YYYY-MM-DD');
        }
        return state.cslft.pstudy_end_date;
    },
    cslft_get_r_trans_multiplier(state) {
        let multiplier = 0;
        if (state.cslft.study_weeks >= 1 && state.cslft.study_weeks < 24) {
            multiplier = 1;
        }
        else if (state.cslft.study_weeks >= 24) {
            multiplier = 2;
        }

        return multiplier;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}