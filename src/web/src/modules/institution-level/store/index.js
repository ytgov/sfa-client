import axios from "axios";
import { INSTITUTION_LEVEL } from "@/urls";

const state = {
    institutionLevels: [],
};
const getters = {
    institutionLevels(state) { 
        return state.institutionLevels;
    },
};
const mutations = {
    async SET_INSTITUTION_LEVELS(state, value) {
        state.institutionLevels = value;
    },
};
const actions = {
    async setInstitutionLevels(state, value = true) {
        const res = await axios.get(INSTITUTION_LEVEL+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_INSTITUTION_LEVELS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
