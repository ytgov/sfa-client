import axios from "axios";
import { STATUS_REASON } from "@/urls";

const state = {
    statusReasons: [],
};
const getters = {
    statusReasons(state) { 
        return state.statusReasons;
    },
};
const mutations = {
    async SET_STATUS_REASONS(state, value) {
        state.statusReasons = value;
    },
};
const actions = {
    async setStatusReasons(state, value = true) {
        const res = await axios.get(STATUS_REASON+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_STATUS_REASONS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
