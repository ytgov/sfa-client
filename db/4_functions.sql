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
                SELECT @weeks_allowed = @assessed_weeks;				
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
CREATE OR ALTER FUNCTION sfa.fn_get_assessment_count(@funding_request_id INT)
RETURNS INT AS
BEGIN
    DECLARE @assess_count INT;

    SELECT @assess_count = COALESCE(COUNT(id), 0)
    FROM sfa.assessment
    WHERE funding_request_id = @funding_request_id;

    RETURN @assess_count;

END;
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
    DEALLOCATE transportation_cur;

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
        SELECT @weeks_allowed = @assessed_weeks;				
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

                                        SET @v_amount_remaining = @v_amount_remaining - (SELECT paid_amount FROM @disbursement_temp WHERE id = @count)
                                        
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
		@amount = COALESCE(SUM(d.disbursed_amount), 0)
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
CREATE OR ALTER FUNCTION sfa.fn_get_student_category_id(@student_category_code VARCHAR(10))
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

-- Get Study Tax Rate: study_tax_rate_pck_1.get_study_tax_rate
CREATE OR ALTER FUNCTION sfa.fn_get_study_tax_rate(@academic_year INT, @income FLOAT(8))
RETURNS FLOAT(8)
AS
BEGIN 
	DECLARE @amount FLOAT(8) = 0;

	SELECT
		@amount = COALESCE(str.study_tax_rate, 0)
	FROM sfa.study_tax_rate str
	WHERE str.academic_year_id = @academic_year
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

-- Get Assessment Info PRC
CREATE OR ALTER FUNCTION sfa.fn_get_assessment_info_prc (@funding_request_id INT)
RETURNS INT
AS 
BEGIN
	DECLARE @assess_id INT;

	SELECT @assess_id = MAX(id)
	FROM sfa.assessment a
	WHERE a.funding_request_id = @funding_request_id;
	
	RETURN @assess_id;
END;
GO

-- Get Max Books
CREATE OR ALTER FUNCTION sfa.fn_get_max_books(@academic_year_id INT)
RETURNS FLOAT(8)
AS
BEGIN 
	DECLARE @amount FLOAT(8) = 0;

	SELECT 
	@amount = cl.books_max_amount 
	FROM sfa.csl_lookup cl 
	WHERE cl.academic_year_id = @academic_year_id;
	
	RETURN COALESCE(@amount, 0);
END;
GO

-- Get Previous Assessment
CREATE OR ALTER PROCEDURE sfa.sp_get_previous_assessment(@assessment_id INT)
AS
BEGIN 
	SELECT
		air_travel_disbursement_period,
		airfare_amount,
		allowed_books,
		allowed_months,
		allowed_percent,
		allowed_tuition,
		assessed_amount,
		assessed_date,
		assessment_adj_amount,
		assessment_type_id,
		asset_tax_rate,
		books_supplies_cost,
		change_reason_comment,
		classes_end_date,
		classes_start_date,
		csl_assessed_need,
		csl_classification,
		csl_full_amt_flag,
		csl_non_reason_id,
		csl_over_reason_id,
		csl_request_amount,
		day_care_actual,
		day_care_allowable,
		depend_food_allowable,
		depend_tran_allowable,
		dependent_count,
		destination_city_id,
		disbursements_required,
		discretionary_cost,
		discretionary_cost_actual,
		effective_rate_date,
		entitlement_days,
		family_size,
		funding_request_id,
		home_city_id,
		id,
		living_costs,
		marital_status_id,
		married_assets,
		married_pstudy,
		married_study,
		over_award,
		over_award_applied_flg,
		over_award_disbursement_period,
		p_trans_month,
		parent1_income,
		parent1_tax_paid,
		parent2_income,
		parent2_tax_paid,
		parent_contribution_override,
		parent_contribution_review,
		parent_province,
		parent_ps_depend_count,
		period,
		pre_leg_amount,
		prestudy_accom_code,
		prestudy_bus_flag,
		prestudy_csl_classification,
		prestudy_distance,
		prestudy_living_w_spouse_flag,
		prestudy_province_id,
		program_id,
		pstudy_day_care_actual,
		pstudy_day_care_allow,
		pstudy_depend_food_allow,
		pstudy_depend_tran_allow,
		pstudy_end_date,
		pstudy_expected_contrib,
		pstudy_p_trans_month,
		pstudy_shelter_month,
		pstudy_start_date,
		pstudy_x_trans_total,
		r_trans_16wk,
		relocation_total,
		return_uncashable_cert,
		second_residence_rate,
		shelter_month,
		spouse_contrib_exempt,
		spouse_contribution,
		spouse_contribution_override,
		spouse_contribution_review,
		spouse_expected_contribution,
		spouse_expected_income,
		spouse_gross_income,
		spouse_ln150_income,
		spouse_previous_contribution,
		spouse_province_id,
		spouse_pstudy_gross,
		spouse_pstudy_tax_rate,
		spouse_tax_rate,
		stud_pstudy_gross,
		stud_pstudy_tax_rate,
		student_contrib_exempt,
		student_contribution,
		student_contribution_override,
		student_contribution_review,
		student_expected_contribution,
		student_family_size,
		student_gross_income,
		student_ln150_income,
		student_previous_contribution,
		student_tax_rate,
		study_accom_code,
		study_area_id,
		study_bus_flag,
		study_distance,
		study_living_w_spouse_flag,
		study_months,
		study_province_id,
		study_weeks,
		total_grant_awarded,
		travel_allowance,
		tuition_estimate,
		uncapped_costs_total,
		uncapped_pstudy_total,
		weekly_amount,
		weeks_allowed,
		x_trans_total,
		years_funded_equivalent
	FROM sfa.assessment a
	WHERE a.id = @assessment_id;
END;
GO


-- Get application by funding request
CREATE OR ALTER PROCEDURE sfa.sp_get_application_by_funding_request(@funding_request_id INT)
AS
BEGIN
	SELECT 
		a.*
	FROM sfa.application a
		INNER JOIN sfa.funding_request fr 
			ON fr.application_id = a.id
	WHERE fr.id = @funding_request_id;
END;
GO

-- Get field program code
CREATE OR ALTER FUNCTION sfa.fn_get_field_program_code(@study_are_id INT, @program_id INT)
RETURNS INT
AS
BEGIN 
	DECLARE @result INT = NULL;

	SELECT TOP 1
		@result = fp.field_program_code
	FROM sfa.field_program fp
		INNER JOIN sfa.study_area sa
			ON fp.study_field_id = sa.study_field_id
	WHERE sa.id = @study_are_id
	AND fp.program_id = @program_id;
	
	RETURN @result;
END;
GO

-- Get CSL overaward
CREATE OR ALTER FUNCTION sfa.fn_get_csl_overaward(@student_id INT, @funding_request_id INT)
RETURNS FLOAT(8)
AS
BEGIN 
	DECLARE
		@request INT,
		@overaward FLOAT(8);
	
	SELECT
		@overaward = COALESCE(a.over_award, 0)
	FROM sfa.assessment a
		INNER JOIN sfa.funding_request fr
			ON fr.id = a.funding_request_id
			AND fr.id < @funding_request_id
		INNER JOIN sfa.application app
			ON fr.application_id = app.id
	WHERE a.assessment_type_id = 3 
	AND app.student_id = @student_id
	ORDER BY a.id DESC;	

	SELECT
		@request = COUNT(fr.id)
	FROM sfa.funding_request fr
		INNER JOIN sfa.application a
			ON fr.application_id = a.id
			AND a.student_id = @student_id
	WHERE fr.id <= @funding_request_id
	AND fr.request_type_id = 4;

	IF @request = 1
	BEGIN
		SELECT 
			@overaward = COALESCE(s.pre_over_award_amount, 0)
		FROM sfa.student s
		WHERE s.id = @student_id;
	END
	
	RETURN @overaward;	
END;
GO

-- Get Previous Disbursed
CREATE OR ALTER FUNCTION sfa.fn_get_previous_disbursed_amount(@funding_request_id INT, @assessment_id INT)
RETURNS FLOAT(8)
AS 
BEGIN
	DECLARE  @disbursed_amt FLOAT(8);

    SELECT @disbursed_amt = SUM(COALESCE(d.disbursed_amount, 0))
    FROM sfa.disbursement d
    WHERE d.funding_request_id = @funding_request_id
    AND d.assessment_id < @assessment_id;

    RETURN COALESCE(@disbursed_amt, 0);

END;
GO

-- Get Shelter Amount
CREATE OR ALTER FUNCTION sfa.fn_get_shelter_amount(@academic_year_id INT, @province_id INT, @student_category_id INT)
RETURNS FLOAT(8)
AS 
BEGIN
	DECLARE  @amt FLOAT(8);

    SELECT @amt = COALESCE(sla.shelter_amount, 0)
	FROM sfa.student_living_allowance sla
	WHERE sla.academic_year_id = @academic_year_id
	AND sla.province_id = @province_id
	AND sla.student_category_id = @student_category_id
    
    RETURN COALESCE(@amt, 0);

END;
GO

-- Get Mileage Rate
CREATE OR ALTER FUNCTION sfa.fn_get_mileage_rate(@academic_year_id INT)
RETURNS FLOAT(8)
AS 
BEGIN
	DECLARE  @amt FLOAT(8);

    SELECT @amt = COALESCE(cl.mileage_rate, 0)
    FROM sfa.csl_lookup cl
    WHERE cl.academic_year_id = @academic_year_id;
    
    RETURN COALESCE(@amt, 0);

END;
GO

-- Get Max Relocation
CREATE OR ALTER FUNCTION sfa.fn_get_max_relocation(@academic_year_id INT)
RETURNS FLOAT(8)
AS 
BEGIN
	DECLARE  @amt FLOAT(8);

    SELECT @amt = COALESCE(cl.relocation_max_amount, 0)
    FROM sfa.csl_lookup cl
    WHERE cl.academic_year_id = @academic_year_id;
    
    RETURN COALESCE(@amt, 0);

END;
GO

-- Get Max Return Transport
CREATE OR ALTER FUNCTION sfa.fn_get_max_return_transport(@academic_year_id INT)
RETURNS FLOAT(8)
AS 
BEGIN
	DECLARE  @amt FLOAT(8);

    SELECT @amt = COALESCE(cl.return_transport_max_amount, 0)
    FROM sfa.csl_lookup cl
    WHERE cl.academic_year_id = @academic_year_id;
    
    RETURN COALESCE(@amt, 0);

END;
GO

-- Get Vehicle deduction amount
CREATE OR ALTER FUNCTION sfa.fn_get_vehicle_deduction_amount(@academic_year_id INT)
RETURNS FLOAT(8)
AS 
BEGIN
	DECLARE  @amt FLOAT(8);

    SELECT @amt = COALESCE(cl.vehicle_deduction_amount, 0)
    FROM sfa.csl_lookup cl
    WHERE cl.academic_year_id = @academic_year_id;
    
    RETURN COALESCE(@amt, 0);

