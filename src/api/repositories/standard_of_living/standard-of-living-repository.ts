import { Knex } from "knex";
import { BaseRepository } from "../base-repository";
export class StandardOfLivingRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getStandardLivingAmount(academic_year_id?: number, province_id?: number, family_size?: number): Promise<number> {
        let result = 0;

        if (academic_year_id && province_id && family_size) {
            result = await this.getScalarValue<number>("fn_get_standard_living_amount", [academic_year_id,province_id,family_size]);
        }

        return result;
    }
}