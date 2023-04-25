SET IDENTITY_INSERT sfa.country ON
INSERT
INTO sfa.country (id, description, is_active)
SELECT country_id, TRIM(description), CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.country
SET IDENTITY_INSERT sfa.country OFF

SET IDENTITY_INSERT sfa.province ON
INSERT
INTO sfa.province (id, description, is_active)
SELECT province_id, TRIM(description), CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.province
SET IDENTITY_INSERT sfa.province OFF

SET IDENTITY_INSERT sfa.city ON
INSERT
INTO sfa.city (id, description, is_active)
SELECT city_id, TRIM(description), CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.city
SET IDENTITY_INSERT sfa.city OFF

INSERT
INTO sfa.academic_year ([year], status)
VALUES ('1965', 'Closed'),
       ('1966', 'Closed'),
       ('1967', 'Closed'),
       ('1968', 'Closed'),
       ('1969', 'Closed')
INSERT
INTO sfa.academic_year (year, status)
VALUES ('1970', 'Closed'),
       ('1971', 'Closed'),
       ('1972', 'Closed'),
       ('1973', 'Closed'),
       ('1974', 'Closed')
INSERT
INTO sfa.academic_year (year, status)
VALUES ('1975', 'Closed'),
       ('1976', 'Closed'),
       ('1977', 'Closed'),
       ('1978', 'Closed'),
       ('1979', 'Closed')
INSERT
INTO sfa.academic_year (year, status)
VALUES ('1980', 'Closed'),
       ('1981', 'Closed'),
       ('1982', 'Closed'),
       ('1983', 'Closed'),
       ('1984', 'Closed')
INSERT
INTO sfa.academic_year (year, status)
VALUES ('1985', 'Closed'),
       ('1986', 'Closed'),
       ('1987', 'Closed'),
       ('1988', 'Closed'),
       ('1989', 'Closed')
INSERT
INTO sfa.academic_year (year, status)
VALUES ('1990', 'Closed'),
       ('1991', 'Closed'),
       ('1992', 'Closed'),
       ('1993', 'Closed'),
       ('1994', 'Closed')
INSERT
INTO sfa.academic_year (year, status)
VALUES ('1995', 'Closed'),
       ('1996', 'Closed'),
       ('1997', 'Closed'),
       ('1998', 'Closed'),
       ('1999', 'Closed')
INSERT
INTO sfa.academic_year (year, status)
VALUES ('2000', 'Closed'),
       ('2001', 'Closed'),
       ('2002', 'Closed'),
       ('2003', 'Closed'),
       ('2004', 'Closed')
INSERT
INTO sfa.academic_year (year, status)
VALUES ('2005', 'Closed'),
       ('2006', 'Closed'),
       ('2007', 'Closed'),
       ('2008', 'Closed'),
       ('2009', 'Closed')
INSERT
INTO sfa.academic_year (year, status)
VALUES ('2010', 'Closed'),
       ('2011', 'Closed'),
       ('2012', 'Closed'),
       ('2013', 'Closed'),
       ('2014', 'Closed')
INSERT
INTO sfa.academic_year (year, status)
VALUES ('2015', 'Closed'),
       ('2016', 'Closed'),
       ('2017', 'Closed'),
       ('2018', 'Closed'),
       ('2019', 'Closed')
INSERT
INTO sfa.academic_year (year, status)
VALUES ('2020', 'Closed'),
       ('2021', 'Open'),
       ('2022', 'Open')

UPDATE sfa.academic_year
SET status = 'Archived'
WHERE id < 1990

/*
UPDATE sfaadmin.officer SET FIRST_NAME = 'Shawn1' WHERE officer_id = 50

SET IDENTITY_INSERT sfa.[user] ON

INSERT INTO sfa.[user] (id, first_name, last_name, position, create_date, phone, phone_tollfree, email_public, fax, is_active, email)
SELECT DISTINCT OFFICER_ID, FIRST_NAME, LAST_NAME, POSITION, CREATED_DATE, PHONE, TOLLFREE, COALESCE(EMAIL, 'sfa@gov.yk.ca'), FAX, CASE WHEN IS_ACTIVE_FLG = 'Y' THEN 1 ELSE 0 END, FIRST_NAME + '.'  + LAST_NAME + '@yukon.ca'
FROM sfaadmin.officer

SET IDENTITY_INSERT sfa.[user] OFF
*/


SET IDENTITY_INSERT sfa.sex ON
INSERT
INTO sfa.sex (id, description)
VALUES (1, 'Male'),
       (2, 'Female'),
       (0, 'Prefer Not to Say'),
       (-1, 'Unknown')
SET IDENTITY_INSERT sfa.sex OFF

UPDATE sfaadmin.student
SET sex = -1
WHERE sex IS NULL

SET IDENTITY_INSERT sfa.indigenous_learner ON
INSERT
INTO sfa.indigenous_learner (id, description)
VALUES (-1, 'Unknown'),
       (1, 'Yes'),
       (2, 'No'),
       (3, 'Prefer Not to Say')
SET IDENTITY_INSERT sfa.indigenous_learner OFF

SET IDENTITY_INSERT sfa.citizenship ON
INSERT
INTO sfa.citizenship (id, description)
VALUES  ( 1, 'Not Recorded'),
        ( 2, 'Canadian'),
        ( 3, 'Permanent resident'),
        ( 4, 'Protected person'),
        ( 5, 'No citizen')
SET IDENTITY_INSERT sfa.citizenship OFF

SET IDENTITY_INSERT sfa.csl_classification ON
INSERT
INTO sfa.csl_classification (id, description)
VALUES  ( 1, 'Single Dependent'),
        ( 2, 'Single Independent - 2 year workforce'),
        ( 3, 'Single Independent - 4 year high school'),
        ( 4, 'Married / Common Law'),
        ( 5, 'Single Parent')
SET IDENTITY_INSERT sfa.csl_classification OFF

UPDATE sfaadmin.student_consent
SET academic_year_end = 2021
WHERE academic_year_end = 20201

SET IDENTITY_INSERT sfa.institution_level ON
INSERT
INTO sfa.institution_level (id, description, is_active)
SELECT institution_level_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.institution_level
SET IDENTITY_INSERT sfa.institution_level OFF

SET IDENTITY_INSERT sfa.institution ON

INSERT
INTO sfa.institution (id, name, is_active, federal_institution_code, institution_level_id)
SELECT DISTINCT new_id AS id, institution AS name, 0 AS is_active, 'ZZZZ' AS federal_institution_code, 2
FROM inst_camp

SET IDENTITY_INSERT sfa.institution OFF


SET IDENTITY_INSERT sfa.institution_campus ON

INSERT
INTO sfa.institution_campus (id, institution_id, name, federal_institution_code, is_active, is_primary)
SELECT DISTINCT institution_id, new_id, COALESCE(campus, 'Primary'), institution_code, 0, 0
FROM inst_camp

SET IDENTITY_INSERT sfa.institution_campus OFF


UPDATE sfa.institution_campus
SET is_active                = t.act,
    federal_institution_code = t.institution_code,
    care_of                  = t.care_of,
    address_line_1           = t.address,
    address_city_id          = t.city_id,
    address_province_id      = t.province_id,
    address_country_id       = t.country_id,
    address_postal_code      = t.postal_code,
    email_address            = t.contact_email
FROM (SELECT institution_id, institution_code, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END act, care_of, address,
             city_id, province_id, country_id, postal_code, contact_email
FROM sfaadmin.institution) t
WHERE t.institution_id = institution_campus.id


UPDATE sfa.institution
SET institution_level_id = lev
FROM (SELECT c.institution_id parent, MAX(i.institution_level_id) lev
FROM sfaadmin.institution i
         INNER JOIN sfa.institution_campus c ON (i.institution_id = c.id)
GROUP BY c.institution_id) t
WHERE institution.id = t.parent
  AND lev IS NOT NULL

UPDATE sfa.institution
SET is_active = act
FROM (SELECT institution_id, MAX(CONVERT(INT, is_active)) act FROM sfa.institution_campus GROUP BY institution_id) t
WHERE institution.id = t.institution_id


UPDATE sfa.institution
SET federal_institution_code = j.federal_institution_code
FROM (SELECT id, institution_campus.institution_id, federal_institution_code
FROM sfa.institution_campus
         INNER JOIN (SELECT institution_id, COUNT(federal_institution_code) cnt
FROM sfa.institution_campus
WHERE federal_institution_code IS NOT NULL
GROUP BY institution_id
HAVING COUNT(federal_institution_code) = 1) t ON institution_campus.institution_id = t.institution_id AND
                                                 institution_campus.federal_institution_code IS NOT NULL) j
WHERE institution.id = j.institution_id

UPDATE sfa.institution
SET federal_institution_code = NULL
WHERE federal_institution_code = 'ZZZZ'


-- SFAADMIN.ABORIGINAL_STATUS
SET IDENTITY_INSERT sfa.aboriginal_status ON

INSERT
INTO sfa.aboriginal_status (id, description, is_active, nars_status_id, sort_order)
SELECT aboriginal_status_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END, nars_status_id,
       COALESCE(sort_order, 99)
FROM sfaadmin.aboriginal_status

SET IDENTITY_INSERT sfa.aboriginal_status OFF

-- SFAADMIN.AGE_DISTRIBUTION
SET IDENTITY_INSERT sfa.age_distribution ON

INSERT
INTO sfa.age_distribution (id, start_age, end_age)
SELECT age_distribution_id, start_age, end_age
FROM sfaadmin.age_distribution

SET IDENTITY_INSERT sfa.age_distribution OFF

-- SFAADMIN.AGENCY
SET IDENTITY_INSERT sfa.agency ON

INSERT
INTO sfa.agency (id, description, is_active)
SELECT agency_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.agency

SET IDENTITY_INSERT sfa.agency OFF

-- SFAADMIN.APPLICATION_TYPE
SET IDENTITY_INSERT sfa.application_type ON

INSERT
INTO sfa.application_type (id, description, is_active)
SELECT application_type_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.application_type

SET IDENTITY_INSERT sfa.application_type OFF

-- SFAADMIN.ASSESSMENT_TYPE
SET IDENTITY_INSERT sfa.assessment_type ON

INSERT
INTO sfa.assessment_type (id, description, is_active)
SELECT assessment_type_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.assessment_type

SET IDENTITY_INSERT sfa.assessment_type OFF

-- SFAADMIN.BATCH_GROUP
SET IDENTITY_INSERT sfa.batch_group ON

INSERT
INTO sfa.batch_group (id, description, prefix, is_active)
SELECT batch_group_id, description, batch_group_prefix, 1
FROM sfaadmin.batch_group

SET IDENTITY_INSERT sfa.batch_group OFF

-- SFAADMIN.BATCH_PARAMETER
SET IDENTITY_INSERT sfa.batch_parameter ON

INSERT
INTO sfa.batch_parameter (id, description, user_description, is_active)
SELECT batch_parameter_id, description, user_description, 1
FROM sfaadmin.batch_parameter

SET IDENTITY_INSERT sfa.batch_parameter OFF

-- SFAADMIN.CATEGORY
SET IDENTITY_INSERT sfa.category ON

INSERT
INTO sfa.category (id, description, is_active)
SELECT category_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.category

SET IDENTITY_INSERT sfa.category OFF

-- SFAADMIN.CHANGE_REASON
SET IDENTITY_INSERT sfa.change_reason ON

INSERT
INTO sfa.change_reason (id, description, is_active)
SELECT change_reason_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.change_reason

SET IDENTITY_INSERT sfa.change_reason OFF

-- SFAADMIN.CHILD_CARE_CEILING
INSERT
INTO sfa.child_care_ceiling (academic_year_id, province_id, max_amount)
SELECT academic_year.id, province_id, max_amt
FROM sfaadmin.child_care_ceiling
         INNER JOIN sfa.academic_year ON (child_care_ceiling.academic_year = academic_year.id)

-- SFAADMIN.COMUNICATION_TYPE
SET IDENTITY_INSERT sfa.communication_type ON

INSERT
INTO sfa.communication_type (id, description, is_active)
SELECT communication_type_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.communication_type

SET IDENTITY_INSERT sfa.communication_type OFF

-- SFAADMIN.CSG_LOOKUP
INSERT
INTO sfa.csg_lookup (academic_year_id, csg_8_month_amount, csg_dep_monthly_amount, csg_pd_yearly_amount,
                     csg_pdse_yearly_amount, csgpt_yearly_amount, csgpt_dep_max_amount, csgpt_dep_1_2_weekly_amount,
                     csgpt_dep_3_weekly_amount)
