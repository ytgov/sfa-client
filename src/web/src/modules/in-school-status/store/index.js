
import axios from "axios";
import { IN_SCHOOL_STATUS } from "@/urls";

const state = {
  inSchoolStatus: [],
};
const getters = {
  inSchoolStatus(state) {
    return state.inSchoolStatus;
  },
};
const mutations = {
  async SET_IN_SCHOOL_STATUS(state, value) {
    state.inSchoolStatus = value;
  },
};
const actions = {
  async setInSchoolStatus(state, value = true) {
    const resInSchoolStatus = await axios.get(IN_SCHOOL_STATUS + "?filter=" + value);    
    if (resInSchoolStatus?.data?.success) {      
      state.commit("SET_IN_SCHOOL_STATUS", [...resInSchoolStatus.data.data]);
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