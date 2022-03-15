
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

CREATE TABLE sfa.application (
    id int identity(1, 1) primary key,
    student_id int not null references sfa.student,
    academic_year_id int not null references sfa.academic_year,
    institution_campus_id int null references sfa.institution_campus,
    study_area_id int null references sfa.study_area,
    program_id int null references sfa.program,
    aboriginal_status_id int null references sfa.aboriginal_status,
    marital_status_id int null references sfa.marital_status,
    category_id int null references sfa.category,
    first_nation_id int null references sfa.first_nation,
    spouse_id int null references sfa.person,
    parent1_id int null references sfa.person,
    parent2_id int null references sfa.person,
    parent1_income numeric(10, 2) null,
    parent1_net_income numeric(10, 2) null,
    parent1_tax_paid numeric(10, 2) null,
    parent2_income numeric(10, 2) null,
    parent2_net_income numeric(10, 2) null,
    parent2_tax_paid numeric(10, 2) null,    
	school_email nvarchar(100) null,
	school_telephone nvarchar(24) null,
    spouse_hs_end_year int null,
    spouse_hs_end_month int null,
    spouse_prestudy_emp_status_id int null references sfa.prestudy_employment_status,
    spouse_pstudy_school_from DATE null,
    spouse_pstudy_school_to DATE null,
    spouse_pstudy_income_comment text null,
    spouse_study_emp_status_id int null references sfa.prestudy_employment_status,
    spouse_study_school_from DATE null,
    spouse_study_school_to DATE null,
    is_spouse_study_csl BIT NOT NULL DEFAULT 0,
    is_spouse_study_bus BIT NOT NULL DEFAULT 0,
    spouse_study_distance int null,
    spouse_study_income_comment text null,
    classes_start_date DATE null,
    classes_end_date DATE null,
    is_correspondence BIT NOT NULL DEFAULT 0,
    is_coop_paid BIT NOT NULL DEFAULT 0,
    citizenship_status int null,
    is_disabled BIT NOT null DEFAULT 0,
    is_minority BIT NOT null DEFAULT 0,
    student_number nvarchar(30) null,
    program_year_total float null,
    program_year float null,
    is_two_residence BIT NOT NULL DEFAULT 0,
    is_moving BIT NOT NULL DEFAULT 0,
    csl_classification int null,
    csl_previous_province_id int null references sfa.province,
    program_division_explanation nvarchar(200) null,
    prestudy_accom_code int null,
    prestudy_own_home bit not null default 0,
    prestudy_board_amount numeric(10, 2) null,
    prestudy_city_id int null references sfa.city,
    prestudy_province_id int null references sfa.province,
    prestudy_bus bit not null default 0,
    prestudy_distance int null,
    prestudy_employ_status_id int null references sfa.prestudy_employment_status,
    study_accom_code int null,
    study_own_home bit not null default 0,
    study_board_amount numeric(10, 2) null,
    study_city_id int null references sfa.city,
    study_province_id int null references sfa.province,
    study_bus bit not null default 0,
    study_distance int null,
    stat_info_comment nvarchar(500) null,
    books_supplies_cost int null,
    outstanding_cslpt_amount numeric(10, 2) null,
    previous_csg_pt_amount numeric(10, 2) null,
    percent_of_full_time int null,
    is_part_of_ft bit not null default 0,
    study_weeks_count int null,
    class_hours_per_week numeric(4, 1) null,
    parent_residence_comment nvarchar(500) null,
    study_living_w_spouse bit not null default 0,
    tuition_estimate_amount numeric(10, 2) null,
    program_division int null,
    is_previous_cslft bit not null default 0,
    is_previous_cslpt bit not null default 0,
    coop_start_year INT null,
    coop_start_month int null,
    coop_end_year INT null,
    coop_end_month int null,
    exclude_from_count bit not null default 0,
    is_perm_disabled bit not null default 0,
    disabled_equipment nvarchar(500) null,
    previous_csg_disability_amount numeric(10, 2) null,
    previous_csg_fem_doc_amount numeric(10, 2) null,
    credit_chk_reqd_date DATE null,
    credit_chk_fax_sent_date Date null,
    credit_chk_passed_date DATE null,
    credit_chk_passed bit not null default 0,
    credit_chk_appeal_date DATE null,
    credit_chk_app_comp_date DATE null,
    credit_chk_app_comp bit not null default 0,
    credit_chk_comp_date DATE null,
    csl_clearance_date DATE null,
    prestudy_csl_classification int null,
    yea_tot_receipt_amount numeric(10, 2) null,
    academic_percent float null,
    csl_restriction_comment nvarchar(2000) null,
    in_progress_page int null,
    online_start_date DATE null,
    online_submit_date DATE null,
    rem_transition_grant_years int null,
    student_ln150_income numeric(10, 2) null,
    spouse_ln150_income numeric(10, 2) null,
    taxes1_filed_year INT null,
    taxes2_filed_year INT null,
    taxes1_filed_province_id INT null REFERENCES sfa.province,
    taxes2_filed_province_id INT null REFERENCES sfa.province,
    taxes1_not_filed bit not null default 0,
    taxes2_not_filed bit not null default 0,
    applied_other_funding bit not null default 0,
    csl_restriction_warn_id INT null references sfa.csl_code,
    csl_restriction_reason_id int null references sfa.csl_code,
    courses_per_week INT null,
    prestudy_start_date DATE null,
    prestudy_end_date DATE null
)

