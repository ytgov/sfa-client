import axios from "axios";
import { PROGRAM_DIVISION } from "@/urls";

const state = {
    programDivisions: [],
};
const getters = {
    programDivisions(state) { 
        return state.programDivisions;
    },
};
const mutations = {
    async SET_PROGRAM_DIVISIONS(state, value) {
        state.programDivisions = value;
    },
};

const actions = {
    async setProgramDivisions(state, value = true) {
        const res = await axios.get(PROGRAM_DIVISION+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_PROGRAM_DIVISIONS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
