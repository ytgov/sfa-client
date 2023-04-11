import axios from "axios";
import { ACADEMIC_YEAR_URL } from "@/urls";

const state = {
    academicYears: [],
};
const getters = {
    academicYears(state) { 
        return state.academicYears;
    },
};
const mutations = {
    async SET_ACADEMIC_YEARS(state, value) {
        state.academicYears = value;
    },
};

const actions = {
    async setAcademicYears(state, value = "Open") {
        const res = await axios.get(ACADEMIC_YEAR_URL+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_ACADEMIC_YEARS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
