

SET IDENTITY_INSERT sfa.country ON 
INSERT INTO sfa.country (id, description, created_by, created_date, last_modified_by, last_modified_date, is_active)
SELECT country_id, trim(description), trim(created_by), created_date, updated_by, updated_date, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.country
SET IDENTITY_INSERT sfa.country OFF


SET IDENTITY_INSERT sfa.province ON 
INSERT INTO sfa.province (id, description, created_by, created_date, last_modified_by, last_modified_date, is_active)
SELECT province_id, trim(description), trim(created_by), created_date, updated_by, updated_date, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.province
SET IDENTITY_INSERT sfa.province OFF

SET IDENTITY_INSERT sfa.city ON 
INSERT INTO sfa.city (id, description, created_by, created_date, last_modified_by, last_modified_date, is_active)
SELECT city_id, trim(description), trim(created_by), created_date, updated_by, updated_date, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.city
SET IDENTITY_INSERT sfa.city OFF



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


/*
UPDATE sfaadmin.officer SET FIRST_NAME = 'Shawn1' WHERE officer_id = 50

SET IDENTITY_INSERT sfa.[user] ON

INSERT INTO sfa.[user] (id, first_name, last_name, position, create_date, phone, phone_tollfree, email_public, fax, is_active, email)
SELECT DISTINCT OFFICER_ID, FIRST_NAME, LAST_NAME, POSITION, CREATED_DATE, PHONE, TOLLFREE, COALESCE(EMAIL, 'sfa@gov.yk.ca'), FAX, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END, FIRST_NAME + '.'  + LAST_NAME + '@yukon.ca'
FROM sfaadmin.officer

SET IDENTITY_INSERT sfa.[user] OFF
*/


SET IDENTITY_INSERT sfa.sex ON
INSERT INTO sfa.sex (id, description) VALUES (1, 'Male'), (2, 'Female'), (0, 'Prefer Not to Say'), (-1, 'Unknown')
SET IDENTITY_INSERT sfa.sex OFF

UPDATE SFAADMIN.STUDENT SET SEX = -1 where SEX IS NULL

SET IDENTITY_INSERT sfa.indigenous_learner ON
INSERT INTO sfa.indigenous_learner (id,description) VALUES (-1, 'Unknown'), (1, 'Yes'), (2, 'No'), (3, 'Prefer Not to Say')
SET IDENTITY_INSERT sfa.indigenous_learner OFF

UPDATE SFAADMIN.STUDENT_CONSENT SET ACADEMIC_YEAR_END = 2021 WHERE ACADEMIC_YEAR_END = 20201

SET IDENTITY_INSERT sfa.institution_level ON
INSERT INTO sfa.institution_level (id, description, is_active)
SELECT institution_level_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END FROM sfaadmin.institution_level
SET IDENTITY_INSERT sfa.institution_level OFF

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






-- SFAADMIN.ABORIGINAL_STATUS
SET IDENTITY_INSERT sfa.aboriginal_status ON

INSERT INTO sfa.aboriginal_status (id, description, is_active, nars_status_id, sort_order)
SELECT aboriginal_status_id, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END, NARS_STATUS_ID, COALESCE(SORT_ORDER, 99)
FROM SFAADMIN.ABORIGINAL_STATUS

SET IDENTITY_INSERT sfa.aboriginal_status OFF

-- SFAADMIN.AGE_DISTRIBUTION
SET IDENTITY_INSERT sfa.age_distribution ON

INSERT INTO sfa.age_distribution (id, start_age, end_age)
SELECT AGE_DISTRIBUTION_ID, START_AGE, END_AGE
FROM SFAADMIN.AGE_DISTRIBUTION

SET IDENTITY_INSERT sfa.age_distribution OFF

-- SFAADMIN.AGENCY
SET IDENTITY_INSERT sfa.agency ON

INSERT INTO sfa.agency (id, description, is_active)
SELECT AGENCY_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.agency

SET IDENTITY_INSERT sfa.agency OFF

-- SFAADMIN.APPLICATION_TYPE
SET IDENTITY_INSERT sfa.application_type ON

INSERT INTO sfa.application_type (id, description, is_active)
SELECT APPLICATION_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.application_type

SET IDENTITY_INSERT sfa.application_type OFF

-- SFAADMIN.ASSESSMENT_TYPE
SET IDENTITY_INSERT sfa.assessment_type ON

INSERT INTO sfa.assessment_type (id, description, is_active)
SELECT ASSESSMENT_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.assessment_type

SET IDENTITY_INSERT sfa.assessment_type OFF

-- SFAADMIN.BATCH_GROUP
SET IDENTITY_INSERT sfa.batch_group ON

INSERT INTO sfa.batch_group (id, description, prefix, is_active)
SELECT BATCH_GROUP_ID, DESCRIPTION, BATCH_GROUP_PREFIX, 1
FROM SFAADMIN.batch_group

SET IDENTITY_INSERT sfa.batch_group OFF

-- SFAADMIN.BATCH_PARAMETER
SET IDENTITY_INSERT sfa.batch_parameter ON

INSERT INTO sfa.batch_parameter (id, description, user_description, is_active)
SELECT BATCH_PARAMETER_ID, DESCRIPTION, USER_DESCRIPTION, 1
FROM SFAADMIN.batch_parameter

SET IDENTITY_INSERT sfa.batch_parameter OFF

-- SFAADMIN.CATEGORY
SET IDENTITY_INSERT sfa.category ON

INSERT INTO sfa.category (id, description, is_active)
SELECT CATEGORY_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.category

SET IDENTITY_INSERT sfa.category OFF

-- SFAADMIN.CHANGE_REASON
SET IDENTITY_INSERT sfa.change_reason ON

INSERT INTO sfa.change_reason (id, description, is_active)
SELECT CHANGE_REASON_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.change_reason

SET IDENTITY_INSERT sfa.change_reason OFF

-- SFAADMIN.CHILD_CARE_CEILING
INSERT INTO sfa.child_care_ceiling (academic_year_id, province_id, max_amount)
SELECT academic_year.id, PROVINCE_ID, MAX_AMT
FROM SFAADMIN.child_care_ceiling
 INNER JOIN sfa.academic_year ON (CHILD_CARE_CEILING.ACADEMIC_YEAR = academic_year.id)
 
-- SFAADMIN.COMUNICATION_TYPE
SET IDENTITY_INSERT sfa.communication_type ON

INSERT INTO sfa.communication_type (id, description, is_active)
SELECT COMMUNICATION_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.communication_type

SET IDENTITY_INSERT sfa.communication_type OFF

-- SFAADMIN.CSG_LOOKUP
INSERT INTO sfa.csg_lookup (academic_year_id,csg_8_month_amount,csg_dep_monthly_amount,csg_pd_yearly_amount,csg_pdse_yearly_amount,csgpt_yearly_amount,csgpt_dep_max_amount,csgpt_dep_1_2_weekly_amount,csgpt_dep_3_weekly_amount)
SELECT academic_year, CSG_8_MONTH_AMT, CSG_DEP_MONTHLY_AMT, CSG_PD_YEARLY_AMT, CSG_PDSE_YEARLY_AMT, CSGPT_YEARLY_AMT, CSGPT_DEP_MAX_AMT, CSGPT_DEP_1_2_WEEKLY_AMT, CSGPT_DEP_3_WEEKLY_AMT
FROM SFAADMIN.csg_lookup

-- SFAADMIN.CSG_THRESHOLD
INSERT INTO sfa.csg_threshold (academic_year_id, family_size, income_threshold, income_cutoff, phase_out_rate, low_income_threshold, middle_income_threshold, csgpt_phase_out_rate, csgpt_dep2_phase_out_rate , csgpt_dep3_phase_out_rate, csgft_dep_phase_out_rate)
SELECT academic_year, FAMILY_SIZE , INCOME_THRESHOLD, INCOME_CUTOFF, PHASE_OUT_RATE, LOW_INCOME_THRESHOLD, MIDDLE_INCOME_THRESHOLD, CSGPT_PHASE_OUT_RATE, CSG_PTDEP2_PHASE_OUT_RATE, CSG_PTDEP3_PHASE_OUT_RATE, CSG_FTDEP_PHASE_OUT_RATE
FROM SFAADMIN.csg_threshold

-- SFAADMIN.CSL_CODE
SET IDENTITY_INSERT sfa.csl_code ON

INSERT INTO sfa.csl_code (id, warning_code, reason_code, code_type, definition, is_active)
SELECT CSL_CODE_ID, WARNING_CODE, REASON_CODE, CODE_TYPE, DEFINITION, CASE WHEN IS_ACTIVE_FLG = 'Yes' THEN 1 ELSE 0 END
FROM SFAADMIN.csl_code

SET IDENTITY_INSERT sfa.csl_code OFF

-- SFAADMIN.CSL_LOOKUP
INSERT INTO sfa.csl_lookup (academic_year_id,return_transport_max_amount,allowable_weekly_amount,student_exempt_amount,vehicle_deduction_amount,rrsp_deduction_yearly_amount,relocation_max_amount,mileage_rate,discretionary_costs_max_amount,merit_exempt_amount,books_max_amount,student_contrib_percent,spouse_contrib_percent,csg_8_month_amount,csg_pt_yearly_amount,low_income_student_contrib_amount,student_contrib_max_amount,csl_pt_max_amount,csl_pt_wk_misc_amount)
SELECT [ACADEMIC_YEAR],[MAX_RETURN_TRANSPORT],[MAX_WEEKLY_ALLOWABLE],[STUDENT_EXEMPT_AMT],[VEHICLE_DEDUCTION],[RRSP_YEARLY_DEDUCTION],[MAX_RELOCATION],[MILEAGE_RATE],[DISCRETIONARY_COSTS_MAX],[MERIT_EXEMPT_AMT],[MAX_BOOKS],[STUDENT_CONTRIB_PCT],[SPOUSE_CONTRIB_PCT],[CSG_8_MONTH_AMT],[CSG_PT_YEARLY_AMT],[LOW_INCOME_STUDENT_CONTRIB],[MAX_STUDENT_CONTRIB],[CSL_PT_MAX_AMOUNT],[CSL_PT_WK_MISC_AMT]
FROM SFAADMIN.csl_lookup

-- SFAADMIN.CSL_NSLSC_ADDRESS
SET IDENTITY_INSERT sfa.csl_nslsc_address ON

INSERT INTO sfa.csl_nslsc_address (id, institution_type,name,address_line_1,address_line_2,city_id,province_id,postal_code,phone_number,effective_date,expiry_date)
SELECT [CSL_NSLSC_ADDRESS_ID], CASE WHEN [INSTITUTION_TYPE_ID] = 1 THEN 'Public' ELSE 'Private' END,[NAME],[ADDRESS_LINE_1],[ADDRESS_LINE_2],[CITY_ID],[PROVINCE_ID],[POSTAL_CODE],[PHONE_NUMBER],[EFFECTIVE_DATE],[EXPIRY_DATE]
FROM SFAADMIN.csl_nslsc_address

