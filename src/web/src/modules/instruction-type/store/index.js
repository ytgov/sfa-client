import axios from "axios";
import { INSTRUCTION_TYPE } from "@/urls";

const state = {
    instructionTypes: [],
};
const getters = {
    instructionTypes(state) { 
        return state.instructionTypes;
    },
};
const mutations = {
    async SET_INSTRUCTION_TYPES(state, value) {
        state.instructionTypes = value;
    },
};

const actions = {
    async setInstructionTypes(state, value = true) {
        const res = await axios.get(INSTRUCTION_TYPE+"?filter="+value);
        if (res?.data?.success) {
            state.commit("SET_INSTRUCTION_TYPES", [...res.data.data]);
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
