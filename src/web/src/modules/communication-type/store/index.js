
import axios from "axios";
import { COMMUNICATION_TYPES } from "@/urls";

const state = {
  communicationTypes: [],
};
const getters = {
  communicationTypes(state) {
    return state.communicationTypes;
  },
};
const mutations = {
  async SET_COMMUNICATION_TYPES(state, value) {
    state.communicationTypes = value;
  },
};
const actions = {
  async setCommunicationTypes(state, value = true) {
    const resCommunicationTypes = await axios.get(COMMUNICATION_TYPES + "?filter=" + value);    
    if (resCommunicationTypes?.data?.success) {      
      state.commit("SET_COMMUNICATION_TYPES", [...resCommunicationTypes.data]);
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