SET IDENTITY_INSERT sfa.csl_nslsc_address OFF

-- SFAADMIN.CSL_REASON
SET IDENTITY_INSERT sfa.csl_reason ON

INSERT INTO sfa.csl_reason (id, type, name, description)
SELECT CSL_REASON_ID, CSL_REASON_TYPE, CSL_REASON_NAME, CSL_REASON
FROM SFAADMIN.csl_reason

SET IDENTITY_INSERT sfa.csl_reason OFF

-- SFAADMIN.CSL_RESTRICTED
SET IDENTITY_INSERT sfa.csl_restricted ON

INSERT INTO sfa.csl_restricted (id,amount_disbursed,birth_date,first_name,last_name,over_award,restriction_reason_id,restriction_warn_id,weeks_accumulated,nslsc_restrict1,nslsc_restrict2,nslsc_restrict3,calsc_restrict1,calsc_restrict2,calsc_restrict3,fi_restrict1)
SELECT CSL_RESTRICTED_ID, [AMOUNT_DISBURSED],[BIRTH_DATE],[FIRST_NAME],[LAST_NAME],[OVER_AWARD],[RESTRICTION_REASON_ID],[RESTRICTION_WARN_ID],[WEEKS_ACCUMULATED],[NSLSC_RESTRICT1],[NSLSC_RESTRICT2],[NSLSC_RESTRICT3],[CALSC_RESTRICT1],[CALSC_RESTRICT2],[CALSC_RESTRICT3],[FI_RESTRICT1]
FROM SFAADMIN.csl_restricted

SET IDENTITY_INSERT sfa.csl_restricted OFF

-- SFAADMIN.DISAB_SERVICE_TYPE
SET IDENTITY_INSERT sfa.disability_service ON

INSERT INTO sfa.disability_service (id,description, is_active)
SELECT DISAB_SERVICE_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.DISAB_SERVICE_TYPE

SET IDENTITY_INSERT sfa.disability_service OFF

-- SFAADMIN.DISABILITY_TYPE
SET IDENTITY_INSERT sfa.disability_type ON

INSERT INTO sfa.disability_type (id,description, csl_code, is_active)
SELECT DISABILITY_TYPE_ID, DESCRIPTION, CSL_CODE, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.disability_type

SET IDENTITY_INSERT sfa.disability_type OFF

-- SFAADMIN.DISBURSEMENT_TYPE
SET IDENTITY_INSERT sfa.disbursement_type ON

INSERT INTO sfa.disbursement_type (id,description, is_active)
SELECT DISBURSEMENT_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.disbursement_type

SET IDENTITY_INSERT sfa.disbursement_type OFF

-- SFAADMIN.EDUCATION_LEVEL
SET IDENTITY_INSERT sfa.education_level ON

INSERT INTO sfa.education_level (id,description, rank, is_active)
SELECT EDUCATION_LEVEL_ID, DESCRIPTION, RANK, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.education_level

SET IDENTITY_INSERT sfa.education_level OFF

-- SFAADMIN.ENTITLEMENT_ERROR_CODES
INSERT INTO sfa.entitlement_error_codes ( code, description, is_confirmed, is_in_feedback, is_resend)
SELECT ERROR_CODE, ERROR_DESC, CASE WHEN CONFIRMED_UNCONFIRMED = 'C' THEN 1 ELSE 0 END, CASE WHEN IS_IN_FEEDBACK_FLG = 'Yes' THEN 1 ELSE 0 END,CASE WHEN IS_RESEND_FLG = 'Yes' THEN 1 ELSE 0 END
FROM SFAADMIN.entitlement_error_codes

-- SFAADMIN.FIRST_NATION
SET IDENTITY_INSERT sfa.first_nation ON

INSERT INTO sfa.first_nation ( id, description, city_id, is_active)
SELECT FIRST_NATION_ID, FIRST_NATION_DESC, CITY_ID, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.first_nation

SET IDENTITY_INSERT sfa.first_nation OFF

-- SFAADMIN.FUNDING_GROUP
SET IDENTITY_INSERT sfa.funding_group ON

INSERT INTO sfa.funding_group ( id, description, sort_order, is_active)
SELECT FUNDING_GROUP_ID, DESCRIPTION, SORT_ORDER, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.funding_group

SET IDENTITY_INSERT sfa.funding_group OFF

-- SFAADMIN.HIGH_SCHOOL
SET IDENTITY_INSERT sfa.high_school ON

INSERT INTO sfa.high_school ( id, name, city_id, province_id, country_id, is_active)
SELECT HIGH_SCHOOL_ID, NAME, CITY_ID, PROVINCE_ID, COUNTRY_ID, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.high_school

SET IDENTITY_INSERT sfa.high_school OFF

-- SFAADMIN.INFO_CATEGORY
SET IDENTITY_INSERT sfa.info_category ON

INSERT INTO sfa.info_category ( id, canvas_name, category_name, sort_order, first_item, is_active)
SELECT INFO_CATEGORY_ID, CANVAS_NAME, CATEGORY_NAME, SORT_ORDER, FIRST_ITEM, 1
FROM SFAADMIN.info_category

SET IDENTITY_INSERT sfa.info_category OFF

-- SFAADMIN.INSTRUCTION_TYPE
SET IDENTITY_INSERT sfa.instruction_type ON

INSERT INTO sfa.instruction_type ( id, description, is_active)
SELECT INSTRUCTION_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.instruction_type

SET IDENTITY_INSERT sfa.instruction_type OFF

-- SFAADMIN.INVESTMENT_TYPE
SET IDENTITY_INSERT sfa.investment_type ON

INSERT INTO sfa.investment_type ( id, description, is_active)
SELECT INVESTMENT_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.investment_type

SET IDENTITY_INSERT sfa.investment_type OFF

-- SFAADMIN.LANGUAGE
SET IDENTITY_INSERT sfa.language ON

INSERT INTO sfa.language ( id, description, is_active)
SELECT LANGUAGE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.language

SET IDENTITY_INSERT sfa.language OFF

-- SFAADMIN.MARITAL_STATUS
SET IDENTITY_INSERT sfa.marital_status ON

INSERT INTO sfa.marital_status ( id, description, is_active)
SELECT MARITAL_STATUS_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.marital_status

SET IDENTITY_INSERT sfa.marital_status OFF

-- SFAADMIN.OWNERSHIP
SET IDENTITY_INSERT sfa.ownership ON

INSERT INTO sfa.ownership ( id, description, is_active)
SELECT OWNERSHIP_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.ownership

SET IDENTITY_INSERT sfa.ownership OFF

-- SFAADMIN.PARENT_CONTRIBUTION_FORMULA
INSERT INTO sfa.parent_contribution_formula ( academic_year_id, income_from_amount, income_to_amount, add_amount, percentage, subtract_amount, divide_by)
SELECT ACADEMIC_YEAR, D_INCOME_FROM, D_INCOME_TO, ADD_AMT, [PERCENT], SUBTRACT_AMT, DIVIDE_BY
FROM SFAADMIN.parent_contribution_formula

-- SFAADMIN.PART_TIME_REASON
SET IDENTITY_INSERT sfa.part_time_reason ON

INSERT INTO sfa.part_time_reason ( id, description, is_active)
SELECT PART_TIME_REASON_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.part_time_reason

SET IDENTITY_INSERT sfa.part_time_reason OFF

-- SFAADMIN.PERIOD
SET IDENTITY_INSERT sfa.period ON

INSERT INTO sfa.period ( id, description, is_active)
SELECT PERIOD_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.period

SET IDENTITY_INSERT sfa.period OFF

-- SFAADMIN.PORTAL_STATUS
SET IDENTITY_INSERT sfa.portal_status ON

INSERT INTO sfa.portal_status ( id, description, is_active)
SELECT PORTAL_STATUS_ID, STATUS_DESC, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.portal_status

SET IDENTITY_INSERT sfa.portal_status OFF

-- SFAADMIN.PRESTUDY_EMPLOY_STATUS
SET IDENTITY_INSERT sfa.prestudy_employment_status ON

INSERT INTO sfa.prestudy_employment_status ( id, description, is_active)
SELECT PRESTUDY_EMPLOY_STATUS_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.PRESTUDY_EMPLOY_STATUS 

SET IDENTITY_INSERT sfa.prestudy_employment_status OFF

-- SFAADMIN.PRESTUDY_TAX_RATE
INSERT INTO sfa.prestudy_tax_rate ( academic_year_id, from_income_amount, to_income_amount, prestudy_tax_rate)
SELECT ACADEMIC_YEAR, INCOME_FROM, INCOME_TO, PRESTUDY_TAX_RATE
FROM SFAADMIN.prestudy_tax_rate 

-- SFAADMIN.PROGRAM
SET IDENTITY_INSERT sfa.program ON

INSERT INTO sfa.program ( id, description, education_level_id, is_active)
SELECT PROGRAM_ID, DESCRIPTION,EDUCATION_LEVEL, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.program 

SET IDENTITY_INSERT sfa.program OFF

-- SFAADMIN.RELATIONSHIP
SET IDENTITY_INSERT sfa.relationship ON

INSERT INTO sfa.relationship ( id, description, is_active)
SELECT RELATIONSHIP_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.relationship 

SET IDENTITY_INSERT sfa.relationship OFF

-- SFAADMIN.REPORT_EXPENSE_CATEGORY
SET IDENTITY_INSERT sfa.report_expense_category ON

INSERT INTO sfa.report_expense_category ( id, description, is_active)
SELECT REPORT_EXPENSE_CATEGORY_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.report_expense_category 

SET IDENTITY_INSERT sfa.report_expense_category OFF

-- SFAADMIN.REQUIREMENT_TYPE
SET IDENTITY_INSERT sfa.requirement_type ON

INSERT INTO sfa.requirement_type ( id, description, is_active, document_location, show_online)
SELECT REQUIREMENT_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END, DOCUMENT_LOCATION, CASE WHEN SHOW_ONLINE = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.requirement_type 

SET IDENTITY_INSERT sfa.requirement_type OFF

-- SFAADMIN.SFA_DOCUMENT_LINK
SET IDENTITY_INSERT sfa.sfa_document_link ON

INSERT INTO sfa.sfa_document_link ( id, description, is_active, document_location, sort_order)
SELECT SFA_DOCUMENT_LINK_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END, DOCUMENT_LOCATION, SORT_ORDER
FROM SFAADMIN.sfa_document_link 
WHERE IS_ACTIVE_FLG = 'Y'

SET IDENTITY_INSERT sfa.sfa_document_link OFF

-- SFAADMIN.SPOUSE_TAX_RATE
INSERT INTO sfa.spouse_tax_rate (academic_year_id, province_id, from_income_amount, to_income_amount, tax_rate)
SELECT ACADEMIC_YEAR, PROVINCE_ID, INCOME_FROM, INCOME_TO, SPOUSE_TAX_RATE
FROM SFAADMIN.spouse_tax_rate 