SELECT academic_year, csg_8_month_amt, csg_dep_monthly_amt, csg_pd_yearly_amt, csg_pdse_yearly_amt, csgpt_yearly_amt,
       csgpt_dep_max_amt, csgpt_dep_1_2_weekly_amt, csgpt_dep_3_weekly_amt
FROM sfaadmin.csg_lookup

-- SFAADMIN.CSG_THRESHOLD
INSERT
INTO sfa.csg_threshold (academic_year_id, family_size, income_threshold, income_cutoff, phase_out_rate,
                        low_income_threshold, middle_income_threshold, csgpt_phase_out_rate, csgpt_dep2_phase_out_rate,
                        csgpt_dep3_phase_out_rate, csgft_dep_phase_out_rate)
SELECT academic_year, family_size, income_threshold, income_cutoff, phase_out_rate, low_income_threshold,
       middle_income_threshold, csgpt_phase_out_rate, csg_ptdep2_phase_out_rate, csg_ptdep3_phase_out_rate,
       csg_ftdep_phase_out_rate
FROM sfaadmin.csg_threshold

-- SFAADMIN.CSL_CODE
SET IDENTITY_INSERT sfa.csl_code ON

INSERT
INTO sfa.csl_code (id, warning_code, reason_code, code_type, definition, is_active)
SELECT csl_code_id, warning_code, reason_code, code_type, definition, CASE WHEN is_active_flg = 'Yes' THEN 1 ELSE 0 END
FROM sfaadmin.csl_code

SET IDENTITY_INSERT sfa.csl_code OFF

-- SFAADMIN.CSL_LOOKUP
INSERT
INTO sfa.csl_lookup (academic_year_id, return_transport_max_amount, allowable_weekly_amount, student_exempt_amount,
                     vehicle_deduction_amount, rrsp_deduction_yearly_amount, relocation_max_amount, mileage_rate,
                     discretionary_costs_max_amount, merit_exempt_amount, books_max_amount, student_contrib_percent,
                     spouse_contrib_percent, csg_8_month_amount, csg_pt_yearly_amount,
                     low_income_student_contrib_amount, student_contrib_max_amount, csl_pt_max_amount,
                     csl_pt_wk_misc_amount)
SELECT [ACADEMIC_YEAR], [MAX_RETURN_TRANSPORT], [MAX_WEEKLY_ALLOWABLE], [STUDENT_EXEMPT_AMT], [VEHICLE_DEDUCTION],
       [RRSP_YEARLY_DEDUCTION], [MAX_RELOCATION], [MILEAGE_RATE], [DISCRETIONARY_COSTS_MAX], [MERIT_EXEMPT_AMT],
       [MAX_BOOKS], [STUDENT_CONTRIB_PCT], [SPOUSE_CONTRIB_PCT], [CSG_8_MONTH_AMT], [CSG_PT_YEARLY_AMT],
       [LOW_INCOME_STUDENT_CONTRIB], [MAX_STUDENT_CONTRIB], [CSL_PT_MAX_AMOUNT], [CSL_PT_WK_MISC_AMT]
FROM sfaadmin.csl_lookup

-- SFAADMIN.CSL_NSLSC_ADDRESS
SET IDENTITY_INSERT sfa.csl_nslsc_address ON

INSERT
INTO sfa.csl_nslsc_address (id, institution_type, name, address_line_1, address_line_2, city_id, province_id,
                            postal_code, phone_number, effective_date, expiry_date)
SELECT [CSL_NSLSC_ADDRESS_ID], CASE WHEN [INSTITUTION_TYPE_ID] = 1 THEN 'Public' ELSE 'Private' END, [NAME],
       [ADDRESS_LINE_1], [ADDRESS_LINE_2], [CITY_ID], [PROVINCE_ID], [POSTAL_CODE], [PHONE_NUMBER], [EFFECTIVE_DATE],
       [EXPIRY_DATE]
FROM sfaadmin.csl_nslsc_address

SET IDENTITY_INSERT sfa.csl_nslsc_address OFF

-- SFAADMIN.CSL_REASON
SET IDENTITY_INSERT sfa.csl_reason ON

INSERT
INTO sfa.csl_reason (id, type, name, description)
SELECT csl_reason_id, csl_reason_type, csl_reason_name, csl_reason
FROM sfaadmin.csl_reason

SET IDENTITY_INSERT sfa.csl_reason OFF

-- SFAADMIN.CSL_RESTRICTED
SET IDENTITY_INSERT sfa.csl_restricted ON

INSERT
INTO sfa.csl_restricted (id, amount_disbursed, birth_date, first_name, last_name, over_award, restriction_reason_id,
                         restriction_warn_id, weeks_accumulated, nslsc_restrict1, nslsc_restrict2, nslsc_restrict3,
                         calsc_restrict1, calsc_restrict2, calsc_restrict3, fi_restrict1)
SELECT csl_restricted_id, [AMOUNT_DISBURSED], [BIRTH_DATE], [FIRST_NAME], [LAST_NAME], [OVER_AWARD],
       [RESTRICTION_REASON_ID], [RESTRICTION_WARN_ID], [WEEKS_ACCUMULATED], [NSLSC_RESTRICT1], [NSLSC_RESTRICT2],
       [NSLSC_RESTRICT3], [CALSC_RESTRICT1], [CALSC_RESTRICT2], [CALSC_RESTRICT3], [FI_RESTRICT1]
FROM sfaadmin.csl_restricted

SET IDENTITY_INSERT sfa.csl_restricted OFF

-- SFAADMIN.DISAB_SERVICE_TYPE
SET IDENTITY_INSERT sfa.disability_service ON

INSERT
INTO sfa.disability_service (id, description, is_active)
SELECT disab_service_type_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.disab_service_type

SET IDENTITY_INSERT sfa.disability_service OFF

-- SFAADMIN.DISABILITY_TYPE
SET IDENTITY_INSERT sfa.disability_type ON

INSERT
INTO sfa.disability_type (id, description, csl_code, is_active)
SELECT disability_type_id, description, csl_code, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.disability_type

SET IDENTITY_INSERT sfa.disability_type OFF

-- SFAADMIN.DISBURSEMENT_TYPE
SET IDENTITY_INSERT sfa.disbursement_type ON

INSERT
INTO sfa.disbursement_type (id, description, is_active)
SELECT disbursement_type_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.disbursement_type

SET IDENTITY_INSERT sfa.disbursement_type OFF

-- SFAADMIN.EDUCATION_LEVEL
SET IDENTITY_INSERT sfa.education_level ON

INSERT
INTO sfa.education_level (id, description, rank, is_active)
SELECT education_level_id, description, rank, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.education_level

SET IDENTITY_INSERT sfa.education_level OFF

-- SFAADMIN.ENTITLEMENT_ERROR_CODES
INSERT
INTO sfa.entitlement_error_codes (code, description, is_confirmed, is_in_feedback, is_resend)
SELECT error_code, error_desc, CASE WHEN confirmed_unconfirmed = 'C' THEN 1 ELSE 0 END,
       CASE WHEN is_in_feedback_flg = 'Yes' THEN 1 ELSE 0 END, CASE WHEN is_resend_flg = 'Yes' THEN 1 ELSE 0 END
FROM sfaadmin.entitlement_error_codes

-- SFAADMIN.FIRST_NATION
SET IDENTITY_INSERT sfa.first_nation ON

INSERT
INTO sfa.first_nation (id, description, city_id, is_active)
SELECT first_nation_id, first_nation_desc, city_id, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.first_nation

SET IDENTITY_INSERT sfa.first_nation OFF

-- SFAADMIN.FUNDING_GROUP
SET IDENTITY_INSERT sfa.funding_group ON

INSERT
INTO sfa.funding_group (id, description, sort_order, is_active)
SELECT funding_group_id, description, sort_order, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.funding_group

SET IDENTITY_INSERT sfa.funding_group OFF

-- SFAADMIN.HIGH_SCHOOL
SET IDENTITY_INSERT sfa.high_school ON

INSERT
INTO sfa.high_school (id, name, city_id, province_id, country_id, is_active)
SELECT high_school_id, name, city_id, province_id, country_id, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.high_school

SET IDENTITY_INSERT sfa.high_school OFF

-- SFAADMIN.INFO_CATEGORY
SET IDENTITY_INSERT sfa.info_category ON

INSERT
INTO sfa.info_category (id, canvas_name, category_name, sort_order, first_item, is_active)
SELECT info_category_id, canvas_name, category_name, sort_order, first_item, 1
FROM sfaadmin.info_category

SET IDENTITY_INSERT sfa.info_category OFF

-- SFAADMIN.INSTRUCTION_TYPE
SET IDENTITY_INSERT sfa.instruction_type ON

INSERT
INTO sfa.instruction_type (id, description, is_active)
SELECT instruction_type_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.instruction_type

SET IDENTITY_INSERT sfa.instruction_type OFF

-- SFAADMIN.INVESTMENT_TYPE
SET IDENTITY_INSERT sfa.investment_type ON

INSERT
INTO sfa.investment_type (id, description, is_active)
SELECT investment_type_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.investment_type

SET IDENTITY_INSERT sfa.investment_type OFF

-- SFAADMIN.LANGUAGE
SET IDENTITY_INSERT sfa.language ON

INSERT
INTO sfa.language (id, description, is_active)
SELECT language_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.language

SET IDENTITY_INSERT sfa.language OFF

-- SFAADMIN.MARITAL_STATUS
SET IDENTITY_INSERT sfa.marital_status ON

INSERT
INTO sfa.marital_status (id, description, is_active)
SELECT marital_status_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.marital_status

SET IDENTITY_INSERT sfa.marital_status OFF

-- SFAADMIN.OWNERSHIP
SET IDENTITY_INSERT sfa.ownership ON

INSERT
INTO sfa.ownership (id, description, is_active)
SELECT ownership_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.ownership

SET IDENTITY_INSERT sfa.ownership OFF

-- SFAADMIN.PARENT_CONTRIBUTION_FORMULA
INSERT
INTO sfa.parent_contribution_formula (academic_year_id, income_from_amount, income_to_amount, add_amount, percentage,
                                      subtract_amount, divide_by)
SELECT academic_year, d_income_from, d_income_to, add_amt, [PERCENT], subtract_amt, divide_by
FROM sfaadmin.parent_contribution_formula

-- SFAADMIN.PART_TIME_REASON
SET IDENTITY_INSERT sfa.part_time_reason ON

INSERT
INTO sfa.part_time_reason (id, description, is_active)
SELECT part_time_reason_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.part_time_reason

SET IDENTITY_INSERT sfa.part_time_reason OFF

-- SFAADMIN.PERIOD
SET IDENTITY_INSERT sfa.period ON

INSERT
INTO sfa.period (id, description, is_active)
SELECT period_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.period

SET IDENTITY_INSERT sfa.period OFF

-- SFAADMIN.PORTAL_STATUS
SET IDENTITY_INSERT sfa.portal_status ON

INSERT
INTO sfa.portal_status (id, description, is_active)
SELECT portal_status_id, status_desc, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.portal_status

SET IDENTITY_INSERT sfa.portal_status OFF

-- SFAADMIN.PRESTUDY_EMPLOY_STATUS
SET IDENTITY_INSERT sfa.prestudy_employment_status ON

INSERT
INTO sfa.prestudy_employment_status (id, description, is_active)
SELECT prestudy_employ_status_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.prestudy_employ_status

SET IDENTITY_INSERT sfa.prestudy_employment_status OFF

-- SFAADMIN.PRESTUDY_TAX_RATE
INSERT
INTO sfa.prestudy_tax_rate (academic_year_id, from_income_amount, to_income_amount, prestudy_tax_rate)
SELECT academic_year, income_from, income_to, prestudy_tax_rate
FROM sfaadmin.prestudy_tax_rate

-- SFAADMIN.PROGRAM
SET IDENTITY_INSERT sfa.program ON

INSERT
INTO sfa.program (id, description, education_level_id, is_active)
SELECT program_id, description, education_level, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.program

SET IDENTITY_INSERT sfa.program OFF

-- SFAADMIN.RELATIONSHIP
SET IDENTITY_INSERT sfa.relationship ON

INSERT
INTO sfa.relationship (id, description, is_active)
SELECT relationship_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.relationship

SET IDENTITY_INSERT sfa.relationship OFF

-- SFAADMIN.REPORT_EXPENSE_CATEGORY
SET IDENTITY_INSERT sfa.report_expense_category ON

INSERT
INTO sfa.report_expense_category (id, description, is_active)
SELECT report_expense_category_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.report_expense_category

SET IDENTITY_INSERT sfa.report_expense_category OFF

-- SFAADMIN.REQUIREMENT_TYPE
SET IDENTITY_INSERT sfa.requirement_type ON

