import axios from "axios";
import { CSG_THRESHOLD_URL, ADMIN_REPORT_URL } from "@/urls";

const state = {
  reportOptions: [
    {
      text: "STA Report - Yukon University",
      url: "sta-yukon-university",
    },
  ],
  selectedReport: undefined,
  reportResults: undefined,
};
const getters = {
  reportData(state) {
    return [{ Value: "Water" }];
  },

  reportHeaders(state) {
    return [
      {
        text: "Test",
        value: "Value",
      },
    ];
  },
};
const mutations = {
  SET_SELECTEDREPORT(state, value) {
    state.selectedReport = value;
  },
  SET_REPORTDATA(state, value) {
    state.reportResults = value;
  },
  SET_REPORTHEADERS(state, value) {},
};
const actions = {
  async loadThresholds({ commit }, academicYear) {
    axios.get(`${CSG_THRESHOLD_URL}/${academicYear}`).then((resp) => {
      commit("SET_THRESHOLDS", resp.data.data);
    });
  },
  async setReport({ commit, state }, value) {
    console.log("TRYING TO SET REPORT", value);
    commit("SET_SELECTEDREPORT", value);
  },
  async runReport({ commit, state }) {
    console.log("TRYING TO RUN REPORT", state.selectedReport);
    axios.get(`${ADMIN_REPORT_URL}/${state.selectedReport.url}`).then((resp) => {
      commit("SET_REPORTDATA", resp.data);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
