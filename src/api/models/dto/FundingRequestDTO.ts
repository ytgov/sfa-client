export interface FundingRequestDTO {
    id?: number;
    application_id?: number;
    request_type_id?: number;
    status_id?: number;
    status_reason_id?: number;
    comments?: string;
    custom_status?: string;
    received_date?: Date;
    status_date?: Date;
    yea_request_amount?: number;
    yea_request_type?: number;
    csl_request_amount?: number;
    is_csl_full_amount?: boolean;
    is_csg_only?: boolean;
    entering_first_year?: boolean;
    student_meet_hs_o_equiv_req?: boolean;
    student_meet_residency_req?: boolean;
    student_isnt_elig_f_fund_in_another_jur?: boolean;
    student_is_in_ft_study?: boolean;
    student_is_att_in_elig_prog_des_ps_inst?: boolean;
    student_is_elig_for_airfare_trvl_amount?: boolean;
    student_is_mov_to_anth_cmm_to_attd_prgm?: boolean;
    student_is_manumberening_two_residences?: boolean;
    student_w_not_receive_fund_from_otr_org?: boolean;
}