END;
GO

-- Get RRSP Deduction Yearly Amount
CREATE OR ALTER FUNCTION sfa.fn_get_rrsp_deduction_yearly_amount(@academic_year_id INT)
RETURNS FLOAT(8)
AS 
BEGIN
	DECLARE  @amt FLOAT(8);

    SELECT @amt = COALESCE(cl.rrsp_deduction_yearly_amount, 0)
    FROM sfa.csl_lookup cl
    WHERE cl.academic_year_id = @academic_year_id;
    
    RETURN COALESCE(@amt, 0);

END;
GO

--GET_HOME_CITY OR pr_get_home_city_id_fct
CREATE OR ALTER FUNCTION sfa.fn_get_home_city (@student_id INT)
RETURNS INT AS
BEGIN
DECLARE @home_city_id INT;
    SELECT  @home_city_id = pa.city_id
    FROM sfa.student s
    INNER JOIN sfa.person p ON p.id = s.person_id 
    INNER JOIN sfa.person_address pa ON pa.person_id = p.id
    WHERE s.id = @student_id
    AND pa.address_type_id = 1;

    RETURN @home_city_id;
END
GO
-- GET_INSTITUTION_CITY
CREATE OR ALTER FUNCTION sfa.fn_get_institution_city (@application_id INT)
RETURNS INT AS
BEGIN
DECLARE @destination_city INT;

    SELECT 
    @destination_city = ic.address_city_id
    FROM sfa.application app
    INNER JOIN sfa.institution_campus ic ON app.institution_campus_id = ic.id
    WHERE app.id = @application_id;

    RETURN @destination_city;
END;
GO

-- yg_cost_pck.get_weekly_rate_fct - GET_WEEKLY_AMOUNT
CREATE OR ALTER FUNCTION sfa.fn_get_weekly_amount (@application_id INT)
RETURNS NUMERIC AS
BEGIN
DECLARE @weekly_amount NUMERIC;

    SELECT TOP 1 @weekly_amount = COALESCE(yc.weekly_amount, 0)
    FROM sfa.yg_cost yc
    WHERE yc.academic_year_id = (
        SELECT app.academic_year_id
        FROM sfa.application app
        WHERE app.id = @application_id
      )
    AND yc.allowed_percent = 100;

    RETURN @weekly_amount;
END;
GO

-- Get Person Address
CREATE OR ALTER FUNCTION sfa.fn_get_person_address(@person_id INT, @address_type INT = 1)
RETURNS TABLE
AS
RETURN
SELECT TOP 1
	pa.*
FROM sfa.person p
	LEFT JOIN sfa.person_address pa
		ON pa.person_id = p.id 
WHERE p.id = @person_id
AND pa.address_type_id = @address_type;
GO

-- Get Standard Living Amount
CREATE OR ALTER FUNCTION sfa.fn_get_standard_living_amount(@academic_year_id INT, @province_id INT, @family_size INT)
RETURNS FLOAT(8)
AS 
BEGIN
	DECLARE  @amt FLOAT(8);

    SELECT @amt = COALESCE(sol.standard_living_amount, 0)
    FROM sfa.standard_of_living sol
    WHERE sol.academic_year_id = @academic_year_id
   	AND sol.province_id = @province_id
   	AND sol.family_size = @family_size;
    
    RETURN COALESCE(@amt, 0);

END;
GO

-- Get Parent Contribution
CREATE OR ALTER FUNCTION sfa.fn_get_parent_contribution_amount(@academic_year_id INT, @discretionary_amount FLOAT(8))
RETURNS FLOAT(8) AS
BEGIN
    DECLARE @amount FLOAT(8) = 0;
    
    SELECT 
		@amount = ROUND((pcf.add_amount + ((@discretionary_amount - pcf.subtract_amount) * (pcf.percentage/100)))/pcf.divide_by, 2) 
	FROM sfa.parent_contribution_formula pcf
	WHERE pcf.academic_year_id = @academic_year_id
	AND @discretionary_amount BETWEEN pcf.income_from_amount AND pcf.income_to_amount;

    RETURN COALESCE(@amount, 0);
END;
GO

-- Get Income Amount
CREATE OR ALTER FUNCTION sfa.fn_get_other_income_amount(@application_id INT, @academic_year_id INT)
RETURNS FLOAT(8)
AS
BEGIN 
	DECLARE @amount FLOAT(8) = 0;
	DECLARE @exempt FLOAT(8) = 0;

	SELECT 
		@exempt = @exempt + COALESCE(SUM(i.amount), 0)
	FROM sfa.income i 
		INNER JOIN sfa.income_type it
			ON it.id = i.income_type_id
	WHERE i.application_id = @application_id
	AND it.id = 16
	AND i.amount IS NOT NULL
	AND it.assess_as_asset = 1;

	IF @academic_year_id >= 2004
	BEGIN
		
		SELECT
			@exempt = CASE WHEN (@exempt - COALESCE(cl.merit_exempt_amount,0)) > 0 THEN (@exempt - COALESCE(cl.merit_exempt_amount,0)) ELSE 0 END
		FROM sfa.csl_lookup cl
		WHERE cl.academic_year_id = @academic_year_id;
		
	END	

	SELECT 
		@amount = COALESCE(SUM(i.amount), 0)
	FROM sfa.income i 
		INNER JOIN sfa.income_type it
			ON it.id = i.income_type_id
	WHERE i.application_id = @application_id
	AND it.id <> 16
	AND i.amount IS NOT NULL
	AND it.assess_as_asset = 1;

	
	RETURN COALESCE(@amount, 0) + @exempt;
END;
GO

-- Get Expense Amount
CREATE OR ALTER FUNCTION sfa.fn_get_expense_amount(@application_id INT, @period_id INT)
RETURNS FLOAT(8)
AS
BEGIN 
	DECLARE @amount FLOAT(8) = 0;
	
	SELECT 
		@amount = COALESCE(SUM(e.amount),0)
	FROM sfa.expense e
	WHERE e.application_id = @application_id
	AND e.period_id = @period_id;
	
	RETURN COALESCE(@amount, 0);
END;
GO

-- Get CSL Dependent Count
CREATE OR ALTER FUNCTION sfa.fn_get_csl_dependent_count(@application_id INT)
RETURNS INT
AS
BEGIN 
	DECLARE @count INT = 0;
	
	SELECT 
		@count = COALESCE(COUNT(d.id), 0)
	FROM sfa.dependent d
		INNER JOIN sfa.application a
			ON d.student_id = a.student_id
		INNER JOIN sfa.dependent_eligibility de
			ON de.dependent_id = d.id
			AND de.application_id = a.id
			AND de.is_csl_eligible = 1
	WHERE a.id = @application_id;

	RETURN COALESCE(@count, 0);
END;
GO

-- Get Investment Total Amount.
CREATE OR ALTER FUNCTION sfa.fn_get_investment_total_amount(@application_id INT, @ownership_id INT, @is_rrsp BIT)
RETURNS FLOAT(8)
AS
BEGIN 
	DECLARE @amount FLOAT(8) = 0;
	
	SELECT
		@amount = COALESCE(SUM(i.market_value),0)
	FROM sfa.investment i 
		INNER JOIN sfa.ownership o
			ON i.ownership_id = o.id
	WHERE i.application_id = @application_id 
	AND i.market_value IS NOT NULL
	AND i.is_rrsp = @is_rrsp
	AND o.id = @ownership_id;
	
	RETURN COALESCE(@amount, 0);
END;
GO

-- Get grant Amount
CREATE OR ALTER FUNCTION sfa.fn_get_grant_amount(@application_id INT, @request_type_id INT)
RETURNS FLOAT(8)
AS
BEGIN 
	DECLARE @amount FLOAT(8) = 0;
	
	SELECT 
		@amount = COALESCE(SUM(d.disbursed_amount), 0)
	FROM sfa.disbursement d
		INNER JOIN sfa.funding_request fr
			ON d.funding_request_id = fr.id
	WHERE fr.request_type_id = @request_type_id
	AND fr.application_id = @application_id;
	
	RETURN COALESCE(@amount, 0);
END;
GO

-- Get Income Threshold Amount.
CREATE OR ALTER FUNCTION sfa.fn_get_income_threshold_amount(@family_size INT, @academic_year_id INT)
RETURNS FLOAT(8)
AS
BEGIN 
	DECLARE @amount FLOAT(8) = 0;
	
	SELECT 
		@amount = COALESCE(SUM(ct.income_threshold), 0)
	FROM sfa.csg_threshold ct
	WHERE ct.academic_year_id = @academic_year_id
	AND ct.family_size = @family_size
		
	RETURN COALESCE(@amount, 0);
END;
GO

-- Get CSL Lookup Contrib Percentages
CREATE OR ALTER FUNCTION sfa.fn_get_csl_lookup_contrib_pct(@academic_year_id INT)
RETURNS TABLE
AS
RETURN
SELECT
	COALESCE(cl.student_contrib_percent, 0)/100 AS student_contrib_percent,
	COALESCE(cl.spouse_contrib_percent, 0)/100 AS spouse_contrib_percent,
	COALESCE(cl.low_income_student_contrib_amount, 0) AS low_income_student_contrib_amount,
	COALESCE(cl.student_contrib_max_amount, 0) AS student_contrib_max_amount
FROM sfa.csl_lookup cl
WHERE cl.academic_year_id = @academic_year_id;
GO

-- Get Student previous contrib amount.
CREATE OR ALTER FUNCTION sfa.fn_get_student_previous_contrib_amount(@assessment_id INT, @academic_year_id INT, @student_id INT)
RETURNS FLOAT(8)
AS 
BEGIN
	DECLARE  @amt FLOAT(8);

	SELECT
		@amt = COALESCE(SUM(a.student_contribution), 0)
	FROM sfa.assessment a
	WHERE a.id < @assessment_id
	AND a.student_contrib_exempt <> 'Yes'
	AND a.assessment_type_id IN (1,2)
	AND a.id IN (
		SELECT 
			a2.id 
		FROM sfa.assessment a2 
			INNER JOIN sfa.funding_request fr
				ON a2.funding_request_id = fr.id
				AND fr.request_type_id IN (4,5)
				AND fr.status_id IN (6,7)
			INNER JOIN sfa.application a3
				ON fr.application_id = a3.id
				AND a3.student_id = @student_id
				AND a3.academic_year_id = @academic_year_id
	)
	AND a.id IN (
		SELECT
			d.assessment_id 
		FROM sfa.disbursement d 
		WHERE (SELECT SUM(d2.disbursed_amount) FROM sfa.disbursement d2 WHERE d2.id = d.id GROUP BY d2.id) <> 0
	)
	AND a.id NOT IN (
		SELECT
			a4.id 
		FROM sfa.assessment a4
		WHERE a4.funding_request_id = a.funding_request_id 
	);
	
	
	
    RETURN COALESCE(@amt, 0);

