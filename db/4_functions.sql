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
    DECLARE @v_num_weeks NUMERIC = 0;
	DECLARE @v_program_academic INT = 0;

	SELECT @v_program_academic  = id 
	FROM sfa.program 
	WHERE description = 'Upgrading-Academic'

    SELECT @v_num_weeks = CEILING(SUM(CASE WHEN fr.request_type_id = 1  THEN a.weeks_allowed ELSE  a.years_funded_equivalent*34 END))
    FROM sfa.application app
    INNER JOIN sfa.funding_request fr 
		ON app.id = fr.application_id
	INNER JOIN sfa.assessment a 
		ON a.funding_request_id = fr.id
	INNER JOIN sfa.vm_disbursement_sum d
		ON  d.funding_request_id =  fr.id
    WHERE  app.student_id = @student_id_p
    AND app.id < @application_id_p 
    AND app.program_id not in (@v_program_academic)
    AND app.academic_year_id <= 2015
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
                                        (SELECT id FROM sfa.application as app
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
CREATE OR ALTER FUNCTION sfa.fn_disbursments_required(@application_id_p INT, @assessment_id_p INT, @program_division INT = NULL)
RETURNS NUMERIC AS
BEGIN
    DECLARE @d_required NUMERIC;
    DECLARE @pd_months NUMERIC;
    DECLARE @v_weeks NUMERIC;
    DECLARE @v_num_batched NUMERIC;
    DECLARE @academic_year_id INT;
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

    SELECT @academic_year_id = academic_year_id
    FROM sfa.application 
    WHERE id = @application_id_p;

    IF @program_division IS NULL
    BEGIN
        SELECT @program_division = program_division
        FROM sfa.application 
        WHERE id = @application_id_p;
    END

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

    SELECT  
        @funding_request_id = funding_request_id 
    FROM sfa.assessment a 
    WHERE id = @assessment_id_p;


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
            IF  @program_division = 1   -- Quarters
                BEGIN
                        SELECT @v_weeks = yg_quarter_weeks FROM sfa.system_parameter;
                END
            ELSE IF  @program_division = 2   -- Semesters	
                BEGIN
                        SELECT  @v_weeks =  yg_semester_weeks FROM sfa.system_parameter;
                END

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

    SELECT TOP 1 @res_v = ISNULL(t.travel_allowance_amount, 0)
    FROM sfa.transportation t
    WHERE t.home_city_id = @home_city_id_p
    AND t.institution_city_id = @institution_city_id_p;

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
	
	SELECT @disburse_required = sfa.fn_disbursments_required(@application_id, @assessment_id, NULL); 

	SELECT @disbursed_amt = sfa.fn_get_disbursed_amount_fct(@funding_request_id, @assessment_id);
		
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
    @assessed_amount NUMERIC,
    @program_division INT,
    @net_amount INT
    
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
                                NULL,
                                tax_year,
                                GETDATE(),
                                disbursed_amount, -- assigns disbursement_amount to paid_amount
                                NULL,
                                NULL,
                                NULL,
                                NULL,
                                NULL,
                                NULL,
                                NULL,
                                NULL,
                                NULL,
                                NULL,
                                NULL
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

                                                DECLARE @period_weeks INT;

                                                SELECT @period_weeks = CASE WHEN @program_division = 1 THEN
                                                    (SELECT yg_quarter_weeks FROM sfa.system_parameter)
                                                WHEN @program_division = 2 THEN
                                                    (SELECT yg_semester_weeks FROM sfa.system_parameter )
                                                ELSE
                                                    0 END;

                                                UPDATE @disbursement_temp
                                                SET disbursed_amount = (@weekly_amount * @period_weeks) + (COALESCE(@assessment_adj_amount, 0) / COALESCE(@disbursements_required, 1) )
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

CREATE OR ALTER FUNCTION sfa.get_student_exempt_amt
(
    @academic_year_p INT
)
RETURNS NUMERIC
AS
BEGIN
    DECLARE @v_student_exempt_amt NUMERIC;

    SELECT @v_student_exempt_amt = ISNULL(student_exempt_amount, 0)
    FROM sfa.csl_lookup
    WHERE academic_year_id = @academic_year_p;

    RETURN @v_student_exempt_amt;
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
CREATE OR ALTER FUNCTION [sfa].[fn_get_parent_family_size](@application_id INT)
RETURNS INT
AS 
BEGIN
	DECLARE @count INT = 0;
	DECLARE @p_count INT = 0;
    DECLARE @total INT = 0;
	
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
    
    SET @total = @count + @p_count;

    IF @total > 10
    BEGIN
        RETURN 10;
    END;

	RETURN @total;
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
		parent_province_id,
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

CREATE OR ALTER FUNCTION sfa.fn_get_student_exempt_amount(@academic_year_id INT)
RETURNS FLOAT(8)
AS 
BEGIN
	DECLARE  @amt FLOAT(8);

    SELECT @amt = COALESCE(cl.student_exempt_amount, 0)
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
		m.*,
		p.email
	FROM sfa.msfaa m 
    INNER JOIN sfa.student s ON  m.student_id = s.id
    INNER JOIN sfa.person p ON p.id = s.person_id
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

-- FILE : ASSESSMENT_SFA  --- FUNCTION: SFAADMIN.STA_LOOKUP_PCK$GET_RESIDENCE_RATE_FCT$IMPL  
CREATE OR ALTER PROCEDURE sfa.pr_get_residence_rate_sta
   @academic_year_id INT,
   @return_value_argument FLOAT(8)  OUTPUT
AS
   BEGIN
         DECLARE
            @res_v_second_residence INT
         DECLARE
             sec_residence_cur CURSOR LOCAL FOR
               SELECT sl.second_residence_amount
               FROM sfa.sta_lookup sl
               WHERE sl.academic_year_id = @academic_year_id
         OPEN sec_residence_cur
         FETCH sec_residence_cur
             INTO @res_v_second_residence
         CLOSE sec_residence_cur
         DEALLOCATE sec_residence_cur
         SET @return_value_argument = @res_v_second_residence
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
	--EXEC @second_res_amt = sfa.pr_get_residence_rate_sta @academic_year_id, @return_value_argument OUT;
    SELECT  @second_res_amt =  sl.second_residence_amount
    FROM sfa.sta_lookup sl
    WHERE sl.academic_year_id = @academic_year_id

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

CREATE OR ALTER FUNCTION sfa.fn_get_prev_weeks_curr_year_sta (@program_p NVARCHAR(255), @application_id_p INT)
RETURNS INT
AS
BEGIN
    DECLARE @v_post_leg_weeks DECIMAL(10, 2);

    IF @program_p = 'Upgrade'
    BEGIN
        SELECT @v_post_leg_weeks = sfa.fn_get_curr_yr_sta_up_weeks(@application_id_p);
    END
    ELSE
        BEGIN
            SELECT @v_post_leg_weeks = sfa.fn_get_curr_yr_weeks_sta(@application_id_p);
        END
    RETURN @v_post_leg_weeks;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_curr_yr_sta_up_weeks(@application_id INT)
RETURNS INT
AS
BEGIN
    DECLARE 
		@application_student_id INT,
		@application_academic_yr INT,
		@v_num_weeks INT;

    SELECT  @application_student_id = a.student_id,
            @application_academic_yr = a.academic_year_id 
    FROM sfa.application a 
    WHERE a.id = @application_id;


    SELECT @v_num_weeks = ISNULL(sum(a.weeks_allowed), 0)
    FROM sfa.application app
    INNER JOIN sfa.funding_request fr
        ON app.id = fr.application_id
    INNER JOIN (SELECT funding_request_id
                    , assessment_id
                    , sum(disbursed_amount) disbursed_amount
                FROM sfa.disbursement
            GROUP BY funding_request_id, assessment_id) d
        ON fr.id = d.funding_request_id
    INNER JOIN sfa.assessment a
        ON d.assessment_id = a.id
    WHERE app.student_id = @application_student_id
    AND app.id <  @application_id
    AND app.academic_year_id =  @application_academic_yr
    AND app.program_id = (SELECT id FROM sfa.program WHERE description = 'Upgrading-Academic')  -- upgrading program
    AND d.disbursed_amount > 0 -- positive disbursement
    AND fr.request_type_id = 1 -- request type STA
    group by app.student_id;

     RETURN @v_num_weeks;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_curr_yr_weeks_sta(@application_id INT)
RETURNS INT
AS 
BEGIN
	DECLARE 
		@application_student_id INT,
		@application_academic_yr INT,
		@v_num_weeks INT;
	
	SELECT  @application_student_id = a.student_id,
            @application_academic_yr = a.academic_year_id 
    FROM sfa.application a 
    WHERE a.id = @application_id;
	
	SELECT @v_num_weeks = ISNULL(sum(a.weeks_allowed),0)
    FROM sfa.application app 
	INNER JOIN sfa.funding_request fur ON fur.application_id = app.id
    INNER JOIN (SELECT 
					funding_request_id,
			     	assessment_id,
			        ISNULL(sum(disbursed_amount),0) AS dis_am
				FROM sfa.disbursement
				GROUP BY funding_request_id, assessment_id) AS d ON fur.id = d.funding_request_id
	INNER JOIN sfa.assessment a ON d.assessment_id = a.id
    WHERE app.student_id = @application_student_id
    AND app.id < @application_id
    AND app.academic_year_id = @application_academic_yr
    AND app.program_id <> (SELECT p.id FROM sfa.program p WHERE p.description = 'Upgrading-Academic')
    AND d.dis_am > 0 -- positive disbursement
    group by app.student_id;

    RETURN @v_num_weeks;
END;
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
    /*
        This function calculates the weeks allowed based on the difference
        between the effective rate date and classes end date.  Weeks allowed
        cannot be greater than 40
        
        Old calculation did not always work correctly of the starting date and ending date were not on the same day of the week.
        
        Changed calculation to calculate weekdays based on day not being Sat or Sun
    */
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
     -- Ensure allowed weeks do not go over yearly max
    IF @v_weeks > 40
    BEGIN
        SET @v_weeks = 40;
    END

    RETURN @v_weeks;
END
GO

-- FILE : ASSESSMENT_STA  --- FUNCTION: SFAADMIN.STA_LOOKUP_PCK$GET_WEEKLY_RATE_FCT$IMPL  
CREATE OR ALTER FUNCTION sfa.fn_get_weekly_rate_sta
   (@dependent_count_p INT, @academic_year_id_p INT)
RETURNS INT
AS 
BEGIN
   DECLARE @return_value_argument INT;

   SELECT TOP 1 @return_value_argument = CASE @dependent_count_p
                                       WHEN 0 THEN st.dependent_0_amount
                                       WHEN 1 THEN st.dependent_1_amount
                                       WHEN 2 THEN st.dependent_2_amount
                                       WHEN 3 THEN st.dependent_3_amount
                                       ELSE st.dependent_4_amount
                                    END
   FROM sfa.sta_lookup st
   WHERE st.academic_year_id = @academic_year_id_p;

   RETURN @return_value_argument;
END;
GO

-- FILE : ASSESSMENT_SFA  --- PROCEDURE: SFAADMIN.DEPENDENT_PCK$GET_DEPENDENT_COUNT_FCT$IMPL
CREATE OR ALTER FUNCTION sfa.fn_get_dependent_count_sta
   (@application_id INT)
RETURNS INT
AS 
BEGIN
   DECLARE @return_value_argument INT;

   SELECT TOP 1 @return_value_argument = COUNT(*)
   FROM sfa.dependent AS d
   INNER JOIN sfa.application AS h ON h.student_id = d.student_id
   INNER JOIN sfa.dependent_eligibility AS de ON de.dependent_id = d.id
   WHERE 
      de.application_id = h.id AND 
      de.is_csl_eligible = 1 AND 
      h.id = @application_id;

   RETURN @return_value_argument;
END;
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
	WHERE app.id = @application_id;

	SELECT @dependent_count = sfa.fn_get_dependent_count_sta(@application_id);
	SELECT @wk_amt = sfa.fn_get_weekly_rate_sta(@dependent_count, @academic_year_id);
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
  FROM sfa.institution_campus
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
		AND d.csl_cert_seq_number = @CSL_CERT_SEQ_P
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
				
			SET @out_record3 = 'T' + RIGHT('000000' + CAST(ISNULL(@v_count, 0) AS VARCHAR), 6)
                + RIGHT('000000000' + CAST(ABS(ISNULL(@v_all_disburse, 0)) AS VARCHAR), 9)
                + RIGHT('000000000' + CAST(ABS(ISNULL(@v_cancel_disburse, 0)) AS VARCHAR), 9)
                + REPLICATE(' ', 587);				
		CLOSE cur_cslft;		
		DEALLOCATE cur_cslft;	
	
		SET @out_record4 = @out_record + @out_record2;
		RETURN @v_file_name + @out_record + ISNULL(@out_record2, '') + ISNULL(@out_record3, '');	
				
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
        @max = MAX(CONVERT(INT, d.transaction_number))
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
	@assessment_effective_rate_date DATE,
    @disbursement_issue_date DATE,
	@assessment_weeks_allowed FLOAT
)
RETURNS INT
AS
BEGIN
	DECLARE @federal_institution_code VARCHAR(100);
	DECLARE @disb_allowed INT = 1;
    DECLARE @weeks_before_issue INT;
	DECLARE @weeks_after_issue FLOAT;

	SELECT @federal_institution_code = sfa.fn_get_short_name_sta(@application_institution_campus_id);

	IF  @federal_institution_code = 'LPAH'
	BEGIN
		SELECT @weeks_before_issue = CEILING(DATEDIFF(week,ISNULL(@disbursement_issue_date,GETDATE()),@assessment_effective_rate_date));
		SELECT @weeks_after_issue = FLOOR(@assessment_weeks_allowed - @weeks_before_issue);
		SELECT @disb_allowed = CEILING(@weeks_after_issue/2)+1;
		
        IF @disb_allowed < 1
            BEGIN
                SET @disb_allowed = 1;
            END
	END

RETURN @disb_allowed;
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

    SELECT @federal_institution_code = ic.federal_institution_code 
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

-- Get Csg Lookup By Year
CREATE OR ALTER FUNCTION sfa.fn_get_csg_lookup_by_year(@academic_year_id INT)
RETURNS TABLE
AS
RETURN
SELECT TOP 1
	*
FROM sfa.csg_lookup cl
WHERE cl.academic_year_id = @academic_year_id;
GO

-- Get Max Assessment By Funding Request Id
CREATE OR ALTER PROCEDURE sfa.sp_get_max_assessment_by_funding_request(@funding_request_id INT)
AS
BEGIN
	
	DECLARE @assessment_id INT;

	SELECT
		@assessment_id = MAX(a.id)
	FROM sfa.assessment a
	WHERE a.funding_request_id = @funding_request_id;
	
	SELECT 
		a.*
	FROM sfa.assessment a 
	WHERE a.id = @assessment_id;
END;
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
GO

-- Get student exempt amount
CREATE OR ALTER FUNCTION sfa.fn_get_student_exempt_amount(@academic_year_id INT)
RETURNS FLOAT(8)
AS 
BEGIN
	DECLARE  @amt FLOAT(8);

    SELECT @amt = COALESCE(cl.student_exempt_amount, 0)
    FROM sfa.csl_lookup cl
    WHERE cl.academic_year_id = @academic_year_id;
    
    RETURN COALESCE(@amt, 0);

END;
GO


CREATE OR ALTER FUNCTION sfa.get_serial_fct(@date_p DATE)
RETURNS INT
AS
BEGIN
    DECLARE @v_fbsn INT;

    SELECT @v_fbsn = ISNULL(MAX(financial_batch_serial_no), 0) + 1
    FROM disbursement
    WHERE financial_batch_run_date = @date_p;

    RETURN @v_fbsn;
END
GO

CREATE OR ALTER FUNCTION sfa.get_fiscal_year_fct(@date_p DATE)
RETURNS INT
AS
BEGIN
    /* Determine the batch year the disbursement is part of */
    DECLARE @fb_year INT = YEAR(@date_p);

    IF @date_p < DATEFROMPARTS(@fb_year, 04, 01) 
        SET @fb_year = @fb_year - 1;

    RETURN @fb_year;