-- SFAADMIN.STA_LOOKUP
INSERT INTO sfa.sta_lookup (academic_year_id, dependent_0_amount, dependent_1_amount, dependent_2_amount, dependent_3_amount, dependent_4_amount, second_residence_amount)
SELECT ACADEMIC_YEAR, DEPENDENT_ZERO, DEPENDENT_ONE, DEPENDENT_TWO, DEPENDENT_THREE, DEPENDENT_FOUR, SECOND_RESIDENCE
FROM SFAADMIN.sta_lookup 

-- SFAADMIN.STANDARD_OF_LIVING
INSERT INTO sfa.standard_of_living (academic_year_id, province_id, family_size, standard_living_amount)
SELECT ACADEMIC_YEAR, PROVINCE_ID, FAMILY_SIZE, STANDARD_LIVING_AMT
FROM SFAADMIN.standard_of_living
ORDER BY 1,2,3

-- SFAADMIN.STATUS
SET IDENTITY_INSERT sfa.status ON

INSERT INTO sfa.status (id, description, is_active, sort_order, online_description)
SELECT STATUS_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END, SORT, ONLINE_DESCRIPTION
FROM SFAADMIN.status

SET IDENTITY_INSERT sfa.status OFF

-- SFAADMIN.STATUS_REASON
SET IDENTITY_INSERT sfa.status_reason ON

INSERT INTO sfa.status_reason (id, status_id, description, is_active)
SELECT STATUS_REASON_ID, STATUS_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.status_reason

SET IDENTITY_INSERT sfa.status_reason OFF

-- SFAADMIN.STUDENT_CATEGORY
INSERT INTO sfa.student_category ( code, description, is_active)
SELECT STUDENT_CATEGORY_CODE, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.student_category

-- SFAADMIN.STUDENT_CONTRIBUTION
INSERT INTO sfa.student_contribution ( academic_year_id,province_id, period_id, student_category_id, contribution_amount)
SELECT ACADEMIC_YEAR,  PROVINCE_ID,PERIOD_ID, student_category.id, CONTRIBUTION_AMOUNT
FROM SFAADMIN.student_contribution
INNER JOIN sfa.student_category on STUDENT_CONTRIBUTION.STUDENT_CATEGORY_CODE = student_category.code

-- SFAADMIN.STUDENT_LIVING_ALLOWANCE
INSERT INTO sfa.student_living_allowance ( academic_year_id,province_id, student_category_id, shelter_amount, food_amount, misc_amount, public_tranport_amount)
SELECT ACADEMIC_YEAR,  PROVINCE_ID, student_category.id, SHELTER_AMOUNT, FOOD_AMOUNT, MISC_AMOUNT, PUBLIC_TRANS_AMOUNT
FROM SFAADMIN.student_living_allowance
INNER JOIN sfa.student_category on student_living_allowance.STUDENT_CATEGORY_CODE = student_category.code

-- SFAADMIN.STUDY_FIELD
SET IDENTITY_INSERT sfa.study_field ON

INSERT INTO sfa.study_field ( id, description, is_active)
SELECT STUDY_FIELD_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.study_field 

SET IDENTITY_INSERT sfa.study_field OFF

-- SFAADMIN.STUDY_AREA
SET IDENTITY_INSERT sfa.study_area ON

INSERT INTO sfa.study_area ( id, study_field_id, description, show_online, is_active)
SELECT  STUDY_AREA_ID, STUDY_FIELD_ID, DESCRIPTION, CASE WHEN SHOW_ONLINE = 'Y' THEN 1 ELSE 0 END, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.study_area 

SET IDENTITY_INSERT sfa.study_area OFF

-- SFAADMIN.STUDY_TAX_RATE
INSERT INTO sfa.study_tax_rate ( academic_year_id, from_income_amount, to_income_amount, study_tax_rate)
SELECT ACADEMIC_YEAR, INCOME_FROM, INCOME_TO, STUDY_TAX_RATE
FROM SFAADMIN.study_tax_rate 

-- SFAADMIN.SYSTEM_DEP_PARAMS
INSERT INTO sfa.system_dep_params ( dependent_count, weekly_amount)
SELECT DEPENDENT_COUNT, WEEKLY_RATE
FROM SFAADMIN.system_dep_params 

-- SFAADMIN.SYSTEM_PARAMETER
SET IDENTITY_INSERT sfa.system_parameter ON

INSERT INTO sfa.system_parameter ( id, second_residence_rate,weekly_rate,academic_start_year,csl_max_weekly_amount,minister_name,financial_batch_id_start,financial_batch_id_end,financial_batch_id_year,previous_fin_batch_id_start,previous_fin_batch_id_end,previous_fin_batch_id_year,last_online_expire_date,last_msfaa_sent_date,last_msfaa_sent_seq_num,msfaa_enclosed_approval_text,msfaa_not_encl_approval_text,monthly_board_change_date,arial_ttf_directory,letterhead_tray,yg_quarter_weeks,yg_semester_weeks,yg_approval_text,director_name_position,director_email,director_phone,environment,cslft_msfaa_text)
SELECT SYSTEM_PARAMETER_ID, second_residence_rate,weekly_rate,academic_start_year,csl_max_weekly_amount,minister_name,financial_batch_id_start,financial_batch_id_end,financial_batch_id_year,previous_fin_batch_id_start,previous_fin_batch_id_end,previous_fin_batch_id_year,last_online_expire_date,last_msfaa_sent_date,last_msfaa_sent_seq_num,msfaa_enclosed_approval_text,msfaa_not_encl_approval_text,monthly_board_change_date,arial_ttf_directory,letterhead_tray,yg_quarter_weeks,yg_semester_weeks,yg_approval_text,director_name_position,director_email,director_phone,environment,cslft_msfaa_text
FROM SFAADMIN.system_parameter 

SET IDENTITY_INSERT sfa.system_parameter OFF

-- SFAADMIN.TRANSPORTATION
SET IDENTITY_INSERT sfa.transportation ON

INSERT INTO sfa.transportation ( id, home_city_id, institution_city_id, travel_allowance_amount, airfare_amount)
SELECT TRANSPORTATION_ID, HOME_CITY_ID, INSTITUTION_CITY_ID, TRAVEL_ALLOWANCE, AIRFARE
FROM SFAADMIN.transportation 

SET IDENTITY_INSERT sfa.transportation OFF

-- SFAADMIN.VERIFICATION_LOG
SET IDENTITY_INSERT sfa.verification_log ON

INSERT INTO sfa.verification_log ( id, institution_campus_id, is_emailed, student_count)
SELECT VERIFICATION_LOG_ID, INSTITUTION_ID, CASE WHEN EMAILED_FLG = 'Yes' THEN 1 ELSE 0 END, STUDENT_COUNT
FROM SFAADMIN.verification_log 

SET IDENTITY_INSERT sfa.verification_log OFF

-- SFAADMIN.YEA
INSERT INTO sfa.yea ( first_name, last_name, birth_date, yukon_id, yukon_id_old, school_year, school_month, course, yea_amount)
SELECT FNAME, LNAME, BIRTH_DT, YTID, OLD_YTID, SCHOOLYR, SCHOOLMN, COURSE, YEA_AMNT
FROM SFAADMIN.yea 

-- SFAADMIN.YEA_UPDATE
INSERT INTO sfa.yea_update ( first_name, last_name, birth_date, yukon_id, school_year, school_month, course, yea_amount, orig_yea_amount)
SELECT FNAME, LNAME, BIRTH_DT, YTID, SCHOOLYR, SCHOOLMN, COURSE, YEA_AMNT, ORIG_YEA_AMNT
FROM SFAADMIN.yea_update 

-- SFAADMIN.YG_COST
SET IDENTITY_INSERT sfa.yg_cost ON

INSERT INTO sfa.yg_cost (id, academic_year_id, effective_date, expiry_date, semester_living_amount, semester_tuition_amount, semester_book_amount, quarter_living_amount, quarter_tuition_amount, quarter_book_amount, weekly_amount, allowed_percent)
SELECT YG_COST_ID, ACADEMIC_YEAR, EFFECTIVE_DATE, EXPIRY_DATE,SEMESTER_LIVING_AMT, SEMESTER_TUITION_AMT, SEMESTER_BOOK_AMT, QUARTER_LIVING_AMT, QUARTER_TUITION_AMT, QUARTER_BOOK_AMT, WEEKLY_AMOUNT, ALLOWED_PERCENT
FROM SFAADMIN.yg_cost 

SET IDENTITY_INSERT sfa.yg_cost OFF

-- SFA.ADDRESS_TYPE
SET IDENTITY_INSERT sfa.address_type ON 
INSERT INTO sfa.address_type (id, description) VALUES (1, 'Home'), (2, 'Mailing'), (3, 'School'), (4, 'Parent')
SET IDENTITY_INSERT sfa.address_type OFF


DECLARE 
    @STUDENT_ID float,
    @FIRST_NAME varchar(30),
    @LAST_NAME varchar(30),
    @INITIALS varchar(5),
    @VENDOR_ID varchar(25),
    @YUKON_ID varchar(15),
    @SIN float,
    @NATIONAL_ID varchar(50),
    @CSL_LETTER_DATE datetime2(0),
    @CSL_WARN_CODE varchar(1),
    @LANGUAGE_ID float,
    @BIRTH_DATE datetime2(0),
    @HOME_ADDRESS1 varchar(100),
    @HOME_ADDRESS2 varchar(100),
    @BIRTH_CITY_ID float,
    @BIRTH_COUNTRY_ID float,
    @HOME_CITY_ID float,
    @BIRTH_PROVINCE_ID float,
    @HOME_PROVINCE_ID float,
    @HOME_COUNTRY_ID float,
    @HOME_PHONE varchar(24),
    @HOME_POSTAL_CODE varchar(15),
    @HOME_EMAIL varchar(50),
    @LOCATOR_NUMBER varchar(15),
    @MAILING_ADDRESS1 varchar(100),
    @MAILING_ADDRESS2 varchar(100),
    @MAILING_CITY_ID float,
    @MAILING_PROVINCE_ID float,
    @MAILING_COUNTRY_ID float,
    @MAILING_POSTAL_CODE varchar(15),
    @PRE_FUNDED_YEAR numeric(4, 0),
    @PRE_FUNDING_YEARS_USED float,
    @SCHOOL_EMAIL varchar(50),
    @SCHOOL_PHONE varchar(24),
    @CREATED_BY varchar(30),
    @CREATED_DATE datetime2(0),
    @UPDATED_BY varchar(30),
    @UPDATED_DATE datetime2(0),
    @HIGH_SCHOOL_FINAL_GRADE varchar(15),
    @PARENT_MAILING_ADDRESS1 varchar(100),
    @ARENT_MAILING_ADDRESS2 varchar(100),
    @PARENT_MAILING_CITY_ID float,
    @PARENT_MAILING_PROVINCE_ID float,
    @PARENT_MAILING_COUNTRY_ID float,
    @PARENT_MAILING_POSTAL_CODE varchar(15),
    @PARENT_TELEPHONE varchar(24),
    @PRE_OVER_AWARD numeric(8, 2),
    @PRE_YEA_AWARDS_USED numeric(8, 2),
    @EDUCATION_LEVEL_ID float,
    @HIGH_SCHOOL_ID float,
    @HIGH_SCHOOL_LEFT_YEAR numeric(4, 0),
    @HIGH_SCHOOL_LEFT_MONTH numeric(2, 0),
    @SEX float,
    @SPOUSE_HS_END_MONTH numeric(2, 0),
    @SPOUSE_HS_END_YEAR numeric(4, 0),
    @USER_NAME varchar(100),
    @USER_PASSWORD varchar(255),
    @IS_ACTIVE_FLG varchar(1),
    @IS_FIRST_LOGON_FLG varchar(1),
    @LAST_PW_CHG_DATE datetime2(0),
    @LAST_LOGON_DATE datetime2(0),
    @PREVIOUS_LAST_NAME varchar(30),
    @YEA_EXPIRY_DATE datetime2(0),
    @ADJ_YG_FUNDING_WEEKS float,
    @ADJ_STA_UPGRADING_WEEKS float,
    @ADJ_OUTSIDE_TRAVEL_CNT float,
    @CHECKED_FOR_YTID_FLG varchar(3),
    @INDIGENOUS_LEARNER varchar(25),
    @CROWN_WARD_FLG varchar(3);

