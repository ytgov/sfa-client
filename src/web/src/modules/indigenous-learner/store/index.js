import axios from "axios";
import { INDIGENOUS_LERNER } from "@/urls";

const state = {
    indigenousLearners: [],
};
const getters = {
    indigenousLearners(state) { 
        return state.indigenousLearners;
    },
};
const mutations = {
    async SET_INDIGENOUS_LERNERS(state, value) {
        state.indigenousLearners = value;
    },
};
const actions = {
    async setIndigenousLearners(state, value = true) {
        const resIndigenousLearners = await axios.get(INDIGENOUS_LERNER+"?filter="+value);
        if (resIndigenousLearners?.data?.success) {
            state.commit("SET_INDIGENOUS_LERNERS", [...resIndigenousLearners.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