END
GO

CREATE OR ALTER FUNCTION sfa.get_batch_group_id_fct (@funding_request_id_p INT)
RETURNS INT
AS
BEGIN
    DECLARE @federal_institution_code NVARCHAR(30);

    SELECT @federal_institution_code = ic.federal_institution_code
    FROM sfa.funding_request fr
    INNER JOIN sfa.application app ON fr.application_id = app.id
    INNER JOIN sfa.institution_campus ic ON app.institution_campus_id = ic.id
    WHERE fr.id = @funding_request_id_p;

    IF (@federal_institution_code = 'LVAA') -- 'Yukon Col' OR 'Yukon U'
    BEGIN
        RETURN 1;
    END

    RETURN 3;
END
GO

CREATE OR ALTER FUNCTION sfa.get_records_for_cheque_req_dat_file(
    @issue_date_str DATE,
    @serial_no INT
)
RETURNS TABLE
AS
    RETURN
    SELECT
   '1' + ( LEFT(LTRIM(ISNULL(CAST(d.financial_batch_id_year AS NVARCHAR(2)), '00')+  '-' + ISNULL(CAST(d.financial_batch_id AS NVARCHAR(2)), '00') ) + REPLICATE(' ', 12)  , 12)) +
    SPACE(30) + ' ' + '0000000' + '000000000000000' + '0' + FORMAT(CAST(@issue_date_str AS DATE), 'yyyyMMdd') + '0' + '03    ' + 'CAD ' +
    '0000000000000' + '0000000000000' + ' ' + '1' + '  ' + '0000000000000' + '0000000000000' + '  ' + '    ' 
    AS record1,
    '2'+ RIGHT(REPLICATE(' ', 12) + s.vendor_id, 12)  + '03    ' + '000000000' +
		( LEFT(LTRIM(ISNULL(CAST(d.financial_batch_id_year AS NVARCHAR(2)), '00')+  '-' + ISNULL(CAST(d.financial_batch_id AS NVARCHAR(2)), '00') ) + REPLICATE(' ', 12)  , 12))+ 
        LEFT(CASE WHEN app.student_number IS NULL THEN 'Yukon Student'
                    ELSE app.student_number
                END + REPLICATE(' ', 22) ,
            22) +
            'EX'+ 'RE'+ 'CAD '+ '            '+
            '0'+ FORMAT(CAST(@issue_date_str AS DATE), 'yyyyMMdd')+ '0'+ '000000000'+ '        '+ '        '+
            '              '+ '0  '+
			RIGHT(REPLICATE('0', 15)+ replace(CONVERT(VARCHAR, ABS(COALESCE(d.disbursed_amount, 0)), 128), '.', ''), 15) +
            REPLICATE(' ', 30) + '      '+ '0' + COALESCE(FORMAT(d.due_date, 'yyyyMMdd'), '') + '000000000'+
            '000000000000000'+ '0'+ '000000000000000'+ '0'+ '000000000000000'+ '0'+
            '000000000000000'+ '0'+ '000000000000000'+ '000000000000000'+ '0'+
    -- '0000000000000'+' '+ 'TDCAD   '+ ' '+ '   '+ '                '+
        '0000000000000'+' '+ '        '+ ' '+ '   '+ '                '+
            '                '+ '                '
    --         + '1' -- change 0 to 1 for sep payment - Lidwien January 2008, Jira SFA 199
            + '1' -- change 1 to 0 for sep payment - Lidwien 2020-08-25 as per Sharon for SFA EFT		
            + ' '+ ' '+ 
            --decode(institution_pck.get_institution_code_fct(history_detail.institution_id),'BUAA','G','S')+ -- Changed else condition from ' ' to 'S' Lidwien February 2009, Jira SFA 258
    --                 'S'+ -- adjusted special handling code to always be S as per Sheila, 2014-01-29 Lidwien SFA-362
                ' '+ -- adjusted special handling code to always be space as optional, for NEW EFT no longer required, 2020-08-25 Lidwien 
            '0000000000000'+ '0000000000000'+ '0000000000000'+ '0000000000000'
    --         + 'C'  -- change space to C for cheque payment type - Lidwien January 2008, Jira SFA 199
            + ' '  -- change C to space for cheque payment type - for NEW EFT no longer required, 2020-08-25 Lidwien		
            +'000000000'+ '9990206016050                                '+ '      '+
            REPLICATE(' ', 22) + '000000000'+ 'CTL-YUKON   '+ '0'+ FORMAT(CAST(@issue_date_str AS DATE), 'yyyyMMdd') +
            '0'+ FORMAT(CAST(@issue_date_str AS DATE), 'yyyyMMdd')+ '000000000'+ '000000000'+ '  '+ '     '+ '000000000000000'+
            '0'+ '     '+ '000000000000000'+ '0'+ '     '+ '000000000000000'+ '0'+
            '     '+ '000000000000000'+ '0'+ ' '+ '000000000'+ '0'+ FORMAT(CAST(@issue_date_str AS DATE), 'yyyyMMdd')+ '000000000'+
            '000000000000000'+ ' '+ '000000000000000'+ '0'+ '1'+ 'N'+ '2'+ '0'+ FORMAT(CAST(@issue_date_str AS DATE), 'yyyyMMdd')+
            '     '+ '     '+ '     '+ REPLICATE(' ', 25) + '            '+
            '0'+ ' '+ '    '
        as record2, -- Voucher Header (VOH)
    '3'+ REPLICATE(' ', 12 - LEN(s.vendor_id)) + s.vendor_id + '03    '+ '000000000'+
            '00001' +( LEFT(LTRIM(ISNULL(CAST(d.financial_batch_id_year AS NVARCHAR(2)), '00')+  '-' + ISNULL(CAST(d.financial_batch_id AS NVARCHAR(2)), '00') ) + REPLICATE(' ', 12)  , 12))+
            LEFT( 
                CASE WHEN app.student_number IS NULL THEN 'Yukon Student'
                    ELSE app.student_number
                END + REPLICATE(' ', 22) , 
                22)
            + '                              ' +
            RIGHT(REPLICATE('0', 15)+ replace(CONVERT(VARCHAR, ABS(COALESCE(d.disbursed_amount, 0)), 128), '.', ''), 15)  +
            RIGHT(REPLICATE('0', 15)+ replace(CONVERT(VARCHAR, ABS(COALESCE(d.disbursed_amount, 0)), 128), '.', ''), 15)  +
            ' ' + REPLICATE(' ', 20) + '000000000000000' + '    ' + '0' + '000000000000000' + '0' +
            '000000000000000' + '0' + '000000000000000' + '0' + '000000000000000'+ '0' + '000000000000000' +
            '        ' + '      ' + '      ' + '                ' + '                ' + '                ' +
            '              ' + '000' + '00000' + '000000000' + '000000000' + '000000000' + ' ' + '        ' +
            ' ' + '   ' + ' ' + ' ' + ' '+ '     ' + '000000000000000' + '0' + '     ' + '000000000000000' +
            '0' + '     ' + '000000000000000' + '0' + '     ' + '000000000000000' + '0' + '               ' +
            '               ' + ' ' + ' ' + REPLICATE(' ', 22) + ' ' + '000000000000000' + '0' + '    '+REPLICATE(' ',245)
        as record3, --   Voucher Line Record -- (VOL)
    '4'+ REPLICATE(' ', 12 - LEN(s.vendor_id)) + s.vendor_id  + '03    '+ '000000000'
            +'00001' + '00001' 
            +( LEFT(LTRIM(ISNULL(CAST(d.financial_batch_id_year AS NVARCHAR(2)), '00')+  '-' + ISNULL(CAST(d.financial_batch_id AS NVARCHAR(2)), '00') ) + REPLICATE(' ', 12)  , 12))+LEFT( 
                CASE WHEN app.student_number IS NULL THEN 'Yukon Student'
                    ELSE app.student_number
                END + REPLICATE(' ', 22) ,
                22)
            + (LEFT(ISNULL(rt.financial_coding, '') + REPLICATE(' ', 45)  , 45)) +'03    ' +
			RIGHT(REPLICATE('0', 15)+ replace(CONVERT(VARCHAR, ABS(COALESCE(d.disbursed_amount, 0)), 128), '.', ''), 15)
            +'            ' + '            ' + '    ' 
            +  CASE WHEN d.tax_year IS NULL THEN ''
                    ELSE (LEFT(LTRIM(d.tax_year) + REPLICATE(' ', 16)  , 16))
                END
            + '000000000000000' 
            +'     ' + '     ' + '    '+REPLICATE(' ', 573)
        as record4
-- Voucher Distribution (VOD)
FROM sfa.request_type rt
    INNER JOIN sfa.funding_request fr ON rt.id = fr.request_type_id
    INNER JOIN sfa.disbursement d ON fr.id = d.funding_request_id
    INNER JOIN sfa.application app ON app.id = fr.application_id
    INNER JOIN sfa.student s ON s.id = app.student_id
WHERE NOT s.vendor_id IS NULL
    AND d.disbursed_amount > 0
    AND d.disbursement_type_id = 1
    AND NOT d.due_date IS NULL
    AND d.financial_batch_run_date = @issue_date_str
    AND d.financial_batch_serial_no = @serial_no
    AND (
        CASE WHEN rt.batch_group_id = 5 THEN
            CASE 
                WHEN fr.yea_request_type = 1 THEN 3
                WHEN fr.yea_request_type = 2 THEN 4
                ELSE 1
            END
            WHEN rt.batch_group_id = 1 THEN sfa.get_batch_group_id_fct(fr.id)
            ELSE rt.batch_group_id
        END
    ) = 3
-- LOKINGFOR
-- ORDER BY d.financial_batch_id_year, d.financial_batch_id, s.vendor_id;
GO

CREATE OR ALTER FUNCTION sfa.fn_get_csl_cert_seq_num
(
	@FROM_DATE_P DATE,
	@TO_DATE_P DATE
) 
RETURNS INT AS
BEGIN 
	DECLARE @v_cert_count NUMERIC = 0;

	SELECT @v_cert_count = count(d.id)
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
		  
		RETURN @v_cert_count;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_check_valid_date
(
@in_date_p NVARCHAR(100), 
@date_name_p NVARCHAR(100)
)
RETURNS NVARCHAR(100)
AS
BEGIN
	DECLARE @v_check_date DATETIME;
	DECLARE @v_result VARCHAR(50);
	IF REPLACE(@in_date_p, ' ', '') = '' OR @in_date_p = '00000000'
		BEGIN
	        RETURN 'EMPTY';
	    END
    
    ELSE
	    BEGIN	        
			SET @v_check_date = TRY_CONVERT(DATETIME, @in_date_p, 112);
	        IF @v_check_date IS NULL
	        	BEGIN
	        		SET @v_result = 'Invalid ' + @date_name_p + ' date: ' + @in_date_p + '. ';
	        	END
	        ELSE
	        	BEGIN
	        		 SET @v_result = NULL;
	        	END	        		        		        	            	        
	    END;
	    RETURN @v_result;
END
GO


CREATE OR ALTER FUNCTION sfa.fn_get_csl_cert_seq_num
(
	@FROM_DATE_P DATE,
	@TO_DATE_P DATE
) 
RETURNS INT AS
BEGIN 
	DECLARE @v_cert_count NUMERIC = 0;

	SELECT @v_cert_count = count(d.id)
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
		  
		RETURN @v_cert_count;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_check_valid_date
(
@in_date_p NVARCHAR(100), 
@date_name_p NVARCHAR(100)
)
RETURNS NVARCHAR(100)
AS
BEGIN
	DECLARE @v_check_date DATETIME;
	DECLARE @v_result VARCHAR(50);
	IF REPLACE(@in_date_p, ' ', '') = '' OR @in_date_p = '00000000'
		BEGIN
	        RETURN 'EMPTY';
	    END
    
    ELSE
	    BEGIN	        
			SET @v_check_date = TRY_CONVERT(DATETIME, @in_date_p, 112);
	        IF @v_check_date IS NULL
	        	BEGIN
	        		SET @v_result = 'Invalid ' + @date_name_p + ' date: ' + @in_date_p + '. ';
	        	END
	        ELSE
	        	BEGIN
	        		 SET @v_result = NULL;
	        	END	        		        		        	            	        
	    END;
	    RETURN @v_result;
END
GO

CREATE OR ALTER PROCEDURE sfa.sp_insert_msfaa_import
(
	@v_agreement_num NVARCHAR(9), 
	@v_sin NVARCHAR(9), 
	@v_status NVARCHAR(1), 
	@v_borrow_signed NVARCHAR(8), 
	@v_sp_received NVARCHAR(8), 
	@v_new_issue_prov NVARCHAR(2), 
	@v_cancelled NVARCHAR(8), 
	@v_error_msg NVARCHAR(255)			
)
AS
BEGIN 
	INSERT INTO sfa.msfaa_import 
	(
		agreement_number, 
		sin, 
		status_code, 
		borrower_signed_date, 
		sp_received_date, 
		new_issue_prov, 
		cancel_date, 
		error_message
	)
    values 
    	(
    		@v_agreement_num , 
			@v_sin, 
			@v_status, 
			@v_borrow_signed, 
			@v_sp_received, 
			@v_new_issue_prov, 
			@v_cancelled, 
			@v_error_msg			
    	);
END
GO

-- Get Disbursements For Issue Dates
CREATE OR ALTER FUNCTION sfa.fn_get_top_disbursements(@application_id INT)
RETURNS TABLE
AS
RETURN
SELECT TOP 2
	d.*
FROM sfa.disbursement d 
	INNER JOIN sfa.funding_request fr
		ON d.funding_request_id = fr.id
		AND fr.request_type_id IN (4,29,32,35)
WHERE fr.application_id = @application_id
ORDER BY d.due_date DESC;
GO

CREATE OR ALTER FUNCTION sfa.get_family_size(@application_id INT)
RETURNS INT AS
BEGIN
        DECLARE @parent1_id VARCHAR(30);
        DECLARE @parent2_id VARCHAR(30);
        DECLARE @v_count INT = 0;

        SELECT
            @parent1_id = app.parent1_id,
            @parent2_id = app.parent2_id
        FROM sfa.application app
        WHERE app.id = @application_id;

        SELECT @v_count = COUNT(pd.id)
        FROM sfa.parent_dependent pd
        WHERE pd.application_id = @application_id
        AND pd.is_eligible = 1;

        IF @parent1_id IS NOT NULL
        BEGIN
            SET @v_count = @v_count + 1;
        END

        IF @parent2_id IS NOT NULL
        BEGIN
            SET @v_count = @v_count + 1;
        END

        IF @v_count > 10
        BEGIN
            SET @v_count = 10;
        END

    RETURN @v_count;
END
GO

CREATE OR ALTER FUNCTION sfa.get_investment_total
(
    @application_id INT,
    @ownership_id INT,
    @rrsp_flag INT
)
RETURNS NUMERIC
AS
BEGIN
    DECLARE @v_total NUMERIC;

    SELECT @v_total = ISNULL(SUM(market_value), 0)
    FROM sfa.investment
    WHERE
        ownership_id = @ownership_id
        AND is_rrsp = @rrsp_flag
        AND application_id = @application_id;

    RETURN @v_total;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_csl_dep_age_count(@application_id INT, @age_start_p INT, @age_end_p INT, @csl_classification_p INT)
RETURNS INT
AS 
BEGIN
    /* CC - Changed eligibility check and age check - 2009-04-15 */
    /* Lidwien - SFA-265 Adjusted count for newborns on reassessment 2010-06-16*/
      DECLARE @v_dependent_count INT;
      IF @csl_classification_p = 1 
      BEGIN
        SELECT  @v_dependent_count = COUNT(id)
        FROM sfa.parent_dependent
        WHERE application_id = @application_id AND age BETWEEN @age_start_p AND @age_end_p
        AND is_eligible = 1;
      END
      ELSE
      BEGIN
        SELECT  @v_dependent_count = COUNT(*) 
        FROM sfa.dependent d
        INNER JOIN sfa.application app
          ON d.student_id = app.student_id
        INNER JOIN sfa.dependent_eligibility de
          ON d.id = de.dependent_id AND de.application_id = app.id AND de.is_csl_eligible = 1
        WHERE ((d.birth_date < app.classes_start_date 
          AND ABS(FLOOR(DATEDIFF(MONTH, CAST( CAST(app.academic_year_id AS VARCHAR(4)) + '-01-01' AS DATE) , d.birth_date)/12)) BETWEEN  @age_start_p AND @age_end_p)
            OR (d.birth_date > app.classes_start_date and d.birth_date < app.classes_end_date) and @age_start_p = 0)
          AND app.id = @application_id;
      END

      RETURN @v_dependent_count;
