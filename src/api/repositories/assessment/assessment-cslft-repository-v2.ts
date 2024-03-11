import { cleanNumber } from "@/models";
import { monthsBetween, weeksBetween } from "@/utils/date-utils";
import { Knex } from "knex";
import { isEmpty } from "lodash";
import moment from "moment";

export class AssessmentCslftRepositoryV2 {
  readonly db;

  fundingRequest: any;
  application: any;
  student: any;
  assessments: any[] = [];
  dependents: any[] = [];
  expenses: any[] = [];
  incomes: any[] = [];
  disbursements: any[] = [];
  otherFunds: any[] = [];
  csgThreshold: any[] = [];
  csgLookup: any;
  cslLookup: any;
  childcareCeiling: any;
  livingAllowance: any;
  dependentAllowance: any;
  studentCategories: any[] = [];

  output: any;

  constructor(db: Knex) {
    this.db = db;
  }

  async loadExisting(input: any, applicationId: number | string) {
    await this.loadApplication(applicationId);
    await this.loadLookups();

    input.pstudy_weeks = weeksBetween(input.pstudy_start_date, input.pstudy_end_date);
    input.pstudy_months = monthsBetween(input.pstudy_start_date, input.pstudy_end_date);

    input.cslft_scholastic_total = cleanDollars(input.tuition_estimate + input.books_supplies_cost);

    input.shelter_total = cleanDollars(input.study_months * input.shelter_month);
    input.p_trans_total = cleanDollars(input.study_months * input.p_trans_month);
    input.r_trans_total = cleanDollars(input.r_trans_16wk * (input.study_weeks > 16 ? 2 : 1));
    input.day_care_total = cleanDollars(input.study_months * Math.min(input.day_care_allowable, input.day_care_actual));
    input.depend_food_total = cleanDollars(input.study_months * input.depend_food_allowable);
    input.depend_tran_total = cleanDollars(input.study_months * input.depend_tran_allowable);
    input.discretionary_cost_total = cleanDollars(Math.min(input.discretionary_cost, input.discretionary_cost_actual));

    let expensesToSkip = [3, 11, 15, 16]; // daycare, discretionary, tuition, books

    let uncapped = await this.db("sfa.expense")
      .innerJoin("sfa.expense_category", "expense_category.id", "expense.category_id")
      .select("expense.*", "expense_category.description as categoryName")
      .where({ application_id: applicationId, period_id: 2 })
      .whereNotIn("category_id", expensesToSkip);

    input.uncapped_expenses = uncapped.map((u) => {
      return { category: u.categoryName, description: u.description, amount: u.amount };
    });

    input.total_costs =
      input.cslft_scholastic_total +
      input.shelter_total +
      input.p_trans_total +
      input.x_trans_total +
      input.r_trans_total +
      input.relocation_total +
      input.day_care_total +
      input.depend_food_total +
      input.depend_tran_total +
      input.discretionary_cost_total +
      input.uncapped_expenses.reduce((a: number, i: any) => a + i.amount, 0);

    input.parent_income_total = input.parent1_income + input.parent2_income;
    input.parent_tax_total = input.parent1_tax_paid + input.parent1_tax_paid;
    input.parent_net_income_total = input.parent_income_total - input.parent_tax_total;

    input.csl_assessed_need_pct = input.csl_assessed_need * 0.6;

    input.max_allowable = 0;

    if (this.cslLookup) {
      input.max_allowable = (this.cslLookup.allowable_weekly_amount ?? 0) * input.study_weeks;
    }

    const minVal = Math.min(input.csl_assessed_need_pct - input.total_grant_awarded, input.max_allowable);
    input.calculated_award = Math.max(0, minVal);

    let prev = await this.db("sfa.disbursement")
      .where({ funding_request_id: input.funding_request_id })
      .where("assessment_id", "<", input.id)
      .select(this.db.raw("SUM(COALESCE(disbursed_amount, 0)) AS sum"))
      .first();

    input.previous_cert = prev.sum ?? 0;

    /*
parent_discretionary_income
parent_contribution
*/

    /* 
    // Family Size and Income
    switch (this.assessment.csl_classification) {
      case 1:
        this.assessment.family_income = (this.assessment.parent1_income ?? 0) + (this.assessment.parent2_income ?? 0);
        break;
      case 4:
        this.assessment.family_income = this.assessment.student_ln150_income ?? 0;
        break;
      case 3:
        this.assessment.family_income =
          (this.assessment.student_ln150_income ?? 0) + (this.assessment.spouse_ln150_income ?? 0);
        break;
      default:
        this.assessment.family_income = this.assessment.student_ln150_income ?? 0;
    }
 */

    input.total_contribution = 44553;
    input.total_resources = 444;

    this.output = input;
    return this.output;
  }
  async loadApplication(id: string | number) {
    this.application = await this.db("sfa.application").where({ id }).first();
  }

