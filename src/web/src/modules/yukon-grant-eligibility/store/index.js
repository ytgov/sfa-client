import axios from "axios";
import { YUKON_GRANT_ELIGIBILITY } from "@/urls";

const state = {
    yukonGrantEligibilityList: [],
};
const getters = {
    yukonGrantEligibilityList(state) { 
        return state.yukonGrantEligibilityList;
    },
};
const mutations = {
    async SET_YUKON_GRANT_ELIGIBILITY(state, value) {
        state.yukonGrantEligibilityList = value;
    },
};
const actions = {
    async setYukonGrantEligibility(state, value = true) {
        const res = await axios.get(YUKON_GRANT_ELIGIBILITY+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_YUKON_GRANT_ELIGIBILITY", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
