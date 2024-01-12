import { DB_CONFIG } from "@/config";
import { weeksBetween } from "@/utils/date-utils";
import knex from "knex";
import { isNumber, isUndefined } from "lodash";
import moment from "moment";

const db = knex(DB_CONFIG);

const CSLFT_REQUEST_TYPE_ID = 4;

const CSGTU_REQUEST_TYPE_ID = 28;
const CSGD_REQUEST_TYPE_ID = 29;
const CSGDSE_REQUEST_TYPE_ID = 30;
const CSFTDEP_REQUEST_TYPE_ID = 32;
const CSGFT_REQUEST_TYPE_ID = 35;

export class ApprovedFundingReportingService {
  startDate: Date;
  endDate: Date;
  year: number;

  reportData = new Array<Row>();

  allApplications: any;
  allFundingRequests: any;
  allAssessments: any;
  allDisbursements: any;

  constructor({ startDate, endDate, year }: NarsV17ReportingServiceParams) {
    this.startDate = startDate;
    (this.endDate = endDate), (this.year = year);
  }

  async runReport() {
    this.allApplications = await db("narsv17base").where({ academic_year_id: 2022 }); //.where({ id: 31665 });

    /* this.allApplications = await db.raw(`
    select 
    person.sex_id, person.sin, person.birth_date, 
    spouse_person.sin as spouse_sin, 
    parent1_person.sin as parent1_sin,
    parent2_person.sin as parent2_sin,
    person_address.postal_code as primary_postal_code,
    field_program.field_program_code,
    funding_request.status_id AS funding_request_status_id,
    
    student.indigenous_learner_id, student.high_school_left_year, student.high_school_left_month, student.is_crown_ward,
    application.academic_year_id, COALESCE(institution.federal_institution_code, institution_campus.federal_institution_code ) institution_code , application.aboriginal_status_id,  
    application.category_id, application.primary_address_id, application.parent1_net_income,
     application.parent2_net_income,  application.spouse_study_school_from, application.spouse_study_school_to,
    application.is_spouse_study_csl, application.spouse_study_emp_status_id, application.is_minority, application.is_disabled,
    application.program_year_total, application.program_year,  application.prestudy_city_id, application.study_city_id, application.is_perm_disabled, 
    application.permanent_disability, application.pers_or_prolong_disability, 
    application.tuition_estimate_amount, application.percent_of_full_time,
    assessment.*, d.disbursed, parent_address.postal_code as parent_postal_code,

    funding_request.is_csg_only, funding_request.is_csl_full_amount, funding_request.csl_request_amount
    
    from sfa.student
      INNER JOIN sfa.person ON (student.person_id = person.id)
      INNER JOIN sfa.application ON (student.id = application.student_id)
      INNER JOIN sfa.funding_request ON (application.id = funding_request.application_id)
      INNER JOIN sfa.assessment ON (funding_request.id = assessment.funding_request_id)
      INNER JOIN sfa.institution_campus ON (application.institution_campus_id = institution_campus.id)
      INNER JOIN sfa.institution ON (institution.id = institution_campus.institution_id)
      LEFT JOIN sfa.person spouse_person ON (application.spouse_id = spouse_person.id)
      LEFT JOIN sfa.person parent1_person ON (application.parent1_id = parent1_person.id)
      LEFT JOIN sfa.person parent2_person ON (application.parent2_id = parent2_person.id)
      LEFT JOIN sfa.person_address ON (application.primary_address_id = person_address.id)
      LEFT JOIN (select person_id, MAX(postal_code) postal_code from sfa.person_address where address_type_id = 4 AND postal_code IS NOT NULL GROUP BY person_id) parent_address ON (person.id = parent_address.person_id )
      INNER JOIN sfa.study_area ON (application.study_area_id = study_area.id)
      INNER JOIN sfa.study_field ON (study_area.study_field_id = study_field.id)
      INNER JOIN sfa.field_program ON (application.program_id = field_program.program_id AND study_field.id = field_program.study_field_id)
      LEFT JOIN (SELECT SUM(COALESCE(paid_amount, 0)) disbursed, max(issue_date) issue_date, funding_request_id, assessment_id 
        FROM sfa.disbursement WHERE financial_batch_serial_no IS NOT NULL GROUP BY assessment_id, funding_request_id) d ON (funding_request.id = d.funding_request_id and assessment.id = d.assessment_id)
    where
      funding_request.request_type_id = 4`); */

    /* let studentIds = this.allApplications.map((a: any) => a.studentId);
    let appIds = this.allApplications.map((a: any) => a.id);

    this.allFundingRequests = await db("fundingRequest").whereIn("applicationId", appIds);

    let fundingIds = this.allFundingRequests.map((f: any) => f.id);

    this.allAssessments = await db("assessment").whereIn("fundingRequestId", fundingIds);
    this.allDisbursements = await db("disbursement").whereIn("fundingRequestId", fundingIds);

    let students = await db("student")
      .innerJoin("person", "person.id", "student.personId")
      .whereIn("student.id", studentIds)
      .select("student.*", "person.firstName", "person.lastName", "person.sin", "person.sexId", "person.birthDate");
 */
    for (let student of this.allApplications) {
      let rows = await this.makeRows(student);
      this.reportData.push(...rows);
    }

    return this.reportData;
  }