END
GO


CREATE OR ALTER FUNCTION sfa.fn_get_csl_dep_age_dis_cnt(@application_id INT, @age_start_p INT, @age_end_p INT, @disabled_p BIT, @csl_classification_p INT)
RETURNS INT
AS 
BEGIN
      DECLARE @v_dependent_count INT;      
      IF @csl_classification_p = 1 
      BEGIN
        SELECT  @v_dependent_count = COUNT(id)
        FROM sfa.parent_dependent
        WHERE application_id = @application_id 
          AND age BETWEEN @age_start_p AND @age_end_p 
          AND is_eligible = 1
          AND is_disabled = @disabled_p;
      END
      ELSE
      BEGIN
        SELECT  @v_dependent_count = COUNT(*)
        FROM sfa.dependent d
        INNER JOIN sfa.application app
          ON  d.student_id = app.student_id
        INNER JOIN sfa.dependent_eligibility de
          ON d.id = de.dependent_id AND de.application_id = app.id
        WHERE d.birth_date < app.classes_start_date
          AND de.is_csl_eligible = 1
          AND d.is_disability = @disabled_p
          AND ABS(FLOOR(DATEDIFF(MONTH, CAST( CAST(app.academic_year_id AS VARCHAR(4)) + '-01-01' AS DATE) , d.birth_date)/12)) BETWEEN  @age_start_p AND @age_end_p
          AND app.id = @application_id;
      END;

  RETURN @v_dependent_count;
    
END
GO

CREATE OR ALTER FUNCTION sfa.get_study_contribution(@assessment_id INT,@academic_year INT, @contrib_by NUMERIC)
RETURNS NUMERIC AS
BEGIN
    DECLARE @v_student_gross NUMERIC;
    DECLARE @v_student_exempt NUMERIC;
    DECLARE @v_student_tax_rate NUMERIC;
    DECLARE @v_student_tax_amount NUMERIC;
    DECLARE @v_student_after_tax NUMERIC;
    DECLARE @v_student_net NUMERIC;
    DECLARE @v_student_contrib NUMERIC;
    DECLARE @v_study_weeks NUMERIC;
    DECLARE @v_spouse_gross NUMERIC;
    DECLARE @v_spouse_tax_rate NUMERIC;
    DECLARE @v_spouse_study_to DATE;
    DECLARE @v_spouse_study_from DATE;
    DECLARE @v_spouse_expected_income NUMERIC;
    DECLARE @v_spouse_tax_amount NUMERIC;
    DECLARE @v_spouse_after_tax NUMERIC;
    DECLARE @v_spouse_exempt NUMERIC;
    DECLARE @v_spouse_net NUMERIC;
    DECLARE @v_spouse_study BIT;
    DECLARE @v_spouse_contrib NUMERIC;
    DECLARE @v_spouse_study_weeks NUMERIC;
    DECLARE @v_married_study NUMERIC;

    SELECT @v_student_gross = a.student_gross_income
        , @v_student_exempt = (sfa.get_student_exempt_amt(@academic_year) *  a.study_weeks)
        , @v_student_tax_rate = a.student_tax_rate
        , @v_spouse_gross = a.SPOUSE_GROSS_INCOME
        , @v_spouse_tax_rate = a.spouse_tax_rate
        , @v_study_weeks = a.study_weeks
        , @v_spouse_study_to = app.spouse_study_school_to
        , @v_spouse_study_from = app.spouse_study_school_from
        , @v_spouse_expected_income = a.spouse_expected_income
        , @v_married_study = a.married_study
    FROM sfa.assessment a
        , sfa.funding_request fr
        , sfa.application app
        , sfa.student s
    WHERE a.funding_request_id = fr.id
    AND fr.application_id = app.id
    AND app.student_id = s.id
    AND a.id = @assessment_id;

    -- Student
    -- Calculate tax amount
    SET @v_student_tax_amount = ROUND(ISNULL(@v_student_gross, 0) * ISNULL(@v_student_tax_rate, 0) / 100, 0);

    -- Calculate after tax
    SET @v_student_after_tax = ROUND(ISNULL(@v_student_gross, 0) - ISNULL(@v_student_tax_amount, 0), 2);

    -- Apply minimum value of 0
    SET @v_student_after_tax = CASE
        WHEN ISNULL(@v_student_after_tax, 0) < 0 THEN 0
        ELSE @v_student_after_tax
    END;

    -- Calculate net income
    SET @v_student_net = ROUND(ISNULL(@v_student_after_tax, 0) - ISNULL(@v_student_exempt, 0), 2);

    SET @v_student_net = CASE
        WHEN ISNULL(@v_student_net, 0) < 0 THEN 0
        ELSE @v_student_net
    END;

    -- Calculate study contribution - changed to be full amount instead of 80% after exemption, lidwien SFA-208
    SET @v_student_contrib = ROUND(@v_student_net, 2);

    -- Spouse
    -- Calculate tax amount
    SET @v_spouse_tax_amount = ROUND(ISNULL(@v_spouse_gross, 0) * ISNULL(@v_spouse_tax_rate, 0) / 100, 2);



    -- Calculate after tax
    SET @v_spouse_after_tax = ROUND(ISNULL(@v_spouse_gross, 0) - ISNULL(@v_spouse_tax_amount, 0), 2);

    -- Apply minimum value of 0
    SET @v_spouse_after_tax = CASE
        WHEN ISNULL(@v_spouse_after_tax, 0) < 0 THEN 0
        ELSE @v_spouse_after_tax
    END;

    -- Calculate spouse exemption
    IF @v_spouse_study_to IS NULL OR @v_spouse_study_from IS NULL
        BEGIN
            SET @v_spouse_exempt = 0;
            SET @v_spouse_study = 0;
        END
    ELSE
        BEGIN
            SET @v_spouse_study_weeks = CAST(((DATEDIFF(DAY, @v_spouse_study_to, @v_spouse_study_from)) + 1) / 7 + 0.9999 AS INT);

            IF @v_study_weeks < @v_spouse_study_weeks
                SET @v_spouse_exempt = (sfa.get_student_exempt_amt(@academic_year) * @v_study_weeks);
            ELSE
                SET @v_spouse_exempt = (sfa.get_student_exempt_amt(@academic_year) * @v_spouse_study_weeks);


            SET @v_spouse_study = 1;
        END

    -- Calculate net income
    SET @v_spouse_net = ROUND(ISNULL(@v_spouse_after_tax, 0) - ISNULL(@v_spouse_exempt, 0), 2);

    -- Apply minimum value of 0
    SET @v_spouse_net = CASE
        WHEN ISNULL(@v_spouse_net, 0) < 0 THEN 0
        ELSE @v_spouse_net
    END;


    -- Calculate study contribution
    -- change 80 percent to 70 percent as per Ottawa, lidwien SFA-208

    IF @v_spouse_study = 1 -- if spouse is a student then divide contributions by 2
        BEGIN
            SET @v_spouse_contrib = ROUND(@v_spouse_net * 0.7, 2);
            SET @v_student_contrib = ROUND(ISNULL(@v_student_contrib, 0) / 2, 2);
            SET @v_spouse_contrib = ROUND(ISNULL(@v_spouse_contrib, 0) / 2, 2);
        END
    ELSE
        BEGIN
            SET @v_spouse_contrib = CASE
                WHEN ROUND(@v_spouse_net * 0.7, 2) > @v_spouse_expected_income THEN ROUND(@v_spouse_net * 0.7, 2)
                ELSE @v_spouse_expected_income
            END;
        END

    SET @v_spouse_contrib = ISNULL(ROUND(@v_married_study, 2), @v_spouse_contrib);

    IF @contrib_by = 1
    BEGIN
        RETURN @v_student_contrib;
    END

    RETURN @v_spouse_contrib;
END
GO

CREATE OR ALTER FUNCTION sfa.get_pstudy_contribution (@assessment_id_p INT)
RETURNS NUMERIC AS
BEGIN

        DECLARE @v_ps_months NUMERIC;
        DECLARE @v_ps_shelter NUMERIC;
        DECLARE @v_ps_p_trans NUMERIC;
        DECLARE @v_ps_x_trans NUMERIC;
        DECLARE @v_ps_dc_actual NUMERIC;
        DECLARE @v_ps_dc_allow NUMERIC;
        DECLARE @v_ps_d_food NUMERIC;
        DECLARE @v_ps_d_trans NUMERIC;
        DECLARE @v_ps_uncapped NUMERIC;
        DECLARE @v_ps_married NUMERIC;
        DECLARE @v_ps_expected NUMERIC;
        DECLARE @v_ps_gross NUMERIC;
        DECLARE @v_ps_tax_rate NUMERIC;
        DECLARE @v_ps_spouse_gross NUMERIC;
        DECLARE @v_ps_spouse_tax_rate NUMERIC;
        DECLARE @v_ps_combined_net NUMERIC;
        DECLARE @v_ps_allowable_total NUMERIC;
        DECLARE @v_ps_disc_80 NUMERIC;
        DECLARE @v_ps_contrib NUMERIC;


        SELECT 
        @v_ps_months = CAST(((DATEDIFF(DAY, a.pstudy_start_date, a.pstudy_end_date) - 1) / 30.44 + 0.9999) AS INT),
	@v_ps_shelter = COALESCE(a.pstudy_shelter_month,0), 
        @v_ps_p_trans = COALESCE(a.pstudy_p_trans_month,0),
        @v_ps_x_trans = COALESCE(a.pstudy_x_trans_total,0), 
        @v_ps_dc_actual = COALESCE(a.pstudy_day_care_actual,0),
        @v_ps_dc_allow = COALESCE(a.pstudy_day_care_allow,0), 
        @v_ps_d_food = COALESCE(a.pstudy_depend_food_allow,0),
        @v_ps_d_trans = COALESCE(a.pstudy_depend_tran_allow,0), 
        @v_ps_uncapped = COALESCE(a.uncapped_pstudy_total,0),
        @v_ps_married = a.married_pstudy, 
        @v_ps_expected = COALESCE(a.pstudy_expected_contrib,0),
        @v_ps_gross = COALESCE(a.stud_pstudy_gross,0), 
        @v_ps_tax_rate = COALESCE(a.stud_pstudy_tax_rate,0),
        @v_ps_spouse_gross = COALESCE(a.spouse_pstudy_gross,0), 
        @v_ps_spouse_tax_rate = COALESCE(a.spouse_pstudy_tax_rate,0)
        FROM sfa.assessment a 
        WHERE a.id = @assessment_id_p;

        -- Calculate the combined net income for the prestudy period
        SET @v_ps_combined_net = 0;

        IF @v_ps_gross > 0
        BEGIN
                SET @v_ps_combined_net = ROUND(@v_ps_gross - ROUND(@v_ps_gross * (@v_ps_tax_rate/100), 0), 0);
        END

        IF @v_ps_spouse_gross > 0
        BEGIN
                SET @v_ps_combined_net = @v_ps_combined_net + ROUND(@v_ps_spouse_gross - (@v_ps_spouse_gross * (@v_ps_spouse_tax_rate/100)), 0);
        END

                -- Calculate the total allowable costs for the prestudy period
        SET @v_ps_allowable_total = 0;

        SET @v_ps_allowable_total = ROUND(@v_ps_shelter * @v_ps_months, 0);
        SET @v_ps_allowable_total = @v_ps_allowable_total + ROUND(@v_ps_p_trans * @v_ps_months, 0);
        SET @v_ps_allowable_total = @v_ps_allowable_total + ROUND(@v_ps_x_trans, 0);
        SET @v_ps_allowable_total = @v_ps_allowable_total + ROUND(CASE 
              WHEN ISNULL(@v_ps_dc_actual, 0) < @v_ps_dc_allow THEN ISNULL(@v_ps_dc_actual, 0) 
              ELSE @v_ps_dc_allow 
          END * @v_ps_months, 0);
        SET @v_ps_allowable_total = @v_ps_allowable_total + ROUND(@v_ps_d_food * @v_ps_months, 0);
        SET @v_ps_allowable_total = @v_ps_allowable_total + ROUND(@v_ps_d_trans * @v_ps_months, 0);

        -- Calculate 80% of the prestudy discretionary costs
        SET @v_ps_disc_80 = ROUND(ROUND(CASE 
                   WHEN (@v_ps_combined_net - @v_ps_uncapped - @v_ps_allowable_total) > 0 
                   THEN (@v_ps_combined_net - @v_ps_uncapped - @v_ps_allowable_total) 
                   ELSE 0 
                 END, 0) * 0.8, 0);

        -- Calculate the actual prestudy contribution
        SET @v_ps_contrib = ROUND(CASE 
            WHEN @v_ps_married IS NOT NULL THEN @v_ps_married 
            ELSE ROUND( 
                        CASE 
                                WHEN @v_ps_expected > @v_ps_disc_80 THEN @v_ps_expected 
                                ELSE @v_ps_disc_80 
                        END
                , 0) 
          END, 0);

	RETURN @v_ps_contrib;
END
GO


--Private procedure called when saving to csl_nars_history
CREATE OR ALTER PROCEDURE sfa.sp_update_zero_amounts 
    @p_issue_date DATE,
    @p_serial_num INT
AS
BEGIN
    DECLARE @v_financial_batch_id INT;
    DECLARE @v_seq_name NVARCHAR(255);
    DECLARE @v_last_bg_id INT;
    DECLARE @seq_count INT;
    DECLARE @disbursement_id INT;
    DECLARE @bg_id INT;
    DECLARE @f_year INT;
    DECLARE @create_sequence_sql NVARCHAR(MAX);
    DECLARE @next_value_sql NVARCHAR(MAX);
    -- Update zero amount disbursements with a financial batch id 
    DECLARE cur_disbursements CURSOR FOR
    SELECT d.id, 
        CASE
            WHEN rt.batch_group_id = 5 THEN
                CASE
                    WHEN fr.yea_request_type = 1 THEN 3
                    WHEN fr.yea_request_type = 2 THEN 4
                    ELSE 1
                END
            WHEN rt.batch_group_id = 1 THEN
                sfa.get_batch_group_id_fct(fr.id)
            ELSE rt.batch_group_id
        END AS bg_id,
        sfa.get_fiscal_year_fct(d.issue_date) f_year
    FROM sfa.funding_request fr
    INNER JOIN sfa.disbursement d
        ON fr.id = d.funding_request_id
    INNER JOIN sfa.request_type rt
        ON fr.request_type_id = rt.id
    INNER JOIN sfa.assessment a 
        ON fr.id = a.funding_request_id and d.assessment_id = a.id
    WHERE d.disbursed_amount = 0 
        AND d.issue_date                >= '20090417'
        AND d.issue_date                <= @p_issue_date
        AND d.due_date                  IS NOT NULL
        AND d.financial_batch_id        IS NULL
        AND d.financial_batch_serial_no IS NULL
        AND d.financial_batch_run_date  IS NULL
        AND fr.request_type_id           = 4
    ORDER BY bg_id

    OPEN cur_disbursements;
    FETCH NEXT FROM cur_disbursements INTO @disbursement_id, @bg_id, @f_year;
    WHILE @@FETCH_STATUS = 0
    BEGIN
        IF ISNULL(@v_last_bg_id, -1) <> @bg_id OR @v_financial_batch_id IS NULL
        BEGIN
            SET @v_seq_name = 
                CASE @bg_id
                    WHEN 1 THEN  CONCAT('FB_' , CAST(@f_year AS NVARCHAR) ,  '_STA_SEQ') 
                    WHEN 2 THEN CONCAT('FB_' , CAST(@f_year AS NVARCHAR) , '_CSL_SEQ')
                    WHEN 3 THEN CONCAT('FB_' , CAST(@f_year AS NVARCHAR) , '_ORI_SEQ')
                    WHEN 4 THEN CONCAT('FB_' , CAST(@f_year AS NVARCHAR) , '_OTHER_SEQ')
                END;

            -- Validate if the sequence exist 
            SELECT  @seq_count = COUNT(name)
            FROM sys.objects
            WHERE name = @v_seq_name
            IF @seq_count = 0 
            BEGIN
                SET @create_sequence_sql = N'CREATE SEQUENCE sfa.' + @v_seq_name + N' START WITH 1 INCREMENT BY 1;';
                EXEC sp_executesql @create_sequence_sql;
            END
            SET @next_value_sql = N'SELECT @v_financial_batch_id = NEXT VALUE FOR sfa.' + @v_seq_name;

            EXEC sp_executesql @next_value_sql,
                N'@v_financial_batch_id INT OUTPUT',
                @v_financial_batch_id OUTPUT;
        END;

        UPDATE sfa.disbursement
        SET 
            financial_batch_run_date = @p_issue_date,
            financial_batch_serial_no = @p_serial_num,
            financial_batch_id = @v_financial_batch_id
        WHERE id = @disbursement_id;

        SET @v_last_bg_id = @bg_id;
        FETCH NEXT FROM cur_disbursements INTO @disbursement_id, @bg_id, @f_year;
    END;
    CLOSE cur_disbursements;
    DEALLOCATE cur_disbursements;
