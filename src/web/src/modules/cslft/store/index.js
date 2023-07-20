import axios from "axios";
import {CSL_LOOKUP, CSLFT, CSLFT_ASSESS_INFO, STUDENT_URL} from "@/urls";
import moment from "moment";
import { NumbersHelper, DateHelper } from "@/utilities";
import { defaultState } from "./default";
const numHelper = new NumbersHelper();
const dateHelper = new DateHelper();

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
        field_program_code: null,
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
        parent_province_id: null,
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
        total_study_cost: null,
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
        calculated_award: null,
    },
    csl_lookup: {
        id: null,
        academic_year_id: null,
        return_transport_max_amount: null,
        allowable_weekly_amount: null,
        student_exempt_amount: null,
        vehicle_deduction_amount: null,
        rrsp_deduction_yearly_amount: null,
        relocation_max_amount: null,
        mileage_rate: null,
        discretionary_costs_max_amount: null,
        merit_exempt_amount: null,
        books_max_amount: null,
        student_contrib_percent: null,
        spouse_contrib_percent: null,
        csg_8_month_amount: null,
        csg_pt_yearly_amount: null,
        low_income_student_contrib_amount: null,
        student_contrib_max_amount: null,
        csl_pt_max_amount: null,
        csl_pt_wk_misc_amount: null,
    },
    cslft_disbursement: {
        id: null,
        disbursement_type_id: null,
        assessment_id: null,
        funding_request_id: null,
        disbursed_amount: null,
        due_date: null,
        tax_year: null,
        issue_date: null,
        paid_amount: null,
        change_reason_id: null,
        financial_batch_id: null,
        financial_batch_id_year: null,
        financial_batch_run_date: null,
        financial_batch_serial_no: null,
        transaction_number: null,
        csl_cert_seq_number: null,
        ecert_sent_date: null,
        ecert_response_date: null,
        ecert_status: null,
        ecert_portal_status_id: null,
    }
};
const mutations = {
    getCslftAssessInfo(state, cslft) {
        state.cslft = cslft;
    },
    loadModelsDisburse(state, disburseModel) {
        state.cslft = disburseModel.data;
        state.funding_request = disburseModel.funding_request;
        state.cslft_disbursement = disburseModel.disbursements[0];
    },
    loadFundingRequest(state, funding_request) {
        state.funding_request = funding_request;
    },
    loadCslLookup(state, csl_lookup) {
      state.csl_lookup = csl_lookup;
    },
    setTotalStudyCost(state, value) {
      state.cslft.total_study_cost = value;
    },
    setCslftParentWeeklyContrib(state, value) {
        state.cslft.parent_weekly_contrib = value;
    },
    setCslftCombinedContribution(state, value) {
        state.cslft.combined_contribution = value;
    },
    setCslftCalculatedAward(state, value) {
        state.cslft.calculated_award = value;
    },
    setCslftAssessedDate(state, value) {
        state.cslft.assessed_date = moment(value).format();
    },
    setCslftClassesStartDate(state, value) {
        state.cslft.classes_start_date = moment(value).format();
    },
    setCslftClassesEndDate(state, value) {
        state.cslft.classes_end_date = moment(value).format();
    },
    setCslftPrestudyStartDate(state, value) {
        state.cslft.pstudy_start_date = moment(value).format();
    },
    setCslftPrestudyEndDate(state, value) {
        state.cslft.pstudy_end_date = moment(value).format();
    }
};
const actions = {
    async loadFundingRequest(state, funding_request) {
        if (funding_request) {
            state.commit("loadFundingRequest", funding_request);
        }
    },
    async getCslftAssessInfo(state, funding_request_id) {
        const res = await axios.get(`${CSLFT_ASSESS_INFO}/${funding_request_id}`);
        if (res?.data?.success) {
            state.commit("loadModelsDisburse", {
                data: defaultState.cslft,
                funding_request: defaultState.funding_request,
                disbursements: [defaultState.cslft_disbursement],
            });
            state.commit("getCslftAssessInfo", res.data.data);
        }
    },
    async getCslftRecalc({ commit, getters }) {
        const assessment = getters.cslft_get_assessment;
        const body = {
            assessment: assessment
        };
        const res = await axios.post(`${CSLFT}/${assessment.funding_request_id}/recalc`, body);
        if (res?.data?.success) {
            commit("getCslftAssessInfo", defaultState.cslft);
            commit("getCslftAssessInfo", res.data.data);
        }
    },
    async getCslftDisburse({ commit, getters }) {
        const assessment = getters.cslft_get_assessment;
        const body = {
            assessment: assessment
        };
        const res = await axios.post(`${CSLFT}/${assessment.funding_request_id}/disburse`, body);
        if (res?.data?.success) {
            commit("loadModelsDisburse", res.data);
        }
    },
    async saveCslftAssessment({ getters, dispatch }, vm) {
        const assessment = getters.cslft_get_assessment;
        const body = {
            assessment: assessment
        };

        let resAction = undefined;
        if (assessment.id) {
            resAction = await axios.put(
                `${CSLFT}/${assessment.id}`,
                body
            );
        }
        else {
            resAction = await axios.post(
                `${CSLFT}`,
                body
            );
        }

        const message = resAction?.data?.messages[0];

        if (message?.variant === "success") {
            vm.$emit("showSuccess", message.text);
            dispatch("getCslftAssessInfo", assessment.funding_request_id);
            if (vm?.setClose && vm.showAdd) {
                vm.setClose();
            }
            if (!vm?.filteredList) {
                vm.newRecord = {};
            }
        } else {
            vm.$emit("showError", message.text);
        }
    },
    async getCslLookup(state, academic_year_id) {
        const res = await axios.get(`${CSL_LOOKUP}/year/${academic_year_id}`);
        if (res?.data?.success) {
            state.commit("loadCslLookup", res.data.data);
        }
    },
    async setTotalStudyCost(state, value) {
        state.commit("setTotalStudyCost", value);
    },
    async setCslftParentWeeklyContrib({commit, getters}) {        
        const assessment = getters.cslft_get_assessment;
        const academic_year_id = getters.cslft_application_academic_year_id;
        const person_id = getters.cslft_student_person_id;
        const body = {
            assessment: assessment
        };
        console.log(body);
        console.log(academic_year_id);
        console.log(person_id);
        const res = await axios.post(`${CSLFT}/academic-year/${academic_year_id}/person/${person_id}/parentweeklycontrib`, body);
        console.log(res);        
        if (res?.data?.success) {
            commit("setCslftParentWeeklyContrib", res.data.data);
        }      
    },
    async setCslftCombinedContribution({commit, getters}) {        
        const assessment = getters.cslft_get_assessment;
        const body = {
            assessment: assessment
        };
        const res = await axios.post(`${CSLFT}/getcombinedcontrib`, body);
        if (res?.data?.success) {
            commit("setCslftCombinedContribution", res.data.data);
        }      
    },
    async setCslftCalculatedAward(state, value) {
        state.commit("setCslftCalculatedAward", value);
    },
    async setCslftFieldDate(state, { name, val }) {
        if (val) {
            switch (name) {
                case "assessed_date":
                    state.commit("setCslftAssessedDate", val);
                    break;
                case "classes_start_date":
                    state.commit("setCslftClassesStartDate", val);
                    break;
                case "classes_end_date":
                    state.commit("setCslftClassesEndDate", val);
                    break;
                case "pstudy_start_date":
                    state.commit("setCslftPrestudyStartDate", val);
                    break;
                case "pstudy_end_date":
                    state.commit("setCslftPrestudyEndDate", val);
                    break;
            }
        }
    }
};
const getters = {
    cslft_get_assessment(state) {
      return state.cslft;
    },
    cslft_assessed_date_formatted (state) {
        if (state.cslft.assessed_date) {
            return dateHelper.getDateFromUTC(state.cslft.assessed_date);
        }
        return state.cslft.assessed_date;
    },
    cslft_classes_start_date_formatted (state) {
        if (state.cslft.classes_start_date) {
            return dateHelper.getDateFromUTC(state.cslft.classes_start_date);
        }
        return state.cslft.classes_start_date;
    },
    cslft_classes_end_date_formatted (state) {
        if (state.cslft.classes_end_date) {
            return dateHelper.getDateFromUTC(state.cslft.classes_end_date);
        }
        return state.cslft.classes_end_date;
    },
    cslft_pstudy_start_date_formatted(state) {
        if (state.cslft.pstudy_start_date) {
            return dateHelper.getDateFromUTC(state.cslft.pstudy_start_date);
        }
        return state.cslft.pstudy_start_date;
    },
    cslft_pstudy_end_date_formatted(state) {
        if (state.cslft.pstudy_end_date) {
            return dateHelper.getDateFromUTC(state.cslft.pstudy_end_date);
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
    },
    cslft_scholastic_total(state) {
        return numHelper.round(numHelper.getNum(state.cslft.tuition_estimate) + numHelper.getNum(state.cslft.books_supplies_cost));
    },
    cslft_shelter_total(state) {
        return numHelper.round(numHelper.getNum(state.cslft.shelter_month) * numHelper.getNum(state.cslft.study_months));
    },
    cslft_p_trans_total(state) {
        return numHelper.round(numHelper.getNum(state.cslft.p_trans_month) * numHelper.getNum(state.cslft.study_months));
    },
    cslft_r_trans_total(state, getters) {
        return numHelper.round(numHelper.getNum(state.cslft.r_trans_16wk) * numHelper.getNum(getters.cslft_get_r_trans_multiplier));
    },
    cslft_day_care_total(state) {
        return numHelper.round(Math.min(numHelper.getNum(state.cslft.day_care_allowable), numHelper.getNum(state.cslft.day_care_actual)) * numHelper.getNum(state.cslft.study_months));
    },
    cslft_dependent_shelter_total(state) {
        return numHelper.round(numHelper.getNum(state.cslft.depend_food_allowable) * numHelper.getNum(state.cslft.study_months));
    },
    cslft_dependent_trans_total(state) {
        return numHelper.round(numHelper.getNum(state.cslft.depend_tran_allowable) * numHelper.getNum(state.cslft.study_months));
    },
    cslft_discretionary_total(state) {
        return numHelper.round(Math.min(numHelper.getNum(state.cslft.discretionary_cost), numHelper.getNum(state.cslft.discretionary_cost_actual)));
    },
    cslft_x_trans_total(state) {
        return numHelper.round(numHelper.getNum(state.cslft.x_trans_total));
    },
    cslft_relocation_total(state) {
        return numHelper.round(numHelper.getNum(state.cslft.relocation_total));
    },
    cslft_capped_expenses_total(state, getters) {
        return numHelper.round(getters.cslft_shelter_total + getters.cslft_p_trans_total + getters.cslft_r_trans_total + getters.cslft_day_care_total + getters.cslft_dependent_trans_total + getters.cslft_dependent_shelter_total + getters.cslft_discretionary_total + getters.cslft_x_trans_total + getters.cslft_relocation_total);
    },
    cslft_uncapped_expenses_total(state) {
        return numHelper.getNum(state.cslft.uncapped_costs_total);
    },
    cslft_study_cost_total(state, getters) {
        const sct = numHelper.round(getters.cslft_scholastic_total + getters.cslft_capped_expenses_total + getters.cslft_uncapped_expenses_total);
        return sct;
    },
    cslft_total_assets(state) {
        return numHelper.validationHelper.isNullOrEmpty(state.cslft.married_assets) ? numHelper.getNum(state.cslft.other_income) : numHelper.getNum(state.cslft.married_assets);
    },
    cslft_total_assets_combined_contribution(state, getters) {
        return getters.cslft_total_assets + numHelper.getNum(state.cslft.combined_contribution);
    },
    cslft_parent_total_income(state) {
        return numHelper.round(numHelper.getNum(state.cslft.parent1_income) + numHelper.getNum(state.cslft.parent2_income));
    },
    cslft_parent_total_tax(state) {
        return numHelper.round(numHelper.getNum(state.cslft.parent1_tax_paid) + numHelper.getNum(state.cslft.parent2_tax_paid));
    },
    cslft_parent_net_income(state, getters) {
        return numHelper.round(getters.cslft_parent_total_income + getters.cslft_parent_total_tax);
    },
    cslft_parent_discretionary_income(state, getters) {
        return numHelper.round(getters.cslft_parent_net_income - numHelper.getNum(state.cslft.parent_msol));
    },
    cslft_calculated_parental_contribution(state, getters) {
        return numHelper.getNum(state.cslft.parent_ps_depend_count) === 0 ? 0 : numHelper.round(numHelper.getNum(state.cslft.parent_weekly_contrib) * numHelper.getNum(state.cslft.study_weeks) / numHelper.getNum(state.cslft.parent_ps_depend_count));
    },
    cslft_parent_total_contribution(state, getters) {
        return numHelper.round(Math.max(numHelper.getNum(state.cslft.parent_contribution_override), numHelper.getNum(getters.cslft_calculated_parental_contribution)));
    },
    cslft_application_academic_year_id(state, getters, rootState, rootGetters) {
        return rootState.selectedApplication.academic_year_id;
    },
    cslft_student_person_id(state, getters, rootState, rootGetters) {
        return rootState.selectedStudent.person_id;
    },
    cslft_get_resources_total(state, getters) {
        const academic_year_id = getters.cslft_application_academic_year_id;
        if (academic_year_id > 2017) {
            return getters.cslft_total_assets_combined_contribution + getters.cslft_parent_total_contribution;
        }
        else {
            return Math.round(0);
        }
    },
    cslft_assess_needed(state, getters) {
        return numHelper.round(Math.max(getters.cslft_study_cost_total - getters.cslft_get_resources_total, 0));
    },
    cslft_assess_needed_sixty_pct(state, getters) {
        return numHelper.round(getters.cslft_assess_needed * 0.6);
    },
    cslft_max_allowable(state) {
        return numHelper.round(numHelper.getNum(state.csl_lookup.allowable_weekly_amount) * state.cslft.study_weeks);
    },
    cslft_calculated_award(state, getters) {
        return Math.max(0, numHelper.round(Math.min(getters.cslft_assess_needed_sixty_pct - numHelper.getNum(state.cslft.total_grant_awarded, getters.cslft_max_allowable))));
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}