  async makeRows(app: any): Promise<Row[]> {
    let result = new Array<Row>();

    console.log(app);

    let num_dep_child_pse = 0;
    let depchild_to_11_and_dis_12over = 0;
    let depchild_12over_ndis_andothdep = 0;
    let hasDependents = "N";

    let cat_code =
      app.csl_classification == 3
        ? "1"
        : app.csl_classification == 4
        ? "2"
        : [2, 5].includes(app.csl_classification)
        ? 3
        : 4;

    let single_ind_stat_reas = app.csl_classification == 2 ? "1" : app.csl_classification == 5 ? "2" : ".";
    let indigenous_flag = [2, 3, 5, 6, 7, 8, 9, 10].includes(app.aboriginal_status_id) ? "Y" : "N";
    let indigenous_cat =
      app.aboriginal_status_id == 6
        ? "5"
        : app.aboriginal_status_id == 7
        ? "4"
        : [9, 10].includes(app.aboriginal_status_id)
        ? "2"
        : [5, 8].includes(app.aboriginal_status_id)
        ? "1"
        : ".";

    let res_postal = app.primary_postal_code ? app.primary_postal_code.replace(" ", "").replace("-", "") : "XXXXXX";
    let parent_postal = app.parent_postal_code ? app.parent_postal_code.replace(" ", "").replace("-", "") : "XXXXXX";

    let program_type =
      app.program_id == 6 ? 5 : app.program_id == 5 ? 4 : app.program_id == 4 ? 3 : app.program_id == 3 ? 2 : 1;

    let date_left_high_school = moment(
      `${app.high_school_left_year}-${`${app.high_school_left_month ?? 6}`.padStart(2, "0")}-01`
    ).format("YYYYMMDD");
    let app_status = [7, 40].includes(app.funding_request_status_id)
      ? "A"
      : app.funding_request_status_id == 4
      ? "R"
      : "P";

    let spouse_num_sp_weeks =
      app.spouse_study_school_from && app.spouse_study_school_to
        ? weeksBetween(app.spouse_study_school_from, app.spouse_study_school_to)
        : "";

    let spouse_student = cat_code == 1 && isNumber(spouse_num_sp_weeks) ? "Y" : "N";

    let stud_sp_cost_ret_transp = app.study_weeks <= 16 ? app.r_trans_16wk : app.r_trans_16wk * 2;

    let appId = await db("sfa.funding_request").where({ id: app.funding_request_id }).select("application_id").first();
    let csl_ft = 0;
    let csg_ft = 0;
    let csg_ftdep = 0;
    let csg_d = 0;
    let csg_dse = 0;
    let topup_fund = 0;

    let provGrants = 0;

    let stud_sp_cost_living_allow = 0;
    let stud_sp_cost_computers = 0;
    let stud_sp_cost_other = 0;
    let stud_sp_inc_mbsa_tot = 0;
    let stud_cont_targfund = 0;

    if (appId) {
      let applicationId = appId.application_id;
      let deps = await db("sfa.dependent")
        .innerJoin("sfa.dependent_eligibility", "dependent.id", "dependent_eligibility.dependent_id")
        .where({ application_id: applicationId, is_csl_eligible: true });

      let parentDeps = await db("sfa.parent_dependent").where({ application_id: applicationId, is_eligible: true });
      let depCounts = 0;

      for (let dep of deps) {
        hasDependents = "Y";
        if (dep.is_disability) {
          depchild_to_11_and_dis_12over++;
          depCounts++;
        } else if (dep.birth_date) {
          let age = moment().diff(dep.birth_date, "years");
          if (age < 12) {
            depchild_to_11_and_dis_12over++;
            depCounts++;
          }
        }
      }

      // Dependent
      if (cat_code == 4) {
        num_dep_child_pse = 1 + parentDeps.filter((d) => d.is_attend_post_secondary).length;
        depchild_12over_ndis_andothdep = 1 + parentDeps.length - depCounts;
      } // Married or single parent
      else if (cat_code == 1 || cat_code == 2) {
        num_dep_child_pse = 1 + deps.filter((d) => d.is_post_secondary).length;
        depchild_12over_ndis_andothdep = deps.length - depCounts;
      }

      let otherFunds = await db("sfa.funding_request")
        .where({ application_id: applicationId })
        .join("sfa.disbursement", "disbursement.funding_request_id", "funding_request.id")
        .select("request_type_id")
        .groupBy("request_type_id")
        .sum("disbursed_amount as disbursed_amount");

      let ftLoan = otherFunds.find((f) => f.request_type_id == 4);
      let ftGrant = otherFunds.find((f) => f.request_type_id == 35);
      let ftDepGrant = otherFunds.find((f) => f.request_type_id == 32);
      let disGrant = otherFunds.find((f) => f.request_type_id == 29);
      let disSEGrant = otherFunds.find((f) => f.request_type_id == 30);
      let topup = otherFunds.find((f) => f.request_type_id == 28);

      if (ftLoan) csl_ft = Math.ceil(ftLoan.disbursed_amount);
      if (ftGrant) csg_ft = Math.ceil(ftGrant.disbursed_amount);
      if (ftDepGrant) csg_ftdep = Math.ceil(ftDepGrant.disbursed_amount);
      if (disGrant) csg_d = Math.ceil(disGrant.disbursed_amount);
      if (disSEGrant) csg_dse = Math.ceil(disSEGrant.disbursed_amount);
      if (topup) topup_fund = Math.ceil(topup.disbursed_amount);

      let provGr = otherFunds.filter((f) => [1, 2, 3].includes(f.request_type_id));
      provGrants = provGr.map((f) => f.disbursed_amount).reduce((a, f) => a + f, 0);

      let expenses = await db("sfa.expense").where({ application_id: applicationId });
      let compExp = expenses.find((e) => e.category_id == 14);
      if (compExp) stud_sp_cost_computers = Math.ceil(compExp.amount);

      let incomes = await db("sfa.income").where({ application_id: applicationId });
      let scholarshipIncome = incomes.find((e) => e.income_type_id == 16); // Scholarships - Merit Based
      if (scholarshipIncome)
        stud_sp_inc_mbsa_tot = scholarshipIncome
          .map((f: any) => f.amount ?? 0)
          .reduce((a: number, f: number) => a + f, 0);

      let targetedResourcesIncome = incomes.find((e) => e.income_type_id == 3 || e.income_type_id == 10); // EI and HRDC
      if (targetedResourcesIncome)
        stud_cont_targfund = targetedResourcesIncome
          .map((f: any) => f.amount ?? 0)
          .reduce((a: number, f: number) => a + f, 0);
    } else {
      console.log("NO APP");
    }

    // costs
    let totalCosts = 0;
    totalCosts += app.tuition_estimate;
    totalCosts += Math.min(2700, Math.ceil(app.books_supplies_cost));
    totalCosts += app.shelter_month * app.study_months;
    totalCosts += app.p_trans_month * app.study_months;
    totalCosts += Math.ceil(app.day_care_actual * app.study_months);
    totalCosts += stud_sp_cost_ret_transp;
    totalCosts += app.x_trans_total;
    totalCosts += app.relocation_total;

    stud_sp_cost_living_allow = app.shelter_month * app.study_months + app.p_trans_month * app.study_months;

    stud_sp_cost_other =
      (app.depend_food_allowable + app.depend_tran_allowable) * app.study_months + app.discretionary_cost_actual;

    totalCosts += stud_sp_cost_other;
    stud_sp_cost_other -= stud_sp_cost_computers;

    let totalGrants = csg_ft + csg_ftdep + csg_d + topup_fund;

    let req_need = app.csl_request_amount;
    let tot_ass_res = app.student_expected_contribution;

    if (app.is_csg_only) req_need = 0;
    else if (app.is_csl_full_amount) req_need = app.study_weeks * 210;
    /*
    Academic Year  
    SFA ID       
    Last Name         
    First Name         
    Gender
    Age       
    Ethnicity              
    First Nation        
    # of Applications              
    Marital Status   
    YG Category       
    Yukon Grant Amount     
    Student Training Allowance Amount       
    Yukon Excellence Award Amount              
    Canada Student Loan Full Time Amount
    Canada Student Grant Full Time Amount              
    Canada Student Grant Low Income Amount        
    CSG Middle Income Amount / CSL Top Up             
    Canada Student Grant Full Time Dependents Amount     
    Canada Student Grant Special Equipment Amount            
    Canada Student Grant Permanent Disabilities Amount    
    Canada Student Grant Persistent Disabilities Amount      
    Canada Student Loan Part Time Amount
    Canada Student Grant Part Time Amount             
    Canada Student Grant Part Time Dependents Amount    
    Canadian Army Scholarship Amount       
    Nicholas John Harach Scholarship Amount           
    Yukon Art Society Scholarship Amount   
    Yukon Huskys Scholarship Amount
    CB Radio Club Scholarship Amount          
    Total Government Amount          
    Total Amount (including scholarships)    
    Institution Name             
    Institution Country         
    Institution Province        
    Institution Level
    Year of Program
    Program Name 
    Program Type   
    Study Field         
    Yukon Residence Since (Y/M)      
    Left High School (Y/M)  
    # STA Eligible Dependents            
    # CSL Dependents 0-11 
    # CSL Dependents 12+   
    # CSL Total Dependents
    CSL Family Size 
    Resides with Parent Count           
    Pre Study CSL Classification         
    Pre Study Accomodation              
    Study CSL Classification 
    Study Accomodation     
    Student PreStudy Period Income              
    Spouse PreStudy Period Income
    Student Study Period Income     
    Spouse Study Period Income      
    CSL Parent 1 Income      
    CSL Parent 2 Income      
    CSL Study Weeks             
    CSL Assessed Resources
    CSL Assessed Expenses  
    CSL Assessed Need         
    CSL Before Overaward  
    Home Address 1
    Home Address 2
    Home City
    Home Prov
    Home Country
    Home Postal Code
    Home Email Home
    Phone Mailing Address 1
    Mailing Address 2
    Mailing City
    Mailing Prov
    Mailing Country
    Mailing Postal Code
    School Email
    School Email
    1st Assessment Created by
    1st Assessment Created date
    1st Assessment Updated by
    1st Assessment Updated date
    Last Re-Assessment Created by
    Last Re-Assessment Created date
    Last Re-Assessment Updated by Last
    Re-Assessment Updated date
    */
    return result;
  }
}