END;
GO

-- Get Spouse previous contrib amount
CREATE OR ALTER FUNCTION sfa.fn_get_spouse_previous_contrib_amount(@assessment_id INT, @academic_year_id INT, @student_id INT)
RETURNS FLOAT(8)
AS 
BEGIN
	DECLARE  @amt FLOAT(8);

	SELECT
		@amt = COALESCE(SUM(a.spouse_contribution), 0)
	FROM sfa.assessment a
	WHERE a.id < @assessment_id
	AND a.spouse_contrib_exempt <> 'Yes'
	AND a.assessment_type_id IN (1,2)
	AND a.id IN (
		SELECT 
			a2.id 
		FROM sfa.assessment a2 
			INNER JOIN sfa.funding_request fr
				ON a2.funding_request_id = fr.id
				AND fr.request_type_id IN (4,5)
				AND fr.status_id IN (6,7)
			INNER JOIN sfa.application a3
				ON fr.application_id = a3.id
				AND a3.student_id = @student_id
				AND a3.academic_year_id = @academic_year_id
	)
	AND a.id IN (
		SELECT
			d.assessment_id 
		FROM sfa.disbursement d 
		WHERE (SELECT SUM(d2.disbursed_amount) FROM sfa.disbursement d2 WHERE d2.id = d.id GROUP BY d2.id) <> 0
	)
	AND a.id NOT IN (
		SELECT
			a4.id 
		FROM sfa.assessment a4
		WHERE a4.funding_request_id = a.funding_request_id 
	);
	
	
	
    RETURN COALESCE(@amt, 0);

END;
GO

-- Get Assessment By Funding Request Id
CREATE OR ALTER PROCEDURE sfa.sp_get_assessment_by_funding_request(@funding_request_id INT)
AS
BEGIN
	SELECT 
		a.*
	FROM sfa.assessment a 
	WHERE a.funding_request_id = @funding_request_id;
END;
GO

-- Get Max Weekly Allowable Amount
CREATE OR ALTER FUNCTION sfa.fn_get_max_weekly_allowable_amount(@academic_year_id INT)
RETURNS FLOAT(8)
AS 
BEGIN
	DECLARE  @amt FLOAT(8);

	SELECT 
		@amt = COALESCE(cl.allowable_weekly_amount, 0)
	FROM sfa.csl_lookup cl
	WHERE cl.academic_year_id = @academic_year_id
		
    RETURN COALESCE(@amt, 0);

END;
GO

-- Get Csl Lookup By Year
CREATE OR ALTER FUNCTION sfa.fn_get_csl_lookup_by_year(@academic_year_id INT)
RETURNS TABLE
AS
RETURN
SELECT TOP 1
	*
FROM sfa.csl_lookup cl
WHERE cl.academic_year_id = @academic_year_id;
GO

-- Get Msfaa By Student Id
CREATE OR ALTER PROCEDURE sfa.sp_get_msfaa_by_student_id(@student_id INT)
AS
BEGIN
	SELECT 
		m.*
	FROM sfa.msfaa m 
	WHERE m.student_id = @student_id
	AND m.id = (
		SELECT MAX(m2.id)
		FROM sfa.msfaa m2
		WHERE m2.student_id = m.student_id
		AND m2.is_full_time = 1
	);
END;
GO

-- Get Msfaa Student Fulltime Count
CREATE OR ALTER FUNCTION sfa.fn_get_msfaa_student_fulltime_count(@student_id INT)
RETURNS INT
AS
BEGIN 
	DECLARE @result INT = 0;

	SELECT
		@result = COALESCE(COUNT(m.id), 0)
	FROM sfa.msfaa m
	WHERE m.student_id = @student_id
	AND m.is_full_time = 1;
	
	RETURN COALESCE(@result, 0);
END;
GO

-- Get MSFAA application by student id
CREATE OR ALTER PROCEDURE sfa.sp_get_msfaa_application_by_student_id(@student_id INT)
AS
BEGIN
	SELECT 
		m.id AS msfaa_id,
		a.id AS application_id,
		a.classes_end_date,
		m.msfaa_status
	FROM sfa.msfaa m
		INNER JOIN sfa.application a
			ON m.application_id = a.id
	WHERE m.student_id = @student_id
	AND m.id = (
		SELECT MAX(m2.id)
		FROM sfa.msfaa m2
		WHERE m2.student_id = m.student_id
		AND m2.is_full_time = 1
	);
END;
GO

-- FILE : ASSESSMENT_SFA  --- pr_get_dependent_count_fct --- PROCEDURE: SFAADMIN.DEPENDENT_PCK$GET_DEPENDENT_COUNT_FCT$IMPL
CREATE OR ALTER FUNCTION sfa.fn_get_dependent_count_sta_fct(
   @application_id INT
)
RETURNS INT
AS
	BEGIN
        DECLARE @return_value_argument INT;
		DECLARE @res_v_dependent_count INT;

		DECLARE
		 dependent_cur CURSOR LOCAL FOR 
		   SELECT count_big(*) AS dependent_count
		   FROM sfa.dependent  AS d
		   INNER JOIN sfa.application AS h ON h.student_id = d.student_id
		   INNER JOIN sfa.dependent_eligibility  AS de ON de.dependent_id = d.id
		   WHERE 
		      de.application_id = h.id AND 
		      de.is_csl_eligible = 1 AND 
		      h.id = @application_id;
        
		OPEN dependent_cur
		FETCH dependent_cur
			INTO @res_v_dependent_count
		CLOSE dependent_cur
		DEALLOCATE dependent_cur
		
        SET @return_value_argument = @res_v_dependent_count
		RETURN @return_value_argument
	END
GO

-- FILE : ASSESSMENT_SFA  --- FUNCTION: GET_SECOND_RESIDENCE
CREATE OR ALTER FUNCTION sfa.fn_get_second_residence_sta
/*This function returns the value of the second residence rate*/
(
	@applitacion_id INT 
)
RETURNS FLOAT(8)
BEGIN
	DECLARE
		@second_res_amt FLOAT(8);
	DECLARE
		@academic_year_id INT;
	DECLARE
		@return_value_argument INT;
	SELECT @academic_year_id = app.academic_year_id
		FROM sfa.application app
	WHERE app.id = @applitacion_id
	EXEC @second_res_amt = sfa.pr_get_residence_rate_sta @academic_year_id, @return_value_argument OUT;
	RETURN @second_res_amt
END
GO

CREATE OR ALTER PROCEDURE sfa.pr_get_travel_allowance_sta
   @home_city_id INT,
   @school_city_id INT,
   @return_value_argument_tq float(53) OUTPUT
AS 
   BEGIN
     DECLARE
        @res_v_travel_allowance float(53)
     DECLARE
         transportation_cur CURSOR LOCAL FOR 
           SELECT isnull(tr.travel_allowance_amount, 0) AS travel_allowance
           FROM sfa.transportation tr
           WHERE tr.home_city_id = @home_city_id AND tr.institution_city_id = @school_city_id
     OPEN transportation_cur
     FETCH transportation_cur
         INTO @res_v_travel_allowance
     CLOSE transportation_cur
     DEALLOCATE transportation_cur
     IF @res_v_travel_allowance > 0
        BEGIN
           SET @return_value_argument_tq = @res_v_travel_allowance
           RETURN @return_value_argument_tq
        END
     ELSE 
        BEGIN
           SET @return_value_argument_tq = 0
           RETURN @return_value_argument_tq
        END
	END
GO

-- FILE : ASSESSMENT_STA  --- FUNCTION: GET_TRAVEL_ALLOWANCE
CREATE OR ALTER FUNCTION sfa.fn_get_travel_allowance_sta
/*This function gets the travel allowance based on the home city and school city*/
(
	@student_id INT,
    @application_id INT
)
RETURNS NUMERIC(10,2)
BEGIN
	DECLARE @trav_allow NUMERIC(10,2);
	DECLARE @home_city_id INT;
	DECLARE @school_city_id INT;

	SELECT @home_city_id = sfa.fn_get_home_city(@student_id);
	SELECT @school_city_id = sfa.fn_get_institution_city(@application_id);

	SELECT @trav_allow = sfa.fn_get_travel_allowance(@home_city_id, @school_city_id);

	RETURN @trav_allow
END
GO

-- FILE : ASSESSMENT_SFA  --- FUNCTION: GET_OTHER_INST_TOTAL
CREATE OR ALTER FUNCTION sfa.fn_get_other_inst_total_sta
/*This function calculates the assessed amount based on the weekly amount, second residence amount entitlement days and tavel allowance*/
(
	@weekly_amount INT,
	@assessment_second_residence_rate float(8),
	@assessment_entitlement_days float(8),
	@travel_allowance float(53)
)
RETURNS FLOAT(53)
AS
BEGIN
	DECLARE @assessed_total float(53);
    
	SELECT @assessed_total = (((@weekly_amount + @assessment_second_residence_rate)/5 * @assessment_entitlement_days) + @travel_allowance)
	RETURN @assessed_total
END 
GO

-- FILE : ASSESSMENT_SFA  --- FUNCTION: GET_NET
CREATE OR ALTER FUNCTION sfa.fn_get_net_sta(@assessment_assessed_amount DECIMAL(10, 2), @assessment_previous_disbursement DECIMAL(10, 2))
RETURNS DECIMAL(10, 2)
AS
BEGIN
  DECLARE @net_amt DECIMAL(10, 2);
  
  SET @net_amt = @assessment_assessed_amount - @assessment_previous_disbursement;
  
  IF @net_amt BETWEEN -1 AND 1
  BEGIN
    SET @net_amt = 0;
  END;
  
  RETURN @net_amt;
END
GO

-- FILE : ASSESSMENT_SFA  --- FUNCTION: GET_WEEKS_ALLOWED
CREATE OR ALTER FUNCTION sfa.fn_get_weeks_allowed_sta
(
    @previous_weeks FLOAT,
    @assessed_weeks FLOAT,
    @prev_weeks_curr_yr FLOAT
)
RETURNS FLOAT
AS
BEGIN
    DECLARE @v_weeks FLOAT;

    IF ISNULL(@previous_weeks, 0) + ISNULL(@assessed_weeks, 0) > 170
    BEGIN
        SET @v_weeks = 170 - ISNULL(@previous_weeks, 0);
    END
    ELSE IF ISNULL(@prev_weeks_curr_yr, 0) > 0 AND ISNULL(@prev_weeks_curr_yr, 0) + ISNULL(@assessed_weeks, 0) > 40
    BEGIN
        SET @v_weeks = 40 - @prev_weeks_curr_yr;
    END
    ELSE
    BEGIN
        SET @v_weeks = ISNULL(@assessed_weeks, 0);
    END

    IF @v_weeks > 40
    BEGIN
        SET @v_weeks = 40;
    END

    RETURN @v_weeks;
