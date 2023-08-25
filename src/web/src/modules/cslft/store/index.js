import axios from "axios";
import {CSL_LOOKUP, CSLFT, CSLFT_ASSESS_INFO } from "@/urls";
import moment from "moment";
import { NumbersHelper, DateHelper } from "@/utilities";
import { defaultState, defaultDisbursement } from "./default";
const numHelper = new NumbersHelper();
const dateHelper = new DateHelper();

const state = defaultState();
const mutations = {
    cslftResetState(state) {
        Object.assign(state, defaultState());
    },
    getCslftAssessInfo(state, results) {
        state.cslft_assessments = results.results;
        state.cslft_current = results.current; 
        
        const payload = results.result;
        state.cslft = payload.data;
        if ((payload.disbursements?.length ?? 0) > 0) {
            state.cslft_disbursement = payload.disbursements;
        }
        state.funding_request = payload.funding_request;        
        if (payload.msfaa)
        {
            state.cslft_msfaa = payload.msfaa;
        }
        if ((payload.e_certs?.length ?? 0) > 0) {
            state.cslft_e_certs = payload.e_certs;
        }
    },
    getAssessmentFromMemory(state, assessment_id) {        
        const payload = state.cslft_assessments[assessment_id];
        state.cslft = payload.data;
        if ((payload.disbursements?.length ?? 0) > 0) {
            state.cslft_disbursement = payload.disbursements;
        }
        else {
            state.cslft_disbursement = [];
        }
        state.funding_request = payload.funding_request;        
        if (payload.msfaa)
        {
            state.cslft_msfaa = payload.msfaa;
        }
        if ((payload.e_certs?.length ?? 0) > 0) {
            state.cslft_e_certs = payload.e_certs;
        }
    },
    loadModelsDisburse(state, disburseModel) {
        state.cslft = disburseModel.data;
        state.funding_request = disburseModel.funding_request;
        if ((disburseModel.disbursements?.length ?? 0) > 0) {
            state.cslft_disbursement = disburseModel.disbursements;
        }
        state.cslft_msfaa = disburseModel.msfaa;
    },
    setDefaultCslftDisbursement(state) {
        let disbursement = defaultDisbursement;
        disbursement.delete_flag = false;
        state.cslft_disbursement.push(disbursement);
    },
    removeCslftDisbursement(state, index) {
        state.cslft_disbursement.splice(index, 1);
    },
    loadFundingRequest(state, funding_request) {
        state.funding_request = funding_request;
    },
    loadCslLookup(state, csl_lookup) {
      state.csl_lookup = csl_lookup;
    },
    cslftLoadUncappedExpenses(state, list) {
        state.uncapped_expenses = list;
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
    },
    setCslftDisbursementItems(state, disbursement) {
        state.cslft_disbursement = disbursement;        
    },
    setPreviousDisbursement(state, value) {
        state.cslft.previous_disbursement = value;
    },
    setCslftNetAmount(state, value) {
        state.cslft.net_amount = value;
    },
    setCslftAssessedNeed(state, value) {
        state.cslft.csl_assessed_need = value;
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
        if (res?.data?.result?.success) {
            state.commit("cslftResetState", state);
            state.commit("getCslftAssessInfo", res.data);
        }
    },
    async createCslftAssessment(state, funding_request_id) {
        const res = await axios.get(`${CSLFT}/funding_request/${funding_request_id}/assessment/create`);
        if (res?.data?.result?.success) {
            state.commit("cslftResetState", state);
            state.commit("getCslftAssessInfo", res.data);
        }
    },
    async switchAssessment(state, assessment_id) {
        state.commit("getAssessmentFromMemory", assessment_id);
    },
    async cslftLoadUncappedExpenses(state, application_id) {
        const period_id = 2;
        const res = await axios.get(`${CSLFT}/application/${application_id}/expenses/uncapped/${period_id}`);
        if (res?.data?.success) {            
            state.commit("cslftLoadUncappedExpenses", res.data.data);
        }
    },
    async getCslftRecalc({ commit, getters }) {
        const assessment = getters.cslft_get_assessment;
        const disbursements = getters.cslft_get_disbursements;
        const body = {
            assessment: assessment,
            disbursements: disbursements
        };
        const res = await axios.post(`${CSLFT}/${assessment.funding_request_id}/recalc`, body);
        if (res?.data?.success) {
            commit("loadModelsDisburse", res.data);
        }
    },
    async getCslftDisburse({ commit, getters }) {
        const assessment = getters.cslft_get_assessment;
        const disbursements = getters.cslft_get_disbursements;
        const body = {
            assessment: assessment,
            disbursements: disbursements
        };
        const res = await axios.post(`${CSLFT}/${assessment.funding_request_id}/disburse`, body);
        if (res?.data?.success) {
            commit("loadModelsDisburse", res.data);
        }
    },
    async setDefaultCslftDisbursement(state) {
        state.commit("setDefaultCslftDisbursement");
    },
    async removeCslftDisbursement(state, index) {
        state.commit("removeCslftDisbursement", index);
    },
    async saveCslftAssessment({ getters, dispatch }, vm) {
        const assessment = getters.cslft_get_assessment;
        const disbursements = getters.cslft_get_disbursements;
        const funding_request = getters.cslft_get_funding_request;
        const msfaa = getters.cslft_get_msfaa;
        const body = {
            payload: {
                data: assessment,
                disbursements: disbursements,
                funding_request: funding_request,
                msfaa: msfaa
            },
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
        const res = await axios.post(`${CSLFT}/academic-year/${academic_year_id}/person/${person_id}/parentweeklycontrib`, body);
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
    },
    async setCslftDisbursementItems(state, {index, val}) {
        if (val) {
            state.commit("setCslftDisbursementItems", {index, val});
        }
    },
    async setPreviousDisbursement(state, value) {
        state.commit("setPreviousDisbursement", value);
    },
    async setCslftNetAmount(state, value) {
        state.commit("setCslftNetAmount", value);
    },
    async setCslftAssessedNeed(state, value) {        
        state.commit("setCslftAssessedNeed", value);
    }
};
const getters = {
    cslft_get_current(state) {
        return state.cslft_current;
    },
    cslft_get_assessments(state) {
        return state.cslft_assessments;
    },
    cslft_get_assessments_index(state) {
        const a = state.cslft_assessments;
        return Object.entries(a).map((x, i) => ({ id: i + 1, value: x[0]}));
    },
    cslft_get_assessments_count(state) {
        const a = state.cslft_assessments;
        return Object.entries(a).length;
    },
    cslft_get_assessment(state) {
      return state.cslft;
    },
    cslft_get_disbursements(state)
    {
        return state.cslft_disbursement;
    },
    cslft_get_funding_request(state) {
        return state.funding_request;
    },
    cslft_get_msfaa(state) {
        return state.cslft_msfaa;
    },
    cslft_get_e_certs(state) {
        return state.cslft_e_certs;
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
    cslft_disbursement_issue_date_formatted(state) {
        if (state.cslft_disbursement.issue_date) {
            return dateHelper.getDateFromUTC(state.cslft_disbursement.issue_date);
        }
        return state.cslft_disbursement.issue_date;
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
        return numHelper.round(getters.cslft_parent_total_income - getters.cslft_parent_total_tax);
    },
    cslft_parent_discretionary_income(state, getters) {
        return Math.max(numHelper.round(getters.cslft_parent_net_income - numHelper.getNum(state.cslft.parent_msol)), 0);
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
        return state.cslft.max_allowable;
    },
    cslft_calculated_award(state, getters) {
        const minVal = Math.min(getters.cslft_assess_needed_sixty_pct - numHelper.getNum(state.cslft.total_grant_awarded), getters.cslft_max_allowable);
        return Math.max(0, numHelper.round(minVal));
    },
    cslft_msfaa_date_issued_formatted(state) {
        if(state.cslft_msfaa.date_issued){
            return dateHelper.getDateFromUTC(state.cslft_msfaa.date_issued);
        }
        return null;
    },
    cslft_msfaa_received_date_formatted(state) {
        if(state.cslft_msfaa.received_date){
            return dateHelper.getDateFromUTC(state.cslft_msfaa.received_date);
        }
        return null;
    },
    cslft_msfaa_sent_date_formatted(state) {
        if(state.cslft_msfaa.sent_date){
            return dateHelper.getDateFromUTC(state.cslft_msfaa.sent_date);
        }
        return null;
    },
    cslft_msfaa_signed_date_formatted(state) {
        if(state.cslft_msfaa.signed_date){
            return dateHelper.getDateFromUTC(state.cslft_msfaa.signed_date);
        }
        return null;
    },
    cslft_msfaa_cancel_date_formatted(state) {
        if(state.cslft_msfaa.cancel_date){
            return dateHelper.getDateFromUTC(state.cslft_msfaa.cancel_date);
        }
        return null;
       
    },
    cslft_get_net_amount(state) {
        let result = numHelper.getNum(state.cslft.assessed_amount ?? 0) - numHelper.getNum(state.cslft.previous_disbursement ?? 0) + numHelper.getNum(state.cslft.return_uncashable_cert ?? 0);
        if (result >= -250 && result <= 0) {
            result = 0;
        }

        return result;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}