  async loadLookups() {
    this.csgThreshold = await this.db("sfa.csg_threshold").where({
      academic_year_id: this.application.academic_year_id,
    });
    this.csgLookup = await this.db("sfa.csg_lookup")
      .where({ academic_year_id: this.application.academic_year_id })
      .first();
    this.cslLookup = await this.db("sfa.csl_lookup")
      .where({ academic_year_id: this.application.academic_year_id })
      .first();
    this.childcareCeiling = await this.db("sfa.child_care_ceiling")
      .where({
        academic_year_id: this.application.academic_year_id,
        province_id: this.application.study_province_id,
      })
      .first();
    this.livingAllowance = await this.db("sfa.student_living_allowance")
      .where({
        academic_year_id: this.application.academic_year_id,
        province_id: this.application.study_province_id,
        student_category_id: this.application.category_id,
      })
      .first();
  }

  async init(fundingRequestId: number | string) {
    console.log("LOADING FRID", fundingRequestId);

    await this.loadLookups();
    await this.loadApplication(this.fundingRequest.application_id);

    this.fundingRequest = await this.db("sfa.funding_request").where({ id: fundingRequestId }).first();
    this.application = await this.db("sfa.application").where({ id: this.fundingRequest.application_id }).first();
    this.student = await this.db("sfa.student").where({ id: this.application.student_id }).first();

    this.assessments = await this.db("sfa.assessment")
      .where({ funding_request_id: fundingRequestId })
      .orderBy("assessed_date");

    this.dependents = await this.db("sfa.dependent")
      .innerJoin("sfa.dependent_eligibility", "dependent.id", "dependent_eligibility.dependent_id")
      .innerJoin("sfa.application", "application.id", "dependent_eligibility.application_id")
      .select([
        "dependent.id",
        "is_disability",
        "is_sta_eligible",
        "is_post_secondary",
        "is_csl_eligible",
        "is_csg_eligible",
      ])
      .select(
        this.db.raw(
          "(0 + FORMAT(COALESCE(application.classes_start_date, GETDATE()),'yyyyMMdd') - FORMAT(birth_date,'yyyyMMdd') ) / 10000 age"
        )
      )
      .where({ "dependent_eligibility.application_id": this.application.id });

    this.expenses = await this.db("sfa.expense")
      .innerJoin("sfa.expense_category", "expense_category.id", "expense.category_id")
      .select("expense.*", "expense_category.description as categoryName")
      .where({ application_id: this.application.id });

    this.incomes = await this.db("sfa.income").where({ application_id: this.application.id });
    this.disbursements = await this.db("sfa.disbursement").where({ funding_request_id: this.fundingRequest.id });

    this.otherFunds = await this.db("sfa.funding_request")
      .where({ application_id: this.application.id })
      .join("sfa.disbursement", "disbursement.funding_request_id", "funding_request.id")
      .select("request_type_id")
      .groupBy("request_type_id")
      .sum("disbursed_amount as disbursed_amount");

    /* let ftLoan = otherFunds.find((f) => f.request_type_id == 4);
    let ftGrant = otherFunds.find((f) => f.request_type_id == 35);
    let ftDepGrant = otherFunds.find((f) => f.request_type_id == 32);
    let disGrant = otherFunds.find((f) => f.request_type_id == 29);
    let disSEGrant = otherFunds.find((f) => f.request_type_id == 30);
    let topup = otherFunds.find((f) => f.request_type_id == 28); */

    this.studentCategories = await this.db("sfa.student_category");

    this.application.category_id = this.determineCategoryId(
      this.application.csl_classification,
      this.application.study_accom_code
    );

    let depCategory = this.studentCategories.find((c) => c.code == "DEP");

    this.dependentAllowance = await this.db("sfa.student_living_allowance")
      .where({
        academic_year_id: this.application.academic_year_id,
        province_id: this.application.study_province_id,
        student_category_id: depCategory.id,
      })
      .first();

    /* if (ftLoan) csl_ft = Math.ceil(ftLoan.disbursed_amount);
  if (ftGrant) csg_ft = Math.ceil(ftGrant.disbursed_amount);
  if (ftDepGrant) csg_ftdep = Math.ceil(ftDepGrant.disbursed_amount);
  if (disGrant) csg_d = Math.ceil(disGrant.disbursed_amount);
  if (disSEGrant) csg_dse = Math.ceil(disSEGrant.disbursed_amount);
  if (topup) topup_fund = Math.ceil(topup.disbursed_amount); */

    let assess = await this.calculateBase();
    await this.calculateCosts(assess);
    await this.calculateContribution(assess);
    await this.calculateParental(assess);
    await this.calculateAward(assess);

    console.log(assess);

    this.output = assess;
    return this.output;
  }

