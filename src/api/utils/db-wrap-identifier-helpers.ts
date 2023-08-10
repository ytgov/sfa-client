////
// As seen by
// SELECT
//     TABLE_SCHEMA + '.' + TABLE_NAME + '.' + COLUMN_NAME
// FROM
//     INFORMATION_SCHEMA.COLUMNS
// WHERE
//     TABLE_SCHEMA = 'sfa'
//     AND COLUMN_NAME LIKE '%[^_][0-9]%'
// ORDER BY
//     TABLE_NAME
//     , COLUMN_NAME;
//
// Except for:
//   - sfa.csl_nars_history.children_over_12_dis
//   - sfa.csl_nars_history.children_over_12_not_dis
//   - sfa.csl_nars_history.children_to_11
// as they match their snake case value.

// Also ran
// import { NON_STANDARD_COLUMN_NAMES_TRANSFORMS } from "@/utils/db-wrap-identifier-helpers"
// import { snakeCase } from "lodash"

// Object.entries(NON_STANDARD_COLUMN_NAMES_TRANSFORMS).forEach(([key, value]) => {
//   if (snakeCase(key) !== value) {
//     // console.log(`Key "${key}" does not match its snake-cased value "${snakeCase(key)}".`)
//   } else {
//     console.log(`Key "${key}" matches its snake-cased value.`)
//   }
// })
export const NON_STANDARD_COLUMN_NAMES_TRANSFORMS: { [key: string]: string | undefined } = {
  address1: "address1", // sfa.person_address_v.address1, sfa.person_address.address1
  address2: "address2", // sfa.person_address_v.address2, sfa.person_address.address2
  calscRestrict1: "calsc_restrict1", // sfa.csl_restricted.calsc_restrict1
  calscRestrict2: "calsc_restrict2", // sfa.csl_restricted.calsc_restrict2
  calscRestrict3: "calsc_restrict3", // sfa.csl_restricted.calsc_restrict3
  csgptDep2PhaseOutRate: "csgpt_dep2_phase_out_rate", // sfa.csg_threshold.csgpt_dep2_phase_out_rate
  csgptDep3PhaseOutRate: "csgpt_dep3_phase_out_rate", // sfa.csg_threshold.csgpt_dep3_phase_out_rate
  fiRestrict1: "fi_restrict1", // sfa.csl_restricted.fi_restrict1
  kinAddress1: "kin_address1", // sfa.student.kin_address1
  kinAddress2: "kin_address2", // sfa.student.kin_address2
  nslscRestrict1: "nslsc_restrict1", // sfa.csl_restricted.nslsc_restrict1
  nslscRestrict2: "nslsc_restrict2", // sfa.csl_restricted.nslsc_restrict2
  nslscRestrict3: "nslsc_restrict3", // sfa.csl_restricted.nslsc_restrict3
  parent1Id: "parent1_id", // sfa.application.parent1_id
  parent1IncomeTaxable: "parent1_income_taxable", // sfa.csl_nars_history.parent1_income_taxable
  parent1IncomeTaxpaid: "parent1_income_taxpaid", // sfa.csl_nars_history.parent1_income_taxpaid
  parent1Income: "parent1_income", // sfa.application.parent1_income, sfa.assessment.parent1_income, sfa.csl_nars_history.parent1_income
  parent1NetIncome: "parent1_net_income", // sfa.application.parent1_net_income
  parent1PostalCode: "parent1_postal_code", // sfa.csl_nars_history.parent1_postal_code
  parent1RelationshipId: "parent1_relationship_id", // sfa.application.parent1_relationship_id
  parent1Sin: "parent1_sin", // sfa.csl_nars_history.parent1_sin
  parent1TaxPaid: "parent1_tax_paid", // sfa.application.parent1_tax_paid, sfa.assessment.parent1_tax_paid
  parent2Id: "parent2_id", // sfa.application.parent2_id
  parent2IncomeTaxable: "parent2_income_taxable", // sfa.csl_nars_history.parent2_income_taxable
  parent2IncomeTaxpaid: "parent2_income_taxpaid", // sfa.csl_nars_history.parent2_income_taxpaid
  parent2Income: "parent2_income", // sfa.application.parent2_income, sfa.assessment.parent2_income, sfa.csl_nars_history.parent2_income
  parent2NetIncome: "parent2_net_income", // sfa.application.parent2_net_income
  parent2PostalCode: "parent2_postal_code", // sfa.csl_nars_history.parent2_postal_code
  parent2RelationshipId: "parent2_relationship_id", // sfa.application.parent2_relationship_id
  parent2Sin: "parent2_sin", // sfa.csl_nars_history.parent2_sin
  parent2TaxPaid: "parent2_tax_paid", // sfa.application.parent2_tax_paid, sfa.assessment.parent2_tax_paid
  rTrans16wk: "r_trans_16wk", // sfa.assessment.r_trans_16wk
  spouseLn150Income: "spouse_ln150_income", // sfa.application.spouse_ln150_income, sfa.assessment.spouse_ln150_income
  studentLn150Income: "student_ln150_income", // sfa.application.student_ln150_income, sfa.assessment.student_ln150_income
  t4aRequired: "t4a_required", // sfa.request_type.t4a_required
  taxes1FiledProvinceId: "taxes1_filed_province_id", // sfa.application.taxes1_filed_province_id
  taxes1FiledYear: "taxes1_filed_year", // sfa.application.taxes1_filed_year
  taxes1NotFiled: "taxes1_not_filed", // sfa.application.taxes1_not_filed
  taxes1Verified: "taxes1_verified", // sfa.application.taxes1_verified
  taxes2FiledProvinceId: "taxes2_filed_province_id", // sfa.application.taxes2_filed_province_id
  taxes2FiledYear: "taxes2_filed_year", // sfa.application.taxes2_filed_year
  taxes2NotFiled: "taxes2_not_filed", // sfa.application.taxes2_not_filed
  taxes2Verified: "taxes2_verified", // sfa.application.taxes2_verified
}
