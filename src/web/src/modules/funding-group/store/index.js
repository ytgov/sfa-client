import axios from "axios";
import { FUNDING_GROUP } from "@/urls";

const state = {
    FundingGroups: [],
};
const getters = {
    FundingGroups(state) { 
        return state.FundingGroups;
    },
};
const mutations = {
    async SET_FUNDING_GROUPS(state, value) {
        state.FundingGroups = value;
    },
};
const actions = {
    async setFundingGroups(state, value = true) {
        const res = await axios.get(FUNDING_GROUP+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_FUNDING_GROUPS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
