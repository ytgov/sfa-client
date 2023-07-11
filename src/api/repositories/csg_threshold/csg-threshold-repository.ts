import { Knex } from "knex";
import { BaseRepository } from "../base-repository";

export class CsgThresholdRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getIncomeThresholdAmount(academic_year_id?: number, family_size?: number): Promise<number> {
        let result = 0;

        if (academic_year_id && family_size) {
            result = await this.getScalarValue<number>("fn_get_income_threshold_amount", [academic_year_id, family_size]);
        }

        return result;
    }
}