import { Knex } from "knex";
import { BaseRepository } from "../base-repository";
import { UncappedExpensesDTO } from "models";

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

    async getUncappedExpenseTable(application_id?: number, period_id?: number): Promise<UncappedExpensesDTO[]> {
        const result: Array<UncappedExpensesDTO> = [];

        if (application_id && period_id) {
            const query = await this.mainDb("sfa.expense")
                .join("sfa.expense_category", "expense.category_id", "expense_category.id")
                .where("expense.application_id", "=", application_id)
                .andWhere("expense.period_id", "=", period_id)
                .select(
                    "expense.id",
                    "expense.application_id",
                    "expense.period_id",
                    "expense.description",
                    "expense.amount",
                    { category: "expense_category.description" },
                    "expense_category.notes",
                );
            
            query.forEach((x) => {
                result.push({
                    id: x.id,
                    application_id: x.application_id,
                    period_id: x.period_id,
                    description: x.description,
                    amount: x.amount,
                    category: x.category,
                    notes: x.notes
                }); 
            });            
        }

        return result;
    }
}