  async calculateBase() {
    let assess = {} as any;

    assess.assessed_date = new Date();
    assess.assessment_type_id = 1;
    assess.study_start_date = this.application.classes_start_date;
    assess.study_end_date = this.application.classes_end_date;

    assess.pstudy_end_date = new Date(
      moment.utc(assess.study_start_date).add(-1, "month").endOf("month").format("YYYY-MM-DD")
    );
    assess.pstudy_start_date = new Date(
      moment.utc(assess.pstudy_end_date).add(-3, "month").startOf("month").format("YYYY-MM-DD")
    );

    assess.study_weeks = weeksBetween(assess.study_start_date, assess.study_end_date);
    assess.study_months = monthsBetween(assess.study_start_date, assess.study_end_date);
    assess.pstudy_weeks = weeksBetween(assess.pstudy_start_date, assess.pstudy_end_date);
    assess.pstudy_months = monthsBetween(assess.pstudy_start_date, assess.pstudy_end_date);
    assess.prestudy_province_id = this.application.prestudy_province_id;
    assess.study_province_id = this.application.study_province_id;

    assess.prestudy_accom_code = this.application.prestudy_accom_code;
    assess.study_accom_code = this.application.study_accom_code;
    assess.csl_classification = this.application.csl_classification;

    let family = await calculateFamilySize(
      this.db,
      this.application.csl_classification,
      this.application.id,
      !isEmpty(this.application.parent1_sin),
      !isEmpty(this.application.parent2_sin)
    );

    assess.dependent_count = family.csl_dependants;
    assess.family_size = family.family_size;
    return assess;
  }

