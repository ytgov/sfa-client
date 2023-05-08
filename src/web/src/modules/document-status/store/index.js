import axios from "axios";
import { DOCUMENT_STATUS } from "@/urls";

const state = {
    documentStatusList: [],
};
const getters = {
    documentStatusList(state) { 
        return state.documentStatusList;
    },
};
const mutations = {
    async SET_DOCUMENT_STATUS(state, value) {
        state.documentStatusList = value;
    },
};

const actions = {
    async setDocumentStatus(state, value = true) {
        const res = await axios.get(DOCUMENT_STATUS+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_DOCUMENT_STATUS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