INSERT
INTO sfa.requirement_type (id, description, is_active, document_location, show_online)
SELECT requirement_type_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END, document_location,
       CASE WHEN show_online = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.requirement_type

SET IDENTITY_INSERT sfa.requirement_type OFF

-- SFAADMIN.SFA_DOCUMENT_LINK
SET IDENTITY_INSERT sfa.sfa_document_link ON

INSERT
INTO sfa.sfa_document_link (id, description, is_active, document_location, sort_order)
SELECT sfa_document_link_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END, document_location, sort_order
FROM sfaadmin.sfa_document_link
WHERE is_active_flg = 'Y'

SET IDENTITY_INSERT sfa.sfa_document_link OFF

-- SFAADMIN.SPOUSE_TAX_RATE
INSERT
INTO sfa.spouse_tax_rate (academic_year_id, province_id, from_income_amount, to_income_amount, tax_rate)
SELECT academic_year, province_id, income_from, income_to, spouse_tax_rate
FROM sfaadmin.spouse_tax_rate

-- SFAADMIN.STA_LOOKUP
INSERT
INTO sfa.sta_lookup (academic_year_id, dependent_0_amount, dependent_1_amount, dependent_2_amount, dependent_3_amount,
                     dependent_4_amount, second_residence_amount)
SELECT academic_year, dependent_zero, dependent_one, dependent_two, dependent_three, dependent_four, second_residence
FROM sfaadmin.sta_lookup

-- SFAADMIN.STANDARD_OF_LIVING
INSERT
INTO sfa.standard_of_living (academic_year_id, province_id, family_size, standard_living_amount)
SELECT academic_year, province_id, family_size, standard_living_amt
FROM sfaadmin.standard_of_living
ORDER BY 1, 2, 3

-- SFAADMIN.STATUS
SET IDENTITY_INSERT sfa.status ON

INSERT
INTO sfa.status (id, description, is_active, sort_order, online_description)
SELECT status_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END, sort, online_description
FROM sfaadmin.status

SET IDENTITY_INSERT sfa.status OFF

-- SFAADMIN.STATUS_REASON
SET IDENTITY_INSERT sfa.status_reason ON

INSERT
INTO sfa.status_reason (id, status_id, description, is_active)
SELECT status_reason_id, status_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.status_reason

SET IDENTITY_INSERT sfa.status_reason OFF

-- SFAADMIN.STUDENT_CATEGORY
INSERT
INTO sfa.student_category (code, description, is_active)
SELECT student_category_code, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.student_category

-- SFAADMIN.STUDENT_CONTRIBUTION
INSERT
INTO sfa.student_contribution (academic_year_id, province_id, period_id, student_category_id, contribution_amount)
SELECT academic_year, province_id, period_id, student_category.id, contribution_amount
FROM sfaadmin.student_contribution
         INNER JOIN sfa.student_category ON student_contribution.student_category_code = student_category.code

-- SFAADMIN.STUDENT_LIVING_ALLOWANCE
INSERT
INTO sfa.student_living_allowance (academic_year_id, province_id, student_category_id, shelter_amount, food_amount,
                                   misc_amount, public_tranport_amount)
SELECT academic_year, province_id, student_category.id, shelter_amount, food_amount, misc_amount, public_trans_amount
FROM sfaadmin.student_living_allowance
         INNER JOIN sfa.student_category ON student_living_allowance.student_category_code = student_category.code

-- SFAADMIN.STUDY_FIELD
SET IDENTITY_INSERT sfa.study_field ON

INSERT
INTO sfa.study_field (id, description, is_active)
SELECT study_field_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.study_field

SET IDENTITY_INSERT sfa.study_field OFF

-- SFAADMIN.STUDY_AREA
SET IDENTITY_INSERT sfa.study_area ON

INSERT
INTO sfa.study_area (id, study_field_id, description, show_online, is_active)
SELECT study_area_id, study_field_id, description, CASE WHEN show_online = 'Y' THEN 1 ELSE 0 END,
       CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.study_area

SET IDENTITY_INSERT sfa.study_area OFF

-- SFAADMIN.STUDY_TAX_RATE
INSERT
INTO sfa.study_tax_rate (academic_year_id, from_income_amount, to_income_amount, study_tax_rate)
SELECT academic_year, income_from, income_to, study_tax_rate
FROM sfaadmin.study_tax_rate

-- SFAADMIN.SYSTEM_DEP_PARAMS
INSERT
INTO sfa.system_dep_params (dependent_count, weekly_amount)
SELECT dependent_count, weekly_rate
FROM sfaadmin.system_dep_params

-- SFAADMIN.SYSTEM_PARAMETER
SET IDENTITY_INSERT sfa.system_parameter ON

INSERT
INTO sfa.system_parameter (id, second_residence_rate, weekly_rate, academic_start_year, csl_max_weekly_amount,
                           minister_name, financial_batch_id_start, financial_batch_id_end, financial_batch_id_year,
                           previous_fin_batch_id_start, previous_fin_batch_id_end, previous_fin_batch_id_year,
                           last_online_expire_date, last_msfaa_sent_date, last_msfaa_sent_seq_num,
                           msfaa_enclosed_approval_text, msfaa_not_encl_approval_text, monthly_board_change_date,
                           arial_ttf_directory, letterhead_tray, yg_quarter_weeks, yg_semester_weeks, yg_approval_text,
                           director_name_position, director_email, director_phone, environment, cslft_msfaa_text)
SELECT system_parameter_id, second_residence_rate, weekly_rate, academic_start_year, csl_max_weekly_amount,
       minister_name, financial_batch_id_start, financial_batch_id_end, financial_batch_id_year,
       previous_fin_batch_id_start, previous_fin_batch_id_end, previous_fin_batch_id_year, last_online_expire_date,
       last_msfaa_sent_date, last_msfaa_sent_seq_num, msfaa_enclosed_approval_text, msfaa_not_encl_approval_text,
       monthly_board_change_date, arial_ttf_directory, letterhead_tray, yg_quarter_weeks, yg_semester_weeks,
       yg_approval_text, director_name_position, director_email, director_phone, environment, cslft_msfaa_text
FROM sfaadmin.system_parameter

SET IDENTITY_INSERT sfa.system_parameter OFF

-- SFAADMIN.TRANSPORTATION
SET IDENTITY_INSERT sfa.transportation ON

INSERT
INTO sfa.transportation (id, home_city_id, institution_city_id, travel_allowance_amount, airfare_amount)
SELECT transportation_id, home_city_id, institution_city_id, travel_allowance, airfare
FROM sfaadmin.transportation

SET IDENTITY_INSERT sfa.transportation OFF

-- SFAADMIN.VERIFICATION_LOG
SET IDENTITY_INSERT sfa.verification_log ON

INSERT
INTO sfa.verification_log (id, institution_campus_id, is_emailed, student_count)
SELECT verification_log_id, institution_id, CASE WHEN emailed_flg = 'Yes' THEN 1 ELSE 0 END, student_count
FROM sfaadmin.verification_log

SET IDENTITY_INSERT sfa.verification_log OFF

-- SFAADMIN.YEA
INSERT
INTO sfa.yea (first_name, last_name, birth_date, yukon_id, yukon_id_old, school_year, school_month, course, yea_amount)
SELECT fname, lname, birth_dt, ytid, old_ytid, schoolyr, schoolmn, course, yea_amnt
FROM sfaadmin.yea

-- SFAADMIN.YEA_UPDATE
INSERT
INTO sfa.yea_update (first_name, last_name, birth_date, yukon_id, school_year, school_month, course, yea_amount,
                     orig_yea_amount)
SELECT fname, lname, birth_dt, ytid, schoolyr, schoolmn, course, yea_amnt, orig_yea_amnt
FROM sfaadmin.yea_update

-- SFAADMIN.YG_COST
SET IDENTITY_INSERT sfa.yg_cost ON

INSERT
INTO sfa.yg_cost (id, academic_year_id, effective_date, expiry_date, semester_living_amount, semester_tuition_amount,
                  semester_book_amount, quarter_living_amount, quarter_tuition_amount, quarter_book_amount,
                  weekly_amount, allowed_percent)
SELECT yg_cost_id, academic_year, effective_date, expiry_date, semester_living_amt, semester_tuition_amt,
       semester_book_amt, quarter_living_amt, quarter_tuition_amt, quarter_book_amt, weekly_amount, allowed_percent
FROM sfaadmin.yg_cost

SET IDENTITY_INSERT sfa.yg_cost OFF

-- SFA.ADDRESS_TYPE
SET IDENTITY_INSERT sfa.address_type ON
INSERT
INTO sfa.address_type (id, description)
VALUES (1, 'Home'),
       (2, 'Mailing'),
       (3, 'School'),
       (4, 'Parent')
SET IDENTITY_INSERT sfa.address_type OFF

SET NOCOUNT ON

DECLARE @s_student_id FLOAT, @s_first_name VARCHAR(30), @s_last_name VARCHAR(30), @s_initials VARCHAR(5), @s_vendor_id VARCHAR(25), @s_yukon_id VARCHAR(15), @s_sin FLOAT, @s_national_id VARCHAR(50), @s_csl_letter_date DATETIME2(0), @s_csl_warn_code VARCHAR(1), @s_language_id FLOAT, @s_birth_date DATETIME2(0), @s_home_address1 VARCHAR(100), @s_home_address2 VARCHAR(100), @s_birth_city_id FLOAT, @s_birth_country_id FLOAT, @s_home_city_id FLOAT, @s_birth_province_id FLOAT, @s_home_province_id FLOAT, @s_home_country_id FLOAT, @s_home_phone VARCHAR(24), @s_home_postal_code VARCHAR(15), @s_home_email VARCHAR(50), @s_locator_number VARCHAR(15), @s_mailing_address1 VARCHAR(100), @s_mailing_address2 VARCHAR(100), @s_mailing_city_id FLOAT, @s_mailing_province_id FLOAT, @s_mailing_country_id FLOAT, @s_mailing_postal_code VARCHAR(15), @s_pre_funded_year NUMERIC(4, 0), @s_pre_funding_years_used FLOAT, @s_school_email VARCHAR(50), @s_school_phone VARCHAR(24), @s_created_by VARCHAR(30), @s_created_date DATETIME2(0), @s_updated_by VARCHAR(30), @s_updated_date DATETIME2(0), @s_high_school_final_grade VARCHAR(15), @s_parent_mailing_address1 VARCHAR(100), @s_arent_mailing_address2 VARCHAR(100), @s_parent_mailing_city_id FLOAT, @s_parent_mailing_province_id FLOAT, @s_parent_mailing_country_id FLOAT, @s_parent_mailing_postal_code VARCHAR(15), @s_parent_telephone VARCHAR(24), @s_pre_over_award NUMERIC(8, 2), @s_pre_yea_awards_used NUMERIC(8, 2), @s_education_level_id FLOAT, @s_high_school_id FLOAT, @s_high_school_left_year NUMERIC(4, 0), @s_high_school_left_month NUMERIC(2, 0), @s_sex FLOAT, @s_spouse_hs_end_month NUMERIC(2, 0), @s_spouse_hs_end_year NUMERIC(4, 0), @s_user_name VARCHAR(100), @s_user_password VARCHAR(255), @s_is_active_flg VARCHAR(1), @s_is_first_logon_flg VARCHAR(1), @s_last_pw_chg_date DATETIME2(0), @s_last_logon_date DATETIME2(0), @s_previous_last_name VARCHAR(30), @s_yea_expiry_date DATETIME2(0), @s_adj_yg_funding_weeks FLOAT, @s_adj_sta_upgrading_weeks FLOAT, @s_adj_outside_travel_cnt FLOAT, @s_checked_for_ytid_flg VARCHAR(3), @s_indigenous_learner VARCHAR(25), @s_crown_ward_flg VARCHAR(3);

DECLARE @s_home_address_id INT, @s_mail_address_id INT, @s_person_id INT, @s_parent1_id INT, @s_parent2_id INT, @s_parent_address_id INT;

DECLARE student_cursor CURSOR FOR SELECT *
FROM sfaadmin.student
OPEN student_cursor;

