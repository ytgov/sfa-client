
-- SFAADMIN.ABORIGINAL_STATUS
DROP TABLE if exists sfa.aboriginal_status
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
DROP TABLE if exists sfa.age_distribution
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
DROP TABLE if exists sfa.agency
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
DROP TABLE if exists sfa.application_type
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
DROP TABLE if exists sfa.assessment_type
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
DROP TABLE if exists sfa.batch_group
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
DROP TABLE if exists sfa.batch_parameter
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
DROP TABLE if exists sfa.category
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
DROP TABLE if exists sfa.change_reason
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
DROP TABLE if exists sfa.child_care_ceiling
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
DROP TABLE if exists sfa.communication_type
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
DROP TABLE if exists sfa.csg_lookup
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
DROP TABLE if exists sfa.csg_threshold
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
DROP TABLE if exists sfa.csl_code
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
DROP TABLE if exists sfa.csl_lookup
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
DROP TABLE if exists sfa.csl_nslsc_address
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
DROP TABLE if exists sfa.csl_reason
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
DROP TABLE if exists sfa.csl_restricted
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
DROP TABLE if exists sfa.disability_service
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
DROP TABLE if exists sfa.disability_type
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
DROP TABLE if exists sfa.disbursement_type
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
DROP TABLE if exists sfa.education_level
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
DROP TABLE if exists sfa.entitlement_error_codes
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
DROP TABLE if exists sfa.first_nation
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
DROP TABLE if exists sfa.funding_group
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
DROP TABLE if exists sfa.high_school
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
DROP TABLE if exists sfa.info_category
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
DROP TABLE if exists sfa.instruction_type
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
DROP TABLE if exists sfa.investment_type
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
DROP TABLE if exists sfa.language
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
DROP TABLE if exists sfa.marital_status
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
DROP TABLE if exists sfa.ownership
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
DROP TABLE if exists sfa.parent_contribution_formula
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
DROP TABLE if exists sfa.part_time_reason
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
DROP TABLE if exists sfa.period
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
DROP TABLE if exists sfa.portal_status
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
DROP TABLE if exists sfa.prestudy_employment_status
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
DROP TABLE if exists sfa.prestudy_tax_rate
CREATE TABLE sfa.prestudy_tax_rate (
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id),
	from_income_amount NUMERIC(10,2) NOT NULL,
	to_income_amount NUMERIC(10,2) NOT NULL,
	prestudy_tax_rate FLOAT NOT NULL
)

INSERT INTO sfa.prestudy_tax_rate ( academic_year_id, from_income_amount, to_income_amount, prestudy_tax_rate)
SELECT ACADEMIC_YEAR, INCOME_FROM, INCOME_TO, PRESTUDY_TAX_RATE
FROM SFAADMIN.prestudy_tax_rate 

