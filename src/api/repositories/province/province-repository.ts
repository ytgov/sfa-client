import { Knex } from "knex";
import { BaseRepository } from "../base-repository";
import {ScalarResult} from "../../models/repository";

export class ProvinceRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getProvinceDesc(application_id?: number, address_type_id: number = 2, parent_id: number = 1): Promise<string> {
        let data: ScalarResult<string> = {} as ScalarResult<string>;
        
        if (application_id && address_type_id && parent_id) {
            const result = await this.mainDb.raw(`SELECT sfa.fn_get_province_desc(province_id) AS result FROM sfa.fn_get_parent_address_by_application(${application_id}, ${address_type_id}) WHERE parent = ${parent_id};`);
            data = this.singleResult(result);
        }
        
        if (data) {
            return data.result;
        }

        return "";
    }
}