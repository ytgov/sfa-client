import axios from "axios";
import { AGE_DISTRIBUTION } from "@/urls";

const state = {
    ageDistributions: [],
};
const getters = {
    ageDistributions(state) { 
        return state.ageDistributions;
    },
};
const mutations = {
    async SET_AGE_DISTRIBUTIONS(state, value) {
        state.ageDistributions = value;
    },
};
const actions = {
    async setAgeDistributions(state) {
        const res = await axios.get(AGE_DISTRIBUTION);
        if (res?.data?.success) {
            state.commit("SET_AGE_DISTRIBUTIONS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