END
GO

-- FILE : ASSESSMENT_STA  --- FUNCTION: SFAADMIN.STA_LOOKUP_PCK$GET_WEEKLY_RATE_FCT$IMPL  
CREATE OR ALTER PROCEDURE sfa.pr_get_weekly_rate_sta
   @dependent_count_p INT,
   @academic_year_id_p INT,
   @return_value_argument INT OUTPUT
AS 
	BEGIN
		DECLARE
		@res_v_weekly_rate INT
		
        
		   SELECT 
		      CASE @dependent_count_p
		         WHEN 0 THEN st.dependent_0_amount
		         WHEN 1 THEN st.dependent_1_amount
		         WHEN 2 THEN st.dependent_2_amount
		         WHEN 3 THEN st.dependent_3_amount
		         ELSE st.dependent_4_amount
		      END AS weekly_rate
		   FROM sfa.sta_lookup st
		   WHERE st.academic_year_id = @academic_year_id_p
		OPEN weekly_rate_cur
		FETCH weekly_rate_cur
			INTO @res_v_weekly_rate
		CLOSE weekly_rate_cur
		DEALLOCATE weekly_rate_cur
		SET @return_value_argument = @res_v_weekly_rate
		RETURN @return_value_argument
	END
GO

-- FILE : ASSESSMENT_SFA  --- PROCEDURE: SFAADMIN.DEPENDENT_PCK$GET_DEPENDENT_COUNT_FCT$IMPL
CREATE OR ALTER PROCEDURE sfa.pr_get_dependent_count_sta
   @application_id INT,
   @return_value_argument INT OUTPUT
AS 
	BEGIN
		DECLARE
		@res_v_dependent_count INT
		DECLARE
		 dependent_cur CURSOR LOCAL FOR 
		   SELECT count_big(*) AS dependent_count
		   FROM sfa.dependent  AS d
		   INNER JOIN sfa.application AS h ON h.student_id = d.student_id
		   INNER JOIN sfa.dependent_eligibility  AS de ON de.dependent_id = d.id
		   WHERE 
		      de.application_id = h.id AND 
		      de.is_csl_eligible = 1 AND 
		      h.id = @application_id
		OPEN dependent_cur
		FETCH dependent_cur
			INTO @res_v_dependent_count
		CLOSE dependent_cur
		DEALLOCATE dependent_cur
			SET @return_value_argument = @res_v_dependent_count
		RETURN @return_value_argument
	END
GO

-- FILE : ASSESSMENT_SFA  --- FUNCTION: GET_WEEKLY_AMOUNT
CREATE OR ALTER FUNCTION sfa.fn_get_weekly_amount_sta
/*This function returns the base weekly amount*/
(
	@application_id INT
)
RETURNS NUMERIC
AS 
BEGIN
	DECLARE @wk_amt NUMERIC(10,2);
	DECLARE @dependent_count INT;
	DECLARE @return_value_argument INT;
	DECLARE @return_value_argument_wk INT;
	DECLARE @academic_year_id INT;
	SELECT @academic_year_id = app.academic_year_id
	FROM
		sfa.application app
	WHERE app.id = @application_id
	EXEC @dependent_count = sfa.pr_get_dependent_count_sta @application_id,@return_value_argument OUT;
	EXEC @wk_amt = sfa.pr_get_weekly_rate_sta @dependent_count,@academic_year_id,@return_value_argument_wk OUT;
	RETURN @wk_amt
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_count_disbursement_ecerts
(
    @FROM_DATE DATE,
    @TO_DATE DATE
)
RETURNS INT
AS
BEGIN
    DECLARE @v_count INT = 0;
    DECLARE disbursement_count CURSOR FOR
        SELECT COUNT(id)    
        FROM sfa.disbursement
        WHERE csl_cert_seq_number is null 
           AND issue_date >= @FROM_DATE
           AND issue_date <= @TO_DATE
           AND disbursement_type_id in (3,4,5,7,9)
           AND NOT due_date IS NULL
           AND NOT transaction_number IS NULL;
    OPEN disbursement_count;
        FETCH NEXT FROM disbursement_count INTO @v_count 
    CLOSE disbursement_count;
    IF @v_count IS NULL OR @v_count = 0 
        BEGIN
            RETURN -1
        END         
    ELSE
        BEGIN 
            RETURN @v_count;                        
        END                 
RETURN 0; 
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_city_fct (@city_id_p INT)
RETURNS VARCHAR(100) 
AS
BEGIN
    DECLARE @description VARCHAR(100); 
    IF @city_id_p IS NULL
    BEGIN
        RETURN NULL;
    END

    SELECT @description = description
    FROM sfa.city
    WHERE id = @city_id_p;

    RETURN @description;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_province_fct (@province_id_p INT)
RETURNS NVARCHAR(50)
AS
BEGIN
    DECLARE @description NVARCHAR(50);
    DECLARE @abbreviation NVARCHAR(10);   
    IF @province_id_p IS NULL
    BEGIN
        RETURN NULL;
    END
    SELECT @description = description, @abbreviation = abbreviation
    FROM sfa.province
    WHERE id = @province_id_p;
    IF @abbreviation IS NULL
    BEGIN
        RETURN @description;
    END    
        RETURN @abbreviation;    
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_country_fct (@country_id_p INT)
RETURNS NVARCHAR(50)
AS
BEGIN
    DECLARE @description NVARCHAR(50);
    IF @country_id_p IS NULL
    BEGIN
        RETURN NULL;
    END
    SELECT @description = description
    FROM sfa.country
    WHERE id = @country_id_p;
    RETURN @description;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_institution_code_fct (@institution_id_p INT)
RETURNS NVARCHAR(100)
AS
BEGIN
  DECLARE @institution_code NVARCHAR(100);
  
  SELECT TOP 1 @institution_code = federal_institution_code
  FROM sfa.institution
  WHERE id = @institution_id_p;
  
  RETURN @institution_code;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_field_program_code_fct(@study_field_id_p INT, @program_id_p INT)
RETURNS INT
AS
BEGIN
  DECLARE @field_program_code INT;
  
  IF @study_field_id_p IS NULL OR @program_id_p IS NULL
  BEGIN
    RETURN NULL;
  END;

  SELECT TOP 1 @field_program_code = field_program_code
  FROM sfa.field_program
  WHERE study_field_id = @study_field_id_p AND program_id = @program_id_p;

  RETURN @field_program_code;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_study_field_id_fct(@study_area_id_p INT)
RETURNS INT
AS
BEGIN
  DECLARE @study_field_id INT;
  
  IF @study_area_id_p IS NULL
  BEGIN
    RETURN NULL;
  END;

  SELECT TOP 1 @study_field_id = study_field_id
  FROM sfa.study_area
  WHERE id = @study_area_id_p;

  RETURN @study_field_id;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_grant_amount(@history_detail_id_p INT, @request_type_id_p INT)
RETURNS DECIMAL(18, 2)
AS
BEGIN
  DECLARE @v_total DECIMAL(18, 2);

  SELECT @v_total = SUM(d.disbursed_amount)
  FROM sfa.disbursement d
  INNER JOIN funding_request f ON d.funding_request_id = f.id
  WHERE f.request_type_id = @request_type_id_p
  AND f.application_id = @history_detail_id_p;

  RETURN @v_total;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_nbd_grant_amount(@history_detail_id_p INT, @issue_date_p DATE, @request_type_id_p INT)
RETURNS DECIMAL(18, 2)
AS
BEGIN
  DECLARE @v_total DECIMAL(18, 2);

  SELECT @v_total = SUM(disbursed_amount)
  FROM disbursement d
  INNER JOIN funding_request f ON d.funding_request_id = f.id
  WHERE f.request_type_id = @request_type_id_p
    AND f.application_id = @history_detail_id_p
    AND d.issue_date = @issue_date_p
    AND d.due_date = (
      SELECT MIN(due_date) 
      FROM sfa.disbursement
      WHERE funding_request_id = d.funding_request_id
        AND issue_date = @issue_date_p
      GROUP BY funding_request_id, issue_date
    );

  RETURN @v_total;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_mp_grant_amount(@history_detail_id_p INT, @issue_date_p DATE, @request_type_id_p INT)
RETURNS DECIMAL(18, 2)
AS
BEGIN
  DECLARE @v_total DECIMAL(18, 2);

  SELECT @v_total = SUM(disbursed_amount)
  FROM sfa.disbursement d
  INNER JOIN funding_request f ON d.funding_request_id = f.id
  WHERE f.request_type_id = @request_type_id_p
    AND f.application_id = @history_detail_id_p
    AND d.issue_date = @issue_date_p
    AND d.due_date = (
      SELECT MAX(due_date) 
      FROM disbursement
      WHERE funding_request_id = d.funding_request_id
        AND issue_date = @issue_date_p
      GROUP BY funding_request_id, issue_date
      HAVING MAX(due_date) <> MIN(due_date) -- Excluir si solo hay un desembolso
    );

  RETURN @v_total;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_address_fct(@student_id_p INT, @application_id_p INT)
RETURNS VARCHAR(10)
AS
BEGIN
    DECLARE @v_start DATE;
    DECLARE @v_end DATE;
    DECLARE @v_mailing VARCHAR(100);
    DECLARE @v_home VARCHAR(100);
    DECLARE @v_return VARCHAR(10);   
      
   
    SELECT @v_start = app.classes_start_date,
           @v_end = app.classes_end_date,
           @v_mailing = pa.address1,
           @v_home = pam.address1
    FROM sfa.application app
    INNER JOIN student s ON app.student_id = s.id
    INNER JOIN sfa.person p ON p.id = s.person_id
    LEFT JOIN sfa.person_address pa ON pa.person_id = p.id AND pa.address_type_id = 1 -- ONLY THE HOME ADDRESS
	LEFT JOIN sfa.person_address pam ON pa.person_id = p.id AND pa.address_type_id = 2 -- ONLY THE MAILING ADDRESS
    WHERE app.id = @application_id_p
      AND s.id = @student_id_p;

    IF NOT @v_start IS NULL AND NOT @v_end IS NULL
    BEGIN
        SET @v_start = DATEADD(DAY, -14, @v_start);

        IF GETDATE() BETWEEN @v_start AND @v_end
        BEGIN
            IF NOT @v_mailing IS NULL
            BEGIN
                SET @v_return = 'SCHOOL';
            END;
        END;
    END;

    IF @v_return IS NULL
    BEGIN
        SET @v_return = 'HOME';
    END;

    RETURN @v_return;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_cert_data(@CSL_CERT_SEQ_P INT, @FROM_DATE_P DATE, @TO_DATE_P DATE)
