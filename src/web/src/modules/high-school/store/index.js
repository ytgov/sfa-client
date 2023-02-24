import axios from "axios";
import { HIGH_SCHOOL } from "@/urls";

const state = {
    highSchools: [],
};
const getters = {
    highSchools(state) { 
        return state.highSchools;
    },
};
const mutations = {
    async SET_HIGH_SCHOOLS(state, value) {
        state.highSchools = value;
    },
};
const actions = {
    async setHighSchools(state, value = true) {
        const res = await axios.get(HIGH_SCHOOL+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_HIGH_SCHOOLS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
