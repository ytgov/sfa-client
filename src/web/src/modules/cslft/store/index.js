const state = {
    funding_request: {},
    cslft: {
        base: {
            assessed_type: null,
            assessed_date: null,
            assessed_date_menu: null,
            no_dependents: null,
            pre_study_accommodation_type: null,
            pre_study_end_date: null,
            pre_study_end_date_menu: null,
            pre_study_start_date: null,
            pre_study_start_date_menu: null,
            pre_study_classification: null,
            pre_study_mon: null,
            pre_study_wks: null,
            pre_study_province: null,
            study_accommodation_type: null,
            study_end_date: null,
            study_end_date_menu: null,
            study_start_date: null,
            study_start_date_menu: null,
            study_area: null,
            study_classification: null,
            study_months: null,
            study_program: null,
            study_province: null,
            study_weeks: null,
            spouse_province: null,
            marital_status: null,
            period: null,
            fos_code: null,
        }
    }
};
const mutations = {
    initRecord(state, cslft) {
        state.cslft = cslft;
    },
    loadFundingRequest(state, funding_request) {
        state.funding_request = funding_request;
    }
};
const actions = {
    async loadFundingRequest(state, funding_request) {
        if (funding_request) {
            state.commit("loadFundingRequest", funding_request);
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}