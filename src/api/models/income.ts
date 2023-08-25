import IncomeType from "@/models/income-type"

export default interface Income {
  id: number
  applicationId: number
  incomeTypeId?: number
  comment?: string
  amount?: number
  incomeType?: IncomeType[]
}
