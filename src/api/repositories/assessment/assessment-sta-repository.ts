import { Knex } from "knex";
import moment from "moment";
import { AssessmentBaseRepository } from "./assessment-base-repository";
import { ApplicationRepository } from "../application";
import {
    ApplicationDTO,
    assessmentColumns,
    AssessmentDTO,
    DisbursementDTO,
    AssessmentTable,
} from "../../models";

export class AssessmentSTA extends AssessmentBaseRepository {

    private applicationRepo: ApplicationRepository;
    private application: Partial<ApplicationDTO> = {};

    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
        this.applicationRepo = new ApplicationRepository(maindb);
    }

    getAssessmentTable(assessment: AssessmentDTO): AssessmentTable {
        return Object.keys(assessment)
            .filter(key => assessmentColumns.includes(key as keyof AssessmentTable))
            .reduce((obj: any, key) => {
                obj[key as keyof AssessmentTable] = assessment[key as keyof AssessmentTable];
                return obj as AssessmentTable;
            }, {});
    }

    async getNewInfo(
        application_id: number,
        funding_request_id: number,
        assessment_id: number,
        disbursementList: DisbursementDTO[],
    ): Promise<AssessmentDTO> {

        let initValues: AssessmentDTO = {};

        this.application = await this.applicationRepo.getApplicationById(application_id);

        initValues.funding_request_id = funding_request_id;
        initValues.assessed_date = moment().toDate();
        initValues.effective_rate_date = this.application.classes_start_date;
        initValues.classes_start_date = this.application.classes_start_date;
        initValues.classes_end_date = this.application.classes_end_date;
        initValues.home_city_id = await this.getScalarValue<number>("fn_get_home_city", [this.application.student_id || 0]);
        initValues.destination_city_id = await this.getScalarValue<number>("fn_get_institution_city", [application_id]);
        initValues.dependent_count = await this.getScalarValue<number>("fn_get_dependent_count_sta_fct", [application_id]);
        initValues.second_residence_rate = this.application.is_two_residence
            ? await this.getScalarValue<number>("fn_get_second_residence_sta", [application_id])
            : 0;
        initValues.travel_allowance = await this.getScalarValue<number>("fn_get_travel_allowance", [
            initValues.home_city_id || 0,
            initValues.destination_city_id || 0
        ]);
        initValues.weekly_amount = await this.getScalarValue<number>("fn_get_weekly_amount_sta", [application_id]);

        if (disbursementList.length) {
            let disbursedAmounts = disbursementList.map((d) => {
                return d.disbursed_amount ?? 0;
            });
            initValues.previous_disbursement = disbursedAmounts.reduce((a, b) => a + b, 0);
        } else {
            initValues.previous_disbursement = await this.getScalarValue<number>("fn_get_disbursed_amount_fct", [
                funding_request_id,
                assessment_id // assessment_id
            ]);
        }
        initValues.assessment_type_id = 1;
        initValues.years_funded = await this.getScalarValue<number>("fn_get_total_funded_years", [this.application.student_id || 0, application_id]);
        initValues.disbursements_required = 1; // always is 1
        initValues.previous_weeks = await this.getScalarValue<number>("fn_get_previous_weeks_sfa", [
            "'Normal'",
            this.application.student_id || 0,
            this.application.id || 0

        ]);
        initValues.assessed_weeks = await this.getScalarValue<number>("fn_get_allowed_weeks", [
            `'${moment(this.application.classes_start_date).format("YYYY-MM-DD")}'`,
            `'${moment(this.application.classes_end_date).format("YYYY-MM-DD")}'`
        ]);

        let prev_weeks_curr_yr = await this.getScalarValue<number>("fn_get_prev_weeks_curr_year_sta", [
            `'Normal'`,
            application_id
        ]);

        initValues.weeks_allowed = await this.getScalarValue<number>("fn_get_weeks_allowed_sta", [
            initValues.previous_weeks || 0,
            initValues.assessed_weeks || 0,
            prev_weeks_curr_yr || 0 // prev_weeks_curr_yr nvl(GET_PREV_WEEKS_CURR_YR('Normal'),0)
        ]);
        initValues.previous_upgrade_weeks = await this.getScalarValue<number>("fn_get_previous_weeks_sfa", [
            "'Upgrade'",
            this.application.student_id || 0,
            this.application.id || 0
        ]);
        initValues.assessed_amount = (((initValues.weekly_amount + initValues.second_residence_rate) * initValues.weeks_allowed) + initValues.travel_allowance);

        initValues.net_amount = await this.getScalarValue<number>("fn_get_net_sta", [
            initValues.assessed_amount ?? 0,
            initValues.previous_disbursement ?? 0,
        ]);

        return initValues;
    }

    async getAssessInfo(
        application_id: number,
        funding_request_id: number,
        assessment: AssessmentDTO,
    ): Promise<AssessmentDTO> {

        let values: Partial<AssessmentDTO> = { ...assessment };

        values.previous_disbursement = await this.getScalarValue<number>("fn_get_disbursed_amount_fct", [
            funding_request_id,
            values.id || 0 // assessment_id because is a preview
        ]);

        values.net_amount = await this.getScalarValue<number>("fn_get_net_sta", [
            values.assessed_amount ?? 0,
            values.previous_disbursement ?? 0,
        ]);

        values.years_funded = await this.getScalarValue<number>("fn_get_total_funded_years", [this.application.student_id || 0, application_id]);

        values.previous_weeks = await this.getScalarValue<number>("fn_get_previous_weeks_sfa", [
            "'Normal'",
            this.application.student_id || 0,
            this.application.id || 0

        ]);
        values.assessed_weeks = await this.getScalarValue<number>("fn_get_allowed_weeks", [
            `'${moment(values.classes_start_date).format("YYYY-MM-DD")}'`,
            `'${moment(values.classes_end_date).format("YYYY-MM-DD")}'`
        ]);
        values.previous_upgrade_weeks = await this.getScalarValue<number>("fn_get_previous_weeks_sfa", [
            "'Upgrade'",
            this.application.student_id || 0,
            this.application.id || 0
        ]);

        return values;
    }

    async refreshAssessmentData(
        assessment: AssessmentDTO,
        disbursementList: DisbursementDTO[],
        application_id: number,
    ): Promise<AssessmentDTO> {

        let refreshData: AssessmentDTO = { ...assessment };

        this.application = await this.applicationRepo.getApplicationById(application_id);

        refreshData.second_residence_rate = this.application.is_two_residence
            ? await this.getScalarValue<number>("fn_get_second_residence_sta", [application_id])
            : 0;
        refreshData.travel_allowance = await this.getScalarValue<number>("fn_get_travel_allowance", [
            refreshData.home_city_id || 0,
            refreshData.destination_city_id || 0
        ]);
        refreshData.weekly_amount = await this.getScalarValue<number>("fn_get_weekly_amount_sta", [application_id]);

        refreshData.assessed_amount = await this.getScalarValue<number>("fn_get_other_inst_total_sta", [
            refreshData.weekly_amount || 0,
            refreshData.second_residence_rate,
            0, // initValues.entitlement_days
            refreshData.travel_allowance
        ]);

        if (disbursementList.length) {
            let disbursedAmounts = disbursementList.map((d) => {
                return d.disbursed_amount ?? 0;
            });
            refreshData.previous_disbursement = disbursedAmounts.reduce((a, b) => a + b, 0);
        } else {
            refreshData.previous_disbursement = 0;
        }

        refreshData.years_funded = await this.getScalarValue<number>("fn_get_total_funded_years", [this.application.student_id || 0, application_id]);
        refreshData.disbursements_required = 1; // always is 1
        refreshData.previous_weeks = await this.getScalarValue<number>("fn_get_previous_weeks_sfa", [
            "'Normal'",
            this.application.student_id || 0,
            this.application.id || 0

        ]);
        refreshData.assessed_weeks = await this.getScalarValue<number>("fn_get_allowed_weeks", [
            `'${moment(refreshData.classes_start_date).format("YYYY-MM-DD")}'`,
            `'${moment(refreshData.classes_end_date).format("YYYY-MM-DD")}'`
        ]);

        let prev_weeks_curr_yr = await this.getScalarValue<number>("fn_get_prev_weeks_curr_year_sta", [
            `'Normal'`,
            application_id
        ]);


        refreshData.weeks_allowed = await this.getScalarValue<number>("fn_get_weeks_allowed_sta", [
            refreshData.previous_weeks || 0,
            refreshData.assessed_weeks || 0,
            prev_weeks_curr_yr || 0 // prev_weeks_curr_yr
        ]);
        refreshData.previous_upgrade_weeks = await this.getScalarValue<number>("fn_get_previous_weeks_sfa", [
            "'Upgrade'",
            this.application.student_id || 0,
            this.application.id || 0
        ]);

        refreshData.assessed_amount = (((refreshData.weekly_amount + refreshData.second_residence_rate) * refreshData.weeks_allowed) + refreshData.travel_allowance);

        refreshData.net_amount = await this.getScalarValue<number>("fn_get_net_sta", [
            refreshData.assessed_amount ?? 0,
            refreshData.previous_disbursement ?? 0,
        ]);

        return refreshData;
    }

    async disburseAssessment(
        assessmentInfo: AssessmentDTO,
    ): Promise<DisbursementDTO> {

        let assessment: AssessmentDTO = { ...assessmentInfo };
        const disbursement: DisbursementDTO = {};
        let v_amount_remaining: number;
        let v_weeks_before_issue: number;

        let v_due_date:any = disbursement.issue_date; //CURRENT DATE
/*

        if (assessmentInfo?.net_amount && assessmentInfo.net_amount >= 0) {
            v_amount_remaining = assessmentInfo.net_amount ?? 0;
            const disbursements_allowed = await this.getScalarValue<number>("fn_get_disbursements_allowed_sta", [
                "'Upgrade'",
                this.application.institution_campus_id || 0,
                assessmentInfo.id ?? 0
            ]);
            for (let i = 1; i <= disbursements_allowed; i++) {
                disbursement.assessment_id = assessmentInfo.id;
                disbursement.funding_request_id = assessmentInfo.funding_request_id;
                
                if (!disbursement?.financial_batch_id) {
                    //if (:system.cursor_record = '1' AND :disbursement.disbursed_amount IS NULL) {
                    if (i === 1 && !disbursement?.disbursed_amount) {
                        // de donde sale issue_date de este disbursemente
                        v_weeks_before_issue = Math.ceil(moment(disbursement.issue_date?.toString().slice(0, 10) || assessmentInfo.effective_rate_date?.toString().slice(0, 10)).diff(assessmentInfo.effective_rate_date?.toString().slice(0, 10), "weeks"));
                        
                        disbursement.disbursed_amount = (assessmentInfo.weekly_amount ?? 0) * v_weeks_before_issue + (assessmentInfo.travel_allowance ?? 0);
                        disbursement.due_date = disbursement.issue_date;
                        disbursement.tax_year = parseInt(disbursement.due_date?.toString().slice(0, 4)|| "0") || undefined;
                    } else if(!disbursement?.due_date && disbursement?.issue_date) {
                        //IF (:system.LAST_RECORD = 'TRUE') THEN
                        //:disbursement.disbursed_amount := v_amount_remaining;
                        if (i === disbursements_allowed) { 
                            disbursement.disbursed_amount = v_amount_remaining;
                        } else {
                            disbursement.disbursed_amount = (assessmentInfo.weekly_amount || 0) * 2;
                        }
                    } else {
                        disbursement.disbursed_amount = undefined;
                        disbursement.issue_date = undefined;
                        v_due_date = moment(v_due_date).add(14, "days") ;
                        disbursement.due_date = v_due_date;
                        disbursement.tax_year = parseInt(v_due_date?.toString().slice(0, 4)|| "0") || undefined;
                    }

                    disbursement.paid_amount = disbursement.disbursed_amount;
					v_amount_remaining = v_amount_remaining - (disbursement.paid_amount ?? 0);
                }

                if((assessmentInfo.net_amount ?? 0) >= 0) {
				    disbursement.disbursement_type_id = 1;
                }
            }   
        } else {
            if (disbursement?.financial_batch_id) {
				//LAST_RECORD;
				//CREATE_RECORD;
            }

			disbursement.disbursed_amount = assessmentInfo.net_amount;
			disbursement.paid_amount = disbursement.disbursed_amount;
        }

        if (assessmentInfo?.funding_request_id && assessmentInfo?.id) {
            
            const updateStatusFundingRequest = await this.mainDb("sfa.funding_request")
                .where({ id: assessmentInfo.funding_request_id })
                .update({ 
                    status_id: 7,
                    status_date: moment().format("YYYY-MM-DD"),
                });
        }

		assessmentInfo.previous_disbursement = await this.getScalarValue<number>("fn_get_disbursed_amount_fct", [
            assessmentInfo.funding_request_id || 0,
            assessmentInfo.id || 0 // assessment_id because is a preview
        ]) ?? 0;
        
		assessmentInfo.net_amount = await this.getScalarValue<number>("fn_get_net_sta", [
            assessmentInfo.assessed_amount ?? 0,
            assessmentInfo.previous_disbursement ?? 0,
        ]) ?? 0;*/

        // desde aqui
        disbursement.assessment_id = assessment.id;
        disbursement.funding_request_id = assessment.funding_request_id;
        disbursement.issue_date = moment().format("YYYY-MM-DD");
        disbursement.disbursed_amount = (assessment.net_amount ?? 0);
        disbursement.paid_amount = (assessment.net_amount ?? 0);

        if (assessment.net_amount !== undefined && assessment.net_amount >= 0) {
            disbursement.disbursement_type_id = 1;
        }
    /*
        UPDATE funding_request
	    SET status_id = 7, status_date = trunc(sysdate)
  	    WHERE funding_request_id = :assessment.funding_quest_id; // SOLO CUANDO HACEMOS SAVE CAMBIA A STATUS = 7
        //:GLOBAL.update_status := 1; OMITIDO POR EL MOMENTO
        */

        return disbursement;
    }

    async saveAssessment(
        assessment_id: number,
        assessment: AssessmentDTO,
        disbursementList: DisbursementDTO[],
    ): Promise<AssessmentDTO[] | undefined> {

        try {
            const assessInfo: AssessmentDTO[] = await this.updateAssessment(assessment_id, assessment);

            for (const disburse of disbursementList) {
                if (disburse?.id) {
                    await this.updateDisbursements(disburse);
                } else {
                    disburse.assessment_id = assessment_id;
                    disburse.funding_request_id = assessment.funding_request_id;
                    await this.insertDisbursements(disburse);
                }
            }

            return assessInfo;
        } catch (error) {
            return undefined;
        }
    }

    async newAssessment(
        assessment: AssessmentDTO,
        disbursementList: DisbursementDTO[],
    ): Promise<AssessmentDTO[] | undefined> {

        try {
            const assessInfo: AssessmentDTO[] = await this.insertAssessment(assessment);

            for (const disburse of disbursementList) {
                if (disburse?.id) {
                    await this.updateDisbursements(disburse);
                } else if (assessInfo?.[0]?.id) {
                    disburse.assessment_id = assessInfo[0].id;
                    disburse.funding_request_id = assessment.funding_request_id;
                    await this.insertDisbursements(disburse);
                }
            }

            return assessInfo;
        } catch (error) {
            return undefined;
        }
    }

    async insertAssessment(assessment: AssessmentDTO): Promise<any[]> {
        const filtered = this.getAssessmentTable(assessment);
        return this.mainDb(this.mainTable).insert(filtered).returning("*");
    }

    async updateAssessment(id: number, assessment: AssessmentDTO): Promise<any[]> {
        const filtered = this.getAssessmentTable(assessment);
        return this.mainDb(this.mainTable)
            .update(filtered)
            .where({
                id: id
            })
            .returning("*");
    }

    async insertDisbursements(disbursement: DisbursementDTO | any): Promise<any[]> {
        delete disbursement?.issue_date_menu;
        delete disbursement?.due_date_menu;
        return this.mainDb("sfa.disbursement").insert(disbursement).returning("*");
    }
    async updateDisbursements(disbursement: DisbursementDTO | any): Promise<any[]> {
        const id = disbursement.id;
        delete disbursement.id;
        delete disbursement?.issue_date_menu;
        delete disbursement?.due_date_menu;
        return this.mainDb("sfa.disbursement").where({ id }).update(disbursement);
    }

}