RETURNS NVARCHAR(MAX)
AS 
BEGIN
	DECLARE cur_cslft CURSOR FOR
	
	SELECT s.id, app.id, SUBSTRING(p.sin,1,9) AS sin
    , ISNULL(SUBSTRING(app.student_number,1,12),' ') AS student_number
    , CASE app.marital_status_id
      	WHEN 1 THEN 'S'
        WHEN 2 THEN 'S'
        WHEN 4 THEN 'M'
        ELSE 'O'
    END AS marital_status
    ,CASE p.sex_id
	    WHEN 1 THEN 'M'
        WHEN 2 THEN 'F'
        ELSE 'U'
    END AS gender
    ,CASE p.language_id
        WHEN 2 THEN 2
        ELSE 1
    END AS language_id
    ,FORMAT(p.birth_date, 'yyyyMMdd') AS birth_date
    , SUBSTRING(p.last_name,1,50) AS last_name
    , SUBSTRING(p.first_name,1,25) AS first_name
    , ISNULL(pa.address1,' ') as home_address1
    , ISNULL(pa.address2,' ') as home_address2
    , ISNULL(sfa.fn_get_city_fct(pa.city_id),' ') AS home_city
    , pa.province_id
    , ISNULL(sfa.fn_get_province_fct(pa.province_id),' ') AS home_province
    , ISNULL(p.telephone,' ') as student_phone
    , ISNULL( UPPER(CASE 
              WHEN LEN(pa.postal_code) = 7 THEN SUBSTRING(pa.postal_code, 1, 3) + SUBSTRING(pa.postal_code, 5, 3)
              ELSE pa.postal_code
          END),' ') AS student_postal_code   
    , ISNULL(sfa.fn_get_country_fct(pa.country_id),' ') AS home_country
    , ISNULL(p.email,' ') as student_email 
    , ISNULL(pam.address1,' ') as mailing_address1
    , ISNULL(pam.address2,' ') as mailing_address2
    , ISNULL(sfa.fn_get_city_fct(pam.city_id),' ') mailing_city
    , pam.province_id 
    , ISNULL(sfa.fn_get_province_fct(pam.province_id),' ') AS mailing_province
    , ISNULL(app.school_telephone, ' ')
    , ISNULL(UPPER(CASE 
            WHEN LEN(pam.postal_code) = 7 THEN SUBSTRING(pam.postal_code, 1, 3) + SUBSTRING(pam.postal_code, 5, 3)
            ELSE pam.postal_code
        END),  ' ') AS mailing_postal_code
    , ISNULL(sfa.fn_get_country_fct(pam.country_id),' ') AS mailing_country
    , ISNULL(app.school_email,' ') as school_email
    , SUBSTRING(CONVERT(VARCHAR,sfa.fn_get_institution_code_fct(app.institution_campus_id)),1,4) AS institution_code
    , SUBSTRING(CONVERT(VARCHAR, sfa.fn_get_field_program_code_fct(sfa.fn_get_study_field_id_fct(app.study_area_id),app.program_id)),1,2) AS field_of_study
    , RIGHT('0' + CAST(SUBSTRING(ISNULL(CONVERT(VARCHAR, app.program_year), 0), 1, 1) AS VARCHAR), 1) AS program_year
    , RIGHT('0' + CAST(SUBSTRING(ISNULL(CONVERT(VARCHAR, app.program_year_total), 0), 1, 1) AS VARCHAR), 1) AS program_year_total
    , FORMAT(a.classes_start_date,'yyyyMMdd') AS classes_start
    , FORMAT(a.classes_end_date,'yyyyMMdd') AS classes_end
    , ISNULL(CONVERT(INT,d.disbursed_amount),0) AS csl_amount 
    , CASE d.disbursement_type_id
      	WHEN 4 THEN 'F'
	    ELSE 'P'
	  END AS pt_indicator
   	, RIGHT('        ' + SUBSTRING(CAST(d.transaction_number AS VARCHAR(100)), 1, 8), 8) AS transaction_number    
    , FORMAT(d.due_date,'yyyyMMdd') AS not_before_date
    , FORMAT(d.issue_date,'yyyyMMdd') AS issue_date
    , FORMAT(a.study_weeks, '00') AS study_weeks 
    , ISNULL(CONVERT(INT,(sfa.fn_get_grant_amount(app.id,22))),0) AS cag_pd_amount
    , ISNULL(CONVERT(INT,(sfa.fn_get_grant_amount(app.id,23))),0) AS cag_li_amount
    , ISNULL(CONVERT(INT,(sfa.fn_get_grant_amount(app.id,26))),0) AS tg_amount
    , ISNULL(CONVERT(INT,(sfa.fn_get_nbd_grant_amount(app.id,d.issue_date,27))),0) 
    + ISNULL(CONVERT(INT,(sfa.fn_get_nbd_grant_amount(app.id,d.issue_date,35))),0) 
    + ISNULL(CONVERT(INT,(sfa.fn_get_nbd_grant_amount(app.id,d.issue_date,31))),0) AS csgli_nbd_amount
    , ISNULL(CONVERT(INT,(sfa.fn_get_nbd_grant_amount(app.id,d.issue_date,28))),0) AS csgmi_nbd_amount
    , ISNULL(CONVERT(INT,(sfa.fn_get_nbd_grant_amount(app.id,d.issue_date,47))),0) AS csgmi_nbd_amount  
    , ISNULL(CONVERT(INT,(sfa.fn_get_nbd_grant_amount(app.id,d.issue_date,29))),0) AS csgpd_nbd_amount
    , ISNULL(CONVERT(INT,(sfa.fn_get_nbd_grant_amount(app.id,d.issue_date,32))),0) AS csgdep_nbd_amount     
    , ISNULL(CONVERT(INT,(sfa.fn_get_nbd_grant_amount(app.id,d.issue_date,30))),0) AS csgse_nbd_amount
    , ISNULL(CONVERT(INT,(sfa.fn_get_mp_grant_amount(app.id,d.issue_date,27))),0)
    + ISNULL(CONVERT(INT,(sfa.fn_get_mp_grant_amount(app.id,d.issue_date,35))),0) AS csgli_mid_amount
    , ISNULL(CONVERT(INT,(sfa.fn_get_mp_grant_amount(app.id,d.issue_date,28))),0) AS csgmi_mid_amount
    , ISNULL(CONVERT(INT,(sfa.fn_get_mp_grant_amount(app.id,d.issue_date,47))),0)
    , ISNULL(CONVERT(INT,(sfa.fn_get_mp_grant_amount(app.id,d.issue_date,29))),0) AS csgpd_mid_amount
    , ISNULL(CONVERT(INT,(sfa.fn_get_mp_grant_amount(app.id,d.issue_date,32))),0) AS csgdep_mid_amount      
    , ISNULL(CONVERT(INT,(sfa.fn_get_mp_grant_amount(app.id,d.issue_date,30))),0) AS csgse_mid_amount
    , SUBSTRING(sfa.fn_get_study_area_fct(app.study_area_id),1,50) AS study_area
    , CASE app.permanent_disability 
    	WHEN 1 THEN 'Y'
    	ELSE 'N'
      END AS perm_disabled_indicator
    , app.academic_year_id
    , CASE app.permanent_disability
    	WHEN 1 THEN '40'
    	ELSE
    		(CASE app.percent_of_full_time
    			WHEN NULL THEN '60'
    			ELSE percent_of_full_time
    		END)
      END AS percent_of_full_time
    , d.id
	, CASE ISNULL(app.is_persist_disabled, 0)
		WHEN 1 THEN 'Y'
		ELSE 'N'
	  END AS persist_disabled_indicator          
	FROM sfa.student s 
	    INNER JOIN sfa.application app ON s.id = app.student_id
	    INNER JOIN sfa.funding_request fr ON app.id = fr.application_id
	    INNER JOIN sfa.assessment a ON fr.id = a.funding_request_id
	    INNER JOIN sfa.disbursement d ON a.id = d.assessment_id
	    INNER JOIN sfa.person p ON p.id = s.person_id
	    LEFT JOIN sfa.person_address pa ON pa.person_id = p.id AND pa.address_type_id = 1 
	    LEFT JOIN sfa.person_address pam ON pa.person_id = p.id AND pa.address_type_id = 2
	    LEFT JOIN sfa.msfaa m ON s.id = m.student_id
	WHERE fr.request_type_id IN (4, 5)
		AND d.csl_cert_seq_number = @CSL_CERT_SEQ_P or d.csl_cert_seq_number IS NULL
		AND d.issue_date >= @FROM_DATE_P AND d.issue_date <= @TO_DATE_P	   					
		AND (m.msfaa_status = 'Received' AND m.is_full_time = CASE WHEN d.disbursement_type_id = 4 THEN 1 ELSE 0 END OR app.academic_year_id <= 2012)
		AND d.ecert_sent_date IS NULL
	ORDER BY
    	d.due_date DESC,
	    d.transaction_number,
	    p.last_name,
	    p.first_name;	   	   	
 
	DECLARE @out_file AS INT; 
	DECLARE @v_file_name AS VARCHAR(100);
	DECLARE @out_record AS VARCHAR(1000);
	DECLARE @out_record2 AS VARCHAR(MAX);
	DECLARE @out_record3 AS VARCHAR(1000);
	DECLARE @out_record4 AS VARCHAR(2000);
	DECLARE @v_mailing AS VARCHAR(20);
	DECLARE @v_count AS INT = 0;
	DECLARE @v_total_grant AS INT = 0; 
	DECLARE @v_address1 AS VARCHAR(50);
	DECLARE @v_address2 AS VARCHAR(50);
	DECLARE @v_city AS VARCHAR(28);
	DECLARE @v_province AS VARCHAR(2);
	DECLARE @v_phone AS VARCHAR(20);
	DECLARE @v_postal_code AS VARCHAR(6);
	DECLARE @v_country AS VARCHAR(20);
	DECLARE @v_email AS VARCHAR(50);
	DECLARE @v_status AS CHAR(1);
	DECLARE @v_file_seq AS INT;
	DECLARE @v_mid_point_date AS VARCHAR(8);
	DECLARE @v_all_disburse AS INT = 0;
	DECLARE @v_cancel_disburse AS INT = 0;
	DECLARE @v_mid_point_count AS INT; 
	DECLARE @v_enrol_conf_status NVARCHAR(1);

	
	DECLARE @id AS INT;
	DECLARE @app_id AS INT;
	DECLARE @sin AS NVARCHAR(9);
	DECLARE @student_number AS NVARCHAR(9);
	DECLARE @marital_status AS VARCHAR(1);
	DECLARE @gender AS VARCHAR(1);
	DECLARE @language_id AS INT;
	DECLARE @birth_date AS NVARCHAR(4000);
	DECLARE @last_name AS NVARCHAR(50);
	DECLARE @first_name AS NVARCHAR(25);
	DECLARE @home_address1 AS NVARCHAR(100);
	DECLARE @home_address2 AS NVARCHAR(100);
	DECLARE @home_city AS VARCHAR(100);
	DECLARE @province_id AS INT;
	DECLARE @home_province AS NVARCHAR(50);
	DECLARE @student_phone AS NVARCHAR(24);
	DECLARE @student_postal_code AS NVARCHAR(50);
	DECLARE @home_country AS NVARCHAR(50);
	DECLARE @student_email AS NVARCHAR(100);
	DECLARE @mailing_address1 AS NVARCHAR(100);
	DECLARE @mailing_address2 AS NVARCHAR(100);
	DECLARE @mailing_city AS VARCHAR(100);
	DECLARE @province_id2 AS INT;
	DECLARE @mailing_province AS NVARCHAR(50);
	DECLARE @school_telephone AS NVARCHAR(24);
	DECLARE @mailing_postal_code AS NVARCHAR(50);
	DECLARE @mailing_country AS NVARCHAR(50);
	DECLARE @school_email AS NVARCHAR(100);
	DECLARE @institution_code AS VARCHAR(4);
	DECLARE @field_of_study AS VARCHAR(2);
	DECLARE @program_year AS VARCHAR(1);
	DECLARE @program_year_total AS VARCHAR(1);
	DECLARE @classes_start AS NVARCHAR(4000);
	DECLARE @classes_end AS NVARCHAR(4000);
	DECLARE @csl_amount AS INT;
	DECLARE @pt_indicator AS VARCHAR(1);
	DECLARE @transaction_number AS VARCHAR(8);
	DECLARE @not_before_date AS NVARCHAR(4000);
	DECLARE @issue_date AS NVARCHAR(4000);
	DECLARE @study_weeks AS NVARCHAR(4000);
	DECLARE @cag_pd_amount AS INT;
	DECLARE @cag_li_amount AS INT;
	DECLARE @tg_amount AS INT;
	DECLARE @csgli_nbd_amount AS INT;
	DECLARE @csgmi_nbd_amount AS INT;
	DECLARE @uknown1 AS INT;
	DECLARE @csgpd_nbd_amount AS INT;
	DECLARE @csgdep_nbd_amount AS INT;
	DECLARE @csgse_nbd_amount AS INT;
	DECLARE @csgli_mid_amount AS INT;
	DECLARE @csgmi_mid_amount AS INT;
	DECLARE @uknown2 AS INT;
	DECLARE @csgpd_mid_amount AS INT;
	DECLARE @csgdep_mid_amount AS INT;
	DECLARE @csgse_mid_amount AS INT;
	DECLARE @study_area AS NVARCHAR(100);
	DECLARE @perm_disabled_indicator AS NVARCHAR(1);
	DECLARE @academic_year AS INT;
	DECLARE @percent_of_full_time AS NVARCHAR(100);
	DECLARE @disbursement_id AS INT;
	DECLARE @persist_disabled_indicator AS NVARCHAR(1);

   		
 	SET @v_file_name = 'PPYT.EDU.CERTS.D' + CONVERT(NVARCHAR(4), YEAR(GETDATE())) + RIGHT('00' + CONVERT(NVARCHAR(3), DATEPART(DAYOFYEAR, GETDATE())), 3) + '.001';	
	SET @out_record = 'H' + RIGHT('000000000' + CAST(@CSL_CERT_SEQ_P AS NVARCHAR(9)), 9) + 'YT' + CONVERT(NVARCHAR(8), GETDATE(), 112) + REPLICATE(' ', 592);
	
    --out_record := 'H'||RPAD(:CSL_CERT_SEQ_P,9,'0')||'YT'|| TO_CHAR(SYSDATE,'yyyymmdd') ||RPAD(' ',492,' ');
	OPEN cur_cslft;							
		WHILE @@FETCH_STATUS = 0
			BEGIN   			
				FETCH NEXT FROM cur_cslft INTO  @id, @app_id, @sin, @student_number, @marital_status, @gender, @language_id, @birth_date, @last_name, @first_name, @home_address1, @home_address2, @home_city, @province_id, @home_province, @student_phone, @student_postal_code, @home_country, @student_email, @mailing_address1, @mailing_address2, @mailing_city, @province_id2, @mailing_province, @school_telephone, @mailing_postal_code, @mailing_country, @school_email, @institution_code, @field_of_study, @program_year, @program_year_total, @classes_start, @classes_end, @csl_amount, @pt_indicator, @transaction_number, @not_before_date, @issue_date, @study_weeks, @cag_pd_amount, @cag_li_amount, @tg_amount, @csgli_nbd_amount, @csgmi_nbd_amount, @uknown1, @csgpd_nbd_amount, @csgdep_nbd_amount, @csgse_nbd_amount, @csgli_mid_amount, @csgmi_mid_amount, @uknown2, @csgpd_mid_amount, @csgdep_mid_amount, @csgse_mid_amount, @study_area, @perm_disabled_indicator, @academic_year, @percent_of_full_time, @disbursement_id, @persist_disabled_indicator;
				SET @v_total_grant = (
	                @cag_pd_amount +
					@cag_li_amount +
					@tg_amount +
					@csgli_nbd_amount +
					@csgmi_nbd_amount +
					@csgpd_nbd_amount +
					@csgdep_nbd_amount +					
					@csgli_mid_amount +
					@csgmi_mid_amount +
					@csgpd_mid_amount +
					@csgdep_mid_amount					
				); 					
			
			
				IF @csl_amount >= 0 AND @v_total_grant >= 0
					BEGIN
						SET @v_status = 'P'; 
					END
				ELSE 
					BEGIN
						SET @v_status = 'N'; 
					END
					
				IF @academic_year < 2013
					BEGIN
						SET @v_enrol_conf_status = 'M';
					END
				ELSE 
					BEGIN
						SET @v_enrol_conf_status = 'U';
					END
					
				
				SET @v_mailing = sfa.fn_get_address_fct(@id, @app_id);
				
				IF @v_mailing = 'HOME'
					BEGIN
						SET @v_address1 = SUBSTRING(@home_address1,1,50);
	                	SET @v_address2 = SUBSTRING(@home_address2,1,50);
	                	SET @v_city = SUBSTRING(@home_city,1,28);
	                						
	                	IF @province_id >= 1 AND @province_id <= 13
		                	BEGIN
		                		SET @v_province = SUBSTRING(@home_province,1,2);
	                        	SET @v_postal_code = SUBSTRING(@student_postal_code,1,6);
		                	END    
		                ELSE 
		                	BEGIN
		                		SET @v_province = '  ';
	                        	SET @v_postal_code = '      ';
		                	END
		                	
		                SET @v_phone = SUBSTRING(@student_phone,1,20);			
	                	SET @v_country = SUBSTRING(@home_country,1,20);
	                	SET @v_email = SUBSTRING(@student_email,1,50);	                
				END
				ELSE
					BEGIN
						SET @v_address1 = SUBSTRING(@mailing_address1,1,50);
	                    SET @v_address2 = SUBSTRING(@mailing_address2,1,50);
	                	SET @v_city = SUBSTRING(@mailing_city,1,28);
	                   
	                    IF @mailing_province >= 1 AND @mailing_province <= 13
	                    	BEGIN 
	                    		SET @v_province = SUBSTRING(@mailing_province,1,2);
	                        	SET @v_postal_code = SUBSTRING(@mailing_postal_code,1,6);
	                    	END
	                    ELSE 
	                    	BEGIN
	                    		SET @v_province = '  ';
	                            SET @v_postal_code = '      ';
	                    	END
	                    	
	                    SET @v_phone = SUBSTRING(@school_telephone,1,20);			
	                    SET @v_country = SUBSTRING(@mailing_country,1,20);
	                    SET @v_email = SUBSTRING(@school_email,1,50);	                    	                    	
					END;								
				
				SET @v_phone = REPLACE(@v_phone,'-', '');
				
				SET @v_mid_point_count = (
					SELECT COUNT(d.due_date)				
					FROM sfa.disbursement d, sfa.funding_request fr
					WHERE request_type_id IN (22,23,26,27,28,29,30,31,32,33,34,35,47)
					AND fr.id = d.funding_request_id
					AND fr.application_id = @app_id
					AND d.issue_date = @issue_date
					AND d.transaction_number = @transaction_number
					AND d.due_date <> @not_before_date
				)				
				
				IF @v_mid_point_count > 0 
					BEGIN 
                    	SELECT @v_mid_point_date = CONVERT(VARCHAR, MAX(d.due_date), 112) 
						FROM sfa.disbursement d
						INNER JOIN sfa.funding_request fr ON fr.id = d.funding_request_id
						WHERE d.due_date = (
						    SELECT MAX(due_date) 
						    FROM sfa.disbursement 
						    WHERE funding_request_id = fr.id 
						    AND fr.request_type_id IN (22,23,26,27,28,29,30,31,32,33,34,35,47)
						)
						AND fr.application_id = @app_id
						AND d.issue_date = @issue_date
						AND d.transaction_number = @transaction_number;
					END
						                
			    ELSE 
				    BEGIN 
					   SET @v_mid_point_date = '00000000'; 
					END		
					 
				SET @out_record2 = ISNULL(@out_record2, '') + (
					'D'
					+ ISNULL(LEFT(CAST(@sin AS VARCHAR(20)) + '         ', 9), '')
					+ ISNULL(LEFT(CAST(@student_number AS VARCHAR (20)) + '            ', 12), '')
					+ ISNULL(LEFT(CAST(@marital_status AS VARCHAR (20)) + ' ', 1), '')
					+ ISNULL(LEFT(CAST(@gender AS VARCHAR (20)) + ' ', 1), '')
					+ ISNULL(LEFT(CAST(@language_id AS VARCHAR (20)) + ' ', 1)	, '')
					+ ISNULL(RIGHT('00000000' + CAST(@birth_date AS VARCHAR(100)), 8), '')
					+ ISNULL(LEFT(CAST(@last_name AS VARCHAR(100)) + '                                                  ',50), '')
					+ ISNULL(LEFT(CAST(@first_name AS VARCHAR(100)) + '                         ',25), '')
					+ ISNULL(LEFT(CAST(@v_address1 AS VARCHAR(100)) + '                                                  ',50), '')
					+ ISNULL(LEFT(CAST(@v_address2 AS VARCHAR(100)) + '                                                  ',50), '')
					+ ISNULL(LEFT(CAST(@v_city AS VARCHAR(100)) + '                            ',28), '')
					+ ISNULL(LEFT(CAST(@v_province AS VARCHAR(100)) + '  ',2), '')
					+ ISNULL(LEFT(CAST(@v_phone AS VARCHAR(100)) + '                    ',20), '')
					+ ISNULL(LEFT(CAST(@v_postal_code AS VARCHAR(100)) + '      ',6), '')
					+ ISNULL(LEFT(CAST(@v_country AS VARCHAR(100)) + '                    ',20), '')
					+ ISNULL(LEFT(CAST(@v_email AS VARCHAR(100)) + '                                                  ',50), '')
					+ ISNULL(LEFT(CAST(@institution_code AS VARCHAR(100)) + '    ',4), '')
					+ ISNULL(LEFT(CAST(@field_of_study AS VARCHAR(100)) + '  ',2), '')
					+ ISNULL(CAST(@program_year AS VARCHAR(100)), '')
					+ ISNULL(CAST(@program_year_total AS VARCHAR(100)), '')
					+ ISNULL(CAST(@classes_start AS VARCHAR(100))	    							, '')
					+ ISNULL(CAST(@classes_end AS VARCHAR(100)), '')
					+ ISNULL(RIGHT('000000' + CAST(ABS(@csl_amount) AS VARCHAR(100)), 6), '')
					+ ISNULL(@pt_indicator, '')
					+ ISNULL(LEFT(' ' + '  ', 2), '')
					+ ISNULL(LEFT(CAST(@transaction_number AS VARCHAR(100)) + '        ',8), '')
					+ ISNULL(RIGHT('00000000' + CAST(@not_before_date AS VARCHAR(100)), 8), '')
					+ ISNULL(RIGHT('00000000' + CAST(@issue_date AS VARCHAR(100)), 8), '')
					+ ISNULL(CAST(@v_status AS VARCHAR(1)), '')
					+ ISNULL(CAST(@study_weeks AS VARCHAR(100)), '')
					+ ISNULL(RIGHT('000000' + CAST(@cag_pd_amount AS VARCHAR(100)), 6), '')
					+ ISNULL(RIGHT('000000' + CAST(@cag_li_amount AS VARCHAR(100)), 6), '')
					+ ISNULL(RIGHT('000000' + CAST(@tg_amount AS VARCHAR(100)), 6), '')
					+ ISNULL(RIGHT('00000' + CAST(@v_total_grant AS VARCHAR(100)), 5), '')
					+ ISNULL(RIGHT('00000' + CAST(@csgli_nbd_amount AS VARCHAR(100)), 5), '')
					+ ISNULL(RIGHT('00000' + CAST(@csgmi_nbd_amount AS VARCHAR(100)), 5), '')
					+ ISNULL(RIGHT('00000' + CAST(@csgpd_nbd_amount AS VARCHAR(100)), 5), '')
					+ ISNULL(RIGHT('00000' + CAST(@csgdep_nbd_amount AS VARCHAR(100)), 5), '')
					+ '00000'
					+ ISNULL(LEFT(' ' + '                    ', 20), '')
					+ ISNULL(CAST(@v_mid_point_date AS VARCHAR(100)), '')
					+ ISNULL(RIGHT('00000' + CAST(@csgli_mid_amount AS VARCHAR(100)), 5), '')
					+ ISNULL(RIGHT('00000' + CAST(@csgmi_mid_amount AS VARCHAR(100)), 5), '')
					+ ISNULL(RIGHT('00000' + CAST(@csgpd_mid_amount AS VARCHAR(100)), 5), '')
					+ ISNULL(RIGHT('00000' + CAST(@csgdep_mid_amount AS VARCHAR(100)), 5), '')
					+ '00000'
					+ ISNULL(LEFT(' ' + '                    ', 20), '')
					+ ISNULL(LEFT(@v_enrol_conf_status + ' ', 1), '')
					+ '00000000'    
					+ '00000000'    
					+ ISNULL(LEFT(@study_area + '                                                  ',50), '')
					+ ISNULL(@perm_disabled_indicator, '')
					+ ISNULL(@persist_disabled_indicator, '')
					+ ISNULL(@percent_of_full_time, '')
					+ ISNULL(LEFT(' ' + '                          ', 26), '')
);
	                
	               
	        	SET @v_count = @v_count + 1;
	        
		        IF	@v_status = 'P' 
		        	BEGIN
			        	SET @v_all_disburse = @v_all_disburse + @csl_amount;				        
			        END					   				    
				ELSE
					BEGIN						
						SET @v_cancel_disburse = @v_cancel_disburse + @csl_amount;
					END					
			END;	
				
			SET @out_record3 = 'T' + RIGHT('000000' + CAST(@v_count AS VARCHAR), 6)
                + RIGHT('000000000' + CAST(ABS(@v_all_disburse) AS VARCHAR), 9)
                + RIGHT('000000000' + CAST(ABS(@v_cancel_disburse) AS VARCHAR), 9)
                + REPLICATE(' ', 587);				
		CLOSE cur_cslft;		
		DEALLOCATE cur_cslft;	
	
		SET @out_record4 = @out_record + @out_record2;
		RETURN @v_file_name + @out_record + @out_record2 + @out_record3;	
				
