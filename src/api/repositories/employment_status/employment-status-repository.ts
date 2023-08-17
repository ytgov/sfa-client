import { Knex } from "knex";
import { BaseRepository } from "../base-repository";

export class EmploymentStatusRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }
    
    async isEmployed(employment_status_id?: number): Promise<boolean> { 
        let result = false;

        if (employment_status_id) {
            const query = await this.mainDb
                .count("id", { as: "count"})
                .from("sfa.prestudy_employment_status")
                .where("id", 4)                    
                .andWhere("id", employment_status_id);

            if (Array.isArray(query)) {
                result = query[0].count > 0;
            }
        }
        
        return result;
    }
}