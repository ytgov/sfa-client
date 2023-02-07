import axios from "axios";
import { ASSESSMENT_TYPE } from "@/urls";

const state = {
    assessmentTypes: [],
};
const getters = {
    assessmentTypes(state) { 
        return state.assessmentTypes;
    },
};
const mutations = {
    async SET_ASSESSMENT_TYPES(state, value) {
        state.assessmentTypes = value;
    },
};
const actions = {
    async setAssessmentTypes(state, value = true) {
        const res = await axios.get(ASSESSMENT_TYPE+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_ASSESSMENT_TYPES", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
