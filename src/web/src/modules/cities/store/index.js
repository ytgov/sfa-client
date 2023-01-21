import axios from "axios";
import { CITIES } from "@/urls";

const state = {
    cities: [],
};
const getters = {
    cities(state) { 
        return state.cities;
    },
};
const mutations = {
    async SET_CITIES(state, value) {
        state.cities = value;
    },
};
const actions = {
    async setCities(state, value = true) {
        const resCities = await axios.get(CITIES+"?filter="+value);
        if (resCities?.data?.success) {
            state.commit("SET_CITIES", [...resCities.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