export interface NarsV17ReportingServiceParams {
  startDate: Date;
  endDate: Date;
  year: number;
}

export class Row {
  columns = new Array<Column>();

  push(column: Column) {
    this.columns.push(column);
  }

  toJson() {
    let output = {} as any;
    for (let col of this.columns) {
      output[col.field] = col.output;
    }
    return output;
  }

  toString() {
    let output = "";
    for (let col of this.columns) {
      output += col.toString();
    }
    return output;
  }

  toCsv() {
    let output = "";
    for (let col of this.columns) {
      output += col.toCsv();
    }
    return output;
  }
}

export class Column {
  readonly field: string;
  readonly rawValue: string;
  readonly length: number;
  output: string;

  constructor(field: string, value: string | number, fill: string, length: number) {
    this.field = field;
    this.rawValue = `${value}`.trim();
    this.length = length;
    //this.output = `${value}`;

    if (fill == "+") this.output = "+" + this.rawValue.padStart(length - 1, "0").substring(0, length);
    else if (fill == "0")
      this.output =
        this.rawValue.length == 0
          ? ".".padEnd(length, " ").substring(0, length)
          : this.rawValue.padEnd(length, " ").substring(0, length);
    else if (fill == ".")
      this.output =
        this.rawValue.length == 0
          ? ".".padEnd(length, " ").substring(0, length)
          : this.rawValue.padEnd(length, " ").substring(0, length);
    else this.output = this.rawValue.padEnd(length, fill).substring(0, length);
  }

  toString() {
    return this.output;
  }
  toJson() {
    return { field: this.field, rawValue: this.rawValue };
  }
  toCsv() {
    return `${this.output},`;
  }
}