-- SFAADMIN.PROGRAM
DROP TABLE if exists sfa.program
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
DROP TABLE if exists sfa.relationship
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
DROP TABLE if exists sfa.report_expense_category
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
DROP TABLE if exists sfa.requirement_type
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
DROP TABLE if exists sfa.sfa_document_link
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
DROP TABLE if exists sfa.spouse_tax_rate
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
DROP TABLE if exists sfa.sta_lookup
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
DROP TABLE if exists sfa.standard_of_living
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
DROP TABLE if exists sfa.status
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
DROP TABLE if exists sfa.status_reason
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
DROP TABLE if exists sfa.student_category
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
DROP TABLE if exists sfa.student_contribution
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
DROP TABLE if exists sfa.student_living_allowance
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
DROP TABLE if exists sfa.study_field
CREATE TABLE sfa.study_field (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.study_field ON

INSERT INTO sfa.study_field ( id, description, is_active)
SELECT STUDY_FIELD_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.study_field 

SET IDENTITY_INSERT sfa.study_field OFF

-- SFAADMIN.STUDY_AREA
DROP TABLE if exists sfa.study_area
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
DROP TABLE if exists sfa.study_tax_rate
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
DROP TABLE if exists sfa.system_dep_params
CREATE TABLE sfa.system_dep_params (
	id INT IDENTITY(1,1) PRIMARY KEY,
	dependent_count INT NOT NULL UNIQUE,
	weekly_amount NUMERIC(10,2) NOT NULL
)

INSERT INTO sfa.system_dep_params ( dependent_count, weekly_amount)
SELECT DEPENDENT_COUNT, WEEKLY_RATE
FROM SFAADMIN.system_dep_params 

-- SFAADMIN.SYSTEM_PARAMETER
DROP TABLE if exists sfa.system_parameter
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

-- SFAADMIN.TRANSPORTATION
DROP TABLE if exists sfa.transportation
CREATE TABLE sfa.transportation (
	id INT IDENTITY(1,1) PRIMARY KEY,
	home_city_id INT NOT NULL REFERENCES sfa.city (id),
	institution_city_id INT NOT NULL REFERENCES sfa.city(id),
	travel_allowance_amount NUMERIC(10,2) NOT NULL,
	airfare_amount NUMERIC(10,2) NOT NULL,
	UNIQUE (home_city_id, institution_city_id)
)

SET IDENTITY_INSERT sfa.transportation ON

INSERT INTO sfa.transportation ( id, home_city_id, institution_city_id, travel_allowance_amount, airfare_amount)
SELECT TRANSPORTATION_ID, HOME_CITY_ID, INSTITUTION_CITY_ID, TRAVEL_ALLOWANCE, AIRFARE
FROM SFAADMIN.transportation 

SET IDENTITY_INSERT sfa.transportation OFF

-- SFAADMIN.VERIFICATION_LOG
DROP TABLE if exists sfa.verification_log
CREATE TABLE sfa.verification_log (
	id INT IDENTITY(1,1) PRIMARY KEY,
	institution_campus_id INT NOT NULL REFERENCES sfa.institution_campus (id),
	is_emailed BIT NOT NULL DEFAULT 1,
	student_count INT NOT NULL
)

SET IDENTITY_INSERT sfa.verification_log ON

INSERT INTO sfa.verification_log ( id, institution_campus_id, is_emailed, student_count)
SELECT VERIFICATION_LOG_ID, INSTITUTION_ID, CASE WHEN EMAILED_FLG = 'Yes' THEN 1 ELSE 0 END, STUDENT_COUNT
FROM SFAADMIN.verification_log 

SET IDENTITY_INSERT sfa.verification_log OFF

-- SFAADMIN.YEA
DROP TABLE if exists sfa.yea
CREATE TABLE sfa.yea (
	id INT IDENTITY(1,1) PRIMARY KEY,
	first_name NVARCHAR(100) NOT NULL,
	last_name NVARCHAR(100) NOT NULL,
	birth_date DATETIME2 NULL,
	yukon_id NVARCHAR(25) NULL,
	yukon_id_old NVARCHAR(25) NULL,
	school_year INT NULL,
	school_month INT NULL,
	course NVARCHAR(100) NULL,
	yea_amount NUMERIC(10,2) NULL
)

INSERT INTO sfa.yea ( first_name, last_name, birth_date, yukon_id, yukon_id_old, school_year, school_month, course, yea_amount)
SELECT FNAME, LNAME, BIRTH_DT, YTID, OLD_YTID, SCHOOLYR, SCHOOLMN, COURSE, YEA_AMNT
FROM SFAADMIN.yea 

-- SFAADMIN.YEA_UPDATE
DROP TABLE if exists sfa.yea_update
CREATE TABLE sfa.yea_update (
	id INT IDENTITY(1,1) PRIMARY KEY,
	first_name NVARCHAR(100) NOT NULL,
	last_name NVARCHAR(100) NOT NULL,
	birth_date DATETIME2 NULL,
	yukon_id NVARCHAR(25) NULL,
	school_year INT NULL,
	school_month INT NULL,
	course NVARCHAR(100) NULL,
	yea_amount NUMERIC(10,2) NULL,
	orig_yea_amount NUMERIC(10,2) NULL
)

INSERT INTO sfa.yea_update ( first_name, last_name, birth_date, yukon_id, school_year, school_month, course, yea_amount, orig_yea_amount)
SELECT FNAME, LNAME, BIRTH_DT, YTID, SCHOOLYR, SCHOOLMN, COURSE, YEA_AMNT, ORIG_YEA_AMNT
FROM SFAADMIN.yea_update 

-- SFAADMIN.YG_COST
DROP TABLE if exists sfa.yg_cost
CREATE TABLE sfa.yg_cost (
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id),
	effective_date DATETIME2 NULL,
	expiry_date DATETIME2 NULL,
	semester_living_amount NUMERIC(10,2) NOT NULL,
	semester_tuition_amount NUMERIC(10,2) NOT NULL,
	semester_book_amount NUMERIC(10,2) NOT NULL,
	quarter_living_amount NUMERIC(10,2) NOT NULL,
	quarter_tuition_amount NUMERIC(10,2) NOT NULL,
	quarter_book_amount NUMERIC(10,2) NOT NULL,
	weekly_amount NUMERIC(10,2) NULL,
	allowed_percent FLOAT NOT NULL
)

