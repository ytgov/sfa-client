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
CREATE OR ALTER FUNCTION sfa.fn_get_previous_weeks_sfa(@program_p NVARCHAR(255), @student_id_p INT,  @application_id_p INT) 
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

CREATE OR ALTER FUNCTION sfa.fn_get_yea_total(@ytid_p NVARCHAR(25))
RETURNS NUMERIC
BEGIN
    DECLARE @v_yea_total FLOAT = 0;
    DECLARE c_yea_total CURSOR FOR 
        SELECT sum(yea_amount) 
        FROM sfa.yea
        WHERE yukon_id = @ytid_p OR yukon_id_old = @ytid_p
        AND yea_amount IS NOT NULL;
		
		OPEN c_yea_total  
		FETCH NEXT FROM c_yea_total INTO @v_yea_total  
		CLOSE c_yea_total  
    	DEALLOCATE c_yea_total   
		RETURN COALESCE(@v_yea_total, 0);
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
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_allowed_weeks (@start_date_p DATE, @end_date_p DATE )
RETURNS NUMERIC AS
BEGIN
	DECLARE @v_day_of_week_start NUMERIC;
	DECLARE @v_day_of_week_end NUMERIC;
	DECLARE @v_ceil_weeks NUMERIC;
	DECLARE @v_weeks NUMERIC;
	DECLARE @v_floor_weeks NUMERIC;
	DECLARE @v_return_weeks NUMERIC;

    SET @v_return_weeks = 0;
    SET @v_day_of_week_start = DATEPART(dw, CAST(@start_date_p AS DATE));
    SET @v_day_of_week_end = DATEPART(dw, CAST(@end_date_p AS DATE));
    
    SET @v_weeks =  (DATEDIFF(day, @start_date_p, @end_date_p))/7;
    SET @v_ceil_weeks =  CEILING((DATEDIFF(day, @start_date_p, @end_date_p))/7);
    SET @v_floor_weeks =  FLOOR((DATEDIFF(day, @start_date_p, @end_date_p))/7);

    IF @v_day_of_week_start > 1 and @v_day_of_week_start < 7
        BEGIN
            IF @v_day_of_week_end > 1 and @v_day_of_week_end < 7
                BEGIN
                    IF @v_weeks = @v_ceil_weeks
                        BEGIN
                            SET @v_return_weeks = @v_weeks + 1;
                        END
                    ELSE IF @v_day_of_week_start > @v_day_of_week_end
                        BEGIN
                            SET @v_return_weeks = @v_ceil_weeks + 1;
                        END
                    ELSE
                        BEGIN
                            SET @v_return_weeks = @v_ceil_weeks;
                        END
                END
            ELSE
                BEGIN
                    SET @v_return_weeks = @v_ceil_weeks;
                END
        END
    ELSE IF @v_day_of_week_start < 2 or @v_day_of_week_start > 6
        BEGIN
            IF @v_day_of_week_end < 2 or @v_day_of_week_end > 6
                BEGIN  -- rule 2
                    SET @v_return_weeks = @v_floor_weeks;
                END
            ELSE
                BEGIN  -- rule 4
                    SET @v_return_weeks = @v_ceil_weeks;
                END

        END
    ELSE
        BEGIN  -- rule 4
            SET @v_return_weeks = @v_ceil_weeks;
        END
    
    RETURN @v_return_weeks;

END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_post_leg_weeks (@student_id_p INT)
RETURNS NUMERIC AS
BEGIN
	DECLARE @v_num_weeks NUMERIC;

    SELECT 
    @v_num_weeks =
    SUM(
		    CASE WHEN fr.request_type_id = 1 THEN 
			    (
			    	CASE WHEN sfa.fn_get_allowed_weeks(a.effective_rate_date, a.classes_end_date) > 40 THEN
			    		40
			    	ELSE
			    		sfa.fn_get_allowed_weeks(a.effective_rate_date, a.classes_end_date)
			    	END
			    ) 
		    ELSE 
		    	a.weeks_allowed 
		    END
    	)
    FROM 
    sfa.application app, 
    sfa.funding_request fr,
    (
        SELECT 
        funding_request_id, 
        assessment_id,
        sum(disbursed_amount) disbursed_amount
        FROM sfa.disbursement
        GROUP BY funding_request_id, assessment_id
    ) d
    , sfa.assessment a
    WHERE app.id = fr.application_id
    AND fr.id = d.funding_request_id
    AND d.assessment_id = a.id
    AND app.student_id = @student_id_p
    AND app.program_id <> (
	    	SELECT p.id 
	    	FROM sfa.program p 
	    	WHERE p.description = 'Upgrading-Academic'
    	)
    AND app.academic_year_id > 2015
    AND d.disbursed_amount > 0 -- positive disbursement
    group by app.student_id;

    RETURN COALESCE(@v_num_weeks, 0);
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_pre_leg_weeks (@student_id_p INT)
RETURNS NUMERIC AS
BEGIN
	DECLARE @v_num_weeks NUMERIC;

    SELECT 
    @v_num_weeks = CEILING (
        SUM(
		    CASE WHEN fr.request_type_id = 1 THEN 
			    a.weeks_allowed 
		    ELSE 
		    	a.years_funded_equivalent*34
		    END
    	)
    )
    FROM 
    sfa.application app, 
    sfa.funding_request fr,
    (
        SELECT 
        funding_request_id,
        assessment_id, 
        sum(disbursed_amount) disbursed_amount
        FROM sfa.disbursement
        GROUP BY funding_request_id, assessment_id
    ) d, 
    sfa.assessment a
    --,  UPG
    WHERE app.id = fr.application_id
    AND fr.id = d.funding_request_id
    AND d.assessment_id = a.id
    AND app.program_id <> (SELECT id FROM sfa.program WHERE description = 'Upgrading-Academic')
    AND app.student_id = @student_id_p
    AND app.academic_year_id <= 2015
    AND d.disbursed_amount > 0 -- positive disbursement
    AND fr.request_type_id in (1,2) -- request type STA
    group by app.student_id;

    RETURN COALESCE(@v_num_weeks, 0);
END
GO

-- STARTS FUNCTIONS TO ASSESSMENT_YG --


-- FILE : ASSESSMENT_YG  --- FUNCTION: GET_DISBURSED_AMOUNT

CREATE OR ALTER FUNCTION sfa.fn_get_disbursed_amount_fct(@funding_request_id_p INT, @assessment_id_p INT)
RETURNS NUMERIC
AS 
BEGIN
    /*
	 * This function calculates the disbursed amount for any funding requests with the same number
	 * as the request_id passed in and any assessments less than or equal to the assess_id passed in
     */
	DECLARE  @disbursed_amt NUMERIC;

    SELECT @disbursed_amt = SUM(COALESCE(disbursed_amount, 0))
    FROM sfa.disbursement
    WHERE funding_request_id = @funding_request_id_p
    AND assessment_id <= @assessment_id_p;

    RETURN @disbursed_amt;

END
GO

 -- FILE : ASSESSMENT_YG  --- FUNCTION: GET_MONTHS
CREATE OR ALTER FUNCTION sfa.fn_get_months(@application_id_p INT )
  /*
	This function calculates the months allowed based on the difference
	between the effective rate date and classes end date.  
*/
RETURNS NUMERIC AS
BEGIN
    DECLARE @mn_allowed NUMERIC;
    SELECT  @mn_allowed = DATEDIFF(month, classes_start_date, classes_end_date) 
    FROM sfa.application a 
    WHERE id = @application_id_p;

    RETURN @mn_allowed;
END
GO
 -- FILE : ASSESSMENT_YG  --- FUNCTION: GET_PERIOD_WEEKS
CREATE OR ALTER FUNCTION sfa.fn_get_period_weeks(@application_id_p INT)
RETURNS NUMERIC AS
BEGIN
    DECLARE @v_weeks NUMERIC;
    DECLARE @academic_year_id INT;
    DECLARE @program_division INT;

    SELECT @academic_year_id = academic_year_id , @program_division = program_division
    FROM sfa.application 
    WHERE id = @application_id_p;

  	IF  @program_division = 1   -- Quarters
        BEGIN
				SELECT @v_weeks = yg_quarter_weeks FROM sfa.system_parameter;
        END
	ELSE IF  @program_division = 2   -- Semesters	
        BEGIN
				SELECT  @v_weeks =  yg_semester_weeks FROM sfa.system_parameter;
		END
		RETURN COALESCE(@v_weeks,0);
END
GO

 -- FILE : ASSESSMENT_YG  --- FUNCTION: GET_NET