DECLARE @home_address_id INT, @mail_address_id INT, @person_id INT, @parent1_id INT, @parent2_id INT, @parent_address_id INT;


DECLARE student_cursor CURSOR FOR SELECT * FROM SFAADMIN.STUDENT
OPEN student_cursor;

FETCH NEXT FROM student_cursor INTO 
	@STUDENT_ID,
	@FIRST_NAME,
	@LAST_NAME,
	@INITIALS,
	@VENDOR_ID,
	@YUKON_ID,
	@SIN ,
	@NATIONAL_ID,
	@CSL_LETTER_DATE,
	@CSL_WARN_CODE,
	@LANGUAGE_ID,
	@BIRTH_DATE,
	@HOME_ADDRESS1,
	@HOME_ADDRESS2,
	@BIRTH_CITY_ID,
	@BIRTH_COUNTRY_ID,
	@HOME_CITY_ID,
	@BIRTH_PROVINCE_ID,
	@HOME_PROVINCE_ID,
	@HOME_COUNTRY_ID,
	@HOME_PHONE,
	@HOME_POSTAL_CODE,
	@HOME_EMAIL,
	@LOCATOR_NUMBER,
	@MAILING_ADDRESS1,
	@MAILING_ADDRESS2,
	@MAILING_CITY_ID,
	@MAILING_PROVINCE_ID,
	@MAILING_COUNTRY_ID,
	@MAILING_POSTAL_CODE,
	@PRE_FUNDED_YEAR,
	@PRE_FUNDING_YEARS_USED,
	@SCHOOL_EMAIL,
	@SCHOOL_PHONE,
	@CREATED_BY,
	@CREATED_DATE,
	@UPDATED_BY,
	@UPDATED_DATE,
	@HIGH_SCHOOL_FINAL_GRADE,
	@PARENT_MAILING_ADDRESS1,
	@ARENT_MAILING_ADDRESS2,
	@PARENT_MAILING_CITY_ID,
	@PARENT_MAILING_PROVINCE_ID,
	@PARENT_MAILING_COUNTRY_ID,
	@PARENT_MAILING_POSTAL_CODE,
	@PARENT_TELEPHONE,
	@PRE_OVER_AWARD,
	@PRE_YEA_AWARDS_USED,
	@EDUCATION_LEVEL_ID,
	@HIGH_SCHOOL_ID,
	@HIGH_SCHOOL_LEFT_YEAR,
	@HIGH_SCHOOL_LEFT_MONTH,
	@SEX,
	@SPOUSE_HS_END_MONTH,
	@SPOUSE_HS_END_YEAR,
	@USER_NAME,
	@USER_PASSWORD,
	@IS_ACTIVE_FLG,
	@IS_FIRST_LOGON_FLG,
	@LAST_PW_CHG_DATE,
	@LAST_LOGON_DATE,
	@PREVIOUS_LAST_NAME,
	@YEA_EXPIRY_DATE,
	@ADJ_YG_FUNDING_WEEKS,
	@ADJ_STA_UPGRADING_WEEKS,
	@ADJ_OUTSIDE_TRAVEL_CNT,
	@CHECKED_FOR_YTID_FLG,
	@INDIGENOUS_LEARNER,
	@CROWN_WARD_FLG;
		
WHILE @@FETCH_STATUS = 0
BEGIN
	-- create the student person
	INSERT INTO sfa.person (language_id, sex_id, birth_city_id, birth_province_id, birth_country_id, 
		first_name, last_name, initials, previous_last_name, sin, birth_date, telephone, email)
	VALUES (@LANGUAGE_ID, @SEX, @BIRTH_CITY_ID, @BIRTH_PROVINCE_ID, @BIRTH_COUNTRY_ID,
		@FIRST_NAME, @LAST_NAME, @INITIALS, @PREVIOUS_LAST_NAME, @SIN, @BIRTH_DATE, @HOME_PHONE, @HOME_EMAIL)

	SELECT @person_id = SCOPE_IDENTITY();

	-- create the home address
	INSERT INTO sfa.person_address (person_id, address_type_id, address1, address2, city_id, province_id, country_id, postal_code)
	VALUES (@person_id, 1, @HOME_ADDRESS1, @HOME_ADDRESS2, @HOME_CITY_ID, @HOME_PROVINCE_ID, @HOME_COUNTRY_ID, @HOME_POSTAL_CODE)

	SELECT @home_address_id = SCOPE_IDENTITY();
		
	-- create the mailing address
	INSERT INTO sfa.person_address (person_id, address_type_id, address1, address2, city_id, province_id, country_id, postal_code)
	VALUES (@person_id, 2, @MAILING_ADDRESS1 , @MAILING_ADDRESS2, @MAILING_CITY_ID, @MAILING_PROVINCE_ID, @MAILING_COUNTRY_ID, @MAILING_POSTAL_CODE)
		
	SELECT @mail_address_id = SCOPE_IDENTITY();

	-- create the parent address
	INSERT INTO sfa.person_address (person_id, address_type_id, address1, city_id, province_id, country_id, postal_code)
	VALUES (@person_id, 4, @PARENT_MAILING_ADDRESS1, @PARENT_MAILING_CITY_ID,@PARENT_MAILING_PROVINCE_ID, @PARENT_MAILING_COUNTRY_ID, @PARENT_MAILING_POSTAL_CODE)
		
	SELECT @parent_address_id = SCOPE_IDENTITY();

	SET IDENTITY_INSERT sfa.student ON 
	INSERT INTO sfa.student(id, person_id, high_school_id, education_level_id, indigenous_learner_id, vendor_id, yukon_id, checked_for_yukon_id,
		national_id, locator_number, is_crown_ward, high_school_final_grade, high_school_left_year, high_school_left_month, pre_funded_year, 
		pre_funding_years_used, csl_letter_date, csl_warn_code, pre_over_award_amount, pre_yea_awards_used_amount, user_name, user_password, is_active, 
		is_first_logon_flg, last_logon_date, last_pw_change_date, yea_expiry_date, adj_yg_funding_weeks, adj_sta_upgrading_weeks, adj_outside_travel_cnt)
	VALUES (@STUDENT_ID, @person_id, @HIGH_SCHOOL_ID, @EDUCATION_LEVEL_ID, 
		CASE WHEN @INDIGENOUS_LEARNER = 'Yes' THEN 1 WHEN @INDIGENOUS_LEARNER = 'No' THEN 2 WHEN @INDIGENOUS_LEARNER = 'Prefer Not to Say' THEN 3 ELSE -1 END, @VENDOR_ID, 
		@YUKON_ID, CASE WHEN @CHECKED_FOR_YTID_FLG = 'Yes' THEN 1 ELSE 0 END,
		@NATIONAL_ID, @LOCATOR_NUMBER, CASE WHEN @CROWN_WARD_FLG = 'Y' THEN 1 ELSE 0 END, @HIGH_SCHOOL_FINAL_GRADE, @HIGH_SCHOOL_LEFT_YEAR, @HIGH_SCHOOL_LEFT_MONTH, @PRE_FUNDED_YEAR,
		@PRE_FUNDING_YEARS_USED, @CSL_LETTER_DATE, @CSL_WARN_CODE, @PRE_OVER_AWARD, @PRE_YEA_AWARDS_USED, @USER_NAME, @USER_PASSWORD, CASE WHEN @IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END,
		@IS_FIRST_LOGON_FLG, @LAST_LOGON_DATE, @LAST_PW_CHG_DATE, @YEA_EXPIRY_DATE, @ADJ_YG_FUNDING_WEEKS, @ADJ_STA_UPGRADING_WEEKS, @ADJ_OUTSIDE_TRAVEL_CNT)
			
	SET IDENTITY_INSERT sfa.student OFF
			
	FETCH NEXT FROM student_cursor INTO 
		@STUDENT_ID,
		@FIRST_NAME,
		@LAST_NAME,
		@INITIALS,
		@VENDOR_ID,
		@YUKON_ID,
		@SIN ,
		@NATIONAL_ID,
		@CSL_LETTER_DATE,
		@CSL_WARN_CODE,
		@LANGUAGE_ID,
		@BIRTH_DATE,
		@HOME_ADDRESS1,
		@HOME_ADDRESS2,
		@BIRTH_CITY_ID,
		@BIRTH_COUNTRY_ID,
		@HOME_CITY_ID,
		@BIRTH_PROVINCE_ID,
		@HOME_PROVINCE_ID,
		@HOME_COUNTRY_ID,
		@HOME_PHONE,
		@HOME_POSTAL_CODE,
		@HOME_EMAIL,
		@LOCATOR_NUMBER,
		@MAILING_ADDRESS1,
		@MAILING_ADDRESS2,
		@MAILING_CITY_ID,
		@MAILING_PROVINCE_ID,
		@MAILING_COUNTRY_ID,
		@MAILING_POSTAL_CODE,
		@PRE_FUNDED_YEAR,
		@PRE_FUNDING_YEARS_USED,
		@SCHOOL_EMAIL,
		@SCHOOL_PHONE,
		@CREATED_BY,
		@CREATED_DATE,
		@UPDATED_BY,
		@UPDATED_DATE,
		@HIGH_SCHOOL_FINAL_GRADE,
		@PARENT_MAILING_ADDRESS1,
		@ARENT_MAILING_ADDRESS2,
		@PARENT_MAILING_CITY_ID,
		@PARENT_MAILING_PROVINCE_ID,
		@PARENT_MAILING_COUNTRY_ID,
		@PARENT_MAILING_POSTAL_CODE,
		@PARENT_TELEPHONE,
		@PRE_OVER_AWARD,
		@PRE_YEA_AWARDS_USED,
		@EDUCATION_LEVEL_ID,
		@HIGH_SCHOOL_ID,
		@HIGH_SCHOOL_LEFT_YEAR,
		@HIGH_SCHOOL_LEFT_MONTH,
		@SEX,
		@SPOUSE_HS_END_MONTH,
		@SPOUSE_HS_END_YEAR,
		@USER_NAME,
		@USER_PASSWORD,
		@IS_ACTIVE_FLG,
		@IS_FIRST_LOGON_FLG,
		@LAST_PW_CHG_DATE,
		@LAST_LOGON_DATE,
		@PREVIOUS_LAST_NAME,
		@YEA_EXPIRY_DATE,
		@ADJ_YG_FUNDING_WEEKS,
		@ADJ_STA_UPGRADING_WEEKS,
		@ADJ_OUTSIDE_TRAVEL_CNT,
		@CHECKED_FOR_YTID_FLG,
		@INDIGENOUS_LEARNER,
		@CROWN_WARD_FLG;
