export interface AssessmentDTO {
    air_travel_disbursement_period?: number;
    airfare_amount?: number;
    allowed_books?: number;
    allowed_months?: number;
    allowed_percent?: number;
    allowed_tuition?: number;
    assessed_amount?: number;
    assessed_date?: Date;
    assessment_adj_amount?: number;
    assessment_type_id?: number;
    asset_tax_rate?: number;
    books_supplies_cost?: number;
    change_reason_comment?: string;
    classes_end_date?: Date;
    classes_start_date?: Date;
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
    effective_rate_date?: Date;
    entitlement_days?: number;
    family_size?: number;
    funding_request_id?: number;
    home_city_id?: number;
    id?: number;
    living_costs?: number;
    marital_status_id?: number;
    married_assets?: number;
    married_pstudy?: number;
    married_study?: number;
    new_calc?: boolean;
    over_award?: number;
    over_award_applied_flg?: string;
    over_award_disbursement_period?: number;
    p_trans_month?: number;
    parent1_income?: number;
    parent1_tax_paid?: number;
    parent2_income?: number;
    parent2_tax_paid?: number;
    parent_contribution_override?: number;
    parent_contribution_review?: string;
    parent_province?: string;
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
    pstudy_months?: number;
    pstudy_weeks?: number;
    r_trans_16wk?: number;
    relocation_total?: number;
    return_uncashable_cert?: number;
    second_residence_rate?: number;
    shelter_month?: number;
    spouse_contrib_exempt?: string;
    spouse_contribution?: number;
    spouse_contribution_override?: number;
    spouse_contribution_review?: string;
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
    student_contribution_review?: string;
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
    calculated_award?: number;
    recovered_overaward?: number;
    net_amount?: number;// calculated value, not a field
    previous_disbursement?: number;// calculated value, not a field
    field_program_code?: number;
    previous_cert?: number;
    student_exemption?: number;
    spouse_exemption?: number;
    vehicle_deduction?: number;
    rrsp_student_ann_deduct?: number;
    rrsp_spouse_ann_deduct?: number;
    parent_msol?: number;
    parent_weekly_contrib?: number;
    previous_weeks?: number;// calculated value, not a field
    assessed_weeks?: number;// calculated value, not a field
    years_funded?: number;// calculated value, not a field
    previous_upgrade_weeks?: number;// calculated value, not a field - used in STA
}