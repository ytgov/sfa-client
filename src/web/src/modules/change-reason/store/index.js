import axios from "axios";
import { CHANGE_REASON } from "@/urls";

const state = {
    changeReasons: [],
};
const getters = {
    changeReasons(state) { 
        return state.changeReasons;
    },
};
const mutations = {
    async SET_CHANGE_REASONS(state, value) {
        state.changeReasons = value;
    },
};

const actions = {
    async setChangeReasons(state, value = true) {
        const res = await axios.get(CHANGE_REASON+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_CHANGE_REASONS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