END
GO

-- FILE : ASSESSMENT_YEA --- FUNCTION: GET_NET
CREATE OR ALTER FUNCTION sfa.fn_get_net_yea(@assessment_assessed_amount DECIMAL(10, 2), @assessment_previous_disbursement DECIMAL(10, 2))
RETURNS DECIMAL(10, 2)
AS
BEGIN
    DECLARE @net_amt DECIMAL(10, 2);
    
    SET @net_amt = @assessment_assessed_amount - @assessment_previous_disbursement;
    
    IF @net_amt BETWEEN -1 AND 1
    BEGIN
        SET @net_amt = 0;
    END;
    
    RETURN @net_amt;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_new_info_yea(
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
    disbursements_required INT,
    previous_disbursement NUMERIC, -- IS NOT IN ASSESSMENT, IS IN CSL_NARS_HISTORY
    assessed_amount NUMERIC
)
AS
BEGIN
    /*
        This procedure is the main point for calling the functions that return values
        needed for the assessment
    */

    DECLARE @wk_amt DECIMAL(18, 2);
    DECLARE @intwk INT;
    DECLARE @disbursed_amt DECIMAL(18, 2);
    DECLARE @assess_id_internal INT;
    DECLARE @previous_disbursement NUMERIC;

    /*
        Calculate the previous disbursement amount
    */
    /* Note: we don't actually need to determine assess_id, because we will be calculating the amount
            disbursed for ALL assessments on this funding request. This code remains in here in
            case there is a need to calculate only for this assessment instead. The procedure,
            Get_Disbursed_Amount has the test for assess_id commented out of the where clause.
    */
    -- IF (@assessment_id < @assess_id AND @assessment_id IS NOT NULL) OR @assess_id = 0
    --     BEGIN
    --         SET @assess_id_internal = @assessment_id;
    --     END
    -- ELSE
    --     BEGIN
    --         SET @assess_id_internal = @assess_id;
    --     END

    SELECT @disbursed_amt = sfa.fn_get_disbursed_amount_fct(@funding_request_id, @assessment_id);

    IF @disbursed_amt > 0
        BEGIN
            SET @previous_disbursement = @disbursed_amt;
        END
        
    ELSE
        BEGIN
            SET @previous_disbursement = 0;
        END

    -- EXEC sfa.calc_assess_info_yea @student_id;
    RETURN;
