import axios from "axios";
import { PROGRAM } from "@/urls";

const state = {
    programs: [],
};
const getters = {
    programs(state) { 
        return state.programs;
    },
};
const mutations = {
    async SET_PROGRAMS(state, value) {
        state.programs = value;
    },
};
const actions = {
    async setPrograms(state, value = true) {
        const res = await axios.get(PROGRAM+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_PROGRAMS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
