import axios from "axios";
import { CSL_ENTITLEMENT_FEEDBACK } from "@/urls";

const state = {        
  cslEntitlementFeedback: [],
};
const getters = {
  cslEntitlementFeedback(state) {
    return state.cslEntitlementFeedback;
  },
};
const mutations = {
  async SET_CSL_ENTITLEMENT_FEEDBACK(state, value) {
    state.cslEntitlementFeedback = value;
  },
};
const actions = {    
  async setcslEntitlementFeedback(state, value = true) {    
    const rescslEntitlementFeedback = await axios.get(CSL_ENTITLEMENT_FEEDBACK + "?filter=" + value);    
    if (rescslEntitlementFeedback?.data?.success) {
      state.commit("SET_CSL_ENTITLEMENT_FEEDBACK", [...rescslEntitlementFeedback.data.data]);
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