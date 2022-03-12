-- this is the schema for the new data models
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

SET IDENTITY_INSERT sfa.country ON 
INSERT INTO sfa.country (id, description, created_by, created_date, last_modified_by, last_modified_date, is_active)
SELECT country_id, trim(description), trim(created_by), created_date, updated_by, updated_date, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.country
SET IDENTITY_INSERT sfa.country OFF

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

SET IDENTITY_INSERT sfa.province ON 
INSERT INTO sfa.province (id, description, created_by, created_date, last_modified_by, last_modified_date, is_active)
SELECT province_id, trim(description), trim(created_by), created_date, updated_by, updated_date, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.province
SET IDENTITY_INSERT sfa.province OFF

-- CITY
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

SET IDENTITY_INSERT sfa.city ON 
INSERT INTO sfa.city (id, description, created_by, created_date, last_modified_by, last_modified_date, is_active)
SELECT city_id, trim(description), trim(created_by), created_date, updated_by, updated_date, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.city
SET IDENTITY_INSERT sfa.city OFF


CREATE TABLE sfa.academic_year (
	id INT IDENTITY(1965,1) PRIMARY KEY,
	[year] NVARCHAR(4) NOT NULL UNIQUE,
	status NVARCHAR(50) NOT NULL DEFAULT 'Open'
)

INSERT INTO sfa.academic_year ([year], status) VALUES ('1965', 'Closed'),('1966', 'Closed'),('1967', 'Closed'),('1968', 'Closed'),('1969', 'Closed')
INSERT INTO sfa.academic_year (year, status) VALUES ('1970', 'Closed'),('1971', 'Closed'),('1972', 'Closed'),('1973', 'Closed'),('1974', 'Closed')
INSERT INTO sfa.academic_year (year, status) VALUES ('1975', 'Closed'),('1976', 'Closed'),('1977', 'Closed'),('1978', 'Closed'),('1979', 'Closed')
INSERT INTO sfa.academic_year (year, status) VALUES ('1980', 'Closed'),('1981', 'Closed'),('1982', 'Closed'),('1983', 'Closed'),('1984', 'Closed')
INSERT INTO sfa.academic_year (year, status) VALUES ('1985', 'Closed'),('1986', 'Closed'),('1987', 'Closed'),('1988', 'Closed'),('1989', 'Closed')
INSERT INTO sfa.academic_year (year, status) VALUES ('1990', 'Closed'),('1991', 'Closed'),('1992', 'Closed'),('1993', 'Closed'),('1994', 'Closed')
INSERT INTO sfa.academic_year (year, status) VALUES ('1995', 'Closed'),('1996', 'Closed'),('1997', 'Closed'),('1998', 'Closed'),('1999', 'Closed')
INSERT INTO sfa.academic_year (year, status) VALUES ('2000', 'Closed'),('2001', 'Closed'),('2002', 'Closed'),('2003', 'Closed'),('2004', 'Closed')
INSERT INTO sfa.academic_year (year, status) VALUES ('2005', 'Closed'),('2006', 'Closed'),('2007', 'Closed'),('2008', 'Closed'),('2009', 'Closed')
INSERT INTO sfa.academic_year (year, status) VALUES ('2010', 'Closed'),('2011', 'Closed'),('2012', 'Closed'),('2013', 'Closed'),('2014', 'Closed')
INSERT INTO sfa.academic_year (year, status) VALUES ('2015', 'Closed'),('2016', 'Closed'),('2017', 'Closed'),('2018', 'Closed'),('2019', 'Closed')
INSERT INTO sfa.academic_year (year, status) VALUES ('2020', 'Closed'),('2021', 'Open'),('2022', 'Open')

UPDATE sfa.academic_year SET status = 'Archived' WHERE id < 1990

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

UPDATE sfaadmin.officer SET FIRST_NAME = 'Shawn1' WHERE officer_id = 50

SET IDENTITY_INSERT sfa.[user] ON

INSERT INTO sfa.[user] (id, first_name, last_name, position, create_date, phone, phone_tollfree, email_public, fax, is_active, email)
SELECT DISTINCT OFFICER_ID, FIRST_NAME, LAST_NAME, POSITION, CREATED_DATE, PHONE, TOLLFREE, COALESCE(EMAIL, 'sfa@gov.yk.ca'), FAX, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END, FIRST_NAME + '.'  + LAST_NAME + '@yukon.ca'
FROM sfaadmin.officer

SET IDENTITY_INSERT sfa.[user] OFF

-- SFAADMIN.SEX
CREATE TABLE sfa.sex (
	id INT IDENTITY(1,1) PRIMARY KEY,
	description NVARCHAR(50) NOT NULL UNIQUE,
	is_active BIT NOT NULL DEFAULT 1
)

SET IDENTITY_INSERT sfa.sex ON
INSERT INTO sfa.sex (id, description) VALUES (1, 'Male'), (2, 'Female'), (0, 'Prefer Not to Say'), (-1, 'Unknown')
SET IDENTITY_INSERT sfa.sex OFF

UPDATE SFAADMIN.STUDENT SET SEX = -1 where SEX IS NULL

create table sfa.indigenous_learner (
	id int identity primary key,
	description nvarchar(50) not null unique,
	is_active bit not null default 0
)

SET IDENTITY_INSERT sfa.indigenous_learner ON
INSERT INTO sfa.indigenous_learner (id,description) VALUES (-1, 'Unknown'), (1, 'Yes'), (2, 'No'), (3, 'Prefer Not to Say')
SET IDENTITY_INSERT sfa.indigenous_learner OFF

UPDATE SFAADMIN.STUDENT_CONSENT SET ACADEMIC_YEAR_END = 2021 WHERE ACADEMIC_YEAR_END = 20201



CREATE TABLE sfa.address_type (
    id INT IDENTITY(1,1) PRIMARY KEY,
    description NVARCHAR(100) NOT NULL UNIQUE,
    is_active BIT NOT NULL DEFAULT 1
)
SET IDENTITY INSERT sfa.address_type ON 
INSERT INTO sfa.address_type (id, description) VALUES (1, 'Home'), (2, 'Mailing'), (3, 'School')
SET IDENTITY INSERT sfa.address_type OFF


CREATE TABLE person_address (
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



CREATE TABLE person (
    id INT IDENTITY(1,1) PRIMARY KEY,
    first_name NVARCHAR(100) NULL,
    last_name NVARCHAR(100) NULL,
	initials nvarchar(20) null,
	previous_last_name nvarchar(100) null,
    sin NVARCHAR(15) NULL,
    citizenship_code INT NULL,

	birth_date date null,
	birth_city_id int null references sfa.city (id),
	birth_province_id int null references sfa.province(id),
	birth_country_id int null references sfa.country(id),

	language_id int null references sfa.language (id),
	sex_id int null references sfa.sex(id),

    home_address_id INT NULL REFERENCES sfa.address,
    mailing_address_id INT NULL REFERENCES sfa.address,

	telephone nvarchar(24) null,
    email NVARCHAR(100) NULL
)



CREATE TABLE parent (
    id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL REFERENCES sfa.student,
    relationship_id INT NOT NULL REFERENCES sfa.relationship
   

)

[PARENT1_NET_INCOME] [numeric](8, 2) NULL,
[PARENT1_INCOME] [numeric](8, 2) NULL,
[PARENT1_TAX_PAID] [numeric](8, 2) NULL,
