import axios from "axios";
import { ACCOMMODATION_TYPE } from "@/urls";

const state = {
    accommodationTypes: [],
};
const getters = {
    accommodationTypes(state) { 
        return state.accommodationTypes;
    },
};
const mutations = {
    async SET_ACCOMMODATION_TYPES(state, value) {
        state.accommodationTypes = value;
    },
};

const actions = {
    async setAccommodationTypes(state, value = true) {
        const res = await axios.get(`${ACCOMMODATION_TYPE}?filter=${value}`);
        if (res?.data?.success) {
            state.commit("SET_ACCOMMODATION_TYPES", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
