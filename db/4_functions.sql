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
    
    SET @net_amt = @assessed_amount - @previous_disbursement - @over_award ;

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
    over_award_applied_flg VARCHAR(3)
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
    over_award_applied_flg
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
    'No' -- over_award_applied_flg VARCHAR(3)
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
    @assessment_id INT
AS 
BEGIN
    DECLARE @funding_request_id INT;
    DECLARE @academic_year INT;


    SELECT @academic_year = app.academic_year_id FROM sfa.application app
    WHERE app.id = @application_id; --@application_id

    DECLARE @air_travel_disbursement_period INT;
    DECLARE @travel_allowance NUMERIC;
    DECLARE @airfare_amount NUMERIC;
    DECLARE @disbursements_required INT;
    DECLARE @over_award_disbursement_period INT;
    DECLARE @over_award FLOAT;
    DECLARE @over_award_applied_flg VARCHAR(3);
    DECLARE @years_funded_equivalent NUMERIC;
    DECLARE @allowed_tuition NUMERIC;
    DECLARE @living_costs NUMERIC;
    DECLARE @allowed_books FLOAT;
    DECLARE @weekly_amount NUMERIC;
    DECLARE @assessment_adj_amount FLOAT;

    SELECT
    @air_travel_disbursement_period = a.air_travel_disbursement_period,
    @travel_allowance = COALESCE(a.travel_allowance, 0),
    @airfare_amount = COALESCE(a.airfare_amount, 0),
    @disbursements_required = a.disbursements_required,
    @over_award_disbursement_period = a.over_award_disbursement_period,
    @over_award = a.over_award,
    @over_award_applied_flg = a.over_award_applied_flg,
    @years_funded_equivalent = a.years_funded_equivalent,
    @funding_request_id = a.funding_request_id,
    @allowed_tuition = COALESCE(a.allowed_tuition, 0),
    @living_costs = COALESCE(a.living_costs, 0),
    @allowed_books = COALESCE(a.allowed_books, 0),
    @weekly_amount = COALESCE(a.weekly_amount, 0),
    @assessment_adj_amount = a.assessment_adj_amount
    FROM sfa.assessment a WHERE a.id = @assessment_id; -- @assessment_id

    -- CHECK ALL
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
                            SET disbursed_amount = COALESCE(sfa.fn_net_amount(@funding_request_id, @assessment_id), 0);
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
            ELSE IF COALESCE(sfa.fn_net_amount(@funding_request_id, @assessment_id), 0) >= 0
                BEGIN
                    BEGIN TRY
                        BEGIN TRANSACTION
                            DECLARE @v_amount_remaining NUMERIC;
                            
                            DECLARE @count INT = 1;

                            SELECT @v_amount_remaining = sfa.fn_net_amount(@funding_request_id, @assessment_id);  -- accumulated amount for new leg calculations
                    
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
                            SET disbursed_amount = COALESCE(sfa.fn_net_amount(@funding_request_id, @assessment_id), 0),
                            paid_amount = COALESCE(sfa.fn_net_amount(@funding_request_id, @assessment_id), 0)
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
RETURNS @data TABLE (
	id INT,
	assessed_amount FLOAT(8), 
	assessment_type_id INT,
	effective_rate_date DATE, 
	classes_end_date DATE, 
	home_city_id INT, 
	destination_city_id INT,
	dependent_count INT, 
	weeks_allowed BIT, 
	second_residence_rate FLOAT(8), 
	weekly_amount FLOAT(8),
	travel_allowance FLOAT(8),  
	entitlement_days INT
)
AS 
BEGIN
	DECLARE @assess_id INT;

	SELECT @assess_id = MAX(a.id)
	FROM sfa.assessment a
	WHERE a.funding_request_id = @funding_request_id;

	INSERT INTO @data
	SELECT
		id,
		assessed_amount, 
		assessment_type_id,
		effective_rate_date, 
		classes_end_date, 
		home_city_id, 
		destination_city_id,
		dependent_count, 
		weeks_allowed, 
		second_residence_rate, 
		weekly_amount,
		travel_allowance,  
		entitlement_days
	FROM sfa.assessment a 
	WHERE a.id = @assess_id;

	RETURN;