  async calculateCosts(assess: any) {
    assess.tuition_estimate = cleanDollars(this.application.tuition_estimate_amount);
    assess.books_supplies_cost = cleanDollars(this.application.books_supplies_cost);
    assess.cslft_scholastic_total = cleanDollars(assess.tuition_estimate + assess.books_supplies_cost);

    let returnTrans = 0;
    let returnTransTot = 0;
    let relocation = 0;

    if (this.application.study_province_id != this.application.prestudy_province_id) {
      relocation = this.cslLookup.relocation_max_amount;
    }

    if (
      (!(this.application.study_living_w_spouse ?? false) && this.application.csl_classification == 3) ||
      (this.application.prestudy_accom_code ?? 0) == 1
    ) {
      returnTrans = this.cslLookup.return_transport_max_amount;
      returnTransTot = returnTrans;

      if (assess.study_weeks >= 16) returnTransTot = returnTrans * 2;
    }

    let costsCapped = [];
    costsCapped.push({
      name: "shelter",
      allowable: cleanDollars(
        this.livingAllowance.shelter_amount + this.livingAllowance.food_amount + this.livingAllowance.misc_amount
      ),
      actual: 0,
      total: cleanDollars(
        (this.livingAllowance.shelter_amount + this.livingAllowance.food_amount + this.livingAllowance.misc_amount) *
          assess.study_months
      ),
    });
    costsCapped.push({
      name: "publicTrans",
      allowable: cleanDollars(this.application.study_bus ? this.livingAllowance.public_tranport_amount : 0),
      actual: 0,
      total: cleanDollars(
        (this.application.study_bus ? this.livingAllowance.public_tranport_amount : 0) * assess.study_months
      ),
    });

    let extTransTot = 0;

    if (this.application.study_distance ?? 0 > 0) {
      let max_x_trans = this.livingAllowance.shelter_amount * assess.study_months;
      let calc_x_trans = this.application.study_distance * 2 * this.cslLookup.mileage_rate * assess.study_weeks * 5;
      extTransTot = cleanDollars(Math.min(max_x_trans, calc_x_trans));
    }

    costsCapped.push({ name: "extTrans", allowable: 0, actual: 0, total: extTransTot });

    costsCapped.push({
      name: "returnTrans",
      allowable: cleanDollars(returnTrans),
      actual: 0,
      total: cleanDollars(returnTransTot),
    });
    costsCapped.push({ name: "relocation", allowable: 0, actual: 0, total: cleanDollars(relocation) });

    let dayCareActual = 0;
    let dayCareAllowable = 0;
    let dayCareTot = 0;
    let depFood = 0;
    let depPTrans = 0;

    if (assess.dependent_count > 0) {
      dayCareActual = this.expenses
        .filter((f) => f.category_id == 3 && f.period_id == 2) // monthly daycare during study
        .reduce((a: number, i: any) => {
          return a + i.amount;
        }, 0);

      dayCareAllowable = this.childcareCeiling.max_amount * assess.dependent_count;
      dayCareTot = Math.min(dayCareAllowable, dayCareActual) * assess.study_months;

      depFood =
        assess.dependent_count *
        (this.dependentAllowance.shelter_amount +
          this.dependentAllowance.food_amount +
          this.dependentAllowance.misc_amount);

      depPTrans =
        assess.dependent_count * (this.application.study_bus ? this.dependentAllowance.public_tranport_amount : 0);

      /*     this.assessment.depend_food_allowable =
        (
          this.livingAllowance.shel
          
          await this.studentLivingAllowanceRepo.getShelterFoodMisc(
          this.application.academic_year_id,
          study_prov,
          studyCodes.DEP
        )) * assess.dependent_count; */
    }

    //console.log(allowance);

    let discretionaryActual = this.expenses
      .filter((e) => e.category_id == 11 && e.period_id == 2)
      .reduce((a: number, i: any) => {
        return a + i.amount;
      }, 0);

    costsCapped.push({
      name: "dayCare",
      allowable: cleanDollars(dayCareAllowable),
      actual: cleanDollars(dayCareActual),
      total: cleanNumber(dayCareTot),
    });
    costsCapped.push({
      name: "dependentShelter",
      allowable: cleanDollars(depFood),
      actual: 0,
      total: cleanDollars(depFood) * assess.study_months,
    });
    costsCapped.push({
      name: "dependentPTrans",
      allowable: cleanDollars(depPTrans),
      actual: 0,
      total: cleanDollars(depPTrans * assess.study_months),
    });
    costsCapped.push({
      name: "discretionary",
      allowable: cleanDollars(this.cslLookup.discretionary_costs_max_amount),
      actual: cleanDollars(discretionaryActual),
      total: cleanDollars(Math.min(discretionaryActual, this.cslLookup.discretionary_costs_max_amount)),
    });

    //console.log(this.csgLookup);
    //console.log(this.cslLookup);
    //console.log(this.csgThreshold);
    //console.log(this.livingAllowance);
    //console.log(this.dependentAllowance);
    //console.log(this.childcareCeiling);

    let costsUncapped = [] as any[];

    for (let expense of this.expenses.filter((e) => e.period_id == 2)) {
      costsUncapped.push({
        type: expense.categoryName,
        desciption: expense.description,
        amount: expense.amount,
        total: expense.amount,
      });
    }

    assess.costsCapped = costsCapped;
    assess.costsUncapped = costsUncapped;
    assess.totalCapped = cleanDollars(
      costsCapped.reduce((a: number, i: any) => {
        return a + i.total;
      }, 0)
    );
    assess.uncapped_costs_total = cleanDollars(
      costsUncapped.reduce((a: number, i: any) => {
        return a + i.total;
      }, 0)
    );
    assess.costsTotal = cleanDollars(assess.scholastic_expenses + assess.totalCapped + assess.totalUncapped);
  }

