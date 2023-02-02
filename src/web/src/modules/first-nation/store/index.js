import axios from "axios";
import { FIRST_NATION } from "@/urls";

const state = {
    firstNations: [],
};
const getters = {
    firstNations(state) { 
        return state.firstNations;
    },
};
const mutations = {
    async SET_FIRST_NATION(state, value) {
        state.firstNations = value;
    },
};
const actions = {
    async setFirstNations(state, value = true) {
        const res = await axios.get(FIRST_NATION+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_FIRST_NATION", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