END
GO

CREATE OR ALTER FUNCTION sfa.get_standard_living_amt
(
    @academic_year_p VARCHAR(50),
    @province_id_p INT,
    @family_size_p INT
)
RETURNS INT
AS
BEGIN
    DECLARE @v_standard_living_amt INT;
    
    SELECT @v_standard_living_amt = standard_living_amount
    FROM sfa.standard_of_living
    WHERE academic_year_id = @academic_year_p
    AND province_id = @province_id_p
    AND family_size = @family_size_p;
    
    IF @v_standard_living_amt IS NULL
    BEGIN
        SET @v_standard_living_amt = 0;
    END
    
    RETURN @v_standard_living_amt;
    
    RETURN 0; -- Return 0 in case of exceptions (NO_DATA_FOUND)
END
GO

CREATE OR ALTER FUNCTION sfa.get_parent_contribution_fct
(
    @academic_year_p INT,
    @discretionary_income_p FLOAT
)
RETURNS NUMERIC
AS
BEGIN
    DECLARE @v_cont FLOAT;

    SELECT TOP 1
        @v_cont = ROUND(( add_amount + ((@discretionary_income_p - subtract_amount) * (percentage / 100)) / divide_by), 0)
    FROM sfa.parent_contribution_formula
    WHERE academic_year_id = @academic_year_p
    AND @discretionary_income_p BETWEEN income_from_amount AND income_to_amount;

    RETURN ISNULL(@v_cont, 0);
END
GO

CREATE OR ALTER FUNCTION sfa.get_parent_contribution
(
    @assessment_id_p INT,
    @academic_year_p INT, 
    @student_id_p INT
)
RETURNS NUMERIC AS
BEGIN
    DECLARE @v_parent_contribution NUMERIC;
    DECLARE @v_net_income NUMERIC;
    DECLARE @v_discretionary_income NUMERIC;
    DECLARE @v_family_size NUMERIC;
    DECLARE @v_msol NUMERIC;
    DECLARE @v_study_weeks NUMERIC;
    DECLARE @v_ps_depend_count NUMERIC;
    DECLARE @parent_mailing_province_id INT;

    SELECT
        @parent_mailing_province_id = pa.province_id
    FROM sfa.student s
        INNER JOIN sfa.person p ON p.id = s.person_id
        INNER JOIN sfa.person_address pa ON pa.person_id = p.id
    WHERE s.id = @student_id_p
    AND pa.address_type_id = 4;

    SELECT
        @v_net_income = COALESCE(a.parent1_income, 0) 
           + COALESCE(a.parent2_income, 0)
           - COALESCE(a.parent1_tax_paid, 0)
           - COALESCE(a.parent2_tax_paid, 0),
        @v_family_size = COALESCE(a.family_size, 0),
        @v_study_weeks = COALESCE(a.study_weeks, 0),
        @v_ps_depend_count = COALESCE(a.parent_ps_depend_count, 0)
    FROM sfa.assessment a
    WHERE a.id = @assessment_id_p;

    SET @v_msol = COALESCE(sfa.get_standard_living_amt(@academic_year_p, @parent_mailing_province_id, @v_family_size), 0);

    SET @v_discretionary_income = @v_net_income - @v_msol;

    SELECT @v_parent_contribution = sfa.get_parent_contribution_fct(@academic_year_p, @v_discretionary_income);

    IF @v_parent_contribution IS NULL
    BEGIN
        SET @v_parent_contribution = 0;
    END

    DECLARE @max_depend_count NUMERIC;

    SELECT @max_depend_count = MAX(val) from (values(@v_ps_depend_count),(1)) GREATEST_VALUE(val);

    RETURN ROUND(ROUND(@v_parent_contribution, 0) * @v_study_weeks / (@max_depend_count), 0);
END
GO

CREATE OR ALTER FUNCTION sfa.get_max_weekly_allowable
(
    @academic_year_p INT
)
RETURNS NUMERIC
AS
BEGIN
    DECLARE @v_max_weekly_allowable NUMERIC;

    SELECT @v_max_weekly_allowable = allowable_weekly_amount
    FROM sfa.csl_lookup
    WHERE academic_year_id = @academic_year_p;

    IF @v_max_weekly_allowable IS NULL
    BEGIN
        SET @v_max_weekly_allowable = 0;
    END

    RETURN COALESCE(@v_max_weekly_allowable, 0);
END
GO

CREATE OR ALTER FUNCTION sfa.get_assessed_cost
(
    @assessment_id_p NUMERIC
)
RETURNS NUMERIC
AS
BEGIN
    DECLARE @v_tuition NUMERIC;
    DECLARE @v_books NUMERIC;
    DECLARE @v_months NUMERIC;
    DECLARE @v_shelter NUMERIC;
    DECLARE @v_p_trans NUMERIC;
    DECLARE @v_x_trans NUMERIC;
    DECLARE @v_relocation NUMERIC;
    DECLARE @v_r_trans NUMERIC;
    DECLARE @v_d_food NUMERIC;
    DECLARE @v_d_trans NUMERIC;
    DECLARE @v_day_care NUMERIC;
    DECLARE @v_discretionary NUMERIC;
    DECLARE @v_uncapped NUMERIC;
    DECLARE @v_total NUMERIC;

    SELECT 
        @v_tuition = ISNULL(a.tuition_estimate, 0),
        @v_books = ISNULL(a.books_supplies_cost, 0),
        @v_shelter = ROUND(ISNULL(a.shelter_month, 0) * ISNULL(a.study_months, 0), 0),
        @v_p_trans = ROUND(ISNULL(a.p_trans_month, 0) * ISNULL(a.study_months, 0), 0),
        @v_x_trans = ISNULL(a.x_trans_total, 0),
        @v_relocation = ISNULL(a.relocation_total, 0),
        @v_r_trans = ROUND(ISNULL(a.r_trans_16wk, 0) * 
        (
            CASE
                WHEN a.study_weeks >= 1 AND a.study_weeks < 24 THEN 1
                WHEN a.study_weeks >= 24 THEN 2
                ELSE 0
            END
        ), 0),
        @v_d_food = ROUND(ISNULL(a.depend_food_allowable, 0) * ISNULL(a.study_months, 0), 0),
        @v_d_trans = ROUND(ISNULL(a.depend_tran_allowable, 0) * ISNULL(a.study_months, 0), 0),
        @v_discretionary = ROUND(
                CASE
                    WHEN ISNULL(a.discretionary_cost_actual, 0) <= ISNULL(a.discretionary_cost, 0) THEN ISNULL(a.discretionary_cost_actual, 0)
                    ELSE ISNULL(a.discretionary_cost, 0)
                END
            , 0),

        @v_uncapped = ISNULL(a.UNCAPPED_COSTS_TOTAL, 0)
    FROM sfa.assessment a
    WHERE a.id = @assessment_id_p;

    SET @v_total = ROUND(@v_tuition + @v_books + @v_shelter + @v_p_trans +
                         @v_x_trans + @v_relocation + @v_r_trans +
                         @v_d_food + @v_d_trans + @v_day_care +
                         @v_discretionary + @v_uncapped, 0);

    RETURN ISNULL(@v_total, 0);
END
GO

CREATE OR ALTER FUNCTION sfa.get_csl_overaward_fct (@student_id_p INT, @funding_request_id_p INT)
RETURNS INT
AS
BEGIN
    DECLARE @request_v INT;
    DECLARE @overaward_v INT;
    DECLARE @assess_v INT;

    DECLARE @cur_award CURSOR;
    DECLARE @over_award INT;

    SET @cur_award = CURSOR FOR
    SELECT a.over_award
    FROM sfa.assessment a
    INNER JOIN sfa.funding_request fr ON a.funding_request_id = fr.id
    INNER JOIN sfa.application app ON fr.application_id = app.id
    WHERE a.assessment_type_id = 3
    AND a.funding_request_id < @funding_request_id_p
    AND app.student_id = @student_id_p
    ORDER BY a.id DESC;

    OPEN @cur_award;

    FETCH NEXT FROM @cur_award INTO @over_award;

    IF @@FETCH_STATUS = 0 BEGIN
        SET @request_v = (
                SELECT COUNT(fr.id)
                FROM sfa.funding_request fr
                INNER JOIN sfa.application app ON fr.application_id = app.id
                WHERE fr.id <= @funding_request_id_p
                AND app.student_id = @student_id_p
                AND fr.request_type_id = 4
            );

        IF @request_v = 1 BEGIN
            SET @overaward_v = ISNULL((SELECT s.pre_over_award_amount FROM sfa.student s WHERE s.id = @student_id_p), 0);
        END
        ELSE IF @request_v > 1 BEGIN
            WHILE @@FETCH_STATUS = 0 BEGIN
                SET @overaward_v = @over_award;
                FETCH NEXT FROM @cur_award INTO @over_award;
            END;
        END;

        IF @overaward_v IS NULL BEGIN
            SET @overaward_v = 0;
        END;
    END;

    CLOSE @cur_award;
    DEALLOCATE @cur_award;

    RETURN @overaward_v;
END
GO

CREATE OR ALTER FUNCTION sfa.get_grant_amount (@application_id INT, @request_type_id INT)
RETURNS INT
AS
BEGIN  
    DECLARE @v_total NUMERIC;

    SELECT 
    @v_total = SUM(disbursed_amount)
    FROM sfa.disbursement d, sfa.funding_request fr
    WHERE  d.funding_request_id = fr.id
    AND fr.request_type_id = @request_type_id
    AND fr.application_id = @application_id;

    RETURN @v_total;
END
GO

CREATE OR ALTER FUNCTION sfa.get_grant_date(@application_id INT)
RETURNS DATE
AS
BEGIN
    DECLARE @v_date DATE;

    SELECT @v_date = MAX(d.issue_date)
    FROM sfa.disbursement d
    INNER JOIN sfa.funding_request f ON d.funding_request_id = f.id
    WHERE f.request_type_id IN (15, 20, 17, 18)
    AND f.application_id = @application_id;

    RETURN @v_date;
END
GO

CREATE OR ALTER FUNCTION sfa.get_issue_date(@application_id INT, @request_type_id INT)
RETURNS DATE
AS
BEGIN
    DECLARE @v_date DATE;

    SELECT @v_date = MAX(d.issue_date)
    FROM sfa.disbursement d
    INNER JOIN sfa.funding_request f ON d.funding_request_id = f.id
    WHERE f.request_type_id = @request_type_id
    AND f.application_id = @application_id;

    RETURN @v_date;
END
GO

CREATE OR ALTER FUNCTION sfa.get_prov_grant_schol_amount(
    @student_id_p INT,
    @academic_year_p INT,
    @institution_id_p INT
)
RETURNS NUMERIC
AS
BEGIN
    DECLARE @v_total NUMERIC;

    SELECT @v_total = COALESCE(SUM(d.disbursed_amount), 0)
    FROM sfa.disbursement d
    INNER JOIN sfa.funding_request f ON d.funding_request_id = f.id
    INNER JOIN sfa.application app ON f.application_id = app.id
    WHERE f.request_type_id IN (1, 2, 3)
    AND app.student_id = @student_id_p
    AND app.academic_year_id = @academic_year_p
    AND app.institution_campus_id = @institution_id_p;

    RETURN @v_total;
END
GO

CREATE OR ALTER FUNCTION sfa.get_prov_grant_amount(@application_id INT)
RETURNS NUMERIC
AS
BEGIN
    DECLARE @v_total NUMERIC;

    SELECT @v_total = COALESCE(SUM(d.disbursed_amount), 0)
    FROM sfa.disbursement d
    INNER JOIN sfa.funding_request f ON d.funding_request_id = f.id
    WHERE f.request_type_id IN (1, 2)
    AND f.application_id = @application_id;

    RETURN @v_total;
END
GO

CREATE OR ALTER FUNCTION sfa.get_prov_grant_date(@application_id INT)
RETURNS DATE
AS
BEGIN
    DECLARE @v_date DATE;

    SELECT @v_date = MAX(d.issue_date)
    FROM sfa.disbursement d
    INNER JOIN sfa.funding_request f ON d.funding_request_id = f.id
    WHERE f.request_type_id IN (1, 2)
    AND f.application_id = @application_id;

    RETURN @v_date;
END
GO

CREATE OR ALTER FUNCTION sfa.get_assessment_cnt(
    @funding_request_id_p INT,
    @assessment_id_p INT
)
RETURNS INT
AS
BEGIN
    DECLARE @v_count INT;

    SELECT @v_count = COUNT(a.id)
    FROM sfa.assessment a
    WHERE a.id <= @assessment_id_p
    AND a.funding_request_id = @funding_request_id_p;

    RETURN @v_count;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_date_from_yr_mo(@year_p INT, @month_p INT) 
RETURNS DATE
AS
BEGIN

        DECLARE @v_date  DATE;
        DECLARE @v_month_char    NVARCHAR(2);
        DECLARE @v_day_char      NVARCHAR(2);
        
        IF @year_p IS NULL OR @month_p IS NULL
                RETURN NULL;
        ELSE IF @month_p < 1 OR @month_p > 12
                RETURN NULL;
        ELSE IF @year_p < 1900 OR @year_p > 2199
                RETURN NULL;
        ELSE
        BEGIN
                /* Determine the last day for the month (don't worry about leap years,
                                and return a date for the last day of the year/month
                */
                IF @month_p = 2
                BEGIN
                        SET @v_day_char = '28';
                END
                ELSE IF @month_p IN (4, 6, 9, 11)
                BEGIN
                        SET @v_day_char = '30';
                END
                ELSE
                BEGIN
                        SET @v_day_char = '31';
                END


                IF @month_p < 10 
                BEGIN
                        SET @v_month_char = '0' +  + CAST(@month_p AS NVARCHAR(2));
                END
                ELSE
                BEGIN
                        SET @v_month_char = + CAST(@month_p AS NVARCHAR(2));
                END;
                
                SET @v_date = CAST(CAST(@year_p AS CHAR(4)) + @v_month_char + @v_day_char AS DATE);

                RETURN @v_date;
                
        END
RETURN NULL;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_rrsp_yearly_deduction(@academic_year_p INT)
RETURNS DECIMAL(10,2)
AS
BEGIN
    DECLARE @v_rrsp_yearly_deduction  DECIMAL(10,2);

        SELECT @v_rrsp_yearly_deduction = ISNULL(rrsp_deduction_yearly_amount, 0)
        FROM sfa.csl_lookup
        WHERE academic_year_id = @academic_year_p;

        IF @v_rrsp_yearly_deduction IS NULL 
        BEGIN
                SET @v_rrsp_yearly_deduction = 0;

        END

        RETURN  ISNULL(@v_rrsp_yearly_deduction, 0);