SET IDENTITY_INSERT sfa.yg_cost ON

INSERT INTO sfa.yg_cost (id, academic_year_id, effective_date, expiry_date, semester_living_amount, semester_tuition_amount, semester_book_amount, quarter_living_amount, quarter_tuition_amount, quarter_book_amount, weekly_amount, allowed_percent)
SELECT YG_COST_ID, ACADEMIC_YEAR, EFFECTIVE_DATE, EXPIRY_DATE,SEMESTER_LIVING_AMT, SEMESTER_TUITION_AMT, SEMESTER_BOOK_AMT, QUARTER_LIVING_AMT, QUARTER_TUITION_AMT, QUARTER_BOOK_AMT, WEEKLY_AMOUNT, ALLOWED_PERCENT
FROM SFAADMIN.yg_cost 

SET IDENTITY_INSERT sfa.yg_cost OFF

-- SFA.ADDRESS_TYPE
DROP TABLE if exists sfa.address_type
CREATE TABLE sfa.address_type (
    id INT IDENTITY(1,1) PRIMARY KEY,
    description NVARCHAR(100) NOT NULL UNIQUE,
    is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.address_type ON 
INSERT INTO sfa.address_type (id, description) VALUES (1, 'Home'), (2, 'Mailing'), (3, 'School')
SET IDENTITY_INSERT sfa.address_type OFF

-- SFA.PERSON_ADDRESS
DROP TABLE if exists sfa.person_address
CREATE TABLE sfa.person_address (
    id INT IDENTITY(1,1) PRIMARY KEY,
    address_type_id INT NOT NULL REFERENCES sfa.address_type,
	address1 nvarchar(100) null,
	address2 nvarchar(100) null,
	city_id int null references sfa.city,
	province_id int null references sfa.province,
	country_id int null references sfa.country,
	postal_code nvarchar(50) null,
    notes TEXT NULL,
    is_active BIT NOT NULL DEFAULT 1
)

DROP TABLE if exists sfa.person
CREATE TABLE sfa.person (
    id INT IDENTITY(1,1) PRIMARY KEY,
	language_id int null references sfa.language (id),
	sex_id int null references sfa.sex(id),
    home_address_id INT NULL REFERENCES sfa.person_address,
    mailing_address_id INT NULL REFERENCES sfa.person_address,
	birth_city_id int null references sfa.city (id),
	birth_province_id int null references sfa.province(id),
	birth_country_id int null references sfa.country(id),
    first_name NVARCHAR(100) NULL,
    last_name NVARCHAR(100) NULL,
	initials nvarchar(20) null,
	previous_last_name nvarchar(100) null,
    sin NVARCHAR(15) NULL,
    citizenship_code INT NULL,
	birth_date date null,
	telephone nvarchar(24) null,
    email NVARCHAR(100) NULL
)








-- SFAADMIN.STUDENT
DROP TABLE if exists sfa.student
create table sfa.student (
	id int identity(1,1) primary key,
    person_id INT NOT NULL REFERENCES sfa.person,

	high_school_id int null references sfa.high_school (id),
	education_level_id int null references sfa.education_level (id),
	indigenous_learner_id int null references sfa.indigenous_learner,
	vendor_id nvarchar(25) null,
	yukon_id nvarchar(20) null,
	checked_for_yukon_id bit not null default 0,
	national_id nvarchar(50) null,

	locator_number nvarchar(15) null,
	is_crown_ward bit not null default 0,
	high_school_final_grade nvarchar(15) null,
	high_school_left_year int null,
	high_school_left_month int null,
	
	pre_funded_year int null,
	pre_funding_years_used float null,

	csl_letter_date date null,
	csl_warn_code nvarchar(10) null,
	pre_over_award_amount numeric(10, 2) null,
	pre_yea_awards_used_amount numeric(10, 2) null,

	user_name nvarchar(100) null,
	user_password nvarchar(1000) null,
	is_active bit not null default 1,
	is_first_logon_flg nvarchar(1) null,
	last_logon_date datetime2(0) null,
	last_pw_change_date datetime2(0) null,
	
    yea_expiry_date date null,
	adj_yg_funding_weeks int null,
	adj_sta_upgrading_weeks int null,
	adj_outside_travel_cnt int null
)





SET IDENTITY_INSERT sfa.student ON
INSERT INTO sfa.student (id, high_school_id, education_level_id, language_id, birth_city_id, birth_province_id,
                         birth_country_id,
                         sex_id, indigenous_learner_id, first_name, last_name, previous_last_name, initials, sin,
                         birth_date, vendor_id,
                         yukon_id, checked_for_yukon_id, national_id, locator_number, is_crown_ward,
                         high_school_final_grade, high_school_left_year, high_school_left_month,
                         home_address1, home_address2, home_city_id, home_province_id, home_country_id,
                         home_postal_code, home_phone,
                         home_email, mailing_address1, mailing_address2, mailing_city_id, mailing_province_id,
                         mailing_country_id, mailing_postal_code,
                         pre_funded_year, pre_funding_years_used, school_email, school_phone,
                         parent_mailing_address1, parent_mailing_address2, parent_mailing_city_id,
                         parent_mailing_province_id, parent_mailing_country_id, parent_mailing_postal_code,
                         parent_telephone, csl_letter_date, csl_warn_code, pre_over_award_amount, pre_yea_awards_used_amount, user_name, user_password,
                         is_active, is_first_logon_flg, 
                         last_logon_date, last_pw_change_date,
                         yea_expiry_date, adj_yg_funding_weeks, adj_sta_upgrading_weeks, adj_outside_travel_cnt)
SELECT STUDENT_ID,
       HIGH_SCHOOL_ID,
       EDUCATION_LEVEL_ID,
       LANGUAGE_ID,
       BIRTH_CITY_ID,
       BIRTH_PROVINCE_ID,
       BIRTH_COUNTRY_ID,
       SEX,
       CASE
           WHEN INDIGENOUS_LEARNER = 'Yes' THEN 1
           WHEN INDIGENOUS_LEARNER = 'No' THEN 2
           WHEN INDIGENOUS_LEARNER = 'Prefer Not to Say' THEN 3
           ELSE -1 END,
       FIRST_NAME,
       LAST_NAME,
       PREVIOUS_LAST_NAME,
       INITIALS,
       SIN,
       BIRTH_DATE,
       VENDOR_ID,
       YUKON_ID,
       CASE WHEN CHECKED_FOR_YTID_FLG = 'Yes' THEN 1 ELSE 0 END,
       NATIONAL_ID,
       LOCATOR_NUMBER,
       CASE WHEN CROWN_WARD_FLG = 'Yes' THEN 1 ELSE 0 END,
       HIGH_SCHOOL_FINAL_GRADE,
       HIGH_SCHOOL_LEFT_YEAR,
       HIGH_SCHOOL_LEFT_MONTH,
       HOME_ADDRESS1,
       HOME_ADDRESS2,
       HOME_CITY_ID,
       HOME_PROVINCE_ID,
       HOME_COUNTRY_ID,
       HOME_POSTAL_CODE,
       HOME_PHONE,
       HOME_EMAIL,
       MAILING_ADDRESS1,
       MAILING_ADDRESS2,
       MAILING_CITY_ID,
       MAILING_PROVINCE_ID,
       MAILING_COUNTRY_ID,
       MAILING_POSTAL_CODE,       
       PRE_FUNDED_YEAR,
       PRE_FUNDING_YEARS_USED,
       SCHOOL_EMAIL,
       SCHOOL_PHONE,
       PARENT_MAILING_ADDRESS1,
       PARENT_MAILING_ADDRESS2,
       PARENT_MAILING_CITY_ID,
       PARENT_MAILING_PROVINCE_ID,
       PARENT_MAILING_COUNTRY_ID,
       PARENT_MAILING_POSTAL_CODE,
       PARENT_TELEPHONE,       
       CSL_LETTER_DATE,
       CSL_WARN_CODE,
       PRE_OVER_AWARD,
       PRE_YEA_AWARDS_USED,
       USER_NAME,
       USER_PASSWORD,
       CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END,
       CASE WHEN IS_FIRST_LOGON_FLG = 'Y' THEN 1 ELSE 0 END,
       LAST_LOGON_DATE,
       LAST_PW_CHG_DATE,
       YEA_EXPIRY_DATE,
       ADJ_YG_FUNDING_WEEKS,
       ADJ_STA_UPGRADING_WEEKS,
       ADJ_OUTSIDE_TRAVEL_CNT
FROM SFAADMIN.student

SET IDENTITY_INSERT sfa.student OFF

-- SFAADMIN.STUDENT_CONSENT
DROP TABLE if exists sfa.student_consent
CREATE TABLE sfa.student_consent (
	id INT IDENTITY(1,1) PRIMARY KEY,
	student_id INT NOT NULL REFERENCES sfa.student,
	start_academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id),
	end_academic_year_id INT NULL REFERENCES sfa.academic_year (id),
	consent_person NVARCHAR (200) NOT NULL,
	consent_sfa BIT NOT NULL DEFAULT 0,
	consent_csl BIT NOT NULL DEFAULT 0
)

