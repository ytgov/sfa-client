import db from "@/db/db-client"

import Expense from "@/models/expense"

export default class StudentApplicationExpensesService {
  #applicationId: number

  constructor({ applicationId }: { applicationId: number }) {
    this.#applicationId = applicationId
  }

  /*
  Data format

  expenses: [
    {
       id: 123,
       expenseCategory: {},
       ...
     }
  ]
  */
  async getExpenses() {
    const rows = await db
      .select({
        t1Id: "expense.id",
        t1ApplicationId: "expense.applicationId",
        t1CategoryId: "expense.categoryId",
        t1PeriodId: "expense.periodId",
        t1Description: "expense.description",
        t1Amount: "expense.amount",
        t2Id: "expenseCategory.id",
        t2ReportExpenseCategoryId: "expenseCategory.reportExpenseCategoryId",
        t2Description: "expenseCategory.description",
        t2IsActive: "expenseCategory.isActive",
        t2Notes: "expenseCategory.notes",
        t2IsRequired: "expenseCategory.isRequired",
      })
      .from("expense")
      .leftJoin("expenseCategory", "expense.categoryId", "=", "expenseCategory.id")
      .where({ applicationId: this.#applicationId })
      .then((rows) => rows)

    const expenses = rows.map((row) => {
      const expense = {
        id: row.t1Id,
        applicationId: row.t1ApplicationId,
        categoryId: row.t1CategoryId,
        periodId: row.t1PeriodId,
        description: row.t1Description,
        amount: row.t1Amount,
      } as Expense

      if (expense.categoryId) {
        expense.expenseCategory = {
          id: row.t2Id,
          reportExpenseCategoryId: row.t2ReportExpenseCategoryId,
          description: row.t2Description,
          isActive: row.t2IsActive,
          notes: row.t2Notes,
          isRequired: row.t2IsRequired,
        }
      }
      return expense
    })

    return expenses
  }
}
