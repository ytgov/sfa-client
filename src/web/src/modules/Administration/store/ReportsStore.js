import axios from "axios";
import { CSG_THRESHOLD_URL, ADMIN_REPORT_URL } from "@/urls";

const state = {
  reportOptions: [
    {
      text: "STA Report - Yukon University",
      url: "/staYukonUniversity",
      downloadFormat: ".pdf",
      headers: [
        { text: "Name", value: "name" },
        { text: "SIN", value: "sin" },
        { text: "Effective Date", value: "effectiveDate" },
        { text: "Week", value: "weeks" },
        { text: "Rate/Week", value: "weeklyAmount" },
        { text: "Travel", value: "travelAllowance" },
        { text: "Net", value: "net" },
        { text: "Comment", value: "comment" },
      ],
    },
    {
      text: "Funding Status Report",
      url: "/fundingStatus/2023",
      parameters: [
        { field: "academic_year_id", type: "year" },
        { field: "status", type: "status_descrit" },
      ],
      downloadFormat: ".csv",
      headers: [
        { text: "First name", value: "firstName" },
        { text: "Last name", value: "lastName" },
        { text: "Status", value: "applicationStatus" },
        { text: "Institution", value: "institutionName" },
        { text: "Received", value: "receivedDate" },
        { text: "Grant", value: "grantType" },
      ],
    },
  ],
  selectedReport: undefined,
  reportResults: undefined,
};
const getters = {
  reportData(state) {
    return state.reportResults;
  },

  reportHeaders(state) {
    if (state.selectedReport) {
      return state.selectedReport.headers;
    }

    return [{ text: "Select a report above" }];
  },
  downloadLink(state) {
    if (state.selectedReport)
      return `${ADMIN_REPORT_URL}${state.selectedReport.url}${state.selectedReport.downloadFormat}`;
    return undefined;
  },
};
const mutations = {
  SET_SELECTEDREPORT(state, value) {
    if (state.selectedReport && state.selectedReport.text != value.text) {
      state.reportResults = [];
    }

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
    commit("SET_SELECTEDREPORT", value);
  },
  async runReport({ commit, state }) {
    axios.get(`${ADMIN_REPORT_URL}${state.selectedReport.url}.json`).then((resp) => {
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