CREATE OR ALTER FUNCTION sfa.fn_net_amount(@funding_request_id_p INT, @assessment_id_p INT)
RETURNS NUMERIC AS
BEGIN
    DECLARE @net_amt NUMERIC;
    DECLARE @assessed_amount NUMERIC;
    DECLARE @previous_disbursement NUMERIC;
    DECLARE @over_award NUMERIC;

    /*
        This function calculates the net amount to be disbursed by subtracting the assessed amount
        from the previous disbursements
        Added subtraction of overaward YG
    */

	SELECT  @previous_disbursement = COALESCE(sfa.fn_get_disbursed_amount_fct(@funding_request_id_p, @assessment_id_p),0),  
           @assessed_amount = COALESCE(assessed_amount,0),
            @over_award = COALESCE(over_award,0)
    FROM sfa.assessment
    WHERE id = @assessment_id_p;

    SET @net_amt = COALESCE(@assessed_amount, 0) - COALESCE(@previous_disbursement, 0) - COALESCE(@over_award, 0);

  IF @net_amt BETWEEN -1 AND 1 
  	BEGIN
  	    SET @net_amt = 0;
    END;
  
  RETURN @net_amt;
END
GO

 -- FILE : ASSESSMENT_YG  --- FUNCTION: GET_DISBURSEMENTS_REQUIRED
CREATE OR ALTER FUNCTION sfa.fn_disbursments_required(@application_id_p INT, @assessment_id_p INT)
RETURNS NUMERIC AS
BEGIN
    DECLARE @d_required NUMERIC;
    DECLARE @pd_months NUMERIC;
    DECLARE @v_weeks NUMERIC;
    DECLARE @v_num_batched NUMERIC;
    DECLARE @academic_year_id INT;
    DECLARE @program_division INT;
    DECLARE @net_amount NUMERIC;
    DECLARE @funding_request_id INT;
    DECLARE @weeks_allowed NUMERIC;
    DECLARE @previous_weeks INT;
    DECLARE @assessed_weeks INT;
    DECLARE @student_id INT;
    DECLARE @classes_end_date DATE;
	DECLARE @classes_start_date DATE;

    SELECT 
        @student_id = app.student_id,
        @classes_end_date = app.classes_end_date,
        @classes_start_date = app.classes_start_date
    FROM sfa.application app
    WHERE app.id = @application_id_p;

    SELECT @academic_year_id = academic_year_id , 
           @program_division = program_division
    FROM sfa.application 
    WHERE id = @application_id_p;

    IF @assessment_id_p <= 0 
        BEGIN
            SELECT
                @previous_weeks = COALESCE(sfa.fn_get_previous_weeks_yg(@student_id, @application_id_p), 0),
                @assessed_weeks =  COALESCE(sfa.fn_get_allowed_weeks(@classes_start_date, @classes_end_date), 0);

            IF (@previous_weeks + @assessed_weeks) > 170
            BEGIN
                SELECT @weeks_allowed = 170 - @previous_weeks;		
            END
            ELSE
            BEGIN
                SELECT @weeks_allowed = @previous_weeks;				
            END
        END
    ELSE
        BEGIN
            SELECT  
                @funding_request_id = funding_request_id , 
                @weeks_allowed = weeks_allowed
            FROM sfa.assessment a 
            WHERE id = @assessment_id_p;
        END

        IF @academic_year_id   < 2016   -- Pre Legislation
            BEGIN
                IF @program_division = 1  -- Quarters
                    BEGIN
                        SET @pd_months = 3;
                    END
                ELSE IF @program_division = 2  -- Semesters
                    BEGIN
                        SET @pd_months = 4;
                    
                    END 
                IF @pd_months = 3 or @pd_months = 4
                    BEGIN
                        SELECT  @d_required =  sfa.fn_get_months(@application_id_p ) / @pd_months;
                    END
                ELSE
                    BEGIN
                        SET @d_required = 0;
                    END
            END
        ELSE  -- Post Legislation
            BEGIN
                SELECT @v_weeks = sfa.fn_get_period_weeks(@application_id_p);
                IF  @v_weeks = 0 
                    BEGIN
                        SET @d_required = 0;
                    END
                ELSE
                    BEGIN
                        SET @d_required = round(@weeks_allowed / @v_weeks, 0);  --PENDIENTE
            
                        /* If d_required is the same as already batched disbursements, need to add 1 to the disbursements required regardless of weeks
                        */
                        SELECT @v_num_batched = count(id) 
                        FROM sfa.disbursement 
                        WHERE assessment_id =  @assessment_id_p
                            AND financial_batch_id IS NOT NULL;
                        SELECT  @net_amount = sfa.fn_net_amount(@funding_request_id, @assessment_id_p);
                        IF COALESCE(@v_num_batched,0) >= @d_required AND @net_amount != 0 
                            BEGIN
                            SET @d_required = @v_num_batched +1;
                            END 
                    
                    END
            END
        RETURN @d_required;
	
END
GO
-- ASSESSMENT_PCK - get_assessment_count_fct
CREATE OR ALTER FUNCTION sfa.fn_get_assessment_count(@funding_request_id NUMERIC)
RETURNS NUMERIC AS
BEGIN
    DECLARE @assess_count NUMERIC;

    SELECT @assess_count = COUNT(id)
    FROM sfa.assessment
    WHERE funding_request_id = @funding_request_id;

    RETURN @assess_count;

END
GO


CREATE OR ALTER FUNCTION sfa.fn_get_previous_weeks_yg(@student_id_p INT,  @application_id_p INT) 
RETURNS NUMERIC
AS 
BEGIN
    DECLARE @v_pre_leg_weeks NUMERIC = 0;
    DECLARE @v_post_leg_weeks NUMERIC = 0;
    DECLARE @v_total_weeks NUMERIC = 0;
    DECLARE @v_adjusted_weeks NUMERIC = 0;

	IF @student_id_p IS NOT NULL AND @application_id_p IS NOT NULL
		BEGIN
            SELECT @v_post_leg_weeks =  COALESCE(sfa.fn_get_prev_post_leg_weeks(@student_id_p,  @application_id_p),0);
    
            SELECT @v_pre_leg_weeks = COALESCE(sfa.fn_get_pre_leg_weeks(@student_id_p), 0);
                    
            SELECT  @v_adjusted_weeks = COALESCE(s.adj_yg_funding_weeks, 0) 
            FROM sfa.student s
            WHERE id =  @student_id_p;   
	    END
	
	SET @v_total_weeks = @v_pre_leg_weeks + @v_post_leg_weeks + @v_adjusted_weeks;

	RETURN  COALESCE(@v_total_weeks, 0);

END
GO

-- previus_name -- transportation_pck.get_travel_allowance_fct

CREATE OR ALTER FUNCTION sfa.fn_get_travel_allowance(@home_city_id_p INT, @institution_city_id_p INT)
RETURNS NUMERIC AS
BEGIN
    DECLARE @res_v NUMERIC = 0;
    
    DECLARE transportation_cur CURSOR FOR
    SELECT COALESCE(t.travel_allowance_amount, 0) AS travel_allowance
    FROM sfa.transportation t
    WHERE t.home_city_id = @home_city_id_p
    AND t.institution_city_id = @institution_city_id_p;

    OPEN  transportation_cur;
    FETCH NEXT FROM transportation_cur INTO @res_v  
    CLOSE  transportation_cur;
    
    IF @res_v > 0
        BEGIN
        	RETURN @res_v;
        END
  	  
    RETURN 0;
END
GO
-- This function does not exist in old system
CREATE OR ALTER FUNCTION sfa.fn_get_airfare_amount(@home_city_id_p INT, @institution_city_id_p INT)
RETURNS NUMERIC AS
BEGIN
    DECLARE @res_v NUMERIC = 0;
    
    DECLARE transportation_cur CURSOR FOR
    SELECT COALESCE(t.airfare_amount, 0) AS airfare_amount
    FROM sfa.transportation t
    WHERE t.home_city_id = @home_city_id_p
    AND t.institution_city_id = @institution_city_id_p;

    OPEN  transportation_cur;
    FETCH NEXT FROM transportation_cur INTO @res_v  
    CLOSE  transportation_cur;
    
    IF @res_v > 0
        BEGIN
        	RETURN @res_v;
        END
  	  
    RETURN 0;
END
GO

