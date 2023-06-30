import { Knex } from "knex";
import { BaseRepository } from "../base-repository";

export class FieldProgramRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }
    
    async getFieldProgramCode(study_area_id?: number, program_id?: number): Promise<number> { 
        let result = 0;

        if (study_area_id && program_id) {
            result = await this.getScalarValue<number>("fn_get_field_program_code", [study_area_id, program_id]);
        }

        return result;
    }
}