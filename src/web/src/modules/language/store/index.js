import axios from "axios";
import { LANGUAGE } from "@/urls";

const state = {
    languages: [],
};
const getters = {
    languages(state) { 
        return state.languages;
    },
};
const mutations = {
    async SET_LANGUAGES(state, value) {
        state.languages = value;
    },
};
const actions = {
    async setLanguages(state, value = true) {
        const resLanguage = await axios.get(LANGUAGE+"?filter="+value);
        if (resLanguage?.data?.success) {
            state.commit("SET_LANGUAGES", [...resLanguage.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
