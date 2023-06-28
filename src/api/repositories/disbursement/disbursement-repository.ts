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
}