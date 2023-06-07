-- SFA.APPLICATION
USE SFADB_DEV;
GO
BEGIN
	DECLARE @history_detail_id FLOAT, @student_id FLOAT, @parent1_first_name VARCHAR(30), @parent1_last_name VARCHAR(30), @parent1_income NUMERIC(8, 2), @parent1_tax_paid NUMERIC(8, 2), @parent1_relationship_id FLOAT, @parent2_first_name VARCHAR(30), @parent2_last_name VARCHAR(30), @parent2_income NUMERIC(8, 2), @parent2_tax_paid NUMERIC(8, 2), @parent2_relationship_id FLOAT, @created_by VARCHAR(30), @created_date DATETIME2(0), @updated_by VARCHAR(30), @updated_date DATETIME2(0), @institution_id FLOAT, @study_area_id FLOAT, @program_id FLOAT, @classes_start_date DATETIME2(0), @classes_end_date DATETIME2(0), @correspondence_flag NUMERIC(3, 0), @coop_paid_flag NUMERIC(3, 0), @aboriginal_status_id FLOAT, @marital_status_id FLOAT, @citizenship_status FLOAT, @disabled_flag NUMERIC(3, 0), @minority_flag NUMERIC(3, 0), @student_number VARCHAR(30), @academic_year VARCHAR(15), @program_year_total FLOAT, @program_year FLOAT, @two_residence_flag FLOAT, @moving_flag FLOAT, @csl_classification NUMERIC(3, 0), @csl_previous_province_id FLOAT, @program_division_explan VARCHAR(100), @prestudy_accom_code NUMERIC(3, 0), @prestudy_own_home_flag NUMERIC(3, 0), @prestudy_board_amount NUMERIC(7, 2), @prestudy_city_id FLOAT, @prestudy_province_id FLOAT, @prestudy_bus_flag NUMERIC(3, 0), @prestudy_distance NUMERIC(5, 0), @prestudy_employ_status_id FLOAT, @study_accom_code NUMERIC(3, 0), @study_own_home_flag NUMERIC(3, 0), @study_board_amount NUMERIC(7, 2), @study_city_id FLOAT, @study_province_id FLOAT, @study_bus_flag NUMERIC(3, 0), @study_distance NUMERIC(5, 0), @books_supplies_cost NUMERIC(6, 0), @outstanding_cslpt_amt NUMERIC(8, 2), @previous_csg_pt_amt NUMERIC(8, 2), @stat_info_comment VARCHAR(500), @percent_of_full_time NUMERIC(3, 0), @part_of_ft_flag NUMERIC(3, 0), @study_weeks_count NUMERIC(3, 0), @class_hours_per_week NUMERIC(4, 1), @parent_residence_comment VARCHAR(500), @study_living_w_spouse_flag NUMERIC(3, 0), @tuition_estimate NUMERIC(9, 2), @program_division NUMERIC(3, 0), @previous_cslft_flag NUMERIC(1, 0), @previous_cslpt_flag NUMERIC(1, 0), @parent1_citizenship_code NUMERIC(1, 0), @spouse_prestudy_emp_status_id FLOAT, @spouse_study_emp_status_id FLOAT, @spouse_study_school_from DATETIME2(0), @spouse_study_school_to DATETIME2(0), @spouse_pstudy_school_to DATETIME2(0), @spouse_pstudy_school_from DATETIME2(0), @spouse_study_csl_flag NUMERIC(3, 0), @spouse_study_bus_flag NUMERIC(3, 0), @spouse_study_distance NUMERIC(5, 0), @spouse_last_name VARCHAR(30), @spouse_first_name VARCHAR(30), @spouse_initials VARCHAR(5), @coop_start_year NUMERIC(4, 0), @coop_start_month NUMERIC(2, 0), @coop_end_year NUMERIC(4, 0), @coop_end_month NUMERIC(2, 0), @spouse_pstudy_income_comment VARCHAR(500), @spouse_study_income_comment VARCHAR(500), @spouse_sin FLOAT, @exclude_from_count NUMERIC(4, 0), @perm_disabled_flag NUMERIC(3, 0), @disabled_equipment VARCHAR(256), @previous_csg_disability_amount NUMERIC(8, 2), @previous_csg_fem_doc_amount NUMERIC(8, 2), @spouse_hs_end_year NUMERIC(4, 0), @spouse_hs_end_month NUMERIC(2, 0), @credit_chk_reqd_date DATETIME2(0), @credit_chk_fax_sent_date DATETIME2(0), @credit_chk_passed_date DATETIME2(0), @credit_chk_passed_flag NUMERIC(4, 0), @credit_chk_appeal_date DATETIME2(0), @credit_chk_app_comp_date DATETIME2(0), @credit_chk_app_comp_flag NUMERIC(4, 0), @credit_chk_comp_date DATETIME2(0), @csl_clearance_date DATETIME2(0), @prestudy_csl_classification NUMERIC(3, 0), @category_id FLOAT, @yea_tot_receipt_amount NUMERIC(8, 2), @academic_percent FLOAT, @csl_restriction_comment VARCHAR(2000), @in_progress_page NUMERIC(10, 0), @online_start_date DATETIME2(0), @online_submit_date DATETIME2(0), @parent1_sin FLOAT, @parent2_sin FLOAT, @parent1_net_income NUMERIC(8, 2), @parent2_net_income NUMERIC(8, 2), @student_ln150_income NUMERIC(8, 2), @spouse_ln150_income NUMERIC(8, 2), @rem_transition_grant_yrs NUMERIC(3, 0), @taxes_filed_year1 NUMERIC(4, 0), @taxes_filed_year2 NUMERIC(4, 0), @taxes_filed1_province_id FLOAT, @taxes_filed2_province_id FLOAT, @taxes_not_filed_yr1_flg VARCHAR(1), @taxes_not_filed_yr2_flg VARCHAR(1), @applied_other_funding_flg VARCHAR(1), @csl_restriction_warn_id FLOAT, @csl_restriction_reason_id FLOAT, @courses_per_week NUMERIC(4, 0), @first_nation_id FLOAT, @prestudy_start_date DATETIME2(0), @prestudy_end_date DATETIME2(0), @school_email VARCHAR(50), @school_phone VARCHAR(24), @rowid UNIQUEIDENTIFIER;
	
	DECLARE @spouse_id INT, @parent1_id INT, @parent2_id INT;
	
	DECLARE app_cursor CURSOR LOCAL FOR SELECT h.*, s.school_email, s.school_phone
	FROM [sfaadmin].[history_detail] h
	         INNER JOIN [sfaadmin].[student] s ON h.student_id = s.student_id
	WHERE history_detail_id NOT IN (2348, 3202, 2288, 16170);
	OPEN app_cursor;
	
	FETCH NEXT FROM app_cursor INTO @history_detail_id, @student_id, @parent1_first_name, @parent1_last_name, @parent1_income, @parent1_tax_paid, @parent1_relationship_id, @parent2_first_name, @parent2_last_name, @parent2_income, @parent2_tax_paid, @parent2_relationship_id, @created_by, @created_date, @updated_by, @updated_date, @institution_id, @study_area_id, @program_id, @classes_start_date, @classes_end_date, @correspondence_flag, @coop_paid_flag, @aboriginal_status_id, @marital_status_id, @citizenship_status, @disabled_flag, @minority_flag, @student_number, @academic_year, @program_year_total, @program_year, @two_residence_flag, @moving_flag, @csl_classification, @csl_previous_province_id, @program_division_explan, @prestudy_accom_code, @prestudy_own_home_flag, @prestudy_board_amount, @prestudy_city_id, @prestudy_province_id, @prestudy_bus_flag, @prestudy_distance, @prestudy_employ_status_id, @study_accom_code, @study_own_home_flag, @study_board_amount, @study_city_id, @study_province_id, @study_bus_flag, @study_distance, @books_supplies_cost, @outstanding_cslpt_amt, @previous_csg_pt_amt, @stat_info_comment, @percent_of_full_time, @part_of_ft_flag, @study_weeks_count, @class_hours_per_week, @parent_residence_comment, @study_living_w_spouse_flag, @tuition_estimate, @program_division, @previous_cslft_flag, @previous_cslpt_flag, @parent1_citizenship_code, @spouse_prestudy_emp_status_id, @spouse_study_emp_status_id, @spouse_study_school_from, @spouse_study_school_to, @spouse_pstudy_school_to, @spouse_pstudy_school_from, @spouse_study_csl_flag, @spouse_study_bus_flag, @spouse_study_distance, @spouse_last_name, @spouse_first_name, @spouse_initials, @coop_start_year, @coop_start_month, @coop_end_year, @coop_end_month, @spouse_pstudy_income_comment, @spouse_study_income_comment, @spouse_sin, @exclude_from_count, @perm_disabled_flag, @disabled_equipment, @previous_csg_disability_amount, @previous_csg_fem_doc_amount, @spouse_hs_end_year, @spouse_hs_end_month, @credit_chk_reqd_date, @credit_chk_fax_sent_date, @credit_chk_passed_date, @credit_chk_passed_flag, @credit_chk_appeal_date, @credit_chk_app_comp_date, @credit_chk_app_comp_flag, @credit_chk_comp_date, @csl_clearance_date, @prestudy_csl_classification, @category_id, @yea_tot_receipt_amount, @academic_percent, @csl_restriction_comment, @in_progress_page, @online_start_date, @online_submit_date, @parent1_sin, @parent2_sin, @parent1_net_income, @parent2_net_income, @student_ln150_income, @spouse_ln150_income, @rem_transition_grant_yrs, @taxes_filed_year1, @taxes_filed_year2, @taxes_filed1_province_id, @taxes_filed2_province_id, @taxes_not_filed_yr1_flg, @taxes_not_filed_yr2_flg, @applied_other_funding_flg, @csl_restriction_warn_id, @csl_restriction_reason_id, @courses_per_week, @first_nation_id, @prestudy_start_date, @prestudy_end_date, @rowid, @school_email, @school_phone;
	
	WHILE @@FETCH_STATUS = 0 
	BEGIN
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
	
	     INSERT INTO sfa.application
            (id,
             student_id,
             academic_year_id,
             institution_campus_id,
             study_area_id,
             program_id,
             aboriginal_status_id,
             marital_status_id,
             category_id,
             first_nation_id,
             spouse_id,
             parent1_id,
             parent2_id,
             parent1_income,
             parent1_net_income,
             parent1_tax_paid,
             parent2_income,
             parent2_net_income,
             parent2_tax_paid,
             school_email,
             school_telephone,
             spouse_hs_end_year,
             spouse_hs_end_month,
             spouse_prestudy_emp_status_id,
             spouse_pstudy_school_from,
             spouse_pstudy_school_to,
             spouse_pstudy_income_comment,
             spouse_study_emp_status_id,
             spouse_study_school_from,
             spouse_study_school_to,
             is_spouse_study_csl,
             is_spouse_study_bus,
             spouse_study_distance,
             spouse_study_income_comment,
             classes_start_date,
             classes_end_date,
             is_correspondence,
             is_coop_paid,
             citizenship_status,
             is_disabled,
             is_minority,
             student_number,
             program_year_total,
             program_year,
             is_two_residence,
             is_moving,
             csl_classification,
             csl_previous_province_id,
             program_division_explanation,
             prestudy_accom_code,
             prestudy_own_home,
             prestudy_board_amount,
             prestudy_city_id,
             prestudy_province_id,
             prestudy_bus,
             prestudy_distance,
             prestudy_employ_status_id,
             study_accom_code,
             study_own_home,
             study_board_amount,
             study_city_id,
             study_province_id,
             study_bus,
             study_distance,
             stat_info_comment,
             books_supplies_cost,
             outstanding_cslpt_amount,
             previous_csg_pt_amount,
             percent_of_full_time,
             is_part_of_ft,
             study_weeks_count,
             class_hours_per_week,
             parent_residence_comment,
             study_living_w_spouse,
             tuition_estimate_amount,
             program_division,
             is_previous_cslft,
             is_previous_cslpt,
             coop_start_year,
             coop_start_month,
             coop_end_year,
             coop_end_month,
             exclude_from_count,
             is_perm_disabled,
             disabled_equipment,
             previous_csg_disability_amount,
             previous_csg_fem_doc_amount,
             credit_chk_reqd_date,
             credit_chk_fax_sent_date,
             credit_chk_passed_date,
             credit_chk_passed,
             credit_chk_appeal_date,
             credit_chk_app_comp_date,
             credit_chk_app_comp,
             credit_chk_comp_date,
             csl_clearance_date,
             prestudy_csl_classification,
             yea_tot_receipt_amount,
             academic_percent,
             csl_restriction_comment,
             in_progress_page,
             online_start_date,
             online_submit_date,
             rem_transition_grant_years,
             student_ln150_income,
             spouse_ln150_income,
             taxes1_filed_year,
             taxes2_filed_year,
             taxes1_filed_province_id,
             taxes2_filed_province_id,
             taxes1_not_filed,
             taxes2_not_filed,
             applied_other_funding,
             csl_restriction_warn_id,
             csl_restriction_reason_id,
             courses_per_week,
             prestudy_start_date,
             prestudy_end_date)
