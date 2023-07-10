import { Knex } from "knex";
import { BaseRepository } from "../base-repository";
import {ScalarResult} from "../../models/repository";
import {PersonAddressDTO} from "../../models";

export class ParentRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getParentContributionAmount(academic_year_id?: number, discretionary_amount?: number): Promise<number> {
        let result = 0;

        if (academic_year_id && discretionary_amount) {
            result = await this.getScalarValue<number>("fn_get_parent_contribution_amount", [academic_year_id, discretionary_amount]);
        }

        return result;
    }
}