-- STORE PROCEDURE - YG_COST_PCK_1 - get_yg_cost_prc NOW Function
CREATE OR ALTER FUNCTION sfa.fn_get_yg_cost (
    @program_division INT,
    @academic_year_id INT,
	@allowed_percent NUMERIC
)
RETURNS @values TABLE(
    living NUMERIC, 
    tuition NUMERIC, 
    book NUMERIC
) AS
BEGIN
    DECLARE @living NUMERIC;
    DECLARE @tuition NUMERIC; 
    DECLARE @book NUMERIC;
    DECLARE @v_living NUMERIC = 0;
    DECLARE @v_tuition NUMERIC = 0; 
    DECLARE @v_book NUMERIC = 0;

    DECLARE quarter_cur CURSOR FOR
    SELECT 
        COALESCE(quarter_tuition_amount, 0) AS tuition,
		COALESCE(quarter_living_amount, 0) AS living,
		COALESCE(quarter_book_amount, 0) AS book
    FROM sfa.yg_cost
    WHERE academic_year_id = @academic_year_id
    AND allowed_percent = @allowed_percent;

    DECLARE semester_cur CURSOR FOR
    SELECT 
        COALESCE(semester_tuition_amount, 0) AS tuition,
		COALESCE(semester_living_amount, 0) AS living,
		COALESCE(semester_book_amount, 0) AS book
    FROM sfa.yg_cost
    WHERE academic_year_id = @academic_year_id
    AND allowed_percent = @allowed_percent;
   
    IF @program_division = 1
        BEGIN
            OPEN quarter_cur;
            FETCH quarter_cur INTO @v_tuition, @v_living, @v_book;
            CLOSE quarter_cur;

            IF @v_tuition > 0
                BEGIN
                    SET @tuition = @v_tuition;
                END
            ELSE
                BEGIN
                    SET @tuition = 0;
                END
            
            IF @v_living > 0
                BEGIN
                    SET @living = @v_living;
                END
            ELSE
                BEGIN
                    SET @living = 0;
                END

            IF @v_book > 0
                BEGIN
                    SET @book = @v_book;
                END
            ELSE
                BEGIN
                    SET @book = 0;
                END
        END

    IF @program_division = 2
        BEGIN
            OPEN semester_cur;
            FETCH semester_cur INTO @v_tuition, @v_living, @v_book;
            CLOSE semester_cur;

            IF @v_tuition > 0
                BEGIN
                    SET @tuition = @v_tuition;
                END
            ELSE
                BEGIN
                    SET @tuition = 0;
                END
            
            IF @v_living > 0
                BEGIN
                    SET @living = @v_living;
                END
            ELSE
                BEGIN
                    SET @living = 0;
                END

            IF @v_book > 0
                BEGIN
                    SET @book = @v_book;
                END
            ELSE
                BEGIN
                    SET @book = 0;
                END
        END
        
	DEALLOCATE quarter_cur;
   	DEALLOCATE semester_cur;

    INSERT INTO @values (
        living, 
        tuition, 
        book
    ) VALUES (
        @living, 
        @tuition, 
        @book
    )
    RETURN;
END
GO

-- ASSESSMENT_PCK - PROCEDURE get_yg_assessment, now function
CREATE OR ALTER FUNCTION sfa.fn_get_yg_assessment(@funding_request_id INT)
RETURNS @assessment_record TABLE (
    funding_request_id INT,
    effective_rate_date  DATE, 
    assessed_date  DATE, 
    classes_end_date  DATE,
    change_reason_comment TEXT,
    home_city_id INT, 
    destination_city_id INT, 
    dependent_count FLOAT,
    allowed_months FLOAT,
    weeks_allowed FLOAT, 
    allowed_tuition NUMERIC, 
    allowed_books FLOAT,
    living_costs NUMERIC, 
    travel_allowance NUMERIC, 
    airfare_amount NUMERIC,
    disbursements_required INT, 
    air_travel_disbursement_period INT,
    assessed_amount NUMERIC, 
    assessment_id INT
) AS
BEGIN

    
    INSERT INTO @assessment_record (
        funding_request_id,
        effective_rate_date , 
        assessed_date , 
        classes_end_date,
        change_reason_comment,
        home_city_id, 
        destination_city_id, 
        dependent_count,
        allowed_months,
        weeks_allowed, 
        allowed_tuition, 
        allowed_books,
        living_costs, 
        travel_allowance, 
        airfare_amount,
        disbursements_required, 
        air_travel_disbursement_period,
        assessed_amount,
        assessment_id
    )
    SELECT
        funding_request_id,
        effective_rate_date , 
        assessed_date , 
        classes_end_date,
        change_reason_comment,
        home_city_id, 
        destination_city_id, 
        dependent_count,
        allowed_months,
        weeks_allowed, 
        allowed_tuition, 
        allowed_books,
        living_costs, 
        travel_allowance, 
        airfare_amount,
        disbursements_required, 
        air_travel_disbursement_period,
        assessed_amount,
        id
    FROM sfa.assessment
    WHERE id = (
	    SELECT MAX(id) 
	    FROM sfa.assessment
	    WHERE funding_request_id = @funding_request_id
   	);

    RETURN;
END
GO

-- DISBURSEMENT_PCK - move_disbursement
CREATE OR ALTER PROCEDURE sfa.sp_move_disbursement
    @assessment_id INT, 
    @prev_assessment_id INT
AS
BEGIN
    UPDATE sfa.disbursement
    SET assessment_id = @assessment_id
    WHERE assessment_id = @prev_assessment_id;
END
GO

-- GET_TOTAL
CREATE OR ALTER FUNCTION sfa.fn_get_total(
    @disbursements_required INT, 
    @academic_year INT,
    @living_costs NUMERIC,
    @allowed_tuition NUMERIC,
    @allowed_books NUMERIC,
    @travel_allowance NUMERIC,
    @airfare_amount NUMERIC,
    @weekly_amount NUMERIC,
    @weeks_allowed INT,
    @assessment_adj_amount FLOAT
)
RETURNS NUMERIC AS
BEGIN
/*
	This function calculates the assessed amount based on the % Allowed, Living Costs, Tuition, Books,
	Travel and Airfare when start date before 2016-08-01
	Otherwise calculated based on amount per week + travel and airfare
*/
	DECLARE @v_assessed_total NUMERIC;
	
	IF @disbursements_required > 0
        BEGIN
            IF @academic_year < 2016 -- old calculation - Pre Legislation change 2016-05-17 SFA-611 Lidwien - also removed allowed_percent condition as the 2 formulas were not different between the two
                BEGIN
                    SET @v_assessed_total = ((@living_costs + @allowed_tuition + @allowed_books) * @disbursements_required ) + @travel_allowance + @airfare_amount;
                END
            ELSE  -- after hibred period  2016-05-17 SFA-611 Lidwien
                BEGIN
                    SET @v_assessed_total = (@weekly_amount * @weeks_allowed)+ @travel_allowance + @airfare_amount + COALESCE(@assessment_adj_amount, 0);
                END
        END
	ELSE
        BEGIN	
            SET @v_assessed_total = 0;
        END

 	RETURN @v_assessed_total;
END
GO

--get_old_total
CREATE OR ALTER FUNCTION sfa.fn_get_old_total(
    @disbursements_required INT, 
    @academic_year INT,
    @living_costs NUMERIC,
    @allowed_tuition NUMERIC,
    @allowed_books NUMERIC,
    @travel_allowance NUMERIC,
    @airfare_amount NUMERIC
) RETURNS NUMERIC AS
/*
	This function calculates the assessed amount based on the % Allowed, Living Costs, Tuition, Books,
	Travel and Airfare
*/
BEGIN
	
    DECLARE @v_assessed_total NUMERIC;
	
	IF @disbursements_required > 0
		BEGIN
            SET @v_assessed_total = ((@living_costs + @allowed_tuition + @allowed_books) * @disbursements_required) + @travel_allowance + @airfare_amount;
        END
	ELSE
        BEGIN
            SET @v_assessed_total = 0;
        END
		
 	RETURN @v_assessed_total;
  
