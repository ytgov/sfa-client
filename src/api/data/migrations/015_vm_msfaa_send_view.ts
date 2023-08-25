import { Knex } from "knex";

exports.up = async function (knex: Knex) {
  return knex.raw(`
  CREATE OR ALTER VIEW sfa.VW_MSFAA_SEND (AGREEMENT_NUM_INIT,AGREEMENT_NUMBER,SIN,INSTITUTION_CODE,DATE_OF_BIRTH,DATE_PRODUCED,LAST_NAME,FIRST_NAME,INITIALS,GENDER,MARITAL_STATUS,HOME_ADDRESS1,HOME_ADDRESS2,HOME_CITY,HOME_PROVINCE,HOME_PROVINCE_ID,HOME_POSTAL_CODE,HOME_COUNTRY,HOME_PHONE,HOME_EMAIL,MAILING_ADDRESS1,MAILING_ADDRESS2,MAILING_CITY,MAILING_PROVINCE,MAILING_PROVINCE_ID,MAILING_POSTAL_CODE,MAILING_COUNTRY,SCHOOL_PHONE,SCHOOL_EMAIL,SENT_DATE,SENT_SEQ_NUMBER,MSFAA_STATUS,CLASSES_END_DATE,PART_FULL_TIME) AS 
  SELECT CASE WHEN m.is_full_time = 0 THEN 1 ELSE 0  END--'PT',1,0)
        , m.id 
        , SUBSTRING(per.sin,1,9)
        , inst.federal_institution_code--(SELECT institution_code FROM institution WHERE institution_id = app.institution_id) -- single line select used as left joins are more expensive in time
        , FORMAT(per.birth_date, 'yyyyMMdd') --TO_CHAR(s.birth_date,'yyyymmdd')
        , FORMAT(m.REC_CREATE_DATE, 'yyyyMMdd') --TO_CHAR(m.REC_CREATE_DATE,'yyyymmdd') 
        , per.last_name 
        , per.first_name 
        , per.initials 
        , CASE WHEN per.sex_id = 2 THEN 'F' ELSE 'M' END
        , CASE WHEN app.marital_status_id = 1 THEN 'S'
                WHEN app.marital_status_id = 2 THEN 'S'
                WHEN app.marital_status_id = 4 THEN 'M'
                ELSE 'O'
          END
        , ISNULL(pa_home.address1,' ') 
        , ISNULL(pa_home.address2,' ') 
        , c_home.description--(SELECT description FROM city WHERE city_id = pa_home.city_id ) -- single line select used as left joins are more expensive in time
        , prov_home.abbreviation --(SELECT abbreviation FROM province WHERE province_id = pa_home.province_id ) -- single line select used as left joins are more expensive in time
        , pa_home.province_id 
        , ISNULL(UPPER(CASE 
                          WHEN LEN(pa_home.postal_code) = 7 THEN 
                            CONCAT(SUBSTRING(pa_home.postal_code,1,3), SUBSTRING(pa_home.postal_code,5,3)) 
                          ELSE 
                            pa_home.postal_code
                          END ), ' ') --DECODE(LEN(pa_home.postal_code),7,SUBSTRING(pa_home.postal_code,1,3)||SUBSTRING(pa_home.postal_code,5,3),pa_home.postal_code)),' ') 
        , count_home.description--(SELECT description FROM country WHERE country_id = pa_home.country_id) -- single line select used as left joins are more expensive in time
        , ISNULL(pa_home.telephone,' ')
        , ISNULL(pa_home.email,' ')
        , ISNULL(pa_mailing.address1,' ')
        , ISNULL(pa_mailing.address2,' ')
        , c_mailing.description --(SELECT description FROM city WHERE city_id = pa_mailing.city_id) -- single line select used as left joins are more expensive in time
        , prov_mailing.abbreviation-- (SELECT abbreviation FROM province WHERE province_id = pa_mailing.province_id) -- single line select used as left joins are more expensive in time
        , pa_mailing.province_id 
        , ISNULL(UPPER(CASE 
                        WHEN LEN(pa_mailing.postal_code) = 7 THEN 
                          CONCAT(SUBSTRING(pa_mailing.postal_code,1,3), SUBSTRING(pa_mailing.postal_code,5,3)) 
                        ELSE pa_mailing.postal_code END  ),' ') 
        , count_mailing.description -- (SELECT description FROM province WHERE country_id = pa_mailing.country_id) -- single line select used as left joins are more expensive in time
        , ISNULL(app.school_telephone,' ')
        , ISNULL(app.school_email,' ')
        , m.sent_date
        , m.sent_seq_number
        , m.msfaa_status
        , app.classes_end_date
        , CASE WHEN m.is_full_time  = 1  THEN 'FT' ELSE 'PT' END
  FROM sfa.msfaa m 
  INNER JOIN sfa.student s 
    ON  m.student_id  = s.id
  INNER JOIN sfa.person per
    ON per.id = s.person_id
  INNER JOIN sfa.application app
    ON m.application_id = app.id
  INNER JOIN sfa.person_address pa_home
    ON pa_home.person_id = per.id AND pa_home.address_type_id = 1
  INNER JOIN sfa.person_address pa_mailing
    ON pa_mailing.person_id = s.person_id AND pa_mailing.address_type_id = 2
  LEFT JOIN sfa.city c_home
    ON  c_home.id = pa_home.city_id
  LEFT JOIN sfa.province prov_home
    ON prov_home.id = pa_home.province_id
  LEFT JOIN sfa.country  count_home
    ON count_home.id = pa_home.country_id
  LEFT JOIN sfa.city c_mailing
    ON  c_mailing.id = pa_mailing.city_id
  LEFT JOIN sfa.province prov_mailing
    ON prov_mailing.id = pa_mailing.province_id
  LEFT JOIN sfa.country  count_mailing
    ON count_mailing.id = pa_mailing.country_id
  LEFT JOIN sfa.institution_campus inst 
	ON inst.id = app.institution_campus_id`  
  );
};

exports.down = async function (knex: Knex) {
  return knex.raw(`DROP VIEW sfa.VW_MSFAA_SEND`);
};
