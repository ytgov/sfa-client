import axios from "axios";
import { STATUS } from "@/urls";

const state = {
    statusList: [],
};
const getters = {
    statusList(state) { 
        return state.statusList;
    },
};
const mutations = {
    async SET_STATUS(state, value) {
        state.statusList = value;
    },
};
const actions = {
    async setStatus(state, value = true) {
        const res = await axios.get(STATUS+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_STATUS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
