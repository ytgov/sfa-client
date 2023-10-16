import axios from "axios";
import moment from "moment";
import { isArray, isNumber } from "lodash";
import { parse } from "vue-currency-input";
import { APPLICATION_URL, CSG_THRESHOLD_URL } from "@/urls";

import store from "@/store";
import { monthsBetween, weeksBetween } from "./utils";

const state = {
  csgThresholds: [],
  fundingRequest: {},
  assessment: {},
  msfaa: {},

  application: {},
  disbursements: [],
  baseRate: 0.0,
  childcare: [],
  allowances: [],
  baseMiscAmount: 10,
  baseMaxAllowable: 10000,
};
const getters = {
  disbursements(state) {
    return state.disbursements;
  },
  assessmentType(state) {
    return "Assessment";
  },
  allowance(state) {
    return state.allowances?.find(
      (a) =>
        a.province_id == state.application?.study_province_id && a.student_category_id == state.application?.category_id
    );
  },

  totalStudyCosts(state) {
    let total = (state.application?.tuition_estimate_amount ?? 0) + (state.application?.books_supplies_cost ?? 0);
    return total;
  },

  totalTransportation(state, getters) {
    return state.assessment.p_trans_month * state.assessment.study_months;
  },
  totalDayCare(state) {
    return (
      Math.min(state.assessment.day_care_allowable, state.assessment.day_care_actual) * state.assessment.study_months
    );
  },
  maxMiscellaneous(state, getters) {
    return state.baseMiscAmount * state.application?.courses_per_week;
  },
  totalMiscellaneous(state, getters) {
    return getters.maxMiscellaneous * state.assessment.study_weeks;
  },
  totalCosts(state, getters) {
    return getters.totalStudyCosts + getters.totalTransportation + getters.totalDayCare + getters.totalMiscellaneous;
  },
  familyIncome(state) {
    return (state.assessment?.student_ln150_income ?? 0) + (state.assessment?.spouse_ln150_income ?? 0);
  },
  requestedAmount(state) {
    if (state.fundingRequest?.is_csg_only === true) return "CSG Only";
    if (state.fundingRequest?.is_csl_full_amount === true) return "Full Amount";
    return state.fundingRequest?.csl_request_amount ?? 0;
  },
  totalGrants(state) {
    return state.assessment.total_grant_awarded;
  },

  maxAllowable(state) {
    return state.baseMaxAllowable - state.application?.outstanding_cslpt_amount ?? 0;
  },

  threshold(state) {
    if (state.assessment && state.csgThresholds && state.csgThresholds.length > 0) {
      let size = Math.min(state.assessment.family_size, 7);
      let val = state.csgThresholds.filter((f) => f.family_size == size)[0];
      return val || {};
    }
    return {};
  },

  assessedNeed(state) {
    if (state.assessment) {
      let mult = state.assessment.study_weeks >= 24 ? 2 : state.assessment.study_weeks > 0 ? 1 : 0;

      let reloc = state.assessment.relocation_total || 0;
      let disc = Math.min(state.assessment.discretionary_cost, state.assessment.discretionary_cost_actual) || 0;
      let tuit = state.assessment.tuition_estimate || 0;
      let books = state.assessment.books_supplies_cost || 0;
      let rtrans = state.assessment.r_trans_16wk * mult;
      let shelter = state.assessment.shelter_month * state.assessment.study_months;
      let ptrans = state.assessment.p_trans_month * state.assessment.study_months;
      let daycare =
        Math.min(state.assessment.day_care_allowable, state.assessment.day_care_actual) * state.assessment.study_months;
      let dshelter = state.assessment.depend_food_allowable * state.assessment.study_months;
      let dptrans = state.assessment.depend_tran_allowable * state.assessment.study_months;
      let totalCosts = reloc + disc + tuit + books + rtrans + shelter + ptrans + daycare + dshelter + dptrans;

      let contribution =
        (state.assessment.spouse_expected_contribution || 0) + state.assessment.student_expected_contribution;

      return totalCosts > contribution ? totalCosts - contribution : 0;
    }
    return 0;
  },

  pastThreshold(state, getters) {
    if (getters.threshold.middle_income_threshold <= getters.familyIncome) return "Past income threshold";
    return undefined;
  },

  assessedAmount(state, getters) {
    let value = 0;

    if (state.fundingRequest?.is_csg_only) return 0;

    let requestedAmount = state.baseMaxAllowable;

    if (state.fundingRequest?.csl_request_amount && state.fundingRequest?.csl_request_amount > 0)
      requestedAmount = state.fundingRequest?.csl_request_amount;

    let need = getters.needRemaining;

    if (!getters.pastThreshold)
      value = Math.min(getters.maxAllowable, requestedAmount, getters.totalCosts - getters.totalGrants);

    state.assessment.assessed_amount = value;
    return value;
  },
  actualAward(state, getters) {
    let returned = `${state.assessment?.return_uncashable_cert}` ?? "0";
    return getters.assessedAmount - parse(returned, { currency: "usd" });
  },

  previousDisbursements(state) {
    let amounts = state.disbursements.map((d) => d.disbursed_amount ?? 0);
    let total = amounts.reduce((t, a) => {
      return t + a;
    }, 0);

    return total;
  },
  netAmount(state, getters) {
    let rawVal = getters.actualAward - getters.previousDisbursements;
    if (rawVal > 0 && rawVal < 100) return 100.0;
    return Object.is(Math.round(rawVal), -0) ? 0 : Math.round(rawVal);
  },
  thresholdRange(state, getters) {
    if (getters.threshold) {
      return `${formatMoney(getters.threshold.income_threshold)} - ${formatMoney(getters.threshold.income_cutoff)}`;
    }
    return "";
  },
  needRemaining(state, getters) {
    let totalNeed = getters.totalCosts;
    let totalGrants =
      store.getters["csgPartTimeDisabilityStore/assessedAmount"] +
      store.getters["csgPartTimeStore/assessedAmount"] +
      store.getters["csgPartTimeDependentStore/assessedAmount"];

    state.assessment.total_grant_awarded = totalGrants;
    return totalNeed - totalGrants;
  },
};
const mutations = {
  SET_APPLICATION(state, value) {
    state.application = value;
  },
  SET_THRESHOLDS(state, value) {
    state.csgThresholds = value;
  },
  SET_BASERATE(state, value) {
    state.baseRate = value;
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
  SET_CHILDCARE(state, value) {
    state.childcare = value;
  },
  SET_ALLOWANCES(state, value) {
    state.allowances = value;
  },
  SET_MSFAA(state, value) {
    state.msfaa = value;
  },
};
const actions = {
  async initialize(localStore, app) {
    console.log("Initializing CSLPT");
    await localStore.dispatch("loadThresholds", app.academic_year_id);
    await localStore.dispatch("loadCSLPTAssessment", app.id);
  },

  async loadThresholds({ commit }, academicYear) {
    return axios.get(`${CSG_THRESHOLD_URL}/${academicYear}`).then((resp) => {
      commit("SET_THRESHOLDS", resp.data.data);
      commit("SET_BASERATE", resp.data.rates.csg_dep_monthly_amount);
      commit("SET_CHILDCARE", resp.data.childcare);
      commit("SET_ALLOWANCES", resp.data.allowances);
    });
  },

  loadCSLPTAssessment({ commit, state, getters }, applicationId) {
    axios.get(`${CSG_THRESHOLD_URL}/cslpt/${applicationId}`).then(async (resp) => {
      let application = store.getters.selectedApplication;
      commit("SET_APPLICATION", application);
      commit("SET_FUNDINGREQUEST", resp.data.data.funding_request);
      commit("SET_DISBURSEMENTS", resp.data.data.disbursements);
      commit("SET_MSFAA", resp.data.data.msfaa);

      if (resp.data.data.assessment) {
        let assessment = resp.data.data.assessment;
        assessment.assessed_date = moment.utc(assessment.assessed_date).format("YYYY-MM-DD");
        assessment.classes_start_date = moment.utc(assessment.classes_start_date).format("YYYY-MM-DD");
        assessment.classes_end_date = moment.utc(assessment.classes_end_date).format("YYYY-MM-DD");
        commit("SET_ASSESSMENT", resp.data.data.assessment);
      } else {
        let dependentCount = 0;
        let familySize = 1;

        // Common-law or Married
        if ([3, 4].includes(state.application.csl_classification)) familySize++;

        if (store.getters.selectedStudent && isArray(store.getters.selectedStudent.dependent_info)) {
          dependentCount = store.getters.selectedStudent.dependent_info.filter(
            (d) => d.is_csl_eligible && d.application_id == state.fundingRequest.application_id
          ).length;
        }
        familySize += dependentCount;

        let dayCareExpenses = state.application?.expenses?.filter((e) => e.category_id == 3);
        let monthlyDayCare = dayCareExpenses.reduce((t, i) => t + i.amount, 0);

        let provinceMax = state.childcare?.find((c) => c.province_id == state.application.study_province_id);
        let dayCareAllowable = provinceMax?.max_amount ?? 0;

        let totalGrants = 0;
        totalGrants += store.getters["csgPartTimeStore/assessedAmount"];
        totalGrants += store.getters["csgPartTimeDependentStore/assessedAmount"];
        totalGrants += store.getters["csgPartTimeDisabilityStore/assessedAmount"];

        let assessment = {
          assessed_date: moment().format("YYYY-MM-DD"),
          classes_start_date: moment.utc(application.classes_start_date).format("YYYY-MM-DD"),
          classes_end_date: moment.utc(application.classes_end_date).format("YYYY-MM-DD"),
          study_months: monthsBetween(application.classes_start_date, application.classes_end_date),
          study_weeks: weeksBetween(application.classes_start_date, application.classes_end_date),
          family_size: familySize,
          dependent_count: dependentCount,
          study_province_id: application.csl_previous_province_id,
          spouse_province_id: application.spouse_last_jurisdiction_id,
          tuition_estimate: application.tuition_estimate_amount,
          books_supplies_cost: application.books_supplies_cost,
          student_ln150_income: application.student_ln150_income,
          spouse_ln150_income: application.spouse_ln150_income,
          spouse_expected_contribution: 0,
          student_expected_contribution: 0,
          parent1_income: 0,
          parent2_income: 0,
          marital_status_id: application.marital_status_id,
          csl_classification: application.csl_classification,
          csl_full_amt_flag: state.fundingRequest?.is_csl_full_amount === true ? 1 : 0,
          study_area_id: application.study_area_id,
          program_id: application.program_id,
          csl_request_amount: state.fundingRequest?.csl_request_amount ?? 0,

          p_trans_month: getters.allowance?.public_tranport_amount ?? 0,
          day_care_allowable: dayCareAllowable,
          day_care_actual: monthlyDayCare,

          assessment_type_id: 1,
          student_contrib_exempt: "N",
          spouse_contrib_exempt: "N",

          total_grant_awarded: totalGrants,
          assessed_amount: 0,
          student_contribution_review: "No",
          spouse_contribution_review: "No",
          parent_contribution_review: "No",
        };
        assessment.period = assessment.study_months <= 4 ? "S" : "P";

        commit("SET_ASSESSMENT", assessment);
      }

      // child store initializers
      await store.dispatch("csgPartTimeStore/initialize", { app: application, assessment: state.assessment });
      await store.dispatch("csgPartTimeDependentStore/initialize", { app: application, assessment: state.assessment });
      await store.dispatch("csgPartTimeDisabilityStore/initialize", { app: application, assessment: state.assessment });
    });
  },

  async recalculate({ state, dispatch, commit }) {
    dispatch("loadCSLPTAssessment", state.fundingRequest.application_id).then(() => {
      let dependentCount = 0;
      let familySize = 1;
      let application = state.application;

      // Common-law or Married
      if ([3, 4].includes(state.application.csl_classification)) familySize++;

      if (store.getters.selectedStudent && isArray(store.getters.selectedStudent.dependent_info)) {
        dependentCount = store.getters.selectedStudent.dependent_info.filter(
          (d) => d.is_csl_eligible && d.application_id == state.fundingRequest.application_id
        ).length;
      }
      familySize += dependentCount;

      let dayCareExpenses = state.application?.expenses?.filter((e) => e.category_id == 3);
      let monthlyDayCare = dayCareExpenses.reduce((t, i) => t + i.amount, 0);

      let provinceMax = state.childcare?.find((c) => c.province_id == state.application.study_province_id);
      let dayCareAllowable = provinceMax?.max_amount ?? 0;

      let totalGrants = 0;
      totalGrants += store.getters["csgPartTimeStore/assessedAmount"];
      totalGrants += store.getters["csgPartTimeDependentStore/assessedAmount"];
      totalGrants += store.getters["csgPartTimeDisabilityStore/assessedAmount"];

      let assessment = {
        assessed_date: moment().format("YYYY-MM-DD"),
        classes_start_date: moment.utc(application.classes_start_date).format("YYYY-MM-DD"),
        classes_end_date: moment.utc(application.classes_end_date).format("YYYY-MM-DD"),
        study_months: monthsBetween(application.classes_start_date, application.classes_end_date),
        study_weeks: weeksBetween(application.classes_start_date, application.classes_end_date),
        family_size: familySize,
        dependent_count: dependentCount,
        study_province_id: application.csl_previous_province_id,
        spouse_province_id: application.spouse_last_jurisdiction_id,
        tuition_estimate: application.tuition_estimate_amount,
        books_supplies_cost: application.books_supplies_cost,
        student_ln150_income: application.student_ln150_income,
        spouse_ln150_income: application.spouse_ln150_income,
        spouse_expected_contribution: 0,
        student_expected_contribution: 0,
        parent1_income: 0,
        parent2_income: 0,
        marital_status_id: application.marital_status_id,
        csl_classification: application.csl_classification,
        csl_full_amt_flag: state.fundingRequest?.is_csl_full_amount === true ? 1 : 0,
        study_area_id: application.study_area_id,
        program_id: application.program_id,
        csl_request_amount: state.fundingRequest?.csl_request_amount ?? 0,

        p_trans_month: getters.allowance?.public_tranport_amount ?? 0,
        day_care_allowable: dayCareAllowable,
        day_care_actual: monthlyDayCare,

        assessment_type_id: 1,
        student_contrib_exempt: "N",
        spouse_contrib_exempt: "N",

        total_grant_awarded: totalGrants,
        assessed_amount: 0,
        student_contribution_review: "No",
        spouse_contribution_review: "No",
        parent_contribution_review: "No",
      };
      assessment.period = assessment.study_months <= 4 ? "S" : "P";

      console.log(assessment);

      commit("SET_ASSESSMENT", assessment);
      dispatch("save");
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

  async addDisbursement({ state }) {
    state.disbursements.push({
      disbursement_type_id: 4,
      issue_date: moment().format("YYYY-MM-DD"), // today
    });
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
          dispatch("loadCSLPTAssessment", state.fundingRequest.application_id);
        });
    } else {
      axios
        .post(
          `${CSG_THRESHOLD_URL}/csgftdep/${state.fundingRequest.application_id}/funding-request/${state.fundingRequest.id}/assessment`,
          state.assessment
        )
        .then((resp) => {
          dispatch("loadCSLPTAssessment", state.fundingRequest.application_id);
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
        dispatch("loadCSLPTAssessment", state.application.id);
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