FETCH NEXT FROM student_cursor INTO @s_student_id, @s_first_name, @s_last_name, @s_initials, @s_vendor_id, @s_yukon_id, @s_sin , @s_national_id, @s_csl_letter_date, @s_csl_warn_code, @s_language_id, @s_birth_date, @s_home_address1, @s_home_address2, @s_birth_city_id, @s_birth_country_id, @s_home_city_id, @s_birth_province_id, @s_home_province_id, @s_home_country_id, @s_home_phone, @s_home_postal_code, @s_home_email, @s_locator_number, @s_mailing_address1, @s_mailing_address2, @s_mailing_city_id, @s_mailing_province_id, @s_mailing_country_id, @s_mailing_postal_code, @s_pre_funded_year, @s_pre_funding_years_used, @s_school_email, @s_school_phone, @s_created_by, @s_created_date, @s_updated_by, @s_updated_date, @s_high_school_final_grade, @s_parent_mailing_address1, @s_arent_mailing_address2, @s_parent_mailing_city_id, @s_parent_mailing_province_id, @s_parent_mailing_country_id, @s_parent_mailing_postal_code, @s_parent_telephone, @s_pre_over_award, @s_pre_yea_awards_used, @s_education_level_id, @s_high_school_id, @s_high_school_left_year, @s_high_school_left_month, @s_sex, @s_spouse_hs_end_month, @s_spouse_hs_end_year, @s_user_name, @s_user_password, @s_is_active_flg, @s_is_first_logon_flg, @s_last_pw_chg_date, @s_last_logon_date, @s_previous_last_name, @s_yea_expiry_date, @s_adj_yg_funding_weeks, @s_adj_sta_upgrading_weeks, @s_adj_outside_travel_cnt, @s_checked_for_ytid_flg, @s_indigenous_learner, @s_crown_ward_flg;

WHILE @@FETCH_STATUS = 0 BEGIN
    -- create the student person
    INSERT
    INTO sfa.person (language_id, sex_id, birth_city_id, birth_province_id, birth_country_id,
                     first_name, last_name, initials, previous_last_name, sin, birth_date, telephone, email)
    VALUES (@s_language_id, @s_sex, @s_birth_city_id, @s_birth_province_id, @s_birth_country_id,
            @s_first_name, @s_last_name, @s_initials, @s_previous_last_name, LTRIM(STR(@s_sin, 15, 0)), @s_birth_date, @s_home_phone,
            @s_home_email)

    SELECT @s_person_id = SCOPE_IDENTITY();

    -- create the home address
    INSERT
    INTO sfa.person_address (person_id, address_type_id, address1, address2, city_id, province_id, country_id,
                             postal_code)
    VALUES (@s_person_id, 1, @s_home_address1, @s_home_address2, @s_home_city_id, @s_home_province_id,
            @s_home_country_id, @s_home_postal_code)

    SELECT @s_home_address_id = SCOPE_IDENTITY();

    -- create the mailing address
    INSERT
    INTO sfa.person_address (person_id, address_type_id, address1, address2, city_id, province_id, country_id,
                             postal_code)
    VALUES (@s_person_id, 2, @s_mailing_address1, @s_mailing_address2, @s_mailing_city_id, @s_mailing_province_id,
            @s_mailing_country_id, @s_mailing_postal_code)

    SELECT @s_mail_address_id = SCOPE_IDENTITY();

    -- create the parent address
    INSERT
    INTO sfa.person_address (person_id, address_type_id, address1, city_id, province_id, country_id, postal_code)
    VALUES (@s_person_id, 4, @s_parent_mailing_address1, @s_parent_mailing_city_id, @s_parent_mailing_province_id,
            @s_parent_mailing_country_id, @s_parent_mailing_postal_code)

    SELECT @s_parent_address_id = SCOPE_IDENTITY();

    SET IDENTITY_INSERT sfa.student ON
    INSERT
    INTO sfa.student(id, person_id, high_school_id, education_level_id, indigenous_learner_id, vendor_id, yukon_id,
                     checked_for_yukon_id,
                     national_id, locator_number, is_crown_ward, high_school_final_grade, high_school_left_year,
                     high_school_left_month, pre_funded_year,
                     pre_funding_years_used, csl_letter_date, csl_warn_code, pre_over_award_amount,
                     pre_yea_awards_used_amount, user_name, user_password, is_active,
                     is_first_logon_flg, last_logon_date, last_pw_change_date, yea_expiry_date, adj_yg_funding_weeks,
                     adj_sta_upgrading_weeks, adj_outside_travel_cnt)
    VALUES (@s_student_id, @s_person_id, @s_high_school_id, @s_education_level_id,
            CASE WHEN @s_indigenous_learner = 'Yes' THEN 1
                 WHEN @s_indigenous_learner = 'No' THEN 2
                 WHEN @s_indigenous_learner = 'Prefer Not to Say' THEN 3
                 ELSE -1 END, @s_vendor_id,
            @s_yukon_id, CASE WHEN @s_checked_for_ytid_flg = 'Yes' THEN 1 ELSE 0 END,
            @s_national_id, @s_locator_number, CASE WHEN @s_crown_ward_flg = 'Y' THEN 1 ELSE 0 END,
            @s_high_school_final_grade, @s_high_school_left_year, @s_high_school_left_month, @s_pre_funded_year,
            @s_pre_funding_years_used, @s_csl_letter_date, @s_csl_warn_code, @s_pre_over_award, @s_pre_yea_awards_used,
            @s_user_name, @s_user_password, CASE WHEN @s_is_active_flg = 'Y' THEN 1 ELSE 0 END,
            @s_is_first_logon_flg, @s_last_logon_date, @s_last_pw_chg_date, @s_yea_expiry_date, @s_adj_yg_funding_weeks,
            @s_adj_sta_upgrading_weeks, @s_adj_outside_travel_cnt)

    SET IDENTITY_INSERT sfa.student OFF

    FETCH NEXT FROM student_cursor INTO @s_student_id, @s_first_name, @s_last_name, @s_initials, @s_vendor_id, @s_yukon_id, @s_sin , @s_national_id, @s_csl_letter_date, @s_csl_warn_code, @s_language_id, @s_birth_date, @s_home_address1, @s_home_address2, @s_birth_city_id, @s_birth_country_id, @s_home_city_id, @s_birth_province_id, @s_home_province_id, @s_home_country_id, @s_home_phone, @s_home_postal_code, @s_home_email, @s_locator_number, @s_mailing_address1, @s_mailing_address2, @s_mailing_city_id, @s_mailing_province_id, @s_mailing_country_id, @s_mailing_postal_code, @s_pre_funded_year, @s_pre_funding_years_used, @s_school_email, @s_school_phone, @s_created_by, @s_created_date, @s_updated_by, @s_updated_date, @s_high_school_final_grade, @s_parent_mailing_address1, @s_arent_mailing_address2, @s_parent_mailing_city_id, @s_parent_mailing_province_id, @s_parent_mailing_country_id, @s_parent_mailing_postal_code, @s_parent_telephone, @s_pre_over_award, @s_pre_yea_awards_used, @s_education_level_id, @s_high_school_id, @s_high_school_left_year, @s_high_school_left_month, @s_sex, @s_spouse_hs_end_month, @s_spouse_hs_end_year, @s_user_name, @s_user_password, @s_is_active_flg, @s_is_first_logon_flg, @s_last_pw_chg_date, @s_last_logon_date, @s_previous_last_name, @s_yea_expiry_date, @s_adj_yg_funding_weeks, @s_adj_sta_upgrading_weeks, @s_adj_outside_travel_cnt, @s_checked_for_ytid_flg, @s_indigenous_learner, @s_crown_ward_flg;
END;

CLOSE student_cursor;
DEALLOCATE student_cursor;

SET NOCOUNT OFF

-- SFAADMIN.STUDENT_CONSENT
SET IDENTITY_INSERT sfa.student_consent ON

INSERT
INTO sfa.student_consent (id, student_id, start_academic_year_id, end_academic_year_id, consent_person, consent_sfa,
                          consent_csl)
SELECT student_consent_id, student_id, academic_year_start, academic_year_end, consent_person,
       CASE WHEN consent_sfa_flg = 'Yes' THEN 1 ELSE 0 END, CASE WHEN consent_csl_flg = 'Yes' THEN 1 ELSE 0 END
FROM sfaadmin.student_consent
WHERE academic_year_start != 0

SET IDENTITY_INSERT sfa.student_consent OFF

-- SFAADMIN.RESIDENCE
SET IDENTITY_INSERT sfa.residence ON

INSERT
INTO sfa.residence (id, student_id, address, city_id, province_id, country_id, postal_code, in_school, from_year,
                    from_month, to_year, to_month, is_in_progress)
SELECT residence_id, student_id, address, city_id, province_id, country_id, postal_code, in_school, from_year,
       from_month, to_year, to_month, CASE WHEN is_in_progress_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.residence

SET IDENTITY_INSERT sfa.residence OFF

-- SFAADMIN.REQUEST_TYPE
SET IDENTITY_INSERT sfa.request_type ON

INSERT
INTO sfa.request_type (id, application_type_id, funding_group_id, batch_group_id, description, scholarship_flag,
                       application_deadline, regulation, program_type, static_description_flag, financial_coding,
                       t4a_required, csg_other_flag, gl_budget, auto_appear, show_online, short_name, help_url,
                       help_text)
SELECT request_type_id, application_type_id, funding_group_id, batch_group_id, description,
       scholarship_flag, application_deadline, regulation, program_type, static_description_flag, financial_coding,
       CASE WHEN t4a_required_flag = 1 THEN 1 ELSE 0 END, csg_other_flag, gl_budget, auto_appear,
       CASE WHEN show_online = 'Y' THEN 1 ELSE 0 END, short_name, help_url, help_text
FROM sfaadmin.request_type

SET IDENTITY_INSERT sfa.request_type OFF

-- SFAADMIN.REQUEST_REQUIREMENT
INSERT
INTO sfa.request_requirement (request_type_id, requirement_type_id, condition)
SELECT request_type_id, requirement_type_id, condition
FROM sfaadmin.request_requirement

-- SFAADMIN.INSTITUTION_REQUEST_TYPE
INSERT
INTO sfa.institution_request_type (institution_campus_id, request_type_id)
SELECT institution_id, request_type_id
FROM sfaadmin.institution_request_type

-- SFAADMIN.EXPENESE_CATEGORY
SET IDENTITY_INSERT sfa.expense_category ON

INSERT
INTO sfa.expense_category (id, report_expense_category_id, description, is_active)
SELECT expense_category_id, report_expense_category_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.expense_category

SET IDENTITY_INSERT sfa.expense_category OFF

-- SFAADMIN.EDUCATION
SET IDENTITY_INSERT sfa.education ON

INSERT
INTO sfa.education (id, student_id, institution_campus_id, study_area_id, from_year, from_month, to_year, to_month,
                    is_in_progress)
SELECT education_id, student_id, institution_id, study_area_id, from_year, from_month, to_year, to_month,
       CASE WHEN is_in_progress_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.education

SET IDENTITY_INSERT sfa.education OFF

-- SFAADMIN.DEPENDENT
SET IDENTITY_INSERT sfa.dependent ON

INSERT
INTO sfa.dependent (id, student_id, relationship_id, first_name, last_name, comments, birth_date, is_in_progress,
                    is_conversion, is_disability)
SELECT dependent_id, student_id, relationship_id, first_name, last_name, comments, birth_date,
       CASE WHEN is_in_progress_flg = 'Y' THEN 1 ELSE 0 END, CASE WHEN conversion_flg = 'Y' THEN 1 ELSE 0 END,
       CASE WHEN disability_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.dependent

SET IDENTITY_INSERT sfa.dependent OFF

-- SFAADMIN.CORRESPONDENCE_TYPE
SET IDENTITY_INSERT sfa.correspondence_type ON

INSERT
INTO sfa.correspondence_type (id, description, is_active)
SELECT correspondence_type_id, description, CASE WHEN is_active_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.correspondence_type

SET IDENTITY_INSERT sfa.correspondence_type OFF

-- SFAADMIN.CORRESPONDENCE
SET IDENTITY_INSERT sfa.correspondence ON

INSERT
INTO sfa.correspondence (id, officer_id, student_id, request_type_id, correspondence_type_id, comments,
                         correspondence_date, sent_date, is_complete)
SELECT correspondence_id, officer_id, student_id, request_type_id, correspondence_type_id, comments,
       correspondence_date, sent_date, CASE WHEN completed_flag = 1 THEN 1 ELSE 0 END
FROM sfaadmin.correspondence

SET IDENTITY_INSERT sfa.correspondence OFF

-- SFAADMIN.corres_batch_param
INSERT
INTO sfa.correspondence_batch_param (correspondence_id, batch_parameter_id, parameter_value)
SELECT correspondence_id, batch_parameter_id, parameter_value
FROM sfaadmin.corres_batch_param

-- SFAADMIN.corr_type_batch_param
INSERT
INTO sfa.correspondence_type_batch_param (correspondence_type_id, batch_parameter_id, source)
SELECT correspondence_type_id, batch_parameter_id, source
FROM sfaadmin.corr_type_batch_param

