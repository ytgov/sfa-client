
import axios from "axios";
import { CSL_CERTIFICATE_EXPORT } from "@/urls";

const state = {
  cslCertificateExport: [],
};
const getters = {
  cslCertificateExport(state) {
    return state.cslCertificateExport;
  },
};
const mutations = {
  async SET_CSL_CERTIFICATE_EXPORT(state, value) {
    state.cslCertificateExport = value;
  },
};
const actions = {
  async setcslCertificateExport(state, value = true) {
    const rescslCertificateExport = await axios.get(CSL_CERTIFICATE_EXPORT + "?filter=" + value);    
    if (rescslCertificateExport?.data?.success) {
      state.commit("SET_CSL_CERTIFICATE_EXPORT", [...rescslCertificateExport.data.data]);
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