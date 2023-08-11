import { IAssessmentCalculated } from "./calculated/Assessment";

export interface AssessmentDTO extends IAssessmentCalculated{
    air_travel_disbursement_period?: number;
    airfare_amount?: number;
    allowed_books?: number;
    allowed_months?: number;
    allowed_percent?: number;
    allowed_tuition?: number;
    assessed_amount?: number;
    assessed_date?: Date | string;
    assessment_adj_amount?: number;
    assessment_type_id?: number;
    asset_tax_rate?: number;
    books_supplies_cost?: number;
    change_reason_comment?: string;
    classes_end_date?: Date | string;
    classes_start_date?: Date | string;
    csl_assessed_need?: number;
    csl_classification?: number;
    csl_full_amt_flag?: boolean;
    csl_non_reason_id?: number;
    csl_over_reason_id?: number;
    csl_request_amount?: number;
    day_care_actual?: number;
    day_care_allowable?: number;
    depend_food_allowable?: number;
    depend_tran_allowable?: number;
    dependent_count?: number;
    destination_city_id?: number;
    disbursements_required?: number;
    discretionary_cost?: number;
    discretionary_cost_actual?: number;
    effective_rate_date?: Date | string;
    entitlement_days?: number;
    family_size?: number;
    funding_request_id?: number;
    home_city_id?: number;
    living_costs?: number;
    marital_status_id?: number;
    married_assets?: number;
    married_pstudy?: number;
    married_study?: number;
    over_award?: number;
    over_award_applied_flg?: string;
    over_award_disbursement_period?: number;
    p_trans_month?: number;
    parent1_income?: number;
    parent1_tax_paid?: number;
    parent2_income?: number;
    parent2_tax_paid?: number;
    parent_contribution_override?: number;
    parent_contribution_review?: boolean;
    parent_province_id?: number;
    parent_ps_depend_count?: number;
    period?: string;
    pre_leg_amount?: number;
    prestudy_accom_code?: number;
    prestudy_bus_flag?: boolean;
    prestudy_csl_classification?: number;
    prestudy_distance?: number;
    prestudy_living_w_spouse_flag?: number;
    prestudy_province_id?: number;
    program_id?: number;
    pstudy_day_care_actual?: number;
    pstudy_day_care_allow?: number;
    pstudy_depend_food_allow?: number;
    pstudy_depend_tran_allow?: number;
    pstudy_end_date?: Date;
    pstudy_expected_contrib?: number;
    pstudy_p_trans_month?: number;
    pstudy_shelter_month?: number;
    pstudy_start_date?: Date;
    pstudy_x_trans_total?: number;
    r_trans_16wk?: number;
    relocation_total?: number;
    return_uncashable_cert?: number;
    second_residence_rate?: number;
    shelter_month?: number;
    spouse_contrib_exempt?: string;
    spouse_contribution?: number;
    spouse_contribution_override?: number;
    spouse_contribution_review?: boolean;
    spouse_expected_contribution?: number;
    spouse_expected_income?: number;
    spouse_gross_income?: number;
    spouse_ln150_income?: number;
    spouse_previous_contribution?: number;
    spouse_province_id?: number;
    spouse_pstudy_gross?: number;
    spouse_pstudy_tax_rate?: number;
    spouse_tax_rate?: number;
    stud_pstudy_gross?: number;
    stud_pstudy_tax_rate?: number;
    student_contrib_exempt?: string;
    student_contribution?: number;
    student_contribution_override?: number;
    student_contribution_review?: boolean;
    student_expected_contribution?: number;
    student_family_size?: number;
    student_gross_income?: number;
    student_ln150_income?: number;
    student_previous_contribution?: number;
    student_tax_rate?: number;
    study_accom_code?: number;
    study_area_id?: number;
    study_bus_flag?: boolean;
    study_distance?: number;
    study_living_w_spouse_flag?: boolean;
    study_months?: number;
    study_province_id?: number;
    study_weeks?: number;
    total_grant_awarded?: number;
    travel_allowance?: number;
    tuition_estimate?: number;
    uncapped_costs_total?: number;
    uncapped_pstudy_total?: number;
    weekly_amount?: number;
    weeks_allowed?: number;
    x_trans_total?: number;
    years_funded_equivalent?: number;
}