END
GO


CREATE OR ALTER FUNCTION sfa.fn_get_assessed_resources(@assessment_id_p INT, @academic_year_p INT)
RETURNS DECIMAL(10, 2)
AS
BEGIN

        DECLARE @v_ps_months DECIMAL(10, 2);
        DECLARE @v_ps_shelter DECIMAL(10, 2);
        DECLARE @v_ps_p_trans DECIMAL(10, 2);
        DECLARE @v_ps_x_trans DECIMAL(10, 2);
        DECLARE @v_ps_dc_actual DECIMAL(10, 2);
        DECLARE @v_ps_dc_allow DECIMAL(10, 2);
        DECLARE @v_ps_d_food DECIMAL(10, 2);
        DECLARE @v_ps_d_trans DECIMAL(10, 2);
        DECLARE @v_ps_uncapped DECIMAL(10, 2);
        DECLARE @v_ps_married DECIMAL(10, 2);
        DECLARE @v_ps_expected DECIMAL(10, 2);
        DECLARE @v_ps_gross DECIMAL(10, 2);
        DECLARE @v_ps_tax_rate DECIMAL(10, 2);
        DECLARE @v_ps_spouse_gross DECIMAL(10, 2);
        DECLARE @v_ps_spouse_tax_rate DECIMAL(10, 2);
        DECLARE @v_gross DECIMAL(10, 2);
        DECLARE @v_tax_rate DECIMAL(10, 2);
        DECLARE @v_spouse_gross DECIMAL(10, 2);
        DECLARE @v_spouse_tax_rate DECIMAL(10, 2);
        DECLARE @v_expected DECIMAL(10, 2);
        DECLARE @v_married DECIMAL(10, 2);
        DECLARE @v_investments DECIMAL(10, 2);
        DECLARE @v_vehicle DECIMAL(10, 2);
        DECLARE @v_rrsp_gross DECIMAL(10, 2);
        DECLARE @v_rrsp_spouse DECIMAL(10, 2);
        DECLARE @v_other DECIMAL(10, 2);
        DECLARE @v_asset_tax_rate DECIMAL(10, 2);
        DECLARE @v_married_assets DECIMAL(10, 2);
        DECLARE @v_ps_combined_net DECIMAL(10, 2);
        DECLARE @v_ps_allowable_total DECIMAL(10, 2);
        DECLARE @v_ps_disc_80 DECIMAL(10, 2);
        DECLARE @v_ps_contrib DECIMAL(10, 2);
        DECLARE @v_combined_net DECIMAL(10, 2);
        DECLARE @v_contrib DECIMAL(10, 2);
        DECLARE @v_assets DECIMAL(10, 2);
        DECLARE @v_total DECIMAL(10, 2);
        DECLARE @v_ps_start_date DATE;
        DECLARE @v_exempt_amt DECIMAL(10, 2);
        DECLARE @v_spouse_exempt_amt DECIMAL(10, 2);
        DECLARE @v_weeks DECIMAL(10, 2);
        DECLARE @v_year DECIMAL(10, 2);
        DECLARE @v_deduct DECIMAL(10, 2);
        DECLARE @v_hs_left_year DECIMAL(10, 2);
        DECLARE @v_hs_left_month DECIMAL(10, 2);
        DECLARE @v_spouse_hs_end_year DECIMAL(10, 2);
        DECLARE @v_spouse_hs_end_month DECIMAL(10, 2);
        DECLARE @v_spouse_study_school_from DATE;
        DECLARE @v_spouse_study_school_to DATE;
        DECLARE @v_parental_contribution DECIMAL(10, 2);
        DECLARE @v_student_contribution DECIMAL(10, 2);
        DECLARE @v_spouse_contribution DECIMAL(10, 2);
        DECLARE @v_vehicle_deduction_amount DECIMAL(10, 2);

        DECLARE @v_date_hs_left DATE;
        DECLARE @v_date_spouse_hs DATE;

        SELECT  @v_ps_months =CAST(((DATEDIFF(DAY, a.pstudy_start_date, a.pstudy_end_date) - 1) / 30.44 + 0.9999) AS INT)
                , @v_ps_shelter = ISNULL(a.pstudy_shelter_month,0)
                , @v_ps_p_trans = ISNULL(a.pstudy_p_trans_month,0)
                , @v_ps_x_trans = ISNULL(a.pstudy_x_trans_total,0)
                , @v_ps_dc_actual = ISNULL(a.pstudy_day_care_actual,0)
                , @v_ps_dc_allow = ISNULL(a.pstudy_day_care_allow,0)
                , @v_ps_d_food = ISNULL(a.pstudy_depend_food_allow,0)
                , @v_ps_d_trans = ISNULL(a.pstudy_depend_tran_allow,0)
                , @v_ps_uncapped = ISNULL(a.UNCAPPED_pstudy_TOTAL,0)
                , @v_ps_married = a.married_pstudy
                , @v_ps_expected = ISNULL(a.pstudy_expected_contrib,0)
                , @v_ps_gross = ISNULL(a.stud_pstudy_gross,0)
                , @v_ps_tax_rate = ISNULL(a.stud_pstudy_tax_rate,0)
                , @v_ps_spouse_gross = ISNULL(a.spouse_pstudy_gross,0)
                , @v_ps_spouse_tax_rate = ISNULL(a.spouse_pstudy_tax_rate,0)
                , @v_gross = ISNULL(a.student_gross_income,0)
                , @v_tax_rate = ISNULL(a.student_tax_rate,0)
                , @v_spouse_gross = ISNULL(a.spouse_gross_income,0)
                , @v_spouse_tax_rate = ISNULL(a.spouse_tax_rate,0)
                , @v_expected = ISNULL(a.spouse_expected_income,0)
                , @v_married = married_study
                , @v_investments =  0--ISNULL(a.financial_investments,0)
                , @v_vehicle = 0 --ISNULL(a.vehicles_gross,0),
                , @v_rrsp_gross = 0 --ISNULL(a.rrsp_student_gross,0)
                , @v_rrsp_spouse = 0 --ISNULL(a.rrsp_spouse_gross,0)
                , @v_other = 0 --ISNULL(a.other_income,0)
                , @v_asset_tax_rate = ISNULL(a.asset_tax_rate,0)
                , @v_married_assets = a.married_assets
                , @v_ps_start_date = a.PSTUDY_START_DATE
                , @v_weeks = a.STUDY_WEEKS
                , @v_hs_left_year = s.HIGH_SCHOOL_LEFT_YEAR
                , @v_hs_left_month = s.HIGH_SCHOOL_LEFT_MONTH
                , @v_spouse_hs_end_year =app.SPOUSE_HS_END_YEAR
                , @v_spouse_hs_end_month =app.SPOUSE_HS_END_MONTH
                , @v_spouse_study_school_from =app.SPOUSE_STUDY_SCHOOL_FROM
                , @v_spouse_study_school_to =app.SPOUSE_STUDY_SCHOOL_TO
                , @v_parental_contribution = CASE 
                                                WHEN app.csl_classification = 1 THEN
                                                        CASE WHEN a.parent_contribution_override IS NULL THEN
                                                                sfa.get_parent_contribution(a.id, app.academic_year_id, s.id)
                                                        ELSE
                                                                a.parent_contribution_override
                                                        END
                                                ELSE
                                                        0
                                        END
                , @v_student_contribution  = a.student_contribution
                , @v_spouse_contribution  = a.spouse_contribution
        FROM sfa.assessment a
        INNER JOIN sfa.funding_request fr
                ON  a.funding_request_id = fr.id
        INNER JOIN sfa.application app
                ON fr.application_id = app.id
        INNER JOIN sfa.student s
                ON app.student_id = s.id
        WHERE a.id = @assessment_id_p;

        IF @academic_year_p < 2017 
        BEGIN
                -- Calculate the combined net income for the prestudy period
                SET @v_ps_combined_net = 0;

                IF @v_ps_gross > 0 
                BEGIN
                        SET @v_ps_combined_net = ROUND(@v_ps_gross - ROUND( (@v_ps_gross * @v_ps_spouse_tax_rate/100), 2), 2 );
                END;

                IF @v_ps_spouse_gross > 0 
                BEGIN
                        SET @v_ps_combined_net = @v_ps_combined_net + ROUND(@v_ps_spouse_gross - (@v_ps_spouse_gross * (@v_ps_spouse_tax_rate/100)), 2);
                END;

                -- Calculate the total allowable costs for the prestudy period
                DECLARE @min_dc DECIMAL(18, 2);

                SET @v_ps_allowable_total = 0;

                SET @v_ps_allowable_total = ROUND(@v_ps_shelter * @v_ps_months , 2);

                SET @v_ps_allowable_total = @v_ps_allowable_total + ROUND(@v_ps_p_trans * @v_ps_months, 2);

                SET @v_ps_allowable_total = @v_ps_allowable_total + ROUND(@v_ps_x_trans, 2);

                IF @v_ps_dc_actual < @v_ps_dc_allow
                    SET @min_dc = @v_ps_dc_actual;
                ELSE
                    SET @min_dc = @v_ps_dc_allow;

                SET @v_ps_allowable_total = @v_ps_allowable_total + ROUND(@min_dc * @v_ps_months, 2);

                SET @v_ps_allowable_total = @v_ps_allowable_total + ROUND(@v_ps_d_food * @v_ps_months, 2);

                SET @v_ps_allowable_total = @v_ps_allowable_total + ROUND(@v_ps_d_trans * @v_ps_months, 2);

                -- Calculate 80% of the prestudy discretionary costs
                --SET @v_ps_disc_80 = ROUND(ROUND(GREATEST((@v_ps_combined_net - @v_ps_uncapped - @v_ps_allowable_total),0), 2), 2)*.8;

                -- Calculate the actual prestudy contribution
                --SET @v_ps_contrib = ISNULL(ROUND(@v_ps_married, 2),ROUND(GREATEST(@v_ps_expected, @v_ps_disc_80), 2));

                -- Calculate the combined net income for the study period
                SET @v_combined_net = 0;

                -- Calculate the exempt amount
                SELECT @v_exempt_amt = ISNULL(sfa.get_student_exempt_amt(@academic_year_p),0);

                IF @academic_year_p > 2003 
                BEGIN
                        SET @v_exempt_amt = @v_exempt_amt * @v_weeks;
                END;

                -- Calculate the spouse exempt amount
                SET @v_spouse_exempt_amt = 0;

                IF @v_spouse_study_school_to IS NOT NULL AND  @v_spouse_study_school_from IS NOT NULL 
                BEGIN
                        SELECT @v_spouse_exempt_amt =  sfa.get_student_exempt_amt(@academic_year_p);

                        --IF @academic_year_p > 2003 
                        --BEGIN
                        --       SET @v_spouse_exempt_amt = @v_exempt_amt *  LEAST(@v_weeks, CAST((DATEDIFF(DAY,@v_spouse_study_school_from, @v_spouse_study_school_to ) + 1) / 7 + 0.9999 AS INT));
                        --END;
                END;

                --IF @v_gross > 0 
                --BEGIN
                        --SET @v_combined_net = GREATEST(ROUND(@v_gross - ROUND((@v_gross * (@v_tax_rate/100)), 2), 2)- @v_exempt_amt,0);
                --END;

                --IF @v_spouse_gross > 0 
                --BEGIN                                -- added 70% spouse net to calculation here, Lidwien SFA-208
                        --SET @v_combined_net = @v_combined_net + GREATEST((ROUND(@v_spouse_gross - (@v_spouse_gross * (@v_spouse_tax_rate/100)), 2)- @v_spouse_exempt_amt) *.7,0);
                --END;

                -- Calculate the actual study contribution - removed 80% v_combined net calculation here, Lidwien SFA-208
                --SET @v_contrib = ISNULL(ROUND(@v_married, 2),ROUND(GREATEST(@v_expected, @v_combined_net), 2));

                -- Calculate total assets
                SET @v_assets = 0;

                IF @v_vehicle > 0 
                BEGIN
                        SELECT @v_vehicle_deduction_amount =  sfa.fn_get_vehicle_deduction_amount(@academic_year_p);
                        --SET @v_assets = ROUND(GREATEST(@v_vehicle -  @v_vehicle_deduction_amount ,0), 2);
                END;

                IF @v_investments > 0 
                BEGIN
                        SET @v_assets = @v_assets + @v_investments;

                END;
                IF @v_other > 0 
                BEGIN
                        SET @v_assets = @v_assets + ROUND(@v_other - (@v_other * (@v_asset_tax_rate/100)), 2);

                END

                IF @v_rrsp_gross > 0 
                BEGIN
                        SELECT  @v_date_hs_left = sfa.fn_date_from_yr_mo(@v_HS_Left_Year, @v_HS_Left_Month);
                        SET @v_year = ISNULL(ROUND(  DATEDIFF(DAY,@v_date_hs_left, @v_ps_Start_Date)/ 365.25 + 0.4999, 2),0);
                        SELECT @v_deduct = sfa.fn_get_rrsp_yearly_deduction(@academic_year_p);
                        --SET @v_assets = @v_assets + (GREATEST(@v_rrsp_gross - (@v_year * @v_deduct),0)) ;
                END

                IF @v_rrsp_spouse > 0 
                BEGIN
                        SELECT  @v_date_spouse_hs = sfa.fn_date_from_yr_mo(@v_Spouse_HS_End_Year, @v_Spouse_HS_End_Month);
                        SET @v_year = ISNULL(ROUND( DATEDIFF(DAY,@v_date_spouse_hs, @v_ps_Start_Date )/ 365.25 + 0.4999, 2),0);
                        SELECT @v_deduct = sfa.fn_get_rrsp_yearly_deduction(@academic_year_p);
                        --SET @v_assets = @v_assets + (GREATEST(@v_rrsp_spouse - (@v_year * @v_deduct),0));
                END

                SET @v_assets = ISNULL(ROUND(@v_married_assets, 2),ROUND(@v_assets, 2));

                SET @v_total = @v_assets + @v_contrib + @v_ps_contrib + @v_parental_contribution;
        END
        ELSE
        BEGIN
                SET @v_total = @v_student_contribution + @v_spouse_contribution;
        END

        RETURN ISNULL(@v_total,0);

END
GO

CREATE OR ALTER FUNCTION sfa.fn_parent_mailing_postal_code(
    @student_id INT
)
RETURNS VARCHAR
AS
BEGIN
    
    DECLARE @postal_code VARCHAR(50);

    SELECT @postal_code = pa.postal_code
    FROM sfa.student s
    INNER JOIN sfa.person p ON s.person_id = p.id
    INNER JOIN sfa.person_address pa ON pa.person_id = p.id
    WHERE s.id = @student_id
    AND pa.address_type_id = 4;

    RETURN @postal_code;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_parent_mailing_country_id(
    @student_id INT
)
RETURNS INT
AS
BEGIN
    
    DECLARE @country_id INT;

    SELECT @country_id = pa.country_id
    FROM sfa.student s
    INNER JOIN sfa.person p ON s.person_id = p.id
    INNER JOIN sfa.person_address pa ON pa.person_id = p.id
    WHERE s.id = @student_id
    AND pa.address_type_id = 4;

    RETURN @country_id;
END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_r_trans_multiplier(@study_weeks_p INT)
RETURNS INT
AS 
BEGIN
  IF @study_weeks_p >= 1 AND @study_weeks_p < 24 
  BEGIN
    RETURN 1;
  END
  ELSE IF @study_weeks_p >= 24 
  BEGIN
    RETURN 2;
  END

  RETURN 0;

END
GO

CREATE OR ALTER FUNCTION sfa.fn_get_total_income(@application_id INT)
RETURNS DECIMAL(10,2) 
AS 
BEGIN

  	DECLARE @v_total DECIMAL(10,2);

    SELECT  @v_total = SUM(amount)
    FROM sfa.income
    WHERE application_id = @application_id;

    RETURN @v_total;
END
GO

