-- SFA SCHEMA
IF NOT EXISTS(SELECT *
FROM sys.schemas
WHERE name = N'sfa')
    EXEC ('CREATE SCHEMA [sfa]');
GO

-- sfa.country
CREATE TABLE sfa.country
(
    id           INT IDENTITY (1, 1) PRIMARY KEY,
    description  NVARCHAR(100) NOT NULL,
    abbreviation NVARCHAR(20)  NULL,
    is_active    BIT           NOT NULL DEFAULT 1
)

-- sfa.province
CREATE TABLE sfa.province
(
    id           INT IDENTITY (1, 1) PRIMARY KEY,
    description  NVARCHAR(100) NOT NULL,
    abbreviation NVARCHAR(20)  NULL,
    country_id   INT           NULL REFERENCES sfa.country (id),
    is_active    BIT           NOT NULL DEFAULT 1
)
-- SFA.CITY
CREATE TABLE sfa.city
(
    id          INT IDENTITY (1, 1) PRIMARY KEY,
    description NVARCHAR(100) NOT NULL,
    province_id INT           NULL REFERENCES sfa.province (id),
    is_active   BIT           NOT NULL DEFAULT 1
)

-- ACADEMIC_YEAR
CREATE TABLE sfa.academic_year
(
    id     INT IDENTITY (1965,1) PRIMARY KEY,
    [year] NVARCHAR(4)  NOT NULL UNIQUE,
    status NVARCHAR(50) NOT NULL DEFAULT 'Open'
)

-- USER
IF NOT EXISTS(SELECT *
FROM sysobjects
WHERE name = 'user'
  AND xtype = 'U') CREATE TABLE sfa.[user]
                   (
                       id             INT IDENTITY (1,1) PRIMARY KEY,
                       email          NVARCHAR(200) NOT NULL UNIQUE,
                       email_public   NVARCHAR(200) NOT NULL,
                       is_active      BIT           NOT NULL DEFAULT 1,
                       first_name     NVARCHAR(100) NOT NULL,
                       last_name      NVARCHAR(100) NOT NULL,
                       position       NVARCHAR(200) NULL,
                       phone          NVARCHAR(25)  NULL,
                       phone_tollfree NVARCHAR(25)  NULL,
                       fax            NVARCHAR(25)  NULL,
                       create_date    DATETIME2(0)     NOT NULL DEFAULT GETDATE()
                   )


CREATE TABLE sfa.institution_level
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(50) NOT NULL UNIQUE,
    is_active   BIT          NOT NULL DEFAULT 1
)

CREATE TABLE sfa.institution
(
    id                       INT IDENTITY (1,1) PRIMARY KEY,
    name                     NVARCHAR(400) NOT NULL UNIQUE,
    is_active                BIT           NOT NULL DEFAULT 1,
    federal_institution_code NVARCHAR(24),
    institution_level_id     INT           NOT NULL REFERENCES sfa.institution_level (id)
)

CREATE TABLE sfa.institution_campus
(
    id                       INT IDENTITY (1,1) PRIMARY KEY,
    institution_id           INT REFERENCES sfa.institution (id),
    name                     NVARCHAR(400)                    NOT NULL,
    federal_institution_code NVARCHAR(24),
    is_active                BIT                              NOT NULL DEFAULT 1,
    is_primary               BIT                              NOT NULL DEFAULT 0,
    care_of                  NVARCHAR(500)                    NULL,
    address_line_1           NVARCHAR(200)                    NULL,
    address_line_2           NVARCHAR(200)                    NULL,
    address_city_id          INT REFERENCES sfa.city (id)     NULL,
    address_province_id      INT REFERENCES sfa.province (id) NULL,
    address_country_id       INT REFERENCES sfa.country (id)  NULL,
    address_postal_code      NVARCHAR(50),
    email_address            NVARCHAR(100)
)

CREATE TABLE sfa.institution_campus_dates
(
    id                    INT IDENTITY (1,1) PRIMARY KEY,
    institution_campus_id INT       NOT NULL REFERENCES sfa.institution_campus (id),
    academic_year_id      INT       NOT NULL REFERENCES sfa.academic_year (id),
    class_start_date      DATETIME2(0) NULL,
    class_end_date        DATETIME2(0) NULL
)

CREATE TABLE sfa.institution_campus_notes
(
    id                    INT IDENTITY (1,1) PRIMARY KEY,
    institution_campus_id INT          NOT NULL REFERENCES sfa.institution_campus (id),
    note                  TEXT         NOT NULL,
    create_date           DATETIME2(0) NOT NULL DEFAULT GETDATE(),
    create_user_id        INT          NOT NULL REFERENCES sfa.[user]
)


-- SEX
CREATE TABLE sfa.sex
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(50) NOT NULL UNIQUE,
    is_active   BIT          NOT NULL DEFAULT 1
)

-- INDEIGENOUS_LEARNER
CREATE TABLE sfa.indigenous_learner
(
    id          INT IDENTITY PRIMARY KEY,
    description NVARCHAR(50) NOT NULL UNIQUE,
    is_active   BIT          NOT NULL DEFAULT 0
)


-- SFAADMIN.ABORIGINAL_STATUS
CREATE TABLE sfa.aboriginal_status
(
    id             INT IDENTITY (1,1) PRIMARY KEY,
    description    NVARCHAR(200) NOT NULL UNIQUE,
    is_active      BIT           NOT NULL DEFAULT 1,
    nars_status_id INT           NULL,
    sort_order     INT           NOT NULL DEFAULT 99
)

-- SFAADMIN.AGE_DISTRIBUTION
CREATE TABLE sfa.age_distribution
(
    id        INT IDENTITY (1,1) PRIMARY KEY,
    start_age INT NOT NULL,
    end_age   INT NOT NULL
)

-- SFAADMIN.AGENCY
CREATE TABLE sfa.agency
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.APPLICATION_TYPE
CREATE TABLE sfa.application_type
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.ASSESSMENT_TYPE
CREATE TABLE sfa.assessment_type
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.BATCH_GROUP
CREATE TABLE sfa.batch_group
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    prefix      NVARCHAR(200) NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.BATCH_PARAMETER
CREATE TABLE sfa.batch_parameter
(
    id               INT IDENTITY (1,1) PRIMARY KEY,
    description      NVARCHAR(200) NOT NULL,
    user_description NVARCHAR(200) NULL,
    is_active        BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.CATEGORY
CREATE TABLE sfa.category
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.CHANGE_REASON
CREATE TABLE sfa.change_reason
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.CHILD_CARE_CEILING
CREATE TABLE sfa.child_care_ceiling
(
    id               INT IDENTITY (1,1) PRIMARY KEY,
    academic_year_id INT           NOT NULL REFERENCES sfa.academic_year (id),
    province_id      INT           NOT NULL REFERENCES sfa.province (id),
    max_amount       NUMERIC(7, 2) NOT NULL
)

-- SFAADMIN.COMUNICATION_TYPE
CREATE TABLE sfa.communication_type
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.CSG_LOOKUP
CREATE TABLE sfa.csg_lookup
(
    id                          INT IDENTITY (1,1) PRIMARY KEY,
    academic_year_id            INT           NOT NULL REFERENCES sfa.academic_year (id) UNIQUE,
    csg_8_month_amount          NUMERIC(7, 2) NOT NULL,
    csg_dep_monthly_amount      NUMERIC(7, 2) NOT NULL,
    csg_pd_yearly_amount        NUMERIC(7, 2) NOT NULL,
    csg_pdse_yearly_amount      NUMERIC(7, 2) NOT NULL,
    csgpt_yearly_amount         NUMERIC(7, 2) NOT NULL,
    csgpt_dep_max_amount        NUMERIC(7, 2) NOT NULL,
    csgpt_dep_1_2_weekly_amount NUMERIC(7, 2) NOT NULL,
    csgpt_dep_3_weekly_amount   NUMERIC(7, 2) NOT NULL
)

-- SFAADMIN.CSG_THRESHOLD
CREATE TABLE sfa.csg_threshold
(
    id                        INT IDENTITY (1,1) PRIMARY KEY,
    academic_year_id          INT            NOT NULL REFERENCES sfa.academic_year (id),
    family_size               INT            NOT NULL,
    income_threshold          NUMERIC(10, 2) NOT NULL,
    income_cutoff             NUMERIC(10, 2) NOT NULL,
    phase_out_rate            FLOAT          NOT NULL,
    low_income_threshold      NUMERIC(10, 2) NOT NULL,
    middle_income_threshold   NUMERIC(10, 2) NOT NULL,
    csgpt_phase_out_rate      FLOAT          NULL,
    csgpt_dep2_phase_out_rate FLOAT          NULL,
    csgpt_dep3_phase_out_rate FLOAT          NULL,
    csgft_dep_phase_out_rate  FLOAT          NULL,
    UNIQUE (academic_year_id, family_size)
)

-- SFAADMIN.CSL_CODE
CREATE TABLE sfa.csl_code
(
    id           INT IDENTITY (1,1) PRIMARY KEY,
    warning_code NVARCHAR(10)   NULL,
    reason_code  NVARCHAR(10)   NULL,
    code_type    NVARCHAR(10)   NOT NULL,
    definition   NVARCHAR(1000) NOT NULL,
    is_active    BIT            NOT NULL DEFAULT 1
)

-- SFAADMIN.CSL_LOOKUP
CREATE TABLE sfa.csl_lookup
(
    id                                INT IDENTITY (1,1) PRIMARY KEY,
    academic_year_id                  INT            NOT NULL REFERENCES sfa.academic_year (id) UNIQUE,
    return_transport_max_amount       NUMERIC(10, 2) NULL,
    allowable_weekly_amount           NUMERIC(10, 2) NULL,
    student_exempt_amount             NUMERIC(10, 2) NULL,
    vehicle_deduction_amount          NUMERIC(10, 2) NULL,
    rrsp_deduction_yearly_amount      NUMERIC(10, 2) NULL,
    relocation_max_amount             NUMERIC(10, 2) NULL,
    mileage_rate                      FLOAT          NULL,
    discretionary_costs_max_amount    NUMERIC(10, 2) NULL,
    merit_exempt_amount               NUMERIC(10, 2) NULL,
    books_max_amount                  NUMERIC(10, 2) NULL,
    student_contrib_percent           FLOAT          NULL,
    spouse_contrib_percent            FLOAT          NULL,
    csg_8_month_amount                NUMERIC(10, 2) NULL,
    csg_pt_yearly_amount              NUMERIC(10, 2) NULL,
    low_income_student_contrib_amount NUMERIC(10, 2) NULL,
    student_contrib_max_amount        NUMERIC(10, 2) NULL,
    csl_pt_max_amount                 NUMERIC(10, 2) NULL,
    csl_pt_wk_misc_amount             NUMERIC(10, 2) NULL
)

-- SFAADMIN.CSL_NSLSC_ADDRESS
CREATE TABLE sfa.csl_nslsc_address
(
    id               INT IDENTITY (1,1) PRIMARY KEY,
    institution_type NVARCHAR(100) NOT NULL,
    name             NVARCHAR(150) NOT NULL,
    address_line_1   NVARCHAR(200) NOT NULL,
    address_line_2   NVARCHAR(200) NULL,
    city_id          INT           NOT NULL REFERENCES sfa.city (id),
    province_id      INT           NOT NULL REFERENCES sfa.province (id),
    postal_code      NVARCHAR(50)  NOT NULL,
    phone_number     NVARCHAR(50)  NOT NULL,
    effective_date   DATETIME2(0)  NOT NULL DEFAULT GETDATE(),
    expiry_date      DATETIME2(0)  NULL
)

-- SFAADMIN.CSL_REASON
CREATE TABLE sfa.csl_reason
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    type        NVARCHAR(50) NOT NULL,
    name        NVARCHAR(50) NOT NULL,
    description TEXT         NULL
)

