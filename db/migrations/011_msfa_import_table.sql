
CREATE TABLE sfa.ecert_import (
    sequence_number varchar(20) NULL,
    sin varchar(9) NULL,
    certificate_number varchar(20) NULL,
    ecert_sent_date datetime2(0) NULL,
    response_date datetime2(0) NULL,
    is_resend_flg varchar(3) NULL,
    error_message varchar(4000) NULL,
    disbursement_id float(8) NULL
);

CREATE TABLE sfaadmin.msfaa_import (
    agreement_number varchar(10) NULL,
    sin varchar(9) NULL,
    status_code varchar(1) NULL,
    borrower_signed_date varchar(8) NULL,
    sp_received_date varchar(8) NULL,
    new_issue_prov varchar(2) NULL,
    cancel_date varchar(8) NULL,
    error_message varchar(4000) NULL
);