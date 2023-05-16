-- STA Upgrading Weeks - Pre-Legislation Chg
--before get_prev_pre_leg_weeks
CREATE OR ALTER FUNCTION sfa.fn_get_pre_leg_sta_up_weeks 
(
    @student_id INT
)
RETURNS NUMERIC
AS 
BEGIN
	
	DECLARE  @v_num_weeks NUMERIC = 0;
	
    SELECT 
    @v_num_weeks = SUM(a2.weeks_allowed)
    FROM 
    sfa.application a, 
    sfa.funding_request fr,
    (
        SELECT 
        funding_request_id,
        assessment_id,
        sum(disbursed_amount) disbursed_amount
        FROM sfa.disbursement
        GROUP BY funding_request_id, assessment_id
    ) d, 
    sfa.assessment a2
    WHERE a.id = fr.application_id
    AND fr.id = d.funding_request_id
    AND d.assessment_id = a2.id
    AND a.student_id = @student_id
    AND a.academic_year_id <= 2015
    AND a.program_id = 12 -- 'Upgrading-Academic'
    AND d.disbursed_amount > 0 -- positive disbursement
    AND fr.request_type_id = 1 -- request type STA
    GROUP BY a.student_id;

    RETURN CEILING(@v_num_weeks); 
END

GO

-- STA YG Outside Travel Count - Pre-Legislation Chg
CREATE OR ALTER FUNCTION sfa.fn_get_pre_leg_outside_travel 
(
    @student_id INT
)
RETURNS NUMERIC
AS 
BEGIN
	
	DECLARE  @v_count NUMERIC = 0;
	
    SELECT 
    @v_count = SUM(a2.airfare_amount)
    FROM 
    sfa.application a, 
    sfa.funding_request fr,
    (
        SELECT 
        funding_request_id,
        assessment_id,
        sum(disbursed_amount) disbursed_amount
        FROM sfa.disbursement
        GROUP BY funding_request_id, assessment_id
    ) d, 
    sfa.assessment a2
    WHERE a.id = fr.application_id
    AND fr.id = d.funding_request_id
    AND d.assessment_id = a2.id
    AND a.student_id = @student_id
    AND a.academic_year_id <= 2015
    AND d.disbursed_amount > 0 -- positive disbursement
    AND a2.airfare_amount > 0 -- has an airfair amount
    AND fr.request_type_id = 2 -- request type YG
    GROUP BY a.student_id;

    RETURN @v_count; 
END

GO
-- This function is used to get the previous pre-legislation YG/STA weeks prior to current HD non upgrading                
CREATE OR ALTER FUNCTION sfa.fn_get_prev_pre_leg_weeks(@student_id_p INT, @application_id_p INT)
RETURNS NUMERIC
AS 
BEGIN
    DECLARE  @v_num_weeks NUMERIC = 0;

        SELECT @v_num_weeks = CEILING(SUM(CASE WHEN fr.request_type_id = 1  THEN a.weeks_allowed ELSE  a.years_funded_equivalent*34 END))
        FROM sfa.application app
        INNER JOIN sfa.funding_request fr ON app.id = fr.application_id
            , (SELECT funding_request_id
                    , assessment_id
                    , sum(disbursed_amount) disbursed_amount
                FROM sfa.disbursement
            GROUP BY funding_request_id, assessment_id) d
        INNER JOIN sfa.assessment a ON d.assessment_id = a.id
        WHERE  fr.id = d.funding_request_id 
        AND app.id < @application_id_p 
        AND app.program_id <> (SELECT id FROM sfa.program WHERE description = 'Upgrading-Academic')
        AND app.student_id = @student_id_p
        AND app.academic_year_id <=2015
        AND d.disbursed_amount > 0 -- positive disbursement
        AND fr.request_type_id in (1,2) -- request type STA
        group by app.student_id;

        RETURN CEILING(@v_num_weeks);              

END

GO

/* This function is used to get the current system total years funded
    for the particular student not counting the given history detail
    before get_funded_years_count
*/
CREATE OR ALTER FUNCTION sfa.fn_get_funded_years_used_preleg_chg( @student_id_p INT,  @application_id_p INT)
RETURNS NUMERIC
AS 
BEGIN
    DECLARE @v_funded_years_count NUMERIC = 0;
    DECLARE c_years_funded CURSOR FOR 
        SELECT  COALESCE(sum(a.years_funded_equivalent), 0) AS years_funded
        FROM sfa.application app
        INNER JOIN  sfa.funding_request fr ON app.id = fr.application_id
        INNER JOIN  sfa.assessment a ON  fr.id  = a.funding_request_id
        WHERE app.student_id = @student_id_p 
        AND app.id <>  @application_id_p 
        AND a.years_funded_equivalent IS NOT NULL;

    OPEN  c_years_funded;
    FETCH NEXT FROM c_years_funded INTO @v_funded_years_count  
    CLOSE  c_years_funded;

        RETURN @v_funded_years_count;
