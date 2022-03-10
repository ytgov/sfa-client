
-- SFAADMIN.ABORIGINAL_STATUS
CREATE TABLE sfa.aboriginal_status (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL UNIQUE,
	is_active BIT NOT NULL DEFAULT 1,
	nars_status_id INT NULL,
	sort_order INT NOT NULL DEFAULT 99
)

SET IDENTITY_INSERT sfa.aboriginal_status ON

INSERT INTO sfa.aboriginal_status (id, description, is_active, nars_status_id, sort_order)
SELECT aboriginal_status_id, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END, NARS_STATUS_ID, COALESCE(SORT_ORDER, 99)
FROM SFAADMIN.ABORIGINAL_STATUS

SET IDENTITY_INSERT sfa.aboriginal_status OFF

-- SFAADMIN.AGE_DISTRIBUTION
CREATE TABLE sfa.age_distribution (
	id INT IDENTITY(1,1) PRIMARY KEY,
	start_age INT NOT NULL,
	end_age INT NOT NULL
)

SET IDENTITY_INSERT sfa.age_distribution ON

INSERT INTO sfa.age_distribution (id, start_age, end_age)
SELECT AGE_DISTRIBUTION_ID, START_AGE, END_AGE
FROM SFAADMIN.AGE_DISTRIBUTION

SET IDENTITY_INSERT sfa.age_distribution OFF

