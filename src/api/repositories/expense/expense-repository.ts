import { Knex } from "knex";
import { BaseRepository } from "../base-repository";

export class ExpenseRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getAllowableExpense(period?: number, report_expense_cat_id?: number, application_id?: number): Promise<number> {
        let result = 0;

        if (period && report_expense_cat_id && application_id) {
            result = await this.getScalarValue<number>("fn_get_allowable_expense", [period,report_expense_cat_id,application_id]);
        }

        return result;
    }

    async getActualExpense(period?: number, category_id?: number, application_id?: number): Promise<number> {
        let result = 0;

        if (period && category_id && application_id) {
            result = await this.getScalarValue<number>("fn_get_actual_expense", [period, category_id, application_id])
        }

        return result;
    }
}