  async calculateContribution(assess: any) {
    let aboriginalStatus = await this.db("sfa.aboriginal_status")
      .where({ is_active: true, id: this.application.aboriginal_status_id })
      .where("nars_status_id", ">", 0);

    if (
      aboriginalStatus.length > 0 ||
      this.student.is_crown_ward ||
      this.application.is_disabled ||
      this.application.is_perm_disabled ||
      assess.dependent_count > 0
    ) {
      assess.student_contrib_exempt = "YES";
    } else assess.student_contrib_exempt = "NO";

    assess.student_ln150_income = this.application.student_ln150_income;
    assess.student_contribution = 0;
    assess.student_previous_contribution = 0;
    assess.student_contribution_override = 0;

    // if spouse is not employed or full time student
    if (this.application.spouse_study_emp_status_id != 4 || this.spouseIsFullTimeStudent())
      assess.spouse_contrib_exempt = "YES";
    else assess.spouse_contrib_exempt = "NO";

    assess.spouse_ln150_income = this.application.spouse_ln150_income;
    assess.spouse_contribution = 0;
    assess.spouse_previous_contribution = 0;
    assess.spouse_contribution_override = 0;

    assess.incomes = this.incomes;
  }
  async calculateParental(assess: any) {
    assess.parent_contribution_override;

    assess.parent1_income = this.application.parent1_income ?? 0;
    assess.parent2_income = this.application.parent2_income ?? 0;
    assess.parent1_tax_paid = this.application.parent1_tax_paid ?? 0;
    assess.parent2_tax_paid = this.application.parent2_tax_paid ?? 0;
    assess.parent_province_id = 0; // look for an address with address_type = 4
    assess.parent_contribution_override = 0;

    console.log(this.application.csl_classification);

    if (this.application.csl_classification == 1) {
      assess.family_income = cleanDollars(
        (this.application.parent1_income ?? 0) + (this.application.parent2_income ?? 0)
      );
    }
    // single parent is 1 + eligible dependent count
    else if (this.application.csl_classification == 4) {
      assess.family_income = cleanDollars(this.application.student_ln150_income ?? 0);
    }
    // married is 2 + eligible dependent count
    else if (this.application.csl_classification == 3) {
      assess.family_income = cleanDollars(
        (this.application.student_ln150_income ?? 0) + (this.application.spouse_ln150_income ?? 0)
      );
    }
    // single independent is always 1
    else {
      assess.family_income = cleanDollars(this.application.student_ln150_income ?? 0);
    }
  }
  async calculateAward(assess: any) {
    assess.csl_assessed_need = 0;
    assess.csl_assessed_need_pct = 0.6;
    assess.csl_assessed_need_net = assess.csl_assessed_need * assess.csl_assessed_need_pct;
    assess.total_grants;
    assess.max_allowable;
    assess.calculated_award;
    assess.requested_amount;
    assess.csl_full_amt_flag;
    assess.over_award = 0;
    assess.return_uncashable_cert = 0;
    assess.actual_award;
    assess.csl_over_reason_id = 0;
    assess.csl_non_reason_id = 0;
    assess.previous_certs;
    assess.preview_disburse;
    assess.netAmount;
  }

  determineCategoryId(cslClassification: number, accomodationCode: number): number {
    if (cslClassification == 1 && accomodationCode == 1) {
      return this.studentCategories.find((c: any) => c.code == "SDH")?.id || -1;
    } else if (cslClassification == 1 && accomodationCode == 2) {
      return this.studentCategories.find((c: any) => c.code == "SDA")?.id || -1;
    } else if ([2, 5].includes(cslClassification) && accomodationCode == -1) {
      return this.studentCategories.find((c: any) => c.code == "SIH")?.id || -1;
    } else if ([2, 5].includes(cslClassification ?? 0) && accomodationCode == 2) {
      return this.studentCategories.find((c: any) => c.code == "SIA")?.id || -1;
    } else if (cslClassification == 3) {
      return this.studentCategories.find((c: any) => c.code == "M")?.id || -1;
    } else if (cslClassification == 4) {
      return this.studentCategories.find((c: any) => c.code == "SP")?.id || -1;
    } else {
      return -1;
    }
  }

