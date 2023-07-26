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

export type FundingRequestTable = Omit<FundingRequestDTO, "id">;

export const fundingRequestColumns: (keyof FundingRequestTable)[] = [
    "application_id",
    "request_type_id",
    "status_id",
    "status_reason_id",
    "comments",
    "custom_status",
    "received_date",
    "status_date",
    "yea_request_amount",
    "yea_request_type",
    "csl_request_amount",
    "is_csl_full_amount",
    "is_csg_only",
    "entering_first_year",
    "student_meet_hs_o_equiv_req",
    "student_meet_residency_req",
    "student_isnt_elig_f_fund_in_another_jur",
    "student_is_in_ft_study",
    "student_is_att_in_elig_prog_des_ps_inst",
    "student_is_elig_for_airfare_trvl_amount",
    "student_is_mov_to_anth_cmm_to_attd_prgm",
    "student_is_manumberening_two_residences",
    "student_w_not_receive_fund_from_otr_org",
];