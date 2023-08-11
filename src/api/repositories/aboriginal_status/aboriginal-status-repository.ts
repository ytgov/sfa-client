import { Knex } from "knex";
import { BaseRepository } from "../base-repository";

export class AboriginalStatusRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }
    
    async getAboriginalStatusCount(): Promise<number> { 
        let result = 0;

        const query = await this.mainDb
            .count("*", { as: "count" })
            .from("sfa.aboriginal_status")
            .where("is_active", "=", 1)
            .andWhere("nars_status_id", ">", 0);

        if (Array.isArray(query)) {
            result = query[0].count;
        }

        return result;
    }
}