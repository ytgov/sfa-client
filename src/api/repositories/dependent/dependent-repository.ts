import { Knex } from "knex";
import { BaseRepository } from "../base-repository";

export class DependentRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }
    
    async getCslDependentCount(application_id?: number): Promise<number> {
        
        let result: number = 0;

        if (application_id) {
            result = await this.getScalarValue<number>("fn_get_csl_dependent_count", [application_id]);
        }

        return result;
    }
}