END;

CLOSE student_cursor;
DEALLOCATE student_cursor;

-- SFAADMIN.STUDENT_CONSENT
SET IDENTITY_INSERT sfa.student_consent ON

INSERT INTO sfa.student_consent (id, student_id, start_academic_year_id, end_academic_year_id, consent_person, consent_sfa, consent_csl)
SELECT STUDENT_CONSENT_ID, STUDENT_ID, ACADEMIC_YEAR_START,ACADEMIC_YEAR_END, CONSENT_PERSON, 
CASE WHEN CONSENT_SFA_FLG = 'Yes' THEN 1 ELSE 0 END, CASE WHEN CONSENT_CSL_FLG = 'Yes' THEN 1 ELSE 0 END
FROM SFAADMIN.student_consent
WHERE ACADEMIC_YEAR_START != 0

SET IDENTITY_INSERT sfa.student_consent OFF

-- SFAADMIN.RESIDENCE
SET IDENTITY_INSERT sfa.residence ON

INSERT INTO sfa.residence (id, student_id, address, city_id, province_id, country_id, postal_code, in_school, from_year, from_month, to_year, to_month, is_in_progress)
SELECT RESIDENCE_ID, STUDENT_ID, ADDRESS, CITY_ID, PROVINCE_ID, COUNTRY_ID, POSTAL_CODE, 
IN_SCHOOL, FROM_YEAR, FROM_MONTH, TO_YEAR, TO_MONTH, 
CASE WHEN IS_IN_PROGRESS_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.residence

SET IDENTITY_INSERT sfa.residence OFF

-- SFAADMIN.REQUEST_TYPE
SET IDENTITY_INSERT sfa.request_type ON

INSERT INTO sfa.request_type ( id, application_type_id, funding_group_id, batch_group_id, description, scholarship_flag, application_deadline, regulation, program_type, static_description_flag, financial_coding, t4a_required, csg_other_flag, gl_budget, auto_appear, show_online, short_name, help_url, help_text)
SELECT REQUEST_TYPE_ID, APPLICATION_TYPE_ID, FUNDING_GROUP_ID, BATCH_GROUP_ID, APPLICATION_REQ_TYPE_ID
	DESCRIPTION, SCHOLARSHIP_FLAG, APPLICATION_DEADLINE, REGULATION, PROGRAM_TYPE, STATIC_DESCRIPTION_FLAG, FINANCIAL_CODING,
	CASE WHEN T4A_REQUIRED_FLAG = 1 THEN 1 ELSE 0 END, 	CSG_OTHER_FLAG, GL_BUDGET, AUTO_APPEAR, 
	CASE WHEN SHOW_ONLINE = 'Y' THEN 1 ELSE 0 END, SHORT_NAME, HELP_URL,HELP_TEXT
FROM SFAADMIN.request_type 

SET IDENTITY_INSERT sfa.request_type OFF

-- SFAADMIN.REQUEST_REQUIREMENT
INSERT INTO sfa.request_requirement (request_type_id, requirement_type_id, condition)
SELECT REQUEST_TYPE_ID, REQUIREMENT_TYPE_ID, CONDITION
FROM SFAADMIN.request_requirement 

-- SFAADMIN.INSTITUTION_REQUEST_TYPE
INSERT INTO sfa.institution_request_type (institution_campus_id, request_type_id)
SELECT INSTITUTION_ID, REQUEST_TYPE_ID
FROM SFAADMIN.institution_request_type

-- SFAADMIN.EXPENESE_CATEGORY
SET IDENTITY_INSERT sfa.expense_category ON

INSERT INTO sfa.expense_category (id, report_expense_category_id, description, is_active)
SELECT EXPENSE_CATEGORY_ID, REPORT_EXPENSE_CATEGORY_ID, DESCRIPTION,CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.expense_category

SET IDENTITY_INSERT sfa.expense_category OFF

-- SFAADMIN.EDUCATION
SET IDENTITY_INSERT sfa.education ON

INSERT INTO sfa.education (id, student_id, institution_campus_id, study_area_id, from_year, from_month, to_year, to_month, is_in_progress)
SELECT EDUCATION_ID, STUDENT_ID, INSTITUTION_ID, STUDY_AREA_ID, FROM_YEAR, FROM_MONTH, TO_YEAR, TO_MONTH, CASE WHEN IS_IN_PROGRESS_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.education

SET IDENTITY_INSERT sfa.education OFF

-- SFAADMIN.DEPENDENT
SET IDENTITY_INSERT sfa.dependent ON

INSERT INTO sfa.dependent (id, student_id, relationship_id, first_name, last_name, comments, birth_date, is_in_progress, is_conversion, is_disability)
SELECT DEPENDENT_ID, STUDENT_ID, RELATIONSHIP_ID, FIRST_NAME, LAST_NAME, COMMENTS, BIRTH_DATE,
	CASE WHEN IS_IN_PROGRESS_FLG = 'Y' THEN 1 ELSE 0 END, CASE WHEN CONVERSION_FLG = 'Y' THEN 1 ELSE 0 END, CASE WHEN DISABILITY_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.dependent

SET IDENTITY_INSERT sfa.dependent OFF

-- SFAADMIN.CORRESPONDENCE_TYPE
SET IDENTITY_INSERT sfa.correspondence_type ON

INSERT INTO sfa.correspondence_type ( id, description, is_active)
SELECT CORRESPONDENCE_TYPE_ID, DESCRIPTION, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.correspondence_type 

SET IDENTITY_INSERT sfa.correspondence_type OFF

-- SFAADMIN.CORRESPONDENCE
SET IDENTITY_INSERT sfa.correspondence ON

INSERT INTO sfa.correspondence ( id, officer_id, student_id, request_type_id, correspondence_type_id, comments, correspondence_date, sent_date, is_complete)
SELECT CORRESPONDENCE_ID,OFFICER_ID,STUDENT_ID,REQUEST_TYPE_ID,CORRESPONDENCE_TYPE_ID,COMMENTS,CORRESPONDENCE_DATE,SENT_DATE,
	CASE WHEN COMPLETED_FLAG = 1 THEN 1 ELSE 0 END
FROM SFAADMIN.correspondence

SET IDENTITY_INSERT sfa.correspondence OFF

-- SFAADMIN.corres_batch_param
INSERT INTO sfa.correspondence_batch_param ( correspondence_id, batch_parameter_id, parameter_value)
SELECT CORRESPONDENCE_ID, BATCH_PARAMETER_ID, PARAMETER_VALUE
FROM SFAADMIN.corres_batch_param

-- SFAADMIN.corr_type_batch_param
INSERT INTO sfa.correspondence_type_batch_param ( correspondence_type_id, batch_parameter_id, source)
SELECT CORRESPONDENCE_TYPE_ID, BATCH_PARAMETER_ID, SOURCE
FROM SFAADMIN.corr_type_batch_param

-- SFAADMIN.COMMUNICATION
SET IDENTITY_INSERT sfa.communication ON

INSERT INTO sfa.communication ( id, communication_type_id, officer_id, student_id, request_type_id, communication_date, comments, show_alert)
SELECT COMMUNICATION_ID, COMMUNICATION_TYPE_ID, OFFICER_ID, STUDENT_ID, REQUEST_TYPE_ID, COMMUNICATION_DATE, COMMENTS, 
	CASE WHEN SHOW_ALERT_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.communication

SET IDENTITY_INSERT sfa.communication OFF





