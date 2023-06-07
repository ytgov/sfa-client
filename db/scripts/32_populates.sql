-- SFA.APPLICATION
USE SFADB_DEV;
GO

-- SFA.STUDENT
SET NOCOUNT ON
GO

BEGIN
    DECLARE @s_student_id FLOAT, @s_first_name VARCHAR(30), @s_last_name VARCHAR(30), @s_initials VARCHAR(5), @s_vendor_id VARCHAR(25), @s_yukon_id VARCHAR(15), @s_sin FLOAT, @s_national_id VARCHAR(50), @s_csl_letter_date DATETIME2(0), @s_csl_warn_code VARCHAR(1), @s_language_id FLOAT, @s_birth_date DATETIME2(0), @s_home_address1 VARCHAR(100), @s_home_address2 VARCHAR(100), @s_birth_city_id FLOAT, @s_birth_country_id FLOAT, @s_home_city_id FLOAT, @s_birth_province_id FLOAT, @s_home_province_id FLOAT, @s_home_country_id FLOAT, @s_home_phone VARCHAR(24), @s_home_postal_code VARCHAR(15), @s_home_email VARCHAR(50), @s_locator_number VARCHAR(15), @s_mailing_address1 VARCHAR(100), @s_mailing_address2 VARCHAR(100), @s_mailing_city_id FLOAT, @s_mailing_province_id FLOAT, @s_mailing_country_id FLOAT, @s_mailing_postal_code VARCHAR(15), @s_pre_funded_year NUMERIC(4, 0), @s_pre_funding_years_used FLOAT, @s_school_email VARCHAR(50), @s_school_phone VARCHAR(24), @s_created_by VARCHAR(30), @s_created_date DATETIME2(0), @s_updated_by VARCHAR(30), @s_updated_date DATETIME2(0), @s_high_school_final_grade VARCHAR(15), @s_parent_mailing_address1 VARCHAR(100), @s_arent_mailing_address2 VARCHAR(100), @s_parent_mailing_city_id FLOAT, @s_parent_mailing_province_id FLOAT, @s_parent_mailing_country_id FLOAT, @s_parent_mailing_postal_code VARCHAR(15), @s_parent_telephone VARCHAR(24), @s_pre_over_award NUMERIC(8, 2), @s_pre_yea_awards_used NUMERIC(8, 2), @s_education_level_id FLOAT, @s_high_school_id FLOAT, @s_high_school_left_year NUMERIC(4, 0), @s_high_school_left_month NUMERIC(2, 0), @s_sex FLOAT, @s_spouse_hs_end_month NUMERIC(2, 0), @s_spouse_hs_end_year NUMERIC(4, 0), @s_user_name VARCHAR(100), @s_user_password VARCHAR(255), @s_is_active_flg VARCHAR(1), @s_is_first_logon_flg VARCHAR(1), @s_last_pw_chg_date DATETIME2(0), @s_last_logon_date DATETIME2(0), @s_previous_last_name VARCHAR(30), @s_yea_expiry_date DATETIME2(0), @s_adj_yg_funding_weeks FLOAT, @s_adj_sta_upgrading_weeks FLOAT, @s_adj_outside_travel_cnt FLOAT, @s_checked_for_ytid_flg VARCHAR(3), @s_indigenous_learner VARCHAR(25), @s_crown_ward_flg VARCHAR(3);

    DECLARE @s_home_address_id INT, @s_mail_address_id INT, @s_person_id INT, @s_parent1_id INT, @s_parent2_id INT, @s_parent_address_id INT;

    DECLARE student_cursor CURSOR FOR SELECT *
    FROM sfaadmin.student;
    OPEN student_cursor;

    FETCH NEXT FROM student_cursor INTO @s_student_id, @s_first_name, @s_last_name, @s_initials, @s_vendor_id, @s_yukon_id, @s_sin , @s_national_id, @s_csl_letter_date, @s_csl_warn_code, @s_language_id, @s_birth_date, @s_home_address1, @s_home_address2, @s_birth_city_id, @s_birth_country_id, @s_home_city_id, @s_birth_province_id, @s_home_province_id, @s_home_country_id, @s_home_phone, @s_home_postal_code, @s_home_email, @s_locator_number, @s_mailing_address1, @s_mailing_address2, @s_mailing_city_id, @s_mailing_province_id, @s_mailing_country_id, @s_mailing_postal_code, @s_pre_funded_year, @s_pre_funding_years_used, @s_school_email, @s_school_phone, @s_created_by, @s_created_date, @s_updated_by, @s_updated_date, @s_high_school_final_grade, @s_parent_mailing_address1, @s_arent_mailing_address2, @s_parent_mailing_city_id, @s_parent_mailing_province_id, @s_parent_mailing_country_id, @s_parent_mailing_postal_code, @s_parent_telephone, @s_pre_over_award, @s_pre_yea_awards_used, @s_education_level_id, @s_high_school_id, @s_high_school_left_year, @s_high_school_left_month, @s_sex, @s_spouse_hs_end_month, @s_spouse_hs_end_year, @s_user_name, @s_user_password, @s_is_active_flg, @s_is_first_logon_flg, @s_last_pw_chg_date, @s_last_logon_date, @s_previous_last_name, @s_yea_expiry_date, @s_adj_yg_funding_weeks, @s_adj_sta_upgrading_weeks, @s_adj_outside_travel_cnt, @s_checked_for_ytid_flg, @s_indigenous_learner, @s_crown_ward_flg;

    WHILE @@FETCH_STATUS = 0 BEGIN
        -- create the student person
        INSERT
        INTO sfa.person (language_id, sex_id, birth_city_id, birth_province_id, birth_country_id,
                        first_name, last_name, initials, previous_last_name, sin, birth_date, telephone, email)
        VALUES (@s_language_id, @s_sex, @s_birth_city_id, @s_birth_province_id, @s_birth_country_id,
                @s_first_name, @s_last_name, @s_initials, @s_previous_last_name, LTRIM(STR(@s_sin, 15, 0)), @s_birth_date, @s_home_phone,
                @s_home_email);

        SELECT @s_person_id = SCOPE_IDENTITY();

        -- create the home address
        INSERT
        INTO sfa.person_address (person_id, address_type_id, address1, address2, city_id, province_id, country_id,
                                postal_code)
        VALUES (@s_person_id, 1, @s_home_address1, @s_home_address2, @s_home_city_id, @s_home_province_id,
                @s_home_country_id, @s_home_postal_code);

        SELECT @s_home_address_id = SCOPE_IDENTITY();

        -- create the mailing address
        INSERT
        INTO sfa.person_address (person_id, address_type_id, address1, address2, city_id, province_id, country_id,
                                postal_code)
        VALUES (@s_person_id, 2, @s_mailing_address1, @s_mailing_address2, @s_mailing_city_id, @s_mailing_province_id,
                @s_mailing_country_id, @s_mailing_postal_code);

        SELECT @s_mail_address_id = SCOPE_IDENTITY();

        -- create the parent address
        INSERT
        INTO sfa.person_address (person_id, address_type_id, address1, city_id, province_id, country_id, postal_code)
        VALUES (@s_person_id, 4, @s_parent_mailing_address1, @s_parent_mailing_city_id, @s_parent_mailing_province_id,
                @s_parent_mailing_country_id, @s_parent_mailing_postal_code);

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
                @s_adj_sta_upgrading_weeks, @s_adj_outside_travel_cnt);

        SET IDENTITY_INSERT sfa.student OFF

        FETCH NEXT FROM student_cursor INTO @s_student_id, @s_first_name, @s_last_name, @s_initials, @s_vendor_id, @s_yukon_id, @s_sin , @s_national_id, @s_csl_letter_date, @s_csl_warn_code, @s_language_id, @s_birth_date, @s_home_address1, @s_home_address2, @s_birth_city_id, @s_birth_country_id, @s_home_city_id, @s_birth_province_id, @s_home_province_id, @s_home_country_id, @s_home_phone, @s_home_postal_code, @s_home_email, @s_locator_number, @s_mailing_address1, @s_mailing_address2, @s_mailing_city_id, @s_mailing_province_id, @s_mailing_country_id, @s_mailing_postal_code, @s_pre_funded_year, @s_pre_funding_years_used, @s_school_email, @s_school_phone, @s_created_by, @s_created_date, @s_updated_by, @s_updated_date, @s_high_school_final_grade, @s_parent_mailing_address1, @s_arent_mailing_address2, @s_parent_mailing_city_id, @s_parent_mailing_province_id, @s_parent_mailing_country_id, @s_parent_mailing_postal_code, @s_parent_telephone, @s_pre_over_award, @s_pre_yea_awards_used, @s_education_level_id, @s_high_school_id, @s_high_school_left_year, @s_high_school_left_month, @s_sex, @s_spouse_hs_end_month, @s_spouse_hs_end_year, @s_user_name, @s_user_password, @s_is_active_flg, @s_is_first_logon_flg, @s_last_pw_chg_date, @s_last_logon_date, @s_previous_last_name, @s_yea_expiry_date, @s_adj_yg_funding_weeks, @s_adj_sta_upgrading_weeks, @s_adj_outside_travel_cnt, @s_checked_for_ytid_flg, @s_indigenous_learner, @s_crown_ward_flg;
    END;

    CLOSE student_cursor;
    DEALLOCATE student_cursor;
    PRINT 'Student Cursor Completed.';
END;
GO

SET NOCOUNT OFF
GO