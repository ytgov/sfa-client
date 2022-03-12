
-- SFA SCHEMA
IF NOT EXISTS ( SELECT  *
                FROM    sys.schemas
                WHERE   name = N'sfa' )
    EXEC('CREATE SCHEMA [sfa]');
GO

-- COUNTRY
CREATE TABLE sfa.country(
    id INT IDENTITY(1, 1) PRIMARY KEY,
    description NVARCHAR(100) NOT NULL,
	abbreviation NVARCHAR(20) NULL,
    created_by NVARCHAR(30) NULL,
    created_date DATETIME2 NULL DEFAULT GETDATE(),
    last_modified_by NVARCHAR(255) NULL,
    last_modified_date DATETIME2 NULL,
    is_active BIT NOT NULL DEFAULT 1
)

-- PROVINCE
CREATE TABLE sfa.province(
    id INT IDENTITY(1, 1) PRIMARY KEY,
    description NVARCHAR(100) NOT NULL,
	abbreviation NVARCHAR(20) NULL,
    country_id INT NULL REFERENCES sfa.country (id),
    created_by NVARCHAR(30) NULL,
    created_date DATETIME2 NULL DEFAULT GETDATE(),
    last_modified_by NVARCHAR(255) NULL,
    last_modified_date DATETIME2 NULL,
    is_active BIT NOT NULL DEFAULT 1
)
 -- SFA.CITY
CREATE TABLE sfa.city(
    id INT IDENTITY(1, 1) PRIMARY KEY,
    description NVARCHAR(100) NOT NULL,
    province_id INT NULL REFERENCES sfa.province (id),
    created_by NVARCHAR(30) NULL,
    created_date DATETIME2 NULL DEFAULT GETDATE(),
    last_modified_by NVARCHAR(255) NULL,
    last_modified_date DATETIME2 NULL,
    is_active BIT NOT NULL DEFAULT 1
)

-- ACADEMIC_YEAR
CREATE TABLE sfa.academic_year (
	id INT IDENTITY(1965,1) PRIMARY KEY,
	[year] NVARCHAR(4) NOT NULL UNIQUE,
	status NVARCHAR(50) NOT NULL DEFAULT 'Open'
)

-- USER
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='user' and xtype='U')
	CREATE TABLE sfa.[user](
		id INT IDENTITY(1,1) PRIMARY KEY,
		email NVARCHAR(200) NOT NULL UNIQUE,
		email_public NVARCHAR(200) NOT NULL,
		is_active bit NOT NULL DEFAULT 1, 
		first_name NVARCHAR(100) NOT NULL,
		last_name NVARCHAR(100) NOT NULL,
		position NVARCHAR(200) NULL,
		phone NVARCHAR(25) NULL,
		phone_tollfree NVARCHAR(25) NULL,
		fax NVARCHAR(25) NULL,
		create_date DATETIME2 NOT NULL DEFAULT GETDATE()
	)


CREATE TABLE sfa.institution_level (
    id INT IDENTITY(1,1) PRIMARY KEY,
    description NVARCHAR(50) NOT NULL UNIQUE,
    is_active BIT NOT NULL DEFAULT 1
)

CREATE TABLE sfa.institution (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(400) NOT NULL UNIQUE,
    is_active BIT NOT NULL DEFAULT 1,
    federal_institution_code NVARCHAR(24),
    institution_level_id INT NOT NULL REFERENCES sfa.institution_level (id),
    created_by NVARCHAR(100) NULL,
    created_date DATETIME2 NULL DEFAULT GETDATE(),
    last_modified_by NVARCHAR(100),
    last_modified_date DATETIME2
)

CREATE TABLE sfa.institution_campus (
    id INT IDENTITY(1,1) PRIMARY KEY,
    institution_id INT REFERENCES sfa.institution (id),
    name NVARCHAR(400) NOT NULL,
    federal_institution_code NVARCHAR(24),
    is_active BIT NOT NULL DEFAULT 1, 
	is_primary BIT NOT NULL DEFAULT 0,
    care_of NVARCHAR(500) NULL,
    address_line_1 NVARCHAR(200) NULL,
    address_line_2 NVARCHAR(200) NULL,
    address_city_id INT REFERENCES sfa.city (id) NULL,
    address_province_id INT REFERENCES sfa.province (id) NULL,
    address_country_id INT REFERENCES sfa.country (id) NULL,
    address_postal_code NVARCHAR(50),
    email_address NVARCHAR(100),
    created_by NVARCHAR(100) NULL,
    created_date DATETIME2 NULL DEFAULT GETDATE(),
    last_modified_by NVARCHAR(100),
    last_modified_date DATETIME2
)

