import axios from "axios";
import { DISBURSEMENT_TYPE } from "@/urls";

const state = {
    disbursementTypes: [],
};
const getters = {
    disbursementTypes(state) { 
        return state.disbursementTypes;
    },
};
const mutations = {
    async SET_DISBURSEMENT_TYPES(state, value) {
        state.disbursementTypes = value;
    },
};
const actions = {
    async setDisbursementTypes(state, value = true) {
        const res = await axios.get(DISBURSEMENT_TYPE+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_DISBURSEMENT_TYPES", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
