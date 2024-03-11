import axios from "axios";
import moment from "moment";
import { isNumber } from "lodash";
import { parse } from "vue-currency-input";
import { APPLICATION_URL, CSG_THRESHOLD_URL } from "@/urls";

import store from "@/store";

const state = {
  isLoading: true,
  csgThresholds: [],
  fundingRequest: {},
  assessment: {},
  msfaa: {},

  application: {},
  disbursements: [],
};
const getters = {
  disbursements(state) {
    return state.disbursements;
  },

  needRemaining(state, getters) {
    /* let totalNeed = getters.totalCosts;
    let totalGrants =
      store.getters["csgPartTimeDisabilityStore/assessedAmount"] +
      store.getters["csgPartTimeStore/assessedAmount"] +
      store.getters["csgPartTimeDependentStore/assessedAmount"];

    state.assessment.total_grant_awarded = totalGrants;
    return totalNeed - totalGrants; */
    return 99999;
  },
};
const mutations = {
  SET_LOADING(state, value) {
    state.isLoading = value;
  },
  SET_APPLICATION(state, value) {
    state.application = value;
  },
  SET_FUNDINGREQUEST(state, value) {
    state.fundingRequest = value;
  },
  SET_ASSESSMENT(state, value) {
    state.assessment = value;
  },
  SET_DISBURSEMENTS(state, value) {
    for (let v of value) {
      v.due_date = v.due_date ? moment.utc(v.due_date).format("YYYY-MM-DD") : undefined;
      v.issue_date = v.issue_date ? moment.utc(v.issue_date).format("YYYY-MM-DD") : undefined;
    }

    state.disbursements = value;
  },
  SET_MSFAA(state, value) {
    state.msfaa = value;
  },
};
const actions = {
  async initialize(localStore, { app, assessmentId }) {
    console.log("Initializing CSLFT");
    await localStore.dispatch("loadCSLFTAssessment", { applicationId: app.id, assessmentId });
  },

  loadCSLFTAssessment({ commit, state, getters }, { applicationId, assessmentId }) {
    commit("SET_LOADING", true);
    let url = `${CSG_THRESHOLD_URL}/cslft/${applicationId}`;
    if (assessmentId) url += `/${assessmentId}`;

    axios.get(url).then(async (resp) => {
      let application = store.getters.selectedApplication;
      commit("SET_APPLICATION", application);
      commit("SET_FUNDINGREQUEST", resp.data.data.funding_request);
      commit("SET_DISBURSEMENTS", resp.data.data.disbursements);
      commit("SET_MSFAA", resp.data.data.msfaa);

      let assessment = resp.data.data.assessment;

      if (assessment) {
        assessment.assessed_date = moment.utc(assessment.assessed_date).format("YYYY-MM-DD");
        assessment.classes_start_date = moment.utc(assessment.classes_start_date).format("YYYY-MM-DD");
        assessment.classes_end_date = moment.utc(assessment.classes_end_date).format("YYYY-MM-DD");
      }

      commit("SET_ASSESSMENT", assessment);
      commit("SET_LOADING", false);

      // child store initializers
      //await store.dispatch("csgPartTimeStore/initialize", { app: application, assessment: state.assessment });
      //await store.dispatch("csgPartTimeDependentStore/initialize", { app: application, assessment: state.assessment });
      //await store.dispatch("csgPartTimeDisabilityStore/initialize", { app: application, assessment: state.assessment });
    });
  },

  async recalculate({ state, dispatch, commit }) {
    dispatch("loadCSLFTAssessment", state.fundingRequest.application_id).then(() => {
      let dependentCount = 0;
      let familySize = 1;
      let application = state.application;

      commit("SET_ASSESSMENT", assessment);
      //dispatch("save");
    });
  },

  async makeDisbursements({ getters, commit, state, dispatch }, numberOfDisbursements) {
    let parts = Math.ceil(getters.netAmount / numberOfDisbursements);
    let disbursedValues = [];

    let total = 0;

    for (let i = 0; i < numberOfDisbursements - 1; i++) {
      let amount = parse(formatMoney(parts), { currency: "usd" });
      total += amount;

      disbursedValues.push({
        disbursed_amount: amount,
        disbursement_type_id: 4,
        issue_date: moment().format("YYYY-MM-DD"), // today
      });
    }

    let remainder = parse(formatMoney(getters.netAmount - total), { currency: "usd" });

    disbursedValues.push({
      disbursed_amount: remainder,
      disbursement_type_id: 4,
      issue_date: moment().format("YYYY-MM-DD"),
    });

    await commit("SET_DISBURSEMENTS", [...state.disbursements, ...disbursedValues]);

    await axios.put(`${APPLICATION_URL}/${state.fundingRequest.application_id}/status/${state.fundingRequest.id}`, {
      data: { status_id: 7 }, // Awarded
    });

    dispatch("save", true);
  },

  async removeDisbursement({ state }, { item, index }) {
    if (item.id) {
      state.disbursements.splice(index, 1);
      await axios.delete(
        `${CSG_THRESHOLD_URL}/csgftdep/${state.fundingRequest.application_id}/funding-request/${state.fundingRequest.id}/disbursement/${item.id}`
      );
    } else {
      state.disbursements.splice(index, 1);
    }
  },

  async addDisbursement({ state }) {
    state.disbursements.push({
      disbursement_type_id: 4,
      issue_date: moment().format("YYYY-MM-DD"), // today
    });
  },

  async save({ state, dispatch }, disburseClicked = false) {
    state.assessment.disbursements = state.disbursements;

    if (state.assessment.id) {
      axios
        .put(
          `${CSG_THRESHOLD_URL}/csgftdep/${state.fundingRequest.application_id}/funding-request/${state.fundingRequest.id}/assessment/${state.assessment.id}`,
          { ...state.assessment, generateTransaction: disburseClicked }
        )
        .then((resp) => {
          dispatch("loadCSLFTAssessment", state.fundingRequest.application_id);
        });
    } else {
      axios
        .post(
          `${CSG_THRESHOLD_URL}/csgftdep/${state.fundingRequest.application_id}/funding-request/${state.fundingRequest.id}/assessment`,
          { ...state.assessment, generateTransaction: disburseClicked }
        )
        .then((resp) => {
          dispatch("loadCSLFTAssessment", state.fundingRequest.application_id);
        });
    }
  },
  async updateFundingRequest({ state, dispatch }) {
    return await axios
      .put(`${APPLICATION_URL}/${state.application.id}/status/${state.fundingRequest.id}`, {
        data: {
          status_id: state.fundingRequest.status_id,
          status_date: new Date(),
          status_reason_id: state.fundingRequest.status_reason_id,
        },
      })
      .then((resp) => {
        dispatch("loadCSLFTAssessment", state.application.id);
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

function formatMoney(input) {
  if (isNumber(input)) {
    return Intl.NumberFormat("en", {
      currency: "USD",
      style: "currency",
    }).format(input);
  }

  return "";
}
