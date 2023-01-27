import axios from "axios";
import { COUNTRIES } from "@/urls";

const state = {
    countries: [],
};
const getters = {
    countries(state) { 
        return state.countries;
    },
};
const mutations = {
    async SET_COUNTRIES(state, value) {
        state.countries = value;
    },
};
const actions = {
    async setCountries(state, value = true) {
        const resCountries = await axios.get(COUNTRIES+"?filter="+value);
        if (resCountries?.data?.success) {
            state.commit("SET_COUNTRIES", [...resCountries.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
