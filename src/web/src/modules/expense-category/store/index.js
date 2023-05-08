import axios from "axios";
import { EXPENSE_CATEGORY } from "@/urls";

const state = {
    expenseCategories: [],
};
const getters = {
    expenseCategories(state) { 
        return state.expenseCategories;
    },
};
const mutations = {
    async SET_EXPENSE_CATEGORIES(state, value) {
        state.expenseCategories = value;
    },
};

const actions = {
    async setExpenseCategories(state, value = true) {
        const res = await axios.get(EXPENSE_CATEGORY+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_EXPENSE_CATEGORIES", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
