import axios from "axios";
import { ADDRESS_TYPE } from "@/urls";

const state = {
    addressTypes: [],
};
const getters = {
    addressTypes(state) { 
        return state.addressTypes;
    },
};
const mutations = {
    async SET_ADDRESS_TYPES(state, value) {
        state.addressTypes = value;
    },
};
const actions = {
    async setAddressTypes(state, value = true) {
        const resAddressTypes = await axios.get(ADDRESS_TYPE+"?filter="+value);
        if (resAddressTypes?.data?.success) {
            state.commit("SET_ADDRESS_TYPES", [...resAddressTypes.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
