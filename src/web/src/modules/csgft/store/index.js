import axios from "axios";
import {CSGFT, CSGFT_NEW_INSTANCE} from "@/urls";
import moment from "moment";
import { NumbersHelper, DateHelper } from "@/utilities";
import { defaultState } from "./default";
const numHelper = new NumbersHelper();
const dateHelper = new DateHelper();

const state = defaultState();
const mutations = {
    csgftResetState(state) {
        Object.assign(state, defaultState());
    },
    getCsgftNewInstance(state, payload) {
        state.csgft = payload.data;
        if ((payload.disbursements?.length ?? 0) > 0) {
            state.csgft_disbursement = payload.disbursements;
        }
        state.funding_request = payload.funding_request;
    },
    csgftLoadModelsDisburse(state, disburseModel) {
        state.csgft = disburseModel.data;
        state.funding_request = disburseModel.funding_request;
        if ((disburseModel.disbursements?.length ?? 0) > 0) {
            state.csgft_disbursement = disburseModel.disbursements;
        }
    },
    csgftLoadFundingRequest(state, funding_request) {
        state.funding_request = funding_request;
    },
};
const actions = {
    async loadCsgFundingRequest(state, funding_request) {
        if (funding_request) {
            state.commit("csgftLoadFundingRequest", funding_request);
        }
    },
    async getCsgftNewInstance(state, funding_request_id) {
        const res = await axios.get(`${CSGFT_NEW_INSTANCE}/${funding_request_id}`);
        if (res?.data?.success) {            
            state.commit("csgftResetState", state);
            state.commit("getCsgftNewInstance", res.data);
        }
    },
    async getCsgftRecalc({ commit, getters }) {
        const assessment = getters.csgft_get_assessment;
        const disbursements = getters.csgft_get_disbursements;
        const body = {
            assessment: assessment,
            disbursements: disbursements,
        };
        const res = await axios.post(`${CSGFT}/${assessment.funding_request_id}/recalc`, body);
        if (res?.data?.success) {
            commit("cslftResetState", state);
            commit("getCsgftNewInstance", res.data);
        }
    },
    async getCsgftDisburse({ commit, getters }) {
        const assessment = getters.csgft_get_assessment;
        const disbursements = getters.csgft_get_disbursements;
        const body = {
            assessment: assessment,
            disbursements: disbursements,
        };
        const res = await axios.post(`${CSGFT}/${assessment.funding_request_id}/disburse`, body);
        if (res?.data?.success) {
            commit("csgftLoadModelsDisburse", res.data);
        }
    },
    async saveCsgftAssessment({ getters, dispatch }, vm) {
        const assessment = getters.csgft_get_assessment;
        const disbursements = getters.csgft_get_disbursements;
        const funding_request = getters.csgft_get_funding_request;
        const body = {
            payload: {
                data: assessment,
                disbursements: disbursements,
                funding_request: funding_request,
            },
        };

        let resAction = undefined;
        if (assessment.id) {
            resAction = await axios.put(
                `${CSGFT}/${assessment.id}`,
                body
            );
        }
        else {
            resAction = await axios.post(
                `${CSGFT}`,
                body
            );
        }

        const message = resAction?.data?.messages[0];

        if (message?.variant === "success") {
            vm.$emit("showSuccess", message.text);
            dispatch("getCsgftNewInstance", assessment.funding_request_id);
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
};
const getters = {
    csgft_get_assessment(state) {
      return state.csgft;
    },
    csgft_get_disbursements(state)
    {
        return state.csgft_disbursement;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}