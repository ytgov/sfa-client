import { Knex } from "knex";
import moment from "moment";
import { min } from 'lodash';
import { AssessmentDTO, ApplicationDTO, DisbursementDTO, StudentDTO, FundingRequestDTO } from "models";
import { AssessmentBaseRepository } from "./assessment-base-repository";
import { ApplicationRepository } from "../application";
import { StudentRepository } from "../student";
import { FundingRequestRepository } from "../funding_request";

export class AssessmentYEA extends AssessmentBaseRepository {

    private applicationRepo: ApplicationRepository;
    private studentRepo: StudentRepository;
    private fundingRepo: FundingRequestRepository;
    private application: Partial<ApplicationDTO> = {};
    private student: Partial<StudentDTO> = {};
    private fundingRequest: Partial<FundingRequestDTO> = {};

    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
        this.applicationRepo = new ApplicationRepository(maindb);
        this.studentRepo = new StudentRepository(maindb);
        this.fundingRepo = new FundingRequestRepository(maindb);
    }

    async getRefreshAssessmentData(
        assessment: AssessmentDTO,
        updated_application: ApplicationDTO,
        disburseAmountList: number[],
        student_id: number,
        application_id: number
    ): Promise<any | undefined> {

        let refreshedData: AssessmentDTO = { ...assessment };

        this.application = await this.applicationRepo.getApplicationById(application_id);
        this.student = await this.studentRepo.getStudentById(student_id);
        this.fundingRequest = await this.fundingRepo.getFundingRequestById(assessment.funding_request_id);
 
        let disbursed_amt = null;

        if (disburseAmountList.length) {
            disbursed_amt = disburseAmountList.reduce((partialSum, a) => partialSum + a, 0);
        }

        const yea_earned = await this.getScalarValue<number>("fn_get_yea_total", [this.student.yukon_id!]);
        console.log("🚀 ~ file: assessment-yea-repository.ts:47 ~ AssessmentYEA ~  yea_earned:",  yea_earned)
        const yea_used = await this.getScalarValue<number>("fn_get_system_yea_used", [student_id]);
        console.log("🚀 ~ file: assessment-yea-repository.ts:49 ~ AssessmentYEA ~  yea_used:",  yea_used)

        const yea_balance = yea_earned - yea_used;
        console.log("🚀 ~ file: assessment-yea-repository.ts:52 ~ AssessmentYEA ~  yea_balance:",  yea_balance)
        const unused_receipts = min([min([(Number(updated_application.yea_tot_receipt_amount) || this.application.yea_tot_receipt_amount || 0), yea_balance]), this.fundingRequest.yea_request_amount])
        console.log("🚀 ~ file: assessment-yea-repository.ts:54 ~ AssessmentYEA ~  unused_receipts:",  unused_receipts)
        const assessed_amount = (unused_receipts || 0) + (disbursed_amt || 0);
        console.log("🚀 ~ file: assessment-yea-repository.ts:56 ~ AssessmentYEA ~  assessed_amount:",  assessed_amount)
        const yea_net_amount = assessed_amount - (disbursed_amt || 0);
        console.log("🚀 ~ file: assessment-yea-repository.ts:58 ~ AssessmentYEA ~  yea_net_amount:",  yea_net_amount)

        refreshedData.previous_disbursement = disbursed_amt || 0;
        refreshedData.classes_end_date = assessment.classes_end_date;
        refreshedData.classes_start_date = assessment.classes_start_date;

        return {
            ...refreshedData,
            read_only_data: {
                yea_net_amount,
                yea_earned,
                unused_receipts,
                yea_used,
                assessed_amount,
                yea_balance,
                previous_disbursement: refreshedData.previous_disbursement
            }
        };
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
            const updateStatusFundingRequest = await this.mainDb("sfa.funding_request")
                .where({ id: insertedAssessment.funding_request_id })
                .update({ status_id: 7 });
        }

        return insertedAssessment || null;
    }

    async updateAssessmentYEA(
        dataAssessment: any,
        updatedApplication: ApplicationDTO,
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
        delete assessmentToUpdate.previous_disbursement;

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
            const updateStatusFundingRequest = await this.mainDb("sfa.funding_request")
                .where({ id: funding_request_id })
                .update({ status_id: 7 });

            // const response: any = await this.mainDb("sfa.application")
            //     .where({ id: updatedApplication.id })
            //     .update({ yea_tot_receipt_amount: updatedApplication.yea_tot_receipt_amount })
        }

        return updatedAssessment || null;
    }

}