CREATE TABLE sfa.agency_assistance (
	id INT IDENTITY PRIMARY KEY,
	agency_id INT NOT NULL  REFERENCES sfa.agency,
	application_id INT NOT NULL REFERENCES sfa.application,
	amount NUMERIC(10,2) not null,
	is_tuition BIT NOT NULL DEFAULT 0,
	is_living_expenses BIT NOT NULL DEFAULT 0,
	is_books BIT NOT NULL DEFAULT 0,
	is_transportation BIT NOT NULL DEFAULT 0,
	other_purpose NVARCHAR(500) NULL,
	agency_comment NVARCHAR(500) NULL,
	UNIQUE (agency_id, application_id)
)

CREATE TABLE sfa.course_enrolled (
	id INT IDENTITY PRIMARY KEY,
	application_id INT NOT NULL REFERENCES sfa.application,
	instruction_type_id INT NOT NULL REFERENCES sfa.instruction_type,
	description NVARCHAR(500) NOT NULL,
	course_code NVARCHAR(100) NULL
)

CREATE TABLE sfa.dependent_eligibility (
	id INT IDENTITY PRIMARY KEY,
	application_id INT NOT NULL REFERENCES sfa.application,
	dependent_id INT NOT NULL REFERENCES sfa.dependent,
	is_eligible BIT NOT NULL DEFAULT 0,
	is_post_secondary  BIT NOT NULL DEFAULT 0,
	resides_with_student BIT NOT NULL DEFAULT 0,
	is_shares_custody BIT NOT NULL DEFAULT 0,
	shares_custody_details TEXT NULL,
	is_csl_eligible BIT NOT NULL DEFAULT 0,
	is_csg_eligible BIT NOT NULL DEFAULT 0,
	is_in_progress BIT NOT NULL DEFAULT 0	
)

CREATE TABLE sfa.disability (
	id INT IDENTITY PRIMARY KEY,
	application_id INT NOT NULL REFERENCES sfa.application,
	disability_type_id INT NOT NULL REFERENCES sfa.disability_type,
	description NVARCHAR(100) NULL
)

CREATE TABLE sfa.disability_requirement (
	id INT IDENTITY PRIMARY KEY,
	application_id INT NOT NULL REFERENCES sfa.application,
	disability_service_id INT NOT NULL REFERENCES sfa.disability_service
)

CREATE TABLE sfa.expense (
	id INT IDENTITY PRIMARY KEY,
	application_id INT NOT NULL REFERENCES sfa.application,
	category_id INT NULL REFERENCES sfa.expense_category,
	period_id INT NOT NULL REFERENCES sfa.period,
	description NVARCHAR(500) NULL,
	amount NUMERIC(10,2) NOT NULL DEFAULT 0.00
)