-- SFA.APPLICATION
DECLARE 
	@HISTORY_DETAIL_ID float,
	@STUDENT_ID float,
	@PARENT1_FIRST_NAME varchar (30),
	@PARENT1_LAST_NAME varchar (30),
	@PARENT1_INCOME numeric (8, 2),
	@PARENT1_TAX_PAID numeric (8, 2),
	@PARENT1_RELATIONSHIP_ID float,
	@PARENT2_FIRST_NAME varchar (30),
	@PARENT2_LAST_NAME varchar (30),
	@PARENT2_INCOME numeric (8, 2),
	@PARENT2_TAX_PAID numeric (8, 2),
	@PARENT2_RELATIONSHIP_ID float,
	@CREATED_BY varchar (30),
	@CREATED_DATE datetime2 (0),
	@UPDATED_BY varchar (30),
	@UPDATED_DATE datetime2 (0),
	@INSTITUTION_ID float,
	@STUDY_AREA_ID float,
	@PROGRAM_ID float,
	@CLASSES_START_DATE datetime2 (0),
	@CLASSES_END_DATE datetime2 (0),
	@CORRESPONDENCE_FLAG numeric (3, 0),
	@COOP_PAID_FLAG numeric (3, 0),
	@ABORIGINAL_STATUS_ID float,
	@MARITAL_STATUS_ID float,
	@CITIZENSHIP_STATUS float,
	@DISABLED_FLAG numeric (3, 0),
	@MINORITY_FLAG numeric (3, 0),
	@STUDENT_NUMBER varchar (30),
	@ACADEMIC_YEAR varchar (15),
	@PROGRAM_YEAR_TOTAL float,
	@PROGRAM_YEAR float,
	@TWO_RESIDENCE_FLAG float,
	@MOVING_FLAG float,
	@CSL_CLASSIFICATION numeric (3, 0),
	@CSL_PREVIOUS_PROVINCE_ID float,
	@PROGRAM_DIVISION_EXPLAN varchar (100),
	@PRESTUDY_ACCOM_CODE numeric (3, 0),
	@PRESTUDY_OWN_HOME_FLAG numeric (3, 0),
	@PRESTUDY_BOARD_AMOUNT numeric (7, 2),
	@PRESTUDY_CITY_ID float,
	@PRESTUDY_PROVINCE_ID float,
	@PRESTUDY_BUS_FLAG numeric (3, 0),
	@PRESTUDY_DISTANCE numeric (5, 0),
	@PRESTUDY_EMPLOY_STATUS_ID float,
	@STUDY_ACCOM_CODE numeric (3, 0),
	@STUDY_OWN_HOME_FLAG numeric (3, 0),
	@STUDY_BOARD_AMOUNT numeric (7, 2),
	@STUDY_CITY_ID float,
	@STUDY_PROVINCE_ID float,
	@STUDY_BUS_FLAG numeric (3, 0),
	@STUDY_DISTANCE numeric (5, 0),
	@BOOKS_SUPPLIES_COST numeric (6, 0),
	@OUTSTANDING_CSLPT_AMT numeric (8, 2),
	@PREVIOUS_CSG_PT_AMT numeric (8, 2),
	@STAT_INFO_COMMENT varchar (500),
	@PERCENT_OF_FULL_TIME numeric (3, 0),
	@PART_OF_FT_FLAG numeric (3, 0),
	@STUDY_WEEKS_COUNT numeric (3, 0),
	@CLASS_HOURS_PER_WEEK numeric (4, 1),
	@PARENT_RESIDENCE_COMMENT varchar (500),
	@STUDY_LIVING_W_SPOUSE_FLAG numeric (3, 0),
	@TUITION_ESTIMATE numeric (9, 2),
	@PROGRAM_DIVISION numeric (3, 0),
	@PREVIOUS_CSLFT_FLAG numeric (1, 0),
	@PREVIOUS_CSLPT_FLAG numeric (1, 0),
	@PARENT1_CITIZENSHIP_CODE numeric (1, 0),
	@SPOUSE_PRESTUDY_EMP_STATUS_ID float,
	@SPOUSE_STUDY_EMP_STATUS_ID float,
	@SPOUSE_STUDY_SCHOOL_FROM datetime2 (0),
	@SPOUSE_STUDY_SCHOOL_TO datetime2 (0),
	@SPOUSE_PSTUDY_SCHOOL_TO datetime2 (0),
	@SPOUSE_PSTUDY_SCHOOL_FROM datetime2 (0),
	@SPOUSE_STUDY_CSL_FLAG numeric (3, 0),
	@SPOUSE_STUDY_BUS_FLAG numeric (3, 0),
	@SPOUSE_STUDY_DISTANCE numeric (5, 0),
	@SPOUSE_LAST_NAME varchar (30),
	@SPOUSE_FIRST_NAME varchar (30),
	@SPOUSE_INITIALS varchar (5),
	@COOP_START_YEAR numeric (4, 0),
	@COOP_START_MONTH numeric (2, 0),
	@COOP_END_YEAR numeric (4, 0),
	@COOP_END_MONTH numeric (2, 0),
	@SPOUSE_PSTUDY_INCOME_COMMENT varchar (500),
	@SPOUSE_STUDY_INCOME_COMMENT varchar (500),
	@SPOUSE_SIN float,
	@EXCLUDE_FROM_COUNT numeric (4, 0),
	@PERM_DISABLED_FLAG numeric (3, 0),
	@DISABLED_EQUIPMENT varchar (256),
	@PREVIOUS_CSG_DISABILITY_AMOUNT numeric (8, 2),
	@PREVIOUS_CSG_FEM_DOC_AMOUNT numeric (8, 2),
	@SPOUSE_HS_END_YEAR numeric (4, 0),
	@SPOUSE_HS_END_MONTH numeric (2, 0),
	@CREDIT_CHK_REQD_DATE datetime2 (0),
	@CREDIT_CHK_FAX_SENT_DATE datetime2 (0),
	@CREDIT_CHK_PASSED_DATE datetime2 (0),
	@CREDIT_CHK_PASSED_FLAG numeric (4, 0),
	@CREDIT_CHK_APPEAL_DATE datetime2 (0),
	@CREDIT_CHK_APP_COMP_DATE datetime2 (0),
	@CREDIT_CHK_APP_COMP_FLAG numeric (4, 0),
	@CREDIT_CHK_COMP_DATE datetime2 (0),
	@CSL_CLEARANCE_DATE datetime2 (0),
	@PRESTUDY_CSL_CLASSIFICATION numeric (3, 0),
	@CATEGORY_ID float,
	@YEA_TOT_RECEIPT_AMOUNT numeric (8, 2),
	@ACADEMIC_PERCENT float,
	@CSL_RESTRICTION_COMMENT varchar (2000),
	@IN_PROGRESS_PAGE numeric (10, 0),
	@ONLINE_START_DATE datetime2 (0),
	@ONLINE_SUBMIT_DATE datetime2 (0),
	@PARENT1_SIN float,
	@PARENT2_SIN float,
	@PARENT1_NET_INCOME numeric (8, 2),
	@PARENT2_NET_INCOME numeric (8, 2),
	@STUDENT_LN150_INCOME numeric (8, 2),
	@SPOUSE_LN150_INCOME numeric (8, 2),
	@REM_TRANSITION_GRANT_YRS numeric (3, 0),
	@TAXES_FILED_YEAR1 numeric (4, 0),
	@TAXES_FILED_YEAR2 numeric (4, 0),
	@TAXES_FILED1_PROVINCE_ID float,
	@TAXES_FILED2_PROVINCE_ID float,
	@TAXES_NOT_FILED_YR1_FLG varchar (1),
	@TAXES_NOT_FILED_YR2_FLG varchar (1),
	@APPLIED_OTHER_FUNDING_FLG varchar (1),
	@CSL_RESTRICTION_WARN_ID float,
	@CSL_RESTRICTION_REASON_ID float,
	@COURSES_PER_WEEK numeric (4, 0),
	@FIRST_NATION_ID float,
	@PRESTUDY_START_DATE datetime2 (0),
	@PRESTUDY_END_DATE datetime2 (0),
    @SCHOOL_EMAIL varchar(50), 
    @SCHOOL_PHONE varchar(24),
	@ROWID uniqueidentifier;

DECLARE @parent1_id INT, @parent2_id INT, @spouse_id INT;

DECLARE app_cursor CURSOR FOR SELECT H.*, S.SCHOOL_EMAIL, S.SCHOOL_PHONE FROM SFAADMIN.HISTORY_DETAIL H INNER JOIN SFAADMIN.STUDENT S ON H.STUDENT_ID = S.STUDENT_ID
OPEN app_cursor;

FETCH NEXT FROM app_cursor INTO 
	@HISTORY_DETAIL_ID,
		@STUDENT_ID,
		@PARENT1_FIRST_NAME,
		@PARENT1_LAST_NAME,
		@PARENT1_INCOME,
		@PARENT1_TAX_PAID,
		@PARENT1_RELATIONSHIP_ID,
		@PARENT2_FIRST_NAME,
		@PARENT2_LAST_NAME,
		@PARENT2_INCOME,
		@PARENT2_TAX_PAID,
		@PARENT2_RELATIONSHIP_ID,
		@CREATED_BY,
		@CREATED_DATE,
		@UPDATED_BY,
		@UPDATED_DATE,
		@INSTITUTION_ID,
		@STUDY_AREA_ID,
		@PROGRAM_ID,
		@CLASSES_START_DATE,
		@CLASSES_END_DATE,
		@CORRESPONDENCE_FLAG,
		@COOP_PAID_FLAG,
		@ABORIGINAL_STATUS_ID,
		@MARITAL_STATUS_ID,
		@CITIZENSHIP_STATUS,
		@DISABLED_FLAG,
		@MINORITY_FLAG,
		@STUDENT_NUMBER,
		@ACADEMIC_YEAR,
		@PROGRAM_YEAR_TOTAL,
		@PROGRAM_YEAR,
		@TWO_RESIDENCE_FLAG,
		@MOVING_FLAG,
		@CSL_CLASSIFICATION,
		@CSL_PREVIOUS_PROVINCE_ID,
		@PROGRAM_DIVISION_EXPLAN,
		@PRESTUDY_ACCOM_CODE,
		@PRESTUDY_OWN_HOME_FLAG,
		@PRESTUDY_BOARD_AMOUNT,
		@PRESTUDY_CITY_ID,
		@PRESTUDY_PROVINCE_ID,
		@PRESTUDY_BUS_FLAG,
		@PRESTUDY_DISTANCE,
		@PRESTUDY_EMPLOY_STATUS_ID,
		@STUDY_ACCOM_CODE,
		@STUDY_OWN_HOME_FLAG,
		@STUDY_BOARD_AMOUNT,
		@STUDY_CITY_ID,
		@STUDY_PROVINCE_ID,
		@STUDY_BUS_FLAG,
		@STUDY_DISTANCE,
		@BOOKS_SUPPLIES_COST,
		@OUTSTANDING_CSLPT_AMT,
		@PREVIOUS_CSG_PT_AMT,
		@STAT_INFO_COMMENT,
		@PERCENT_OF_FULL_TIME,
		@PART_OF_FT_FLAG,
		@STUDY_WEEKS_COUNT,
		@CLASS_HOURS_PER_WEEK,
		@PARENT_RESIDENCE_COMMENT,
		@STUDY_LIVING_W_SPOUSE_FLAG,
		@TUITION_ESTIMATE,
		@PROGRAM_DIVISION,
		@PREVIOUS_CSLFT_FLAG,
		@PREVIOUS_CSLPT_FLAG,
		@PARENT1_CITIZENSHIP_CODE,
		@SPOUSE_PRESTUDY_EMP_STATUS_ID,
		@SPOUSE_STUDY_EMP_STATUS_ID,
		@SPOUSE_STUDY_SCHOOL_FROM,
		@SPOUSE_STUDY_SCHOOL_TO,
		@SPOUSE_PSTUDY_SCHOOL_TO,
		@SPOUSE_PSTUDY_SCHOOL_FROM,
		@SPOUSE_STUDY_CSL_FLAG,
		@SPOUSE_STUDY_BUS_FLAG,
		@SPOUSE_STUDY_DISTANCE,
		@SPOUSE_LAST_NAME,
		@SPOUSE_FIRST_NAME,
		@SPOUSE_INITIALS,
		@COOP_START_YEAR,
		@COOP_START_MONTH,
		@COOP_END_YEAR,
		@COOP_END_MONTH,
		@SPOUSE_PSTUDY_INCOME_COMMENT,
		@SPOUSE_STUDY_INCOME_COMMENT,
		@SPOUSE_SIN,
		@EXCLUDE_FROM_COUNT,
		@PERM_DISABLED_FLAG,
		@DISABLED_EQUIPMENT,
		@PREVIOUS_CSG_DISABILITY_AMOUNT,
		@PREVIOUS_CSG_FEM_DOC_AMOUNT,
		@SPOUSE_HS_END_YEAR,
		@SPOUSE_HS_END_MONTH,
		@CREDIT_CHK_REQD_DATE,
		@CREDIT_CHK_FAX_SENT_DATE,
		@CREDIT_CHK_PASSED_DATE,
		@CREDIT_CHK_PASSED_FLAG,
		@CREDIT_CHK_APPEAL_DATE,
		@CREDIT_CHK_APP_COMP_DATE,
		@CREDIT_CHK_APP_COMP_FLAG,
		@CREDIT_CHK_COMP_DATE,
		@CSL_CLEARANCE_DATE,
		@PRESTUDY_CSL_CLASSIFICATION,
		@CATEGORY_ID,
		@YEA_TOT_RECEIPT_AMOUNT,
		@ACADEMIC_PERCENT,
		@CSL_RESTRICTION_COMMENT,
		@IN_PROGRESS_PAGE,
		@ONLINE_START_DATE,
		@ONLINE_SUBMIT_DATE,
		@PARENT1_SIN,
		@PARENT2_SIN,
		@PARENT1_NET_INCOME,
		@PARENT2_NET_INCOME,
		@STUDENT_LN150_INCOME,
		@SPOUSE_LN150_INCOME,
		@REM_TRANSITION_GRANT_YRS,
		@TAXES_FILED_YEAR1,
		@TAXES_FILED_YEAR2,
		@TAXES_FILED1_PROVINCE_ID,
		@TAXES_FILED2_PROVINCE_ID,
		@TAXES_NOT_FILED_YR1_FLG,
		@TAXES_NOT_FILED_YR2_FLG,
		@APPLIED_OTHER_FUNDING_FLG,
		@CSL_RESTRICTION_WARN_ID,
		@CSL_RESTRICTION_REASON_ID,
		@COURSES_PER_WEEK,
		@FIRST_NATION_ID,
		@PRESTUDY_START_DATE,
		@PRESTUDY_END_DATE,
		@ROWID,
        @SCHOOL_EMAIL,
        @SCHOOL_PHONE;
		
