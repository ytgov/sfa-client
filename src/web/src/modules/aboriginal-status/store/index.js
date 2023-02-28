import axios from "axios";
import { ABORIGINAL_STATUS } from "@/urls";

const state = {
    aboriginalStatusList: [],
};
const getters = {
    aboriginalStatusList(state) { 
        return state.aboriginalStatusList;
    },
};
const mutations = {
    async SET_ABORIGINAL_STATUS_LIST(state, value) {
        state.aboriginalStatusList = value;
    },
};
const actions = {
    async setAboriginalStatusList(state, value = true) {
        const res = await axios.get(ABORIGINAL_STATUS+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_ABORIGINAL_STATUS_LIST", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