CREATE TABLE sfa.institution_campus_dates (
    id INT IDENTITY(1,1) PRIMARY KEY,
    institution_campus_id INT REFERENCES sfa.institution_campus (id) NOT NULL,
	academic_year_id INT REFERENCES sfa.academic_year (id) NOT NULL,
	class_start_date DATETIME2 NULL,
	class_end_date DATETIME2 NULL,
    created_by NVARCHAR(100) NULL,
    created_date DATETIME2 NULL DEFAULT GETDATE(),
    last_modified_by NVARCHAR(100),
    last_modified_date DATETIME2
)

CREATE TABLE sfa.institution_campus_notes (
	id INT IDENTITY(1,1) PRIMARY KEY,
    institution_campus_id INT REFERENCES sfa.institution_campus (id) NOT NULL,
	note text NOT NULL,
    created_by NVARCHAR(100) NULL,
    created_date DATETIME2 NULL DEFAULT GETDATE(),
    last_modified_by NVARCHAR(100),
    last_modified_date DATETIME2
)






-- SEX
CREATE TABLE sfa.sex (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(50) NOT NULL UNIQUE,
	is_active BIT NOT NULL DEFAULT 1
)

-- INDEIGENOUS_LEARNER
create table sfa.indigenous_learner (
	id int identity primary key,
	description nvarchar(50) not null unique,
	is_active bit not null default 0
)





-- SFAADMIN.ABORIGINAL_STATUS
CREATE TABLE sfa.aboriginal_status (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL UNIQUE,
	is_active BIT NOT NULL DEFAULT 1,
	nars_status_id INT NULL,
	sort_order INT NOT NULL DEFAULT 99
)

-- SFAADMIN.AGE_DISTRIBUTION
CREATE TABLE sfa.age_distribution (
	id INT IDENTITY(1,1) PRIMARY KEY,
	start_age INT NOT NULL,
	end_age INT NOT NULL
)