-- SFAADMIN.AGENCY
CREATE TABLE sfa.agency (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.agency ON

INSERT INTO sfa.agency (id, description, is_active)
SELECT AGENCY_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.agency

SET IDENTITY_INSERT sfa.agency OFF

-- SFAADMIN.APPLICATION_TYPE
CREATE TABLE sfa.application_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.application_type ON

INSERT INTO sfa.application_type (id, description, is_active)
SELECT APPLICATION_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.application_type

SET IDENTITY_INSERT sfa.application_type OFF

-- SFAADMIN.ASSESSMENT_TYPE
CREATE TABLE sfa.assessment_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.assessment_type ON

INSERT INTO sfa.assessment_type (id, description, is_active)
SELECT ASSESSMENT_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.assessment_type

SET IDENTITY_INSERT sfa.assessment_type OFF

-- SFAADMIN.BATCH_GROUP
CREATE TABLE sfa.batch_group (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	prefix NVARCHAR(200) NULL, 
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.batch_group ON

INSERT INTO sfa.batch_group (id, description, prefix, is_active)
SELECT BATCH_GROUP_ID, DESCRIPTION, BATCH_GROUP_PREFIX, 1
FROM SFAADMIN.batch_group

SET IDENTITY_INSERT sfa.batch_group OFF

-- SFAADMIN.BATCH_PARAMETER
CREATE TABLE sfa.batch_parameter (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	user_description NVARCHAR(200) NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.batch_parameter ON

INSERT INTO sfa.batch_parameter (id, description, user_description, is_active)
SELECT BATCH_PARAMETER_ID, DESCRIPTION, USER_DESCRIPTION, 1
FROM SFAADMIN.batch_parameter

SET IDENTITY_INSERT sfa.batch_parameter OFF

-- SFAADMIN.CATEGORY
CREATE TABLE sfa.category (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.category ON

INSERT INTO sfa.category (id, description, is_active)
SELECT CATEGORY_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.category

SET IDENTITY_INSERT sfa.category OFF

-- SFAADMIN.CHANGE_REASON
CREATE TABLE sfa.change_reason (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.change_reason ON

INSERT INTO sfa.change_reason (id, description, is_active)
SELECT CHANGE_REASON_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.change_reason

SET IDENTITY_INSERT sfa.change_reason OFF

-- SFAADMIN.CHILD_CARE_CEILING
CREATE TABLE sfa.child_care_ceiling (
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id),
	province_id INT NOT NULL REFERENCES sfa.province (id), 
	max_amount NUMERIC(7,2) NOT NULL
)

INSERT INTO sfa.child_care_ceiling (academic_year_id, province_id, max_amount)
SELECT academic_year.id, PROVINCE_ID, MAX_AMT
FROM SFAADMIN.child_care_ceiling
 INNER JOIN sfa.academic_year ON (CHILD_CARE_CEILING.ACADEMIC_YEAR = academic_year.id)
 
-- SFAADMIN.COMUNICATION_TYPE
CREATE TABLE sfa.communication_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.communication_type ON

INSERT INTO sfa.communication_type (id, description, is_active)
SELECT COMMUNICATION_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.communication_type

SET IDENTITY_INSERT sfa.communication_type OFF

-- SFAADMIN.CSG_LOOKUP
CREATE TABLE sfa.csg_lookup (
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id) UNIQUE,
	csg_8_month_amount NUMERIC(7,2) NOT NULL,
	csg_dep_monthly_amount NUMERIC(7,2) NOT NULL,
	csg_pd_yearly_amount NUMERIC(7,2) NOT NULL,
	csg_pdse_yearly_amount NUMERIC(7,2) NOT NULL,
	csgpt_yearly_amount NUMERIC(7,2) NOT NULL,
	csgpt_dep_max_amount NUMERIC(7,2) NOT NULL,
	csgpt_dep_1_2_weekly_amount NUMERIC(7,2) NOT NULL,
	csgpt_dep_3_weekly_amount NUMERIC(7,2) NOT NULL
)

INSERT INTO sfa.csg_lookup (academic_year_id,csg_8_month_amount,csg_dep_monthly_amount,csg_pd_yearly_amount,csg_pdse_yearly_amount,csgpt_yearly_amount,csgpt_dep_max_amount,csgpt_dep_1_2_weekly_amount,csgpt_dep_3_weekly_amount)
SELECT academic_year, CSG_8_MONTH_AMT, CSG_DEP_MONTHLY_AMT, CSG_PD_YEARLY_AMT, CSG_PDSE_YEARLY_AMT, CSGPT_YEARLY_AMT, CSGPT_DEP_MAX_AMT, CSGPT_DEP_1_2_WEEKLY_AMT, CSGPT_DEP_3_WEEKLY_AMT
FROM SFAADMIN.csg_lookup

-- SFAADMIN.CSG_THRESHOLD
CREATE TABLE sfa.csg_threshold (
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id),
	family_size INT NOT NULL,
	income_threshold NUMERIC(10,2) NOT NULL,
	income_cutoff NUMERIC(10,2) NOT NULL,
	phase_out_rate FLOAT NOT NULL,
	low_income_threshold NUMERIC(10,2) NOT NULL,
	middle_income_threshold NUMERIC(10,2) NOT NULL,
	csgpt_phase_out_rate FLOAT NULL,
	csgpt_dep2_phase_out_rate FLOAT NULL,
	csgpt_dep3_phase_out_rate FLOAT NULL,
	csgft_dep_phase_out_rate FLOAT NULL,
	UNIQUE (academic_year_id, family_size)
)

INSERT INTO sfa.csg_threshold (academic_year_id, family_size, income_threshold, income_cutoff, phase_out_rate, low_income_threshold, middle_income_threshold, csgpt_phase_out_rate, csgpt_dep2_phase_out_rate , csgpt_dep3_phase_out_rate, csgft_dep_phase_out_rate)
SELECT academic_year, FAMILY_SIZE , INCOME_THRESHOLD, INCOME_CUTOFF, PHASE_OUT_RATE, LOW_INCOME_THRESHOLD, MIDDLE_INCOME_THRESHOLD, CSGPT_PHASE_OUT_RATE, CSG_PTDEP2_PHASE_OUT_RATE, CSG_PTDEP3_PHASE_OUT_RATE, CSG_FTDEP_PHASE_OUT_RATE
FROM SFAADMIN.csg_threshold

-- SFAADMIN.CSL_CODE
CREATE TABLE sfa.csl_code (
	id INT IDENTITY(1,1) PRIMARY KEY,
	warning_code NVARCHAR(10) NULL,
	reason_code NVARCHAR(10) NULL,
	code_type NVARCHAR(10) NOT NULL,
	definition NVARCHAR(1000) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.csl_code ON

INSERT INTO sfa.csl_code (id, warning_code, reason_code, code_type, definition, is_active)
SELECT CSL_CODE_ID, WARNING_CODE, REASON_CODE, CODE_TYPE, DEFINITION, CASE WHEN IS_ACTIVE_FLG = 'Yes' THEN 1 ELSE 0 END
FROM SFAADMIN.csl_code

SET IDENTITY_INSERT sfa.csl_code OFF



-- SFAADMIN.CSL_LOOKUP
CREATE TABLE sfa.csl_lookup (
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id) UNIQUE,
	return_transport_max_amount NUMERIC (10, 2) NULL,
	allowable_weekly_amount NUMERIC(10, 2) NULL,
	student_exempt_amount NUMERIC(10, 2) NULL,
	vehicle_deduction_amount NUMERIC(10, 2) NULL,
	rrsp_deduction_yearly_amount NUMERIC(10, 2) NULL,
	relocation_max_amount NUMERIC(10, 2) NULL,
	mileage_rate FLOAT NULL,
	discretionary_costs_max_amount NUMERIC(10, 2) NULL,
	merit_exempt_amount NUMERIC(10, 2) NULL,
	books_max_amount NUMERIC(10, 2) NULL,
	student_contrib_percent FLOAT NULL,
	spouse_contrib_percent FLOAT NULL,
	csg_8_month_amount NUMERIC(10,2) NULL,
	csg_pt_yearly_amount NUMERIC(10,2) NULL,
	low_income_student_contrib_amount NUMERIC(10,2) NULL,
	student_contrib_max_amount NUMERIC(10,2) NULL,
	csl_pt_max_amount NUMERIC(10,2) NULL,
	csl_pt_wk_misc_amount NUMERIC(10,2) NULL
)

INSERT INTO sfa.csl_lookup (academic_year_id,return_transport_max_amount,allowable_weekly_amount,student_exempt_amount,vehicle_deduction_amount,rrsp_deduction_yearly_amount,relocation_max_amount,mileage_rate,discretionary_costs_max_amount,merit_exempt_amount,books_max_amount,student_contrib_percent,spouse_contrib_percent,csg_8_month_amount,csg_pt_yearly_amount,low_income_student_contrib_amount,student_contrib_max_amount,csl_pt_max_amount,csl_pt_wk_misc_amount)
SELECT [ACADEMIC_YEAR],[MAX_RETURN_TRANSPORT],[MAX_WEEKLY_ALLOWABLE],[STUDENT_EXEMPT_AMT],[VEHICLE_DEDUCTION],[RRSP_YEARLY_DEDUCTION],[MAX_RELOCATION],[MILEAGE_RATE],[DISCRETIONARY_COSTS_MAX],[MERIT_EXEMPT_AMT],[MAX_BOOKS],[STUDENT_CONTRIB_PCT],[SPOUSE_CONTRIB_PCT],[CSG_8_MONTH_AMT],[CSG_PT_YEARLY_AMT],[LOW_INCOME_STUDENT_CONTRIB],[MAX_STUDENT_CONTRIB],[CSL_PT_MAX_AMOUNT],[CSL_PT_WK_MISC_AMT]
FROM SFAADMIN.csl_lookup

-- SFAADMIN.CSL_NSLSC_ADDRESS
CREATE TABLE sfa.csl_nslsc_address (
	id INT IDENTITY(1,1) PRIMARY KEY,	
	institution_type NVARCHAR(100) NOT NULL,
	name NVARCHAR(150) NOT NULL,
	address_line_1 NVARCHAR(200) NOT NULL,
	address_line_2 NVARCHAR(200) NULL,
	city_id INT REFERENCES sfa.city (id) NOT NULL,
	province_id INT REFERENCES sfa.province (id) NOT NULL,
	postal_code NVARCHAR(50) NOT NULL,
	phone_number NVARCHAR(50) NOT NULL,
	effective_date DATETIME2  NOT NULL DEFAULT GETDATE(),
	expiry_date DATETIME2 NULL
)

SET IDENTITY_INSERT sfa.csl_nslsc_address ON

INSERT INTO sfa.csl_nslsc_address (id, institution_type,name,address_line_1,address_line_2,city_id,province_id,postal_code,phone_number,effective_date,expiry_date)
SELECT [CSL_NSLSC_ADDRESS_ID], CASE WHEN [INSTITUTION_TYPE_ID] = 1 THEN 'Public' ELSE 'Private' END,[NAME],[ADDRESS_LINE_1],[ADDRESS_LINE_2],[CITY_ID],[PROVINCE_ID],[POSTAL_CODE],[PHONE_NUMBER],[EFFECTIVE_DATE],[EXPIRY_DATE]
FROM SFAADMIN.csl_nslsc_address

SET IDENTITY_INSERT sfa.csl_nslsc_address OFF

-- SFAADMIN.CSL_REASON
CREATE TABLE sfa.csl_reason (
	id INT IDENTITY(1,1) PRIMARY KEY,
	type NVARCHAR(50) NOT NULL,
	name NVARCHAR(50) NOT NULL,
	description TEXT NULL
)

SET IDENTITY_INSERT sfa.csl_reason ON

INSERT INTO sfa.csl_reason (id, type, name, description)
SELECT CSL_REASON_ID, CSL_REASON_TYPE, CSL_REASON_NAME, CSL_REASON
FROM SFAADMIN.csl_reason

SET IDENTITY_INSERT sfa.csl_reason OFF

-- SFAADMIN.CSL_RESTRICTED
CREATE TABLE sfa.csl_restricted (
	id INT IDENTITY(1,1) PRIMARY KEY,	
	amount_disbursed NUMERIC(10, 2) NULL,
	birth_date DATETIME2 NULL,
	first_name NVARCHAR(100) NULL,
	last_name NVARCHAR(100) NULL,
	over_award NUMERIC(10, 2) NULL,
	restriction_reason_id NVARCHAR(1) NULL,
	restriction_warn_id NVARCHAR(1) NULL,
	weeks_accumulated FLOAT NULL,
	nslsc_restrict1 NVARCHAR(1) NULL,
	nslsc_restrict2 NVARCHAR(1) NULL,
	nslsc_restrict3 NVARCHAR(1) NULL,
	calsc_restrict1 NVARCHAR(1) NULL,
	calsc_restrict2 NVARCHAR(1) NULL,
	calsc_restrict3 NVARCHAR(1) NULL,
	fi_restrict1 NVARCHAR(1) NULL
)

SET IDENTITY_INSERT sfa.csl_restricted ON

INSERT INTO sfa.csl_restricted (id,amount_disbursed,birth_date,first_name,last_name,over_award,restriction_reason_id,restriction_warn_id,weeks_accumulated,nslsc_restrict1,nslsc_restrict2,nslsc_restrict3,calsc_restrict1,calsc_restrict2,calsc_restrict3,fi_restrict1)
SELECT CSL_RESTRICTED_ID, [AMOUNT_DISBURSED],[BIRTH_DATE],[FIRST_NAME],[LAST_NAME],[OVER_AWARD],[RESTRICTION_REASON_ID],[RESTRICTION_WARN_ID],[WEEKS_ACCUMULATED],[NSLSC_RESTRICT1],[NSLSC_RESTRICT2],[NSLSC_RESTRICT3],[CALSC_RESTRICT1],[CALSC_RESTRICT2],[CALSC_RESTRICT3],[FI_RESTRICT1]
FROM SFAADMIN.csl_restricted

SET IDENTITY_INSERT sfa.csl_restricted OFF

-- SFAADMIN.DISAB_SERVICE_TYPE
CREATE TABLE sfa.disability_service (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.disability_service ON

INSERT INTO sfa.disability_service (id,description, is_active)
SELECT DISAB_SERVICE_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.DISAB_SERVICE_TYPE

SET IDENTITY_INSERT sfa.disability_service OFF

-- SFAADMIN.DISAB_SERVICE_TYPE
CREATE TABLE sfa.disability_service (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.disability_service ON

INSERT INTO sfa.disability_service (id,description, is_active)
SELECT DISAB_SERVICE_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.DISAB_SERVICE_TYPE

SET IDENTITY_INSERT sfa.disability_service OFF

-- SFAADMIN.DISABILITY_TYPE
CREATE TABLE sfa.disability_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	csl_code NVARCHAR(5) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.disability_type ON

INSERT INTO sfa.disability_type (id,description, csl_code, is_active)
SELECT DISABILITY_TYPE_ID, DESCRIPTION, CSL_CODE, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.disability_type

SET IDENTITY_INSERT sfa.disability_type OFF

-- SFAADMIN.DISBURSEMENT_TYPE
CREATE TABLE sfa.disbursement_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.disbursement_type ON

INSERT INTO sfa.disbursement_type (id,description, is_active)
SELECT DISBURSEMENT_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.disbursement_type

SET IDENTITY_INSERT sfa.disbursement_type OFF

-- SFAADMIN.EDUCATION_LEVEL
CREATE TABLE sfa.education_level (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	rank INT NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.education_level ON

INSERT INTO sfa.education_level (id,description, rank, is_active)
SELECT EDUCATION_LEVEL_ID, DESCRIPTION, RANK, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.education_level

SET IDENTITY_INSERT sfa.education_level OFF

-- SFAADMIN.ENTITLEMENT_ERROR_CODES
CREATE TABLE sfa.entitlement_error_codes (
	id INT IDENTITY(1,1) PRIMARY KEY,
	code NVARCHAR(50) NOT NULL UNIQUE,
	description NVARCHAR(200) NOT NULL,
	is_confirmed BIT NOT NULL DEFAULT 1,
	is_in_feedback BIT NOT NULL DEFAULT 1,
	is_resend BIT NOT NULL DEFAULT 1
)

INSERT INTO sfa.entitlement_error_codes ( code, description, is_confirmed, is_in_feedback, is_resend)
SELECT ERROR_CODE, ERROR_DESC, CASE WHEN CONFIRMED_UNCONFIRMED = 'C' THEN 1 ELSE 0 END, CASE WHEN IS_IN_FEEDBACK_FLG = 'Yes' THEN 1 ELSE 0 END,CASE WHEN IS_RESEND_FLG = 'Yes' THEN 1 ELSE 0 END
FROM SFAADMIN.entitlement_error_codes

-- SFAADMIN.FIRST_NATION
CREATE TABLE sfa.first_nation (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	city_id INT NULL REFERENCES sfa.city (id),
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.first_nation ON

INSERT INTO sfa.first_nation ( id, description, city_id, is_active)
SELECT FIRST_NATION_ID, FIRST_NATION_DESC, CITY_ID, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.first_nation

SET IDENTITY_INSERT sfa.first_nation OFF

-- SFAADMIN.FUNDING_GROUP
CREATE TABLE sfa.funding_group (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	sort_order INT NOT NULL DEFAULT 99,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.funding_group ON

INSERT INTO sfa.funding_group ( id, description, sort_order, is_active)
SELECT FUNDING_GROUP_ID, DESCRIPTION, SORT_ORDER, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.funding_group

SET IDENTITY_INSERT sfa.funding_group OFF

-- SFAADMIN.HIGH_SCHOOL
CREATE TABLE sfa.high_school (
	id INT IDENTITY(1,1) PRIMARY KEY,
	name NVARCHAR(200) NOT NULL,
	city_id INT NOT NULL REFERENCES sfa.city (id),
	province_id INT NOT NULL REFERENCES sfa.province (id),
	country_id INT NOT NULL REFERENCES sfa.country (id),
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.high_school ON

INSERT INTO sfa.high_school ( id, name, city_id, province_id, country_id, is_active)
SELECT HIGH_SCHOOL_ID, NAME, CITY_ID, PROVINCE_ID, COUNTRY_ID, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.high_school

SET IDENTITY_INSERT sfa.high_school OFF

-- SFAADMIN.INFO_CATEGORY
CREATE TABLE sfa.info_category (
	id INT IDENTITY(1,1) PRIMARY KEY,
	canvas_name NVARCHAR(200) NOT NULL,
	category_name NVARCHAR(200) NOT NULL,
	sort_order INT NOT NULL DEFAULT 99,
	first_item NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.info_category ON

INSERT INTO sfa.info_category ( id, canvas_name, category_name, sort_order, first_item, is_active)
SELECT INFO_CATEGORY_ID, CANVAS_NAME, CATEGORY_NAME, SORT_ORDER, FIRST_ITEM, 1
FROM SFAADMIN.info_category

SET IDENTITY_INSERT sfa.info_category OFF

-- SFAADMIN.INSTRUCTION_TYPE
CREATE TABLE sfa.instruction_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.instruction_type ON

INSERT INTO sfa.instruction_type ( id, description, is_active)
SELECT INSTRUCTION_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.instruction_type

SET IDENTITY_INSERT sfa.instruction_type OFF

-- SFAADMIN.INVESTMENT_TYPE
CREATE TABLE sfa.investment_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.investment_type ON

INSERT INTO sfa.investment_type ( id, description, is_active)
SELECT INVESTMENT_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.investment_type

SET IDENTITY_INSERT sfa.investment_type OFF

-- SFAADMIN.LANGUAGE
CREATE TABLE sfa.language (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.language ON

INSERT INTO sfa.language ( id, description, is_active)
SELECT LANGUAGE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.language

SET IDENTITY_INSERT sfa.language OFF

-- SFAADMIN.MARITAL_STATUS
CREATE TABLE sfa.marital_status (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.marital_status ON

INSERT INTO sfa.marital_status ( id, description, is_active)
SELECT MARITAL_STATUS_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.marital_status

SET IDENTITY_INSERT sfa.marital_status OFF

-- SFAADMIN.OWNERSHIP
CREATE TABLE sfa.ownership (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.ownership ON

INSERT INTO sfa.ownership ( id, description, is_active)
SELECT OWNERSHIP_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.ownership

SET IDENTITY_INSERT sfa.ownership OFF

-- SFAADMIN.PARENT_CONTRIBUTION_FORMULA
CREATE TABLE sfa.parent_contribution_formula (
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id),
	income_from_amount NUMERIC(10,2) NOT NULL,
	income_to_amount NUMERIC(10,2) NOT NULL,
	add_amount NUMERIC(10,2) NOT NULL,
	percentage FLOAT NOT NULL,
	subtract_amount NUMERIC(10,2),
	divide_by INT NOT NULL
)

INSERT INTO sfa.parent_contribution_formula ( academic_year_id, income_from_amount, income_to_amount, add_amount, percentage, subtract_amount, divide_by)
SELECT ACADEMIC_YEAR, D_INCOME_FROM, D_INCOME_TO, ADD_AMT, [PERCENT], SUBTRACT_AMT, DIVIDE_BY
FROM SFAADMIN.parent_contribution_formula

-- SFAADMIN.PART_TIME_REASON
CREATE TABLE sfa.part_time_reason (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.part_time_reason ON

INSERT INTO sfa.part_time_reason ( id, description, is_active)
SELECT PART_TIME_REASON_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.part_time_reason

SET IDENTITY_INSERT sfa.part_time_reason OFF

-- SFAADMIN.PERIOD
CREATE TABLE sfa.period (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.period ON

INSERT INTO sfa.period ( id, description, is_active)
SELECT PERIOD_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.period

SET IDENTITY_INSERT sfa.period OFF

-- SFAADMIN.PORTAL_STATUS
CREATE TABLE sfa.portal_status (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.portal_status ON

INSERT INTO sfa.portal_status ( id, description, is_active)
SELECT PORTAL_STATUS_ID, STATUS_DESC, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.portal_status

SET IDENTITY_INSERT sfa.portal_status OFF

-- SFAADMIN.PRESTUDY_EMPLOY_STATUS
CREATE TABLE sfa.prestudy_employment_status (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.prestudy_employment_status ON

INSERT INTO sfa.prestudy_employment_status ( id, description, is_active)
SELECT PRESTUDY_EMPLOY_STATUS_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.PRESTUDY_EMPLOY_STATUS 

SET IDENTITY_INSERT sfa.prestudy_employment_status OFF

-- SFAADMIN.PRESTUDY_TAX_RATE
CREATE TABLE sfa.prestudy_tax_rate (
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year INT NOT NULL REFERENCES sfa.academic_year (id),
	from_income_amount NUMERIC(10,2) NOT NULL,
	to_income_amount NUMERIC(10,2) NOT NULL,
	prestudy_tax_rate FLOAT NOT NULL
)

INSERT INTO sfa.prestudy_tax_rate ( academic_year, from_income_amount, to_income_amount, prestudy_tax_rate)
SELECT ACADEMIC_YEAR, INCOME_FROM, INCOME_TO, PRESTUDY_TAX_RATE
FROM SFAADMIN.prestudy_tax_rate 

-- SFAADMIN.PROGRAM
CREATE TABLE sfa.program (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	education_level_id INT NOT NULL REFERENCES sfa.education_level (id),
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.program ON

INSERT INTO sfa.program ( id, description, education_level_id, is_active)
SELECT PROGRAM_ID, DESCRIPTION,EDUCATION_LEVEL, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.program 

SET IDENTITY_INSERT sfa.program OFF

-- SFAADMIN.RELATIONSHIP
CREATE TABLE sfa.relationship (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.relationship ON

INSERT INTO sfa.relationship ( id, description, is_active)
SELECT RELATIONSHIP_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.relationship 

SET IDENTITY_INSERT sfa.relationship OFF

-- SFAADMIN.REPORT_EXPENSE_CATEGORY
CREATE TABLE sfa.report_expense_category (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.report_expense_category ON

INSERT INTO sfa.report_expense_category ( id, description, is_active)
SELECT REPORT_EXPENSE_CATEGORY_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.report_expense_category 

SET IDENTITY_INSERT sfa.report_expense_category OFF

-- SFAADMIN.REQUIREMENT_TYPE
CREATE TABLE sfa.requirement_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	document_location NVARCHAR(2000) NULL,
	show_online BIT NOT NULL DEFAULT 1,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.requirement_type ON

INSERT INTO sfa.requirement_type ( id, description, is_active, document_location, show_online)
SELECT REQUIREMENT_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END, DOCUMENT_LOCATION, CASE WHEN SHOW_ONLINE = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.requirement_type 

SET IDENTITY_INSERT sfa.requirement_type OFF

-- SFAADMIN.SFA_DOCUMENT_LINK
CREATE TABLE sfa.sfa_document_link (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	document_location NVARCHAR(2000) NULL,
	sort_order INT NOT NULL DEFAULT 99,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.sfa_document_link ON

INSERT INTO sfa.sfa_document_link ( id, description, is_active, document_location, sort_order)
SELECT SFA_DOCUMENT_LINK_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END, DOCUMENT_LOCATION, SORT_ORDER
FROM SFAADMIN.sfa_document_link 
WHERE IS_ACTIVE_FLG = 'Y'

SET IDENTITY_INSERT sfa.sfa_document_link OFF

-- SFAADMIN.SPOUSE_TAX_RATE
CREATE TABLE sfa.spouse_tax_rate (
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id), 
	province_id INT NOT NULL REFERENCES sfa.province (id), 
	from_income_amount NUMERIC(10,2) NOT NULL,
	to_income_amount NUMERIC(10,2) NOT NULL,
	tax_rate FLOAT NOT NULL
)

INSERT INTO sfa.spouse_tax_rate (academic_year_id, province_id, from_income_amount, to_income_amount, tax_rate)
SELECT ACADEMIC_YEAR, PROVINCE_ID, INCOME_FROM, INCOME_TO, SPOUSE_TAX_RATE
FROM SFAADMIN.spouse_tax_rate 

-- SFAADMIN.STA_LOOKUP
CREATE TABLE sfa.sta_lookup (
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id) UNIQUE, 
	dependent_0_amount NUMERIC(10,2) NOT NULL,
	dependent_1_amount NUMERIC(10,2) NOT NULL,
	dependent_2_amount NUMERIC(10,2) NOT NULL,
	dependent_3_amount NUMERIC(10,2) NOT NULL,
	dependent_4_amount NUMERIC(10,2) NOT NULL,
	second_residence_amount NUMERIC(10,2) NOT NULL
)

INSERT INTO sfa.sta_lookup (academic_year_id, dependent_0_amount, dependent_1_amount, dependent_2_amount, dependent_3_amount, dependent_4_amount, second_residence_amount)
SELECT ACADEMIC_YEAR, DEPENDENT_ZERO, DEPENDENT_ONE, DEPENDENT_TWO, DEPENDENT_THREE, DEPENDENT_FOUR, SECOND_RESIDENCE
FROM SFAADMIN.sta_lookup 

-- SFAADMIN.STANDARD_OF_LIVING
CREATE TABLE sfa.standard_of_living(
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id), 
	province_id INT NOT NULL REFERENCES sfa.province (id),
	family_size INT NOT NULL,
	standard_living_amount NUMERIC(10,2) NOT NULL,
	UNIQUE (academic_year_id, province_id, family_size)
)

INSERT INTO sfa.standard_of_living (academic_year_id, province_id, family_size, standard_living_amount)
SELECT ACADEMIC_YEAR, PROVINCE_ID, FAMILY_SIZE, STANDARD_LIVING_AMT
FROM SFAADMIN.standard_of_living
ORDER BY 1,2,3

-- SFAADMIN.STATUS
CREATE TABLE sfa.status(
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	online_description NVARCHAR(200) NULL,
	sort_order INT NOT NULL DEFAULT 99,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.status ON

INSERT INTO sfa.status (id, description, is_active, sort_order, online_description)
SELECT STATUS_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END, SORT, ONLINE_DESCRIPTION
FROM SFAADMIN.status

SET IDENTITY_INSERT sfa.status OFF

-- SFAADMIN.STATUS_REASON
CREATE TABLE sfa.status_reason (
	id INT IDENTITY(1,1) PRIMARY KEY,
	status_id INT NULL REFERENCES sfa.status (id),
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.status_reason ON

INSERT INTO sfa.status_reason (id, status_id, description, is_active)
SELECT STATUS_REASON_ID, STATUS_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.status_reason

SET IDENTITY_INSERT sfa.status_reason OFF

-- SFAADMIN.STUDENT_CATEGORY
CREATE TABLE sfa.student_category (
	id INT IDENTITY(1,1) PRIMARY KEY,
	code NVARCHAR(10) NOT NULL UNIQUE,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

INSERT INTO sfa.student_category ( code, description, is_active)
SELECT STUDENT_CATEGORY_CODE, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.student_category

-- SFAADMIN.STUDENT_CONTRIBUTION
CREATE TABLE sfa.student_contribution (
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id),
	province_id INT NOT NULL REFERENCES sfa.province (id),
	period_id INT NOT NULL REFERENCES sfa.period (id),
	student_category_id INT NOT NULL REFERENCES sfa.student_category (id),
	contribution_amount NUMERIC(10,2) NOT NULL,
	UNIQUE (academic_year_id, province_id, period_id, student_category_id)
)

INSERT INTO sfa.student_contribution ( academic_year_id,province_id, period_id, student_category_id, contribution_amount)
SELECT ACADEMIC_YEAR,  PROVINCE_ID,PERIOD_ID, student_category.id, CONTRIBUTION_AMOUNT
FROM SFAADMIN.student_contribution
INNER JOIN sfa.student_category on STUDENT_CONTRIBUTION.STUDENT_CATEGORY_CODE = student_category.code

-- SFAADMIN.STUDENT_LIVING_ALLOWANCE
CREATE TABLE sfa.student_living_allowance (
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id),
	province_id INT NOT NULL REFERENCES sfa.province (id),
	student_category_id INT NOT NULL REFERENCES sfa.student_category (id),
	shelter_amount NUMERIC(10,2) NOT NULL,
	food_amount NUMERIC(10,2) NOT NULL,
	misc_amount NUMERIC(10,2) NOT NULL,
	public_tranport_amount NUMERIC(10,2) NOT NULL,
	UNIQUE (academic_year_id, province_id, student_category_id)
)

INSERT INTO sfa.student_living_allowance ( academic_year_id,province_id, student_category_id, shelter_amount, food_amount, misc_amount, public_tranport_amount)
SELECT ACADEMIC_YEAR,  PROVINCE_ID, student_category.id, SHELTER_AMOUNT, FOOD_AMOUNT, MISC_AMOUNT, PUBLIC_TRANS_AMOUNT
FROM SFAADMIN.student_living_allowance
INNER JOIN sfa.student_category on student_living_allowance.STUDENT_CATEGORY_CODE = student_category.code

-- SFAADMIN.STUDY_FIELD
CREATE TABLE sfa.study_field (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.study_field ON

INSERT INTO sfa.study_field ( id, description, is_active)
SELECT STUDY_FIELD_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.study_field 

SET IDENTITY_INSERT sfa.study_field OFF

-- SFAADMIN.STUDY_AREA
CREATE TABLE sfa.study_area (
	id INT IDENTITY(1,1) PRIMARY KEY,
	study_field_id INT NOT NULL REFERENCES sfa.study_field (id),
	description NVARCHAR(200) NOT NULL,
	show_online BIT NOT NULL DEFAULT 1,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.study_area ON

INSERT INTO sfa.study_area ( id, study_field_id, description, show_online, is_active)
SELECT  STUDY_AREA_ID, STUDY_FIELD_ID, DESCRIPTION, CASE WHEN SHOW_ONLINE = 'Y' THEN 1 ELSE 0 END, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.study_area 

SET IDENTITY_INSERT sfa.study_area OFF

-- SFAADMIN.STUDY_TAX_RATE
CREATE TABLE sfa.study_tax_rate (
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id),
	from_income_amount NUMERIC(10,2) NOT NULL,
	to_income_amount NUMERIC(10,2) NOT NULL,
	study_tax_rate FLOAT NOT NULL
)

INSERT INTO sfa.study_tax_rate ( academic_year_id, from_income_amount, to_income_amount, study_tax_rate)
SELECT ACADEMIC_YEAR, INCOME_FROM, INCOME_TO, STUDY_TAX_RATE
FROM SFAADMIN.study_tax_rate 

-- SFAADMIN.SYSTEM_DEP_PARAMS
CREATE TABLE sfa.system_dep_params (
	id INT IDENTITY(1,1) PRIMARY KEY,
	dependent_count INT NOT NULL UNIQUE,
	weekly_amount NUMERIC(10,2) NOT NULL
)

INSERT INTO sfa.system_dep_params ( dependent_count, weekly_amount)
SELECT DEPENDENT_COUNT, WEEKLY_RATE
FROM SFAADMIN.system_dep_params 

-- SFAADMIN.SYSTEM_PARAMETER
CREATE TABLE sfa.system_parameter (
	id INT IDENTITY(1,1) PRIMARY KEY,
	second_residence_rate FLOAT NULL,
	weekly_rate FLOAT NULL,
	academic_start_year NUMERIC(4, 0) NULL,
	csl_max_weekly_amount NUMERIC(4, 0) NULL,
	minister_name NVARCHAR(100) NULL,
	financial_batch_id_start NUMERIC(7, 0) NULL,
	financial_batch_id_end NUMERIC(7, 0) NULL,
	financial_batch_id_year NUMERIC(4, 0) NULL,
	previous_fin_batch_id_start NUMERIC(7, 0) NULL,
	previous_fin_batch_id_end NUMERIC(7, 0) NULL,
	previous_fin_batch_id_year NUMERIC(4, 0) NULL,
	last_online_expire_date DATETIME2 NULL,
	last_msfaa_sent_date DATETIME2 NULL,
	last_msfaa_sent_seq_num FLOAT NULL,
	msfaa_enclosed_approval_text NVARCHAR(2000) NULL,
	msfaa_NOT_encl_approval_text NVARCHAR(2000) NULL,
	monthly_board_change_date DATETIME2 NULL,
	arial_ttf_directory NVARCHAR(150) NULL,
	letterhead_tray NVARCHAR(100) NULL,
	yg_quarter_weeks FLOAT NULL,
	yg_semester_weeks FLOAT NULL,
	yg_approval_text NVARCHAR(1000) NULL,
	director_name_position NVARCHAR(100) NULL,
	director_email NVARCHAR(100) NULL,
	director_phone NVARCHAR(24) NULL,
	environment NVARCHAR(10) NULL,
	cslft_msfaa_text NVARCHAR(100) NULL
)

SET IDENTITY_INSERT sfa.system_parameter ON

INSERT INTO sfa.system_parameter ( id, second_residence_rate,weekly_rate,academic_start_year,csl_max_weekly_amount,minister_name,financial_batch_id_start,financial_batch_id_end,financial_batch_id_year,previous_fin_batch_id_start,previous_fin_batch_id_end,previous_fin_batch_id_year,last_online_expire_date,last_msfaa_sent_date,last_msfaa_sent_seq_num,msfaa_enclosed_approval_text,msfaa_not_encl_approval_text,monthly_board_change_date,arial_ttf_directory,letterhead_tray,yg_quarter_weeks,yg_semester_weeks,yg_approval_text,director_name_position,director_email,director_phone,environment,cslft_msfaa_text)
SELECT SYSTEM_PARAMETER_ID, second_residence_rate,weekly_rate,academic_start_year,csl_max_weekly_amount,minister_name,financial_batch_id_start,financial_batch_id_end,financial_batch_id_year,previous_fin_batch_id_start,previous_fin_batch_id_end,previous_fin_batch_id_year,last_online_expire_date,last_msfaa_sent_date,last_msfaa_sent_seq_num,msfaa_enclosed_approval_text,msfaa_not_encl_approval_text,monthly_board_change_date,arial_ttf_directory,letterhead_tray,yg_quarter_weeks,yg_semester_weeks,yg_approval_text,director_name_position,director_email,director_phone,environment,cslft_msfaa_text
FROM SFAADMIN.system_parameter 

SET IDENTITY_INSERT sfa.system_parameter OFF



select * from sfa.system_parameter
select * from sfaadmin.system_parameter

