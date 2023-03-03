import axios from "axios";
import { RELATIONSHIP } from "@/urls";

const state = {
    relationships: [],
};
const getters = {
    relationships(state) { 
        return state.relationships;
    },
};
const mutations = {
    async SET_RELATIONSHIPS(state, value) {
        state.relationships = value;
    },
};
const actions = {
    async setRelationships(state, value = true) {
        const res = await axios.get(RELATIONSHIP+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_RELATIONSHIPS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