/* Added for NAR report -- SFA-213 February 24, 2009 by J Mckellar */
CREATE OR ALTER FUNCTION sfa.fn_get_income( @application_id INT, @income_type_id_p INT)
RETURNS DECIMAL(10,2) 
AS 
BEGIN
  DECLARE @v_income DECIMAL(10,2) ;

    
    select @v_income = FLOOR(ISNULL(sum(amount),0))
    FROM sfa.income
    WHERE application_id = @application_id
    and income_type_id = @income_type_id_p;
    
    return @v_income;
END
GO


CREATE OR ALTER FUNCTION sfa.fn_get_asset_student_contribution(@academic_year_p INT, @assessment_id_p INT, @ownership_id_p INT, @yrs_since_hs_p INT, @application_id INT)
RETURNS DECIMAL(10,2) 
AS 
BEGIN
  	DECLARE @v_asset_contribution DECIMAL(10,2) ;
	DECLARE @v_financial_asset DECIMAL(10,2) ;
	DECLARE @v_student_rrsp_asset DECIMAL(10,2) ;
	DECLARE @v_vehicle_asset DECIMAL(10,2) ;
	DECLARE @v_spouse_rrsp_asset DECIMAL(10,2) ;
  	DECLARE @v_vehicle_deduction DECIMAL(10,2) ;
  	DECLARE @v_rrsp_year_deduction DECIMAL(10,2) ;
  	DECLARE @v_rrsp_asset DECIMAL(10,2) ;

	SELECT @v_financial_asset = ISNULL(SUM(market_value),0)
	FROM sfa.INVESTMENT 
	WHERE ownership_id = @ownership_id_p
      	AND is_rrsp = 0
		AND application_id = @application_id;

    SET @v_student_rrsp_asset = 0;
    SET @v_spouse_rrsp_asset= 0;
    SET @v_vehicle_asset = 0;
    	-- NOT LONGER USED 
		-- SELECT @v_student_rrsp_asset = ISNULL(rrsp_student_gross,0), @v_spouse_rrsp_asset= ISNULL(rrsp_spouse_gross,0), @v_vehicle_asset = ISNULL(vehicles_gross,0) 
		-- FROM sfa.assessment 
	  	-- WHERE assessment_id = @assessment_id_p;

	SELECT @v_vehicle_deduction = ISNULL(vehicle_deduction_amount,0), 
      		@v_rrsp_year_deduction =  ISNULL(rrsp_deduction_yearly_amount,0)
	FROM sfa.csl_lookup
	WHERE academic_year_id = @academic_year_p;	  
		
	IF @ownership_id_p = 1  -- student 
    BEGIN
      	SET @v_rrsp_asset = (@v_student_rrsp_asset - (@v_rrsp_year_deduction * @yrs_since_hs_p));
      	IF @v_rrsp_asset < 0  
      	BEGIN
        	SET @v_rrsp_asset = 0;
      	END
      	IF @v_vehicle_deduction > @v_vehicle_asset  
      	BEGIN
        	SET @v_vehicle_asset = 0;
      	END
      	ELSE
      	BEGIN
        	SET @v_vehicle_asset = (@v_vehicle_asset - @v_vehicle_deduction);
      	END
		SET @v_asset_contribution = @v_financial_asset +  @v_rrsp_asset + @v_vehicle_asset;
    END
	ELSE IF @ownership_id_p = 2  -- spouse  
    BEGIN
      SET @v_rrsp_asset = (@v_spouse_rrsp_asset - (@v_rrsp_year_deduction * @yrs_since_hs_p));
      IF @v_rrsp_asset < 0  
      BEGIN
        SET @v_rrsp_asset = 0;
      END;
      SET @v_asset_contribution = @v_financial_asset + @v_rrsp_asset;
    END
	ELSE
    BEGIN
		SET @v_asset_contribution = @v_financial_asset;
	END

	RETURN @v_asset_contribution;
END
GO

CREATE OR ALTER FUNCTION sfa.get_nar_other_study_cost (
    @application_id INT,
    @discretionary_cost_actual_p FLOAT,
    @discretionary_cost_max_p NUMERIC(10, 2)
)
RETURNS NUMERIC
AS
BEGIN
    DECLARE @v_discretionary_amount NUMERIC;
    DECLARE @v_other_costs NUMERIC;

    IF ISNULL(@discretionary_cost_actual_p, 0) > ISNULL(@discretionary_cost_max_p, 0)
        SET @v_discretionary_amount = ISNULL(@discretionary_cost_max_p, 0);
    ELSE
        SET @v_discretionary_amount = ISNULL(@discretionary_cost_actual_p, 0);

    SELECT @v_other_costs = ISNULL(SUM(amount), 0)
    FROM sfa.expense 
    WHERE category_id <> 3 -- 3 is Day Care Costs - Monthly
    AND category_id NOT IN (11, 14) -- 11 (Discretionary Costs expense) and 14 (Computer Hardware/Software/Supplies expense) reported separately
    AND period_id = 2 
    AND application_id = @application_id;

    RETURN (@v_discretionary_amount + ISNULL(@v_other_costs, 0));
END
GO

CREATE OR ALTER FUNCTION sfa.get_family_ps_count(@application_id INT)
RETURNS INT
AS
BEGIN
    DECLARE @v_count INT;

    SELECT @v_count = COUNT(id)
    FROM sfa.parent_dependent
    WHERE application_id = @application_id
    AND is_eligible = 1
    AND is_attend_post_secondary = 1;

    IF @v_count > 10
        SET @v_count = 10;

    RETURN @v_count;
END
GO