-- SFAADMIN.AGENCY
CREATE TABLE sfa.agency (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.APPLICATION_TYPE
CREATE TABLE sfa.application_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.ASSESSMENT_TYPE
CREATE TABLE sfa.assessment_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.BATCH_GROUP
CREATE TABLE sfa.batch_group (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	prefix NVARCHAR(200) NULL, 
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.BATCH_PARAMETER
CREATE TABLE sfa.batch_parameter (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	user_description NVARCHAR(200) NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.CATEGORY
CREATE TABLE sfa.category (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.CHANGE_REASON
CREATE TABLE sfa.change_reason (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.CHILD_CARE_CEILING
CREATE TABLE sfa.child_care_ceiling (
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id),
	province_id INT NOT NULL REFERENCES sfa.province (id), 
	max_amount NUMERIC(7,2) NOT NULL
)

-- SFAADMIN.COMUNICATION_TYPE
CREATE TABLE sfa.communication_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

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

-- SFAADMIN.CSL_CODE
CREATE TABLE sfa.csl_code (
	id INT IDENTITY(1,1) PRIMARY KEY,
	warning_code NVARCHAR(10) NULL,
	reason_code NVARCHAR(10) NULL,
	code_type NVARCHAR(10) NOT NULL,
	definition NVARCHAR(1000) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

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

-- SFAADMIN.CSL_REASON
CREATE TABLE sfa.csl_reason (
	id INT IDENTITY(1,1) PRIMARY KEY,
	type NVARCHAR(50) NOT NULL,
	name NVARCHAR(50) NOT NULL,
	description TEXT NULL
)

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

-- SFAADMIN.DISAB_SERVICE_TYPE
CREATE TABLE sfa.disability_service (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.DISABILITY_TYPE
CREATE TABLE sfa.disability_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	csl_code NVARCHAR(5) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.DISBURSEMENT_TYPE
CREATE TABLE sfa.disbursement_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.EDUCATION_LEVEL
CREATE TABLE sfa.education_level (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	rank INT NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.ENTITLEMENT_ERROR_CODES
CREATE TABLE sfa.entitlement_error_codes (
	id INT IDENTITY(1,1) PRIMARY KEY,
	code NVARCHAR(50) NOT NULL UNIQUE,
	description NVARCHAR(200) NOT NULL,
	is_confirmed BIT NOT NULL DEFAULT 1,
	is_in_feedback BIT NOT NULL DEFAULT 1,
	is_resend BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.FIRST_NATION
CREATE TABLE sfa.first_nation (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	city_id INT NULL REFERENCES sfa.city (id),
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.FUNDING_GROUP
CREATE TABLE sfa.funding_group (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	sort_order INT NOT NULL DEFAULT 99,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.HIGH_SCHOOL
CREATE TABLE sfa.high_school (
	id INT IDENTITY(1,1) PRIMARY KEY,
	name NVARCHAR(200) NOT NULL,
	city_id INT NOT NULL REFERENCES sfa.city (id),
	province_id INT NOT NULL REFERENCES sfa.province (id),
	country_id INT NOT NULL REFERENCES sfa.country (id),
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.INFO_CATEGORY
CREATE TABLE sfa.info_category (
	id INT IDENTITY(1,1) PRIMARY KEY,
	canvas_name NVARCHAR(200) NOT NULL,
	category_name NVARCHAR(200) NOT NULL,
	sort_order INT NOT NULL DEFAULT 99,
	first_item NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.INSTRUCTION_TYPE
CREATE TABLE sfa.instruction_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.INVESTMENT_TYPE
CREATE TABLE sfa.investment_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.LANGUAGE
CREATE TABLE sfa.language (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.MARITAL_STATUS
CREATE TABLE sfa.marital_status (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.OWNERSHIP
CREATE TABLE sfa.ownership (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

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

-- SFAADMIN.PART_TIME_REASON
CREATE TABLE sfa.part_time_reason (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.PERIOD
CREATE TABLE sfa.period (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.PORTAL_STATUS
CREATE TABLE sfa.portal_status (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.PRESTUDY_EMPLOY_STATUS
CREATE TABLE sfa.prestudy_employment_status (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.PRESTUDY_TAX_RATE
CREATE TABLE sfa.prestudy_tax_rate (
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id),
	from_income_amount NUMERIC(10,2) NOT NULL,
	to_income_amount NUMERIC(10,2) NOT NULL,
	prestudy_tax_rate FLOAT NOT NULL
)

-- SFAADMIN.PROGRAM
CREATE TABLE sfa.program (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	education_level_id INT NOT NULL REFERENCES sfa.education_level (id),
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.RELATIONSHIP
CREATE TABLE sfa.relationship (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.REPORT_EXPENSE_CATEGORY
CREATE TABLE sfa.report_expense_category (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.REQUIREMENT_TYPE
CREATE TABLE sfa.requirement_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	document_location NVARCHAR(2000) NULL,
	show_online BIT NOT NULL DEFAULT 1,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.SFA_DOCUMENT_LINK
CREATE TABLE sfa.sfa_document_link (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	document_location NVARCHAR(2000) NULL,
	sort_order INT NOT NULL DEFAULT 99,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.SPOUSE_TAX_RATE
CREATE TABLE sfa.spouse_tax_rate (
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id), 
	province_id INT NOT NULL REFERENCES sfa.province (id), 
	from_income_amount NUMERIC(10,2) NOT NULL,
	to_income_amount NUMERIC(10,2) NOT NULL,
	tax_rate FLOAT NOT NULL
)

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

-- SFAADMIN.STANDARD_OF_LIVING
CREATE TABLE sfa.standard_of_living(
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id), 
	province_id INT NOT NULL REFERENCES sfa.province (id),
	family_size INT NOT NULL,
	standard_living_amount NUMERIC(10,2) NOT NULL,
	UNIQUE (academic_year_id, province_id, family_size)
)

-- SFAADMIN.STATUS
CREATE TABLE sfa.status(
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	online_description NVARCHAR(200) NULL,
	sort_order INT NOT NULL DEFAULT 99,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.STATUS_REASON
CREATE TABLE sfa.status_reason (
	id INT IDENTITY(1,1) PRIMARY KEY,
	status_id INT NULL REFERENCES sfa.status (id),
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.STUDENT_CATEGORY
CREATE TABLE sfa.student_category (
	id INT IDENTITY(1,1) PRIMARY KEY,
	code NVARCHAR(10) NOT NULL UNIQUE,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

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

-- SFAADMIN.STUDY_FIELD
CREATE TABLE sfa.study_field (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.STUDY_AREA
CREATE TABLE sfa.study_area (
	id INT IDENTITY(1,1) PRIMARY KEY,
	study_field_id INT NOT NULL REFERENCES sfa.study_field (id),
	description NVARCHAR(200) NOT NULL,
	show_online BIT NOT NULL DEFAULT 1,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.STUDY_TAX_RATE
CREATE TABLE sfa.study_tax_rate (
	id INT IDENTITY(1,1) PRIMARY KEY,
	academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id),
	from_income_amount NUMERIC(10,2) NOT NULL,
	to_income_amount NUMERIC(10,2) NOT NULL,
	study_tax_rate FLOAT NOT NULL
)

-- SFAADMIN.SYSTEM_DEP_PARAMS
CREATE TABLE sfa.system_dep_params (
	id INT IDENTITY(1,1) PRIMARY KEY,
	dependent_count INT NOT NULL UNIQUE,
	weekly_amount NUMERIC(10,2) NOT NULL
)

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

-- SFAADMIN.TRANSPORTATION
CREATE TABLE sfa.transportation (
	id INT IDENTITY(1,1) PRIMARY KEY,
	home_city_id INT NOT NULL REFERENCES sfa.city (id),
	institution_city_id INT NOT NULL REFERENCES sfa.city(id),
	travel_allowance_amount NUMERIC(10,2) NOT NULL,
	airfare_amount NUMERIC(10,2) NOT NULL,
	UNIQUE (home_city_id, institution_city_id)
)

-- SFAADMIN.VERIFICATION_LOG
CREATE TABLE sfa.verification_log (
	id INT IDENTITY(1,1) PRIMARY KEY,
	institution_campus_id INT NOT NULL REFERENCES sfa.institution_campus (id),
	is_emailed BIT NOT NULL DEFAULT 1,
	student_count INT NOT NULL
)

-- SFAADMIN.YEA
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

-- SFAADMIN.YEA_UPDATE
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

-- SFAADMIN.YG_COST
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

-- SFA.ADDRESS_TYPE
CREATE TABLE sfa.address_type (
    id INT IDENTITY(1,1) PRIMARY KEY,
    description NVARCHAR(100) NOT NULL UNIQUE,
    is_active BIT NOT NULL DEFAULT 1
)

-- SFA.PERSON
CREATE TABLE sfa.person (
    id INT IDENTITY(1,1) PRIMARY KEY,
	language_id int null references sfa.language (id),
	sex_id int null references sfa.sex(id),
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

-- SFA.PERSON_ADDRESS
CREATE TABLE sfa.person_address (
    id INT IDENTITY(1,1) PRIMARY KEY,
	person_id INT NOT NULL REFERENCES sfa.person,
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

-- SFAADMIN.STUDENT
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

-- SFAADMIN.STUDENT_CONSENT
CREATE TABLE sfa.student_consent (
	id INT IDENTITY(1,1) PRIMARY KEY,
	student_id INT NOT NULL REFERENCES sfa.student,
	start_academic_year_id INT NOT NULL REFERENCES sfa.academic_year (id),
	end_academic_year_id INT NULL REFERENCES sfa.academic_year (id),
	consent_person NVARCHAR (200) NOT NULL,
	consent_sfa BIT NOT NULL DEFAULT 0,
	consent_csl BIT NOT NULL DEFAULT 0
)

-- SFAADMIN.RESIDENCE
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

-- SFAADMIN.REQUEST_TYPE
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

-- SFAADMIN.REQUEST_REQUIREMENT
CREATE TABLE sfa.request_requirement (
	id INT IDENTITY(1,1) PRIMARY KEY,
	request_type_id INT NOT NULL REFERENCES sfa.request_type,
	requirement_type_id INT NOT NULL REFERENCES sfa.requirement_type,
	condition NVARCHAR(200) NULL,
	UNIQUE(request_type_id, requirement_type_id)
)

-- SFAADMIN.INSTITUTION_REQUEST_TYPE
CREATE TABLE sfa.institution_request_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	institution_campus_id INT NOT NULL REFERENCES sfa.institution_campus,
	request_type_id INT NOT NULL REFERENCES sfa.request_type,
	UNIQUE (institution_campus_id, request_type_id)
)

-- SFAADMIN.EXPENESE_CATEGORY
CREATE TABLE sfa.expense_category (
	id INT IDENTITY(1,1) PRIMARY KEY,
	report_expense_category_id INT NULL REFERENCES sfa.report_expense_category,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.EDUCATION
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

-- SFAADMIN.DEPENDENT
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

-- SFAADMIN.CORRESPONDENCE_TYPE
CREATE TABLE sfa.correspondence_type (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(200) NOT NULL,
	is_active BIT NOT NULL DEFAULT 1
)

-- SFAADMIN.CORRESPONDENCE
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

-- SFAADMIN.corres_batch_param
CREATE TABLE sfa.correspondence_batch_param (
	id INT IDENTITY(1,1) PRIMARY KEY,
	correspondence_id INT NOT NULL REFERENCES sfa.correspondence,
	batch_parameter_id INT  NOT NULL REFERENCES sfa.batch_parameter,
	parameter_value TEXT NULL,
	UNIQUE (correspondence_id, batch_parameter_id)
)

-- SFAADMIN.corr_type_batch_param
CREATE TABLE sfa.correspondence_type_batch_param (
	id INT IDENTITY(1,1) PRIMARY KEY,
	correspondence_type_id INT NOT NULL REFERENCES sfa.correspondence_type,
	batch_parameter_id INT NOT NULL REFERENCES sfa.batch_parameter,
	source NVARCHAR(200) NULL
)

-- SFAADMIN.COMMUNICATION
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



CREATE TABLE sfa.student_persons (
    id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL REFERENCES sfa.student,
    person_id INT NULL references sfa.person,
    relationship_id INT NOT NULL REFERENCES sfa.relationship,
    is_active BIT NOT NULL DEFAULT 1
)