CREATE TABLE sfa.funding_request (
	id INT IDENTITY PRIMARY KEY,
	application_id INT NOT NULL REFERENCES sfa.application,
	request_type_id INT NULL REFERENCES sfa.request_type,
	status_id INT NULL REFERENCES sfa.status,
	status_reason_id INT NULL REFERENCES sfa.status_reason,
	comments TEXT NULL,
	custom_status TEXT NULL,
	received_date DATE NULL,
	status_date DATE NULL,
	yea_request_amount numeric(10,2) NULL,
	yea_request_type INT NULL,
	csl_request_amount numeric(10,2) NULL,
	is_csl_full_amount BIT NULL DEFAULT 0,
	is_csg_only BIT NOT NULL DEFAULT 0
)

CREATE TABLE sfa.application_part_time_reason (
	id INT IDENTITY PRIMARY KEY,
	application_id INT NOT NULL REFERENCES sfa.application,
	part_time_reason_id INT NOT NULL REFERENCES sfa.part_time_reason
)

CREATE TABLE sfa.investment (
	id INT IDENTITY PRIMARY KEY,
	application_id INT NOT NULL REFERENCES sfa.application,
	ownership_id INT NULL REFERENCES sfa.ownership,
	investment_type_id INT NULL REFERENCES sfa.investment_type,
	market_value NUMERIC(10,2),
	is_rrsp BIT NOT NULL DEFAULT 0,
	is_joint BIT NOT NULL DEFAULT 0
)

CREATE TABLE sfa.msfaa(
	id INT IDENTITY PRIMARY KEY,
	application_id INT NOT NULL REFERENCES sfa.application,
	student_id INT NOT NULL REFERENCES sfa.student,
	sent_date DATE NULL,
	signed_date DATE NULL,
	received_date DATE NULL,
	cancel_date DATE NULL,
	msfaa_status NVARCHAR(20) NULL,
	cancel_reason NVARCHAR(50) NULL,
	sent_seq_number INT NULL,
	last_reminder_sent INT NULL,
	is_full_time BIT NOT NULL DEFAULT 1
)

CREATE TABLE sfa.msfaa_email_log(
	id INT IDENTITY PRIMARY KEY,
	msfaa_id INT NOT NULL REFERENCES sfa.msfaa,
	is_emailed BIT NOT NULL DEFAULT 0,
	reminder_sent INT NOT NULL,
	email NVARCHAR(100) NOT NULL
)

CREATE TABLE sfa.parent_dependent(
	id INT IDENTITY PRIMARY KEY,
	application_id INT NOT NULL REFERENCES sfa.application,
	relationship_id INT NULL REFERENCES sfa.relationship,
	first_name NVARCHAR(100) NULL,
	last_name NVARCHAR(100) NULL,
	birth_date DATE NULL,
	age INT NULL,
	is_residing BIT NOT NULL DEFAULT 1,
	is_shared_custody BIT NOT NULL DEFAULT 1,
	is_attend_post_secondary BIT NOT NULL DEFAULT 1,
	comments TEXT NULL,
	is_eligible BIT NOT NULL DEFAULT 1,
	is_disabled BIT NOT NULL DEFAULT 1,
	conversion BIT NOT NULL DEFAULT 1
)

CREATE TABLE sfa.parent_resident (
	id INT IDENTITY PRIMARY KEY,
	application_id INT NOT NULL REFERENCES sfa.application,
	city_id INT NULL REFERENCES sfa.city,
	province_id INT NULL REFERENCES sfa.province,
	country_id INT NULL REFERENCES sfa.country,
	from_year INT NULL,
	from_month INT NULL,
	to_year INT NULL,
	to_month INT NULL	
)

CREATE TABLE sfa.correspondence_request_status (
	id INT IDENTITY PRIMARY KEY,
	request_type_id INT NOT NULL REFERENCES sfa.request_type,
	status_id INT NOT NULL REFERENCES sfa.status,
	correspondence_type_id INT NOT NULL REFERENCES sfa.correspondence_type,
	UNIQUE (request_type_id, status_id, correspondence_type_id)
)

CREATE TABLE sfa.requirement_met (
	id INT IDENTITY PRIMARY KEY,
	application_id INT NOT NULL REFERENCES sfa.application,
	requirement_type_id INT NULL REFERENCES sfa.requirement_type,
	completed_date DATE NULL
)

