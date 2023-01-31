import axios from "axios";
import { SEX } from "@/urls";

const state = {
    sexes: [],
};
const getters = {
    sexes(state) { 
        return state.sexes;
    },
};
const mutations = {
    async SET_SEXES(state, value) {
        state.sexes = value;
    },
};
const actions = {
    async setSexes(state, value = true) {
        const res = await axios.get(SEX+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_SEXES", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
