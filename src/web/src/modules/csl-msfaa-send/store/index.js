
import axios from "axios";
import { CSL_MSFAA_SEND } from "@/urls";

const state = {    
  cslMsfaaSend: [],
};
const getters = {
  cslMsfaaSend(state) {
    return state.cslMsfaaSend;
  },
};
const mutations = {
  async SET_CSL_MSFAA_SEND(state, value) {
    state.cslMsfaaSend = value;
  },
};
const actions = {
  async setcslCertificateExport(state, value = true) {    
    const resCslMsfaaSend = await axios.get(CSL_MSFAA_SEND + "?filter=" + value);    
    if (resCslMsfaaSend?.data?.success) {
      state.commit("SET_CSL_MSFAA_SEND", [...resCslMsfaaSend.data.data]);
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