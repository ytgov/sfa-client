import { Knex } from "knex";
import { BaseRepository } from "../base-repository";

export class StudentContributionRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getStudentContribution(academic_year_id?: number, province_id?: number, student_category_id?: number, period?: number): Promise<number> {
        let result = 0;

        if (academic_year_id && province_id && period) {
            const paramCatId = student_category_id === undefined ? "NULL" : student_category_id
            result = await this.getScalarValue<number>("fn_get_student_contribution", [academic_year_id, province_id, paramCatId, period]);
        }

        return result;
    }
}