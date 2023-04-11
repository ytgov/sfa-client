import axios from "axios";
import { PRESTUDY_EMPLOYMENT_STATUS } from "@/urls";

const state = {
    prestudyEmployments: [],
};
const getters = {
    prestudyEmployments(state) { 
        return state.prestudyEmployments;
    },
};
const mutations = {
    async SET_PRESTUDY_EMPLOYMENTS(state, value) {
        state.prestudyEmployments = value;
    },
};
const actions = {
    async setPrestudyEmployments(state, value = true) {
        const res = await axios.get(PRESTUDY_EMPLOYMENT_STATUS+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_PRESTUDY_EMPLOYMENTS", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