END
GO
-- GET_NEW_INFO YG
CREATE OR ALTER FUNCTION sfa.fn_get_new_info (
    @application_id INT,
    @assessment_id INT,
    @funding_request_id INT,
    @student_id INT
)
RETURNS
@assessment_record TABLE (
    funding_request_id INT,
    classes_end_date DATE,
	classes_start_date DATE,
    assessed_date DATE,
	effective_rate_date DATE,
	allowed_months FLOAT,
    weeks_allowed INT,
    home_city_id INT,
    destination_city INT,
    travel_allowance NUMERIC,
    airfare_amount NUMERIC,
    weekly_amount NUMERIC,
    living_costs NUMERIC,
    allowed_tuition NUMERIC,
    allowed_books NUMERIC,
    disbursements_required INT,
    previous_disbursement NUMERIC, -- IS NOT IN ASSESSMENT, IS IN CSL_NARS_HISTORY
    assessed_amount NUMERIC,
    pre_leg_amount FLOAT,
    over_award FLOAT,
    assessment_adj_amount FLOAT,
    over_award_disbursement_period INT,
    years_funded_equivalent NUMERIC,
    over_award_applied_flg VARCHAR(3),
    air_travel_disbursement_period INT
)
AS
BEGIN

    DECLARE @classes_end_date DATE;
	DECLARE @classes_start_date DATE;
	DECLARE @allowed_months FLOAT;
    DECLARE @weeks_allowed INT;
    DECLARE @home_city_id INT;
    DECLARE @destination_city INT;
    DECLARE @travel_allowance NUMERIC;
    DECLARE @airfare_amount NUMERIC;
    DECLARE @weekly_amount NUMERIC;
    DECLARE @living_costs NUMERIC;
    DECLARE @allowed_tuition NUMERIC;
    DECLARE @allowed_books NUMERIC;
    DECLARE @disbursements_required INT;
    DECLARE @previous_disbursement NUMERIC; -- IS NOT IN ASSESSMENT, IS IN CSL_NARS_HISTORY
    DECLARE @assessed_amount NUMERIC;
    DECLARE @pre_leg_amount FLOAT;
    DECLARE @previous_weeks INT;
    DECLARE @assessed_weeks INT;

    DECLARE @disburse_required NUMERIC;
    DECLARE @disbursed_amt NUMERIC;

    DECLARE @program_division INT;
    DECLARE @academic_year_id INT;


    SELECT 
    @classes_end_date = app.classes_end_date,
    @classes_start_date = app.classes_start_date
    FROM sfa.application app 
    WHERE app.id = @application_id;

    SELECT @allowed_months = DATEDIFF(MONTH, @classes_start_date, @classes_end_date),
    @previous_weeks = COALESCE(sfa.fn_get_previous_weeks_yg(@student_id, @application_id), 0),
    @assessed_weeks =  COALESCE(sfa.fn_get_allowed_weeks(@classes_start_date, @classes_end_date), 0) ;

    IF (@previous_weeks + @assessed_weeks) > 170
      BEGIN
        SELECT @weeks_allowed = 170 - @previous_weeks;		
      END
    ELSE
      BEGIN
        SELECT @weeks_allowed = @previous_weeks;				
      END

    SELECT 
    @home_city_id = pa.city_id
    FROM sfa.student s
    INNER JOIN sfa.person p ON p.id = s.person_id 
    INNER JOIN sfa.person_address pa ON pa.person_id = p.id
    WHERE s.id = @student_id
    AND pa.address_type_id = 1;

    SELECT 
    @destination_city = ic.address_city_id
    FROM sfa.application app
    INNER JOIN sfa.institution_campus ic ON app.institution_campus_id = ic.id
    WHERE app.id = @application_id;

    SELECT @travel_allowance = sfa.fn_get_travel_allowance(@home_city_id, @destination_city);
    SELECT @airfare_amount = sfa.fn_get_airfare_amount(@home_city_id, @destination_city);

    SELECT TOP 1 @weekly_amount = COALESCE(yc.weekly_amount, 0)
    FROM sfa.yg_cost yc
    WHERE yc.academic_year_id = (
        SELECT app.academic_year_id
        FROM sfa.application app
        WHERE app.id = @application_id
      )
    AND yc.allowed_percent = 100;

    SELECT 
    @program_division = app.program_division,
    @academic_year_id = app.academic_year_id
    FROM sfa.application app 
    WHERE app.id = @application_id;

    SELECT 
    @living_costs = living, 
    @allowed_tuition = tuition, 
    @allowed_books = book
    FROM sfa.fn_get_yg_cost (@program_division, @academic_year_id, 100);
	
	SELECT @disburse_required = sfa.fn_disbursments_required(@application_id, @assessment_id); 

--f_alert.ok('New Info - ID: '||	:assessment.assessment_id||'  weekly amt: '||:assessment.weekly_amount); -- Lidwien debug

	/*
		Calculate the previous disbursement amount
	*/
	--IF @assessment_id IS NOT NULL OR @prev_assessment_id = 0 --esta de mas esta validacion
		--BEGIN 
		  --SET @prev_assessment_id = @assessment_id;
    --END
	-- ELSE
    -- BEGIN
      -- SET @prev_assessment_id = @assessment_id;
      -- assess_id := :parameter.assess_id;
    -- END

	SELECT @disbursed_amt = sfa.fn_get_disbursed_amount_fct(@funding_request_id, @assessment_id);

--f_alert.ok('New Info - disbursed: '||	disbursed_amt); -- Lidwien debug		
	IF @disbursed_amt IS NOT NULL
		BEGIN
      SET @previous_disbursement = @disbursed_amt;
      
      IF @disburse_required > 0 and @disburse_required < 1
        BEGIN
            SET @disbursements_required = 1;
        END
      ELSE
        BEGIN
            SET @disbursements_required =  FLOOR(@disburse_required);	-- round down
        END
	  END	
	ELSE
    BEGIN
      SET @previous_disbursement = 0;
		  SET @disbursements_required =  FLOOR(@disburse_required);-- round down
	  END
	/*
		Calculate the total
	*/

	SELECT @assessed_amount = sfa.fn_get_total(
    @disbursements_required, 
    @academic_year_id,
    @living_costs,
    @allowed_tuition,
    @allowed_books,
    @travel_allowance,
    @airfare_amount,
    @weekly_amount,
    @weeks_allowed,
    0
  );

	SELECT @pre_leg_amount = sfa.fn_get_old_total(
    @disbursements_required, 
    @academic_year_id,
    @living_costs,
    @allowed_tuition,
    @allowed_books,
    @travel_allowance,
    @airfare_amount
  );

	/*
		calulate the net amount due to the student
	*/	
	-- SELECT @net_amount = fn_net_amount(@funding_request_id, @assessment_id); CALCULAR DIRECTAMENTE DESDE FRONT
  insert into @assessment_record(
    funding_request_id,
    classes_end_date,
	classes_start_date,
    assessed_date,
	effective_rate_date,
    allowed_months,
    weeks_allowed,
    home_city_id,
    destination_city,
    travel_allowance,
    airfare_amount,
    weekly_amount,
    living_costs,
    allowed_tuition,
    allowed_books,
    disbursements_required,
    previous_disbursement,
    assessed_amount,
    pre_leg_amount,
    over_award,
    assessment_adj_amount,
    over_award_disbursement_period,
    years_funded_equivalent,
    over_award_applied_flg,
    air_travel_disbursement_period
  ) VALUES(
    @funding_request_id,
    @classes_end_date,
	@classes_start_date,
    CAST(GETDATE() AS DATE),
	@classes_start_date,
    COALESCE(@allowed_months, 0),
    COALESCE(@weeks_allowed, 0),
    @home_city_id,
    @destination_city,
    COALESCE(@travel_allowance, 0),
    COALESCE(@airfare_amount, 0),
    COALESCE(@weekly_amount, 0),
    COALESCE(@living_costs, 0),
    COALESCE(@allowed_tuition, 0),
    COALESCE(@allowed_books, 0),
    @disbursements_required,
    @previous_disbursement,
    COALESCE(@assessed_amount, 0),
    @pre_leg_amount,
    0, -- over_award FLOAT,
    0, -- assessment_adj_amount FLOAT,
    0, -- over_award_disbursement_period INT,
    NULL, -- years_funded_equivalent NUMERIC,
    'No', -- over_award_applied_flg VARCHAR(3)
    NULL
  )
  RETURN;
END
GO

