import { Knex } from "knex";
import { BaseRepository } from "../base-repository";

export class InvestmentRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getInvestmentTotalAmount(application_id?: number, ownership_id?: number, is_rrsp?: boolean): Promise<number> {
        let result = 0;

        if (application_id && ownership_id) {
            const rrsp_param = is_rrsp !== undefined ? (is_rrsp ? 1 : 0) : 0;
            result = await this.getScalarValue<number>("fn_get_investment_total_amount", [application_id, ownership_id, rrsp_param]);
        }

        return result;
    }
}