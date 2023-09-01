import { Knex } from "knex";
import { BaseRepository } from "../base-repository";
import { IMainTable } from "repositories/i-main-table";
import { CsgThresholdDTO } from "../../models";

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
            result = await this.getScalarValue<number>("fn_get_income_threshold_amount", [family_size, academic_year_id]);
        }

        return result;
    }

    async getFamilySizeCount(family_income?: number, family_size?: number, academic_year_id?: number): Promise<number> {
        let result = 0;

        const query = await this.mainDb(this.getMainTable())
                            .count({count: "family_size"})
                            .where((builder) => {
                                builder.where("income_threshold", ">=", family_income ?? 0);
                                builder.andWhere("family_size", "=", family_size ?? 0);
                                builder.andWhere("academic_year_id", "=", academic_year_id ?? 0)
                            });

        if (query.length > 0) {
            result = query[0].count as number ?? 0;
        }

        return result;
    }

    async getFamilySizeCountCutOff(family_income?: number, family_size?: number, academic_year_id?: number): Promise<number> {
        let result = 0;

        const query = await this.mainDb(this.getMainTable())
                            .count({count: "family_size"})
                            .where((builder) => {
                                builder.where("income_threshold", "<", family_income ?? 0);
                                builder.andWhere("income_cutoff", ">=", family_income ?? 0);
                                builder.andWhere("family_size", "=", family_size ?? 0);
                                builder.andWhere("academic_year_id", "=", academic_year_id ?? 0)
                            });

        if (query.length > 0) {
            result = query[0].count as number ?? 0;
        }

        return result;
    }

    async getIncomeThresholdCutoff(family_income?: number, family_size?: number, academic_year_id?: number): Promise<CsgThresholdDTO> {
        let result = {};

        const query = await this.mainDb(this.getMainTable())
                            .where((builder) => {
                                builder.where("income_threshold", "<=", family_income ?? 0);
                                builder.andWhere("income_cutoff", ">=", family_income ?? 0);
                                builder.andWhere("family_size", "=", family_size ?? 0);
                                builder.andWhere("academic_year_id", "=", academic_year_id ?? 0)
                            });

        if (query.length > 0) {
            result = query[0] as CsgThresholdDTO;
        }

        return result;
    }
}