-- GET_ASSESS_INFO, now FUNCTION
-- GET_ASSESS_INFO, now FUNCTION
CREATE OR ALTER FUNCTION sfa.fn_get_assess_info ( 
    @funding_request_id INT
)
RETURNS
@assessment_record TABLE (
    funding_request_id INT,
    effective_rate_date  DATE,
    assessed_date DATE,
    classes_end_date  DATE,
    change_reason_comment TEXT,
    home_city_id INT, 
    destination_city_id INT, 
    dependent_count FLOAT,
    allowed_months FLOAT,
    weeks_allowed FLOAT, 
    allowed_tuition NUMERIC, 
    allowed_books FLOAT,
    living_costs NUMERIC, 
    travel_allowance NUMERIC, 
    airfare_amount NUMERIC,
    disbursements_required INT, 
    air_travel_disbursement_period INT,
    assessed_amount NUMERIC, 
    assessment_id INT,
    over_award FLOAT,
    assessment_adj_amount FLOAT,
    over_award_disbursement_period INT,
    years_funded_equivalent NUMERIC,
    over_award_applied_flg VARCHAR(3)
)
AS
BEGIN

    DECLARE @temp TABLE (
        funding_request_id INT,
        effective_rate_date  DATE, 
        assessed_date DATE,
        classes_end_date  DATE,
        change_reason_comment TEXT,
        home_city_id INT, 
        destination_city_id INT, 
        dependent_count FLOAT,
        allowed_months FLOAT,
        weeks_allowed FLOAT, 
        allowed_tuition NUMERIC, 
        allowed_books FLOAT,
        living_costs NUMERIC, 
        travel_allowance NUMERIC, 
        airfare_amount NUMERIC,
        disbursements_required INT, 
        air_travel_disbursement_period INT,
        assessed_amount NUMERIC, 
        assessment_id INT,
        over_award FLOAT,
        assessment_adj_amount FLOAT,
        over_award_disbursement_period INT,
        years_funded_equivalent NUMERIC,
        over_award_applied_flg VARCHAR(3)
    );
    
    INSERT INTO @temp (
        funding_request_id,
        effective_rate_date ,
        assessed_date,
        classes_end_date,
        change_reason_comment,
        home_city_id, 
        destination_city_id, 
        dependent_count,
        allowed_months,
        weeks_allowed, 
        allowed_tuition, 
        allowed_books,
        living_costs, 
        travel_allowance, 
        airfare_amount,
        disbursements_required, 
        air_travel_disbursement_period,
        assessed_amount,
        assessment_id
    )
    SELECT
        funding_request_id,
        effective_rate_date , 
        assessed_date,
        classes_end_date,
        change_reason_comment,
        home_city_id, 
        destination_city_id, 
        dependent_count,
        allowed_months,
        weeks_allowed, 
        allowed_tuition, 
        allowed_books,
        living_costs, 
        travel_allowance, 
        airfare_amount,
        disbursements_required, 
        air_travel_disbursement_period,
        assessed_amount,
        assessment_id
    FROM sfa.fn_get_yg_assessment(@funding_request_id);

    INSERT INTO @assessment_record (
       funding_request_id,
       effective_rate_date , 
       assessed_date,
       classes_end_date,
       change_reason_comment,
       home_city_id, 
       destination_city_id, 
       dependent_count,
       allowed_months,
       weeks_allowed, 
       allowed_tuition, 
       allowed_books,
       living_costs, 
       travel_allowance, 
       airfare_amount,
       disbursements_required, 
       air_travel_disbursement_period,
       assessed_amount,
       assessment_id,
       over_award,
       assessment_adj_amount,
       over_award_disbursement_period,
       years_funded_equivalent,
       over_award_applied_flg
    )
    SELECT
        @funding_request_id,
        effective_rate_date , 
        assessed_date,
        classes_end_date,
        change_reason_comment,
        home_city_id, 
        destination_city_id, 
        dependent_count,
        COALESCE(allowed_months, 0),
        COALESCE(weeks_allowed, 0),
        COALESCE(allowed_tuition, 0),
        COALESCE(allowed_books, 0),
        COALESCE(living_costs, 0),
        COALESCE(travel_allowance, 0),
        COALESCE(airfare_amount, 0),
        disbursements_required, 
        air_travel_disbursement_period,
        COALESCE(assessed_amount, 0),
        assessment_id,
        0, -- over_award FLOAT,
        0, -- assessment_adj_amount FLOAT,
        0, -- over_award_disbursement_period INT,
        NULL, -- years_funded_equivalent NUMERIC,
        'No' -- over_award_applied_flg VARCHAR(3)
    FROM @temp;
    RETURN;    
END
GO
-- ASSESSMENT_TG - GET_INIT_VALUE 
CREATE OR ALTER PROCEDURE sfa.sp_get_init_value
    @funding_request_id INT,
    @application_id INT,
    @student_id INT   
AS
BEGIN
    DECLARE @assessment_id INT;
    DECLARE @prev_assessment_id INT;

    IF EXISTS (SELECT 1 FROM sfa.assessment WHERE funding_request_id = @funding_request_id)
        BEGIN
            BEGIN TRY
                BEGIN TRANSACTION

                INSERT INTO sfa.assessment(
                    student_contrib_exempt,
                    spouse_contrib_exempt,
                    student_contribution_review,
                    spouse_contribution_review,
                    parent_contribution_review
                ) VALUES (
                    'NO',
                    'NO',
                    'NO',
                    'NO',
                    'NO'
                );

                SET @assessment_id = SCOPE_IDENTITY();

                UPDATE sfa.assessment
                SET funding_request_id = t.funding_request_id,
                    effective_rate_date = t.effective_rate_date,
                    assessed_date = t.assessed_date,
                    classes_end_date = t.classes_end_date,
                    change_reason_comment = t.change_reason_comment,
                    home_city_id = t.home_city_id, 
                    destination_city_id = t.destination_city_id, 
                    dependent_count = t.dependent_count,
                    allowed_months = t.allowed_months,
                    weeks_allowed = t.weeks_allowed, 
                    allowed_tuition = t.allowed_tuition, 
                    allowed_books = t.allowed_books,
                    living_costs = t.living_costs, 
                    travel_allowance = t.travel_allowance, 
                    airfare_amount = t.airfare_amount,
                    disbursements_required = t.disbursements_required, 
                    air_travel_disbursement_period = t.air_travel_disbursement_period,
                    assessed_amount = t.assessed_amount,
                    assessment_type_id = 2
                FROM (
                    SELECT * FROM sfa.fn_get_assess_info (
                        @funding_request_id
                    )
                ) t
                WHERE id = @assessment_id;

                SELECT @prev_assessment_id = assessment_id FROM sfa.fn_get_yg_assessment(@funding_request_id);
            
                EXEC sfa.sp_move_disbursement @assessment_id, @prev_assessment_id;

                SELECT 1 as status, 'Inserted success' AS message, @assessment_id AS assessment_id_inserted;

                COMMIT TRANSACTION
            END TRY
            BEGIN CATCH
                SELECT 0 as status, 'Error to insert' AS message;
                ROLLBACK TRANSACTION;
            END CATCH
        END
    ELSE
        BEGIN
            BEGIN TRY
                BEGIN TRANSACTION

                INSERT INTO sfa.assessment(
                    student_contrib_exempt,
                    spouse_contrib_exempt,
                    student_contribution_review,
                    spouse_contribution_review,
                    parent_contribution_review
                ) VALUES (
                    'NO',
                    'NO',
                    'NO',
                    'NO',
                    'NO'
                );

                SET @assessment_id = SCOPE_IDENTITY();

                UPDATE sfa.assessment
                SET 
                    funding_request_id = t.funding_request_id,
                    classes_end_date = t.classes_end_date,
                    classes_start_date = t.classes_start_date,
                    allowed_months = t.allowed_months,
                    weeks_allowed = t.weeks_allowed,
                    home_city_id = t.home_city_id,
                    destination_city_id = t.destination_city,
                    travel_allowance = t.travel_allowance,
                    airfare_amount = t.airfare_amount,
                    weekly_amount = t.weekly_amount,
                    living_costs = t.living_costs,
                    allowed_tuition = t.allowed_tuition,
                    allowed_books = t.allowed_books,
                    disbursements_required = t.disbursements_required,
                    -- previous_disbursement = t.previous_disbursement,
                    assessed_amount = t.assessed_amount,
                    pre_leg_amount = t.pre_leg_amount,
                    assessed_date = t.assessed_date,
                    effective_rate_date = t.effective_rate_date,
                    assessment_type_id = 1
                FROM (
                    SELECT * FROM sfa.fn_get_new_info (
                        @application_id,
                        @assessment_id,
                        @funding_request_id,
                        @student_id
                    )
                ) t
                WHERE id = @assessment_id;
                
                SELECT 1 as status, 'Inserted success' AS message, @assessment_id AS assessment_id_inserted;
                COMMIT TRANSACTION
            END TRY
            BEGIN CATCH
                SELECT 0 as status, 'Error to insert' AS message;
                ROLLBACK TRANSACTION;
            END CATCH
            
        END
END
GO

-- DISBURSE BUTTON ASSESSMENT YG
CREATE OR ALTER PROCEDURE sfa.sp_disburse_button_yg -- BUTTON FOR ASSESSMENT YG
    @application_id INT,
    @assessment_id INT,
    @funding_request_id INT,
    @air_travel_disbursement_period INT,
    @travel_allowance NUMERIC,
    @airfare_amount NUMERIC,
    @disbursements_required INT,
    @over_award_disbursement_period INT,
    @over_award FLOAT,
    @over_award_applied_flg VARCHAR(3),
    @years_funded_equivalent NUMERIC,
    @allowed_tuition NUMERIC,
    @living_costs NUMERIC,
    @allowed_books FLOAT,
    @weekly_amount NUMERIC,
    @assessment_adj_amount FLOAT,
    @assessed_amount NUMERIC
    
