
import axios from "axios";
import { REQUIREMENT_TYPE } from "@/urls";

const state = {  
  requirementTypes: [],
};
const getters = {
  requirementTypes(state) {
    return state.requirementTypes;
  },
};
const mutations = {
  async SET_REQUIREMENT_TYPES(state, value) {
    state.requirementTypes = value;
  },
};
const actions = {
  async setRequirementTypes(state, value = true) {
    const resRequirementTypes = await axios.get(REQUIREMENT_TYPE + "?filter=" + value);    
    if (resRequirementTypes?.data?.success) {      
      state.commit("SET_REQUIREMENT_TYPES", [...resRequirementTypes.data]);
    } else {
      console.log("ERROR");
    }
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};