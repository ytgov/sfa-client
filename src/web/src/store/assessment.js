import axios from "axios";
import { ASSESSMENT_URL } from "../urls";

const state = {
    assessment: {}
};
const mutations = {
    initAssessment(state, assessment) {
        state.assessment = assessment;
    },
    addAssessment(state, assessment) {
        state.assessment = assessment;
    },
    updateAssessment(state, assessment) {
        if (state.assessment) {
            state.assessment = assessment;
        }
    },
    deleteAssessment(state) {
        state.assessment = {};
    }
};
const actions = {
    
};
const getters = {
    
};

export default {
    state,
    getters,
    actions,
    mutations
};