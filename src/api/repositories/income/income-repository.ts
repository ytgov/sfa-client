import { Knex } from "knex";
import { BaseRepository } from "../base-repository";

export class IncomeRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }
    
    async getIncomeByType(application_id?: number, types?: Array<number>): Promise<number> { 
        let result = 0;

        if (application_id && types) {
            const query = await this.mainDb
                .count("id", { as: "count"})
                .from("sfa.income")                    
                .whereIn("income_type_id", types)
                .andWhere("application_id", application_id);

            if (Array.isArray(query)) {
                result = query[0].count;
            }
        }
        
        return result;
    }
}