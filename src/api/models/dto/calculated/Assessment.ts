export interface IAssessmentCalculated {
    id?: number; // This is not calculated but is not needed for insert or update operations
    net_amount?: number;// calculated value, not a field
    previous_disbursement?: number;// calculated value, not a field
    previous_weeks?: number;// calculated value, not a field
    assessed_weeks?: number;// calculated value, not a field
    years_funded?: number;// calculated value, not a field
    parent_discretionary_income?: number;
    pstudy_dep_food_allow?: number;
    pstudy_dep_tran_allow?: number;
    combined_contribution?: number;
    family_income?: number;
    rrsp_student_ann_deduct?: number;
    rrsp_spouse_ann_deduct?: number;
    parent_msol?: number;
    parent_weekly_contrib?: number;
    calculated_award?: number;
    recovered_overaward?: number;
    field_program_code?: number;
    previous_cert?: number;
    student_exemption?: number;
    student_exemption_reason?: string;
    spouse_exemption?: number;
    spouse_exemption_reason?: string;
    vehicle_deduction?: number;
    other_income?: number;
    financial_investments?: number;
    rrsp_student_gross?: number;
    rrsp_spouse_gross?: number;
    pstudy_months?: number;
    pstudy_weeks?: number;
    new_calc?: boolean;
}