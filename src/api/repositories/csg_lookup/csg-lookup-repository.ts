import { Knex } from "knex";
import { BaseRepository } from "../base-repository";
import {CsgLookupDTO} from "../../models";

/**
 * @todo Add one single function to retrieve all values from csg_lookup table
 */
export class CsgLookupRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }
    
    async getCsgLookupByYear(academic_year_id?: number): Promise<CsgLookupDTO> {
        let result: Partial<CsgLookupDTO> = {};

        if (academic_year_id) {
            result = await this.mainDb.raw(`SELECT * FROM sfa.fn_get_csl_lookup_by_year(${academic_year_id})`);
            if (Array.isArray(result)) {
                result = result[0];
            }
        }

        return result;
    }

}