END

GO

-- This function is used to get the post-legislation YG/STA weeks prior to current HD non upgrading 
CREATE OR ALTER FUNCTION sfa.fn_get_prev_post_leg_weeks(@student_id_p INT, @application_id_p INT)
RETURNS NUMERIC
AS 
BEGIN
    DECLARE  @v_num_weeks NUMERIC = 0;

    SELECT @v_num_weeks =  COALESCE(sum(a.weeks_allowed),0)
    FROM sfa.application app
    INNER JOIN sfa.funding_request fr ON app.id = fr.application_id
    INNER JOIN (SELECT funding_request_id
                    , assessment_id
                    , sum(disbursed_amount) disbursed_amount
                    FROM sfa.disbursement
            GROUP BY funding_request_id, assessment_id) d ON fr.id = d.funding_request_id
    INNER JOIN sfa.assessment a ON  d.assessment_id = a.id
    WHERE  app.program_id <> (SELECT id FROM sfa.program WHERE description = 'Upgrading-Academic')
    AND app.student_id = @student_id_p
    AND app.id <  @application_id_p
    AND app.academic_year_id  > 2015
    AND d.disbursed_amount > 0 -- positive disbursement
    group by app.student_id;

    RETURN @v_num_weeks;        
END
GO

/* This function is used to get the pre-legislation Student Training Allowance 
   upgrading weeks weeks prior to current HD */
CREATE OR ALTER FUNCTION sfa.fn_get_prev_pre_leg_sta_up_weeks(@student_id_p INT,  @application_id_p INT)
RETURNS NUMERIC
AS 
BEGIN               
       DECLARE @v_num_weeks NUMERIC = 0;

            SELECT @v_num_weeks =  COALESCE(sum(a.weeks_allowed), 0 )
            FROM sfa.application app
            INNER JOIN sfa.funding_request fr ON app.id = fr.application_id
            INNER JOIN (SELECT funding_request_id
                            , assessment_id
                            , sum(disbursed_amount) disbursed_amount
                        FROM sfa.disbursement
                    GROUP BY funding_request_id, assessment_id) d ON fr.id = d.funding_request_id
            INNER JOIN sfa.assessment a ON  d.assessment_id = a.id
            WHERE  app.student_id = @student_id_p
            AND app.id < @application_id_p
            AND app.academic_year_id <=2015
            AND app.program_id = (SELECT id FROM sfa.program WHERE description = 'Upgrading-Academic')  -- upgrading program
            AND d.disbursed_amount > 0 -- positive disbursement
            AND fr.request_type_id = 1 -- request type STA
            group by app.student_id;

            RETURN CEILING(@v_num_weeks);              

END
GO

/* This function is used to get the post-legislation Student Training Allowance upgrading weeks */
CREATE OR ALTER FUNCTION sfa.fn_get_prev_post_leg_sta_up_weeks(@student_id_p INT,  @application_id_p INT)
RETURNS NUMERIC
AS 
BEGIN                   
    DECLARE @v_num_weeks NUMERIC = 0;

                SELECT @v_num_weeks =  COALESCE(sum(a.weeks_allowed), 0 )
                FROM sfa.application app
                INNER JOIN sfa.funding_request fr ON app.id = fr.application_id
                INNER JOIN (SELECT funding_request_id
                              , assessment_id
                              , sum(disbursed_amount) disbursed_amount
                         FROM sfa.disbursement
                      GROUP BY funding_request_id, assessment_id) d ON fr.id = d.funding_request_id
                INNER JOIN sfa.assessment a ON d.assessment_id = a.id
                WHERE app.student_id = @student_id_p
                AND app.id < @application_id_p
                AND app.academic_year_id > 2015
                AND app.program_id = (SELECT id FROM sfa.program WHERE description = 'Upgrading-Academic')  -- upgrading program
                AND d.disbursed_amount > 0 -- positive disbursement
                AND fr.request_type_id = 1 -- request type STA
                group by app.student_id;

                RETURN @v_num_weeks;

END
GO 

/* This function is used to get the post-legislation Student Training Allowance  
   upgrading weeks prior to current HD */
CREATE OR ALTER FUNCTION sfa.fn_get_post_leg_sta_up_weeks(@student_id_p INT)
RETURNS NUMERIC
AS 
BEGIN                   
    DECLARE @v_num_weeks NUMERIC = 0;

        SELECT @v_num_weeks = COALESCE(sum(a.weeks_allowed),0)
        FROM sfa.application app
        INNER JOIN sfa.funding_request fr ON app.id = fr.application_id
        INNER JOIN (SELECT funding_request_id
                        , assessment_id
                        , sum(disbursed_amount) disbursed_amount
                    FROM sfa.disbursement
                GROUP BY funding_request_id, assessment_id) d ON fr.id = d.funding_request_id
        INNER JOIN sfa.assessment a ON d.assessment_id = a.id
        WHERE app.student_id = @student_id_p
        AND app.academic_year_id > 2015
        AND app.program_id = (SELECT id FROM sfa.program WHERE description = 'Upgrading-Academic')  -- upgrading program
        AND d.disbursed_amount > 0 -- positive disbursement
        AND fr.request_type_id = 1 -- request type STA
        group by app.student_id;

        RETURN @v_num_weeks;

