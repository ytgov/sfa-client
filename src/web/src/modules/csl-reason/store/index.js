import axios from "axios";
import { CSL_REASON } from "@/urls";

const state = {
    csl_reason: {
        non_award: [],
        over_award: [],
    },
};
const getters = {
    cslReasonNonAward(state) {
        return state.csl_reason.non_award;
    },
    cslReasonOverAward(state) {
        return state.csl_reason.over_award;
    },
};
const mutations = {
    async setCslReasonNonAward(state, value) {
        state.csl_reason.non_award = value;
    },
    async setCslReasonOverAward(state, value) {
        state.csl_reason.over_award = value;
    },
};

const actions = {
    async setCslReasonNonAward(state, value = true) {
        const res = await axios.get(`${CSL_REASON}/non-award`);
        if (res?.data?.success) {
            state.commit("setCslReasonNonAward", [...res.data.data]);
        }
    },
    async setCslReasonOverAward(state, value = true) {
        const res = await axios.get(`${CSL_REASON}/over-award`);
        if (res?.data?.success) {
            state.commit("setCslReasonOverAward", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
