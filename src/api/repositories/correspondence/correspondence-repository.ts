import { Knex } from "knex";
import { BaseRepository } from "../base-repository";
import { StudentRepository } from "../student";
import { CslReasonRepository } from "../csl_reason";
import { BatchParameterRepository } from "../batch_parameter";
import { FundingRequestRepository } from "../funding_request";

export class CorrespondenceRepository extends BaseRepository {

    private studentRepo: StudentRepository;
    private batchParameterRepo: BatchParameterRepository;
    private CslReasonRepo: CslReasonRepository;
    private fundingRequestRepo: FundingRequestRepository;

    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
        this.studentRepo = new StudentRepository(maindb);
        this.batchParameterRepo = new BatchParameterRepository(maindb);
        this.CslReasonRepo = new CslReasonRepository(maindb);
        this.fundingRequestRepo = new FundingRequestRepository(maindb);
    }

    insertCorresBatchParam = (correspondence_id: number, batch_parameter_id: number, parameter_value?: string): void => {
        let insertItem:  Partial<{
            correspondence_id: number,
            batch_parameter_id: number,
            parameter_value: string
        }> = {
            correspondence_id,
            batch_parameter_id
        };

        if (parameter_value) {
            insertItem = {
                correspondence_id,
                batch_parameter_id,
                parameter_value
            };
        }

        this.mainDb("sfa.correspondence_batch_parameter").insert(insertItem);
    };

    async getCorrespondenceTypeId(letter_name?: string): Promise<number> {
        let result = 0;

        if (letter_name) {
            result = await this.getScalarValue<number>("fn_get_correspondence_type_id", [`'${letter_name}'`])
        }

        return result;
    }

    async createCorrespondence(correspondence_type_id?: number, student_id?: number, request_type_id?: number): Promise<number> {
        let result: Partial<{ id: number }> = {};

        if (correspondence_type_id && student_id && request_type_id) {
            const query = await this.mainDb.raw(`EXEC sfa.create_correspondence @correspondence_type_id = ${correspondence_type_id}, @student_id = ${student_id}, @request_type_id = ${request_type_id}`);
            if (Array.isArray(query) && query.length > 0) {
                result = this.singleResult<{ id: number }>(query);
            }
        }

        return result.id ?? 0;
    }
    
    async createLetterParams(correspondence_id?: number, student_id?: number, application_id?: number): Promise<void> {

        const address_select = await this.studentRepo.getAddressText(student_id, application_id);

        const mailAddressSp = await this.studentRepo.getMailAddressSP(student_id, address_select);

        const params_list: Record<string, string | undefined> = {
            saludation_p: mailAddressSp.salut,
            address1_p: mailAddressSp.address1,
            address2_p: mailAddressSp.address2,
            address3_p: mailAddressSp.address3,
            address4_p: mailAddressSp.address4,
            address5_p: mailAddressSp.address5,
        }
        
        for (const key in params_list) {
            const value = params_list[key];
            const batchParamId = await this.batchParameterRepo.getBatchParameterId(value);
            if (correspondence_id && batchParamId) {
                this.insertCorresBatchParam(correspondence_id, batchParamId, value);
            }
        }

        // @todo Insert officer data (this does not exists in the current database).

        // Continue
        const originalSentDateParam = await this.batchParameterRepo.getBatchParameterId("original_sent_date_p");
        if (correspondence_id && originalSentDateParam) {
            this.insertCorresBatchParam(correspondence_id, originalSentDateParam);
        }
    }
    
    async cslNonOrOverawardLetter(letter_name?: string, student_id?: number, funding_request_id?: number, request_type_id?: number, csl_reason_id?: number, application_id?: number): Promise<void> {

        let award_description = "";

        const correspondence_type = await this.getCorrespondenceTypeId(letter_name);

        const current_correspondence = await this.createCorrespondence(correspondence_type, student_id, request_type_id);

        await this.createLetterParams(current_correspondence, student_id, application_id);

        const reason = await this.CslReasonRepo.getCslReasonById(csl_reason_id);

        if (reason) {
            const changeReasonBatchParam = await this.batchParameterRepo.getBatchParameterId("change_reason_p");
            this.insertCorresBatchParam(current_correspondence, changeReasonBatchParam, reason.description);
        }

        if (letter_name === "CSL_Non_Award_ltr") {
            const is_csg_only = await this.fundingRequestRepo.getCsgOnlyFlag(student_id, application_id);

            award_description = is_csg_only ? "Canada Student Loan and Canada Student Grant(s)" : "Canada Student Grant(s)";

            const awardDescriptionBatchParam = await this.batchParameterRepo.getBatchParameterId("award_desc_p");
            this.insertCorresBatchParam(current_correspondence, awardDescriptionBatchParam, award_description.trim());
        }

    }
}