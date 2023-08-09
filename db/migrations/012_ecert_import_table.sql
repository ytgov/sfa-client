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