-- SFAADMIN.CSL_RESTRICTED
CREATE TABLE sfa.csl_restricted
(
    id                    INT IDENTITY (1,1) PRIMARY KEY,
    amount_disbursed      NUMERIC(10, 2) NULL,
    birth_date            DATETIME2(0)   NULL,
    first_name            NVARCHAR(100)  NULL,
    last_name             NVARCHAR(100)  NULL,
    over_award            NUMERIC(10, 2) NULL,
    restriction_reason_id NVARCHAR(1)    NULL,
    restriction_warn_id   NVARCHAR(1)    NULL,
    weeks_accumulated     FLOAT          NULL,
    nslsc_restrict1       NVARCHAR(1)    NULL,
    nslsc_restrict2       NVARCHAR(1)    NULL,
    nslsc_restrict3       NVARCHAR(1)    NULL,
    calsc_restrict1       NVARCHAR(1)    NULL,
    calsc_restrict2       NVARCHAR(1)    NULL,
    calsc_restrict3       NVARCHAR(1)    NULL,
    fi_restrict1          NVARCHAR(1)    NULL
)

-- SFAADMIN.DISAB_SERVICE_TYPE
CREATE TABLE sfa.disability_service
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.DISABILITY_TYPE
CREATE TABLE sfa.disability_type
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    csl_code    NVARCHAR(5)   NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.DISBURSEMENT_TYPE
CREATE TABLE sfa.disbursement_type
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.EDUCATION_LEVEL
CREATE TABLE sfa.education_level
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    rank        INT           NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.ENTITLEMENT_ERROR_CODES
CREATE TABLE sfa.entitlement_error_codes
(
    id             INT IDENTITY (1,1) PRIMARY KEY,
    code           NVARCHAR(50)  NOT NULL UNIQUE,
    description    NVARCHAR(200) NOT NULL,
    is_confirmed   BIT           NOT NULL DEFAULT 1,
    is_in_feedback BIT           NOT NULL DEFAULT 1,
    is_resend      BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.FIRST_NATION
CREATE TABLE sfa.first_nation
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    city_id     INT           NULL REFERENCES sfa.city (id),
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.FUNDING_GROUP
CREATE TABLE sfa.funding_group
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    sort_order  INT           NOT NULL DEFAULT 99,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.HIGH_SCHOOL
CREATE TABLE sfa.high_school
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    name        NVARCHAR(200) NOT NULL,
    city_id     INT           NOT NULL REFERENCES sfa.city (id),
    province_id INT           NOT NULL REFERENCES sfa.province (id),
    country_id  INT           NOT NULL REFERENCES sfa.country (id),
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.INFO_CATEGORY
CREATE TABLE sfa.info_category
(
    id            INT IDENTITY (1,1) PRIMARY KEY,
    canvas_name   NVARCHAR(200) NOT NULL,
    category_name NVARCHAR(200) NOT NULL,
    sort_order    INT           NOT NULL DEFAULT 99,
    first_item    NVARCHAR(200) NOT NULL,
    is_active     BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.INSTRUCTION_TYPE
CREATE TABLE sfa.instruction_type
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.INVESTMENT_TYPE
CREATE TABLE sfa.investment_type
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.LANGUAGE
CREATE TABLE sfa.language
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.MARITAL_STATUS
CREATE TABLE sfa.marital_status
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.OWNERSHIP
CREATE TABLE sfa.ownership
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.PARENT_CONTRIBUTION_FORMULA
CREATE TABLE sfa.parent_contribution_formula
(
    id                 INT IDENTITY (1,1) PRIMARY KEY,
    academic_year_id   INT            NOT NULL REFERENCES sfa.academic_year (id),
    income_from_amount NUMERIC(10, 2) NOT NULL,
    income_to_amount   NUMERIC(10, 2) NOT NULL,
    add_amount         NUMERIC(10, 2) NOT NULL,
    percentage         FLOAT          NOT NULL,
    subtract_amount    NUMERIC(10, 2),
    divide_by          INT            NOT NULL
)

-- SFAADMIN.PART_TIME_REASON
CREATE TABLE sfa.part_time_reason
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.PERIOD
CREATE TABLE sfa.period
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.PORTAL_STATUS
CREATE TABLE sfa.portal_status
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.PRESTUDY_EMPLOY_STATUS
CREATE TABLE sfa.prestudy_employment_status
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.PRESTUDY_TAX_RATE
CREATE TABLE sfa.prestudy_tax_rate
(
    id                 INT IDENTITY (1,1) PRIMARY KEY,
    academic_year_id   INT            NOT NULL REFERENCES sfa.academic_year (id),
    from_income_amount NUMERIC(10, 2) NOT NULL,
    to_income_amount   NUMERIC(10, 2) NOT NULL,
    prestudy_tax_rate  FLOAT          NOT NULL
)

-- SFAADMIN.PROGRAM
CREATE TABLE sfa.program
(
    id                 INT IDENTITY (1,1) PRIMARY KEY,
    description        NVARCHAR(200) NOT NULL,
    education_level_id INT           NOT NULL REFERENCES sfa.education_level (id),
    is_active          BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.RELATIONSHIP
CREATE TABLE sfa.relationship
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.REPORT_EXPENSE_CATEGORY
CREATE TABLE sfa.report_expense_category
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.REQUIREMENT_TYPE
CREATE TABLE sfa.requirement_type
(
    id                INT IDENTITY (1,1) PRIMARY KEY,
    description       NVARCHAR(200)  NOT NULL,
    document_location NVARCHAR(2000) NULL,
    show_online       BIT            NOT NULL DEFAULT 1,
    is_active         BIT            NOT NULL DEFAULT 1
)

-- SFAADMIN.SFA_DOCUMENT_LINK
CREATE TABLE sfa.sfa_document_link
(
    id                INT IDENTITY (1,1) PRIMARY KEY,
    description       NVARCHAR(200)  NOT NULL,
    document_location NVARCHAR(2000) NULL,
    sort_order        INT            NOT NULL DEFAULT 99,
    is_active         BIT            NOT NULL DEFAULT 1
)

-- SFAADMIN.SPOUSE_TAX_RATE
CREATE TABLE sfa.spouse_tax_rate
(
    id                 INT IDENTITY (1,1) PRIMARY KEY,
    academic_year_id   INT            NOT NULL REFERENCES sfa.academic_year (id),
    province_id        INT            NOT NULL REFERENCES sfa.province (id),
    from_income_amount NUMERIC(10, 2) NOT NULL,
    to_income_amount   NUMERIC(10, 2) NOT NULL,
    tax_rate           FLOAT          NOT NULL
)

-- SFAADMIN.STA_LOOKUP
CREATE TABLE sfa.sta_lookup
(
    id                      INT IDENTITY (1,1) PRIMARY KEY,
    academic_year_id        INT            NOT NULL REFERENCES sfa.academic_year (id) UNIQUE,
    dependent_0_amount      NUMERIC(10, 2) NOT NULL,
    dependent_1_amount      NUMERIC(10, 2) NOT NULL,
    dependent_2_amount      NUMERIC(10, 2) NOT NULL,
    dependent_3_amount      NUMERIC(10, 2) NOT NULL,
    dependent_4_amount      NUMERIC(10, 2) NOT NULL,
    second_residence_amount NUMERIC(10, 2) NOT NULL
)

-- SFAADMIN.STANDARD_OF_LIVING
CREATE TABLE sfa.standard_of_living
(
    id                     INT IDENTITY (1,1) PRIMARY KEY,
    academic_year_id       INT            NOT NULL REFERENCES sfa.academic_year (id),
    province_id            INT            NOT NULL REFERENCES sfa.province (id),
    family_size            INT            NOT NULL,
    standard_living_amount NUMERIC(10, 2) NOT NULL,
    UNIQUE (academic_year_id, province_id, family_size)
)

-- SFAADMIN.STATUS
CREATE TABLE sfa.status
(
    id                 INT IDENTITY (1,1) PRIMARY KEY,
    description        NVARCHAR(200) NOT NULL,
    online_description NVARCHAR(200) NULL,
    sort_order         INT           NOT NULL DEFAULT 99,
    is_active          BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.STATUS_REASON
CREATE TABLE sfa.status_reason
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    status_id   INT           NULL REFERENCES sfa.status (id),
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.STUDENT_CATEGORY
CREATE TABLE sfa.student_category
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    code        NVARCHAR(10)  NOT NULL UNIQUE,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.STUDENT_CONTRIBUTION
CREATE TABLE sfa.student_contribution
(
    id                  INT IDENTITY (1,1) PRIMARY KEY,
    academic_year_id    INT            NOT NULL REFERENCES sfa.academic_year (id),
    province_id         INT            NOT NULL REFERENCES sfa.province (id),
    period_id           INT            NOT NULL REFERENCES sfa.period (id),
    student_category_id INT            NOT NULL REFERENCES sfa.student_category (id),
    contribution_amount NUMERIC(10, 2) NOT NULL,
    UNIQUE (academic_year_id, province_id, period_id, student_category_id)
)

-- SFAADMIN.STUDENT_LIVING_ALLOWANCE
CREATE TABLE sfa.student_living_allowance
(
    id                     INT IDENTITY (1,1) PRIMARY KEY,
    academic_year_id       INT            NOT NULL REFERENCES sfa.academic_year (id),
    province_id            INT            NOT NULL REFERENCES sfa.province (id),
    student_category_id    INT            NOT NULL REFERENCES sfa.student_category (id),
    shelter_amount         NUMERIC(10, 2) NOT NULL,
    food_amount            NUMERIC(10, 2) NOT NULL,
    misc_amount            NUMERIC(10, 2) NOT NULL,
    public_tranport_amount NUMERIC(10, 2) NOT NULL,
    UNIQUE (academic_year_id, province_id, student_category_id)
)

-- SFAADMIN.STUDY_FIELD
CREATE TABLE sfa.study_field
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.STUDY_AREA
CREATE TABLE sfa.study_area
(
    id             INT IDENTITY (1,1) PRIMARY KEY,
    study_field_id INT           NOT NULL REFERENCES sfa.study_field (id),
    description    NVARCHAR(200) NOT NULL,
    show_online    BIT           NOT NULL DEFAULT 1,
    is_active      BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.STUDY_TAX_RATE
CREATE TABLE sfa.study_tax_rate
(
    id                 INT IDENTITY (1,1) PRIMARY KEY,
    academic_year_id   INT            NOT NULL REFERENCES sfa.academic_year (id),
    from_income_amount NUMERIC(10, 2) NOT NULL,
    to_income_amount   NUMERIC(10, 2) NOT NULL,
    study_tax_rate     FLOAT          NOT NULL
)

-- SFAADMIN.SYSTEM_DEP_PARAMS
CREATE TABLE sfa.system_dep_params
(
    id              INT IDENTITY (1,1) PRIMARY KEY,
    dependent_count INT            NOT NULL UNIQUE,
    weekly_amount   NUMERIC(10, 2) NOT NULL
)

-- SFAADMIN.SYSTEM_PARAMETER
CREATE TABLE sfa.system_parameter
(
    id                           INT IDENTITY (1,1) PRIMARY KEY,
    second_residence_rate        FLOAT          NULL,
    weekly_rate                  FLOAT          NULL,
    academic_start_year          NUMERIC(4, 0)  NULL,
    csl_max_weekly_amount        NUMERIC(4, 0)  NULL,
    minister_name                NVARCHAR(100)  NULL,
    financial_batch_id_start     NUMERIC(7, 0)  NULL,
    financial_batch_id_end       NUMERIC(7, 0)  NULL,
    financial_batch_id_year      NUMERIC(4, 0)  NULL,
    previous_fin_batch_id_start  NUMERIC(7, 0)  NULL,
    previous_fin_batch_id_end    NUMERIC(7, 0)  NULL,
    previous_fin_batch_id_year   NUMERIC(4, 0)  NULL,
    last_online_expire_date      DATETIME2(0)   NULL,
    last_msfaa_sent_date         DATETIME2(0)   NULL,
    last_msfaa_sent_seq_num      FLOAT          NULL,
    msfaa_enclosed_approval_text NVARCHAR(2000) NULL,
    msfaa_not_encl_approval_text NVARCHAR(2000) NULL,
    monthly_board_change_date    DATETIME2(0)   NULL,
    arial_ttf_directory          NVARCHAR(150)  NULL,
    letterhead_tray              NVARCHAR(100)  NULL,
    yg_quarter_weeks             FLOAT          NULL,
    yg_semester_weeks            FLOAT          NULL,
    yg_approval_text             NVARCHAR(1000) NULL,
    director_name_position       NVARCHAR(100)  NULL,
    director_email               NVARCHAR(100)  NULL,
    director_phone               NVARCHAR(24)   NULL,
    environment                  NVARCHAR(10)   NULL,
    cslft_msfaa_text             NVARCHAR(100)  NULL
)

-- SFAADMIN.TRANSPORTATION
CREATE TABLE sfa.transportation
(
    id                      INT IDENTITY (1,1) PRIMARY KEY,
    home_city_id            INT            NOT NULL REFERENCES sfa.city (id),
    institution_city_id     INT            NOT NULL REFERENCES sfa.city (id),
    travel_allowance_amount NUMERIC(10, 2) NOT NULL,
    airfare_amount          NUMERIC(10, 2) NOT NULL,
    UNIQUE (home_city_id, institution_city_id)
)

-- SFAADMIN.VERIFICATION_LOG
CREATE TABLE sfa.verification_log
(
    id                    INT IDENTITY (1,1) PRIMARY KEY,
    institution_campus_id INT NOT NULL REFERENCES sfa.institution_campus (id),
    is_emailed            BIT NOT NULL DEFAULT 1,
    student_count         INT NOT NULL
)

-- SFAADMIN.YEA
CREATE TABLE sfa.yea
(
    id           INT IDENTITY (1,1) PRIMARY KEY,
    first_name   NVARCHAR(100)  NOT NULL,
    last_name    NVARCHAR(100)  NOT NULL,
    birth_date   DATETIME2(0)   NULL,
    yukon_id     NVARCHAR(25)   NULL,
    yukon_id_old NVARCHAR(25)   NULL,
    school_year  INT            NULL,
    school_month INT            NULL,
    course       NVARCHAR(100)  NULL,
    yea_amount   NUMERIC(10, 2) NULL
)

-- SFAADMIN.YEA_UPDATE
CREATE TABLE sfa.yea_update
(
    id              INT IDENTITY (1,1) PRIMARY KEY,
    first_name      NVARCHAR(100)  NOT NULL,
    last_name       NVARCHAR(100)  NOT NULL,
    birth_date      DATETIME2(0)    NULL,
    yukon_id        NVARCHAR(25)   NULL,
    school_year     INT            NULL,
    school_month    INT            NULL,
    course          NVARCHAR(100)  NULL,
    yea_amount      NUMERIC(10, 2) NULL,
    orig_yea_amount NUMERIC(10, 2) NULL
)

-- SFAADMIN.YG_COST
CREATE TABLE sfa.yg_cost
(
    id                      INT IDENTITY (1,1) PRIMARY KEY,
    academic_year_id        INT            NOT NULL REFERENCES sfa.academic_year (id),
    effective_date          DATETIME2(0)   NULL,
    expiry_date             DATETIME2(0)   NULL,
    semester_living_amount  NUMERIC(10, 2) NOT NULL,
    semester_tuition_amount NUMERIC(10, 2) NOT NULL,
    semester_book_amount    NUMERIC(10, 2) NOT NULL,
    quarter_living_amount   NUMERIC(10, 2) NOT NULL,
    quarter_tuition_amount  NUMERIC(10, 2) NOT NULL,
    quarter_book_amount     NUMERIC(10, 2) NOT NULL,
    weekly_amount           NUMERIC(10, 2) NULL,
    allowed_percent         FLOAT          NOT NULL
)

-- SFA.ADDRESS_TYPE
CREATE TABLE sfa.address_type
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(100) NOT NULL UNIQUE,
    is_active   BIT           NOT NULL DEFAULT 1
)

-- SFA.PERSON
CREATE TABLE sfa.person
(
    id                 INT IDENTITY (1,1) PRIMARY KEY,
    language_id        INT           NULL REFERENCES sfa.language (id),
    sex_id             INT           NULL REFERENCES sfa.sex (id),
    birth_city_id      INT           NULL REFERENCES sfa.city (id),
    birth_province_id  INT           NULL REFERENCES sfa.province (id),
    birth_country_id   INT           NULL REFERENCES sfa.country (id),
    first_name         NVARCHAR(100) NULL,
    last_name          NVARCHAR(100) NULL,
    initials           NVARCHAR(20)  NULL,
    previous_last_name NVARCHAR(100) NULL,
    sin                NVARCHAR(15)  NULL,
    citizenship_code   INT           NULL,
    birth_date         DATE          NULL,
    telephone          NVARCHAR(24)  NULL,
    email              NVARCHAR(100) NULL
)

-- SFA.PERSON_ADDRESS
CREATE TABLE sfa.person_address
(
    id              INT IDENTITY (1,1) PRIMARY KEY,
    person_id       INT           NOT NULL REFERENCES sfa.person,
    address_type_id INT           NOT NULL REFERENCES sfa.address_type,
    address1        NVARCHAR(100) NULL,
    address2        NVARCHAR(100) NULL,
    city_id         INT           NULL REFERENCES sfa.city,
    province_id     INT           NULL REFERENCES sfa.province,
    country_id      INT           NULL REFERENCES sfa.country,
    postal_code     NVARCHAR(50)  NULL,
    notes           TEXT          NULL,
    telephone       NVARCHAR(24)  NULL,
    email           NVARCHAR(100) NULL,
    is_active       BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.STUDENT
CREATE TABLE sfa.student
(
    id                         INT IDENTITY (1,1) PRIMARY KEY,
    person_id                  INT            NOT NULL REFERENCES sfa.person,

    high_school_id             INT            NULL REFERENCES sfa.high_school (id),
    education_level_id         INT            NULL REFERENCES sfa.education_level (id),
    indigenous_learner_id      INT            NULL REFERENCES sfa.indigenous_learner,
    vendor_id                  NVARCHAR(25)   NULL,
    yukon_id                   NVARCHAR(20)   NULL,
    checked_for_yukon_id       BIT            NOT NULL DEFAULT 0,
    national_id                NVARCHAR(50)   NULL,

    locator_number             NVARCHAR(15)   NULL,
    is_crown_ward              BIT            NOT NULL DEFAULT 0,
    high_school_final_grade    NVARCHAR(15)   NULL,
    high_school_left_year      INT            NULL,
    high_school_left_month     INT            NULL,

    pre_funded_year            INT            NULL,
    pre_funding_years_used     FLOAT          NULL,

    csl_letter_date            DATE           NULL,
    csl_warn_code              NVARCHAR(10)   NULL,
    pre_over_award_amount      NUMERIC(10, 2) NULL,
    pre_yea_awards_used_amount NUMERIC(10, 2) NULL,

    user_name                  NVARCHAR(100)  NULL,
    user_password              NVARCHAR(1000) NULL,
    is_active                  BIT            NOT NULL DEFAULT 1,
    is_first_logon_flg         NVARCHAR(1)    NULL,
    last_logon_date            DATETIME2(0)   NULL,
    last_pw_change_date        DATETIME2(0)   NULL,

    yea_expiry_date            DATE           NULL,
    adj_yg_funding_weeks       INT            NULL,
    adj_sta_upgrading_weeks    INT            NULL,
    adj_outside_travel_cnt     INT            NULL
)

-- SFAADMIN.STUDENT_CONSENT
CREATE TABLE sfa.student_consent
(
    id                     INT IDENTITY (1,1) PRIMARY KEY,
    student_id             INT           NOT NULL REFERENCES sfa.student,
    start_academic_year_id INT           NOT NULL REFERENCES sfa.academic_year (id),
    end_academic_year_id   INT           NULL REFERENCES sfa.academic_year (id),
    consent_person         NVARCHAR(200) NOT NULL,
    consent_sfa            BIT           NOT NULL DEFAULT 0,
    consent_csl            BIT           NOT NULL DEFAULT 0
)

-- SFAADMIN.RESIDENCE
CREATE TABLE sfa.residence
(
    id             INT IDENTITY (1,1) PRIMARY KEY,
    student_id     INT           NOT NULL REFERENCES sfa.student,
    address        NVARCHAR(200) NULL,
    city_id        INT           NULL REFERENCES sfa.city,
    province_id    INT           NULL REFERENCES sfa.province,
    country_id     INT           NULL REFERENCES sfa.country,
    postal_code    NVARCHAR(50),
    in_school      INT           NULL,
    from_year      INT           NULL,
    from_month     INT           NULL,
    to_year        INT           NULL,
    to_month       INT           NULL,
    is_in_progress BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.REQUEST_TYPE
CREATE TABLE sfa.request_type
(
    id                      INT IDENTITY (1,1) PRIMARY KEY,
    application_type_id     INT            NULL REFERENCES sfa.application_type,
    funding_group_id        INT            NULL REFERENCES sfa.funding_group,
    batch_group_id          INT            NULL REFERENCES sfa.batch_group,
    description             NVARCHAR(200)  NULL,
    scholarship_flag        INT            NOT NULL,
    application_deadline    NVARCHAR(500)  NULL,
    regulation              NVARCHAR(200)  NULL,
    program_type            NVARCHAR(100)  NULL,
    static_description_flag INT            NULL,
    financial_coding        NVARCHAR(50)   NULL,
    t4a_required            BIT            NOT NULL DEFAULT 0,
    csg_other_flag          INT            NULL,
    gl_budget               FLOAT          NULL,
    auto_appear             NVARCHAR(50),
    show_online             BIT            NOT NULL DEFAULT 0,
    short_name              NVARCHAR(15)   NULL,
    help_url                NVARCHAR(1000) NULL,
    help_text               TEXT           NULL
)

-- SFAADMIN.REQUEST_REQUIREMENT
CREATE TABLE sfa.request_requirement
(
    id                  INT IDENTITY (1,1) PRIMARY KEY,
    request_type_id     INT           NOT NULL REFERENCES sfa.request_type,
    requirement_type_id INT           NOT NULL REFERENCES sfa.requirement_type,
    condition           NVARCHAR(200) NULL,
    UNIQUE (request_type_id, requirement_type_id)
)

-- SFAADMIN.INSTITUTION_REQUEST_TYPE
CREATE TABLE sfa.institution_request_type
(
    id                    INT IDENTITY (1,1) PRIMARY KEY,
    institution_campus_id INT NOT NULL REFERENCES sfa.institution_campus,
    request_type_id       INT NOT NULL REFERENCES sfa.request_type,
    UNIQUE (institution_campus_id, request_type_id)
)

-- SFAADMIN.EXPENESE_CATEGORY
CREATE TABLE sfa.expense_category
(
    id                         INT IDENTITY (1,1) PRIMARY KEY,
    report_expense_category_id INT           NULL REFERENCES sfa.report_expense_category,
    description                NVARCHAR(200) NOT NULL,
    is_active                  BIT           NOT NULL DEFAULT 1
)

-- SFAADMIN.EDUCATION
CREATE TABLE sfa.education
(
    id                    INT IDENTITY (1,1) PRIMARY KEY,
    student_id            INT NOT NULL REFERENCES sfa.student,
    institution_campus_id INT NULL REFERENCES sfa.institution_campus,
    study_area_id         INT NULL REFERENCES sfa.study_area,
    from_year             INT NULL,
    from_month            INT NULL,
    to_year               INT NULL,
    to_month              INT NULL,
    is_in_progress        BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.DEPENDENT
CREATE TABLE sfa.dependent
(
    id              INT IDENTITY (1,1) PRIMARY KEY,
    student_id      INT           NOT NULL REFERENCES sfa.student,
    relationship_id INT           NULL REFERENCES sfa.relationship,
    first_name      NVARCHAR(100) NULL,
    last_name       NVARCHAR(100) NULL,
    comments        TEXT          NULL,
    birth_date      DATE          NULL,
    is_in_progress  BIT           NOT NULL DEFAULT 1,
    is_conversion   BIT           NOT NULL DEFAULT 0,
    is_disability   BIT           NOT NULL DEFAULT 0
)

-- SFAADMIN.CORRESPONDENCE_TYPE
CREATE TABLE sfa.correspondence_type
(
    id          INT IDENTITY (1,1) PRIMARY KEY,
    description NVARCHAR(200) NOT NULL,
    is_active   BIT           NOT NULL DEFAULT 1
)

CREATE TABLE sfa.citizenship 
(
	id          INT IDENTITY (1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active   BIT           NOT NULL DEFAULT 1
)

CREATE TABLE sfa.csl_classification (
	id INT IDENTITY (1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.CORRESPONDENCE
CREATE TABLE sfa.correspondence
(
    id                     INT IDENTITY (1,1) PRIMARY KEY,
    officer_id             INT          NOT NULL REFERENCES sfa.[user],
    student_id             INT          NOT NULL REFERENCES sfa.student,
    request_type_id        INT          NULL REFERENCES sfa.request_type,
    correspondence_type_id INT          NOT NULL REFERENCES sfa.correspondence_type,
    comments               TEXT         NULL,
    correspondence_date    DATETIME2(0) NOT NULL,
    sent_date              DATETIME2(0) NULL,
    is_complete            BIT          NOT NULL DEFAULT 0
)

-- SFAADMIN.corres_batch_param
CREATE TABLE sfa.correspondence_batch_param
(
    id                 INT IDENTITY (1,1) PRIMARY KEY,
    correspondence_id  INT  NOT NULL REFERENCES sfa.correspondence,
    batch_parameter_id INT  NOT NULL REFERENCES sfa.batch_parameter,
    parameter_value    TEXT NULL,
    UNIQUE (correspondence_id, batch_parameter_id)
)

-- SFAADMIN.corr_type_batch_param
CREATE TABLE sfa.correspondence_type_batch_param
(
    id                     INT IDENTITY (1,1) PRIMARY KEY,
    correspondence_type_id INT           NOT NULL REFERENCES sfa.correspondence_type,
    batch_parameter_id     INT           NOT NULL REFERENCES sfa.batch_parameter,
    source                 NVARCHAR(200) NULL
)

-- SFAADMIN.COMMUNICATION
CREATE TABLE sfa.communication
(
    id                    INT IDENTITY (1,1) PRIMARY KEY,
    officer_id            INT          NOT NULL REFERENCES sfa.[user],
    student_id            INT          NOT NULL REFERENCES sfa.student,
    request_type_id       INT          NULL REFERENCES sfa.request_type,
    communication_type_id INT          NULL REFERENCES sfa.communication_type,
    comments              TEXT         NULL,
    communication_date    DATETIME2(0) NULL,
    show_alert            BIT          NOT NULL DEFAULT 0
)

CREATE TABLE sfa.student_persons
(
    id              INT IDENTITY (1,1) PRIMARY KEY,
    student_id      INT NOT NULL REFERENCES sfa.student,
    person_id       INT NULL REFERENCES sfa.person,
    relationship_id INT NOT NULL REFERENCES sfa.relationship,
    is_active       BIT NOT NULL DEFAULT 1
)

CREATE TABLE sfa.application
(
    id                                      INT IDENTITY (1, 1) PRIMARY KEY,
    student_id                              INT            NOT NULL REFERENCES sfa.student,
    academic_year_id                        INT            NOT NULL REFERENCES sfa.academic_year,
    institution_campus_id                   INT            NULL REFERENCES sfa.institution_campus,
    study_area_id                           INT            NULL REFERENCES sfa.study_area,
    program_id                              INT            NULL REFERENCES sfa.program,
    aboriginal_status_id                    INT            NULL REFERENCES sfa.aboriginal_status,
    marital_status_id                       INT            NULL REFERENCES sfa.marital_status,
    category_id                             INT            NULL REFERENCES sfa.category,
    first_nation_id                         INT            NULL REFERENCES sfa.first_nation,
    spouse_id                               INT            NULL REFERENCES sfa.person,
    parent1_id                              INT            NULL REFERENCES sfa.person,
    parent2_id                              INT            NULL REFERENCES sfa.person,
    parent1_income                          NUMERIC(10, 2) NULL,
    parent1_net_income                      NUMERIC(10, 2) NULL,
    parent1_tax_paid                        NUMERIC(10, 2) NULL,
    parent2_income                          NUMERIC(10, 2) NULL,
    parent2_net_income                      NUMERIC(10, 2) NULL,
    parent2_tax_paid                        NUMERIC(10, 2) NULL,
    school_email                            NVARCHAR(100)  NULL,
    school_telephone                        NVARCHAR(24)   NULL,
    spouse_hs_end_year                      INT            NULL,
    spouse_hs_end_month                     INT            NULL,
    spouse_prestudy_emp_status_id           INT            NULL REFERENCES sfa.prestudy_employment_status,
    spouse_pstudy_school_from               DATE           NULL,
    spouse_pstudy_school_to                 DATE           NULL,
    spouse_pstudy_income_comment            TEXT           NULL,
    spouse_study_emp_status_id              INT            NULL REFERENCES sfa.prestudy_employment_status,
    spouse_study_school_from                DATE           NULL,
    spouse_study_school_to                  DATE           NULL,
    is_spouse_study_csl                     BIT            NOT NULL DEFAULT 0,
    is_spouse_study_bus                     BIT            NOT NULL DEFAULT 0,
    spouse_study_distance                   INT            NULL,
    spouse_study_income_comment             TEXT           NULL,
    classes_start_date                      DATE           NULL,
    classes_end_date                        DATE           NULL,
    is_correspondence                       BIT            NOT NULL DEFAULT 0,
    is_coop_paid                            BIT            NOT NULL DEFAULT 0,
    citizenship_status                      INT            NULL REFERENCES sfa.citizenship,
    is_disabled                             BIT            NOT NULL DEFAULT 0,
    is_minority                             BIT            NOT NULL DEFAULT 0,
    student_number                          NVARCHAR(30)   NULL,
    program_year_total                      FLOAT          NULL,
    program_year                            FLOAT          NULL,
    is_two_residence                        BIT            NOT NULL DEFAULT 0,
    is_moving                               BIT            NOT NULL DEFAULT 0,
    csl_classification                      INT            NULL REFERENCES sfa.csl_classification,
    csl_previous_province_id                INT            NULL REFERENCES sfa.province,
    program_division_explanation            NVARCHAR(200)  NULL,
    prestudy_accom_code                     INT            NULL,
    prestudy_own_home                       BIT            NOT NULL DEFAULT 0,
    prestudy_board_amount                   NUMERIC(10, 2) NULL,
    prestudy_city_id                        INT            NULL REFERENCES sfa.city,
    prestudy_province_id                    INT            NULL REFERENCES sfa.province,
    prestudy_bus                            BIT            NOT NULL DEFAULT 0,
    prestudy_distance                       INT            NULL,
    prestudy_employ_status_id               INT            NULL REFERENCES sfa.prestudy_employment_status,
    study_accom_code                        INT            NULL,
    study_own_home                          BIT            NOT NULL DEFAULT 0,
    study_board_amount                      NUMERIC(10, 2) NULL,
    study_city_id                           INT            NULL REFERENCES sfa.city,
    study_province_id                       INT            NULL REFERENCES sfa.province,
    study_bus                               BIT            NOT NULL DEFAULT 0,
    study_distance                          INT            NULL,
    stat_info_comment                       NVARCHAR(500)  NULL,
    books_supplies_cost                     INT            NULL,
    outstanding_cslpt_amount                NUMERIC(10, 2) NULL,
    previous_csg_pt_amount                  NUMERIC(10, 2) NULL,
    percent_of_full_time                    INT            NULL,
    is_part_of_ft                           BIT            NOT NULL DEFAULT 0,
    study_weeks_count                       INT            NULL,
    class_hours_per_week                    NUMERIC(4, 1)  NULL,
    parent_residence_comment                NVARCHAR(500)  NULL,
    study_living_w_spouse                   BIT            NOT NULL DEFAULT 0,
    tuition_estimate_amount                 NUMERIC(10, 2) NULL,
    program_division                        INT            NULL,
    is_previous_cslft                       BIT            NOT NULL DEFAULT 0,
    is_previous_cslpt                       BIT            NOT NULL DEFAULT 0,
    coop_start_year                         INT            NULL,
    coop_start_month                        INT            NULL,
    coop_end_year                           INT            NULL,
    coop_end_month                          INT            NULL,
    exclude_from_count                      BIT            NOT NULL DEFAULT 0,
    is_perm_disabled                        BIT            NOT NULL DEFAULT 0,
    disabled_equipment                      NVARCHAR(500)  NULL,
    previous_csg_disability_amount          NUMERIC(10, 2) NULL,
    previous_csg_fem_doc_amount             NUMERIC(10, 2) NULL,
    credit_chk_reqd_date                    DATE           NULL,
    credit_chk_fax_sent_date                DATE           NULL,
    credit_chk_passed_date                  DATE           NULL,
    credit_chk_passed                       BIT            NOT NULL DEFAULT 0,
    credit_chk_appeal_date                  DATE           NULL,
    credit_chk_app_comp_date                DATE           NULL,
    credit_chk_app_comp                     BIT            NOT NULL DEFAULT 0,
    credit_chk_comp_date                    DATE           NULL,
    csl_clearance_date                      DATE           NULL,
    prestudy_csl_classification             INT            NULL REFERENCES sfa.csl_classification,
    yea_tot_receipt_amount                  NUMERIC(10, 2) NULL,
    academic_percent                        FLOAT          NULL,
    csl_restriction_comment                 NVARCHAR(2000) NULL,
    in_progress_page                        INT            NULL,
    online_start_date                       DATE           NULL,
    online_submit_date                      DATE           NULL,
    rem_transition_grant_years              INT            NULL,
    student_ln150_income                    NUMERIC(10, 2) NULL,
    spouse_ln150_income                     NUMERIC(10, 2) NULL,
    taxes1_filed_year                       INT            NULL,
    taxes2_filed_year                       INT            NULL,
    taxes1_filed_province_id                INT            NULL REFERENCES sfa.province,
    taxes2_filed_province_id                INT            NULL REFERENCES sfa.province,
    taxes1_not_filed                        BIT            NOT NULL DEFAULT 0,
    taxes2_not_filed                        BIT            NOT NULL DEFAULT 0,
    taxes1_verified                         BIT            NOT NULL DEFAULT 0,
    taxes2_verified                         BIT            NOT NULL DEFAULT 0,
    applied_other_funding                   BIT            NOT NULL DEFAULT 0,
    csl_restriction_warn_id                 INT            NULL REFERENCES sfa.csl_code,
    csl_restriction_reason_id               INT            NULL REFERENCES sfa.csl_code,
    courses_per_week                        INT            NULL,
    prestudy_start_date                     DATE           NULL,
    prestudy_end_date                       DATE           NULL,
    valid_driver_license                    BIT            NULL,
    valid_driver_license_comment            TEXT           NULL,
    valid_yhcip                             BIT            NULL,
    valid_yhcip_comment                     TEXT           NULL,
    has_consent_to_share_data               BIT            NOT NULL DEFAULT 0
)

CREATE TABLE sfa.agency_assistance
(
    id                 INT IDENTITY PRIMARY KEY,
    agency_id          INT            NOT NULL REFERENCES sfa.agency,
    application_id     INT            NOT NULL REFERENCES sfa.application,
    amount             NUMERIC(10, 2) NOT NULL,
    is_tuition         BIT            NOT NULL DEFAULT 0,
    is_living_expenses BIT            NOT NULL DEFAULT 0,
    is_books           BIT            NOT NULL DEFAULT 0,
    is_transportation  BIT            NOT NULL DEFAULT 0,
    other_purpose      NVARCHAR(500)  NULL,
    agency_comment     NVARCHAR(500)  NULL,
    UNIQUE (agency_id, application_id)
)

CREATE TABLE sfa.course_enrolled
(
    id                  INT IDENTITY PRIMARY KEY,
    application_id      INT           NOT NULL REFERENCES sfa.application,
    instruction_type_id INT           NOT NULL REFERENCES sfa.instruction_type,
    description         NVARCHAR(500) NOT NULL,
    course_code         NVARCHAR(100) NULL
)

CREATE TABLE sfa.dependent_eligibility
(
    id                     INT IDENTITY PRIMARY KEY,
    application_id         INT  NOT NULL REFERENCES sfa.application,
    dependent_id           INT  NOT NULL REFERENCES sfa.dependent,
    is_eligible            BIT  NOT NULL DEFAULT 0,
    is_post_secondary      BIT  NOT NULL DEFAULT 0,
    resides_with_student   BIT  NOT NULL DEFAULT 0,
    is_shares_custody      BIT  NOT NULL DEFAULT 0,
    shares_custody_details TEXT NULL,
    is_csl_eligible        BIT  NOT NULL DEFAULT 0,
    is_csg_eligible        BIT  NOT NULL DEFAULT 0,
    is_in_progress         BIT  NOT NULL DEFAULT 0
)

CREATE TABLE sfa.disability
(
    id                 INT IDENTITY PRIMARY KEY,
    application_id     INT           NOT NULL REFERENCES sfa.application,
    disability_type_id INT           NOT NULL REFERENCES sfa.disability_type,
    description        NVARCHAR(100) NULL
)

CREATE TABLE sfa.disability_requirement
(
    id                    INT IDENTITY PRIMARY KEY,
    application_id        INT NOT NULL REFERENCES sfa.application,
    disability_service_id INT NOT NULL REFERENCES sfa.disability_service
)

CREATE TABLE sfa.expense
(
    id             INT IDENTITY PRIMARY KEY,
    application_id INT            NOT NULL REFERENCES sfa.application,
    category_id    INT            NULL REFERENCES sfa.expense_category,
    period_id      INT            NOT NULL REFERENCES sfa.period,
    description    NVARCHAR(500)  NULL,
    amount         NUMERIC(10, 2) NOT NULL DEFAULT 0.00
)

CREATE TABLE sfa.funding_request
(
    id                 INT IDENTITY PRIMARY KEY,
    application_id     INT            NOT NULL REFERENCES sfa.application,
    request_type_id    INT            NULL REFERENCES sfa.request_type,
    status_id          INT            NULL REFERENCES sfa.status,
    status_reason_id   INT            NULL REFERENCES sfa.status_reason,
    comments           TEXT           NULL,
    custom_status      TEXT           NULL,
    received_date      DATE           NULL,
    status_date        DATE           NULL,
    yea_request_amount NUMERIC(10, 2) NULL,
    yea_request_type   INT            NULL,
    csl_request_amount NUMERIC(10, 2) NULL,
    is_csl_full_amount BIT            NULL     DEFAULT 0,
    is_csg_only        BIT            NOT NULL DEFAULT 0,
    student_meet_hs_o_equiv_req             BIT            NULL DEFAULT 0,
    student_meet_residency_req              BIT            NULL DEFAULT 0,
    student_isnt_elig_f_fund_in_another_jur BIT            NULL DEFAULT 0,
    student_is_in_ft_study                  BIT            NULL DEFAULT 0,
    student_is_att_in_elig_prog_des_ps_inst BIT            NULL DEFAULT 0,
    student_is_elig_for_airfare_trvl_amount BIT            NULL DEFAULT 0,
    student_is_mov_to_anth_cmm_to_attd_prgm BIT            NULL DEFAULT 0,
    student_is_maintening_two_residences    BIT            NULL DEFAULT 0,
    student_w_not_receive_fund_from_otr_org BIT            NULL DEFAULT 0
)

CREATE TABLE sfa.application_part_time_reason
(
    id                  INT IDENTITY PRIMARY KEY,
    application_id      INT NOT NULL REFERENCES sfa.application,
    part_time_reason_id INT NOT NULL REFERENCES sfa.part_time_reason
)

CREATE TABLE sfa.investment
(
    id                 INT IDENTITY PRIMARY KEY,
    application_id     INT NOT NULL REFERENCES sfa.application,
    ownership_id       INT NULL REFERENCES sfa.ownership,
    investment_type_id INT NULL REFERENCES sfa.investment_type,
    market_value       NUMERIC(10, 2),
    is_rrsp            BIT NOT NULL DEFAULT 0,
    is_joint           BIT NOT NULL DEFAULT 0
)

CREATE TABLE sfa.msfaa
(
    id                 INT IDENTITY PRIMARY KEY,
    application_id     INT          NOT NULL REFERENCES sfa.application,
    student_id         INT          NOT NULL REFERENCES sfa.student,
    sent_date          DATE         NULL,
    signed_date        DATE         NULL,
    received_date      DATE         NULL,
    cancel_date        DATE         NULL,
    msfaa_status       NVARCHAR(20) NULL,
    cancel_reason      NVARCHAR(50) NULL,
    sent_seq_number    INT          NULL,
    last_reminder_sent INT          NULL,
    is_full_time       BIT          NOT NULL DEFAULT 1
)

CREATE TABLE sfa.msfaa_email_log
(
    id            INT IDENTITY PRIMARY KEY,
    msfaa_id      INT           NOT NULL REFERENCES sfa.msfaa,
    is_emailed    BIT           NOT NULL DEFAULT 0,
    reminder_sent INT           NOT NULL,
    email         NVARCHAR(100) NOT NULL
)

CREATE TABLE sfa.parent_dependent
(
    id                       INT IDENTITY PRIMARY KEY,
    application_id           INT           NOT NULL REFERENCES sfa.application,
    relationship_id          INT           NULL REFERENCES sfa.relationship,
    first_name               NVARCHAR(100) NULL,
    last_name                NVARCHAR(100) NULL,
    birth_date               DATE          NULL,
    age                      INT           NULL,
    is_residing              BIT           NOT NULL DEFAULT 1,
    is_shared_custody        BIT           NOT NULL DEFAULT 1,
    is_attend_post_secondary BIT           NOT NULL DEFAULT 1,
    comments                 TEXT          NULL,
    is_eligible              BIT           NOT NULL DEFAULT 1,
    is_disabled              BIT           NOT NULL DEFAULT 1,
    conversion               BIT           NOT NULL DEFAULT 1
)

CREATE TABLE sfa.parent_resident
(
    id             INT IDENTITY PRIMARY KEY,
    application_id INT NOT NULL REFERENCES sfa.application,
    city_id        INT NULL REFERENCES sfa.city,
    province_id    INT NULL REFERENCES sfa.province,
    country_id     INT NULL REFERENCES sfa.country,
    from_year      INT NULL,
    from_month     INT NULL,
    to_year        INT NULL,
    to_month       INT NULL
)

CREATE TABLE sfa.correspondence_request_status
(
    id                     INT IDENTITY PRIMARY KEY,
    request_type_id        INT NOT NULL REFERENCES sfa.request_type,
    status_id              INT NOT NULL REFERENCES sfa.status,
    correspondence_type_id INT NOT NULL REFERENCES sfa.correspondence_type,
    UNIQUE (request_type_id, status_id, correspondence_type_id)
)

CREATE TABLE sfa.requirement_met
(
    id                  INT IDENTITY PRIMARY KEY,
    application_id      INT  NOT NULL REFERENCES sfa.application,
    requirement_type_id INT  NULL REFERENCES sfa.requirement_type,
    completed_date      DATE NULL
)

CREATE TABLE sfa.communication_log
(
    id              INT IDENTITY PRIMARY KEY,
    msfaa_id        INT           NULL REFERENCES sfa.msfaa,
    sent_from_email VARCHAR(100)  NOT NULL,
    sent_to_email   VARCHAR(100)  NOT NULL,
    sent_to_cc      VARCHAR(1000) NOT NULL,
    subject         TEXT          NULL,
    reminder_sent   INT           NULL,
    is_emailed      BIT           NOT NULL DEFAULT 0
)

CREATE TABLE sfa.assessment
(
    id                             INT IDENTITY PRIMARY KEY,
    allowed_books                  FLOAT          NULL,
    allowed_months                 FLOAT          NULL,
    allowed_percent                NUMERIC(5, 2)  NULL,
    allowed_tuition                NUMERIC(10, 2) NULL,
    assessed_amount                NUMERIC(10, 2) NULL,
    assessed_date                  DATE           NULL,
    change_reason_comment          TEXT           NULL,
    dependent_count                FLOAT          NULL,
    effective_rate_date            DATE           NULL,
    home_city_id                   INT            NULL REFERENCES sfa.city,
    living_costs                   NUMERIC(10, 2) NULL,
    travel_allowance               NUMERIC(10, 2) NULL,
    weekly_amount                  NUMERIC(10, 2) NULL,
    assessment_type_id             INT            NULL REFERENCES sfa.assessment_type,
    destination_city_id            INT            NULL REFERENCES sfa.city,
    funding_request_id             INT            NULL REFERENCES sfa.funding_request,
    disbursements_required         INT            NULL,
    weeks_allowed                  FLOAT          NULL,
    second_residence_rate          FLOAT          NULL,
    classes_end_date               DATE           NULL,
    prestudy_accom_code            INT            NULL,
    prestudy_province_id           INT            NULL REFERENCES sfa.province,
    classes_start_date             DATE           NULL,
    airfare_amount                 NUMERIC(10, 2) NULL,
    air_travel_disbursement_period INT            NULL,
    shelter_month                  FLOAT          NULL,
    p_trans_month                  FLOAT          NULL,
    r_trans_16wk                   FLOAT          NULL,
    day_care_allowable             FLOAT          NULL,
    depend_food_allowable          FLOAT          NULL,
    depend_tran_allowable          FLOAT          NULL,
    pstudy_shelter_month           FLOAT          NULL,
    pstudy_p_trans_month           FLOAT          NULL,
    pstudy_day_care_allow          FLOAT          NULL,
    pstudy_depend_food_allow       FLOAT          NULL,
    pstudy_depend_tran_allow       FLOAT          NULL,
    pstudy_start_date              DATE           NULL,
    pstudy_end_date                DATE           NULL,
    csl_assessed_need              FLOAT          NULL,
    study_province_id              INT            NULL REFERENCES sfa.province,
    csl_over_reason_id             INT            NULL REFERENCES sfa.csl_reason,
    csl_non_reason_id              INT            NULL REFERENCES sfa.csl_reason,
    over_award                     FLOAT          NULL,
    student_tax_rate               FLOAT          NULL,
    spouse_tax_rate                FLOAT          NULL,
    spouse_pstudy_tax_rate         FLOAT          NULL,
    stud_pstudy_tax_rate           FLOAT          NULL,
    parent1_income                 FLOAT          NULL,
    parent2_income                 FLOAT          NULL,
    parent1_tax_paid               FLOAT          NULL,
    parent2_tax_paid               FLOAT          NULL,
    books_supplies_cost            FLOAT          NULL,
    tuition_estimate               FLOAT          NULL,
    uncapped_costs_total           FLOAT          NULL,
    uncapped_pstudy_total          FLOAT          NULL,
    day_care_actual                FLOAT          NULL,
    stud_pstudy_gross              FLOAT          NULL,
    spouse_pstudy_gross            FLOAT          NULL,
    pstudy_day_care_actual         FLOAT          NULL,
    student_gross_income           FLOAT          NULL,
    spouse_gross_income            FLOAT          NULL,
    prestudy_csl_classification    FLOAT          NULL REFERENCES sfa.csl_classification,
    marital_status_id              INT            NULL REFERENCES sfa.marital_status,
    spouse_province_id             INT            NULL REFERENCES sfa.province,
    study_accom_code               FLOAT          NULL,
    csl_classification             FLOAT          NULL REFERENCES sfa.csl_classification,
    family_size                    FLOAT          NULL,
    parent_ps_depend_count         FLOAT          NULL,
    parent_province                VARCHAR(100)   NULL,
    discretionary_cost             FLOAT          NULL,
    discretionary_cost_actual      FLOAT          NULL,
    study_distance                 FLOAT          NULL,
    prestudy_distance              FLOAT          NULL,
    prestudy_bus_flag              FLOAT          NULL,
    study_bus_flag                 FLOAT          NULL,
    study_living_w_spouse_flag     FLOAT          NULL,
    csl_full_amt_flag              FLOAT          NULL,
    study_area_id                  INT            NULL REFERENCES sfa.study_area,
    program_id                     INT            NULL REFERENCES sfa.program,
    [period]                       VARCHAR(3)     NULL,
    csl_request_amount             FLOAT          NULL,
    return_uncashable_cert         FLOAT          NULL,
    years_funded_equivalent        NUMERIC(5, 2)  NULL,
    study_weeks                    FLOAT          NULL,
    study_months                   FLOAT          NULL,
    pstudy_expected_contrib        FLOAT          NULL,
    spouse_expected_income         FLOAT          NULL,
    asset_tax_rate                 FLOAT          NULL,
    x_trans_total                  FLOAT          NULL,
    relocation_total               FLOAT          NULL,
    pstudy_x_trans_total           FLOAT          NULL,
    married_pstudy                 NUMERIC(10, 2) NULL,
    married_study                  NUMERIC(10, 2) NULL,
    married_assets                 NUMERIC(10, 2) NULL,
    entitlement_days               FLOAT          NULL,
    parent_contribution_override   NUMERIC(10, 2) NULL,
    total_grant_awarded            NUMERIC(10, 2) NULL,
    over_award_disbursement_period INT            NULL,
    over_award_applied_flg         VARCHAR(3)     NULL,
    pre_leg_amount                 FLOAT          NULL,
    assessment_adj_amount          FLOAT          NULL,
    student_ln150_income           FLOAT          NULL,
    student_contribution           FLOAT          NULL,
    student_contrib_exempt         VARCHAR(3)     NOT NULL,
    spouse_contrib_exempt          VARCHAR(3)     NOT NULL,
    spouse_contribution            FLOAT          NULL,
    spouse_ln150_income            FLOAT          NULL,
    student_contribution_review    VARCHAR(3)     NOT NULL,
    spouse_contribution_review     VARCHAR(3)     NOT NULL,
    parent_contribution_review     VARCHAR(3)     NOT NULL,
    student_family_size            FLOAT          NULL,
    student_expected_contribution  FLOAT          NULL,
    student_previous_contribution  FLOAT          NULL,
    spouse_expected_contribution   FLOAT          NULL,
    spouse_previous_contribution   FLOAT          NULL,
    student_contribution_override  FLOAT          NULL,
    spouse_contribution_override   FLOAT          NULL
)

CREATE TABLE sfa.csl_nars_history
(
    id                          INT IDENTITY PRIMARY KEY,
    application_id              INT            NOT NULL REFERENCES sfa.application,
    student_id                  INT            NOT NULL REFERENCES sfa.student,
    assessment_id               INT            NOT NULL REFERENCES sfa.assessment,
    academic_year               INT            NOT NULL REFERENCES sfa.academic_year,
    sin                         NVARCHAR(9)    NULL,
    loan_year                   NVARCHAR(8)    NULL,
    postal_prefix               NVARCHAR(3)    NULL,
    birth_date                  DATE           NULL,
    gender                      NVARCHAR(1)    NULL,
    marital_status              NVARCHAR(1)    NULL,
    institution_code            NVARCHAR(12)   NULL,
    field_of_study              NVARCHAR(8)    NULL,
    year_study                  NVARCHAR(2)    NULL,
    study_weeks                 INT            NULL,
    study_start_date            DATE           NULL,
    study_end_date              DATE           NULL,
    loan_type                   NVARCHAR(2)    NULL,
    course_percentage           INT            NULL,
    credit_check_flg            NVARCHAR(1)    NULL,
    credit_check_status         NVARCHAR(1)    NULL,
    disabled_flg                NVARCHAR(1)    NULL,
    disabled_type               NVARCHAR(1)    NULL,
    minority_flg                NVARCHAR(1)    NULL,
    aboriginal_status_flg       NVARCHAR(1)    NULL,
    aboriginal_category         NVARCHAR(1)    NULL,
    assessment_date             DATE           NULL,
    csl_classification          INT            NULL REFERENCES sfa.csl_classification,
    family_size                 INT            NULL,
    post_secondary_children     INT            NULL,
    spouse_student_flg          NVARCHAR(1)    NULL,
    spouse_csl_flg              NVARCHAR(1)    NULL,
    spouse_sin                  NVARCHAR(9)    NULL,
    children_to_11              INT            NULL,
    children_over_12_not_dis    INT            NULL,
    children_over_12_dis        INT            NULL,
    pstudy_student_income       FLOAT          NULL,
    study_income_gov            FLOAT          NULL,
    study_income_gov_tot        FLOAT          NULL,
    study_income_priv           FLOAT          NULL,
    study_income_gov_ei         FLOAT          NULL,
    study_income_cpp            FLOAT          NULL,
    study_income_wc             FLOAT          NULL,
    study_income_gov_soc        FLOAT          NULL,
    study_income_nont_gov       FLOAT          NULL,
    study_income_nont_gov_tot   FLOAT          NULL,
    study_income_merit          FLOAT          NULL,
    study_income_priv_merit     FLOAT          NULL,
    study_income_employ         FLOAT          NULL,
    study_income_cs             FLOAT          NULL,
    study_income_alimony        FLOAT          NULL,
    study_income_other          FLOAT          NULL,
    study_income_other_tot      FLOAT          NULL,
    study_student_income        FLOAT          NULL,
    parent1_income              NUMERIC(10, 2) NULL,
    parent2_income              NUMERIC(10, 2) NULL,
    student_rrsp                NUMERIC(10, 2) NULL,
    student_vehicle             NUMERIC(10, 2) NULL,
    student_asset               NUMERIC(10, 2) NULL,
    spouse_rrsp                 NUMERIC(10, 2) NULL,
    spouse_vehicle              FLOAT          NULL,
    spouse_asset                NUMERIC(10, 2) NULL,
    student_years_since_hs      INT            NULL,
    spouse_years_since_hs       INT            NULL,
    student_study_contribution  FLOAT          NULL,
    student_pstudy_contribution FLOAT          NULL,
    spouse_study_contribution   FLOAT          NULL,
    parental_contribution       FLOAT          NULL,
    assessed_resources          FLOAT          NULL,
    tuition_estimate            FLOAT          NULL,
    assessed_need               FLOAT          NULL,
    unmet_need                  FLOAT          NULL,
    request_need                FLOAT          NULL,
    csl_before_overaward        FLOAT          NULL,
    psl_before_overaward        FLOAT          NULL,
    csl_recovered_overaward     FLOAT          NULL,
    psl_recovered_overaward     FLOAT          NULL,
    csl_auth_ft                 NVARCHAR(1)    NULL,
    csl_auth_pt                 NVARCHAR(1)    NULL,
    csl_auth_loan_amnt          FLOAT          NULL,
    csl_auth_loan_date          DATE           NULL,
    psl_auth_loan_amnt          FLOAT          NULL,
    psl_auth_loan_date          DATE           NULL,
    assistance_total            FLOAT          NULL,
    assessment_review_flg       NVARCHAR(1)    NULL,
    csg_doctoral_amount         FLOAT          NULL,
    csg_disability_amount       FLOAT          NULL,
    cag_perm_disability_amnt    FLOAT          NULL,
    csg_dependent_amount        FLOAT          NULL,
    csg_date                    DATE           NULL,
    cms_amount                  FLOAT          NULL,
    cms_date                    DATE           NULL,
    prov_grant_unmet_amnt       FLOAT          NULL,
    prov_grant_amnt             FLOAT          NULL,
    prov_grant_date             DATE           NULL,
    assessment_code             FLOAT          NULL,
    version_num                 FLOAT          NULL,
    app_status                  NVARCHAR(1)    NULL,
    reassess_indicator          NVARCHAR(1)    NULL,
    cat_code                    NVARCHAR(1)    NULL,
    single_ind_stat_reas        NVARCHAR(1)    NULL,
    social_assist_flg           NVARCHAR(1)    NULL,
    parent1_sin                 NVARCHAR(9)    NULL,
    parent1_postal_code         NVARCHAR(6)    NULL,
    parent2_sin                 NVARCHAR(9)    NULL,
    parent2_postal_code         NVARCHAR(6)    NULL,
    postal_suffix               NVARCHAR(3)    NULL,
    pstudy_weeks                FLOAT          NULL,
    pstudy_home_away            NVARCHAR(1)    NULL,
    study_home_away             NVARCHAR(1)    NULL,
    program_type                NVARCHAR(1)    NULL,
    academic_year_study         FLOAT          NULL,
    year_in_program             FLOAT          NULL,
    program_duration            FLOAT          NULL,
    early_withdrawal_ind        NVARCHAR(1)    NULL,
    date_left_hs                DATE           NULL,
    spouse_date_left_hs         DATE           NULL,
    pstudy_income_other         FLOAT          NULL,
    pstudy_income_employ        FLOAT          NULL,
    spouse_income_annual        FLOAT          NULL,
    spouse_pstudy_income        FLOAT          NULL,
    spouse_study_income         FLOAT          NULL,
    parent1_income_taxable      FLOAT          NULL,
    parent1_income_taxpaid      FLOAT          NULL,
    parent2_income_taxable      FLOAT          NULL,
    parent2_income_taxpaid      FLOAT          NULL,
    joint_asset_flg             NVARCHAR(1)    NULL,
    student_resp                FLOAT          NULL,
    parental_asset              FLOAT          NULL,
    joint_contrib_flg           NVARCHAR(1)    NULL,
    spouse_pstudy_contrib       FLOAT          NULL,
    student_asset_contrib       FLOAT          NULL,
    spouse_asset_contrib        FLOAT          NULL,
    parental_asset_contrib      FLOAT          NULL,
    other_resources             FLOAT          NULL,
    pstudy_cost_living          FLOAT          NULL,
    pstudy_cost_loan            FLOAT          NULL,
    pstudy_pt_cost_tuitn        FLOAT          NULL,
    study_cost_living           FLOAT          NULL,
    study_cost_books            FLOAT          NULL,
    study_cost_childcare_allw   FLOAT          NULL,
    study_cost_childcare_actl   FLOAT          NULL,
    study_cost_return_trans     FLOAT          NULL,
    study_cost_other_trans      FLOAT          NULL,
    study_cost_relocation       FLOAT          NULL,
    study_cost_other            FLOAT          NULL,
    study_cost_total            FLOAT          NULL,
    aboriginal_cat              NVARCHAR(1)    NULL,
    stud_gross_annual_income    NUMERIC(10, 2) NULL,
    spouse_gross_annual_income  NUMERIC(10, 2) NULL,
    csg_li                      NUMERIC(10, 2) NULL,
    csg_mi                      NUMERIC(10, 2) NULL,
    csg_pd                      NUMERIC(10, 2) NULL,
    csg_ftdep                   NUMERIC(10, 2) NULL,
    csg_pdse                    NUMERIC(10, 2) NULL,
    transition_grant_amt        NUMERIC(10, 2) NULL,
    tgrant_yrs_remaining        NUMERIC(10, 2) NULL,
    pstudy_dep_cost_living      NUMERIC(10, 2) NULL,
    previous_disbursement       NUMERIC(10, 2) NULL,
    study_income_gov_grant      FLOAT          NULL,
    pstudy_x_trans_total        FLOAT          NULL,
    study_directed_income       FLOAT          NULL,
    financial_investments       FLOAT          NULL,
    married_adjustment          FLOAT          NULL,
    study_cost_computers        FLOAT          NULL
)

CREATE TABLE sfa.disbursement
(
    id                        INT IDENTITY PRIMARY KEY,
    disbursement_type_id      INT            NULL REFERENCES sfa.disbursement_type,
    assessment_id             INT            NULL REFERENCES sfa.assessment,
    funding_request_id        INT            NOT NULL REFERENCES sfa.funding_request,
    disbursed_amount          NUMERIC(10, 2) NULL,
    due_date                  DATE           NULL,
    tax_year                  INT            NULL,
    issue_date                DATE           NULL,
    paid_amount               NUMERIC(10, 2) NULL,
    change_reason_id          INT            NULL REFERENCES sfa.change_reason,
    financial_batch_id        INT            NULL,
    financial_batch_id_year   INT            NULL,
    financial_batch_run_date  DATE           NULL,
    financial_batch_serial_no FLOAT          NULL,
    transaction_number        VARCHAR(20)    NULL,
    csl_cert_seq_number       INT            NULL,
    ecert_sent_date           DATE           NULL,
    ecert_response_date       DATE           NULL,
    ecert_status              VARCHAR(20)    NULL,
    ecert_portal_status_id    INT            NULL
)

CREATE TABLE sfa.entitlement_error
(
    id                        INT IDENTITY PRIMARY KEY,
    disbursement_id           INT NOT NULL REFERENCES sfa.disbursement,
    entitlement_error_code_id INT NOT NULL REFERENCES sfa.entitlement_error_codes,
    is_resend                 BIT NOT NULL DEFAULT 0
)

CREATE TABLE sfa.file_reference (
	object_key VARCHAR(21) PRIMARY KEY,
	object_key_pdf VARCHAR(21) UNIQUE null,
	upload_user VARCHAR(100) NOT NULL,
	upload_date DATETIME2(0) NOT NULL,
	upload_source VARCHAR(50) NOT NULL,
    student_id INT NOT NULL REFERENCES sfa.student,
    application_id INT NOT NULL REFERENCES sfa.application,
    status VARCHAR(50) NOT NULL,
    status_date DATETIME2(0) NOT NULL,
    bucket VARCHAR(50) NOT NULL,
    file_name NVARCHAR(200) NOT NULL,
    mime_type NVARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL
)
