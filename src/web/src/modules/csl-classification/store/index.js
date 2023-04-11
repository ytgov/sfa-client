import axios from "axios";
import { CSL_CLASSIFICATION } from "@/urls";

const state = {
    cslClassifications: [],
};
const getters = {
    cslClassifications(state) { 
        return state.cslClassifications;
    },
};
const mutations = {
    async SET_CSL_CLASSIFICATIONS(state, value) {
        state.cslClassifications = value;
    },
};

const actions = {
    async setCslClassifications(state, value = true) {
        const res = await axios.get(CSL_CLASSIFICATION+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_CSL_CLASSIFICATIONS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
