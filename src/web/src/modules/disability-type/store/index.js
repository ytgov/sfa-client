import axios from "axios";
import { DISABILITY_TYPE } from "@/urls";

const state = {
    disabilityTypes: [],
};
const getters = {
    disabilityTypes(state) { 
        return state.disabilityTypes;
    },
};
const mutations = {
    async SET_DISABILITY_TYPES(state, value) {
        state.disabilityTypes = value;
    },
};
const actions = {
    async setDisabilityTypes(state, value = true) {
        const res = await axios.get(DISABILITY_TYPE+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_DISABILITY_TYPES", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