-- SFAADMIN.COMMUNICATION
SET IDENTITY_INSERT sfa.communication ON

INSERT
INTO sfa.communication (id, communication_type_id, officer_id, student_id, request_type_id, communication_date,
                        comments, show_alert)
SELECT communication_id, communication_type_id, officer_id, student_id, request_type_id, communication_date, comments,
       CASE WHEN show_alert_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.communication

SET IDENTITY_INSERT sfa.communication OFF

-- SFA.APPLICATION

SET NOCOUNT ON

DECLARE @history_detail_id FLOAT, @student_id FLOAT, @parent1_first_name VARCHAR(30), @parent1_last_name VARCHAR(30), @parent1_income NUMERIC(8, 2), @parent1_tax_paid NUMERIC(8, 2), @parent1_relationship_id FLOAT, @parent2_first_name VARCHAR(30), @parent2_last_name VARCHAR(30), @parent2_income NUMERIC(8, 2), @parent2_tax_paid NUMERIC(8, 2), @parent2_relationship_id FLOAT, @created_by VARCHAR(30), @created_date DATETIME2(0), @updated_by VARCHAR(30), @updated_date DATETIME2(0), @institution_id FLOAT, @study_area_id FLOAT, @program_id FLOAT, @classes_start_date DATETIME2(0), @classes_end_date DATETIME2(0), @correspondence_flag NUMERIC(3, 0), @coop_paid_flag NUMERIC(3, 0), @aboriginal_status_id FLOAT, @marital_status_id FLOAT, @citizenship_status FLOAT, @disabled_flag NUMERIC(3, 0), @minority_flag NUMERIC(3, 0), @student_number VARCHAR(30), @academic_year VARCHAR(15), @program_year_total FLOAT, @program_year FLOAT, @two_residence_flag FLOAT, @moving_flag FLOAT, @csl_classification NUMERIC(3, 0), @csl_previous_province_id FLOAT, @program_division_explan VARCHAR(100), @prestudy_accom_code NUMERIC(3, 0), @prestudy_own_home_flag NUMERIC(3, 0), @prestudy_board_amount NUMERIC(7, 2), @prestudy_city_id FLOAT, @prestudy_province_id FLOAT, @prestudy_bus_flag NUMERIC(3, 0), @prestudy_distance NUMERIC(5, 0), @prestudy_employ_status_id FLOAT, @study_accom_code NUMERIC(3, 0), @study_own_home_flag NUMERIC(3, 0), @study_board_amount NUMERIC(7, 2), @study_city_id FLOAT, @study_province_id FLOAT, @study_bus_flag NUMERIC(3, 0), @study_distance NUMERIC(5, 0), @books_supplies_cost NUMERIC(6, 0), @outstanding_cslpt_amt NUMERIC(8, 2), @previous_csg_pt_amt NUMERIC(8, 2), @stat_info_comment VARCHAR(500), @percent_of_full_time NUMERIC(3, 0), @part_of_ft_flag NUMERIC(3, 0), @study_weeks_count NUMERIC(3, 0), @class_hours_per_week NUMERIC(4, 1), @parent_residence_comment VARCHAR(500), @study_living_w_spouse_flag NUMERIC(3, 0), @tuition_estimate NUMERIC(9, 2), @program_division NUMERIC(3, 0), @previous_cslft_flag NUMERIC(1, 0), @previous_cslpt_flag NUMERIC(1, 0), @parent1_citizenship_code NUMERIC(1, 0), @spouse_prestudy_emp_status_id FLOAT, @spouse_study_emp_status_id FLOAT, @spouse_study_school_from DATETIME2(0), @spouse_study_school_to DATETIME2(0), @spouse_pstudy_school_to DATETIME2(0), @spouse_pstudy_school_from DATETIME2(0), @spouse_study_csl_flag NUMERIC(3, 0), @spouse_study_bus_flag NUMERIC(3, 0), @spouse_study_distance NUMERIC(5, 0), @spouse_last_name VARCHAR(30), @spouse_first_name VARCHAR(30), @spouse_initials VARCHAR(5), @coop_start_year NUMERIC(4, 0), @coop_start_month NUMERIC(2, 0), @coop_end_year NUMERIC(4, 0), @coop_end_month NUMERIC(2, 0), @spouse_pstudy_income_comment VARCHAR(500), @spouse_study_income_comment VARCHAR(500), @spouse_sin FLOAT, @exclude_from_count NUMERIC(4, 0), @perm_disabled_flag NUMERIC(3, 0), @disabled_equipment VARCHAR(256), @previous_csg_disability_amount NUMERIC(8, 2), @previous_csg_fem_doc_amount NUMERIC(8, 2), @spouse_hs_end_year NUMERIC(4, 0), @spouse_hs_end_month NUMERIC(2, 0), @credit_chk_reqd_date DATETIME2(0), @credit_chk_fax_sent_date DATETIME2(0), @credit_chk_passed_date DATETIME2(0), @credit_chk_passed_flag NUMERIC(4, 0), @credit_chk_appeal_date DATETIME2(0), @credit_chk_app_comp_date DATETIME2(0), @credit_chk_app_comp_flag NUMERIC(4, 0), @credit_chk_comp_date DATETIME2(0), @csl_clearance_date DATETIME2(0), @prestudy_csl_classification NUMERIC(3, 0), @category_id FLOAT, @yea_tot_receipt_amount NUMERIC(8, 2), @academic_percent FLOAT, @csl_restriction_comment VARCHAR(2000), @in_progress_page NUMERIC(10, 0), @online_start_date DATETIME2(0), @online_submit_date DATETIME2(0), @parent1_sin FLOAT, @parent2_sin FLOAT, @parent1_net_income NUMERIC(8, 2), @parent2_net_income NUMERIC(8, 2), @student_ln150_income NUMERIC(8, 2), @spouse_ln150_income NUMERIC(8, 2), @rem_transition_grant_yrs NUMERIC(3, 0), @taxes_filed_year1 NUMERIC(4, 0), @taxes_filed_year2 NUMERIC(4, 0), @taxes_filed1_province_id FLOAT, @taxes_filed2_province_id FLOAT, @taxes_not_filed_yr1_flg VARCHAR(1), @taxes_not_filed_yr2_flg VARCHAR(1), @applied_other_funding_flg VARCHAR(1), @csl_restriction_warn_id FLOAT, @csl_restriction_reason_id FLOAT, @courses_per_week NUMERIC(4, 0), @first_nation_id FLOAT, @prestudy_start_date DATETIME2(0), @prestudy_end_date DATETIME2(0), @school_email VARCHAR(50), @school_phone VARCHAR(24), @rowid UNIQUEIDENTIFIER;

DECLARE @spouse_id INT, @parent1_id INT, @parent2_id INT;

DECLARE app_cursor CURSOR FOR SELECT h.*, s.school_email, s.school_phone
FROM sfaadmin.history_detail h
         INNER JOIN sfaadmin.student s ON h.student_id = s.student_id
WHERE history_detail_id NOT IN (2348, 3202, 2288, 16170)
OPEN app_cursor;

FETCH NEXT FROM app_cursor INTO @history_detail_id, @student_id, @parent1_first_name, @parent1_last_name, @parent1_income, @parent1_tax_paid, @parent1_relationship_id, @parent2_first_name, @parent2_last_name, @parent2_income, @parent2_tax_paid, @parent2_relationship_id, @created_by, @created_date, @updated_by, @updated_date, @institution_id, @study_area_id, @program_id, @classes_start_date, @classes_end_date, @correspondence_flag, @coop_paid_flag, @aboriginal_status_id, @marital_status_id, @citizenship_status, @disabled_flag, @minority_flag, @student_number, @academic_year, @program_year_total, @program_year, @two_residence_flag, @moving_flag, @csl_classification, @csl_previous_province_id, @program_division_explan, @prestudy_accom_code, @prestudy_own_home_flag, @prestudy_board_amount, @prestudy_city_id, @prestudy_province_id, @prestudy_bus_flag, @prestudy_distance, @prestudy_employ_status_id, @study_accom_code, @study_own_home_flag, @study_board_amount, @study_city_id, @study_province_id, @study_bus_flag, @study_distance, @books_supplies_cost, @outstanding_cslpt_amt, @previous_csg_pt_amt, @stat_info_comment, @percent_of_full_time, @part_of_ft_flag, @study_weeks_count, @class_hours_per_week, @parent_residence_comment, @study_living_w_spouse_flag, @tuition_estimate, @program_division, @previous_cslft_flag, @previous_cslpt_flag, @parent1_citizenship_code, @spouse_prestudy_emp_status_id, @spouse_study_emp_status_id, @spouse_study_school_from, @spouse_study_school_to, @spouse_pstudy_school_to, @spouse_pstudy_school_from, @spouse_study_csl_flag, @spouse_study_bus_flag, @spouse_study_distance, @spouse_last_name, @spouse_first_name, @spouse_initials, @coop_start_year, @coop_start_month, @coop_end_year, @coop_end_month, @spouse_pstudy_income_comment, @spouse_study_income_comment, @spouse_sin, @exclude_from_count, @perm_disabled_flag, @disabled_equipment, @previous_csg_disability_amount, @previous_csg_fem_doc_amount, @spouse_hs_end_year, @spouse_hs_end_month, @credit_chk_reqd_date, @credit_chk_fax_sent_date, @credit_chk_passed_date, @credit_chk_passed_flag, @credit_chk_appeal_date, @credit_chk_app_comp_date, @credit_chk_app_comp_flag, @credit_chk_comp_date, @csl_clearance_date, @prestudy_csl_classification, @category_id, @yea_tot_receipt_amount, @academic_percent, @csl_restriction_comment, @in_progress_page, @online_start_date, @online_submit_date, @parent1_sin, @parent2_sin, @parent1_net_income, @parent2_net_income, @student_ln150_income, @spouse_ln150_income, @rem_transition_grant_yrs, @taxes_filed_year1, @taxes_filed_year2, @taxes_filed1_province_id, @taxes_filed2_province_id, @taxes_not_filed_yr1_flg, @taxes_not_filed_yr2_flg, @applied_other_funding_flg, @csl_restriction_warn_id, @csl_restriction_reason_id, @courses_per_week, @first_nation_id, @prestudy_start_date, @prestudy_end_date, @rowid, @school_email, @school_phone;

