import axios from "axios";
import { ASSESSMENT_URL } from "../urls";

const state = {
    assessment: {}
};
const mutations = {
    initAssessment(state, assessment) {
        state.assessment = assessment;
    },
    deleteAssessment(state) {
        state.assessment = {};
    }
};
const actions = {
    async loadAssessment(state, id) {
        const request = await axios.get(`${ASSESSMENT_URL}/${id}`);
        const data = request.data.data;
        if (data) {
            state.commit("initAssessment", data);
        }
    },
    async addAssessment(state, assessment) {
        const request = await axios.post(`${ASSESSMENT_URL}`, assessment);
        if (request.data) {
            const id = request.data.id;
            this.loadAssessment(state, id);            
        }
    },
    async updateAssessment(state, assessment) {
        const request = await axios.patch(`${ASSESSMENT_URL}/${assessment.id}`, {id: _, ...assessment});
        if (request?.messages[0]?.variant === "success") {
            this.loadAssessment(state, assessment.id);
        }
    }
};
const getters = {
    
};

export default {
    state,
    getters,
    actions,
    mutations
};