CREATE TABLE sfa.communication_log (
	id INT IDENTITY PRIMARY KEY,
	msfaa_id INT NULL REFERENCES sfa.msfaa,
	sent_from_email VARCHAR(100) NOT NULL,
	sent_to_email VARCHAR(100) NOT NULL,
	sent_to_cc VARCHAR(1000) NOT NULL,
	subject TEXT NULL,
	reminder_sent INT NULL,
	is_emailed BIT NOT NULL DEFAULT 0
)

create table sfa.assessment (
	id int identity primary key,
	allowed_books float null,
	allowed_months float null,
	allowed_percent numeric(5, 2) null,
	allowed_tuition numeric(10, 2) null,
	assessed_amount numeric(10, 2) null,
	assessed_date date null,
	change_reason_comment text null,
	dependent_count float null,
	effective_rate_date date null,
	home_city_id INT NULL REFERENCES sfa.city,
	living_costs numeric(10, 2) null,
	travel_allowance numeric(10, 2) null,
	weekly_amount numeric(10, 2) null,
	assessment_type_id  INT NULL REFERENCES sfa.assessment_type,
	destination_city_id  INT NULL REFERENCES sfa.city,
	funding_request_id  INT NULL REFERENCES sfa.funding_request,
	disbursements_required INT null,
	weeks_allowed float null,
	second_residence_rate float null,
	classes_end_date date null,
	prestudy_accom_code int null,
	prestudy_province_id  INT NULL REFERENCES sfa.province,
	classes_start_date date null,
	airfare_amount numeric(10, 2) null,
	air_travel_disbursement_period int null,
	shelter_month float null,
	p_trans_month float null,
	r_trans_16wk float null,
	day_care_allowable float null,
	depend_food_allowable float null,
	depend_tran_allowable float null,
	pstudy_shelter_month float null,
	pstudy_p_trans_month float null,
	pstudy_day_care_allow float null,
	pstudy_depend_food_allow float null,
	pstudy_depend_tran_allow float null,
	pstudy_start_date date null,
	pstudy_end_date date null,
	csl_assessed_need float null,
	study_province_id  INT NULL REFERENCES sfa.province,
	csl_over_reason_id  INT NULL REFERENCES sfa.csl_reason,
	csl_non_reason_id  INT NULL REFERENCES sfa.csl_reason,
	over_award float null,
	student_tax_rate float null,
	spouse_tax_rate float null,
	spouse_pstudy_tax_rate float null,
	stud_pstudy_tax_rate float null,
	parent1_income float null,
	parent2_income float null,
	parent1_tax_paid float null,
	parent2_tax_paid float null,
	books_supplies_cost float null,
	tuition_estimate float null,
	uncapped_costs_total float null,
	uncapped_pstudy_total float null,
	day_care_actual float null,
	stud_pstudy_gross float null,
	spouse_pstudy_gross float null,
	pstudy_day_care_actual float null,
	student_gross_income float null,
	spouse_gross_income float null,
	prestudy_csl_classification float null,
	marital_status_id  INT NULL REFERENCES sfa.marital_status,
	spouse_province_id  INT NULL REFERENCES sfa.province,
	study_accom_code float null,
	csl_classification float null,
	family_size float null,
	parent_ps_depend_count float null,
	parent_province varchar(100) null,
	discretionary_cost float null,
	discretionary_cost_actual float null,
	study_distance float null,
	prestudy_distance float null,
	prestudy_bus_flag float null,
	study_bus_flag float null,
	study_living_w_spouse_flag float null,
	csl_full_amt_flag float null,
	study_area_id  INT NULL REFERENCES sfa.study_area,
	program_id  INT NULL REFERENCES sfa.program,
	period varchar(3) null,
	csl_request_amount float null,
	return_uncashable_cert float null,
	years_funded_equivalent numeric(5, 2) null,
	study_weeks float null,
	study_months float null,
	pstudy_expected_contrib float null,
	spouse_expected_income float null,
	asset_tax_rate float null,
	x_trans_total float null,
	relocation_total float null,
	pstudy_x_trans_total float null,
	married_pstudy numeric(10, 2) null,
	married_study numeric(10, 2) null,
	married_assets numeric(10, 2) null,
	entitlement_days float null,
	parent_contribution_override numeric(10, 2) null,
	total_grant_awarded numeric(10, 2) null,
	over_award_disbursement_period int null,
	over_award_applied_flg varchar(3) null,
	pre_leg_amount float null,
	assessment_adj_amount float null,
	student_ln150_income float null,
	student_contribution float null,
	student_contrib_exempt varchar(3) not null,
	spouse_contrib_exempt varchar(3) not null,
	spouse_contribution float null,
	spouse_ln150_income float null,
	student_contribution_review varchar(3) not null,
	spouse_contribution_review varchar(3) not null,
	parent_contribution_review varchar(3) not null,
	student_family_size float null,
	student_expected_contribution float null,
	student_previous_contribution float null,
	spouse_expected_contribution float null,
	spouse_previous_contribution float null,
	student_contribution_override float null,
	spouse_contribution_override float null
)

