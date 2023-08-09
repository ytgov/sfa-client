
import axios from "axios";
import { CSL_MSFAA_RECEIVE } from "@/urls";

const state = {    
  cslMsfaaReceiveExport: [],
};
const getters = {
  cslMsfaaReceiveExport(state) {
    return state.cslMsfaaReceiveExport;
  },
};
const mutations = {
  async SET_CSL_MSFAA_RECEIVE(state, value) {
    state.cslMsfaaReceiveExport = value;
  },
};
const actions = {
  async setcslCertificateExport(state, value = true) {    
    const resCslMsfaaReceiveExport = await axios.get(CSL_MSFAA_RECEIVE + "?filter=" + value);    
    if (resCslMsfaaReceiveExport?.data?.success) {
      state.commit("SET_CSL_MSFAA_RECEIVE", [...resCslMsfaaReceiveExport.data.data]);
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