WHILE @@FETCH_STATUS = 0
BEGIN
	SELECT @parent1_id = null;
	SELECT @parent2_id = null;
	SELECT @spouse_id = null;
	
	-- create the parent 1
	IF @PARENT1_LAST_NAME IS NOT NULL OR @PARENT1_INCOME IS NOT NULL
	BEGIN
		INSERT INTO sfa.person (first_name, last_name, sin)
		VALUES (@PARENT1_FIRST_NAME, @PARENT1_LAST_NAME, @PARENT1_SIN)
		SELECT @parent1_id = SCOPE_IDENTITY();

	END

	IF @PARENT2_LAST_NAME IS NOT NULL OR @PARENT2_INCOME IS NOT NULL
	BEGIN
		INSERT INTO sfa.person (first_name, last_name, sin)
		VALUES (@PARENT2_FIRST_NAME, @PARENT2_LAST_NAME, @PARENT2_SIN)
		SELECT @parent2_id = SCOPE_IDENTITY();
	END
	
	IF @SPOUSE_LAST_NAME IS NOT NULL OR @SPOUSE_SIN IS NOT NULL
	BEGIN
		INSERT INTO sfa.person (first_name, last_name, initials, sin)
		VALUES (@SPOUSE_FIRST_NAME, @SPOUSE_LAST_NAME, @SPOUSE_INITIALS, @SPOUSE_SIN)
		SELECT @spouse_id = SCOPE_IDENTITY();
	END

	SET IDENTITY_INSERT sfa.student OFF
	
		SET IDENTITY_INSERT sfa.application ON

        INSERT INTO sfa.application ( id,student_id,academic_year_id,institution_campus_id,study_area_id,program_id,aboriginal_status_id,
        marital_status_id,category_id,first_nation_id,spouse_id,parent1_id,parent2_id,parent1_income,
        parent1_net_income,parent1_tax_paid,parent2_income,parent2_net_income,parent2_tax_paid,school_email,
        school_telephone,spouse_hs_end_year,spouse_hs_end_month,spouse_prestudy_emp_status_id,spouse_pstudy_school_from,
        spouse_pstudy_school_to,spouse_pstudy_income_comment,spouse_study_emp_status_id,spouse_study_school_from,
        spouse_study_school_to,is_spouse_study_csl,is_spouse_study_bus,spouse_study_distance,spouse_study_income_comment,
        classes_start_date,classes_end_date,is_correspondence,is_coop_paid,citizenship_status,is_disabled,is_minority,
        student_number,program_year_total,program_year,is_two_residence,is_moving,csl_classification,csl_previous_province_id,
        program_division_explanation,prestudy_accom_code,prestudy_own_home,prestudy_board_amount,prestudy_city_id,prestudy_province_id,
        prestudy_bus,prestudy_distance,prestudy_employ_status_id,study_accom_code,study_own_home,study_board_amount,
        study_city_id,study_province_id,study_bus,study_distance,stat_info_comment,books_supplies_cost,outstanding_cslpt_amount,
        previous_csg_pt_amount,percent_of_full_time,is_part_of_ft,study_weeks_count,class_hours_per_week,parent_residence_comment,
        study_living_w_spouse,tuition_estimate_amount,program_division,is_previous_cslft,is_previous_cslpt,coop_start_year,
        coop_start_month,coop_end_year,coop_end_month,exclude_from_count,is_perm_disabled,disabled_equipment,previous_csg_disability_amount,
        previous_csg_fem_doc_amount,credit_chk_reqd_date,credit_chk_fax_sent_date,credit_chk_passed_date,credit_chk_passed,
        credit_chk_appeal_date,credit_chk_app_comp_date,credit_chk_app_comp,credit_chk_comp_date,csl_clearance_date,
        prestudy_csl_classification,yea_tot_receipt_amount,academic_percent,csl_restriction_comment,in_progress_page,
        online_start_date,online_submit_date,rem_transition_grant_years,student_ln150_income,spouse_ln150_income,
        taxes1_filed_year,taxes2_filed_year,taxes1_filed_province_id,taxes2_filed_province_id,taxes1_not_filed,
        taxes2_not_filed,applied_other_funding,csl_restriction_warn_id,csl_restriction_reason_id,courses_per_week,
        prestudy_start_date,prestudy_end_date )
        VALUES( @HISTORY_DETAIL_ID, @STUDENT_ID, COALESCE(@ACADEMIC_YEAR, DATEPART(YEAR, @CREATED_DATE)),COALESCE(@INSTITUTION_ID, 0),@STUDY_AREA_ID, @PROGRAM_ID, @ABORIGINAL_STATUS_ID,
            @MARITAL_STATUS_ID,@CATEGORY_ID,@FIRST_NATION_ID,@spouse_id, @parent1_id, @parent2_id, @PARENT1_INCOME,
            @PARENT1_NET_INCOME,@PARENT1_TAX_PAID,@PARENT2_INCOME,@PARENT2_NET_INCOME,@PARENT2_TAX_PAID,@SCHOOL_EMAIL,
            @SCHOOL_PHONE, @SPOUSE_HS_END_YEAR, @SPOUSE_HS_END_MONTH, @SPOUSE_PRESTUDY_EMP_STATUS_ID, @SPOUSE_PSTUDY_SCHOOL_FROM,
            @SPOUSE_PSTUDY_SCHOOL_TO, @SPOUSE_PSTUDY_INCOME_COMMENT, @SPOUSE_STUDY_EMP_STATUS_ID, @SPOUSE_STUDY_SCHOOL_FROM,
            @SPOUSE_STUDY_SCHOOL_TO, COALESCE(@SPOUSE_STUDY_CSL_FLAG, 0), COALESCE(@SPOUSE_STUDY_BUS_FLAG,0), @SPOUSE_STUDY_DISTANCE, @SPOUSE_STUDY_INCOME_COMMENT,
            @CLASSES_START_DATE, @CLASSES_END_DATE, COALESCE(@CORRESPONDENCE_FLAG, 0), COALESCE(@COOP_PAID_FLAG, 0), @CITIZENSHIP_STATUS, COALESCE(@DISABLED_FLAG, 0), COALESCE(@MINORITY_FLAG, 0),
            @STUDENT_NUMBER, @PROGRAM_YEAR_TOTAL, @PROGRAM_YEAR, COALESCE(@TWO_RESIDENCE_FLAG, 0), COALESCE(@MOVING_FLAG, 0), @CSL_CLASSIFICATION,@CSL_PREVIOUS_PROVINCE_ID,
            @PROGRAM_DIVISION_EXPLAN,@PRESTUDY_ACCOM_CODE,COALESCE(@PRESTUDY_OWN_HOME_FLAG, 0), @PRESTUDY_BOARD_AMOUNT,@PRESTUDY_CITY_ID,@PRESTUDY_PROVINCE_ID,
            COALESCE(@PRESTUDY_BUS_FLAG, 0),@PRESTUDY_DISTANCE,@PRESTUDY_EMPLOY_STATUS_ID,@STUDY_ACCOM_CODE,COALESCE(@STUDY_OWN_HOME_FLAG, 0), @STUDY_BOARD_AMOUNT,
            @STUDY_CITY_ID,@STUDY_PROVINCE_ID,COALESCE(@STUDY_BUS_FLAG, 0), @STUDY_DISTANCE,@STAT_INFO_COMMENT,@BOOKS_SUPPLIES_COST,@OUTSTANDING_CSLPT_AMT,
            @PREVIOUS_CSG_PT_AMT,@PERCENT_OF_FULL_TIME,COALESCE(@PART_OF_FT_FLAG, 0),@STUDY_WEEKS_COUNT,@CLASS_HOURS_PER_WEEK,@PARENT_RESIDENCE_COMMENT,
            COALESCE(@STUDY_LIVING_W_SPOUSE_FLAG, 0),@TUITION_ESTIMATE,@PROGRAM_DIVISION,COALESCE(@PREVIOUS_CSLFT_FLAG,0), COALESCE(@PREVIOUS_CSLPT_FLAG,0),@COOP_START_YEAR, 
            @COOP_START_MONTH,@COOP_END_YEAR,@COOP_END_MONTH,COALESCE(@EXCLUDE_FROM_COUNT, 0),COALESCE(@PERM_DISABLED_FLAG,0),@DISABLED_EQUIPMENT,@PREVIOUS_CSG_DISABILITY_AMOUNT,
            @PREVIOUS_CSG_FEM_DOC_AMOUNT,@CREDIT_CHK_REQD_DATE,@CREDIT_CHK_FAX_SENT_DATE,@CREDIT_CHK_PASSED_DATE, COALESCE(@CREDIT_CHK_PASSED_FLAG,0),
            @CREDIT_CHK_APPEAL_DATE,@CREDIT_CHK_APP_COMP_DATE,COALESCE(@CREDIT_CHK_APP_COMP_FLAG,0),@CREDIT_CHK_COMP_DATE,@CSL_CLEARANCE_DATE,
            @PRESTUDY_CSL_CLASSIFICATION,@YEA_TOT_RECEIPT_AMOUNT,@ACADEMIC_PERCENT,@CSL_RESTRICTION_COMMENT,@IN_PROGRESS_PAGE,
            @ONLINE_START_DATE,@ONLINE_SUBMIT_DATE,@REM_TRANSITION_GRANT_YRS,@STUDENT_LN150_INCOME,@SPOUSE_LN150_INCOME,
            @TAXES_FILED_YEAR1,@TAXES_FILED_YEAR2,@TAXES_FILED1_PROVINCE_ID,@TAXES_FILED2_PROVINCE_ID, CASE WHEN @TAXES_NOT_FILED_YR1_FLG = 'Y' THEN 1 ELSE 0 END,
            CASE WHEN @TAXES_NOT_FILED_YR2_FLG = 'Y' THEN 1 ELSE 0 END, CASE WHEN @APPLIED_OTHER_FUNDING_FLG = 'Y' THEN 1 ELSE 0 END,@CSL_RESTRICTION_WARN_ID,@CSL_RESTRICTION_REASON_ID,@COURSES_PER_WEEK,
            @PRESTUDY_START_DATE,@PRESTUDY_END_DATE)
			
		SET IDENTITY_INSERT sfa.application OFF

	FETCH NEXT FROM app_cursor INTO 
		@HISTORY_DETAIL_ID,
		@STUDENT_ID,
		@PARENT1_FIRST_NAME,
		@PARENT1_LAST_NAME,
		@PARENT1_INCOME,
		@PARENT1_TAX_PAID,
		@PARENT1_RELATIONSHIP_ID,
		@PARENT2_FIRST_NAME,
		@PARENT2_LAST_NAME,
		@PARENT2_INCOME,
		@PARENT2_TAX_PAID,
		@PARENT2_RELATIONSHIP_ID,
		@CREATED_BY,
		@CREATED_DATE,
		@UPDATED_BY,
		@UPDATED_DATE,
		@INSTITUTION_ID,
		@STUDY_AREA_ID,
		@PROGRAM_ID,
		@CLASSES_START_DATE,
		@CLASSES_END_DATE,
		@CORRESPONDENCE_FLAG,
		@COOP_PAID_FLAG,
		@ABORIGINAL_STATUS_ID,
		@MARITAL_STATUS_ID,
		@CITIZENSHIP_STATUS,
		@DISABLED_FLAG,
		@MINORITY_FLAG,
		@STUDENT_NUMBER,
		@ACADEMIC_YEAR,
		@PROGRAM_YEAR_TOTAL,
		@PROGRAM_YEAR,
		@TWO_RESIDENCE_FLAG,
		@MOVING_FLAG,
		@CSL_CLASSIFICATION,
		@CSL_PREVIOUS_PROVINCE_ID,
		@PROGRAM_DIVISION_EXPLAN,
		@PRESTUDY_ACCOM_CODE,
		@PRESTUDY_OWN_HOME_FLAG,
		@PRESTUDY_BOARD_AMOUNT,
		@PRESTUDY_CITY_ID,
		@PRESTUDY_PROVINCE_ID,
		@PRESTUDY_BUS_FLAG,
		@PRESTUDY_DISTANCE,
		@PRESTUDY_EMPLOY_STATUS_ID,
		@STUDY_ACCOM_CODE,
		@STUDY_OWN_HOME_FLAG,
		@STUDY_BOARD_AMOUNT,
		@STUDY_CITY_ID,
		@STUDY_PROVINCE_ID,
		@STUDY_BUS_FLAG,
		@STUDY_DISTANCE,
		@BOOKS_SUPPLIES_COST,
		@OUTSTANDING_CSLPT_AMT,
		@PREVIOUS_CSG_PT_AMT,
		@STAT_INFO_COMMENT,
		@PERCENT_OF_FULL_TIME,
		@PART_OF_FT_FLAG,
		@STUDY_WEEKS_COUNT,
		@CLASS_HOURS_PER_WEEK,
		@PARENT_RESIDENCE_COMMENT,
		@STUDY_LIVING_W_SPOUSE_FLAG,
		@TUITION_ESTIMATE,
		@PROGRAM_DIVISION,
		@PREVIOUS_CSLFT_FLAG,
		@PREVIOUS_CSLPT_FLAG,
		@PARENT1_CITIZENSHIP_CODE,
		@SPOUSE_PRESTUDY_EMP_STATUS_ID,
		@SPOUSE_STUDY_EMP_STATUS_ID,
		@SPOUSE_STUDY_SCHOOL_FROM,
		@SPOUSE_STUDY_SCHOOL_TO,
		@SPOUSE_PSTUDY_SCHOOL_TO,
		@SPOUSE_PSTUDY_SCHOOL_FROM,
		@SPOUSE_STUDY_CSL_FLAG,
		@SPOUSE_STUDY_BUS_FLAG,
		@SPOUSE_STUDY_DISTANCE,
		@SPOUSE_LAST_NAME,
		@SPOUSE_FIRST_NAME,
		@SPOUSE_INITIALS,
		@COOP_START_YEAR,
		@COOP_START_MONTH,
		@COOP_END_YEAR,
		@COOP_END_MONTH,
		@SPOUSE_PSTUDY_INCOME_COMMENT,
		@SPOUSE_STUDY_INCOME_COMMENT,
		@SPOUSE_SIN,
		@EXCLUDE_FROM_COUNT,
		@PERM_DISABLED_FLAG,
		@DISABLED_EQUIPMENT,
		@PREVIOUS_CSG_DISABILITY_AMOUNT,
		@PREVIOUS_CSG_FEM_DOC_AMOUNT,
		@SPOUSE_HS_END_YEAR,
		@SPOUSE_HS_END_MONTH,
		@CREDIT_CHK_REQD_DATE,
		@CREDIT_CHK_FAX_SENT_DATE,
		@CREDIT_CHK_PASSED_DATE,
		@CREDIT_CHK_PASSED_FLAG,
		@CREDIT_CHK_APPEAL_DATE,
		@CREDIT_CHK_APP_COMP_DATE,
		@CREDIT_CHK_APP_COMP_FLAG,
		@CREDIT_CHK_COMP_DATE,
		@CSL_CLEARANCE_DATE,
		@PRESTUDY_CSL_CLASSIFICATION,
		@CATEGORY_ID,
		@YEA_TOT_RECEIPT_AMOUNT,
		@ACADEMIC_PERCENT,
		@CSL_RESTRICTION_COMMENT,
		@IN_PROGRESS_PAGE,
		@ONLINE_START_DATE,
		@ONLINE_SUBMIT_DATE,
		@PARENT1_SIN,
		@PARENT2_SIN,
		@PARENT1_NET_INCOME,
		@PARENT2_NET_INCOME,
		@STUDENT_LN150_INCOME,
		@SPOUSE_LN150_INCOME,
		@REM_TRANSITION_GRANT_YRS,
		@TAXES_FILED_YEAR1,
		@TAXES_FILED_YEAR2,
		@TAXES_FILED1_PROVINCE_ID,
		@TAXES_FILED2_PROVINCE_ID,
		@TAXES_NOT_FILED_YR1_FLG,
		@TAXES_NOT_FILED_YR2_FLG,
		@APPLIED_OTHER_FUNDING_FLG,
		@CSL_RESTRICTION_WARN_ID,
		@CSL_RESTRICTION_REASON_ID,
		@COURSES_PER_WEEK,
		@FIRST_NATION_ID,
		@PRESTUDY_START_DATE,
		@PRESTUDY_END_DATE,
		@ROWID,
        @SCHOOL_EMAIL,
        @SCHOOL_PHONE;
