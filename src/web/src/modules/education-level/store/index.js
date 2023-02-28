import axios from "axios";
import { EDUCATION_LEVEL } from "@/urls";

const state = {
    educationLevels: [],
};
const getters = {
    educationLevels(state) { 
        return state.educationLevels;
    },
};
const mutations = {
    async SET_EDUCATION_LEVELS(state, value) {
        state.educationLevels = value;
    },
};
const actions = {
    async setEducationLevels(state, value = true) {
        const res = await axios.get(EDUCATION_LEVEL+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_EDUCATION_LEVELS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
