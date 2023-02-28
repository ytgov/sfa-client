import axios from "axios";
import { DISABILITY_SERVICE } from "@/urls";

const state = {
    disabilityServices: [],
};
const getters = {
    disabilityServices(state) { 
        return state.disabilityServices;
    },
};
const mutations = {
    async SET_DISABILITY_SERVICES(state, value) {
        state.disabilityServices = value;
    },
};
const actions = {
    async setDisabilityServices(state, value = true) {
        const res = await axios.get(DISABILITY_SERVICE+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_DISABILITY_SERVICES", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