END
GO

/* This function is used to get the post-legislation Yukon Grant outside travel count */      
CREATE OR ALTER FUNCTION sfa.fn_get_post_leg_outside_travel(@student_id_p INT)
RETURNS NUMERIC
AS 
BEGIN                   
    DECLARE @v_count NUMERIC = 0;
        SELECT @v_count = count(a.airfare_amount)
        FROM sfa.application app
        INNER JOIN sfa.funding_request fr ON  app.id = fr.application_id
        INNER JOIN (SELECT funding_request_id
                        , assessment_id
                        , sum(disbursed_amount) disbursed_amount
                    FROM sfa.disbursement
                GROUP BY funding_request_id, assessment_id) d ON fr.id = d.funding_request_id
        INNER JOIN sfa.assessment a ON d.assessment_id = a.id
            WHERE app.student_id = @student_id_p
            AND app.academic_year_id > 2015
            AND d.disbursed_amount > 0 -- positive disbursement
            AND a.airfare_amount > 0 -- has an airfair amount
            AND fr.request_type_id = 2 -- request type YG
        GROUP BY app.student_id;

        RETURN @v_count;

END
GO

--AASSESSMENT SFA
CREATE OR ALTER FUNCTION sfa.fn_get_previous_weeks_yg(@program_p VARCHAR, @student_id_p INT,  @application_id_p INT) 
RETURNS NUMERIC
AS 
BEGIN
    DECLARE @v_pre_leg_weeks NUMERIC = 0;
    DECLARE @v_post_leg_weeks NUMERIC = 0;
    DECLARE @v_total_weeks NUMERIC = 0;
    DECLARE @v_adjusted_weeks NUMERIC = 0;

		IF @student_id_p IS NOT NULL AND @application_id_p IS NOT NULL
			BEGIN
                IF @program_p = 'Upgrade'
                    BEGIN
                        SELECT @v_post_leg_weeks =  COALESCE(sfa.fn_get_prev_post_leg_sta_up_weeks(@student_id_p,  @application_id_p),0);
        
                        SELECT @v_pre_leg_weeks =  COALESCE( sfa.fn_get_prev_pre_leg_sta_up_weeks(@student_id_p,  @application_id_p),0);
                        
                        SELECT  @v_adjusted_weeks = COALESCE(adj_sta_upgrading_weeks,0) 
                        FROM sfa.student  
                        WHERE id =  @student_id_p;
                    END
                ELSE
                    BEGIN
                        SELECT @v_post_leg_weeks = COALESCE(sfa.fn_get_prev_post_leg_weeks(@student_id_p,  @application_id_p),0);
                        SELECT @v_pre_leg_weeks = COALESCE( sfa.fn_get_prev_pre_leg_weeks(@student_id_p,  @application_id_p),0);
                        
                        SELECT @v_adjusted_weeks = COALESCE(adj_yg_funding_weeks,0) 
                        FROM sfa.student  
                        WHERE id = @student_id_p;
                    END
			    
	   	    END
		

		set @v_total_weeks = @v_pre_leg_weeks + @v_post_leg_weeks + @v_adjusted_weeks;

		RETURN @v_total_weeks;

END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_yea_total(@ytid_p VARCHAR)
RETURNS NUMERIC
BEGIN
    DECLARE @v_yea_total FLOAT = 0;
    DECLARE c_yea_total CURSOR FOR 
        SELECT sum(yea_amount) 
        FROM sfa.yea
        WHERE yukon_id = @ytid_p OR yukon_id_old = @ytid_p
        AND yea_amount IS NOT NULL;
		SET @v_yea_total = 0;
		
		OPEN c_yea_total  
		FETCH NEXT FROM c_yea_total INTO @v_yea_total  
		CLOSE c_yea_total  
    DEALLOCATE c_yea_total   
		RETURN @v_yea_total;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_system_yea_used(@student_id_p INT)
RETURNS NUMERIC
BEGIN
    DECLARE @v_total_yea NUMERIC = 0;
    DECLARE @v_yea_code NUMERIC = 3;
        SELECT @v_total_yea = SUM(disbursed_amount)
        FROM sfa.disbursement
        WHERE disbursement.funding_request_id IN
            (SELECT id FROM sfa.funding_request
                                WHERE funding_request.application_id IN
                                        (SELECT application_id FROM sfa.application as app
                                                WHERE app.student_id = @student_id_p)
                        AND funding_request.request_type_id = @v_yea_code);
        RETURN COALESCE(@v_total_yea,0);
END;