END;
GO

CREATE OR ALTER PROCEDURE sfa.sp_get_assess_info_cslft(@funding_request_id INT)
AS
	DECLARE @assess_count INT;
	DECLARE @assessment_id INT;

	SET @assess_count = sfa.fn_get_assessment_count(@funding_request_id);

	--Create temp table from assessment.
	DROP TABLE IF EXISTS #t_assessment;
	CREATE TABLE #t_assessment (
		id int,
		allowed_books float,
		allowed_months float,
		allowed_percent numeric(5,2),
		allowed_tuition numeric(10,2),
		assessed_amount numeric(10,2),
		assessed_date VARCHAR(10),
		change_reason_comment text,
		dependent_count float,
		effective_rate_date VARCHAR(10),
		home_city_id int,
		living_costs numeric(10,2),
		travel_allowance numeric(10,2),
		weekly_amount numeric(10,2),
		assessment_type_id int,
		destination_city_id int,
		funding_request_id int,
		disbursements_required int,
		weeks_allowed float,
		second_residence_rate float,
		classes_end_date VARCHAR(10),
		prestudy_accom_code int,
		prestudy_province_id int,
		classes_start_date VARCHAR(10),
		airfare_amount numeric(10,2),
		air_travel_disbursement_period int,
		shelter_month float,
		p_trans_month float,
		r_trans_16wk float,
		day_care_allowable float,
		depend_food_allowable float,
		depend_tran_allowable float,
		pstudy_shelter_month float,
		pstudy_p_trans_month float,
		pstudy_day_care_allow float,
		pstudy_depend_food_allow float,
		pstudy_depend_tran_allow float,
		pstudy_start_date VARCHAR(10),
		pstudy_end_date VARCHAR(10),
		csl_assessed_need float,
		study_province_id int,
		csl_over_reason_id int,
		csl_non_reason_id int,
		over_award float,
		student_tax_rate float,
		spouse_tax_rate float,
		spouse_pstudy_tax_rate float,
		stud_pstudy_tax_rate float,
		parent1_income float,
		parent2_income float,
		parent1_tax_paid float,
		parent2_tax_paid float,
		books_supplies_cost float,
		tuition_estimate float,
		uncapped_costs_total float,
		uncapped_pstudy_total float,
		day_care_actual float,
		stud_pstudy_gross float,
		spouse_pstudy_gross float,
		pstudy_day_care_actual float,
		student_gross_income float,
		spouse_gross_income float,
		prestudy_csl_classification int,
		marital_status_id int,
		spouse_province_id int,
		study_accom_code float,
		csl_classification int,
		family_size float,
		parent_ps_depend_count float,
		parent_province varchar(100),
		discretionary_cost float,
		discretionary_cost_actual float,
		study_distance float,
		prestudy_distance float,
		prestudy_bus_flag float,
		study_bus_flag float,
		study_living_w_spouse_flag float,
		prestudy_living_w_spouse_flag float,
		csl_full_amt_flag float,
		study_area_id int,
		program_id int,
		period varchar(3),
		csl_request_amount float,
		return_uncashable_cert float,
		years_funded_equivalent numeric(5,2),
		study_weeks float,
		study_months float,
		pstudy_expected_contrib float,
		spouse_expected_income float,
		asset_tax_rate float,
		x_trans_total float,
		relocation_total float,
		pstudy_x_trans_total float,
		married_pstudy numeric(10,2),
		married_study numeric(10,2),
		married_assets numeric(10,2),
		entitlement_days float,
		parent_contribution_override numeric(10,2),
		total_grant_awarded numeric(10,2),
		over_award_disbursement_period int,
		over_award_applied_flg varchar(3),
		pre_leg_amount float,
		assessment_adj_amount float,
		student_ln150_income float,
		student_contribution float,
		student_contrib_exempt varchar(3),
		spouse_contrib_exempt varchar(3),
		spouse_contribution float,
		spouse_ln150_income float,
		student_contribution_review varchar(3),
		spouse_contribution_review varchar(3),
		parent_contribution_review varchar(3),
		student_family_size float,
		student_expected_contribution float,
		student_previous_contribution float,
		spouse_expected_contribution float,
		spouse_previous_contribution float,
		student_contribution_override float,
		spouse_contribution_override float,
		new_calc BIT
	);
		
	IF @assess_count > 0
	BEGIN
		SELECT 
			@assessment_id = id
		FROM sfa.fn_get_assessment_info_prc(@funding_request_id);
			
		INSERT INTO #t_assessment (
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
		)
		SELECT
			air_travel_disbursement_period,
			airfare_amount,
			allowed_books,
			allowed_months,
			allowed_percent,
			allowed_tuition,
			assessed_amount,
			CONVERT(VARCHAR, assessed_date, 23),
			assessment_adj_amount,
			assessment_type_id,
			asset_tax_rate,
			books_supplies_cost,
			change_reason_comment,
			CONVERT(VARCHAR, classes_end_date, 23),
			CONVERT(VARCHAR, classes_start_date,23),
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
			CONVERT(VARCHAR, effective_rate_date, 23),
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
			CONVERT(VARCHAR, pstudy_end_date, 23),
			pstudy_expected_contrib,
			pstudy_p_trans_month,
			pstudy_shelter_month,
			CONVERT(VARCHAR, pstudy_start_date, 23),
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
	
		SELECT
			*
		FROM #t_assessment;
	END
	ELSE
	BEGIN		
		-- Assessment values
		DECLARE 
			@application_id INT,
			@academic_year INT,
			@classes_end_date DATE,
			@classes_start_date DATE,
			@pstudy_start_date DATE,
			@pstudy_end_date DATE,
			@books_supplies_cost FLOAT(8),
			@csl_classification INT,
			@csl_full_amt_flag FLOAT(8),
			@csl_request_amount FLOAT(8),
			@day_care_actual FLOAT(8),
			@discretionary_cost_actual FLOAT(8),
			@family_size FLOAT(8),
			@marital_status_id INT,
			@parent1_income FLOAT(8),
			@parent1_tax_paid FLOAT(8),
			@parent2_income FLOAT(8),
			@parent2_tax_paid FLOAT(8),
			@parent_province VARCHAR(100),
			@parent_ps_depend_count FLOAT(8),
			@prestudy_accom_code INT,
			@prestudy_bus_flag FLOAT(8),
			@prestudy_csl_classification INT,
			@prestudy_distance FLOAT(8),
			@prestudy_province_id INT,
			@program_id INT,
			@study_accom_code FLOAT(8),
			@study_area_id INT,
			@study_bus_flag FLOAT(8),
			@study_distance FLOAT(8),
			@study_living_w_spouse_flag FLOAT(8),
			@study_province_id INT,
			@total_grant_awarded NUMERIC(9, 2),
			@tuition_estimate FLOAT(8),
			@student_ln150_income FLOAT(8),
			@spouse_ln150_income FLOAT(8),
			@prestudy_end_date DATE
		;
	
		-- Calculated vars
		DECLARE
			@prestudy_prov INT,
			@study_prov INT,
			@spouse_prov INT,
			@study_category_id INT = NULL,
			@prestudy_category_id INT = NULL,
			@spouse_expected_income FLOAT(8) = 0,
			@spouse_province_id INT,
			@study_months INT,
			@period VARCHAR(5),
			@shelter_month INT,
			@discretionary_cost FLOAT(8),
			@dependent_count INT,
			@depend_food_allowable FLOAT(8),
			@day_care_allowable FLOAT(8),
			@depend_tran_allowable FLOAT(8),
			@p_trans_month INT,
			@pstudy_day_care_actual FLOAT(8)
		;
				
		SELECT 
			@application_id = a.id,
			@academic_year = a.academic_year_id,
			@classes_end_date = a.classes_end_date,
			@classes_start_date = a.classes_start_date,
			@pstudy_start_date = a.prestudy_start_date,
			@pstudy_end_date = a.prestudy_end_date,
			@prestudy_province_id = a.prestudy_province_id,
			@prestudy_accom_code = a.prestudy_accom_code,
			@marital_status_id = a.marital_status_id,
			@study_area_id = a.study_area_id,
			@program_id = a.program_id,
			@study_province_id = a.study_province_id,
			@study_accom_code = a.study_accom_code,
			@prestudy_csl_classification = a.prestudy_csl_classification,
			@csl_classification = a.csl_classification,
			@tuition_estimate = a.tuition_estimate_amount,
			@books_supplies_cost = (SELECT 
									CASE WHEN cl.books_max_amount > a.books_supplies_cost THEN a.books_supplies_cost ELSE cl.books_max_amount END 
									FROM sfa.csl_lookup cl WHERE cl.academic_year_id = a.academic_year_id),
			@study_distance = a.study_distance,
			@prestudy_distance = a.prestudy_distance,
			@parent1_income = a.parent1_income,
			@parent2_income = a.parent2_income,
			@study_living_w_spouse_flag = a.study_living_w_spouse,
			@parent1_tax_paid = a.parent1_tax_paid,
			@parent2_tax_paid = a.parent2_tax_paid,
			@csl_request_amount = fr.csl_request_amount,
			@csl_full_amt_flag = fr.is_csl_full_amount,
			@discretionary_cost_actual = sfa.fn_get_allowable_expense(2,7,a.id) + sfa.fn_get_allowable_expense(2,11,a.id),
			@day_care_actual = sfa.fn_get_actual_expense(2,3,a.id),
			@study_bus_flag = a.study_bus,
			@prestudy_bus_flag = a.prestudy_bus,
			@family_size = sfa.fn_get_parent_family_size(a.id),
			@parent_ps_depend_count = sfa.fn_get_parent_dependent_count(a.id, 1),
			@parent_province = (SELECT sfa.fn_get_province_desc(province_id) FROM sfa.fn_get_parent_address_by_application(a.id, 2) WHERE parent = 1),
			@total_grant_awarded = sfa.fn_get_total_grant_amount(a.id),
			@student_ln150_income = a.student_ln150_income,
			@spouse_ln150_income = a.spouse_ln150_income
		FROM sfa.application a
			INNER JOIN sfa.funding_request fr
				ON fr.application_id = a.id
		WHERE fr.id = @funding_request_id;
	
		IF @pstudy_start_date IS NULL
		BEGIN
			SET @pstudy_end_date = EOMONTH(@classes_start_date, -1);
			SET @pstudy_start_date = DATEADD(dd, 1, DATEADD(mm, -4, @prestudy_end_date));
		END;			
		
		/* Determine if the study province is in Canada.  If not set the study
		province to the prestudy province. */	
		IF @prestudy_province_id NOT IN (1,2,3,4,5,6,7,8,9,10,11,12,13)
		BEGIN
			SELECT
				@prestudy_prov = p.id
			FROM sfa.province p
			WHERE p.description = 'Yukon';
		END
		ELSE
		BEGIN
			SET @prestudy_prov = @prestudy_province_id
		END;
	
		IF @study_province_id NOT IN (1,2,3,4,5,6,7,8,9,10,11,12,13)
		BEGIN
			SET	@study_prov = @prestudy_prov;
		END
		ELSE
		BEGIN
			SET @study_prov = @study_province_id;
		END;
		
		IF @marital_status_id = 3 OR @marital_status_id = 4
		BEGIN 
			IF @study_living_w_spouse_flag = 1
			BEGIN
				SET @spouse_province_id = @study_province_id;
			
				SET @spouse_prov = CASE
										WHEN @spouse_province_id NOT IN (1,2,3,4,5,6,7,8,9,10,11,12,13) THEN @study_prov
										ELSE @spouse_province_id
								   END;
			END
			ELSE
			BEGIN
				SET @spouse_province_id = @prestudy_province_id;
			
				SET @spouse_prov = CASE 
										WHEN @spouse_province_id NOT IN (1,2,3,4,5,6,7,8,9,10,11,12,13) THEN @prestudy_prov									
										ELSE @spouse_province_id
								   END;
			END;
		END;
				
		SET @period = CASE WHEN @study_months <= 4 THEN 'S' ELSE 'P' END;
	
		/* Cost Tab */
		SET @shelter_month = sfa.fn_get_shelter_food_misc(@academic_year, @study_prov, @study_category_id);
		SET @discretionary_cost = sfa.fn_get_max_discretionary(@academic_year);
	
		IF (
			@study_category_id = sfa.fn_get_student_category_id('SP') OR @study_category_id = sfa.fn_get_student_category_id('M')
		   ) AND @dependent_count > 0
		BEGIN
			SET @depend_food_allowable = sfa.fn_get_shelter_food_misc(@academic_year, @study_prov, sfa.fn_get_student_category_id('DEP')) * @dependent_count;
			SET @day_care_allowable = sfa.fn_get_child_care(@academic_year, @study_prov) * @dependent_count;
		
			IF @study_bus_flag = 1
			BEGIN
				SET @depend_tran_allowable = sfa.fn_get_public_transportation(@academic_year, @study_prov, sfa.fn_get_student_category_id('DEP')) * @dependent_count;			
				SET @p_trans_month = sfa.fn_get_public_transportation(@academic_year, @study_prov, @study_category_id);
			END;
		END;
	
		DECLARE
			@stud_pstudy_gross FLOAT(8),
			@stud_pstudy_tax_rate FLOAT(8),
			@pstudy_months INT,
			@spouse_pstudy_tax_rate FLOAT(8),
			@pstudy_depend_food_allow FLOAT(8),
			@pstudy_day_care_allow FLOAT(8),
			@pstudy_depend_tran_allow FLOAT(8),
			@pstudy_p_trans_month INT,
			@pstudy_shelter_month INT,
			@student_gross_income FLOAT(8),
			@student_tax_rate FLOAT(8),
			@spouse_gross_income FLOAT(8),
			@spouse_tax_rate FLOAT(8),
			@spouse_study_school_to DATE,
			@spouse_study_school_from DATE,
			@student_indigenous_learner VARCHAR(10),
			@student_crown_ward_flg VARCHAR(10),
			@perm_disabled_flag BIT,
			@student_contrib_exempt VARCHAR(10),
			@spouse_contrib_exempt VARCHAR(10),
			@asset_tax_rate FLOAT(8),
			@calculated_award FLOAT(8),
			@recovered_overaward FLOAT(8),
			@assessment_amount FLOAT(8),
			@net_amount FLOAT(8),
			@previous_disbursement FLOAT(8),
			@return_uncashable_cert FLOAT(8)
		;
	
		IF @academic_year < 2017
		BEGIN
			SET @pstudy_day_care_actual = sfa.fn_get_actual_expense(1,3,@application_id);
			
			/* PreStudy Tab */
			-- added divide gross by pstudy months as rate is based on monthly amount, not yearly SFA 481 2014-06-06 Lidwien
			DECLARE @pstudy_student_monthly_amt FLOAT(8) = 0;
			IF @stud_pstudy_gross <> 0
			BEGIN
			      SET @pstudy_student_monthly_amt = @stud_pstudy_gross / @pstudy_months;
			END;
			
			SET @stud_pstudy_tax_rate = sfa.fn_get_prestudy_tax_rate(@academic_year, @pstudy_student_monthly_amt); 
			      
			IF @prestudy_category_id = sfa.fn_get_student_category_id('SP') OR @prestudy_category_id = sfa.fn_get_student_category_id('M')
			BEGIN
				-- added divide gross by pstudy months as rate is based on monthly amount, not yearly SFA 481 2014-06-06 Lidwien
				DECLARE @pstudy_spouse_monthly_amt FLOAT(8) = 0;
				IF @stud_pstudy_gross <> 0
				BEGIN
			    	SET @pstudy_spouse_monthly_amt = @stud_pstudy_gross / @pstudy_months;
			  	END;
			
			  	SET @spouse_pstudy_tax_rate = sfa.fn_get_spouse_tax_rate(@academic_year, @prestudy_prov, @pstudy_spouse_monthly_amt); -- added divide by pstudy months as rate is based on monthly
			   	IF @dependent_count > 0
			   	BEGIN
				   	SET @pstudy_depend_food_allow = sfa.fn_get_shelter_food_misc(@academic_year, @prestudy_prov, sfa.fn_get_student_category_id('DEP')) * @dependent_count;
				   	SET @pstudy_day_care_allow = sfa.fn_get_child_care(@academic_year, @prestudy_prov) * @dependent_count;
				   	IF @prestudy_bus_flag > 1
				   	BEGIN
					   	SET @pstudy_depend_tran_allow = sfa.fn_get_public_transportation(@academic_year, @prestudy_prov, sfa.fn_get_student_category_id('DEP')) * @dependent_count;
					END;
			   	END;
			END;
		
			IF @prestudy_bus_flag > 1
		   	BEGIN
			   	SET @pstudy_p_trans_month = sfa.fn_get_public_transportation(@academic_year, @prestudy_prov, @prestudy_category_id);
			END;
		
			SET @pstudy_shelter_month = sfa.fn_get_shelter_food_misc(@academic_year, @prestudy_prov, @prestudy_category_id);
		
		
			/* Study Tab */
			DECLARE @study_student_monthly_amt FLOAT(8) = 0;
			IF @student_gross_income <> 0
			BEGIN
               	SET @study_student_monthly_amt = @student_gross_income/ @study_months;
			END;
    
			SET @student_tax_rate = sfa.fn_get_study_tax_rate(@academic_year, @study_student_monthly_amt); 
                 
			IF @study_category_id = sfa.fn_get_student_category_id('SP') OR @study_category_id = sfa.fn_get_student_category_id('M')
			BEGIN
				-- added divide gross by pstudy months as rate is based on monthly amount, not yearly SFA 481 2014-06-06 Lidwien
				DECLARE @study_spouse_monthly_amt FLOAT(8) = 0;
				IF @spouse_gross_income <> 0
				BEGIN
					SET @study_spouse_monthly_amt = @spouse_gross_income/ @study_months;
				END;
			
				SET @spouse_tax_rate = sfa.fn_get_spouse_tax_rate(@academic_year, @spouse_prov, @study_spouse_monthly_amt); -- added divide by study months as rate is based on monthly
 
				-- Added condition for Spouse start and end post secondary dates. If they exist, there is no expected income for spouse				
				IF @spouse_study_school_to IS NULL AND @spouse_study_school_from IS NULL
				BEGIN		
					SET @spouse_expected_income = sfa.fn_get_student_contribution(@academic_year, @spouse_prov, @study_category_id, 2) * @study_months;
	     		END;  
			END;		
		END
		ELSE
		BEGIN
			DECLARE @student_cppd_count INT = 0;
			SELECT 
				@student_cppd_count = COUNT(i.id)	      	
	      	FROM sfa.income i
     		WHERE i.application_id = @application_id
	       	AND i.income_type_id = 3; 
	         
	        IF @student_indigenous_learner = 'Yes' OR @student_crown_ward_flg = 'Yes' OR @perm_disabled_flag = 1 OR COALESCE(@dependent_count, 0) > 0 OR COALESCE(@student_cppd_count,0) > 0
	        BEGIN
				SET @student_contrib_exempt = 'Yes';
	        END;
	       
	       	DECLARE @spouse_exempt_count INT = 0;
			SELECT 
				@spouse_exempt_count = COUNT(i.id)	      	
	      	FROM sfa.income i
     		WHERE i.application_id = @application_id
			AND i.income_type_id IN (2,3,21);  
               
 			IF @spouse_exempt_count > 0 OR COALESCE(@spouse_study_school_from, CONVERT(DATETIME, '19000101',112)) <> CONVERT(DATETIME, '19000101',112)
 			BEGIN
				SET @spouse_contrib_exempt = 'Yes';
			END;   			  
		END;
	
		SET @asset_tax_rate = 0;
	
		/* Get Award */
		DECLARE @valMin FLOAT(8) = @calculated_award - COALESCE(@recovered_overaward, 0);
		IF @csl_full_amt_flag = 0
		BEGIN
			SELECT
			@valMin = (
				SELECT MIN(MyValue) - COALESCE(@recovered_overaward, 0)
				FROM (VALUES (@calculated_award), (@csl_request_amount)) AS AllValues(MyValue)
			);
		END;
	
		SELECT
		@assessment_amount = CASE WHEN @valMin > 0 THEN @valMin ELSE 0 END;
	
		/* Get Net */
		SET @net_amount = @assessment_amount - @previous_disbursement + @return_uncashable_cert;
	
		IF @net_amount BETWEEN -250 AND 0
		BEGIN
			SET @net_amount = 0;
		END;
		
		-- Get New Info
		INSERT INTO #t_assessment (
			id, 
			assessment_type_id, 
			new_calc,
			student_contrib_exempt,
			spouse_contrib_exempt,
			dependent_count,
			classes_end_date,
			classes_start_date,
			study_weeks,
			study_months,
			pstudy_start_date,
			pstudy_end_date,
			prestudy_province_id,
			prestudy_accom_code,
			marital_status_id,
			study_area_id,
			program_id,
			study_province_id,
			study_accom_code,
			prestudy_csl_classification,
			csl_classification,
			tuition_estimate,
			books_supplies_cost,
			study_distance,
			prestudy_distance,
			parent1_income,
			parent2_income,
			study_living_w_spouse_flag,
			parent1_tax_paid,
			parent2_tax_paid,
			csl_request_amount,
			csl_full_amt_flag,
			discretionary_cost_actual,
			day_care_actual,
			study_bus_flag,
			prestudy_bus_flag,
			family_size,
			parent_ps_depend_count,
			parent_province,
			total_grant_awarded
		)
		VALUES (
			0, 
			1, 
			1,
			'NO',
			'NO',
			sfa.fn_get_dependent_count(@application_id),
			CONVERT(VARCHAR, @classes_end_date, 23),
			CONVERT(VARCHAR, @classes_start_date, 23),
			DATEDIFF(ww, @classes_start_date, @classes_end_date),
			DATEDIFF(mm, @classes_start_date, @classes_end_date),
			CONVERT(VARCHAR, @pstudy_start_date, 23),
			CONVERT(VARCHAR, @pstudy_end_date, 23),
			@prestudy_province_id,
			@prestudy_accom_code,
			@marital_status_id,
			@study_area_id,
			@program_id,
			@study_province_id,
			@study_accom_code,
			@prestudy_csl_classification,
			@csl_classification,
			@tuition_estimate,
			@books_supplies_cost,
			@study_distance,
			@prestudy_distance,
			@parent1_income,
			@parent2_income,
			@study_living_w_spouse_flag,
			@parent1_tax_paid,
			@parent2_tax_paid,
			@csl_request_amount,
			@csl_full_amt_flag,
			@discretionary_cost_actual,
			@day_care_actual,
			@study_bus_flag,
			@prestudy_bus_flag,
			@family_size,
			@parent_ps_depend_count,
			@parent_province,
			@total_grant_awarded
		);			
	END
			
	SELECT *
	FROM #t_assessment;
GO