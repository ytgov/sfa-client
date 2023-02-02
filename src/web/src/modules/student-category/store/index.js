import axios from "axios";
import { STUDENT_CATEGORY } from "@/urls";

const state = {
    studentCategories: [],
};
const getters = {
    studentCategories(state) { 
        return state.studentCategories;
    },
};
const mutations = {
    async SET_STUDENT_CATEGORIES(state, value) {
        state.studentCategories = value;
    },
};
const actions = {
    async setStudentCategories(state, value = true) {
        const res = await axios.get(STUDENT_CATEGORY+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_STUDENT_CATEGORIES", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
