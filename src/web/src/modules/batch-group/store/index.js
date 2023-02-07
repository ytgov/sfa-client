import axios from "axios";
import { BATCH_GROUP } from "@/urls";

const state = {
    batchGroups: [],
};
const getters = {
    batchGroups(state) { 
        return state.batchGroups;
    },
};
const mutations = {
    async SET_BATCH_GROUPS(state, value) {
        state.batchGroups = value;
    },
};
const actions = {
    async setBatchGroups(state, value = true) {
        const res = await axios.get(BATCH_GROUP+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_BATCH_GROUPS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