SET IDENTITY_INSERT sfa.student_consent ON

INSERT INTO sfa.student_consent (id, student_id, start_academic_year_id, end_academic_year_id, consent_person, consent_sfa, consent_csl)
SELECT STUDENT_CONSENT_ID, STUDENT_ID, ACADEMIC_YEAR_START,ACADEMIC_YEAR_END, CONSENT_PERSON, 
CASE WHEN CONSENT_SFA_FLG = 'Yes' THEN 1 ELSE 0 END, CASE WHEN CONSENT_CSL_FLG = 'Yes' THEN 1 ELSE 0 END
FROM SFAADMIN.student_consent
WHERE ACADEMIC_YEAR_START != 0

SET IDENTITY_INSERT sfa.student_consent OFF

-- SFAADMIN.RESIDENCE
DROP TABLE if exists sfa.residence
CREATE TABLE sfa.residence (
	id INT IDENTITY(1,1) PRIMARY KEY,
	student_id INT NOT NULL REFERENCES sfa.student,
	address NVARCHAR(200) NULL,
	city_id INT NULL REFERENCES sfa.city,
	province_id INT NULL REFERENCES sfa.province,
	country_id INT NULL REFERENCES sfa.country,
	postal_code NVARCHAR(50),
	in_school INT NULL,
	from_year INT NULL,
	from_month INT NULL,
	to_year INT null,
	to_month int null,
	is_in_progress BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.residence ON

INSERT INTO sfa.residence (id, student_id, address, city_id, province_id, country_id, postal_code, in_school, from_year, from_month, to_year, to_month, is_in_progress)
SELECT RESIDENCE_ID, STUDENT_ID, ADDRESS, CITY_ID, PROVINCE_ID, COUNTRY_ID, POSTAL_CODE, 
IN_SCHOOL, FROM_YEAR, FROM_MONTH, TO_YEAR, TO_MONTH, 
CASE WHEN IS_IN_PROGRESS_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.residence

SET IDENTITY_INSERT sfa.residence OFF

-- SFAADMIN.REQUEST_TYPE
DROP TABLE if exists sfa.request_type
CREATE TABLE sfa.request_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	application_type_id INT NULL REFERENCES sfa.application_type,
	funding_group_id INT NULL REFERENCES sfa.funding_group,
	batch_group_id INT NULL REFERENCES sfa.batch_group,
	description NVARCHAR(200) NULL,
	scholarship_flag INT NOT NULL,
	application_deadline NVARCHAR(500) NULL,
	regulation NVARCHAR(200) NULL,
	program_type NVARCHAR(100) NULL,
	static_description_flag INT NULL,
	financial_coding NVARCHAR(50) NULL,
	t4a_required BIT NOT NULL DEFAULT 0,
	csg_other_flag INT NULL,
	gl_budget FLOAT NULL,
	auto_appear NVARCHAR(50),
	show_online BIT NOT NULL DEFAULT 0,
	short_name NVARCHAR(15) NULL,
	help_url NVARCHAR(1000) NULL,
	help_text TEXT NULL
)

