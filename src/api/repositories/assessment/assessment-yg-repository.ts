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

    async getRefreshAssessmentData(
        assessment: AssessmentDTO,
        disburseAmountList: number[],
        student_id: number,
        application_id: number,

    ): Promise<AssessmentDTO | undefined> {

        let refrehData: AssessmentDTO = { ...assessment };

        this.application = await this.applicationRepo.getApplicationById(application_id);

        refrehData.classes_end_date = assessment.classes_end_date;
        refrehData.classes_start_date = assessment.classes_start_date;
        refrehData.allowed_months = moment(refrehData.classes_end_date).diff(moment(refrehData.classes_start_date), "months");
        refrehData.previous_weeks = await this.getScalarValue<number>("fn_get_previous_weeks_yg", [student_id, application_id]);
        refrehData.assessed_weeks = await this.getScalarValue<number>("fn_get_allowed_weeks", [
            `'${moment(refrehData.classes_start_date).format("YYYY-MM-DD")}'`,
            `'${moment(refrehData.classes_end_date).format("YYYY-MM-DD")}'`

        ]);

        if ((refrehData.previous_weeks + refrehData.assessed_weeks) > 170) {
            refrehData.weeks_allowed = 170 - refrehData.previous_weeks;
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

        refrehData.weekly_amount = await this.getScalarValue<number>("fn_get_weekly_amount", [application_id]) || 0;

        const disburse_required = await this.getScalarValue<number>("fn_disbursments_required", [
            application_id,
            assessment.id || 0]);

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

        refrehData.assessed_amount = await this.getScalarValue<number>("fn_get_total", [
            String(refrehData.disbursements_required),
            this.application.academic_year_id || 0,
            String(refrehData.living_costs),
            String(refrehData.allowed_tuition),
            String(refrehData.allowed_books),
            String(refrehData.travel_allowance),
            String(refrehData.airfare_amount),
            String(refrehData.weekly_amount),
            String(refrehData.weeks_allowed),
            String(refrehData.id || 0),
        ]);

        refrehData.pre_leg_amount = await this.getScalarValue<number>("fn_get_old_total", [
            String(assessment.disbursements_required),
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

}