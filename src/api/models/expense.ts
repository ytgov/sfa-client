import ExpenseCategory from "@/models/expense-category"

export default interface Expense {
  id: number
  applicationId: number
  categoryId?: number
  periodId: number
  description?: string
  amount: number
  expenseCategory?: ExpenseCategory
}