SET IDENTITY_INSERT sfa.request_type ON

INSERT INTO sfa.request_type ( id, application_type_id, funding_group_id, batch_group_id, description, scholarship_flag, application_deadline, regulation, program_type, static_description_flag, financial_coding, t4a_required, csg_other_flag, gl_budget, auto_appear, show_online, short_name, help_url, help_text)
SELECT REQUEST_TYPE_ID, APPLICATION_TYPE_ID, FUNDING_GROUP_ID, BATCH_GROUP_ID, APPLICATION_REQ_TYPE_ID
	DESCRIPTION, SCHOLARSHIP_FLAG, APPLICATION_DEADLINE, REGULATION, PROGRAM_TYPE, STATIC_DESCRIPTION_FLAG, FINANCIAL_CODING,
	CASE WHEN T4A_REQUIRED_FLAG = 1 THEN 1 ELSE 0 END, 	CSG_OTHER_FLAG, GL_BUDGET, AUTO_APPEAR, 
	CASE WHEN SHOW_ONLINE = 'Y' THEN 1 ELSE 0 END, SHORT_NAME, HELP_URL,HELP_TEXT
FROM SFAADMIN.request_type 

SET IDENTITY_INSERT sfa.request_type OFF

-- SFAADMIN.REQUEST_REQUIREMENT
DROP TABLE if exists sfa.request_requirement
CREATE TABLE sfa.request_requirement (
	id INT IDENTITY(1,1) PRIMARY KEY,
	request_type_id INT NOT NULL REFERENCES sfa.request_type,
	requirement_type_id INT NOT NULL REFERENCES sfa.requirement_type,
	condition NVARCHAR(200) NULL,
	UNIQUE(request_type_id, requirement_type_id)
)