CREATE OR ALTER PROCEDURE sfa.save_csl_nars_history @p_issue_date DATE, @p_serial_num NUMERIC 
AS
    BEGIN

    -- Insert into CSL NARS HISTORY
    -- Select uses 20090417 as criteria because that is the implementation date.
    -- Otherwise ALL zero amount records entered before 20090417 would be selected
        INSERT INTO sfa.csl_nars_history
            (application_id
            ,student_id
            ,assessment_id
            ,academic_year
            ,sin
            ,loan_year
            ,postal_prefix
            ,birth_date
            ,gender
            ,marital_status
            ,institution_code
            ,field_of_study
            ,year_study
            ,study_weeks
            ,study_start_date
            ,study_end_date
            ,loan_type
            ,course_percentage
            ,credit_check_flg
            ,credit_check_status
            ,disabled_flg
            ,disabled_type
            ,minority_flg
            ,aboriginal_status_flg
            ,aboriginal_category
            ,assessment_date
            ,csl_classification
            ,family_size
            ,post_secondary_children
            ,spouse_student_flg
            ,spouse_csl_flg
            ,spouse_sin
            ,children_to_11
            ,children_over_12_dis
            ,children_over_12_not_dis
            ,pstudy_student_income
            ,study_income_gov
            ,study_income_priv
            ,study_income_gov_ei
            ,study_income_cpp
            ,study_income_wc
            ,study_income_gov_soc
            ,study_income_nont_gov
            ,study_income_merit
            ,study_income_priv_merit
            ,study_income_employ
            ,study_income_cs
            ,study_income_alimony
            ,study_income_other
            ,study_income_gov_grant
            ,parent1_income
            ,parent2_income
            ,student_rrsp
            ,student_vehicle
            ,student_asset
            ,spouse_rrsp
            ,spouse_vehicle
            ,spouse_asset
            ,student_years_since_hs
            ,spouse_years_since_hs
            ,student_study_contribution
            ,student_pstudy_contribution
            ,spouse_study_contribution
            ,parental_contribution
            ,assessed_resources
            ,tuition_estimate
            ,request_need
            ,csl_before_overaward
            ,psl_before_overaward
            ,csl_recovered_overaward
            ,psl_recovered_overaward
            ,csl_auth_ft
            ,csl_auth_pt
            ,csl_auth_loan_amnt
            ,csl_auth_loan_date
            ,psl_auth_loan_amnt
            ,psl_auth_loan_date
            ,assessment_review_flg
            ,csg_doctoral_amount
            ,csg_disability_amount
            ,cag_perm_disability_amnt
            ,csg_dependent_amount
            ,csg_date
            ,cms_amount
            ,cms_date
            ,prov_grant_unmet_amnt
            ,prov_grant_amnt
            ,prov_grant_date
            ,version_num
            ,app_status
            ,reassess_indicator
            ,cat_code
            ,single_ind_stat_reas
            ,social_assist_flg
            ,parent1_sin
            ,parent1_postal_code
            ,parent2_sin
            ,parent2_postal_code
            ,postal_suffix
            ,pstudy_weeks
            ,pstudy_home_away
            ,study_home_away
            ,program_type
            ,academic_year_study
            ,year_in_program
            ,program_duration
            ,early_withdrawal_ind
            ,date_left_hs
            ,spouse_date_left_hs
            ,pstudy_income_other
            ,pstudy_income_employ
            ,spouse_income_annual
            ,spouse_pstudy_income
            ,spouse_study_income
            ,parent1_income_taxable
            ,parent1_income_taxpaid
            ,parent2_income_taxable
            ,parent2_income_taxpaid
            ,joint_asset_flg
            ,student_resp
            ,parental_asset
            ,joint_contrib_flg
            ,spouse_pstudy_contrib
            ,student_asset_contrib
            ,spouse_asset_contrib
            ,parental_asset_contrib
            ,other_resources
            ,pstudy_cost_living
            ,pstudy_cost_loan
            ,pstudy_pt_cost_tuitn
            ,study_cost_living
            ,study_cost_computers
            ,study_cost_books
            ,study_cost_childcare_allw
            ,study_cost_childcare_actl
            ,study_cost_return_trans
            ,study_cost_other_trans
            ,study_cost_relocation
            ,study_cost_other
            ,study_cost_total
            ,aboriginal_cat
            ,stud_gross_annual_income
            ,spouse_gross_annual_income
            ,csg_li
            ,csg_mi
            ,csg_pd
            ,csg_ftdep
            ,csg_pdse
            ,transition_grant_amt
            ,tgrant_yrs_remaining
            ,pstudy_dep_cost_living
            ,pstudy_x_trans_total
            ,study_directed_income
            ,financial_investments
            ,married_adjustment)
        
        SELECT DISTINCT
                    app.id
                  , s.id
                  , a.id
                  , app.academic_year_id
                  , p.sin AS sin
                  , CAST(app.academic_year_id AS VARCHAR(8)) AS loan_year
                  , ( 
                        SELECT TOP 1
                        SUBSTRING(pa.postal_code,  1, 3)
                        FROM sfa.person_address pa
                        WHERE pa.person_id = p.id
                        AND (
                                (pa.address_type_id = 1 AND pa.postal_code IS NOT NULL) OR
                                (pa.address_type_id = 2 AND pa.postal_code IS NOT NULL)
                            )
                    ) AS postal_prefix
                  , p.birth_date
                  , (
                        CASE 
                            WHEN p.sex_id = 2 THEN 'F'
                            ELSE 'M'
                        END
                    
                    ) AS gender
                  , (
                        CASE 
                            WHEN app.marital_status_id = 1 THEN 'S'
                            WHEN app.marital_status_id = 2 THEN 'S'
                            WHEN app.marital_status_id = 4 THEN 'M'
                            ELSE 'O'
                        END
                    ) AS marital_status
                  , SUBSTRING(sfa.fn_get_institution_code_fct(app.institution_campus_id),1,4) AS institution_code
                  , SUBSTRING(CONVERT(VARCHAR, sfa.fn_get_field_program_code_fct(sfa.fn_get_study_field_id_fct(app.study_area_id),app.program_id)),1,2) AS field_of_study
                  , SUBSTRING(CONVERT(VARCHAR(4), app.program_year) + CONVERT(VARCHAR(4), app.program_year_total),1,2) AS year_study
                  , a.study_weeks
                  , a.classes_start_date AS study_start_date
                  , a.classes_end_date AS study_end_date
                  , (
                        CASE
                            WHEN fr.request_type_id = 4 THEN 'FT'
                            ELSE 'PT'
                        END
                    )  AS loan_type
  --                , DECODE(fr.request_type_id,4,'60',app.percent_of_full_time)   AS course_percentage
  -- GPR VJSFA-263
                  , (
                        CASE 
                            WHEN app.is_perm_disabled = 1 THEN '40'
                            WHEN fr.request_type_id = 4 THEN '60'
                            ELSE CONVERT(VARCHAR, app.percent_of_full_time)
                        END
                    ) as course_percentage
                  , 
                    (
                        CASE 
                            WHEN app.credit_chk_fax_sent_date IS NULL THEN 'N'
                            ELSE 'Y'
                        END
                  
                    ) AS credit_check_flg
                  , (
                        CASE
                            WHEN app.credit_chk_fax_sent_date IS NULL THEN NULL
                            ELSE 
                                CASE
                                    WHEN app.credit_chk_passed = 1 THEN 'G'
                                    WHEN app.credit_chk_app_comp = 1 THEN 'R'
                                ELSE 'B'
                            END
                        END
                    ) AS credit_check_status
                  , (
                        CASE
                            WHEN app.is_perm_disabled = 1 THEN 'Y' -- hd.perm_disabled_flag
                            ELSE 'N'
                        END
                    ) AS disabled_flg
                  , (
                        CASE
                            WHEN app.is_perm_disabled = 1 
                            THEN dis.csl_code
                            ELSE NULL
                        END
                      
                    ) AS disabled_type
                  , (
                        CASE
                            WHEN app.is_minority = 1 THEN 'Y'
                            ELSE 'N'
                        END
                    ) AS minority_flg
                  , (
                        CASE
                            WHEN app.aboriginal_status_id = 2 THEN 'Y'
                            WHEN app.aboriginal_status_id = 3 THEN 'Y'
                            ELSE 'N'
                        END
                    ) AS aboriginal_status_flg
                  , (
                        CASE
                            WHEN app.aboriginal_status_id = 2 THEN 'N'
                            WHEN app.aboriginal_status_id = 3 THEN 'S'
                            ELSE NULL
                        END
                    ) AS aboriginal_category
                  , a.assessed_date AS assessment_date
                  , (
                        CASE
                            WHEN app.csl_classification = 2 THEN '1'
                            WHEN app.csl_classification = 2 THEN '4'
                            WHEN app.csl_classification = 3 THEN '2'
                            WHEN app.csl_classification = 4 THEN '3'
                            ELSE '5'
                        END
                    ) AS csl_classification
                  , (
                        CASE
                            WHEN app.csl_classification = 1 THEN 
                                COALESCE(sfa.get_family_size(app.id), 1)
                            WHEN app.csl_classification = 4 THEN
                                COALESCE(sfa.fn_get_csl_dependent_count(app.id),0) + 1
                            WHEN app.csl_classification = 3 THEN
                                COALESCE(sfa.fn_get_csl_dependent_count(app.id),0) + 2
                            ELSE NULL
                        END
                    )AS family_size
                  , (
                        CASE
                            WHEN app.csl_classification = 2 THEN NULL
                            WHEN app.csl_classification = 5 THEN NULL
                            ELSE COALESCE(sfa.get_family_ps_count(app.id), 1)
                        END
                    ) AS post_secondary_children
                  , (        
                        CASE
                            WHEN app.csl_classification = 3 THEN 
                                CASE
                                    WHEN app.spouse_study_school_from IS NULL THEN 'N'
                                    ELSE 'Y'
                                END
                            ELSE NULL
                        END
                    ) AS spouse_student_flg
                  , (
                        CASE
                            WHEN app.csl_classification = 3 THEN 
                                CASE
                                    WHEN app.is_spouse_study_csl = 1 THEN 'Y'
                                    ELSE 'N'
                                END
                            ELSE NULL
                        END
                    ) AS spouse_csl_flg
                  , (
                        CASE
                            WHEN app.csl_classification = 3 THEN SUBSTRING((SELECT p.sin FROM sfa.person p WHERE p.id = app.spouse_id), 1, 9)
                            ELSE NULL
                        END
                    ) AS spouse_sin
                  , (
                        CASE
                            WHEN app.csl_classification = 2 THEN NULL
                            WHEN app.csl_classification = 5 THEN NULL
                            ELSE sfa.fn_get_csl_dep_age_count(app.id, 0, 11, app.csl_classification)
                        END
                    )   AS children_to_11
                  , (
                        CASE
                            WHEN app.csl_classification = 2 THEN NULL
                            WHEN app.csl_classification = 5 THEN NULL
                            ELSE sfa.fn_get_csl_dep_age_dis_cnt(app.id, 12, 99, 1, app.csl_classification)
                        END
                  
                    ) AS children_over_12_dis
                  , (
                        CASE app.csl_classification
                            WHEN 2 THEN NULL
                            WHEN 5 THEN NULL
                            ELSE sfa.fn_get_csl_dep_age_dis_cnt(app.id, 12, 99, 0, app.csl_classification)
                        END


                    ) AS children_over_12_not_dis
                  , a.stud_pstudy_gross AS pstudy_student_income
                  , sfa.fn_get_income(app.id, 8) AS study_income_gov
                  , COALESCE(sfa.fn_get_income(app.id, 10), 0) + COALESCE(sfa.fn_get_income(app.id, 9), 0) AS study_income_priv
                  , sfa.fn_get_income(app.id,2) AS study_income_gov_ei
                  , sfa.fn_get_income(app.id,3) AS study_income_cpp
                  , sfa.fn_get_income(app.id,4) AS study_income_wc
                  , sfa.fn_get_income(app.id,5) AS study_income_gov_soc
                  , sfa.fn_get_income(app.id,6) AS study_income_nont_gov
                  , sfa.fn_get_income(app.id,16) AS study_income_merit
                  , sfa.fn_get_income(app.id,12) AS study_income_priv_merit
                  , sfa.fn_get_income(app.id,1) AS study_income_employ
                  , sfa.fn_get_income(app.id,15) AS study_income_cs
                  , sfa.fn_get_income(app.id,17) AS study_income_alimony
                  , sfa.fn_get_income(app.id,14) AS study_income_other
                  , sfa.fn_get_income(app.id,13) AS study_income_gov_grant
                  , (
                        CASE 
                            WHEN app.csl_classification = 1 THEN COALESCE(app.parent1_income,0)
                            ELSE NULL
                        END
                    ) AS parent1_income
                  , (
                        CASE 
                            WHEN app.csl_classification = 1 THEN
                                CASE 
                                    WHEN ISNULL((SELECT p.first_name FROM sfa.person p WHERE p.id = app.parent2_id), '') = '' THEN NULL
                                    ELSE ISNULL(app.parent2_income, 0)
                                END
                            ELSE NULL
                        END
                    ) AS parent2_income
                  , NULL AS student_rrsp --CAST(a.rrsp_student_gross AS INT)  --TRUNC(a.rrsp_student_gross)
                  , -- (
                    --     CASE 
                    --         WHEN app.csl_classification = 3 THEN CAST(a.vehicles_gross / 2 AS INT)
                    --         ELSE a.vehicles_gross
                    --     END
                    -- ) 
                    NULL AS student_vehicle
                  , COALESCE(sfa.get_investment_total(app.id, 1, 0), 0) AS student_asset
                  , --(
                    --    CASE 
                    --        WHEN app.csl_classification = 3 THEN CAST(a.rrsp_spouse_gross AS INT)
                    --        ELSE NULL
                    --    END
                    --) 
                    NULL AS spouse_rrsp
                  , --(
                    --    CASE 
                    --        WHEN app.csl_classification = 3 THEN CAST(a.vehicles_gross / 2 AS INT)
                    --        ELSE NULL
                    --    END
                    --) 
                    NULL AS spouse_vehicle
                  , (
                        CASE 
                            WHEN app.csl_classification = 3 THEN COALESCE(sfa.get_investment_total(app.id, 2, 0), 0)
                            ELSE NULL
                        END
                    ) AS spouse_asset
                  , CONVERT(INT, app.academic_year_id) - s.high_school_left_year AS student_years_since_hs
                  , (
                        CASE 
                            WHEN app.csl_classification = 3 THEN ISNULL(CAST(app.academic_year_id AS INT) - app.spouse_hs_end_year, 0)
                            ELSE NULL
                        END
                    ) AS spouse_years_since_hs
                  , sfa.get_study_contribution(a.id,app.academic_year_id,1) AS student_study_contribution
                  , sfa.get_pstudy_contribution(a.id) as student_pstudy_contribution
                  , (
                        CASE 
                            WHEN app.csl_classification = 3 THEN sfa.get_study_contribution(a.id, app.academic_year_id, 2)
                            ELSE NULL 
                        END

                    ) AS spouse_study_contribution
                  , (
                        CASE 
                            WHEN app.csl_classification = 1 THEN 
                                CASE 
                                    WHEN a.parent_contribution_override IS NULL THEN 
                                        sfa.get_parent_contribution(a.id, app.academic_year_id, s.id)
                                    ELSE 
                                        a.parent_contribution_override
                                END
                            ELSE NULL 
                        END
                    ) AS parental_contribution
                  , sfa.fn_get_assessed_resources(a.id,app.academic_year_id ) AS assessed_resources -- s.id
                  , ISNULL(CONVERT(INT, a.tuition_estimate), 0) AS tuition_estimate
                  , (
                        CASE 
                            WHEN fr.is_csl_full_amount = 1 THEN 
                            sfa.get_max_weekly_allowable(app.academic_year_id) * study_weeks
                            ELSE a.csl_request_amount
                        END

                    ) AS request_need                  
                  , 
                    (
                        CASE 
                            WHEN (ROUND((sfa.get_assessed_cost(a.id) - sfa.fn_get_assessed_resources(a.id, app.academic_year_id)) * 0.6, 2) > ROUND(sfa.get_max_weekly_allowable(app.academic_year_id) * COALESCE(a.study_weeks, 0), 2))
                                THEN ROUND(sfa.get_max_weekly_allowable(app.academic_year_id) * a.study_weeks, 0)
                            ELSE 
                                CASE 
                                    WHEN sfa.get_assessed_cost(a.id) < sfa.fn_get_assessed_resources(a.id, app.academic_year_id)
                                        THEN 0 
                                    ELSE ROUND((sfa.get_assessed_cost(a.id) - sfa.fn_get_assessed_resources(a.id, app.academic_year_id)) * 0.6, 1)
                                END
                        END
                    ) AS csl_before_overaward
                  , NULL AS psl_before_overaward
                  , sfa.get_csl_overaward_fct(app.student_id, a.funding_request_id) AS csl_recovered_overaward
                  , NULL AS psl_recovered_overaward
                  , (
                        CASE       
                            WHEN COALESCE(d.disbursed, 0) > 0 THEN 'Y'      
                            ELSE 'N'  
                        END
                    )  AS csl_auth_ft
                  , 'N' AS csl_auth_pt
                  , (
                        CASE      
                            WHEN COALESCE(d.disbursed, 0) <= 0 THEN 0     
                            ELSE d.disbursed  
                        END
                    ) AS csl_auth_loan_amnt
                  , (
                        CASE       
                            WHEN COALESCE(d.disbursed, 0) > 0 THEN d.issue_date     
                            ELSE NULL  
                        END
                    ) AS csl_auth_loan_date
                  , NULL  AS psl_auth_loan_amnt
                  , NULL  AS psl_auth_loan_date
                  , (
                        CASE
                            WHEN a.assessment_type_id = 2 THEN 'Y'
                            ELSE 'N'
                        END
                      
                    ) AS assessment_review_flg
                  , 
                  
                  (--s.sex,2,(disbursement_pck.get_grant_amount(app.history_detail_id,16)),0

                    CASE 
                        WHEN p.sex_id = 2 THEN sfa.get_grant_amount(app.id, 16)
                        ELSE 0
                    END
                  
                  ) AS csg_doctoral_amount
                  , sfa.get_grant_amount(app.id, 15) AS csg_disability_amount
                  , sfa.get_grant_amount(app.id, 22) AS cag_perm_disability_amnt
                  , sfa.get_grant_amount(app.id, 17) AS csg_dependent_amount
                  , (
                        CASE 
                            WHEN 0 >= ISNULL(
                                    CASE 
                                        WHEN p.sex_id = 2 THEN sfa.get_grant_amount(app.id, 16)
                                        ELSE 0
                                    END, 0) 
                                    + ISNULL(sfa.get_grant_amount(app.id, 15), 0) + ISNULL(sfa.get_grant_amount(app.id, 17), 0)
                            THEN NULL
                            ELSE sfa.get_grant_date(app.id) 
                        END 

                    ) AS csg_date
                  , sfa.get_grant_amount(app.id,19) AS cms_amount
                  , sfa.get_issue_date(app.id,19)AS cms_date
                  , NULL as prov_grant_unmet_amnt
                  , sfa.get_prov_grant_schol_amount(app.student_id, app.academic_year_id, app.institution_campus_id) AS prov_grant_amnt
                  ,(
                        CASE       
                            WHEN COALESCE(sfa.get_prov_grant_amount(app.id),0) <= 0   
                            THEN NULL      
                            ELSE sfa.get_prov_grant_date(app.id)  
                        END
                    ) AS prov_grant_date
                  , sfa.get_assessment_cnt(fr.id, a.id) as version_num
                  , (
                        CASE
                            WHEN fr.status_id = 7 THEN 'A'
                            WHEN fr.status_id = 4 THEN 'R'
                            ELSE 'P'
                        END
                    ) AS app_status
                  , (
                        CASE
                            WHEN a.assessment_type_id = 1 THEN '0'
                            ELSE '4'
                        END
                    ) AS reassess_indicator
                  , (
                        CASE
                            WHEN app.csl_classification = 3 THEN '1'
                            WHEN app.csl_classification = 4 THEN '2'
                            WHEN app.csl_classification = 1 THEN '4'
                            ELSE '3'
                        END
                    ) AS cat_code   
                  , (
                        CASE
                            WHEN app.csl_classification = 2 THEN '1'
                            WHEN app.csl_classification = 5 THEN '2'
                            ELSE NULL
                        END
                    ) AS single_ind_stat_reas   
                  , (
                      CASE 
                        WHEN COALESCE(sfa.fn_get_income(app.id, 5), 0) > 0 
                            THEN 'Y'
                            ELSE 'N'
                        END 
                    ) AS social_assist_flg
                  , (
                        CASE
                            WHEN app.csl_classification = 1 THEN ISNULL((SELECT p.sin FROM sfa.person p WHERE p.id = app.parent1_id), 0)
                            ELSE NULL
                        END
                    ) AS parent1_sin
                  , (
                        CASE
                            WHEN app.csl_classification = 1 AND LEN(COALESCE(sfa.fn_parent_mailing_postal_code(s.id), '')) = 6
                                THEN sfa.fn_parent_mailing_postal_code(s.id)
                            WHEN app.csl_classification = 1 AND LEN(COALESCE(sfa.fn_parent_mailing_postal_code(s.id), '')) = 7
                                THEN SUBSTRING(COALESCE(sfa.fn_parent_mailing_postal_code(s.id), ''), 1, 3) + SUBSTRING(COALESCE(sfa.fn_parent_mailing_postal_code(s.id), ''), 5, 3)
                            WHEN sfa.fn_parent_mailing_country_id(s.id) <> 1 AND app.csl_classification = 1
                                THEN 'XXXXXX'
                            ELSE NULL
                        END
                    ) AS parent1_postal_code
                  , (
                        CASE
                            WHEN app.csl_classification = 1 THEN ISNULL((SELECT p.sin FROM sfa.person p WHERE p.id = app.parent2_id), 0)
                            ELSE NULL
                        END                
                    ) AS parent2_sin
                  ,(
                        CASE
                            WHEN app.csl_classification = 1 AND LEN(COALESCE(sfa.fn_parent_mailing_postal_code(s.id), '')) = 6 AND ISNULL((SELECT p.first_name FROM sfa.person p WHERE p.id = app.parent2_id), '') <> ''
                                THEN sfa.fn_parent_mailing_postal_code(s.id)
                            WHEN app.csl_classification = 1 AND LEN(COALESCE(sfa.fn_parent_mailing_postal_code(s.id), '')) = 7 AND ISNULL((SELECT p.first_name FROM sfa.person p WHERE p.id = app.parent2_id), '') <> ''
                                THEN SUBSTRING(sfa.fn_parent_mailing_postal_code(s.id), 1, 3) + SUBSTRING(sfa.fn_parent_mailing_postal_code(s.id), 5, 3)
                            WHEN sfa.fn_parent_mailing_country_id(s.id) <> 1 AND app.csl_classification = 1 AND ISNULL((SELECT p.first_name FROM sfa.person p WHERE p.id = app.parent2_id), '') <> ''
                                THEN 'XXXXXX'
                            ELSE NULL
                        END
                    ) AS parent2_postal_code
                  , (
                        CASE
                            WHEN (
                                    SELECT pa.postal_code 
                                    FROM sfa.person_address pa 
                                    WHERE pa.id =s.person_id
                                    AND pa.address_type_id = 1
                                ) IS NULL THEN 
                                    SUBSTRING((
                                        SELECT pa.postal_code 
                                        FROM sfa.person_address pa 
                                        WHERE pa.id =s.person_id
                                        AND pa.address_type_id = 2
                                    ), 5,3)
                            ELSE
                                SUBSTRING((
                                    SELECT pa.postal_code 
                                    FROM sfa.person_address pa 
                                    WHERE pa.id =s.person_id
                                    AND pa.address_type_id = 1
                                ), 5,3)
                        END

                    ) AS postal_suffix
                  , CAST(DATEDIFF(DAY, a.pstudy_start_date, a.pstudy_end_date) / 7.0 + 0.9999 AS INT) AS pstudy_weeks
                  , (
                        CASE
                            WHEN a.prestudy_accom_code = 2 THEN 'A'
                            ELSE 'H'
                        END
                  ) AS pstudy_home_away
                  , (
                        CASE
                            WHEN a.study_accom_code = 2 THEN 'A'
                            ELSE 'H'
                        END  
                    ) AS study_home_away
                  , (
                        CASE
                            WHEN app.program_id = 2 THEN 1
                            WHEN app.program_id = 3 THEN 2
                            WHEN app.program_id = 4 THEN 3
                            WHEN app.program_id = 5 THEN 4
                            WHEN app.program_id = 6 THEN 5
                            WHEN app.program_id = 7 THEN 6
                            ELSE NULL
                        END
                    ) AS program_type
                  , app.program_year  as academic_year_study
                  , NULL as year_in_program
                  , app.program_year_total as program_duration
                  , NULL as early_withdrawal_ind
                  , sfa.fn_date_from_yr_mo(s.high_school_left_year, s.high_school_left_month) as date_left_hs
                  , (
                        CASE
                            WHEN app.csl_classification = 3 THEN sfa.fn_date_from_yr_mo(app.spouse_hs_end_year, app.spouse_hs_end_month)
                            ELSE NULL
                        END
                    ) AS spouse_date_left_hs
                  , COALESCE(sfa.fn_get_total_income(app.id), 0) AS pstudy_income_other
                  --, 0 -- nvl(income_pck.get_total_income(app.history_detail_id,1,1),0)-nvl(income_pck.get_income(1,1,app.history_detail_id,1),0)  AS pstudy_income_other
                  , 0 -- income_pck.get_income(1,1,app.history_detail_id,1)       AS pstudy_income_employ
                  , (
                        CASE
                            WHEN app.csl_classification = 3 THEN app.spouse_ln150_income
                            ELSE NULL
                        END
                    ) AS spouse_income_annual
                  , (
                        CASE
                            WHEN app.csl_classification = 3 THEN a.spouse_pstudy_gross
                            ELSE NULL
                        END
                    ) AS spouse_pstudy_income
                  , (
                        CASE
                            WHEN app.csl_classification = 3 THEN a.spouse_gross_income
                            ELSE NULL
                        END
                    ) AS spouse_study_income
                  , (
                        CASE
                            WHEN app.csl_classification = 1 THEN COALESCE(app.parent1_net_income, 0)
                            ELSE NULL
                        END
                  ) AS parent1_income_taxable
                  , (
                        CASE
                            WHEN app.csl_classification = 1 THEN COALESCE(app.parent1_tax_paid, 0)
                            ELSE NULL
                        END
                  ) AS parent1_income_taxpaid
                  , (
                        CASE
                            WHEN app.csl_classification = 1 AND ISNULL((SELECT first_name FROM sfa.person WHERE id = app.parent2_id), '') = '' THEN NULL
                            WHEN app.csl_classification = 1 THEN ISNULL(app.parent2_net_income, 0)
                            ELSE NULL
                        END

                    ) AS parent2_income_taxable
                  , (
                        CASE
                            WHEN app.csl_classification = 1 AND ISNULL((SELECT first_name FROM sfa.person WHERE id = app.parent2_id), '') = '' THEN NULL
                            WHEN app.csl_classification = 1 THEN ISNULL(app.parent2_tax_paid, 0)
                            ELSE NULL
                        END
                    )     AS parent2_income_taxpaid
                  , (
                        CASE
                            WHEN app.csl_classification = 3 THEN 'N'
                            ELSE NULL
                        END
                    ) AS joint_asset_flg
                  , 0 -- nvl(income_pck.get_income(3,1,app.history_detail_id, 11),0) AS student_resp
                  , NULL as parental_asset
                  , (
                        CASE
                            WHEN app.csl_classification = 3 THEN 1
                            ELSE NULL
                        END
                    ) as joint_contrib_flg
                  , NULL AS spouse_pstudy_contrib
                  , ISNULL(
                        sfa.fn_get_asset_student_contribution(
                            app.academic_year_id,
                            a.id,
                            1,
                            (s.high_school_left_year - app.academic_year_id),
                            app.id
                        ),
                        0
                    ) AS student_asset_contrib
                  , (
                        CASE
                            WHEN app.csl_classification = 3 THEN ISNULL(
                                    sfa.fn_get_asset_student_contribution(
                                        app.academic_year_id,
                                        a.id,
                                        1,
                                        (s.high_school_left_year - app.academic_year_id),
                                        app.id
                                    ),
                                    0
                                )
                            ELSE NULL
                        END
                  ) AS spouse_asset_contrib
                  , (
                        CASE
                            WHEN app.csl_classification = 1 THEN 0
                            ELSE NULL
                        END
                    ) AS parental_asset_contrib
                  , 0 as other_resources
                  , (
                        (a.pstudy_depend_food_allow + a.pstudy_depend_tran_allow + a.pstudy_p_trans_month + a.pstudy_shelter_month) *
                        CAST(DATEDIFF(DAY, a.pstudy_start_date, a.pstudy_end_date) / 30.44 + 0.9999 AS INT)
                    ) AS pstudy_cost_living
                  , (
                        ISNULL(sfa.fn_get_actual_expense(1, 6, app.id), 0) +
                        ISNULL(sfa.fn_get_actual_expense(1, 7, app.id), 0)
                    ) AS pstudy_cost_loan  -- prestudy period, 6 is Federal Student Loan Payments expense and 7 is Provincial Student Loan Payments expense 
                  , ISNULL(sfa.fn_get_actual_expense(1, 13, app.id), 0) AS pstudy_pt_cost_tuitn -- 13 is Pre-Study Full-time Tuition/Books/Supplies 
                  , (
                        (a.depend_food_allowable + a.depend_tran_allowable + a.p_trans_month + a.shelter_month) *
                        ISNULL(a.study_months, 0)
                    ) AS study_cost_living
                  , ISNULL(sfa.fn_get_actual_expense(2, 14, app.id), 0) AS study_computer_cost -- study period, 14 is Computer Hardware/Software/Supplies expense
                  , FLOOR(ISNULL(a.books_supplies_cost, 0)) AS study_cost_books
                  , (
                        CASE
                            WHEN sfa.fn_get_dependent_count_sta_fct(app.id) > 0
                                THEN FLOOR(ISNULL(a.day_care_allowable, 0) * a.study_months)
                            ELSE 0
                        END
                    ) AS study_cost_childcare_allw
                  , FLOOR(ISNULL(a.day_care_actual, 0) * a.study_months) AS study_cost_childcare_actl
                  , ROUND(ISNULL(a.r_trans_16wk, 0) * sfa.fn_get_r_trans_multiplier(a.study_weeks), 0) AS study_cost_return_trans
                  , (COALESCE(a.relocation_total, 0) + COALESCE(a.x_trans_total, 0)) AS study_cost_other_trans
                  , a.relocation_total AS study_cost_relocation
                  , ISNULL(sfa.get_nar_other_study_cost(app.id, a.discretionary_cost_actual, cl.discretionary_costs_max_amount), 0) AS study_cost_other -- lookup discrtionary cost max in csl lookup
                  , sfa.get_assessed_cost(a.id) AS study_cost_total
                  , (
                        CASE
                            WHEN app.aboriginal_status_id = 2 THEN 2
                            WHEN app.aboriginal_status_id = 3 THEN 1
                            WHEN app.aboriginal_status_id = 1 THEN 0
                            ELSE NULL
                        END
                    ) AS aboriginal_cat
                  , app.student_ln150_income AS stud_gross_annual_income
                  , (
                        CASE
                            WHEN app.csl_classification = 3 THEN app.spouse_ln150_income
                            ELSE NULL
                        END
                    ) AS spouse_gross_annual_income
                  , sfa.get_grant_amount(app.id,27) AS csg_li
                  , sfa.get_grant_amount(app.id,28) AS csg_mi
                  , sfa.get_grant_amount(app.id,29) AS csg_pd
                  , sfa.get_grant_amount(app.id,32) AS csg_ftdep
                  , sfa.get_grant_amount(app.id,30) AS csg_pdse
                  , sfa.get_grant_amount(app.id,26) AS transition_grant_amt
                  , app.rem_transition_grant_years AS tgrant_yrs_remaining
                  , (a.pstudy_depend_food_allow + a.pstudy_depend_tran_allow )AS pstudy_dep_cost_living
                  , a.pstudy_x_trans_total
                  , 0 * COALESCE(a.asset_tax_rate,0) AS study_directed_income -- COALESCE(a.other_income, 0) not found
                  , 0 AS financial_investments -- COALESCE(a.financial_investments, 0) not found
                  , COALESCE(a.married_assets, 0)

           FROM
            sfa.person p
            INNER JOIN sfa.student s
                ON p.id = s.person_id
            INNER JOIN sfa.application app
                ON  s.id = app.student_id
            INNER JOIN sfa.funding_request fr
                ON  app.id = fr.application_id
            INNER JOIN sfa.assessment a
                ON  fr.id = a.funding_request_id
            INNER JOIN sfa.csl_lookup cl
                ON cl.academic_year_id = app.academic_year_id
            LEFT OUTER JOIN (
                            SELECT
                               d1.application_id,
                               d1.disability_type_id,
                               dt.csl_code
                            FROM
                                sfa.disability d1, sfa.disability_type dt
                            WHERE d1.disability_type_id = dt.id
                            AND d1.id = (
                                            SELECT MAX(d2.id) 
                                            FROM sfa.disability d2 
                                            WHERE d2.application_id = d1.application_id
                                        )
                            ) dis
                ON  app.id = dis.application_id
            LEFT OUTER JOIN sfa.disbursement disburse
                ON  a.id = disburse.assessment_id
                AND fr.id = disburse.funding_request_id
            LEFT OUTER JOIN (
                    SELECT 
                        SUM(COALESCE(paid_amount, 0)) AS disbursed, 
                        max(issue_date) AS issue_date, 
                        funding_request_id, 
                        assessment_id 
                    FROM sfa.disbursement 
                    GROUP BY assessment_id, funding_request_id
                    ) d
                ON  a.id = d.assessment_id
                AND fr.id = d.funding_request_id 
          WHERE fr.request_type_id = 4
            AND (
                    disburse.financial_batch_run_date = @p_issue_date AND
                    disburse.financial_batch_serial_no = @p_serial_num OR
                    disburse.financial_batch_id IS NULL
                )

            AND disburse.issue_date >= CONVERT(DATE, '20090417', 112); --TO_DATE('20090417','yyyymmdd');

        EXEC sfa.sp_update_zero_amounts @p_issue_date, @p_serial_num;