WHILE @@FETCH_STATUS = 0 BEGIN
    SELECT @parent1_id = NULL;
    SELECT @parent2_id = NULL;
    SELECT @spouse_id = NULL;

    -- create the parent 1
    IF @parent1_last_name IS NOT NULL OR @parent1_income IS NOT NULL
        BEGIN
            INSERT
            INTO sfa.person (first_name, last_name, sin)
            VALUES (@parent1_first_name, @parent1_last_name, LTRIM(STR(@parent1_sin, 15, 0)))
            SELECT @parent1_id = SCOPE_IDENTITY();

        END

    IF @parent2_last_name IS NOT NULL OR @parent2_income IS NOT NULL
        BEGIN
            INSERT
            INTO sfa.person (first_name, last_name, sin)
            VALUES (@parent2_first_name, @parent2_last_name, LTRIM(STR(@parent2_sin, 15, 0)))
            SELECT @parent2_id = SCOPE_IDENTITY();
        END

    IF @spouse_last_name IS NOT NULL OR @spouse_sin IS NOT NULL
        BEGIN
            INSERT
            INTO sfa.person (first_name, last_name, initials, sin)
            VALUES (@spouse_first_name, @spouse_last_name, @spouse_initials, LTRIM(STR(@spouse_sin, 15, 0)))
            SELECT @spouse_id = SCOPE_IDENTITY();
        END

    SET IDENTITY_INSERT sfa.student OFF

    SET IDENTITY_INSERT sfa.application ON

    INSERT
    INTO sfa.application (id, student_id, academic_year_id, institution_campus_id, study_area_id, program_id,
                          aboriginal_status_id,
                          marital_status_id, category_id, first_nation_id, spouse_id, parent1_id, parent2_id,
                          parent1_income,
                          parent1_net_income, parent1_tax_paid, parent2_income, parent2_net_income, parent2_tax_paid,
                          school_email,
                          school_telephone, spouse_hs_end_year, spouse_hs_end_month, spouse_prestudy_emp_status_id,
                          spouse_pstudy_school_from,
                          spouse_pstudy_school_to, spouse_pstudy_income_comment, spouse_study_emp_status_id,
                          spouse_study_school_from,
                          spouse_study_school_to, is_spouse_study_csl, is_spouse_study_bus, spouse_study_distance,
                          spouse_study_income_comment,
                          classes_start_date, classes_end_date, is_correspondence, is_coop_paid, citizenship_status,
                          is_disabled, is_minority,
                          student_number, program_year_total, program_year, is_two_residence, is_moving,
                          csl_classification, csl_previous_province_id,
                          program_division_explanation, prestudy_accom_code, prestudy_own_home, prestudy_board_amount,
                          prestudy_city_id, prestudy_province_id,
                          prestudy_bus, prestudy_distance, prestudy_employ_status_id, study_accom_code, study_own_home,
                          study_board_amount,
                          study_city_id, study_province_id, study_bus, study_distance, stat_info_comment,
                          books_supplies_cost, outstanding_cslpt_amount,
                          previous_csg_pt_amount, percent_of_full_time, is_part_of_ft, study_weeks_count,
                          class_hours_per_week, parent_residence_comment,
                          study_living_w_spouse, tuition_estimate_amount, program_division, is_previous_cslft,
                          is_previous_cslpt, coop_start_year,
                          coop_start_month, coop_end_year, coop_end_month, exclude_from_count, is_perm_disabled,
                          disabled_equipment, previous_csg_disability_amount,
                          previous_csg_fem_doc_amount, credit_chk_reqd_date, credit_chk_fax_sent_date,
                          credit_chk_passed_date, credit_chk_passed,
                          credit_chk_appeal_date, credit_chk_app_comp_date, credit_chk_app_comp, credit_chk_comp_date,
                          csl_clearance_date,
                          prestudy_csl_classification, yea_tot_receipt_amount, academic_percent,
                          csl_restriction_comment, in_progress_page,
                          online_start_date, online_submit_date, rem_transition_grant_years, student_ln150_income,
                          spouse_ln150_income,
                          taxes1_filed_year, taxes2_filed_year, taxes1_filed_province_id, taxes2_filed_province_id,
                          taxes1_not_filed,
                          taxes2_not_filed, applied_other_funding, csl_restriction_warn_id, csl_restriction_reason_id,
                          courses_per_week,
                          prestudy_start_date, prestudy_end_date)
    VALUES (@history_detail_id, @student_id, COALESCE(@academic_year, DATEPART(YEAR, @created_date)),
            COALESCE(@institution_id, 0), @study_area_id, @program_id, @aboriginal_status_id,
            @marital_status_id, @category_id, @first_nation_id, @spouse_id, @parent1_id, @parent2_id, @parent1_income,
            @parent1_net_income, @parent1_tax_paid, @parent2_income, @parent2_net_income, @parent2_tax_paid,
            @school_email,
            @school_phone, @spouse_hs_end_year, @spouse_hs_end_month, @spouse_prestudy_emp_status_id,
            @spouse_pstudy_school_from,
            @spouse_pstudy_school_to, @spouse_pstudy_income_comment, @spouse_study_emp_status_id,
            @spouse_study_school_from,
            @spouse_study_school_to, COALESCE(@spouse_study_csl_flag, 0), COALESCE(@spouse_study_bus_flag, 0),
            @spouse_study_distance, @spouse_study_income_comment,
            @classes_start_date, @classes_end_date, COALESCE(@correspondence_flag, 0), COALESCE(@coop_paid_flag, 0),
            @citizenship_status, COALESCE(@disabled_flag, 0), COALESCE(@minority_flag, 0),
            @student_number, @program_year_total, @program_year, COALESCE(@two_residence_flag, 0),
            COALESCE(@moving_flag, 0), @csl_classification, @csl_previous_province_id,
            @program_division_explan, @prestudy_accom_code, COALESCE(@prestudy_own_home_flag, 0),
            @prestudy_board_amount, @prestudy_city_id, @prestudy_province_id,
            COALESCE(@prestudy_bus_flag, 0), @prestudy_distance, @prestudy_employ_status_id, @study_accom_code,
            COALESCE(@study_own_home_flag, 0), @study_board_amount,
            @study_city_id, @study_province_id, COALESCE(@study_bus_flag, 0), @study_distance, @stat_info_comment,
            @books_supplies_cost, @outstanding_cslpt_amt,
            @previous_csg_pt_amt, @percent_of_full_time, COALESCE(@part_of_ft_flag, 0), @study_weeks_count,
            @class_hours_per_week, @parent_residence_comment,
            COALESCE(@study_living_w_spouse_flag, 0), @tuition_estimate, @program_division,
            COALESCE(@previous_cslft_flag, 0), COALESCE(@previous_cslpt_flag, 0), @coop_start_year,
            @coop_start_month, @coop_end_year, @coop_end_month, COALESCE(@exclude_from_count, 0),
            COALESCE(@perm_disabled_flag, 0), @disabled_equipment, @previous_csg_disability_amount,
            @previous_csg_fem_doc_amount, @credit_chk_reqd_date, @credit_chk_fax_sent_date, @credit_chk_passed_date,
            COALESCE(@credit_chk_passed_flag, 0),
            @credit_chk_appeal_date, @credit_chk_app_comp_date, COALESCE(@credit_chk_app_comp_flag, 0),
            @credit_chk_comp_date, @csl_clearance_date,
            @prestudy_csl_classification, @yea_tot_receipt_amount, @academic_percent, @csl_restriction_comment,
            @in_progress_page,
            @online_start_date, @online_submit_date, @rem_transition_grant_yrs, @student_ln150_income,
            @spouse_ln150_income,
            @taxes_filed_year1, @taxes_filed_year2, @taxes_filed1_province_id, @taxes_filed2_province_id,
            CASE WHEN @taxes_not_filed_yr1_flg = 'Y' THEN 1 ELSE 0 END,
            CASE WHEN @taxes_not_filed_yr2_flg = 'Y' THEN 1 ELSE 0 END,
            CASE WHEN @applied_other_funding_flg = 'Y' THEN 1 ELSE 0 END, @csl_restriction_warn_id,
            @csl_restriction_reason_id, @courses_per_week,
            @prestudy_start_date, @prestudy_end_date)

    SET IDENTITY_INSERT sfa.application OFF

    FETCH NEXT FROM app_cursor INTO @history_detail_id, @student_id, @parent1_first_name, @parent1_last_name, @parent1_income, @parent1_tax_paid, @parent1_relationship_id, @parent2_first_name, @parent2_last_name, @parent2_income, @parent2_tax_paid, @parent2_relationship_id, @created_by, @created_date, @updated_by, @updated_date, @institution_id, @study_area_id, @program_id, @classes_start_date, @classes_end_date, @correspondence_flag, @coop_paid_flag, @aboriginal_status_id, @marital_status_id, @citizenship_status, @disabled_flag, @minority_flag, @student_number, @academic_year, @program_year_total, @program_year, @two_residence_flag, @moving_flag, @csl_classification, @csl_previous_province_id, @program_division_explan, @prestudy_accom_code, @prestudy_own_home_flag, @prestudy_board_amount, @prestudy_city_id, @prestudy_province_id, @prestudy_bus_flag, @prestudy_distance, @prestudy_employ_status_id, @study_accom_code, @study_own_home_flag, @study_board_amount, @study_city_id, @study_province_id, @study_bus_flag, @study_distance, @books_supplies_cost, @outstanding_cslpt_amt, @previous_csg_pt_amt, @stat_info_comment, @percent_of_full_time, @part_of_ft_flag, @study_weeks_count, @class_hours_per_week, @parent_residence_comment, @study_living_w_spouse_flag, @tuition_estimate, @program_division, @previous_cslft_flag, @previous_cslpt_flag, @parent1_citizenship_code, @spouse_prestudy_emp_status_id, @spouse_study_emp_status_id, @spouse_study_school_from, @spouse_study_school_to, @spouse_pstudy_school_to, @spouse_pstudy_school_from, @spouse_study_csl_flag, @spouse_study_bus_flag, @spouse_study_distance, @spouse_last_name, @spouse_first_name, @spouse_initials, @coop_start_year, @coop_start_month, @coop_end_year, @coop_end_month, @spouse_pstudy_income_comment, @spouse_study_income_comment, @spouse_sin, @exclude_from_count, @perm_disabled_flag, @disabled_equipment, @previous_csg_disability_amount, @previous_csg_fem_doc_amount, @spouse_hs_end_year, @spouse_hs_end_month, @credit_chk_reqd_date, @credit_chk_fax_sent_date, @credit_chk_passed_date, @credit_chk_passed_flag, @credit_chk_appeal_date, @credit_chk_app_comp_date, @credit_chk_app_comp_flag, @credit_chk_comp_date, @csl_clearance_date, @prestudy_csl_classification, @category_id, @yea_tot_receipt_amount, @academic_percent, @csl_restriction_comment, @in_progress_page, @online_start_date, @online_submit_date, @parent1_sin, @parent2_sin, @parent1_net_income, @parent2_net_income, @student_ln150_income, @spouse_ln150_income, @rem_transition_grant_yrs, @taxes_filed_year1, @taxes_filed_year2, @taxes_filed1_province_id, @taxes_filed2_province_id, @taxes_not_filed_yr1_flg, @taxes_not_filed_yr2_flg, @applied_other_funding_flg, @csl_restriction_warn_id, @csl_restriction_reason_id, @courses_per_week, @first_nation_id, @prestudy_start_date, @prestudy_end_date, @rowid, @school_email, @school_phone;
END;

CLOSE app_cursor;
DEALLOCATE app_cursor;

SET NOCOUNT OFF
PRINT 'Application Cursor Complete'

-- SFA.AGENCY_ASSISTANCE
INSERT
INTO sfa.agency_assistance (agency_id, application_id, amount, is_tuition, is_living_expenses, is_books,
                            is_transportation, other_purpose, agency_comment)
SELECT agency_id, history_detail_id, amount, COALESCE(tuition_flag, 0), COALESCE(living_expense_flag, 0),
       COALESCE(books_flag, 0), COALESCE(transportation_flag, 0), other_purpose, agency_comment
FROM sfaadmin.agency_assistance

-- SFA.COUSE_ENROLLED
SET IDENTITY_INSERT sfa.course_enrolled ON
INSERT
INTO sfa.course_enrolled (id, application_id, instruction_type_id, description, course_code)
SELECT course_enrolled_id, history_detail_id, COALESCE(instruction_type_id, 1), course_description, course_code
FROM sfaadmin.course_enrolled
SET IDENTITY_INSERT sfa.course_enrolled OFF

-- SFA.dependent_eligibility
SET IDENTITY_INSERT sfa.dependent_eligibility ON
INSERT
INTO sfa.dependent_eligibility (id, application_id, dependent_id, is_eligible, is_post_secondary, resides_with_student,
                                is_shares_custody, shares_custody_details, is_csl_eligible, is_csg_eligible,
                                is_in_progress)
SELECT dependent_eligibility_id, history_detail_id, dependent_id, COALESCE(eligible, 0), COALESCE(post_secondary, 0),
       COALESCE(resides_with, 0), COALESCE(shares_custody, 0), shares_custody_details, COALESCE(csl_eligible, 0),
       COALESCE(csg_eligible, 0), CASE WHEN is_in_progress_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.dependent_eligibility
SET IDENTITY_INSERT sfa.dependent_eligibility OFF

-- SFA.disability
SET IDENTITY_INSERT sfa.disability ON
INSERT
INTO sfa.disability (id, application_id, disability_type_id, description)
SELECT disability_id, history_detail_id, disability_type_id, description
FROM sfaadmin.disability
SET IDENTITY_INSERT sfa.disability OFF

-- SFA.disability_requirement
SET IDENTITY_INSERT sfa.disability_requirement ON
INSERT
INTO sfa.disability_requirement (id, application_id, disability_service_id)
SELECT disability_requirement_id, history_detail_id, disab_service_type_id
FROM sfaadmin.disability_requirement
SET IDENTITY_INSERT sfa.disability_requirement OFF

-- sfa.expense
SET IDENTITY_INSERT sfa.expense ON
INSERT
INTO sfa.expense (id, application_id, category_id, period_id, description, amount)
SELECT expense_id, history_detail_id, category_id, period_id, description, amount
FROM sfaadmin.expense
SET IDENTITY_INSERT sfa.expense OFF

INSERT
INTO sfa.application_part_time_reason (application_id, part_time_reason_id)
SELECT history_detail_id, part_time_reason_id
FROM sfaadmin.hide_part_time_reason

-- sfa.funding_request
SET IDENTITY_INSERT sfa.funding_request ON
INSERT
INTO sfa.funding_request (id, application_id, request_type_id, status_id, status_reason_id, comments, custom_status,
                          received_date, status_date, yea_request_amount, yea_request_type, csl_request_amount,
                          is_csl_full_amount, is_csg_only)