END
GO

-- Get student address by application
CREATE OR ALTER FUNCTION sfa.fn_get_student_address_by_application(@application_id INT, @address_type INT = 1)
RETURNS TABLE
AS
RETURN
SELECT
	pa.*
FROM sfa.application a
	INNER JOIN sfa.student s 
		ON s.id = a.student_id 
	LEFT JOIN sfa.person_address pa
		ON pa.person_id = s.person_id
WHERE a.id = @application_id
AND pa.address_type_id = @address_type;
GO

-- Get Disbursement Max Transaction
CREATE OR ALTER FUNCTION sfa.fn_get_disbursement_max_transaction(@funding_request_id INT)
RETURNS INT
AS 
BEGIN
    DECLARE  @max INT = 0;

    SELECT
        @max = MAX(d.transaction_number)
    FROM sfa.disbursement d 
    WHERE d.funding_request_id = @funding_request_id

    RETURN COALESCE(@max, 0);
END;
GO

-- Get Batch Parameter Id
CREATE OR ALTER FUNCTION sfa.fn_get_batch_parameter_id(@batch_parameter_name NVARCHAR)
RETURNS INT
AS 
BEGIN
    DECLARE  @result INT = 0;

    SELECT
        @result = bp.id
    FROM sfa.batch_parameter bp
    WHERE bp.[description] = @batch_parameter_name;

    RETURN COALESCE(@result, 0);
END;
GO

-- Get Correspondence Type
CREATE OR ALTER FUNCTION sfa.fn_get_correspondence_type_id(@description NVARCHAR)
RETURNS INT
AS 
BEGIN
    DECLARE  @result INT = 0;

    SELECT
        @result = ct.id
    FROM sfa.correspondence_type ct
    WHERE ct.[description] = @description

    RETURN COALESCE(@result, 0);
END;
GO

-- Create correspondence
CREATE OR ALTER PROCEDURE sfa.create_correspondence(@correspondence_type_id INT, @student_id INT, @request_type_id INT, @correspondence_id INT OUTPUT)
AS 
BEGIN
    DECLARE @date_ref DATETIME2 = GETDATE();
    
    -- @TODO Can´t add officer validation, SFA schema does not contain the table.

    -- Create correspondence record.
    INSERT INTO sfa.correspondence (correspondence_date, officer_id, correspondence_type_id, student_id, request_type_id)
    VALUES (@date_ref, 52, @correspondence_type_id, @student_id, @request_type_id);    

    SELECT @correspondence_id = SCOPE_IDENTITY();
    
    RETURN @correspondence_id;
END;
GO

-- Get student address from student pck
CREATE OR ALTER FUNCTION sfa.fn_get_student_address(@student_id INT, @application_id INT)
RETURNS NVARCHAR
AS 
BEGIN
    DECLARE @address NVARCHAR(500) = 'HOME';
    DECLARE @start_date DATETIME2,
            @end_date DATETIME2,
            @mail_id INT,
            @home_id INT;

    SELECT
        @start_date = a.classes_start_date,
        @end_date = a.classes_end_date,
        @mail_id = mail.id,
        @home_id = home.id
    FROM sfa.application a 
        INNER JOIN sfa.student s
            ON s.id = a.student_id
        LEFT JOIN sfa.person_address mail
            ON mail.person_id = s.person_id
            AND mail.address_type_id = 2
        LEFT JOIN sfa.person_address home
            ON home.person_id = s.person_id
            AND home.address_type_id = 4
    WHERE a.id = @application_id
    AND a.student_id = @student_id;

    IF @start_date IS NOT NULL AND @end_date IS NOT NULL
    BEGIN
        SET @start_date = DATEADD(DAY, -14, @start_date);

        IF GETDATE() BETWEEN @start_date AND @end_date
        BEGIN
            IF @mail_id IS NOT NULL
            BEGIN
                SET @address = 'SCHOOL';
            END;
        END;
    END;
    
    RETURN COALESCE(@address, 'HOME');