INSERT INTO sfa.request_requirement (request_type_id, requirement_type_id, condition)
SELECT REQUEST_TYPE_ID, REQUIREMENT_TYPE_ID, CONDITION
FROM SFAADMIN.request_requirement 

-- SFAADMIN.INSTITUTION_REQUEST_TYPE
DROP TABLE if exists sfa.institution_request_type
CREATE TABLE sfa.institution_request_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	institution_campus_id INT NOT NULL REFERENCES sfa.institution_campus,
	request_type_id INT NOT NULL REFERENCES sfa.request_type,
	UNIQUE (institution_campus_id, request_type_id)
)

INSERT INTO sfa.institution_request_type (institution_campus_id, request_type_id)
SELECT INSTITUTION_ID, REQUEST_TYPE_ID
FROM SFAADMIN.institution_request_type

-- SFAADMIN.EXPENESE_CATEGORY
DROP TABLE if exists sfa.expense_category
CREATE TABLE sfa.expense_category (
	id INT IDENTITY(1,1) PRIMARY KEY,
	report_expense_category_id INT NULL REFERENCES sfa.report_expense_category,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.expense_category ON

INSERT INTO sfa.expense_category (id, report_expense_category_id, description, is_active)
SELECT EXPENSE_CATEGORY_ID, REPORT_EXPENSE_CATEGORY_ID, DESCRIPTION,CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.expense_category

SET IDENTITY_INSERT sfa.expense_category OFF

-- SFAADMIN.EDUCATION
DROP TABLE if exists sfa.education
CREATE TABLE sfa.education (
	id INT IDENTITY(1,1) PRIMARY KEY,
	student_id INT NOT NULL REFERENCES sfa.student,
	institution_campus_id INT NULL REFERENCES sfa.institution_campus,
	study_area_id INT NULL REFERENCES sfa.study_area,
	from_year INT NULL,
	from_month INT NULL,
	to_year INT NULL,
	to_month INT NULL,
	is_in_progress BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.education ON

INSERT INTO sfa.education (id, student_id, institution_campus_id, study_area_id, from_year, from_month, to_year, to_month, is_in_progress)
SELECT EDUCATION_ID, STUDENT_ID, INSTITUTION_ID, STUDY_AREA_ID, FROM_YEAR, FROM_MONTH, TO_YEAR, TO_MONTH, CASE WHEN IS_IN_PROGRESS_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.education

SET IDENTITY_INSERT sfa.education OFF

-- SFAADMIN.DEPENDENT
DROP TABLE if exists sfa.dependent
CREATE TABLE sfa.dependent (
	id INT IDENTITY(1,1) PRIMARY KEY,
	student_id INT NOT NULL REFERENCES sfa.student,
	relationship_id INT NULL REFERENCES sfa.relationship,
	first_name NVARCHAR(100) NULL,
	last_name NVARCHAR(100) NULL,
	comments TEXT NULL,
	birth_date DATE NULL,
	is_in_progress BIT NOT NULL DEFAULT 1,
	is_conversion BIT NOT NULL DEFAULT 0,
	is_disability BIT NOT NULL DEFAULT 0
)

SET IDENTITY_INSERT sfa.dependent ON

INSERT INTO sfa.dependent (id, student_id, relationship_id, first_name, last_name, comments, birth_date, is_in_progress, is_conversion, is_disability)
SELECT DEPENDENT_ID, STUDENT_ID, RELATIONSHIP_ID, FIRST_NAME, LAST_NAME, COMMENTS, BIRTH_DATE,
	CASE WHEN IS_IN_PROGRESS_FLG = 'Y' THEN 1 ELSE 0 END, CASE WHEN CONVERSION_FLG = 'Y' THEN 1 ELSE 0 END, CASE WHEN DISABILITY_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.dependent

SET IDENTITY_INSERT sfa.dependent OFF

-- SFAADMIN.CORRESPONDENCE_TYPE
DROP TABLE if exists sfa.correspondence_type
CREATE TABLE sfa.correspondence_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.correspondence_type ON

INSERT INTO sfa.correspondence_type ( id, description, is_active)
SELECT CORRESPONDENCE_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.correspondence_type 

SET IDENTITY_INSERT sfa.correspondence_type OFF

-- SFAADMIN.CORRESPONDENCE
DROP TABLE if exists sfa.correspondence
CREATE TABLE sfa.correspondence (
	id INT IDENTITY(1,1) PRIMARY KEY,
	officer_id INT NOT NULL REFERENCES sfa.[user],
	student_id INT  NOT NULL REFERENCES sfa.student,
	request_type_id INT NULL REFERENCES sfa.request_type,
	correspondence_type_id INT NOT NULL REFERENCES sfa.correspondence_type,
	comments TEXT NULL,
	correspondence_date DATETIME2(0) NOT NULL, 
	sent_date DATETIME2(0) NULL,
	is_complete BIT NOT NULL DEFAULT 0
)

SET IDENTITY_INSERT sfa.correspondence ON

INSERT INTO sfa.correspondence ( id, officer_id, student_id, request_type_id, correspondence_type_id, comments, correspondence_date, sent_date, is_complete)
SELECT CORRESPONDENCE_ID,OFFICER_ID,STUDENT_ID,REQUEST_TYPE_ID,CORRESPONDENCE_TYPE_ID,COMMENTS,CORRESPONDENCE_DATE,SENT_DATE,
	CASE WHEN COMPLETED_FLAG = 1 THEN 1 ELSE 0 END
FROM SFAADMIN.correspondence

SET IDENTITY_INSERT sfa.correspondence OFF

-- SFAADMIN.corres_batch_param
DROP TABLE if exists sfa.correspondence_batch_param
CREATE TABLE sfa.correspondence_batch_param (
	id INT IDENTITY(1,1) PRIMARY KEY,
	correspondence_id INT NOT NULL REFERENCES sfa.correspondence,
	batch_parameter_id INT  NOT NULL REFERENCES sfa.batch_parameter,
	parameter_value TEXT NULL,
	UNIQUE (correspondence_id, batch_parameter_id)
)

INSERT INTO sfa.correspondence_batch_param ( correspondence_id, batch_parameter_id, parameter_value)
SELECT CORRESPONDENCE_ID, BATCH_PARAMETER_ID, PARAMETER_VALUE
FROM SFAADMIN.corres_batch_param

-- SFAADMIN.corr_type_batch_param
DROP TABLE if exists sfa.correspondence_type_batch_param
CREATE TABLE sfa.correspondence_type_batch_param (
	id INT IDENTITY(1,1) PRIMARY KEY,
	correspondence_type_id INT NOT NULL REFERENCES sfa.correspondence_type,
	batch_parameter_id INT NOT NULL REFERENCES sfa.batch_parameter,
	source NVARCHAR(200) NULL
)

INSERT INTO sfa.correspondence_type_batch_param ( correspondence_type_id, batch_parameter_id, source)
SELECT CORRESPONDENCE_TYPE_ID, BATCH_PARAMETER_ID, SOURCE
FROM SFAADMIN.corr_type_batch_param

-- SFAADMIN.COMMUNICATION
DROP TABLE if exists sfa.communication
CREATE TABLE sfa.communication (
	id INT IDENTITY(1,1) PRIMARY KEY,
	officer_id INT NOT NULL REFERENCES sfa.[user],
	student_id INT  NOT NULL REFERENCES sfa.student,
	request_type_id INT NULL REFERENCES sfa.request_type,
	communication_type_id INT NULL REFERENCES sfa.communication_type,
	comments TEXT NULL,
	communication_date DATETIME2(0) NULL, 
	show_alert BIT NOT NULL DEFAULT 0
)

SET IDENTITY_INSERT sfa.communication ON

INSERT INTO sfa.communication ( id, communication_type_id, officer_id, student_id, request_type_id, communication_date, comments, show_alert)
SELECT COMMUNICATION_ID, COMMUNICATION_TYPE_ID, OFFICER_ID, STUDENT_ID, REQUEST_TYPE_ID, COMMUNICATION_DATE, COMMENTS, 
	CASE WHEN SHOW_ALERT_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.communication

SET IDENTITY_INSERT sfa.communication OFF







--select * from sfa.communication
--select * from sfaadmin.communication



--select count(*) from sfaadmin.residence
--where from_month is null



