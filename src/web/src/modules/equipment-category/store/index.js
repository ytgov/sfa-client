import axios from "axios";
import { EQUIPMENT_CATEGORY } from "@/urls";

const state = {
    equipmentCategories: [],
};
const getters = {
    equipmentCategories(state) { 
        return state.equipmentCategories;
    },
};
const mutations = {
    async SET_INCOME_EQUIPMENT_CATEGORIES(state, value) {
        state.equipmentCategories = value;
    },
};

const actions = {
    async setEquipmentCategories(state, value = true) {
        const res = await axios.get(EQUIPMENT_CATEGORY+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_INCOME_EQUIPMENT_CATEGORIES", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
