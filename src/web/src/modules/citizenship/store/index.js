import axios from "axios";
import { CITIZENSHIP } from "@/urls";

const state = {
    citizenships: [],
};
const getters = {
    citizenships(state) { 
        return state.citizenships;
    },
};
const mutations = {
    async SET_CITIZENSHIPS(state, value) {
        state.citizenships = value;
    },
};

const actions = {
    async setCitizenships(state, value = true) {
        const res = await axios.get(CITIZENSHIP+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_CITIZENSHIPS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