END;

CLOSE app_cursor;
DEALLOCATE app_cursor;

-- SFA.AGENCY_ASSISTANCE
INSERT INTO sfa.agency_assistance (agency_id, application_id, amount, is_tuition, is_living_expenses, is_books, is_transportation, other_purpose, agency_comment)
SELECT AGENCY_id, HISTORY_DETAIL_ID, AMOUNT, COALESCE(TUITION_FLAG, 0), COALESCE(LIVING_EXPENSE_FLAG, 0), COALESCE(BOOKS_FLAG, 0), COALESCE(TRANSPORTATION_FLAG, 0), OTHER_PURPOSE, AGENCY_COMMENT
FROM SFAADMIN.agency_assistance

-- SFA.COUSE_ENROLLED
SET IDENTITY_INSERT sfa.course_enrolled ON
INSERT INTO sfa.course_enrolled (id, application_id, instruction_type_id, description, course_code)
SELECT COURSE_ENROLLED_ID, HISTORY_DETAIL_ID, COALESCE (INSTRUCTION_TYPE_ID, 1), COURSE_DESCRIPTION, COURSE_CODE
FROM SFAADMIN.COURSE_ENROLLED
SET IDENTITY_INSERT sfa.course_enrolled OFF

-- SFA.dependent_eligibility
SET IDENTITY_INSERT sfa.dependent_eligibility ON
INSERT INTO sfa.dependent_eligibility (id, application_id, dependent_id, is_eligible, is_post_secondary,resides_with_student, is_shares_custody, shares_custody_details, is_csl_eligible, is_csg_eligible, is_in_progress)
SELECT DEPENDENT_ELIGIBILITY_ID, HISTORY_DETAIL_ID, DEPENDENT_ID, COALESCE(ELIGIBLE, 0),
	COALESCE(POST_SECONDARY, 0), COALESCE(RESIDES_WITH, 0), COALESCE(SHARES_CUSTODY, 0),
	SHARES_CUSTODY_DETAILS, COALESCE(CSL_ELIGIBLE, 0), COALESCE(CSG_ELIGIBLE, 0), CASE WHEN IS_IN_PROGRESS_FLG = 'Y' THEN 1 ELSE 0 END
FROM SFAADMIN.dependent_eligibility
SET IDENTITY_INSERT sfa.dependent_eligibility OFF

-- SFA.disability
SET IDENTITY_INSERT sfa.disability ON
INSERT INTO sfa.disability (id, application_id, disability_type_id,description)
SELECT DISABILITY_ID, HISTORY_DETAIL_ID, DISABILITY_TYPE_ID,DESCRIPTION
FROM SFAADMIN.disability
SET IDENTITY_INSERT sfa.disability OFF

-- SFA.disability_requirement
SET IDENTITY_INSERT sfa.disability_requirement ON
INSERT INTO sfa.disability_requirement (id, application_id, disability_service_id)
SELECT DISABILITY_REQUIREMENT_ID, HISTORY_DETAIL_ID, DISAB_SERVICE_TYPE_ID
FROM SFAADMIN.disability_requirement
SET IDENTITY_INSERT sfa.disability_requirement OFF