SELECT funding_request_id, history_detail_id, request_type_id, status_id, status_reason_id, comments, custom_status,
       received_date, status_date, yea_request_amount, yea_request_type_flag, csl_request_amount,
       COALESCE(csl_full_amt_flag, 0), CASE WHEN csg_only_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.funding_request
WHERE history_detail_id IN (SELECT id FROM sfa.application)
SET IDENTITY_INSERT sfa.funding_request OFF

-- sfa.investment
SET IDENTITY_INSERT sfa.investment ON
INSERT
INTO sfa.investment (id, application_id, ownership_id, investment_type_id, market_value, is_rrsp, is_joint)
SELECT investment_id, history_detail_id, ownership_id, investment_type_id, market_value, COALESCE(rrsp_flag, 0),
       CASE WHEN is_joint_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.investment
WHERE history_detail_id IN (SELECT id FROM sfa.application)
SET IDENTITY_INSERT sfa.investment OFF

-- sfa.msfaa
SET IDENTITY_INSERT sfa.msfaa ON
INSERT
INTO sfa.msfaa (id, application_id, student_id, sent_date, signed_date, received_date, cancel_date, msfaa_status,
                cancel_reason, sent_seq_number, last_reminder_sent, is_full_time)
SELECT msfaa_id, history_detail_id, student_id, sent_date, signed_date, received_date, cancel_date, msfaa_status,
       cancel_reason, sent_seq_number, last_reminder_sent, CASE WHEN pt_or_ft = 'FT' THEN 1 ELSE 0 END
FROM sfaadmin.msfaa
WHERE history_detail_id IN (SELECT id FROM sfa.application)
SET IDENTITY_INSERT sfa.msfaa OFF

-- sfa.msfaa_email_log
SET IDENTITY_INSERT sfa.msfaa_email_log ON
INSERT
INTO sfa.msfaa_email_log (id, msfaa_id, is_emailed, reminder_sent, email)
SELECT msfaa_email_log_id, msfaa_id, CASE WHEN emailed_flg = 'Yes' THEN 1 ELSE 0 END, reminder_sent, email_address
FROM sfaadmin.msfaa_email_log
SET IDENTITY_INSERT sfa.msfaa_email_log OFF

-- sfa.parent_dependent
SET IDENTITY_INSERT sfa.parent_dependent ON
INSERT
INTO sfa.parent_dependent (id, application_id, relationship_id, first_name, last_name, birth_date, age, is_residing,
                           is_shared_custody, is_attend_post_secondary, comments, is_eligible, is_disabled, conversion)
SELECT parent_dependent_id, history_detail_id, relationship_id, dependent_first_name, dependent_last_name, birth_date,
       dependent_age, COALESCE(residing, 0), COALESCE(shared_custody, 0), COALESCE(attend_post_second, 0), comments,
       COALESCE(eligible, 0), CASE WHEN disability_flg = 'Y' THEN 1 ELSE 0 END,
       CASE WHEN conversion_flg = 'Y' THEN 1 ELSE 0 END
FROM sfaadmin.parent_dependent
SET IDENTITY_INSERT sfa.parent_dependent OFF

-- sfa.parent_resident
SET IDENTITY_INSERT sfa.parent_resident ON
INSERT
INTO sfa.parent_resident (id, application_id, city_id, province_id, country_id, from_year, from_month, to_year,
                          to_month)
SELECT parent_resident_id, history_detail_id, city_id, province_id, country_id, from_year, from_month, to_year, to_month
FROM sfaadmin.parent_resident
SET IDENTITY_INSERT sfa.parent_resident OFF

-- sfa.correspondence_request_status
INSERT
INTO sfa.correspondence_request_status (request_type_id, status_id, correspondence_type_id)
SELECT request_type_id, status_id, correspondence_type_id
FROM sfaadmin.request_status_corr

-- sfa.requirement_met
SET IDENTITY_INSERT sfa.requirement_met ON
INSERT
INTO sfa.requirement_met (id, application_id, requirement_type_id, completed_date)
SELECT requirement_met_id, history_detail_id, requirement_type_id, completed_date
FROM sfaadmin.requirement_met
WHERE history_detail_id IN (SELECT id FROM sfa.application)
SET IDENTITY_INSERT sfa.requirement_met OFF

-- sfa.communication_log
SET IDENTITY_INSERT sfa.communication_log ON
INSERT
INTO sfa.communication_log (id, msfaa_id, sent_from_email, sent_to_email, sent_to_cc, subject, reminder_sent,
                            is_emailed)
SELECT communication_log_id, msfaa_id, sent_from_email, sent_to_email, sent_to_cc, subject, reminder_sent,
       CASE WHEN emailed_flg = 'Yes' THEN 1 ELSE 0 END
FROM sfaadmin.communication_log
SET IDENTITY_INSERT sfa.communication_log OFF

-- sfa.assessment
SET IDENTITY_INSERT sfa.assessment ON
INSERT
INTO sfa.assessment (id, allowed_books, allowed_months, allowed_percent, allowed_tuition, assessed_amount,
                     assessed_date, change_reason_comment, dependent_count,
                     effective_rate_date, home_city_id, living_costs, travel_allowance, weekly_amount,
                     assessment_type_id, destination_city_id, funding_request_id, disbursements_required,
                     weeks_allowed, second_residence_rate, classes_end_date, prestudy_accom_code, prestudy_province_id,
                     classes_start_date, airfare_amount, air_travel_disbursement_period,
                     shelter_month, p_trans_month, r_trans_16wk, day_care_allowable, depend_food_allowable,
                     depend_tran_allowable, pstudy_shelter_month, pstudy_p_trans_month, pstudy_day_care_allow,
                     pstudy_depend_food_allow, pstudy_depend_tran_allow, pstudy_start_date, pstudy_end_date,
                     csl_assessed_need, study_province_id, csl_over_reason_id, csl_non_reason_id,
                     over_award, student_tax_rate, spouse_tax_rate, spouse_pstudy_tax_rate, stud_pstudy_tax_rate,
                     parent1_income, parent2_income, parent1_tax_paid, parent2_tax_paid, books_supplies_cost,
                     tuition_estimate, uncapped_costs_total, uncapped_pstudy_total, day_care_actual, stud_pstudy_gross,
                     spouse_pstudy_gross, pstudy_day_care_actual, student_gross_income,
                     spouse_gross_income, prestudy_csl_classification, marital_status_id, spouse_province_id,
                     study_accom_code, csl_classification, family_size, parent_ps_depend_count,
                     parent_province, discretionary_cost, discretionary_cost_actual, study_distance, prestudy_distance,
                     prestudy_bus_flag, study_bus_flag, study_living_w_spouse_flag,
                     csl_full_amt_flag, study_area_id, program_id, period, csl_request_amount, return_uncashable_cert,
                     years_funded_equivalent, study_weeks, study_months, pstudy_expected_contrib,
                     spouse_expected_income, asset_tax_rate, x_trans_total, relocation_total, pstudy_x_trans_total,
                     married_pstudy, married_study, married_assets, entitlement_days, parent_contribution_override,
                     total_grant_awarded, over_award_disbursement_period, over_award_applied_flg, pre_leg_amount,
                     assessment_adj_amount, student_ln150_income, student_contribution,
                     student_contrib_exempt, spouse_contrib_exempt, spouse_contribution, spouse_ln150_income,
                     student_contribution_review, spouse_contribution_review, parent_contribution_review,
                     student_family_size, student_expected_contribution, student_previous_contribution,
                     spouse_expected_contribution, spouse_previous_contribution, student_contribution_override,
                     spouse_contribution_override)
SELECT [ASSESSMENT_ID], [ALLOWED_BOOKS], [ALLOWED_MONTHS], [ALLOWED_PERCENT], [ALLOWED_TUITION], [ASSESSED_AMOUNT]
     , [ASSESSED_DATE], [CHANGE_REASON_COMMENT], [DEPENDENT_COUNT], [EFFECTIVE_RATE_DATE], [HOME_CITY_ID]
     , [LIVING_COSTS], [TRAVEL_ALLOWANCE], [WEEKLY_AMOUNT], [ASSESSMENT_TYPE_ID], [DESTINATION_CITY], [FUNDING_QUEST_ID]
     , [DISBURSEMENTS_REQUIRED], [WEEKS_ALLOWED], [SECOND_RESIDENCE_RATE], [CLASSES_END_DATE], [PRESTUDY_ACCOM_CODE]
     , [PRESTUDY_PROVINCE_ID], [CLASSES_START_DATE], [AIRFARE_AMOUNT], [AIR_TRAVEL_DISBURSEMENT_PERIOD], [SHELTER_MONTH]
     , [P_TRANS_MONTH], [R_TRANS_16WK], [DAY_CARE_ALLOWABLE], [DEPEND_FOOD_ALLOWABLE], [DEPEND_TRAN_ALLOWABLE]
     , [PSTUDY_SHELTER_MONTH], [PSTUDY_P_TRANS_MONTH], [PSTUDY_DAY_CARE_ALLOW], [PSTUDY_DEPEND_FOOD_ALLOW]
     , [PSTUDY_DEPEND_TRAN_ALLOW], [PSTUDY_START_DATE], [PSTUDY_END_DATE], [CSL_ASSESSED_NEED], [STUDY_PROVINCE_ID]
     , [CSL_OVER_REASON_ID], [CSL_NON_REASON_ID], [OVER_AWARD], [STUDENT_TAX_RATE], [SPOUSE_TAX_RATE]
     , [SPOUSE_PSTUDY_TAX_RATE], [STUD_PSTUDY_TAX_RATE], [PARENT1_INCOME], [PARENT2_INCOME], [PARENT1_TAX_PAID]
     , [PARENT2_TAX_PAID], [BOOKS_SUPPLIES_COST], [TUITION_ESTIMATE], [UNCAPPED_COSTS_TOTAL], [UNCAPPED_PSTUDY_TOTAL]
     , [DAY_CARE_ACTUAL], [STUD_PSTUDY_GROSS], [SPOUSE_PSTUDY_GROSS], [PSTUDY_DAY_CARE_ACTUAL], [STUDENT_GROSS_INCOME]
     , [SPOUSE_GROSS_INCOME], [PRESTUDY_CSL_CLASSIFICATION], [MARITAL_STATUS_ID], [SPOUSE_PROVINCE_ID]
     , [STUDY_ACCOM_CODE], [CSL_CLASSIFICATION], [FAMILY_SIZE], [PARENT_PS_DEPEND_COUNT], [PARENT_PROVINCE]
     , [DISCRETIONARY_COST], [DISCRETIONARY_COST_ACTUAL], [STUDY_DISTANCE], [PRESTUDY_DISTANCE], [PRESTUDY_BUS_FLAG]
     , [STUDY_BUS_FLAG], [STUDY_LIVING_W_SPOUSE_FLAG], [CSL_FULL_AMT_FLAG], [STUDY_AREA_ID], [PROGRAM_ID], [PERIOD]
     , [CSL_REQUEST_AMOUNT], [RETURN_UNCASHABLE_CERT], [YEARS_FUNDED_EQUIVALENT], [STUDY_WEEKS], [STUDY_MONTHS]
     , [PSTUDY_EXPECTED_CONTRIB], [SPOUSE_EXPECTED_INCOME], [ASSET_TAX_RATE], [X_TRANS_TOTAL], [RELOCATION_TOTAL]
     , [PSTUDY_X_TRANS_TOTAL], [MARRIED_PSTUDY], [MARRIED_STUDY], [MARRIED_ASSETS], [ENTITLEMENT_DAYS]
     , [PARENT_CONTRIBUTION_OVERRIDE], [TOTAL_GRANT_AWARDED], [OVER_AWARD_DISBURSEMENT_PERIOD], [OVER_AWARD_APPLIED_FLG]
     , [PRE_LEG_AMOUNT], [ASSESSMENT_ADJ_AMOUNT], [STUDENT_LN150_INCOME], [STUDENT_CONTRIBUTION]
     , [STUDENT_CONTRIB_EXEMPT], [SPOUSE_CONTRIB_EXEMPT], [SPOUSE_CONTRIBUTION], [SPOUSE_LN150_INCOME]
     , [STUDENT_CONTRIBUTION_REVIEW], [SPOUSE_CONTRIBUTION_REVIEW], [PARENT_CONTRIBUTION_REVIEW], [STUDENT_FAMILY_SIZE]
     , [STUDENT_EXPECTED_CONTRIBUTION], [STUDENT_PREVIOUS_CONTRIBUTION], [SPOUSE_EXPECTED_CONTRIBUTION]
     , [SPOUSE_PREVIOUS_CONTRIBUTION], [STUDENT_CONTRIBUTION_OVERRIDE], [SPOUSE_CONTRIBUTION_OVERRIDE]
