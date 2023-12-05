import axios from "axios";
import { ADMIN_REPORT_URL } from "@/urls";

const state = {
  reportOptions: [
    {
      text: "STA Report - Yukon University",
      url: "/staYukonUniversity",
      downloadFormat: [".pdf"],
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
      downloadFormat: [".csv"],
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
      downloadFormat: [".csv"],
      headers: [
        { text: "Scholarship", value: "scholarship" },
        { text: "First name", value: "firstName" },
        { text: "Last name", value: "lastName" },
        { text: "Program", value: "program" },
        { text: "Academic Percentage", value: "academicPercent" },
      ],
    },
    {
      text: "NARS FT 2022",
      url: "/nars2022",
      downloadFormat: [".csv", ".txt"],
      headers: [
        { text: "loanyear", value: "loanyear" },
        { text: "prov_issue", value: "prov_issue" },
        { text: "app_number", value: "app_number" },
        { text: "version_num", value: "version_num" },
        { text: "app_status", value: "app_status" },
        { text: "assess_date", value: "assess_date" },
        { text: "reasess_indicator", value: "reasess_indicator" },
        { text: "csl_auth_date", value: "csl_auth_date" },
        { text: "sin", value: "sin" },
        { text: "dob", value: "dob" },
        { text: "sex_code", value: "sex_code" },
        { text: "cat_code", value: "cat_code" },
        { text: "single_ind_stat_reas", value: "single_ind_stat_reas" },
        { text: "social_assist_flag", value: "social_assist_flag" },
        { text: "disab_flag", value: "disab_flag" },
        { text: "disab_sr_status", value: "disab_sr_status" },
        { text: "indigenous_flag", value: "indigenous_flag" },
        { text: "indigenous_cat", value: "indigenous_cat" },
        { text: "visible_ind", value: "visible_ind" },
        { text: "parent1_postal", value: "parent1_postal" },
        { text: "parent2_postal", value: "parent2_postal" },
        { text: "spouse_sin", value: "spouse_sin" },
        { text: "spouse_student", value: "spouse_student" },
        { text: "spouse_num_sp_weeks", value: "spouse_num_sp_weeks" },
        { text: "family_size", value: "family_size" },
        { text: "num_dep_child_pse", value: "num_dep_child_pse" },
        { text: "depchild_to_11_and_dis_12over", value: "depchild_to_11_and_dis_12over" },
        { text: "depchild_12over_ndis_andothdep", value: "depchild_12over_ndis_andothdep" },
        { text: "res_postal", value: "res_postal" },
        { text: "sp_away_home", value: "sp_away_home" },
        { text: "ei_code", value: "ei_code" },
        { text: "pos", value: "pos" },
        { text: "pos2", value: "pos2" },
        { text: "program_type", value: "program_type" },
        { text: "year_study", value: "year_study" },
        { text: "year_in_program", value: "year_in_program" },
        { text: "program_duration", value: "program_duration" },
        { text: "pscd", value: "pscd" },
        { text: "psed", value: "psed" },
        { text: "num_sp_assess_weeks", value: "num_sp_assess_weeks" },
        { text: "perc_full_course_load", value: "perc_full_course_load" },
        { text: "early_withdrawal_ind", value: "early_withdrawal_ind" },
        { text: "date_left_high_school", value: "date_left_high_school" },
        { text: "stud_sp_inc_targ_fund_total", value: "stud_sp_inc_targ_fund_total" },
        { text: "stud_sp_inc_mbsa_tot", value: "stud_sp_inc_mbsa_tot" },
        { text: "stud_gross_annual_inc", value: "stud_gross_annual_inc" },
        { text: "stud_gross_annual_inc_reassess", value: "stud_gross_annual_inc_reassess" },
        { text: "parent1_gross_ann_inc", value: "parent1_gross_ann_inc" },
        { text: "parent1_net_ann_inc", value: "parent1_net_ann_inc" },
        { text: "parent1_cpp_cont", value: "parent1_cpp_cont" },
        { text: "parent1_ei_prem", value: "parent1_ei_prem" },
        { text: "parent1_inc_tax_paid", value: "parent1_inc_tax_paid" },
        { text: "parent1_tot_tax_inc", value: "parent1_tot_tax_inc" },
        { text: "parent1_gross_ann_inc_reassess", value: "parent1_gross_ann_inc_reassess" },
        { text: "parent1_net_ann_inc_reassess", value: "parent1_net_ann_inc_reassess" },
        { text: "parent2_gross_ann_inc", value: "parent2_gross_ann_inc" },
        { text: "parent2_net_ann_inc", value: "parent2_net_ann_inc" },
        { text: "parent2_cpp_cont", value: "parent2_cpp_cont" },
        { text: "parent2_ei_prem", value: "parent2_ei_prem" },
        { text: "parent2_inc_tax_paid", value: "parent2_inc_tax_paid" },
        { text: "parent2_tot_tax_inc", value: "parent2_tot_tax_inc" },
        { text: "parent2_gross_ann_inc_reassess", value: "parent2_gross_ann_inc_reassess" },
        { text: "parent2_net_ann_inc_reassess", value: "parent2_net_ann_inc_reassess" },
        { text: "spouse_gross_annual_inc", value: "spouse_gross_annual_inc" },
        { text: "spouse_gross_annual_inc_reassess", value: "spouse_gross_annual_inc_reassess" },
        { text: "stud_cont_targfund", value: "stud_cont_targfund" },
        { text: "stud_cont_bsa", value: "stud_cont_bsa" },
        { text: "fs_cont_amt", value: "fs_cont_amt" },
        { text: "parent_cont", value: "parent_cont" },
        { text: "frspousal_cont_amt", value: "frspousal_cont_amt" },
        { text: "other_resources", value: "other_resources" },
        { text: "tot_ass_res", value: "tot_ass_res" },
        { text: "fs_cont_exempt_indig", value: "fs_cont_exempt_indig" },
        { text: "fs_cont_exempt_pd", value: "fs_cont_exempt_pd" },
        { text: "fs_cont_exempt_dependant", value: "fs_cont_exempt_dependant" },
        { text: "fs_cont_exempt_crown", value: "fs_cont_exempt_crown" },
        { text: "frspouse_cont_exempt_stud", value: "frspouse_cont_exempt_stud" },
        { text: "frspouse_cont_exempt_ei", value: "frspouse_cont_exempt_ei" },
        { text: "frspouse_cont_exempt_sa", value: "frspouse_cont_exempt_sa" },
        { text: "frspouse_cont_exempt_db", value: "frspouse_cont_exempt_db" },
        { text: "fs_cont_review_flag", value: "fs_cont_review_flag" },
        { text: "parental_cont_review_flag", value: "parental_cont_review_flag" },
        { text: "frspouse_cont_review_flag", value: "frspouse_cont_review_flag" },
        { text: "stud_sp_cost_living_allow", value: "stud_sp_cost_living_allow" },
        { text: "stud_sp_cost_tuition", value: "stud_sp_cost_tuition" },
        { text: "stud_sp_cost_comp_fee", value: "stud_sp_cost_comp_fee" },
        { text: "stud_sp_cost_computers", value: "stud_sp_cost_computers" },
        { text: "stud_sp_cost_allow_book", value: "stud_sp_cost_allow_book" },
        { text: "stud_sp_cost_allow_child", value: "stud_sp_cost_allow_child" },
        { text: "stud_sp_cost_ret_transp", value: "stud_sp_cost_ret_transp" },
        { text: "stud_sp_cost_other_trans", value: "stud_sp_cost_other_trans" },
        { text: "stud_sp_cost_other", value: "stud_sp_cost_other" },
        { text: "tot_ass_cost", value: "tot_ass_cost" },
        { text: "req_need", value: "req_need" },
        { text: "tot_calc_need", value: "tot_calc_need" },
        { text: "ass_csl_bef_overa", value: "ass_csl_bef_overa" },
        { text: "ass_psl_bef_overa", value: "ass_psl_bef_overa" },
        { text: "csl_over_award_recovered", value: "csl_over_award_recovered" },
        { text: "psl_over_award_recovered", value: "psl_over_award_recovered" },
        { text: "auth_csl_amt", value: "auth_csl_amt" },
        { text: "auth_psl_amt", value: "auth_psl_amt" },
        { text: "csg_ft", value: "csg_ft" },
        { text: "csg_ftdep", value: "csg_ftdep" },
        { text: "csg_d", value: "csg_d" },
        { text: "csg_dse", value: "csg_dse" },
        { text: "topup_fund", value: "topup_fund" },
        { text: "prov_grant_burs_schol_amt", value: "prov_grant_burs_schol_amt" },
        { text: "prov_unmet_need_grant_auth_amt", value: "prov_unmet_need_grant_auth_amt" },
        { text: "other_prov_assist", value: "other_prov_assist" },
        { text: "tot_assist", value: "tot_assist" },
        { text: "unmet_need", value: "unmet_need" },
      ],
    },
    {
      text: "NARS PT 2022",
      url: "/nars2022pt",
      downloadFormat: [".csv", ".txt"],
      headers: [
        { text: "loanyear", value: "loanyear" },
        { text: "prov_issue", value: "prov_issue" },
        { text: "app_number", value: "app_number" },
        { text: "version_num", value: "version_num" },
        { text: "app_status", value: "app_status" },
        { text: "assess_date", value: "assess_date" },
        { text: "reasess_indicator", value: "reasess_indicator" },
        { text: "csl_auth_date", value: "csl_auth_date" },
        { text: "sin", value: "sin" },
        { text: "dob", value: "dob" },
        { text: "sex_code", value: "sex_code" },
        { text: "cat_code", value: "cat_code" },
        { text: "single_ind_stat_reas", value: "single_ind_stat_reas" },
        { text: "social_assist_flag", value: "social_assist_flag" },
        { text: "disab_flag", value: "disab_flag" },
        { text: "disab_sr_status", value: "disab_sr_status" },
        { text: "indigenous_flag", value: "indigenous_flag" },
        { text: "indigenous_cat", value: "indigenous_cat" },
        { text: "visible_ind", value: "visible_ind" },
        { text: "parent1_postal", value: "parent1_postal" },
        { text: "parent2_postal", value: "parent2_postal" },
        { text: "spouse_sin", value: "spouse_sin" },
        { text: "spouse_student", value: "spouse_student" },
        { text: "spouse_num_sp_weeks", value: "spouse_num_sp_weeks" },
        { text: "family_size", value: "family_size" },
        { text: "num_dep_child_pse", value: "num_dep_child_pse" },
        { text: "depchild_to_11_and_dis_12over", value: "depchild_to_11_and_dis_12over" },
        { text: "depchild_12over_ndis_andothdep", value: "depchild_12over_ndis_andothdep" },
        { text: "res_postal", value: "res_postal" },
        { text: "sp_away_home", value: "sp_away_home" },
        { text: "ei_code", value: "ei_code" },
        { text: "pos", value: "pos" },
        { text: "pos2", value: "pos2" },
        { text: "program_type", value: "program_type" },
        { text: "year_study", value: "year_study" },
        { text: "year_in_program", value: "year_in_program" },
        { text: "program_duration", value: "program_duration" },
        { text: "pscd", value: "pscd" },
        { text: "psed", value: "psed" },
        { text: "num_sp_assess_weeks", value: "num_sp_assess_weeks" },
        { text: "perc_full_course_load", value: "perc_full_course_load" },
        { text: "early_withdrawal_ind", value: "early_withdrawal_ind" },
        { text: "date_left_high_school", value: "date_left_high_school" },
        { text: "stud_sp_inc_targ_fund_total", value: "stud_sp_inc_targ_fund_total" },
        { text: "stud_sp_inc_mbsa_tot", value: "stud_sp_inc_mbsa_tot" },
        { text: "stud_gross_annual_inc", value: "stud_gross_annual_inc" },
        { text: "stud_gross_annual_inc_reassess", value: "stud_gross_annual_inc_reassess" },
        { text: "parent1_gross_ann_inc", value: "parent1_gross_ann_inc" },
        { text: "parent1_net_ann_inc", value: "parent1_net_ann_inc" },
        { text: "parent1_cpp_cont", value: "parent1_cpp_cont" },
        { text: "parent1_ei_prem", value: "parent1_ei_prem" },
        { text: "parent1_inc_tax_paid", value: "parent1_inc_tax_paid" },
        { text: "parent1_tot_tax_inc", value: "parent1_tot_tax_inc" },
        { text: "parent1_gross_ann_inc_reassess", value: "parent1_gross_ann_inc_reassess" },
        { text: "parent1_net_ann_inc_reassess", value: "parent1_net_ann_inc_reassess" },
        { text: "parent2_gross_ann_inc", value: "parent2_gross_ann_inc" },
        { text: "parent2_net_ann_inc", value: "parent2_net_ann_inc" },
        { text: "parent2_cpp_cont", value: "parent2_cpp_cont" },
        { text: "parent2_ei_prem", value: "parent2_ei_prem" },
        { text: "parent2_inc_tax_paid", value: "parent2_inc_tax_paid" },
        { text: "parent2_tot_tax_inc", value: "parent2_tot_tax_inc" },
        { text: "parent2_gross_ann_inc_reassess", value: "parent2_gross_ann_inc_reassess" },
        { text: "parent2_net_ann_inc_reassess", value: "parent2_net_ann_inc_reassess" },
        { text: "spouse_gross_annual_inc", value: "spouse_gross_annual_inc" },
        { text: "spouse_gross_annual_inc_reassess", value: "spouse_gross_annual_inc_reassess" },
        { text: "stud_cont_targfund", value: "stud_cont_targfund" },
        { text: "stud_cont_bsa", value: "stud_cont_bsa" },
        { text: "fs_cont_amt", value: "fs_cont_amt" },
        { text: "parent_cont", value: "parent_cont" },
        { text: "frspousal_cont_amt", value: "frspousal_cont_amt" },
        { text: "other_resources", value: "other_resources" },
        { text: "tot_ass_res", value: "tot_ass_res" },
        { text: "fs_cont_exempt_indig", value: "fs_cont_exempt_indig" },
        { text: "fs_cont_exempt_pd", value: "fs_cont_exempt_pd" },
        { text: "fs_cont_exempt_dependant", value: "fs_cont_exempt_dependant" },
        { text: "fs_cont_exempt_crown", value: "fs_cont_exempt_crown" },
        { text: "frspouse_cont_exempt_stud", value: "frspouse_cont_exempt_stud" },
        { text: "frspouse_cont_exempt_ei", value: "frspouse_cont_exempt_ei" },
        { text: "frspouse_cont_exempt_sa", value: "frspouse_cont_exempt_sa" },
        { text: "frspouse_cont_exempt_db", value: "frspouse_cont_exempt_db" },
        { text: "fs_cont_review_flag", value: "fs_cont_review_flag" },
        { text: "parental_cont_review_flag", value: "parental_cont_review_flag" },
        { text: "frspouse_cont_review_flag", value: "frspouse_cont_review_flag" },
        { text: "stud_sp_cost_living_allow", value: "stud_sp_cost_living_allow" },
        { text: "stud_sp_cost_tuition", value: "stud_sp_cost_tuition" },
        { text: "stud_sp_cost_comp_fee", value: "stud_sp_cost_comp_fee" },
        { text: "stud_sp_cost_computers", value: "stud_sp_cost_computers" },
        { text: "stud_sp_cost_allow_book", value: "stud_sp_cost_allow_book" },
        { text: "stud_sp_cost_allow_child", value: "stud_sp_cost_allow_child" },
        { text: "stud_sp_cost_ret_transp", value: "stud_sp_cost_ret_transp" },
        { text: "stud_sp_cost_other_trans", value: "stud_sp_cost_other_trans" },
        { text: "stud_sp_cost_other", value: "stud_sp_cost_other" },
        { text: "tot_ass_cost", value: "tot_ass_cost" },
        { text: "req_need", value: "req_need" },
        { text: "tot_calc_need", value: "tot_calc_need" },
        { text: "ass_csl_bef_overa", value: "ass_csl_bef_overa" },
        { text: "ass_psl_bef_overa", value: "ass_psl_bef_overa" },
        { text: "csl_over_award_recovered", value: "csl_over_award_recovered" },
        { text: "psl_over_award_recovered", value: "psl_over_award_recovered" },
        { text: "auth_csl_amt", value: "auth_csl_amt" },
        { text: "auth_psl_amt", value: "auth_psl_amt" },
        { text: "csg_ft", value: "csg_ft" },
        { text: "csg_ftdep", value: "csg_ftdep" },
        { text: "csg_d", value: "csg_d" },
        { text: "csg_dse", value: "csg_dse" },
        { text: "topup_fund", value: "topup_fund" },
        { text: "prov_grant_burs_schol_amt", value: "prov_grant_burs_schol_amt" },
        { text: "prov_unmet_need_grant_auth_amt", value: "prov_unmet_need_grant_auth_amt" },
        { text: "other_prov_assist", value: "other_prov_assist" },
        { text: "tot_assist", value: "tot_assist" },
        { text: "unmet_need", value: "unmet_need" },
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
  async downloadReport({ state }, format) {
    if (state.selectedReport) {
      let url = makeUrl(state.selectedReport);
      if (url) window.open(`${ADMIN_REPORT_URL}${url}${format}`);
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
