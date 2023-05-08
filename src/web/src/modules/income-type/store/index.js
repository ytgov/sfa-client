import axios from "axios";
import { INCOME_TYPE } from "@/urls";

const state = {
    incomeTypes: [],
};
const getters = {
    incomeTypes(state) { 
        return state.incomeTypes;
    },
};
const mutations = {
    async SET_INCOME_TYPES(state, value) {
        state.incomeTypes = value;
    },
};

const actions = {
    async setIncomeTypes(state, value = true) {
        const res = await axios.get(INCOME_TYPE+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_INCOME_TYPES", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
