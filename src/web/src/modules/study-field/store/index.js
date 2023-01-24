import axios from "axios";
import { STUDY_FIELD } from "@/urls";

const state = {
    studyFields: [],
};
const getters = {
    studyFields(state) { 
        return state.studyFields;
    },
};
const mutations = {
    async SET_STUDY_FIELDS(state, value) {
        state.studyFields = value;
    },
};
const actions = {
    async setStudyFields(state, value = true) {
        const res = await axios.get(STUDY_FIELD+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_STUDY_FIELDS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
