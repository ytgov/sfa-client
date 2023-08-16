
import axios from "axios";
import { CERTIFICATE_AUDIT_REPORT } from "@/urls";

const state = {    
  cslCertificateAuditReport: [],
};
const getters = {
  cslCertificateAuditReport(state) {
    return state.cslCertificateAuditReport;
  },
};
const mutations = {
  async SET_CERTIFICATE_AUDIT_REPORT(state, value) {
    state.cslCertificateAuditReport = value;
  },
};
const actions = {
  async setcslCertificateExport(state, value = true) {    
    const resCslCertificateAuditReport = await axios.get(CERTIFICATE_AUDIT_REPORT + "?filter=" + value);    
    if (resCslMsfaaReceiveExport?.data?.success) {
      state.commit("SET_CERTIFICATE_AUDIT_REPORT", [...resCslCertificateAuditReport.data.data]);
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