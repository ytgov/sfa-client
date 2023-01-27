import axios from "axios";
import { PORTAL_STATUS } from "@/urls";

const state = {
    portalStatus: [],
};
const getters = {
    portalStatus(state) { 
        return state.portalStatus;
    },
};
const mutations = {
    async SET_PORTAL_STATUS(state, value) {
        state.portalStatus = value;
    },
};
const actions = {
    async setPortalStatus(state, value = true) {
        const res = await axios.get(PORTAL_STATUS+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_PORTAL_STATUS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
