import { Knex } from "knex";
import { BaseRepository } from "../base-repository";

export class StudentLivingAllowanceRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getShelterFoodMisc(academic_year_id?: number, province_id?: number, student_category_id?: number): Promise<number> {
        let result = 0;

        if (academic_year_id && province_id) {
            const paramCatId = student_category_id === undefined ? "NULL" : student_category_id
            result = await this.getScalarValue<number>("fn_get_shelter_food_misc", [academic_year_id, province_id, paramCatId]);
        }

        return result;
    }

    async getPublicTransportaion(academic_year_id?: number, province_id?: number, student_category_id?: number): Promise<number> {
        let result = 0;

        if (academic_year_id && province_id) {
            const paramCatId = student_category_id === undefined ? "NULL" : student_category_id
            result = await this.getScalarValue<number>("fn_get_public_transportation", [academic_year_id, province_id, paramCatId]);
        }

        return result;
    }

    async getShelterAmount(academic_year_id?: number, province_id?: number, student_category_id?: number): Promise<number> {
        let result = 0;

        if (academic_year_id && province_id) {
            const paramCatId = student_category_id === undefined ? "NULL" : student_category_id
            result = await this.getScalarValue<number>("fn_get_shelter_amount", [academic_year_id, province_id, paramCatId]);
        }

        return result;
    }
}