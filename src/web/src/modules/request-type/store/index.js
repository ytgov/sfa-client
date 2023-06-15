
import axios from "axios";
import { REQUEST_TYPES } from "@/urls";

const state = {
  requestTypes: [],
};
const getters = {
  requestTypes(state) {
    return state.requestTypes;
  },
};
const mutations = {
  async SET_REQUEST_TYPES(state, value) {
    state.requestTypes = value;
  },
};
const actions = {
  async setRequestTypes(state, value = true) {
    const resRequestTypes = await axios.get(REQUEST_TYPES + "?filter=" + value);    
    if (resRequestTypes?.data?.success) {      
      state.commit("SET_REQUEST_TYPES", [...resRequestTypes.data]);
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