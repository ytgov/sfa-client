import axios from "axios";
import { AGENCY } from "@/urls";

const state = {
    agencies: [],
};
const getters = {
    agencies(state) { 
        return state.agencies;
    },
};
const mutations = {
    async SET_AGENCIES(state, value) {
        state.agencies = value;
    },
};

const actions = {
    async setAgencies(state, value = true) {
        const res = await axios.get(AGENCY+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_AGENCIES", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
