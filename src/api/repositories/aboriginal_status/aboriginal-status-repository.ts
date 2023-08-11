import { Knex } from "knex";
import { BaseRepository } from "../base-repository";

export class AboriginalStatusRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }
    
    async getAboriginalStatusCount(status_id?: number): Promise<number> { 
        let result = 0;

        if (status_id) {
            const query = await this.mainDb
            .count("*", { as: "count" })
            .from("sfa.aboriginal_status")
            .where("id", "=", status_id)
            .andWhere("is_active", "=", 1)
            .andWhere("nars_status_id", ">", 0);

            if (Array.isArray(query)) {
                result = query[0].count;
            }
        }        

        return result;
    }
}