export default interface RequestType {
  id: number
  applicationTypeId?: number
  fundingGroupId?: number
  batchGroupId?: number
  description?: string
  scholarshipFlag: number
  applicationDeadline?: string
  regulation?: string
  programType?: string
  staticDescriptionFlag?: number
  financialCoding?: string
  t4aRequired: boolean
  csgOtherFlag?: number
  glBudget?: number
  autoAppear?: string
  showOnline: boolean
  shortName?: string
  helpUrl?: string
  helpText?: string
  isActive: boolean
}