AS 
BEGIN
    DECLARE @academic_year INT;


    SELECT @academic_year = app.academic_year_id FROM sfa.application app
    WHERE app.id = @application_id; --@application_id

    IF  (
            (
                @air_travel_disbursement_period IS NULL
                AND ( @travel_allowance = 0 OR @travel_allowance IS NULL )
                AND ( @airfare_amount = 0 OR @airfare_amount IS NULL ) 
            )
            OR ( @air_travel_disbursement_period <= @disbursements_required )
            OR ( @disbursements_required = 0 )
        ) 
        AND
        (
            ( 
                @over_award_disbursement_period IS NULL
                AND ( @over_award = 0 OR @over_award IS NULL )
                AND ( @over_award_applied_flg = 'No')
            ) -- NO AIR TRAVEL
            OR ( @over_award_disbursement_period <= @disbursements_required )
            OR ( @disbursements_required = 0 )
        )
        AND 
        (
            ( @years_funded_equivalent IS NOT NULL AND @academic_year < 2016 )
            OR (@academic_year > 2015 )
        )
        BEGIN
            DECLARE @disbursement_id INT;
            DECLARE @new_disbursement_id INT;
            DECLARE @net_amount INT;

            DECLARE @disbursement_temp TABLE
            (
                id                          INT,
                disbursement_type_id        INT,
                assessment_id               INT,
                funding_request_id          INT,
                disbursed_amount            NUMERIC,
                due_date                    DATE,
                tax_year                    INT,
                issue_date                  DATE,
                paid_amount                 NUMERIC,
                change_reason_id            INT,
                financial_batch_id          INT,
                financial_batch_id_year     INT,
                financial_batch_run_date    DATE,
                financial_batch_serial_no   FLOAT,
                transaction_number          VARCHAR(20),
                csl_cert_seq_number         INT,
                ecert_sent_date             DATE,
                ecert_response_date         DATE,
                ecert_status                VARCHAR(20),
                ecert_portal_status_id      INT
            )

            SELECT @disbursement_id = MAX(d.id)
            FROM sfa.disbursement d WHERE d.assessment_id = @assessment_id;

            IF @assessment_id > 0
                BEGIN 
                    SELECT @net_amount = COALESCE(sfa.fn_net_amount(@funding_request_id, @assessment_id), 0);
                END
            ELSE
                BEGIN
                    SET @net_amount = COALESCE(@assessed_amount, 0) - COALESCE(@over_award, 0);
                END

            DECLARE @financial_batch_id INT;

            IF  @disbursement_id IS NOT NULL
                BEGIN
                    BEGIN TRY
                        BEGIN TRANSACTION
                            INSERT INTO @disbursement_temp (
                                disbursement_type_id,
                                assessment_id,
                                funding_request_id,
                                disbursed_amount,
                                due_date,
                                tax_year,
                                issue_date,
                                paid_amount,
                                change_reason_id,
                                financial_batch_id,
                                financial_batch_id_year,
                                financial_batch_run_date,
                                financial_batch_serial_no,
                                transaction_number,
                                csl_cert_seq_number,
                                ecert_sent_date,
                                ecert_response_date,
                                ecert_status,
                                ecert_portal_status_id
                            )
                            SELECT
                                disbursement_type_id,
                                assessment_id,
                                funding_request_id,
                                disbursed_amount,
                                due_date,
                                tax_year,
                                issue_date,
                                disbursed_amount, -- assigns disbursement_amount to paid_amount
                                change_reason_id,
                                financial_batch_id,
                                financial_batch_id_year,
                                financial_batch_run_date,
                                financial_batch_serial_no,
                                transaction_number,
                                csl_cert_seq_number,
                                ecert_sent_date,
                                ecert_response_date,
                                ecert_status,
                                ecert_portal_status_id
                            FROM sfa.disbursement
                            WHERE id = (@disbursement_id);

                            UPDATE @disbursement_temp
                            SET disbursed_amount = @net_amount;
                                -- :disbursement.paid_amount := :disbursement.disbursed_amount; -- we avoid this assignment;

                            --UPDATE sfa.assessment
                            --SET over_award_applied_flg = 'Yes'
                            --WHERE id = @assessment_id;

                        SELECT 1 AS status, d.* FROM @disbursement_temp AS d;
                        COMMIT TRANSACTION
                    END TRY
                    BEGIN CATCH
                        SELECT 0 as status, 'Error to insert' AS message;
                        ROLLBACK TRANSACTION;
                    END CATCH
                END
            ELSE IF @net_amount >= 0
                BEGIN
                    BEGIN TRY
                        BEGIN TRANSACTION
                            DECLARE @v_amount_remaining NUMERIC;
                            
                            DECLARE @count INT = 1;

                            SELECT @v_amount_remaining = @net_amount;  -- accumulated amount for new leg calculations
                    
                        WHILE @count <= @disbursements_required
                            BEGIN -- START LOOP
                                INSERT INTO @disbursement_temp (
                                    id,
                                    funding_request_id,
                                    assessment_id,
                                    issue_date
                                )
                                VALUES(
                                    @count,
                                    @funding_request_id,
                                    @assessment_id,
                                    GETDATE()
                                );

                                IF @financial_batch_id IS NULL
                                    BEGIN
                                        IF @academic_year < 2016
                                            BEGIN
                                            -- SELECT '@academic_year < 2016' AS MESSAGE; 
                                                UPDATE @disbursement_temp
                                                SET disbursed_amount = ((@allowed_tuition + @living_costs + @allowed_books))
                                                WHERE id = @count;
                                            END					
                                        ELSE
                                            BEGIN
                                            -- SELECT '@academic_year < 2016 -- ELSE' AS MESSAGE;
                                                UPDATE @disbursement_temp
                                                SET disbursed_amount = (@weekly_amount * sfa.fn_get_period_weeks(@application_id)) + (COALESCE(@assessment_adj_amount, 0) / COALESCE(@disbursements_required, 1) )
                                                WHERE id = @count;
                                            END

                                        IF @count = @air_travel_disbursement_period
                                            BEGIN
                                            -- SELECT '@count = @air_travel_disbursement_period' AS MESSAGE;
                                                UPDATE @disbursement_temp
                                                SET disbursed_amount = (COALESCE(disbursed_amount, 0) + @travel_allowance + @airfare_amount)
                                                WHERE id = @count;
                                            END
                                        -- Added substraction of over award - 2016-03-01 Lidwien SFA-551
                                        IF @count = @over_award_disbursement_period and @over_award_applied_flg = 'No'
                                            BEGIN
                                            -- SELECT '@count = @over_award_disbursement_period and @over_award_applied_flg = No' AS MESSAGE;
                                                UPDATE @disbursement_temp
                                                SET disbursed_amount = COALESCE(disbursed_amount, 0) - COALESCE(@over_award, 0)
                                                WHERE id = @count;
                                                
                                                -- UPDATE sfa.assessment
                                                -- SET over_award_applied_flg = 'Yes'
                                                -- WHERE id = @assessment_id;
                                            END
                                        IF @v_amount_remaining < (SELECT disbursed_amount FROM @disbursement_temp WHERE id = @count) -- if the final period is less than actual period weeks
                                            BEGIN
                                                -- SELECT '@v_amount_remaining < (SELECT disbursed_amount FROM @disbursement_temp WHERE id = @count)' AS MESSAGE;
                                                UPDATE @disbursement_temp
                                                SET disbursed_amount = @v_amount_remaining
                                                WHERE id = @count;
                                            END
                                        ELSE IF @v_amount_remaining > (SELECT disbursed_amount FROM @disbursement_temp WHERE id = @count) AND @count = @disbursements_required -- if final period is more then actual period weeks
                                            BEGIN
                                                -- SELECT '@v_amount_remaining > (SELECT disbursed_amount FROM @disbursement_temp WHERE id = @count) AND @count = @disbursements_required ' AS MESSAGE;
                                                UPDATE @disbursement_temp
                                                SET disbursed_amount = @v_amount_remaining
                                                WHERE id = @count;
                                            END
                                        
                                        UPDATE @disbursement_temp
                                        SET paid_amount = disbursed_amount
                                        WHERE id = @count;

                                        SET @v_amount_remaining = (SELECT paid_amount FROM @disbursement_temp WHERE id = @count)
                                        
                                        IF @v_amount_remaining >= 0
                                        -- SELECT '@v_amount_remaining >= 0' AS MESSAGE;
                                            BEGIN
                                                UPDATE @disbursement_temp
                                                SET disbursement_type_id = 1
                                                WHERE id = @count;
                                            END

                                        --IF @count <> @disbursements_required 
                                        --BEGIN
                                            --SET @disbursement_type_id = 1;
                                            --NEXT_RECORD();
                                        --END++
                                    END
                                SET @count = @count + 1;
                            END -- END LOOP
                        
                        SELECT 1 AS status, d.* FROM @disbursement_temp AS d;
                        COMMIT TRANSACTION
                    END TRY
                    BEGIN CATCH
                        SELECT 0 as status, 'Error to insert' AS message;
                        ROLLBACK TRANSACTION;
                    END CATCH
                END
            ELSE
                BEGIN
                    INSERT INTO @disbursement_temp
                    (
                        id,
                        funding_request_id,
                        assessment_id,
                        issue_date
                    )
                    VALUES(
                        -1,
                        @funding_request_id,
                        @assessment_id,
                        GETDATE()
                    );
                    
                    IF @financial_batch_id IS NULL
                        BEGIN
                            UPDATE @disbursement_temp
                            SET disbursed_amount = @net_amount,
                            paid_amount = @net_amount
                            WHERE id = -1;
                        END	
                    
                    --ELSE
                        --LAST_RECORD;					
                        --CREATE_RECORD;
            
                        --:disbursement.disbursed_amount := :assessment.net_amount;
                        --:disbursement.paid_amount := :disbursement.disbursed_amount;				
                    --END IF;
                    SELECT 1 AS status, d.* FROM @disbursement_temp AS d;	
                END
                -- :assessment.previous_disbursement := NVL(get_disbursed_amount(:assessment.funding_quest_id, :assessment.assessment_id),0); SHOW PREVIOUS DISBURSEMENT
                -- :assessment.net_amount := get_net; SHOW NET_AMOUNT IN FRONT
        END

    ELSE IF 
        @air_travel_disbursement_period > @disbursements_required 
        AND ((@years_funded_equivalent IS NOT NULL AND @academic_year < 2016) OR (@academic_year > 2015)) 
        BEGIN
            -- SEND TO ENDPOINT
            SELECT 0 as status, 
            'The airfare and travel allowance disbursement period cannot be greater than the number of disbursements.' AS message;
        END 

    ELSE IF 
        @air_travel_disbursement_period IS NULL AND (@travel_allowance > 0 OR @airfare_amount > 0) 
        AND ((@years_funded_equivalent IS NOT NULL AND @academic_year < 2016) OR (@academic_year > 2015))
        BEGIN
            -- SEND TO ENDPOINT
            SELECT 0 as status, 
            'The airfare and travel allowance disbursement period must be entered.' AS message;
            RETURN;
        END

    ELSE IF @over_award_disbursement_period > @disbursements_required
        BEGIN
            -- SEND TO ENDPOINT
            SELECT 0 as status, 
            'The over award disbursement period cannot be greater than the number of disbursements.' AS message;
            RETURN;
        END

    ELSE IF COALESCE(@over_award_disbursement_period, 0) < 1  AND (@over_award > 0)
        BEGIN
            -- SEND TO ENDPOINT
            SELECT 0 as status, 
            'The over award disbursement period must be entered' AS message;
            RETURN;
        END

    ELSE IF @years_funded_equivalent IS NULL AND @academic_year < 2016
        BEGIN
            -- SEND TO ENDPOINT
            SELECT 0 as status, 
            'The fraction of whole year must be entered' AS message;
            RETURN;
        END

    ELSE
        BEGIN
            -- SEND TO ENDPOINT
            SELECT 0 as status, 
            'No Disbursement made, make sure over award applied checkbox is unchecked. ' AS message;
            RETURN;
        END