FROM sfaadmin.assessment
SET IDENTITY_INSERT sfa.assessment OFF


SET IDENTITY_INSERT sfa.cls_nars_history ON
INSERT
INTO sfa.cls_nars_history ( id, application_id, student_id, assessment_id, academic_year, sin, loan_year, postal_prefix
                          , birth_date, gender, marital_status, institution_code
                          , field_of_study, year_study, study_weeks, study_start_date, study_end_date, loan_type
                          , course_percentage, credit_check_flg, credit_check_status
                          , disabled_flg, disabled_type, minority_flg, aboriginal_status_flg, aboriginal_category
                          , assessment_date, csl_classification, family_size, post_secondary_children
                          , spouse_student_flg, spouse_csl_flg, spouse_sin, children_to_11, children_over_12_not_dis
                          , children_over_12_dis, pstudy_student_income, study_income_gov
                          , study_income_gov_tot, study_income_priv, study_income_gov_ei, study_income_cpp
                          , study_income_wc, study_income_gov_soc, study_income_nont_gov
                          , study_income_nont_gov_tot, study_income_merit, study_income_priv_merit, study_income_employ
                          , study_income_cs, study_income_alimony, study_income_other
                          , study_income_other_tot, study_student_income, parent1_income, parent2_income, student_rrsp
                          , student_vehicle, student_asset, spouse_rrsp, spouse_vehicle
                          , spouse_asset, student_years_since_hs, spouse_years_since_hs, student_study_contribution
                          , student_pstudy_contribution, spouse_study_contribution
                          , parental_contribution, assessed_resources, tuition_estimate, assessed_need, unmet_need
                          , request_need, csl_before_overaward, psl_before_overaward
                          , csl_recovered_overaward, psl_recovered_overaward, csl_auth_ft, csl_auth_pt
                          , csl_auth_loan_amnt, csl_auth_loan_date, psl_auth_loan_amnt, psl_auth_loan_date
                          , assistance_total, assessment_review_flg, csg_doctoral_amount, csg_disability_amount
                          , cag_perm_disability_amnt, csg_dependent_amount, csg_date, cms_amount
                          , cms_date, prov_grant_unmet_amnt, prov_grant_amnt, prov_grant_date, assessment_code
                          , version_num, app_status, reassess_indicator, cat_code, single_ind_stat_reas
                          , social_assist_flg, parent1_sin, parent1_postal_code, parent2_sin, parent2_postal_code
                          , postal_suffix, pstudy_weeks, pstudy_home_away, study_home_away, program_type
                          , academic_year_study, year_in_program, program_duration, early_withdrawal_ind, date_left_hs
                          , spouse_date_left_hs, pstudy_income_other, pstudy_income_employ
                          , spouse_income_annual, spouse_pstudy_income, spouse_study_income, parent1_income_taxable
                          , parent1_income_taxpaid, parent2_income_taxable, parent2_income_taxpaid
                          , joint_asset_flg, student_resp, parental_asset, joint_contrib_flg, spouse_pstudy_contrib
                          , student_asset_contrib, spouse_asset_contrib
                          , parental_asset_contrib, other_resources, pstudy_cost_living, pstudy_cost_loan
                          , pstudy_pt_cost_tuitn, study_cost_living, study_cost_books
                          , study_cost_childcare_allw, study_cost_childcare_actl, study_cost_return_trans
                          , study_cost_other_trans, study_cost_relocation, study_cost_other
                          , study_cost_total, aboriginal_cat, stud_gross_annual_income, spouse_gross_annual_income
                          , csg_li, csg_mi, csg_pd, csg_ftdep, csg_pdse, transition_grant_amt, tgrant_yrs_remaining
                          , pstudy_dep_cost_living, previous_disbursement, study_income_gov_grant, pstudy_x_trans_total
                          , study_directed_income, financial_investments, married_adjustment, study_cost_computers)
SELECT [CSL_NARS_HISTORY_ID], [HISTORY_DETAIL_ID], [STUDENT_ID], [ASSESSMENT_ID], [ACADEMIC_YEAR], [SIN], [LOAN_YEAR]
     , [POSTAL_PREFIX], [BIRTH_DATE], [GENDER], [MARITAL_STATUS], [INSTITUTION_CODE], [FIELD_OF_STUDY], [YEAR_STUDY]
     , [STUDY_WEEKS], [STUDY_START_DATE], [STUDY_END_DATE], [LOAN_TYPE], [COURSE_PERCENTAGE], [CREDIT_CHECK_FLG]
     , [CREDIT_CHECK_STATUS], [DISABLED_FLG], [DISABLED_TYPE], [MINORITY_FLG], [ABORIGINAL_STATUS_FLG]
     , [ABORIGINAL_CATEGORY], [ASSESSMENT_DATE], [CSL_CLASSIFICATION], [FAMILY_SIZE], [POST_SECONDARY_CHILDREN]
     , [SPOUSE_STUDENT_FLG], [SPOUSE_CSL_FLG], [SPOUSE_SIN], [CHILDREN_TO_11], [CHILDREN_OVER_12_NOT_DIS]
     , [CHILDREN_OVER_12_DIS], [PSTUDY_STUDENT_INCOME], [STUDY_INCOME_GOV], [STUDY_INCOME_GOV_TOT], [STUDY_INCOME_PRIV]
     , [STUDY_INCOME_GOV_EI], [STUDY_INCOME_CPP], [STUDY_INCOME_WC], [STUDY_INCOME_GOV_SOC], [STUDY_INCOME_NONT_GOV]
     , [STUDY_INCOME_NONT_GOV_TOT], [STUDY_INCOME_MERIT], [STUDY_INCOME_PRIV_MERIT], [STUDY_INCOME_EMPLOY]
     , [STUDY_INCOME_CS], [STUDY_INCOME_ALIMONY], [STUDY_INCOME_OTHER], [STUDY_INCOME_OTHER_TOT], [STUDY_STUDENT_INCOME]
     , [PARENT1_INCOME], [PARENT2_INCOME], [STUDENT_RRSP], [STUDENT_VEHICLE], [STUDENT_ASSET], [SPOUSE_RRSP]
     , [SPOUSE_VEHICLE], [SPOUSE_ASSET], [STUDENT_YEARS_SINCE_HS], [SPOUSE_YEARS_SINCE_HS], [STUDENT_STUDY_CONTRIBUTION]
     , [STUDENT_PSTUDY_CONTRIBUTION], [SPOUSE_STUDY_CONTRIBUTION], [PARENTAL_CONTRIBUTION], [ASSESSED_RESOURCES]
     , [TUITION_ESTIMATE], [ASSESSED_NEED], [UNMET_NEED], [REQUEST_NEED], [CSL_BEFORE_OVERAWARD], [PSL_BEFORE_OVERAWARD]
     , [CSL_RECOVERED_OVERAWARD], [PSL_RECOVERED_OVERAWARD], [CSL_AUTH_FT], [CSL_AUTH_PT], [CSL_AUTH_LOAN_AMNT]
     , [CSL_AUTH_LOAN_DATE], [PSL_AUTH_LOAN_AMNT], [PSL_AUTH_LOAN_DATE], [ASSISTANCE_TOTAL], [ASSESSMENT_REVIEW_FLG]
     , [CSG_DOCTORAL_AMOUNT], [CSG_DISABILITY_AMOUNT], [CAG_PERM_DISABILITY_AMNT], [CSG_DEPENDENT_AMOUNT], [CSG_DATE]
     , [CMS_AMOUNT], [CMS_DATE], [PROV_GRANT_UNMET_AMNT], [PROV_GRANT_AMNT], [PROV_GRANT_DATE], [ASSESSMENT_CODE]
     , [VERSION_NUM], [APP_STATUS], [REASSESS_INDICATOR], [CAT_CODE], [SINGLE_IND_STAT_REAS], [SOCIAL_ASSIST_FLG]
     , [PARENT1_SIN], [PARENT1_POSTAL_CODE], [PARENT2_SIN], [PARENT2_POSTAL_CODE], [POSTAL_SUFFIX], [PSTUDY_WEEKS]
     , [PSTUDY_HOME_AWAY], [STUDY_HOME_AWAY], [PROGRAM_TYPE], [ACADEMIC_YEAR_STUDY], [YEAR_IN_PROGRAM]
     , [PROGRAM_DURATION], [EARLY_WITHDRAWAL_IND], [DATE_LEFT_HS], [SPOUSE_DATE_LEFT_HS], [PSTUDY_INCOME_OTHER]
     , [PSTUDY_INCOME_EMPLOY], [SPOUSE_INCOME_ANNUAL], [SPOUSE_PSTUDY_INCOME], [SPOUSE_STUDY_INCOME]
     , [PARENT1_INCOME_TAXABLE], [PARENT1_INCOME_TAXPAID], [PARENT2_INCOME_TAXABLE], [PARENT2_INCOME_TAXPAID]
     , [JOINT_ASSET_FLG], [STUDENT_RESP], [PARENTAL_ASSET], [JOINT_CONTRIB_FLG], [SPOUSE_PSTUDY_CONTRIB]
     , [STUDENT_ASSET_CONTRIB], [SPOUSE_ASSET_CONTRIB], [PARENTAL_ASSET_CONTRIB], [OTHER_RESOURCES]
     , [PSTUDY_COST_LIVING], [PSTUDY_COST_LOAN], [PSTUDY_PT_COST_TUITN], [STUDY_COST_LIVING], [STUDY_COST_BOOKS]
     , [STUDY_COST_CHILDCARE_ALLW], [STUDY_COST_CHILDCARE_ACTL], [STUDY_COST_RETURN_TRANS], [STUDY_COST_OTHER_TRANS]
     , [STUDY_COST_RELOCATION], [STUDY_COST_OTHER], [STUDY_COST_TOTAL], [ABORIGINAL_CAT], [STUD_GROSS_ANNUAL_INCOME]
     , [SPOUSE_GROSS_ANNUAL_INCOME], [CSG_LI], [CSG_MI], [CSG_PD], [CSG_FTDEP], [CSG_PDSE], [TRANSITION_GRANT_AMT]
     , [TGRANT_YRS_REMAINING], [PSTUDY_DEP_COST_LIVING], [PREVIOUS_DISBURSEMENT], [STUDY_INCOME_GOV_GRANT]
     , [PSTUDY_X_TRANS_TOTAL], [STUDY_DIRECTED_INCOME], [FINANCIAL_INVESTMENTS], [MARRIED_ADJUSTMENT]
     , [STUDY_COST_COMPUTERS]
FROM sfaadmin.csl_nars_history
WHERE history_detail_id IN (SELECT id FROM sfa.application)
  AND assessment_id IN (SELECT id FROM sfa.assessment)
SET IDENTITY_INSERT sfa.cls_nars_history OFF

SET IDENTITY_INSERT sfa.disbursement ON
INSERT
INTO sfa.disbursement ( id, disbursement_type_id, assessment_id, funding_request_id, disbursed_amount, due_date
                      , tax_year, issue_date, paid_amount, change_reason_id
                      , financial_batch_id, financial_batch_id_year, financial_batch_run_date, financial_batch_serial_no
                      , transaction_number, csl_cert_seq_number
                      , ecert_sent_date, ecert_response_date, ecert_status, ecert_portal_status_id)
SELECT disbursement_id, disbursement_type_id, assessment_id, funding_request_id, disbursed_amount, due_date, tax_year
     , issue_date, paid_amount, change_reason_id, financial_batch_id, financial_batch_id_year, financial_batch_run_date
     , financial_batch_serial_no, transaction_number, csl_cert_seq_number, ecert_sent_date, ecert_response_date
     , ecert_status, ecert_portal_status_id
FROM sfaadmin.disbursement
WHERE assessment_id IN (SELECT id FROM sfa.assessment)
SET IDENTITY_INSERT sfa.disbursement OFF

SET IDENTITY_INSERT sfa.entitlement_error ON
INSERT
INTO sfa.entitlement_error (id, disbursement_id, entitlement_error_code_id, is_resend)
SELECT [ENTITLEMENT_ERROR_ID], [DISBURSEMENT_ID], entitlement_error_codes.id,
       CASE WHEN [IS_RESEND_FLG] = 'Yes' THEN 1 ELSE 0 END
FROM [SFAADMIN].[ENTITLEMENT_ERROR]
         INNER JOIN sfa.entitlement_error_codes ON entitlement_error.error_code = entitlement_error_codes.code
         INNER JOIN sfa.disbursement ON [ENTITLEMENT_ERROR].disbursement_id = disbursement.id
SET IDENTITY_INSERT sfa.entitlement_error OFF
