import { Knex } from "knex";
import moment from "moment";
import { AssessmentDTO, ApplicationDTO, DisbursementDTO } from "models";
import { AssessmentBaseRepository } from "./assessment-base-repository";
import { ApplicationRepository } from "../application";

export class AssessmentYukonGrant extends AssessmentBaseRepository {

    private applicationRepo: ApplicationRepository;
    private application: Partial<ApplicationDTO> = {};

    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
        this.applicationRepo = new ApplicationRepository(maindb);
    }
    async getNewInfo(
        application_id: number,
        assessment_id: number,
        disbursementList: DisbursementDTO[],
    ): Promise<AssessmentDTO> {

        let initValues: AssessmentDTO = {};

        this.application = await this.applicationRepo.getApplicationById(application_id);

        initValues.assessed_date = moment().format("YYYY-MM-DD");
        initValues.effective_rate_date = this.application.classes_start_date?.toISOString().slice(0, 10);
        initValues.classes_end_date = this.application.classes_end_date?.toISOString().slice(0, 10);
        initValues.classes_start_date = this.application.classes_start_date?.toISOString().slice(0, 10);

        initValues.allowed_months = moment(initValues.classes_end_date).diff(moment(initValues.classes_start_date), "months");

        initValues.previous_weeks = await this.getScalarValue<number>("fn_get_previous_weeks_yg", [this.application.student_id || 0, application_id]) ?? 0;

        initValues.assessed_weeks = await this.getScalarValue<number>("fn_get_allowed_weeks", [
            `'${moment(initValues.classes_start_date).format("YYYY-MM-DD")}'`,
            `'${moment(initValues.classes_end_date).format("YYYY-MM-DD")}'`
        ]) || 0;

        if ((initValues.previous_weeks + initValues.assessed_weeks) > 170) {
            initValues.weeks_allowed = 170 - initValues.previous_weeks;
        } else {
            initValues.weeks_allowed = initValues.assessed_weeks;
        }

        initValues.home_city_id = await this.getScalarValue<number>("fn_get_home_city", [this.application.student_id || 0]);

        initValues.destination_city_id = await this.getScalarValue<number>("fn_get_institution_city", [application_id]);

        initValues.travel_allowance = await this.getScalarValue<number>("fn_get_travel_allowance", [
            initValues.home_city_id || 0,
            initValues.destination_city_id || 0
        ]) || 0;

        initValues.airfare_amount = await this.getScalarValue<number>("fn_get_airfare_amount", [
            initValues.home_city_id || 0,
            initValues.destination_city_id || 0
        ]) || 0;

        const yg_cost = await this.mainDb.raw(
            `SELECT * FROM sfa.fn_get_yg_cost (
                        ${this.application.program_division || 0}, 
                        ${this.application.academic_year_id || 0}, 
                        100
                    );
                    `
        );

        initValues.living_costs = yg_cost?.living ?? 0;
        initValues.allowed_tuition = yg_cost?.tuition ?? 0;
        initValues.allowed_books = yg_cost?.book ?? 0;

        initValues.weekly_amount = await this.getScalarValue<number>("fn_get_weekly_amount", [application_id]) || 0;

        const disburse_required = await this.getScalarValue<number>("fn_disbursments_required", [
            application_id,
            assessment_id || 0,
            "NULL",
        ]);

        let disbursed_amt = null;

        if (disbursementList?.length) {
            let disbursedAmounts = disbursementList.map((d) => {
                return Number(d.disbursed_amount) ?? 0;
            });

            disbursed_amt = disbursedAmounts.reduce((a, b) => a + b, 0);
        }

        if (disbursed_amt) {
            initValues.previous_disbursement = disbursed_amt;

            if (disburse_required > 0 && disburse_required < 1) {
                initValues.disbursements_required = 1;
            } else {
                initValues.disbursements_required = Math.floor(disburse_required);
            }
        } else {
            initValues.previous_disbursement = 0;
            initValues.disbursements_required = Math.floor(disburse_required);
        }

        initValues.over_award = 0;
        initValues.assessment_adj_amount = 0;
        initValues.over_award_disbursement_period = 0;
        initValues.years_funded_equivalent = undefined;
        initValues.over_award_applied_flg = 'No';
        initValues.air_travel_disbursement_period = undefined;

        initValues.assessed_amount = await this.getScalarValue<number>("fn_get_total", [
            String(initValues.disbursements_required),
            this.application.academic_year_id || 0,
            String(initValues.living_costs),
            String(initValues.allowed_tuition),
            String(initValues.allowed_books),
            String(initValues.travel_allowance),
            String(initValues.airfare_amount),
            String(initValues.weekly_amount),
            String(initValues.weeks_allowed),
            String(initValues.assessment_adj_amount || 0),
        ]);

        initValues.pre_leg_amount = await this.getScalarValue<number>("fn_get_old_total", [
            String(initValues.disbursements_required),
            String(this.application.academic_year_id),
            String(initValues.living_costs),
            String(initValues.allowed_tuition),
            String(initValues.allowed_books),
            String(initValues.travel_allowance),
            String(initValues.airfare_amount)
        ]);

        initValues.net_amount = ((initValues.assessed_amount || 0) - (initValues.previous_disbursement || 0) - (initValues.over_award || 0));

        initValues.years_funded = await this.getScalarValue<number>("fn_get_total_funded_years", [this.application.student_id || 0, application_id]);

        return initValues;
    }

    async getRefreshAssessmentData(
        assessment: AssessmentDTO,
        disburseAmountList: number[],
        student_id: number,
        application_id: number,
        program_division: number,

    ): Promise<AssessmentDTO | undefined> {
        let refrehData: AssessmentDTO = { ...assessment };

        this.application = await this.applicationRepo.getApplicationById(application_id);

        refrehData.classes_end_date = assessment.classes_end_date?.toString().slice(0, 10);
        refrehData.classes_start_date = assessment.classes_start_date?.toString().slice(0, 10);
        refrehData.allowed_months = moment(refrehData.classes_end_date).diff(moment(refrehData.classes_start_date), "months");
        refrehData.assessed_weeks = await this.getScalarValue<number>("fn_get_allowed_weeks", [
            `'${moment(refrehData.classes_start_date).format("YYYY-MM-DD")}'`,
            `'${moment(refrehData.classes_end_date).format("YYYY-MM-DD")}'`
        ]);

        if (((refrehData?.previous_weeks || 0) + (refrehData?.assessed_weeks || 0)) > 170) {
            refrehData.weeks_allowed = 170 - (refrehData?.previous_weeks || 0);
        } else {
            refrehData.weeks_allowed = refrehData.assessed_weeks;
        }

        refrehData.travel_allowance = await this.getScalarValue<number>("fn_get_travel_allowance", [
            assessment.home_city_id || 0,
            assessment.destination_city_id || 0
        ]);

        refrehData.airfare_amount = await this.getScalarValue<number>("fn_get_airfare_amount", [
            assessment.home_city_id || 0,
            assessment.destination_city_id || 0
        ]);

        const disburse_required = await this.getScalarValue<number>("fn_disbursments_required", [
            application_id,
            assessment?.id || 0,
            program_division || 0,
        ]);

        let disbursed_amt = null;

        if (disburseAmountList.length) {
            disbursed_amt = disburseAmountList.reduce((partialSum, a) => partialSum + a, 0);
        }

        if (disbursed_amt) {
            refrehData.previous_disbursement = disbursed_amt;

            if (disburse_required > 0 && disburse_required < 1) {
                refrehData.disbursements_required = 1;
            } else {
                refrehData.disbursements_required = Math.floor(disburse_required);
            }
        } else {
            refrehData.previous_disbursement = 0;
            refrehData.disbursements_required = Math.floor(disburse_required);
        }

        disburse_required

        refrehData.assessed_amount = await this.getScalarValue<number>("fn_get_total", [
            refrehData.disbursements_required || 0,
            this.application.academic_year_id || 0,
            String(refrehData.living_costs),
            String(refrehData.allowed_tuition),
            String(refrehData.allowed_books),
            String(refrehData.travel_allowance),
            String(refrehData.airfare_amount),
            String(refrehData.weekly_amount),
            String(refrehData.weeks_allowed),
            String(refrehData.assessment_adj_amount || 0),
        ]);

        refrehData.pre_leg_amount = await this.getScalarValue<number>("fn_get_old_total", [
            refrehData.disbursements_required || 0,
            String(this.application.academic_year_id),
            String(assessment.living_costs),
            String(assessment.allowed_tuition),
            String(assessment.allowed_books),
            String(assessment.travel_allowance),
            String(assessment.airfare_amount)
        ]);

        refrehData.net_amount = ((refrehData.assessed_amount || 0) - (refrehData.previous_disbursement || 0) - (refrehData.over_award || 0));

        refrehData.years_funded = await this.getScalarValue<number>("fn_get_total_funded_years", [student_id, application_id]);

        return refrehData;
    }
    /* If an assessment does not exists, save the assessment and then save the disburse list */
    async saveAssessmentYG(
        dataAssessment: any,
        disbursementList: DisbursementDTO[],
    ): Promise<any> {



        const assessmentToInsert: any = { ...dataAssessment };

        //removing fields that are not in sfa.assessment
        delete assessmentToInsert.read_only_data;
        delete assessmentToInsert.id;
        delete assessmentToInsert.assessment_id;
        delete assessmentToInsert.program_division;

        const insertedAssessment: any = await this.mainDb("sfa.assessment")
            .insert({ ...assessmentToInsert })
            .returning("*");

        if (insertedAssessment?.id && disbursementList.length) {
            // Insert the disbursement list
            for (const item of disbursementList) {
                const resInsert = await this.mainDb("sfa.disbursement")
                    .insert({
                        assessment_id: insertedAssessment.id,
                        funding_request_id: insertedAssessment.funding_request_id,
                        disbursement_type_id: item.disbursement_type_id,
                        disbursed_amount: item.disbursed_amount,
                        due_date: item.due_date,
                        tax_year: item.tax_year,
                        issue_date: item.issue_date,
                        transaction_number: item.transaction_number,
                        change_reason_id: item.change_reason_id,
                        financial_batch_id: item.financial_batch_id,
                    })
                    .returning("*");
            }
        }

        return insertedAssessment || null;
    }

    async updateAssessmentYG(
        dataAssessment: any,
        disbursementList: DisbursementDTO[],
        assessment_id: number,
        funding_request_id: number,
    ): Promise<any> {

        const assessmentToUpdate: any = { ...dataAssessment };

        //removing fields that are not in sfa.assessment
        delete assessmentToUpdate.read_only_data;
        delete assessmentToUpdate.assessment_id;
        delete assessmentToUpdate.id;
        delete assessmentToUpdate.funding_request_id;
        delete assessmentToUpdate.program_division;
        delete assessmentToUpdate.yea_used;
        delete assessmentToUpdate.yea_earned;
        delete assessmentToUpdate.yea_balance;
        delete assessmentToUpdate.yea_net_amount;
        delete assessmentToUpdate.unused_receipts;

        const updatedAssessment: any = await this.mainDb("sfa.assessment")
            .where({ id: assessment_id })
            .update({ ...assessmentToUpdate })
        if (disbursementList.length) {
            // Insert the disbursement list
            for (const item of disbursementList) {

                if (item?.id && (item?.assessment_id === assessment_id)
                    && (item?.funding_request_id === funding_request_id)) {
                    const resUpdate = await this.mainDb("sfa.disbursement")
                        .update({
                            disbursement_type_id: item.disbursement_type_id,
                            disbursed_amount: item.disbursed_amount,
                            due_date: item.due_date,
                            tax_year: item.tax_year,
                            issue_date: item.issue_date,
                            transaction_number: item.transaction_number,
                            change_reason_id: item.change_reason_id,
                            financial_batch_id: item.financial_batch_id,
                        })
                        .where({ id: item.id });
                } else {
                    const resInsert: any = await this.mainDb("sfa.disbursement")
                        .insert({
                            assessment_id: assessment_id,
                            funding_request_id: funding_request_id,
                            disbursement_type_id: item.disbursement_type_id,
                            disbursed_amount: item.disbursed_amount,
                            due_date: item.due_date,
                            tax_year: item.tax_year,
                            issue_date: item.issue_date,
                            transaction_number: item.transaction_number,
                            change_reason_id: item.change_reason_id,
                            financial_batch_id: item.financial_batch_id,
                        })
                        .returning("*");
                }
            }
        }

        return updatedAssessment || null;
    }

    async createDisburse(
        application_id: number,
        dataAssessment: AssessmentDTO,
        disbursementList: DisbursementDTO[],
        funding_request_id: number,
        program_division: number,
    ): Promise<any> {

        try {
            const assessment: AssessmentDTO = { ...dataAssessment };
            const newDisbursement: DisbursementDTO = {};
            this.application = await this.applicationRepo.getApplicationById(application_id);

            if (
                (
                    (
                        !assessment.air_travel_disbursement_period
                        && (!assessment.travel_allowance)
                        && (!assessment.airfare_amount)
                    )
                    || ((assessment.air_travel_disbursement_period || 0) <= (assessment.disbursements_required || 0))
                    || (!assessment.disbursements_required)
                )
                &&
                (
                    (
                        !assessment.over_award_disbursement_period
                        && (!assessment.over_award)
                        && (assessment.over_award_applied_flg === 'No')
                    ) // NO AIR TRAVEL
                    || ((assessment.air_travel_disbursement_period || 0) <= (assessment.disbursements_required || 0))
                    || (assessment.disbursements_required === 0)
                )
                &&
                (
                    (assessment?.years_funded_equivalent && (this.application.academic_year_id || 0) < 2016)
                    || (this.application.academic_year_id || 0) < 2016
                )
            ) {

            }
        } catch (error) {

        }

    }

}