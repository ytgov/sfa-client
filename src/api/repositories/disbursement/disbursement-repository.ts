import { Knex } from "knex";
import { BaseRepository } from "../base-repository";

export class DisbursementRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getTotalGrantAmount(application_id?: number): Promise<number> { 
        let result = 0;

        if (application_id) {
            result = await this.getScalarValue<number>("fn_get_total_grant_amount", [application_id]);
        }

        return result;
    }

    async getGrantAmount(application_id?: number, request_type_id?: number): Promise<number> {
        let result = 0;

        if (application_id && request_type_id) {
            result = await this.getScalarValue<number>("fn_get_grant_amount", [application_id, request_type_id]);
        }

        return result;
    }

    async getDisbursedAmount(funding_request_id?: number, assessment_id?: number): Promise<number> {
        let result = 0;

        if (funding_request_id && assessment_id) {
            result = await this.getScalarValue<number>("fn_get_disbursed_amount_fct", [funding_request_id, assessment_id]);
        }

        return result;
    }

    async getPreviousDisbursedAmount(funding_request_id?: number, assessment_id?: number): Promise<number> {
        let result = 0;

        if (funding_request_id && assessment_id) {
            result = await this.getScalarValue<number>("fn_get_previous_disbursed_amount", [funding_request_id, assessment_id]);
        }

        return result;
    }

    async getMaxTransaction(funding_request_id?: number): Promise<number> {
        let result = 0;

        if (funding_request_id) {
            result = await this.getScalarValue<number>("fn_get_disbursement_max_transaction", [funding_request_id]);
        }

        return result;
    }

    async getNextTransactionSequenceValue(): Promise<number> {
        const query = await this.mainDb.raw("SELECT NEXT VALUE FOR sfa.CSL_TRANSACTION_SEQ as nextVal;");
        const result: Partial<{ nextVal?: number }> = this.singleResult(query);
        return result.nextVal ?? 0;
    }
}