END;
GO

-- Get Address By Person
CREATE OR ALTER FUNCTION sfa.fn_get_address_by_person(@person_id INT, @address_type_id INT)
RETURNS TABLE
AS
RETURN
SELECT
    pa.id,
    pa.person_id,
    pa.address_type_id,
    pa.address1,
    pa.address2,
    pa.city_id,
    ci.[description] AS city,
    pa.country_id,
    co.[description] AS country,
    pa.province_id,
    pr.[description] AS province,
    pa.postal_code,
    pa.telephone,
    pa.email,
    pa.notes
FROM sfa.person_address pa
    LEFT JOIN sfa.city ci
        ON ci.id = pa.city_id
    LEFT JOIN sfa.country co
        ON co.id = pa.country_id
    LEFT JOIN sfa.province pr
        ON pr.id = pa.province_id
WHERE pa.person_id = @person_id
AND pa.address_type_id = @address_type_id;          
GO

-- Get mail address
CREATE OR ALTER FUNCTION sfa.fn_get_mail_address(@student_id INT)
RETURNS TABLE
AS
RETURN
SELECT
    s.id,
    s.person_id,
    p.first_name,
    p.last_name,    
    se.[description] AS sex,
    CASE 
        WHEN p.sex_id = 1 THEN 'Mr.'
        WHEN p.sex_id = 2 THEN 'Ms.'
        ELSE '' END AS salut,
    home.address1 AS home_address1,
    home.address2 AS home_address2,
    home.city_id AS home_city_id,
    home.city AS home_city,
    home.country_id AS home_country_id,
    home.country AS home_country,
    home.province_id AS home_province_id,
    home.province AS home_province,
    home.postal_code AS home_postal_code,
    home.telephone AS home_telephone,
    home.email AS home_email,
    mail.address1 AS mail_address1,
    mail.address2 AS mail_address2,
    mail.city_id AS mail_city_id,
    mail.city AS mail_city,
    mail.country_id AS mail_country_id,
    mail.country AS mail_country,
    mail.province_id AS mail_province_id,
    mail.province AS mail_province,
    mail.postal_code AS mail_postal_code,
    mail.telephone AS mail_telephone,
    mail.email AS mail_email
FROM sfa.student s
    INNER JOIN sfa.person p
        ON p.id = s.person_id
    LEFT JOIN sfa.sex se
        ON se.id = p.sex_id
    CROSS APPLY sfa.fn_get_address_by_person(s.person_id, 1) AS home
    CROSS APPLY sfa.fn_get_address_by_person(s.person_id, 2) AS mail
WHERE s.id = @student_id;
GO

-- Get Batch parameter id
CREATE OR ALTER FUNCTION sfa.fn_get_batch_parameter_id(@batch_parameter_name NVARCHAR)
RETURNS INT
AS 
BEGIN
	DECLARE  @result INT;

    SELECT @result = bp.id
    FROM sfa.batch_parameter bp
    WHERE bp.[description] = @batch_parameter_name;
    
    RETURN COALESCE(@result, 0);

END;
GO

-- Get Batch parameter id
CREATE OR ALTER FUNCTION sfa.fn_get_csg_only_flag(@funding_request_id INT, @application_id INT)
RETURNS BIT
AS 
BEGIN
	DECLARE  @result BIT = 0;

    SELECT @result = fr.is_csg_only
    FROM sfa.funding_request fr
    WHERE fr.id = @funding_request_id
    AND fr.application_id = @application_id;
    
    RETURN @result;

END;
GO

-- FILE : ASSESSMENT_SFA  --- FUNCTION: GET_DISBURSEMENTS_ALLOWED
CREATE OR ALTER FUNCTION sfa.fn_get_disbursements_allowed_sta(
	@application_institution_campus_id INT,
	@assessment_id INT
)
RETURNS numeric(10,2)
AS
BEGIN
	DECLARE
		@v_disb_allowed numeric(10,2) = 1,
		@v_weeks_after_issue float (8),
		@v_weeks_before_issue numeric(10,2),
		@v_federal_institution_code varchar(100),
		@v_disbursement_issue_date date,
		@assessment_effective_rate_date date,
		@assessment_weeks_allowed float(8)
	SELECT @v_federal_institution_code = sfa.fn_get_short_name_sta(@application_institution_campus_id)
	SELECT @v_disbursement_issue_date = dis.issue_date from sfa.disbursement dis where dis.assessment_id = @assessment_id	
	SELECT @assessment_effective_rate_date = a.effective_rate_date from sfa.assessment a where a.id = @assessment_id
	SELECT @assessment_weeks_allowed = a.weeks_allowed from sfa.assessment a where a.id = @assessment_id
	IF  @v_federal_institution_code = 'LPAH'
	BEGIN
		SELECT @v_weeks_before_issue = CEILING(DATEDIFF(week,ISNULL(@v_disbursement_issue_date,GETDATE()),@assessment_effective_rate_date))
		SELECT @v_weeks_after_issue = floor(@assessment_weeks_allowed - @v_weeks_before_issue)
		SELECT @v_disb_allowed = CEILING(@v_weeks_after_issue/2)+1
		IF @v_disb_allowed < 1
		BEGIN
			SET @v_disb_allowed = 1
		END
	END
RETURN @v_disb_allowed
END
GO

-- FILE : INSTITUTION_PCK_1.sql  --- FUNCTION: get_short_name_fct
CREATE OR ALTER FUNCTION sfa.fn_get_short_name_sta
(
	@institution_id_p INT
)
RETURNS varchar(100)
AS
BEGIN
	DECLARE @federal_institution_code varchar(20);

    SELECT @federal_institution_code = ins.federal_institution_code 
    FROM sfa.institution_campus ic  
    INNER JOIN sfa.institution ins ON ic.institution_id = ins.id 
    WHERE ic.id = @institution_id_p

	RETURN @federal_institution_code
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_weeks_calc_sta ( @start_date DATE, @end_date DATE ) 
RETURNS NUMERIC AS
BEGIN
	DECLARE @days_allowed NUMERIC;
	DECLARE @weekend_days NUMERIC;
	DECLARE @actual_days NUMERIC;
	DECLARE @wk_allowed NUMERIC;

    SET @days_allowed = DATEDIFF(DAY, @start_date, @end_date) + 1;
    SET @weekend_days = ROUND(( (@days_allowed-2)/7 ), 0) * 2;
    SET @actual_days = @days_allowed - @weekend_days;
    SET @wk_allowed = (@actual_days) / 5;
  
  IF @wk_allowed > 40
  BEGIN
  	SET @wk_allowed = 40;
  END
  
  RETURN @wk_allowed;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_study_area_fct (@study_area_id_p INT)
RETURNS VARCHAR(255) 
AS
BEGIN
    DECLARE @description VARCHAR(255);
    
    SELECT @description = description
    FROM sfa.study_area
    WHERE id = @study_area_id_p;
    
    RETURN @description;
END
GO


CREATE OR ALTER PROCEDURE sfa.sp_get_and_update_csl_cert_seq_num_prev 
(
	@FROM_DATE_P DATE,
	@TO_DATE_P DATE,
	@CSL_CERT_SEQ_NUM INT
)
AS
BEGIN
	UPDATE sfa.disbursement SET csl_cert_seq_number_prev = @CSL_CERT_SEQ_NUM WHERE id IN 
	(
		SELECT d.id
		FROM sfa.funding_request AS fr
		INNER JOIN sfa.disbursement AS d ON fr.id = d.funding_request_id
		INNER JOIN sfa.request_type AS rt ON fr.request_type_id = rt.id
		INNER JOIN (
		  SELECT m.msfaa_status, app.academic_year_id, app.id
		  FROM sfa.msfaa AS m
		  INNER JOIN sfa.application AS app ON app.id = m.application_id
		  WHERE app.id = m.application_id
		) AS mhd ON fr.application_id = mhd.id
		WHERE (mhd.msfaa_status = 'Received' OR mhd.academic_year_id <= 2012)
		AND issue_date >= @FROM_DATE_P			
		AND issue_date <= @TO_DATE_P		
		AND d.due_date IS NOT NULL
		AND d.transaction_number IS NOT NULL
		AND d.csl_cert_seq_number IS NULL
		AND disbursement_type_id IN (3, 4, 5, 7, 9)
		AND fr.request_type_id IN (4, 5, 6, 15, 16, 17, 18, 19, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 35, 47)
		AND d.transaction_number IN (
		  SELECT d1.transaction_number
		  FROM sfa.disbursement AS d1
		  INNER JOIN sfa.funding_request AS fr1 ON d1.funding_request_id = fr1.id
		  WHERE fr1.request_type_id IN (4, 5))
	)
END
GO

CREATE OR ALTER PROCEDURE sfa.sp_get_and_update_csl_cert_seq_num
(
	@FROM_DATE_P DATE,
	@TO_DATE_P DATE,
	@CSL_CERT_SEQ_NUM INT
)
AS
BEGIN
	UPDATE sfa.disbursement SET csl_cert_seq_number = @CSL_CERT_SEQ_NUM WHERE id IN 
	(
		SELECT d.id
		FROM sfa.funding_request AS fr
		INNER JOIN sfa.disbursement AS d ON fr.id = d.funding_request_id
		INNER JOIN sfa.request_type AS rt ON fr.request_type_id = rt.id
		INNER JOIN (
		  SELECT m.msfaa_status, app.academic_year_id, app.id
		  FROM sfa.msfaa AS m
		  INNER JOIN sfa.application AS app ON app.id = m.application_id
		  WHERE app.id = m.application_id
		) AS mhd ON fr.application_id = mhd.id
		WHERE (mhd.msfaa_status = 'Received' OR mhd.academic_year_id <= 2012)
		AND issue_date >= @FROM_DATE_P			
		AND issue_date <= @TO_DATE_P		
		AND d.due_date IS NOT NULL
		AND d.transaction_number IS NOT NULL
		AND d.csl_cert_seq_number IS NULL
		AND disbursement_type_id IN (3, 4, 5, 7, 9)
		AND fr.request_type_id IN (4, 5, 6, 15, 16, 17, 18, 19, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 35, 47)
		AND d.transaction_number IN (
		  SELECT d1.transaction_number
		  FROM sfa.disbursement AS d1
		  INNER JOIN sfa.funding_request AS fr1 ON d1.funding_request_id = fr1.id
		  WHERE fr1.request_type_id IN (4, 5))
	)
END
END;