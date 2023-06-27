import { Knex } from "knex";
import { BaseRepository } from "../base-repository";

export class ChildCareCeilingRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getChildCare(academic_year_id?: number, province_id?: number): Promise<number> {
        let result = 0;

        if (academic_year_id && province_id) {
            result = await this.getScalarValue<number>("fn_get_child_care", [academic_year_id, province_id]);
        }

        return result;
    }
}