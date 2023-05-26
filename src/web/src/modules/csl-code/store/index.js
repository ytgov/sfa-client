
import axios from "axios";
import { CSL_CODES } from "@/urls";

const state = {
  cslCodes: [],
};
const getters = {
  cslCodes(state) {
    return state.cslCodes;
  },
};
const mutations = {
  async SET_CSL_CODES(state, value) {
    state.cslCodes = value;
  },
};
const actions = {
  async setCslCodes(state, value = true) {
    const resCslCodes = await axios.get(CSL_CODES + "?filter=" + value);
    const warningCodesAndDescription = [];
    if (resCslCodes?.data?.success) {
      for (let code of resCslCodes.data.data) {
        if (code.warning_code) {
          const objData = {
            id: code.id,
            data: code.warning_code + " - " + code.definition,
          };

          warningCodesAndDescription.push(objData);
        }
      }
      //state.commit("SET_CSL_CODES", [...resCslCodes.data.data]);
      state.commit("SET_CSL_CODES", [...warningCodesAndDescription]);
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