VALUES      (@history_detail_id,
             @student_id,
             COALESCE(@academic_year, DATEPART(YEAR, @created_date)),
             COALESCE(@institution_id, 0),
             @study_area_id,
             @program_id,
             @aboriginal_status_id,
             @marital_status_id,
             @category_id,
             @first_nation_id,
             @spouse_id,
             @parent1_id,
             @parent2_id,
             @parent1_income,
             @parent1_net_income,
             @parent1_tax_paid,
             @parent2_income,
             @parent2_net_income,
             @parent2_tax_paid,
             @school_email,
             @school_phone,
             @spouse_hs_end_year,
             @spouse_hs_end_month,
             @spouse_prestudy_emp_status_id,
             @spouse_pstudy_school_from,
             @spouse_pstudy_school_to,
             @spouse_pstudy_income_comment,
             @spouse_study_emp_status_id,
             @spouse_study_school_from,
             @spouse_study_school_to,
             COALESCE(@spouse_study_csl_flag, 0),
             COALESCE(@spouse_study_bus_flag, 0),
             @spouse_study_distance,
             @spouse_study_income_comment,
             @classes_start_date,
             @classes_end_date,
             COALESCE(@correspondence_flag, 0),
             COALESCE(@coop_paid_flag, 0),
             COALESCE(@citizenship_status, 1),
             COALESCE(@disabled_flag, 0),
             COALESCE(@minority_flag, 0),
             @student_number,
             @program_year_total,
             @program_year,
             COALESCE(@two_residence_flag, 0),
             COALESCE(@moving_flag, 0),
             @csl_classification,
             @csl_previous_province_id,
             @program_division_explan,
             @prestudy_accom_code,
             COALESCE(@prestudy_own_home_flag, 0),
             @prestudy_board_amount,
             @prestudy_city_id,
             @prestudy_province_id,
             COALESCE(@prestudy_bus_flag, 0),
             @prestudy_distance,
             @prestudy_employ_status_id,
             @study_accom_code,
             COALESCE(@study_own_home_flag, 0),
             @study_board_amount,
             @study_city_id,
             @study_province_id,
             COALESCE(@study_bus_flag, 0),
             @study_distance,
             @stat_info_comment,
             @books_supplies_cost,
             @outstanding_cslpt_amt,
             @previous_csg_pt_amt,
             @percent_of_full_time,
             COALESCE(@part_of_ft_flag, 0),
             @study_weeks_count,
             @class_hours_per_week,
             @parent_residence_comment,
             COALESCE(@study_living_w_spouse_flag, 0),
             @tuition_estimate,
             COALESCE(@program_division, 0),
             COALESCE(@previous_cslft_flag, 0),
             COALESCE(@previous_cslpt_flag, 0),
             @coop_start_year,
             @coop_start_month,
             @coop_end_year,
             @coop_end_month,
             COALESCE(@exclude_from_count, 0),
             COALESCE(@perm_disabled_flag, 0),
             @disabled_equipment,
             @previous_csg_disability_amount,
             @previous_csg_fem_doc_amount,
             @credit_chk_reqd_date,
             @credit_chk_fax_sent_date,
             @credit_chk_passed_date,
             COALESCE(@credit_chk_passed_flag, 0),
             @credit_chk_appeal_date,
             @credit_chk_app_comp_date,
             COALESCE(@credit_chk_app_comp_flag, 0),
             @credit_chk_comp_date,
             @csl_clearance_date,
             @prestudy_csl_classification,
             @yea_tot_receipt_amount,
             @academic_percent,
             @csl_restriction_comment,
             @in_progress_page,
             @online_start_date,
             @online_submit_date,
             @rem_transition_grant_yrs,
             @student_ln150_income,
             @spouse_ln150_income,
             @taxes_filed_year1,
             @taxes_filed_year2,
             @taxes_filed1_province_id,
             @taxes_filed2_province_id,
             (CASE WHEN @taxes_not_filed_yr1_flg = 'Y' THEN 1 ELSE 0 END),
             (CASE WHEN @taxes_not_filed_yr2_flg = 'Y' THEN 1 ELSE 0 END),
             (CASE WHEN @applied_other_funding_flg = 'Y' THEN 1 ELSE 0 END),
             @csl_restriction_warn_id,
             @csl_restriction_reason_id,
             @courses_per_week,
             @prestudy_start_date,
             @prestudy_end_date);
	
	    SET IDENTITY_INSERT sfa.application OFF
	
	    FETCH NEXT FROM app_cursor INTO @history_detail_id, @student_id, @parent1_first_name, @parent1_last_name, @parent1_income, @parent1_tax_paid, @parent1_relationship_id, @parent2_first_name, @parent2_last_name, @parent2_income, @parent2_tax_paid, @parent2_relationship_id, @created_by, @created_date, @updated_by, @updated_date, @institution_id, @study_area_id, @program_id, @classes_start_date, @classes_end_date, @correspondence_flag, @coop_paid_flag, @aboriginal_status_id, @marital_status_id, @citizenship_status, @disabled_flag, @minority_flag, @student_number, @academic_year, @program_year_total, @program_year, @two_residence_flag, @moving_flag, @csl_classification, @csl_previous_province_id, @program_division_explan, @prestudy_accom_code, @prestudy_own_home_flag, @prestudy_board_amount, @prestudy_city_id, @prestudy_province_id, @prestudy_bus_flag, @prestudy_distance, @prestudy_employ_status_id, @study_accom_code, @study_own_home_flag, @study_board_amount, @study_city_id, @study_province_id, @study_bus_flag, @study_distance, @books_supplies_cost, @outstanding_cslpt_amt, @previous_csg_pt_amt, @stat_info_comment, @percent_of_full_time, @part_of_ft_flag, @study_weeks_count, @class_hours_per_week, @parent_residence_comment, @study_living_w_spouse_flag, @tuition_estimate, @program_division, @previous_cslft_flag, @previous_cslpt_flag, @parent1_citizenship_code, @spouse_prestudy_emp_status_id, @spouse_study_emp_status_id, @spouse_study_school_from, @spouse_study_school_to, @spouse_pstudy_school_to, @spouse_pstudy_school_from, @spouse_study_csl_flag, @spouse_study_bus_flag, @spouse_study_distance, @spouse_last_name, @spouse_first_name, @spouse_initials, @coop_start_year, @coop_start_month, @coop_end_year, @coop_end_month, @spouse_pstudy_income_comment, @spouse_study_income_comment, @spouse_sin, @exclude_from_count, @perm_disabled_flag, @disabled_equipment, @previous_csg_disability_amount, @previous_csg_fem_doc_amount, @spouse_hs_end_year, @spouse_hs_end_month, @credit_chk_reqd_date, @credit_chk_fax_sent_date, @credit_chk_passed_date, @credit_chk_passed_flag, @credit_chk_appeal_date, @credit_chk_app_comp_date, @credit_chk_app_comp_flag, @credit_chk_comp_date, @csl_clearance_date, @prestudy_csl_classification, @category_id, @yea_tot_receipt_amount, @academic_percent, @csl_restriction_comment, @in_progress_page, @online_start_date, @online_submit_date, @parent1_sin, @parent2_sin, @parent1_net_income, @parent2_net_income, @student_ln150_income, @spouse_ln150_income, @rem_transition_grant_yrs, @taxes_filed_year1, @taxes_filed_year2, @taxes_filed1_province_id, @taxes_filed2_province_id, @taxes_not_filed_yr1_flg, @taxes_not_filed_yr2_flg, @applied_other_funding_flg, @csl_restriction_warn_id, @csl_restriction_reason_id, @courses_per_week, @first_nation_id, @prestudy_start_date, @prestudy_end_date, @rowid, @school_email, @school_phone;
	END
	
	CLOSE app_cursor;
	DEALLOCATE app_cursor;
    PRINT 'Application Cursor Complete';
END;
GO