import axios from "axios";
import { ATTENDANCE } from "@/urls";

const state = {
    attendances: [],
};
const getters = {
    attendances(state) { 
        return state.attendances;
    },
};
const mutations = {
    async SET_ATTENDANCES(state, value) {
        state.attendances = value;
    },
};

const actions = {
    async setAttendances(state, value = true) {
        const res = await axios.get(ATTENDANCE+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_ATTENDANCES", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
