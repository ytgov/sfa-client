import axios from "axios";
import { APPLICATION_TYPE } from "@/urls";

const state = {
    applicationTypes: [],
};
const getters = {
    applicationTypes(state) { 
        return state.applicationTypes;
    },
};
const mutations = {
    async SET_APPLICATION_TYPES(state, value) {
        state.applicationTypes = value;
    },
};
const actions = {
    async setApplicationTypes(state, value = true) {
        const res = await axios.get(APPLICATION_TYPE+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_APPLICATION_TYPES", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
