import axios from "axios";
import { REASONS_FOR_CHANGE } from "@/urls";

const state = {
    reasonsforChangeList: [],
};
const getters = {
    reasonsforChangeList(state) { 
        return state.reasonsforChangeList;
    },
};
const mutations = {
    async SET_REASONS_FOR_CHANGE(state, value) {
        state.reasonsforChangeList = value;
    },
};
const actions = {
    async setReasonsForChange(state, value = true) {
        const res = await axios.get(REASONS_FOR_CHANGE+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_REASONS_FOR_CHANGE", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
