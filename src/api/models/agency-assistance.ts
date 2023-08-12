export default interface AgencyAssistance {
  id: number
  agencyId: number
  applicationId: number
  amount: number
  isTuition: boolean
  isLivingExpenses: boolean
  isBooks: boolean
  isTransportation: boolean
  otherPurpose?: string
  agencyComment?: string
}