END
GO

CREATE OR ALTER FUNCTION sfa.check_deadline_fct (@application_id INT, @request_type_id INT)
RETURNS VARCHAR(50) AS
BEGIN
    DECLARE @start_date DATE;
    DECLARE @weeks NUMERIC;
    DECLARE @training_days NUMERIC;
    DECLARE @all_days NUMERIC;
    DECLARE @weekend_days NUMERIC;
    DECLARE @message VARCHAR(50);

    SET @weeks = 0;
    SET @training_days = 0;
    SET @message = 'OK';

    SELECT @start_date = classes_start_date
    FROM sfa.application app
    WHERE app.id = @application_id;

    IF @start_date IS NOT NULL
    BEGIN
        IF @request_type_id = 1
            BEGIN
                SET @all_days = DATEDIFF(DAY, @start_date, CAST(SYSDATETIME() AS DATE));
                SET @weekend_days = ROUND(( (@all_days + 1)/7 ) * 2, 0);
                SET @training_days = @all_days + 1 - @weekend_days;
            END
        ELSE 
            BEGIN
                SET @all_days = DATEDIFF(DAY, @start_date, CAST(SYSDATETIME() AS DATE));
                SET @weeks = ROUND(((@all_days) + 1)/7 + 0.9999, 0);
            END
        
        IF @weeks > 6 OR @training_days > 14
            BEGIN
                SET @message = 'This student may have exceeded the deadline.';
            END
    END

    RETURN @message;
END
GO

-- END FUNCTIONS TO ASSESSMENT_YG --

CREATE OR ALTER FUNCTION sfa.fn_get_total_funded_years (
	@student_id_p FLOAT(53)
	,@application_id_p FLOAT(53)
	)
RETURNS FLOAT(53)
AS
BEGIN

	DECLARE @v_funded_years_count FLOAT(53) = 0
		,@v_pre_funded_years FLOAT(53) = 0

	DECLARE c_years_funded CURSOR LOCAL
	FOR
	SELECT sum(a.years_funded_equivalent) AS years_funded
	FROM sfa.assessment  AS a
		inner join sfa.funding_request fr ON fr.id = a.funding_request_id
		inner join sfa.application app ON app.ID = fr.application_id
	WHERE app.student_id = @student_id_p
		AND app.id <= @application_id_p
		AND a.years_funded_equivalent IS NOT NULL
		AND app.academic_year_id <= 2015

	OPEN c_years_funded

	FETCH c_years_funded
	INTO @v_funded_years_count

	CLOSE c_years_funded

	DEALLOCATE c_years_funded

	DECLARE c_pre_years_funded CURSOR LOCAL
	FOR
	SELECT student.pre_funding_years_used
	FROM sfa.student
	WHERE id = @student_id_p
		AND pre_funding_years_used IS NOT NULL

	OPEN c_pre_years_funded

	FETCH c_pre_years_funded
	INTO @v_pre_funded_years

	CLOSE c_pre_years_funded

	DEALLOCATE c_pre_years_funded

	SET @v_funded_years_count = isnull(@v_funded_years_count, 0) + isnull(@v_pre_funded_years, 0)

	IF @v_funded_years_count IS NULL
		SET @v_funded_years_count = 0

	RETURN @v_funded_years_count
END
GO

-- Get Actual Expense
CREATE OR ALTER FUNCTION sfa.fn_get_actual_expense(@period INT, @cat_id INT, @application_id INT)
RETURNS NUMERIC(9,2)
AS 
BEGIN
	DECLARE @amount NUMERIC(9,2);
	SELECT 
		@amount = COALESCE(e.amount, 0)
	FROM sfa.expense e 
	WHERE e.period_id = @period
	AND e.category_id = @cat_id
	AND e.application_id = @application_id;

	RETURN @amount;
END;
GO

-- Get Allowable Expense
CREATE OR ALTER FUNCTION sfa.fn_get_allowable_expense(@period INT, @report_expense_cat_id INT, @application_id INT)
RETURNS NUMERIC(9,2)
AS 
BEGIN
	DECLARE @amount NUMERIC(9,2);
	SELECT 
		@amount = COALESCE(SUM(e.amount), 0)
	FROM sfa.expense e 
		INNER JOIN sfa.expense_category ec
			ON e.category_id = ec.id 
	WHERE e.period_id = @period
	AND ec.report_expense_category_id = @report_expense_cat_id
	AND e.application_id = @application_id;

	RETURN @amount;
END;
GO

-- Get Dependent Count
CREATE OR ALTER FUNCTION sfa.fn_get_dependent_count(@application_id INT)
RETURNS INT
AS 
BEGIN
	DECLARE @count INT = 0;
	SELECT 
		@count = COUNT(*)
	FROM sfa.dependent d 
		INNER JOIN sfa.application a
			ON d.student_id = a.student_id
		INNER JOIN sfa.dependent_eligibility de 
			ON d.id = de.dependent_id 
			AND de.application_id = a.id
			AND de.is_csl_eligible = 1
	WHERE a.id = @application_id;

	RETURN @count;
END;
GO

-- Get Parent Dependent Count
CREATE OR ALTER FUNCTION sfa.fn_get_parent_dependent_count(@application_id INT, @attend_post_second BIT = NULL)
RETURNS INT
AS 
BEGIN
	DECLARE @count INT = 0;
	
	IF @application_id IS NULL
	BEGIN
		RETURN NULL;
	END
	ELSE IF @attend_post_second IS NULL
	BEGIN
		SELECT
			@count = COUNT(pd.id)
		FROM sfa.parent_dependent pd
		WHERE pd.application_id = @application_id
		AND pd.is_eligible = 1;
	END
	ELSE
	BEGIN
		SELECT
			@count = COUNT(pd.id)
		FROM sfa.parent_dependent pd
		WHERE pd.application_id = @application_id
		AND pd.is_eligible = 1
		AND pd.is_attend_post_secondary = @attend_post_second;
	END

	RETURN @count;
END;
GO

-- Get Parent Family Size
CREATE OR ALTER FUNCTION sfa.fn_get_parent_family_size(@application_id INT)
RETURNS INT
AS 
BEGIN
	DECLARE @count INT = 0;
	DECLARE @p_count INT = 0;
	
	SELECT
		@p_count = CASE WHEN p1.first_name IS NOT NULL AND p1.last_name IS NOT NULL THEN 1 ELSE 0 END +
		CASE WHEN p2.first_name IS NOT NULL AND p2.last_name IS NOT NULL THEN 1 ELSE 0 END
	FROM sfa.application a
		LEFT JOIN sfa.person p1
			ON p1.id = a.parent1_id
		LEFT JOIN sfa.person p2
			ON p2.id = a.parent2_id
	WHERE a.id = @application_id;

	SET @count = sfa.fn_get_parent_dependent_count(@application_id, DEFAULT);

	RETURN @count + @p_count;
