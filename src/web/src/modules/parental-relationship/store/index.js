import axios from "axios";
import { PARENTAL_RELATIONSHIP } from "@/urls";

const state = {
    parentalRelationships: [],
};
const getters = {
    parentalRelationships(state) { 
        return state.parentalRelationships;
    },
};
const mutations = {
    async SET_PARENTAL_RELATIONSHIPS(state, value) {
        state.parentalRelationships = value;
    },
};
const actions = {
    async setParentalRelationships(state, value = true) {
        const res = await axios.get(PARENTAL_RELATIONSHIP+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_PARENTAL_RELATIONSHIPS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
