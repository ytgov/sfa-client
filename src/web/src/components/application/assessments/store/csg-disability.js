import axios from "axios";
import moment from "moment";
import { isNumber } from "lodash";
import { parse } from "vue-currency-input";
import { APPLICATION_URL, CSG_THRESHOLD_URL } from "@/urls";

const state = {
  csgThresholds: [],
  fundingRequest: {},
  assessment: {},

  disbursements: [],
  parentAssessment: {},
  parentDisbursements: [],
  baseRate: 2800,
};
const getters = {
  previousDisbursements(state) {
    let amounts = state.disbursements.map((d) => d.disbursed_amount);
    let total = amounts.reduce((t, a) => {
      return t + a;
    }, 0);

    return formatMoney(total);
  },
  assessedAmount(state) {
    return formatMoney(state.baseRate);
  },
  netAmount(state, getters) {
    return formatMoney(getters.netAmountRaw);
  },
  netAmountRaw(state, getters) {
    let rawVal =
      parse(getters.assessedAmount, { currency: "usd" }) - parse(getters.previousDisbursements, { currency: "usd" });
    return Object.is(Math.round(rawVal), -0) ? 0 : Math.round(rawVal);
  },
};
const mutations = {
  SET_THRESHOLDS(state, value) {
    state.csgThresholds = value;
  },
  SET_FUNDINGREQUEST(state, value) {
    state.fundingRequest = value;
  },
  SET_PARENTASSESSMENT(state, value) {
    state.parentAssessment = value;
  },
  SET_ASSESSMENT(state, value) {
    state.assessment = value;
  },
  SET_PARENTDISBURSEMENTS(state, value) {
    state.parentDisbursements = value;
  },
  SET_DISBURSEMENTS(state, value) {
    for (let v of value) {
      v.due_date = v.due_date ? moment.utc(v.due_date).format("YYYY-MM-DD") : undefined;
      v.issue_date = v.issue_date ? moment.utc(v.issue_date).format("YYYY-MM-DD") : undefined;
    }

    state.disbursements = value;
  },
};
const actions = {
  async initialize(store, app) {
    console.log("INIT");
    store.dispatch("loadThresholds", app.academic_year_id);
    store.dispatch("loadCSLFTAssessment", { id: app.id, refreshChild: true });
  },

  async loadThresholds({ commit }, academicYear) {
    axios.get(`${CSG_THRESHOLD_URL}/${academicYear}`).then((resp) => {
      commit("SET_THRESHOLDS", resp.data.data);
    });
  },

  async loadCSLFTAssessment({ commit, dispatch }, { id, refreshChild }) {
    axios.get(`${CSG_THRESHOLD_URL}/cslft/${id}`).then((resp) => {
      commit("SET_PARENTASSESSMENT", resp.data.data.assessment);
      commit("SET_PARENTDISBURSEMENTS", resp.data.data.disbursements);

      let parent = resp.data.data.assessment;

      if (parent && refreshChild) {
        dispatch("loadCSGFTAssessment", id);
      }
    });
  },

  loadCSGFTAssessment({ commit, state }, applicationId) {
    axios.get(`${CSG_THRESHOLD_URL}/csgd/${applicationId}`).then((resp) => {
      commit("SET_FUNDINGREQUEST", resp.data.data.funding_request);
      commit("SET_DISBURSEMENTS", resp.data.data.disbursements);

      if (resp.data.data.assessment) {
        let assessment = resp.data.data.assessment;
        assessment.assessed_date = moment.utc(assessment.assessed_date).format("YYYY-MM-DD");
        assessment.classes_start_date = moment.utc(assessment.classes_start_date).format("YYYY-MM-DD");
        assessment.classes_end_date = moment.utc(assessment.classes_end_date).format("YYYY-MM-DD");

        commit("SET_ASSESSMENT", resp.data.data.assessment);
      } else {
        let parent = state.parentAssessment;
        let assessment = {
          assessed_date: moment().format("YYYY-MM-DD"),
          study_weeks: parent.study_weeks,
          classes_start_date: moment.utc(parent.classes_start_date).format("YYYY-MM-DD"),
          classes_end_date: moment.utc(parent.classes_end_date).format("YYYY-MM-DD"),
          study_months: parent.study_months,
          family_size: parent.family_size,
          dependent_count: parent.dependent_count,
          student_ln150_income: parent.student_ln150_income,
          spouse_ln150_income: parent.spouse_ln150_income,
          relocation_total: parent.relocation_total,
          discretionary_cost: parent.discretionary_cost,
          discretionary_cost_actual: parent.discretionary_cost_actual,
          tuition_estimate: parent.tuition_estimate,
          books_supplies_cost: parent.books_supplies_cost,
          r_trans_16wk: parent.r_trans_16wk,
          shelter_month: parent.shelter_month,
          p_trans_month: parent.p_trans_month,
          day_care_allowable: parent.day_care_allowable,
          day_care_actual: parent.day_care_actual,
          depend_food_allowable: parent.depend_food_allowable,
          depend_tran_allowable: parent.depend_tran_allowable,
          spouse_expected_contribution: parent.spouse_expected_contribution,
          student_expected_contribution: parent.student_expected_contribution,
          student_contrib_exempt: parent.student_contrib_exempt,
          spouse_contrib_exempt: parent.spouse_contrib_exempt,
          student_contribution_review: parent.student_contribution_review,
          spouse_contribution_review: parent.spouse_contribution_review,
          parent_contribution_review: parent.parent_contribution_review,
        };

        commit("SET_ASSESSMENT", assessment);
      }
    });
  },

  async recalculate({ state, dispatch, commit }) {
    dispatch("loadCSLFTAssessment", { id: state.fundingRequest.application_id, refreshChild: false }).then(() => {
      let parent = state.parentAssessment;

      let assessment = {
        id: state.assessment.id,
        assessed_date: moment().format("YYYY-MM-DD"),
        study_weeks: parent.study_weeks,
        classes_start_date: moment.utc(parent.classes_start_date).format("YYYY-MM-DD"),
        classes_end_date: moment.utc(parent.classes_end_date).format("YYYY-MM-DD"),
        study_months: parent.study_months,
        family_size: parent.family_size,
        dependent_count: parent.dependent_count,
        student_ln150_income: parent.student_ln150_income,
        spouse_ln150_income: parent.spouse_ln150_income,
        relocation_total: parent.relocation_total,
        discretionary_cost: parent.discretionary_cost,
        discretionary_cost_actual: parent.discretionary_cost_actual,
        tuition_estimate: parent.tuition_estimate,
        books_supplies_cost: parent.books_supplies_cost,
        r_trans_16wk: parent.r_trans_16wk,
        shelter_month: parent.shelter_month,
        p_trans_month: parent.p_trans_month,
        day_care_allowable: parent.day_care_allowable,
        day_care_actual: parent.day_care_actual,
        depend_food_allowable: parent.depend_food_allowable,
        depend_tran_allowable: parent.depend_tran_allowable,
        spouse_expected_contribution: parent.spouse_expected_contribution,
        student_expected_contribution: parent.student_expected_contribution,
        student_contrib_exempt: parent.student_contrib_exempt,
        spouse_contrib_exempt: parent.spouse_contrib_exempt,
        student_contribution_review: parent.student_contribution_review,
        spouse_contribution_review: parent.spouse_contribution_review,
        parent_contribution_review: parent.parent_contribution_review,
      };

      commit("SET_ASSESSMENT", assessment);
      dispatch("save");
    });
  },

  async makeDisbursements({ getters, commit, state, dispatch }, numberOfDisbursements) {
    let parts = getters.netAmountRaw / numberOfDisbursements;
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

    let remainder = parse(formatMoney(getters.netAmountRaw - total), { currency: "usd" });

    disbursedValues.push({
      disbursed_amount: remainder,
      disbursement_type_id: 4,
      issue_date: moment().format("YYYY-MM-DD"),
    });

    await commit("SET_DISBURSEMENTS", [...state.disbursements, ...disbursedValues]);

    await axios.put(`${APPLICATION_URL}/${state.fundingRequest.application_id}/status/${state.fundingRequest.id}`, {
      data: { status_id: 7 }, // Awarded
    });

    dispatch("save");
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

  async save({ state, dispatch }) {
    state.assessment.disbursements = state.disbursements;

    if (state.assessment.id) {
      axios
        .put(
          `${CSG_THRESHOLD_URL}/csgftdep/${state.fundingRequest.application_id}/funding-request/${state.fundingRequest.id}/assessment/${state.assessment.id}`,
          state.assessment
        )
        .then((resp) => {
          dispatch("loadCSGFTAssessment", state.fundingRequest.application_id);
        });
    } else {
      axios
        .post(
          `${CSG_THRESHOLD_URL}/csgftdep/${state.fundingRequest.application_id}/funding-request/${state.fundingRequest.id}/assessment`,
          state.assessment
        )
        .then((resp) => {
          dispatch("loadCSGFTAssessment", state.fundingRequest.application_id);
        });
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

function formatMoney(input) {
  if (isNumber(input)) {
    return Intl.NumberFormat("en", {
      currency: "USD",
      style: "currency",
    }).format(input);
  }

  return "";
}
