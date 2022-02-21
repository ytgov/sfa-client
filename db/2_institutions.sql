-- this is the schema for the new data models
IF NOT EXISTS ( SELECT  *
                FROM    sys.schemas
                WHERE   name = N'sfa' )
    EXEC('CREATE SCHEMA [sfa]');
GO

--create the tables

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

SET IDENTITY_INSERT sfa.institution_level ON
INSERT INTO sfa.institution_level (id, description, is_active)
SELECT institution_level_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END FROM sfaadmin.institution_level
SET IDENTITY_INSERT sfa.institution_level OFF

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



SET IDENTITY_INSERT sfa.institution ON

INSERT INTO sfa.institution (id, name, is_active, federal_institution_code,  institution_level_id)
select distinct new_id as id, institution as name,  0 as is_active,'ZZZZ' as federal_institution_code,  2
from inst_camp

SET IDENTITY_INSERT sfa.institution OFF


SET IDENTITY_INSERT sfa.institution_campus ON

INSERT INTO sfa.institution_campus (id, institution_id, name, federal_institution_code, is_active, is_primary)
select distinct institution_id, new_id,  COALESCE(campus, 'Primary'), institution_code, 0,0
from inst_camp

SET IDENTITY_INSERT sfa.institution_campus OFF


UPDATE sfa.institution_campus
set is_active = t.act, federal_institution_code = t.INSTITUTION_CODE, care_of = t.care_of, 
address_line_1 = t.address, address_city_id = t.city_id, address_province_id = t.PROVINCE_ID, address_country_id = t.COUNTRY_ID,
address_postal_code = t.POSTAL_CODE, email_address = t.CONTACT_EMAIL
FROM(select INSTITUTION_ID, INSTITUTION_CODE, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END act, CARE_OF, 
address, CITY_ID, PROVINCE_ID, COUNTRY_ID, POSTAL_CODE, CONTACT_EMAIL
from SFAADMIN.INSTITUTION) t
WHERE t.INSTITUTION_ID = institution_campus.id


UPDATE sfa.institution
SET institution_level_id = lev
FROM 
(select c.institution_id parent, MAX(i.INSTITUTION_LEVEL_ID) lev
 from SFAADMIN.INSTITUTION i
 INNER JOIN sfa.institution_campus c on (i.INSTITUTION_ID = c.id)
 GROUP BY c.institution_id) t
 WHERE institution.id = t.parent
  AND lev is not null

UPDATE sfa.institution
SET is_active = act
FROM (select institution_id, MAX(CONVERT(int,is_active)) act from sfa.institution_campus 
group by institution_id) t
where institution.id = t.institution_id



UPDATE sfa.institution
SET federal_institution_code  = j.federal_institution_code
FROM (select id, institution_campus.institution_id, federal_institution_code from sfa.institution_campus
INNER JOIN (
select institution_id,  count(federal_institution_code) cnt from sfa.institution_campus 
where federal_institution_code is not null
group by institution_id
having count(federal_institution_code) =1
) t ON institution_campus.institution_id = t.institution_id and institution_campus.federal_institution_code is not null) j
WHERE institution.id = j.institution_id

UPDATE sfa.institution
SET federal_institution_code  = null
WHERE federal_institution_code  = 'ZZZZ'
