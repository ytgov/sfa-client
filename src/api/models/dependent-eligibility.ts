// TODO: normalize everything to one spelling, currently in code its sometimes spelled as dependant instead of dependent.
export default interface DependentEligibility {
  id: number
  applicationId: number
  dependentId: number
  isStaEligible: boolean
  isPostSecondary: boolean
  residesWithStudent: boolean
  isSharesCustody: boolean
  sharesCustodyDetails?: string
  isCslEligible: boolean
  isCsgEligible: boolean
  isInProgress: boolean
}
