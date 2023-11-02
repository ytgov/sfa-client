import axios from "axios";
import { ADMIN_REPORT_URL } from "@/urls";

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
      url: "/fundingStatus/:academic_year_id",
      parameters: [
        {
          name: "Academic year",
          field: "academic_year_id",
          options: "academicYears",
          required: true,
          itemText: "year",
          itemValue: "year",
        },
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
    {
      text: "Scholarship Qualified Report",
      url: "/scholarshipQualified/:academic_year_id/",
      parameters: [
        {
          name: "Academic year",
          field: "academic_year_id",
          options: "academicYears",
          required: true,
          itemText: "year",
          itemValue: "year",
        },
      ],
      downloadFormat: ".csv",
      headers: [
        { text: "Scholarship", value: "scholarship" },
        { text: "First name", value: "firstName" },
        { text: "Last name", value: "lastName" },
        { text: "Program", value: "program" },
        { text: "Academic Percentage", value: "academicPercent" },
      ],
    },
    {
      text: "NARS 2023",
      url: "/nars2023",
      downloadFormat: ".pdf",
      headers: [
        { text: "Name", value: "id" },
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
  async setReport({ commit, state }, value) {
    commit("SET_SELECTEDREPORT", value);
  },
  async runReport({ commit, state }) {
    if (state.selectedReport) {
      let url = makeUrl(state.selectedReport);

      if (url) {
        axios.get(`${ADMIN_REPORT_URL}${url}.json`).then((resp) => {
          commit("SET_REPORTDATA", resp.data);
        });
      }
    }
  },
  async downloadReport({ state }) {
    if (state.selectedReport) {
      let url = makeUrl(state.selectedReport);
      if (url) window.open(`${ADMIN_REPORT_URL}${url}${state.selectedReport.downloadFormat}`);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};

function makeUrl(selectedReport) {
  let url = selectedReport.url;

  if (selectedReport.parameters) {
    for (let param of selectedReport.parameters) {
      if (param.required && !param.value) {
        alert(`${param.name} is required`);
        return;
      }

      url = url.replace(`:${param.field}`, param.value);
    }
  }

  return url;
}