  spouseIsFullTimeStudent(): boolean {
    let result: boolean = false;

    const spouseStudyFrom = this.application.spouse_study_school_from
      ? moment(this.application.spouse_study_school_from)
      : undefined;
    const spouseStudyTo = this.application.spouse_study_school_to
      ? moment(this.application.spouse_study_school_to)
      : undefined;

    result = moment().isBetween(spouseStudyFrom, spouseStudyTo);

    return result;
  }
}

function cleanDollars(input: number | undefined) {
  if (!input) return 0;

  let value = Math.round(input * 100) / 100;
  return value;
}

async function calculateFamilySize(
  db: Knex,
  classification: number,
  applicationId: number,
  hasParent1: boolean,
  hasParent2: boolean
): Promise<{
  family_size: number;
  total_dependants: number;
  csl_dependants: number;
  csg_dependants: number;
  sta_dependants: number;
  post_secondary: number;
  narsCatCode: string;
  under12_or_disabled: number;
  over11: number;
}> {
  let family = {
    family_size: 0,
    total_dependants: 0,
    csl_dependants: 0,
    csg_dependants: 0,
    sta_dependants: 0,
    post_secondary: 1,
    narsCatCode: "1",
    under12_or_disabled: 0,
    over11: 0,
  };

  // Single Dependent
  if (classification == 1) {
    family.narsCatCode = "4";
  }
  // Single Independent - 2 year workforce
  else if (classification == 2) {
    family.narsCatCode = "3";
  }
  // Married / Common Law
  else if (classification == 3) {
    family.narsCatCode = "1";
  } // Single Parent
  else if (classification == 4) {
    family.narsCatCode = "2";
  }
  // Single Independent - 4 year high school
  else if (classification == 5) {
    family.narsCatCode = "3";
  }

  // Married / Common Law or Single Parent
  if ([3, 4].includes(classification)) {
    let deps = await db("sfa.dependent")
      .innerJoin("sfa.dependent_eligibility", "dependent.id", "dependent_eligibility.dependent_id")
      .innerJoin("sfa.application", "application.id", "dependent_eligibility.application_id")
      .select("dependent.*", "dependent_eligibility.*")
      .select(
        db.raw(
          "(0 + FORMAT(COALESCE(application.classes_start_date, GETDATE()),'yyyyMMdd') - FORMAT(birth_date,'yyyyMMdd') ) / 10000 age"
        )
      )
      .where({ "dependent_eligibility.application_id": applicationId });

    family.total_dependants = deps.length;
    family.csl_dependants = deps.filter((f: any) => f.is_csl_eligible).length;
    family.csg_dependants = deps.filter((f: any) => f.is_csg_eligible).length;
    family.sta_dependants = deps.filter((f: any) => f.is_sta_eligible).length;

    family.under12_or_disabled = deps.filter((f: any) => f.is_csl_eligible && (f.age < 11 || f.is_disability)).length;
    family.over11 = deps.filter((f: any) => f.is_csl_eligible && f.age >= 12).length;
    family.post_secondary = deps.filter((f: any) => f.is_post_secondary).length;

    family.family_size = classification == 3 ? 2 + family.csl_dependants : 1 + family.csl_dependants;
  }
  // Single Dependent
  else if (classification == 1) {
    let parentDeps = await db("sfa.parent_dependent")
      .innerJoin("sfa.application", "application.id", "parent_dependent.application_id")
      .select("parent_dependent.*")
      .select(
        db.raw(
          "(0 + FORMAT(COALESCE(application.classes_start_date, GETDATE()),'yyyyMMdd') - FORMAT(birth_date,'yyyyMMdd') ) / 10000 age"
        )
      )
      .where({ application_id: applicationId, is_eligible: true });

    family.total_dependants = 1 + parentDeps.length;
    family.csl_dependants = 1;

    family.post_secondary = parentDeps.filter((f: any) => f.is_attend_post_secondary).length + 1;
    family.family_size = 1 + parentDeps.length + (hasParent1 ? 1 : 0) + (hasParent2 ? 1 : 0);

    family.under12_or_disabled = parentDeps.filter(
      (f: any) => f.is_csl_eligible && (f.age < 11 || f.is_disabled)
    ).length;
    family.over11 = parentDeps.filter((f: any) => f.is_csl_eligible && f.age >= 12).length;
  } else {
    family.family_size = 1;
  }

  return family;
}
