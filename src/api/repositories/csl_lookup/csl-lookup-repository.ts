import { Knex } from "knex";
import { BaseRepository } from "../base-repository";

export class CslLookupRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getMaxBooks(academic_year_id?: number): Promise<number> {
        
        let result: number = 0;

        if (academic_year_id) {
            result = await this.getScalarValue<number>("fn_get_max_books", [academic_year_id]);
        }

        return result;
    }

    async getMaxDiscretionary(academic_year_id?: number): Promise<number> {
        let result = 0;

        if (academic_year_id) {
            result = await this.getScalarValue<number>("fn_get_max_discretionary", [academic_year_id]);
        }

        return result;
    }
}