END
GO

CREATE OR ALTER PROCEDURE sfa.sp_check_error_status
    @error_code_p VARCHAR(255),
    @disbursement_id_p INT,
    @is_resend_p INT OUTPUT,
    @error_id_p INT OUTPUT
AS
BEGIN
    DECLARE @is_resend_flg VARCHAR(255), @error_id INT;

    SELECT @is_resend_flg = is_resend, @error_id = id
    FROM sfa.entitlement_error_codes
    WHERE code = @error_code_p;

    INSERT INTO sfa.ENTITLEMENT_ERROR
    (
        disbursement_id,
        entitlement_error_code_id,
        is_resend
    )
    VALUES
    (
        @disbursement_id_p,
        @error_id,
        @is_resend_flg
    );

    SET @is_resend_p = @is_resend_flg;
    SET @error_id_p = @error_id;
END
GO

CREATE OR ALTER PROCEDURE sfa.sp_update_disbursement_by_id
AS
BEGIN
    DECLARE @sequence_number INT,
            @sin VARCHAR(50),
            @ecert_sent_date DATE,
            @response_date DATE,
            @certificate_number VARCHAR(50),
            @disbursement_id INT,
            @ecert_status VARCHAR(50);

    DECLARE cur_ecert_import CURSOR FOR
    SELECT 
        ei.sequence_number,
        ei.sin,
        ei.ecert_sent_date,
        ei.response_date,
        ei.certificate_number,
        ei.disbursement_id,
        CASE 
            WHEN ei.is_resend_flg = 'Yes' THEN 'Rejected'
            ELSE 'Warning'
        END AS ecert_status
    FROM sfa.ecert_import ei
    WHERE error_message IS NOT NULL;

    OPEN cur_ecert_import;
    FETCH NEXT FROM cur_ecert_import INTO 
        @sequence_number, @sin, @ecert_sent_date, @response_date,
        @certificate_number, @disbursement_id, @ecert_status;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        UPDATE sfa.disbursement
        SET ecert_status = @ecert_status, ecert_response_date = CONVERT(DATE, GETDATE())
        WHERE id = @disbursement_id;

        FETCH NEXT FROM cur_ecert_import INTO 
            @sequence_number, @sin, @ecert_sent_date, @response_date,
            @certificate_number, @disbursement_id, @ecert_status;
    END;

    CLOSE cur_ecert_import;
    DEALLOCATE cur_ecert_import;
END
GO

CREATE OR ALTER PROCEDURE sfa.sp_update_disbursement_by_seq
	@v_create_date DATE,
	@v_seq_num INT,
	@v_ecert_sent_date DATE
AS 
BEGIN 
	UPDATE sfa.disbursement 
		SET ecert_response_date = @v_create_date, ecert_status = 'Accepted'
	WHERE csl_cert_seq_number = @v_seq_num
		AND disbursement_type_id in (4,3)
		AND ecert_sent_date = @v_ecert_sent_date
		AND ecert_status IS NULL;			 	
END
GO

CREATE OR ALTER PROCEDURE sfa.sp_insert_ecert_import		
	@v_seq_num NVARCHAR(20), 
	@v_ecert_sent_date DATE, 
	@v_sin NVARCHAR(9), 
	@v_cert_number NVARCHAR(20), 
	@v_create_date DATE, 
	@v_is_resend NVARCHAR(3), 
	@v_error_msg NVARCHAR(4000), 
	@v_disbursement_id INT
AS
BEGIN
	INSERT INTO sfa.ecert_import 
	(
		sequence_number
		, ecert_sent_date
		, sin
		, certificate_number
		, response_date
		, is_resend_flg
		, error_message
		, disbursement_id
	)
	values 
	( 
		@v_seq_num, 
		@v_ecert_sent_date, 
		@v_sin, 
		@v_cert_number, 
		@v_create_date, 
		@v_is_resend, 
		@v_error_msg, 
		@v_disbursement_id
	);		
END
GO

CREATE OR ALTER PROCEDURE sfa.sp_update_msfa_send(@next_sequence INT, @agreement_number INT)
AS 
BEGIN 
	UPDATE sfa.msfaa SET sent_seq_number = @next_sequence
    WHERE id = @agreement_number;	
END
GO

CREATE OR ALTER PROCEDURE sfa.sp_update_system_parameter_send(@date DATE, @next_sequence INT)
AS 
BEGIN 
	UPDATE sfa.system_parameter SET last_msfaa_sent_date = @date, last_msfaa_sent_seq_num = @next_sequence;    
END
GO

CREATE OR ALTER PROCEDURE sfa.sp_update_date_msfa_send(@next_sequence INT, @v_send_date DATE, @agreement_number INT)
AS 
BEGIN 
	UPDATE sfa.msfaa 
		SET sent_date = @v_send_date, sent_seq_number = @next_sequence
    WHERE id = @agreement_number;	
END
GO

CREATE OR ALTER PROCEDURE sfa.sp_insert_communication_log_from_msfaa
(
	@msfaa_seq_p INT
)
AS
BEGIN
    DECLARE @to_email NVARCHAR(MAX);
    DECLARE @student_name NVARCHAR(MAX);
    DECLARE @msfaa_id INT;
    DECLARE @msfaa_sent_date DATE;

    DECLARE msfaa_cursor CURSOR FOR
    SELECT DISTINCT 
        CASE WHEN p.email IS NULL THEN a.school_email ELSE p.email END AS to_email,
        p.first_name + ' ' + p.last_name AS student_name,
        m.id AS msfaa_id,
        m.sent_date AS msfaa_sent_date
    FROM sfa.msfaa m
    INNER JOIN sfa.student s ON m.student_id = s.id
    INNER JOIN sfa.person p ON s.person_id = p.id
    INNER JOIN sfa.application a ON m.student_id = a.student_id
    WHERE m.sent_seq_number = @msfaa_seq_p;

    OPEN msfaa_cursor;

    FETCH NEXT FROM msfaa_cursor INTO @to_email, @student_name, @msfaa_id, @msfaa_sent_date;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        INSERT INTO sfa.communication_log (sent_from_email, sent_to_email, sent_to_cc, subject, msfaa_id, is_emailed) 
        VALUES ('sfa@gov.yk.ca', @to_email, 'sfa@gov.yk.ca', 'Student Financial Assistance: MSFAA Notification', @msfaa_id, 0);

        FETCH NEXT FROM msfaa_cursor INTO @to_email, @student_name, @msfaa_id, @msfaa_sent_date;
    END;

    CLOSE msfaa_cursor;
    DEALLOCATE msfaa_cursor;
END
GO

CREATE OR ALTER FUNCTION sfa.get_fb_prefix_fct (@bg_id_p INT)
RETURNS NVARCHAR(5)
AS
BEGIN
    DECLARE @v_bg NVARCHAR(5);

    SELECT @v_bg = TRIM(COALESCE(prefix, ''))
    FROM sfa.batch_group
    WHERE id = @bg_id_p;

    RETURN @v_bg;
END
GO

CREATE OR ALTER PROCEDURE sfa.sp_update_csl_fields 
AS
BEGIN
	 UPDATE app
    SET csl_restriction_warn_id = NULL,
        csl_restriction_reason_id = NULL
    FROM sfa.application app
    INNER JOIN (
        SELECT a.student_id, MAX(a.id) AS max_id
        FROM sfa.application a
        GROUP BY a.student_id
    ) max_app ON app.id = max_app.max_id
    INNER JOIN sfa.student s ON s.id = app.student_id
	INNER JOIN sfa.person p ON p.id = s.person_id
    WHERE p.sin IS NULL;


    UPDATE app
    SET csl_restriction_warn_id = cc_warning.id,
        csl_restriction_reason_id = cc_reason.id
    FROM sfa.application app
    INNER JOIN (
        SELECT a.student_id, MAX(a.id) AS max_id
        FROM sfa.application a
        GROUP BY a.student_id
    ) max_app ON app.id = max_app.max_id
    INNER JOIN sfa.student s ON s.id = app.student_id
    INNER JOIN sfa.person p ON p.id = s.person_id
    INNER JOIN sfa.csl_restricted cr ON p.sin = cr.sin 
	LEFT JOIN sfa.csl_code cc_warning ON cc_warning.warning_code = cr.restriction_warn_id AND cc_warning.warning_code IS NOT NULL 
	LEFT JOIN sfa.csl_code cc_reason ON cc_reason.reason_code = cr.restriction_reason_id AND cc_reason.reason_code IS NOT NULL ;

   END
GO


