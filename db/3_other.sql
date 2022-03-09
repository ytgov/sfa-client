
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




select * from sfa.child_care_ceiling
select * from sfaadmin.child_care_ceiling