import Disbursement from "@/models/disbursement"

export default interface Assessment {
  id: number
  allowedBooks?: number
  allowedMonths?: number
  allowedPercent?: number
  allowedTuition?: number
  assessedAmount?: number
  assessedDate?: Date
  changeReasonComment?: string
  dependentCount?: number
  effectiveRateDate?: Date
  homeCityId?: number
  livingCosts?: number
  travelAllowance?: number
  weeklyAmount?: number
  assessmentTypeId?: number
  destinationCityId?: number
  fundingRequestId?: number
  disbursementsRequired?: number
  weeksAllowed?: number
  secondResidenceRate?: number
  classesEndDate?: Date
  prestudyAccomCode?: number
  prestudyProvinceId?: number
  classesStartDate?: Date
  airfareAmount?: number
  airTravelDisbursementPeriod?: number
  shelterMonth?: number
  pTransMonth?: number
  rTrans16wk?: number
  dayCareAllowable?: number
  dependFoodAllowable?: number
  dependTranAllowable?: number
  pstudyShelterMonth?: number
  pstudyPTransMonth?: number
  pstudyDayCareAllow?: number
  pstudyDependFoodAllow?: number
  pstudyDependTranAllow?: number
  pstudyStartDate?: Date
  pstudyEndDate?: Date
  cslAssessedNeed?: number
  studyProvinceId?: number
  cslOverReasonId?: number
  cslNonReasonId?: number
  overAward?: number
  studentTaxRate?: number
  spouseTaxRate?: number
  spousePstudyTaxRate?: number
  studPstudyTaxRate?: number
  parent1Income?: number
  parent2Income?: number
  parent1TaxPaid?: number
  parent2TaxPaid?: number
  booksSuppliesCost?: number
  tuitionEstimate?: number
  uncappedCostsTotal?: number
  uncappedPstudyTotal?: number
  dayCareActual?: number
  studPstudyGross?: number
  spousePstudyGross?: number
  pstudyDayCareActual?: number
  studentGrossIncome?: number
  spouseGrossIncome?: number
  prestudyCslClassification?: number
  maritalStatusId?: number
  spouseProvinceId?: number
  studyAccomCode?: number
  cslClassification?: number
  familySize?: number
  parentPsDependCount?: number
  discretionaryCost?: number
  discretionaryCostActual?: number
  studyDistance?: number
  prestudyDistance?: number
  prestudyBusFlag?: number
  studyBusFlag?: number
  studyLivingWSpouseFlag?: number
  prestudyLivingWSpouseFlag?: number
  cslFullAmtFlag?: number
  studyAreaId?: number
  programId?: number
  period?: string
  cslRequestAmount?: number
  returnUncashableCert?: number
  yearsFundedEquivalent?: number
  studyWeeks?: number
  studyMonths?: number
  pstudyExpectedContrib?: number
  spouseExpectedIncome?: number
  assetTaxRate?: number
  xTransTotal?: number
  relocationTotal?: number
  pstudyXTransTotal?: number
  marriedPstudy?: number
  marriedStudy?: number
  marriedAssets?: number
  entitlementDays?: number
  parentContributionOverride?: number
  totalGrantAwarded?: number
  overAwardDisbursementPeriod?: number
  overAwardAppliedFlg?: string
  preLegAmount?: number
  assessmentAdjAmount?: number
  studentLn150Income?: number
  studentContribution?: number
  studentContribExempt: string
  spouseContribExempt: string
  spouseContribution?: number
  spouseLn150Income?: number
  studentContributionReview: string
  spouseContributionReview: string
  parentContributionReview: string
  studentFamilySize?: number
  studentExpectedContribution?: number
  studentPreviousContribution?: number
  spouseExpectedContribution?: number
  spousePreviousContribution?: number
  studentContributionOverride?: number
  spouseContributionOverride?: number
  parentProvinceId?: number

  // Relations
  disbursements?: Disbursement[]
}