export type AssessmentTable = Omit<AssessmentDTO, keyof IAssessmentCalculated>;

export const assessmentColumns: (keyof AssessmentTable)[] = [
    "air_travel_disbursement_period",
    "airfare_amount",
    "allowed_books",
    "allowed_months",
    "allowed_percent",
    "allowed_tuition",
    "assessed_amount",
    "assessed_date",
    "assessment_adj_amount",
    "assessment_type_id",
    "asset_tax_rate",
    "books_supplies_cost",
    "change_reason_comment",
    "classes_end_date",
    "classes_start_date",
    "csl_assessed_need",
    "csl_classification",
    "csl_full_amt_flag",
    "csl_non_reason_id",
    "csl_over_reason_id",
    "csl_request_amount",
    "day_care_actual",
    "day_care_allowable",
    "depend_food_allowable",
    "depend_tran_allowable",
    "dependent_count",
    "destination_city_id",
    "disbursements_required",
    "discretionary_cost",
    "discretionary_cost_actual",
    "effective_rate_date",
    "entitlement_days",
    "family_size",
    "funding_request_id",
    "home_city_id",
    "living_costs",
    "marital_status_id",
    "married_assets",
    "married_pstudy",
    "married_study",
    "over_award",
    "over_award_applied_flg",
    "over_award_disbursement_period",
    "p_trans_month",
    "parent1_income",
    "parent1_tax_paid",
    "parent2_income",
    "parent2_tax_paid",
    "parent_contribution_override",
    "parent_contribution_review",
    "parent_province_id",
    "parent_ps_depend_count",
    "period",
    "pre_leg_amount",
    "prestudy_accom_code",
    "prestudy_bus_flag",
    "prestudy_csl_classification",
    "prestudy_distance",
    "prestudy_living_w_spouse_flag",
    "prestudy_province_id",
    "program_id",
    "pstudy_day_care_actual",
    "pstudy_day_care_allow",
    "pstudy_depend_food_allow",
    "pstudy_depend_tran_allow",
    "pstudy_end_date",
    "pstudy_expected_contrib",
    "pstudy_p_trans_month",
    "pstudy_shelter_month",
    "pstudy_start_date",
    "pstudy_x_trans_total",
    "r_trans_16wk",
    "relocation_total",
    "return_uncashable_cert",
    "second_residence_rate",
    "shelter_month",
    "spouse_contrib_exempt",
    "spouse_contribution",
    "spouse_contribution_override",
    "spouse_contribution_review",
    "spouse_expected_contribution",
    "spouse_expected_income",
    "spouse_gross_income",
    "spouse_ln150_income",
    "spouse_previous_contribution",
    "spouse_province_id",
    "spouse_pstudy_gross",
    "spouse_pstudy_tax_rate",
    "spouse_tax_rate",
    "stud_pstudy_gross",
    "stud_pstudy_tax_rate",
    "student_contrib_exempt",
    "student_contribution",
    "student_contribution_override",
    "student_contribution_review",
    "student_expected_contribution",
    "student_family_size",
    "student_gross_income",
    "student_ln150_income",
    "student_previous_contribution",
    "student_tax_rate",
    "study_accom_code",
    "study_area_id",
    "study_bus_flag",
    "study_distance",
    "study_living_w_spouse_flag",
    "study_months",
    "study_province_id",
    "study_weeks",
    "total_grant_awarded",
    "travel_allowance",
    "tuition_estimate",
    "uncapped_costs_total",
    "uncapped_pstudy_total",
    "weekly_amount",
    "weeks_allowed",
    "x_trans_total",
    "years_funded_equivalent",
];
