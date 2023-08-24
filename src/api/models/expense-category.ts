export default interface ExpenseCategory {
  id: number
  reportExpenseCategoryId?: number
  description: string
  isActive: boolean
  notes?: string
  isRequired: boolean
}