END;
GO

-- Get Parent Address By Application
CREATE OR ALTER FUNCTION sfa.fn_get_parent_address_by_application(@application_id INT, @address_type INT = 1)
RETURNS TABLE
AS
RETURN
SELECT
	CASE 
		WHEN pav.person_id = a.parent1_id THEN 1 
		WHEN pav.person_id = a.parent2_id THEN 2
		ELSE NULL
		END as parent,	
	pav.*
FROM sfa.application a
	LEFT JOIN sfa.person_address_v pav
		ON pav.person_id = a.parent1_id
		OR pav.person_id = a.parent2_id 
WHERE a.id = @application_id
AND pav.address_type_id = @address_type;
GO

-- Get Province Desc
CREATE OR ALTER FUNCTION sfa.fn_get_province_desc(@province_id INT)
RETURNS VARCHAR(50)
AS 
BEGIN
	DECLARE @desc VARCHAR(50);
	
	IF @province_id IS NULL
	BEGIN
		RETURN NULL;
	END
	
	SELECT 
		@desc = p.description
	FROM sfa.province p
	WHERE p.id = @province_id;
	
	RETURN @desc;
END;
GO

-- Get Total Grant Amount: disbursement_pck_1.get_total_grant_amount
CREATE OR ALTER FUNCTION sfa.fn_get_total_grant_amount(@application_id INT)
RETURNS FLOAT(8)
AS
BEGIN 

    /* 2012-11-28 Lidwien SFA-340 - additions for SFA-657 new grant

        Changed grant number to include new CSL grants (old ones kept to keep backwards compatible FT
         15 - Canada Study Grant  Disability - old
         16 - Canada Study Grant  Doctoral - old
         17 - Canada Study Grant  Dependents - old
         18 - Canada Study Grant  High Need Part Time - old
         19 - Canada Millennium Bursary - old         
         22 - Canada Access Grant for Students with Permanent Disabilities - old
         23 - Canada Access Grant for Students from Low Income Families - old
         27 - low income - old
         28 - middle income - old
         29 - permanent disabilities
         30 - Grant for Services & Equipment for PD Students
         32 - full time dependents
         35 - grant for full time studentsPT
         31 - grant for part time students 
         33 - part time dependents
         34 - permanent disabilities
    */

	DECLARE @amount FLOAT(8) = 0;

	SELECT 
		@amount = SUM(d.disbursed_amount)
	FROM sfa.disbursement d
		INNER JOIN sfa.funding_request fr
			ON d.funding_request_id = fr.id
	WHERE fr.request_type_id IN (15,16,17,18,19,22,23,27,28,29,30,31,32,33,35,47)
	AND fr.application_id = @application_id;

	RETURN COALESCE(@amount, 0);
END;
GO

-- Get Shelter Food Misc: student_living_allowance_pck_1.get_shelter_food_misc
CREATE OR ALTER FUNCTION sfa.fn_get_shelter_food_misc(@academic_year INT, @province_id INT, @student_category_id INT)
RETURNS FLOAT(8)
AS
BEGIN 
	DECLARE @amount FLOAT(8) = 0;

	SELECT
		@amount = COALESCE(sla.shelter_amount, 0) + COALESCE(sla.food_amount, 0) + COALESCE(sla.misc_amount, 0)
	FROM sfa.student_living_allowance sla
	WHERE sla.academic_year_id = @academic_year
	AND sla.province_id = @province_id
	AND sla.student_category_id = @student_category_id;
	
	RETURN COALESCE(@amount, 0);
END;
GO

-- Get Max Discretionary: csl_lookup_pck_1.get_max_discretionary
CREATE OR ALTER FUNCTION sfa.fn_get_max_discretionary(@academic_year INT)
RETURNS FLOAT(8)
AS
BEGIN 
	DECLARE @amount FLOAT(8) = 0;
	
	SELECT 
		@amount = COALESCE(cl.discretionary_costs_max_amount, 0)
	FROM sfa.csl_lookup cl
	WHERE cl.academic_year_id = @academic_year;
	
	RETURN COALESCE(@amount, 0);
END;
GO

-- Get student category id by code.
CREATE OR ALTER FUNCTION sfa.fn_get_student_category_code(@student_category_code VARCHAR(10))
RETURNS VARCHAR(10)
AS
BEGIN 
	DECLARE @code VARCHAR(10) = NULL;
	
	SELECT 
		@code = sc.id 
	FROM
		sfa.student_category sc
	WHERE
		sc.code = @student_category_code
	
	RETURN @code;
END;
GO

-- Get Public Transportation: csl_lookup_pck_1.get_public_transportation
CREATE OR ALTER FUNCTION sfa.fn_get_public_transportation(@academic_year INT, @province_id INT, @student_category_id INT)
RETURNS FLOAT(8)
AS
BEGIN 
	DECLARE @amount FLOAT(8) = 0;
	
	SELECT 
		@amount = COALESCE(sla.public_tranport_amount, 0)
	FROM sfa.student_living_allowance sla
	WHERE sla.academic_year_id = @academic_year
	AND sla.province_id = @province_id
	AND sla.student_category_id = @student_category_id;
	
	RETURN COALESCE(@amount, 0);
END;
GO

-- Get Child Care: child_care_ceiling_pck_1.get_child_care
CREATE OR ALTER FUNCTION sfa.fn_get_child_care(@academic_year INT, @province_id INT)
RETURNS FLOAT(8)
AS
BEGIN 
	DECLARE @amount FLOAT(8) = 0;
	
	SELECT 
		@amount = COALESCE(ccc.max_amount, 0)
	FROM sfa.child_care_ceiling ccc
	WHERE ccc.academic_year_id = @academic_year
	AND ccc.province_id = @province_id;
	
	RETURN COALESCE(@amount, 0);
END;
GO

-- Get Actual Expense: expense_pck_1.get_actual_expense
CREATE OR ALTER FUNCTION sfa.fn_get_actual_expense(@period_id INT, @category_id INT, @application_id INT)
RETURNS FLOAT(8)
AS
BEGIN 
	DECLARE @amount FLOAT(8) = 0;

	SELECT TOP 1
		@amount = COALESCE(e.amount, 0)
	FROM sfa.expense e
	WHERE e.period_id = @period_id
	AND e.category_id = @category_id
	AND e.application_id = @application_id
	ORDER BY e.id DESC;
	
	RETURN COALESCE(@amount, 0);
END;
GO

-- Get Prestudy Tax Rate: prestudy_tax_rate_pck_1.get_prestudy_tax_rate
CREATE OR ALTER FUNCTION sfa.fn_get_prestudy_tax_rate(@academic_year INT, @income FLOAT(8))
RETURNS FLOAT(8)
AS
BEGIN 
	DECLARE @amount FLOAT(8) = 0;

	SELECT
		@amount = COALESCE(ptr.prestudy_tax_rate, 0)
	FROM sfa.prestudy_tax_rate ptr
	WHERE ptr.academic_year_id = @academic_year
	AND @income BETWEEN ptr.from_income_amount AND ptr.to_income_amount;
	
	RETURN COALESCE(@amount, 0);
END;
GO

-- Get Spouse Tax Rate: spouse_tax_rate_pck_1.get_spouse_tax_rate
CREATE OR ALTER FUNCTION sfa.fn_get_spouse_tax_rate(@academic_year INT, @province_id INT, @income FLOAT(8))
RETURNS FLOAT(8)
AS
BEGIN 
	DECLARE @amount FLOAT(8) = 0;

	SELECT
		@amount = COALESCE(str.tax_rate, 0)
	FROM sfa.spouse_tax_rate str
	WHERE str.academic_year_id = @academic_year
	AND str.province_id = @province_id
	AND @income BETWEEN str.from_income_amount AND str.to_income_amount;
	
	RETURN COALESCE(@amount, 0);
END;
GO

--Get Student Contribution: student_contribution_pck_1.get_student_contribution
CREATE OR ALTER FUNCTION sfa.fn_get_student_contribution(@academic_year INT, @province_id INT, @student_category_id INT, @period_id INT)
RETURNS FLOAT(8)
AS
BEGIN 
	DECLARE @amount FLOAT(8) = 0;

	SELECT
		@amount = COALESCE(sc.contribution_amount, 0)
	FROM sfa.student_contribution sc
	WHERE sc.academic_year_id = @academic_year
	AND sc.province_id = @province_id
	AND sc.student_category_id = @student_category_id
	AND sc.period_id = @period_id;
	
	RETURN COALESCE(@amount, 0);
END;
GO