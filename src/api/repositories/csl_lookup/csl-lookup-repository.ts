import { Knex } from "knex";
import { BaseRepository } from "../base-repository";
import {CslLookupDTO} from "../../models";

/**
 * @todo Add one single function to retrieve all values from csl_lookup table
 */
export class CslLookupRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }
    
    async getMaxBooks(academic_year_id?: number): Promise<number> {
        
        let result: number = 0;

        if (academic_year_id) {
            result = await this.getScalarValue<number>("fn_get_max_books", [academic_year_id]);
        }

        return result;
    }

    async getMaxDiscretionary(academic_year_id?: number): Promise<number> {
        let result = 0;

        if (academic_year_id) {
            result = await this.getScalarValue<number>("fn_get_max_discretionary", [academic_year_id]);
        }

        return result;
    }

    async getMileageRate(academic_year_id?: number): Promise<number> {
        let result = 0;

        if (academic_year_id) {
            result = await this.getScalarValue<number>("fn_get_mileage_rate", [academic_year_id]);
        }

        return result;
    }

    async getMaxRelocation(academic_year_id?: number): Promise<number> {
        let result = 0;

        if (academic_year_id) {
            result = await this.getScalarValue<number>("fn_get_max_relocation", [academic_year_id]);
        }

        return result;
    }

    async getMaxReturnTransport(academic_year_id?: number): Promise<number> {
        let result = 0;

        if (academic_year_id) {
            result = await this.getScalarValue<number>("fn_get_max_return_transport", [academic_year_id]);
        }

        return result;
    }

    async getStudentExemptAmount(academic_year_id?: number): Promise<number> {
        let result = 0;

        if (academic_year_id) {
            result = await this.getScalarValue<number>("fn_get_student_exempt_amount", [academic_year_id]);
        }

        return result;
    }

    async getVehicleDeductionAmount(academic_year_id?: number): Promise<number> {
        let result = 0;

        if (academic_year_id) {
            result = await this.getScalarValue<number>("fn_get_vehicle_deduction_amount", [academic_year_id]);
        }

        return result;
    }

    async getRRSPDeductionYearlyAmount(academic_year_id?: number): Promise<number> {
        let result = 0;

        if (academic_year_id) {
            result = await this.getScalarValue<number>("fn_get_rrsp_deduction_yearly_amount", [academic_year_id]);
        }

        return result;
    }

    async getMaxWeeklyAllowableAmount(academic_year_id?: number): Promise<number> {
        let result = 0;

        if (academic_year_id) {
            result = await this.getScalarValue<number>("fn_get_max_weekly_allowable_amount", [academic_year_id]);
        }

        return result;
    }

    async getCslLookupByYear(academic_year_id?: number): Promise<CslLookupDTO> {
        let result: Partial<CslLookupDTO> = {};

        if (academic_year_id) {
            result = await this.mainDb.raw(`SELECT * FROM sfa.fn_get_csl_lookup_by_year(${academic_year_id})`);
            if (Array.isArray(result)) {
                result = result[0];
            }
        }

        return result;
    }

    async getContribPct(academic_year_id?: number): Promise<CslLookupDTO> {
        let result: Partial<CslLookupDTO> = {};

        if (academic_year_id) {
            result = await this.mainDb.raw(`SELECT * FROM sfa.fn_get_csl_lookup_contrib_pct(${academic_year_id})`);
            if (Array.isArray(result)) {
                result = result[0];
            }
        }

        return result;
    }

}