import { Knex } from "knex";
import { BaseRepository } from "../base-repository";

export class TaxRateRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getPrestudyTaxRate(academic_year_id?: number, monthly_amount?: number): Promise<number> { 
        let result = 0;

        if (academic_year_id) {
            monthly_amount = monthly_amount === undefined ? 0 : monthly_amount;
            result = await this.getScalarValue<number>("fn_get_prestudy_tax_rate", [academic_year_id, monthly_amount]);
        }

        return result;
    }

    async getStudyTaxRate(academic_year_id?: number, monthly_amount?: number): Promise<number> { 
        let result = 0;

        if (academic_year_id) {
            monthly_amount = monthly_amount === undefined ? 0 : monthly_amount;
            result = await this.getScalarValue<number>("fn_get_study_tax_rate", [academic_year_id, monthly_amount]);
        }

        return result;
    }

    async getSpouseTaxRate(academic_year_id?: number, monthly_amount?: number): Promise<number> { 
        let result = 0;

        if (academic_year_id) {
            monthly_amount = monthly_amount === undefined ? 0 : monthly_amount;
            result = await this.getScalarValue<number>("fn_get_spouse_tax_rate", [academic_year_id, monthly_amount]);
        }

        return result;
    }
}