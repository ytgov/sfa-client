import { Knex } from "knex";
import { BaseRepository } from "../base-repository";

export class ProvinceRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getProvinceDesc(application_id?: number): Promise<string> {
        let result = undefined;
        
        if (application_id) {
            result = await this.mainDb.raw(`SELECT sfa.fn_get_province_desc(province_id) AS result FROM sfa.fn_get_parent_address_by_application(${application_id}, 2) WHERE parent = 1;`);
        }
        
        if (result) {
            return result[0].result;
        }

        return "";
    }
}