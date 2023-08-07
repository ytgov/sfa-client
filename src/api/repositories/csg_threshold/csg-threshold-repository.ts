import { Knex } from "knex";
import { BaseRepository } from "../base-repository";
import { IMainTable } from "repositories/i-main-table";
import { bind } from "lodash";

export class CsgThresholdRepository extends BaseRepository implements IMainTable {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }
    getMainTable(): string {
        return "sfa.csg_threshold"
    }

    async getIncomeThresholdAmount(academic_year_id?: number, family_size?: number): Promise<number> {
        let result = 0;

        if (academic_year_id && family_size) {
            result = await this.getScalarValue<number>("fn_get_income_threshold_amount", [academic_year_id, family_size]);
        }

        return result;
    }

    async getFamilySizeCount(family_income?: number, family_size?: number, academic_year_id?: number): Promise<number> {
        let result = 0;

        const query = await this.mainDb(this.getMainTable())
                            .count("family_size")
                            .where((builder) => {
                                builder.where("family_threshold", ">=", family_income ?? 0);
                                builder.andWhere("family_size", "=", family_size ?? 0);
                                builder.andWhere("academic_year_id", "=", academic_year_id ?? 0)
                            });

        console.log(query);

        return result;
    }
}