create table sfa.cls_nars_history (
	id int identity primary key,
	application_id INT NOT NULL REFERENCES sfa.application,
	student_id INT NOT NULL REFERENCES sfa.student,
	assessment_id INT NOT NULL REFERENCES sfa.assessment,
	academic_year INT NOT NULL REFERENCES sfa.academic_year,
	sin nvarchar(9) null,
	loan_year nvarchar(8) null,
	postal_prefix nvarchar(3) null,
	birth_date DATE null,
	gender nvarchar(1) null,
	marital_status nvarchar(1) null,
	institution_code nvarchar(12) null,
	field_of_study nvarchar(8) null,
	year_study nvarchar(2) null,
	study_weeks INT null,
	study_start_date DATE null,
	study_end_date DATE null,
	loan_type nvarchar(2) null,
	course_percentage INT null,
	credit_check_flg nvarchar(1) null,
	credit_check_status nvarchar(1) null,
	disabled_flg nvarchar(1) null,
	disabled_type nvarchar(1) null,
	minority_flg nvarchar(1) null,
	aboriginal_status_flg nvarchar(1) null,
	aboriginal_category nvarchar(1) null,
	assessment_date DATE null,
	csl_classification INT null,
	family_size INT null,
	post_secondary_children INT null,
	spouse_student_flg nvarchar(1) null,
	spouse_csl_flg nvarchar(1) null,
	spouse_sin nvarchar(9) null,
	children_to_11 INT null,
	children_over_12_not_dis INT null,
	children_over_12_dis INT null,
	pstudy_student_income float null,
	study_income_gov float null,
	study_income_gov_tot float null,
	study_income_priv float null,
	study_income_gov_ei float null,
	study_income_cpp float null,
	study_income_wc float null,
	study_income_gov_soc float null,
	study_income_nont_gov float null,
	study_income_nont_gov_tot float null,
	study_income_merit float null,
	study_income_priv_merit float null,
	study_income_employ float null,
	study_income_cs float null,
	study_income_alimony float null,
	study_income_other float null,
	study_income_other_tot float null,
	study_student_income float null,
	parent1_income numeric(10, 2) null,
	parent2_income numeric(10, 2) null,
	student_rrsp numeric(10, 2) null,
	student_vehicle numeric(10, 2) null,
	student_asset numeric(10, 2) null,
	spouse_rrsp numeric(10, 2) null,
	spouse_vehicle float null,
	spouse_asset numeric(10, 2) null,
	student_years_since_hs INT null,
	spouse_years_since_hs INT null,
	student_study_contribution float null,
	student_pstudy_contribution float null,
	spouse_study_contribution float null,
	parental_contribution float null,
	assessed_resources float null,
	tuition_estimate float null,
	assessed_need float null,
	unmet_need float null,
	request_need float null,
	csl_before_overaward float null,
	psl_before_overaward float null,
	csl_recovered_overaward float null,
	psl_recovered_overaward float null,
	csl_auth_ft nvarchar(1) null,
	csl_auth_pt nvarchar(1) null,
	csl_auth_loan_amnt float null,
	csl_auth_loan_date DATE null,
	psl_auth_loan_amnt float null,
	psl_auth_loan_date DATE null,
	assistance_total float null,
	assessment_review_flg nvarchar(1) null,
	csg_doctoral_amount float null,
	csg_disability_amount float null,
	cag_perm_disability_amnt float null,
	csg_dependent_amount float null,
	csg_date DATE null,
	cms_amount float null,
	cms_date DATE null,
	prov_grant_unmet_amnt float null,
	prov_grant_amnt float null,
	prov_grant_date DATE null,
	assessment_code float null,
	version_num float null,
	app_status nvarchar(1) null,
	reassess_indicator nvarchar(1) null,
	cat_code nvarchar(1) null,
	single_ind_stat_reas nvarchar(1) null,
	social_assist_flg nvarchar(1) null,
	parent1_sin nvarchar(9) null,
	parent1_postal_code nvarchar(6) null,
	parent2_sin nvarchar(9) null,
	parent2_postal_code nvarchar(6) null,
	postal_suffix nvarchar(3) null,
	pstudy_weeks float null,
	pstudy_home_away nvarchar(1) null,
	study_home_away nvarchar(1) null,
	program_type nvarchar(1) null,
	academic_year_study float null,
	year_in_program float null,
	program_duration float null,
	early_withdrawal_ind nvarchar(1) null,
	date_left_hs DATE null,
	spouse_date_left_hs DATE null,
	pstudy_income_other float null,
	pstudy_income_employ float null,
	spouse_income_annual float null,
	spouse_pstudy_income float null,
	spouse_study_income float null,
	parent1_income_taxable float null,
	parent1_income_taxpaid float null,
	parent2_income_taxable float null,
	parent2_income_taxpaid float null,
	joint_asset_flg nvarchar(1) null,
	student_resp float null,
	parental_asset float null,
	joint_contrib_flg nvarchar(1) null,
	spouse_pstudy_contrib float null,
	student_asset_contrib float null,
	spouse_asset_contrib float null,
	parental_asset_contrib float null,
	other_resources float null,
	pstudy_cost_living float null,
	pstudy_cost_loan float null,
	pstudy_pt_cost_tuitn float null,
	study_cost_living float null,
	study_cost_books float null,
	study_cost_childcare_allw float null,
	study_cost_childcare_actl float null,
	study_cost_return_trans float null,
	study_cost_other_trans float null,
	study_cost_relocation float null,
	study_cost_other float null,
	study_cost_total float null,
	aboriginal_cat nvarchar(1) null,
	stud_gross_annual_income numeric(10, 2) null,
	spouse_gross_annual_income numeric(10, 2) null,
	csg_li numeric(10, 2) null,
	csg_mi numeric(10, 2) null,
	csg_pd numeric(10, 2) null,
	csg_ftdep numeric(10, 2) null,
	csg_pdse numeric(10, 2) null,
	transition_grant_amt numeric(10, 2) null,
	tgrant_yrs_remaining numeric(10, 2) null,
	pstudy_dep_cost_living numeric(10, 2) null,
	previous_disbursement numeric(10, 2) null,
	study_income_gov_grant float null,
	pstudy_x_trans_total float null,
	study_directed_income float null,
	financial_investments float null,
	married_adjustment float null,
	study_cost_computers float null
)

create table sfa.disbursement(
	id int identity primary key,
	disbursement_type_id int null references sfa.disbursement_type,
	assessment_id int null references sfa.assessment,
	funding_request_id INT NOT NULL REFERENCES sfa.funding_request,
	disbursed_amount numeric(10, 2) null,
	due_date DATE null,
	tax_year int null,
	issue_date DATE null,
	paid_amount numeric(10, 2) null,
	change_reason_id int NULL REFERENCES sfa.change_reason,
	financial_batch_id INT null,
	financial_batch_id_year INT null,
	financial_batch_run_date DATE null,
	financial_batch_serial_no float null,
	transaction_number varchar(20) null,
	csl_cert_seq_number INT null,
	ecert_sent_date DATE null,
	ecert_response_date DATE null,
	ecert_status varchar(20) null,
	ecert_portal_status_id INT null
)

CREATE TABLE sfa.entitlement_error (
	id INT IDENTITY PRIMARY KEY,
	disbursement_id INT NOT NULL REFERENCES sfa.disbursement,
	entitlement_error_code_id INT NOT NULL REFERENCES sfa.entitlement_error_codes,
	is_resend BIT NOT NULL DEFAULT 0
)
