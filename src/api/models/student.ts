import Dependent from "@/models/dependent"
import Person from "@/models/person"
import Residence from "@/models/residence"
import StudentConsent from "@/models/student-consent"

export default interface Student {
  id: number
  personId: number
  highSchoolId?: number
  educationLevelId?: number
  indigenousLearnerId?: number
  vendorId?: string
  yukonId?: string
  checkedForYukonId: boolean
  nationalId?: string
  locatorNumber?: string
  isCrownWard: boolean
  highSchoolFinalGrade?: string
  highSchoolLeftYear?: number
  highSchoolLeftMonth?: number
  preFundedYear?: number
  preFundingYearsUsed?: number
  cslLetterDate?: Date
  cslWarnCode?: string
  preOverAwardAmount?: number
  preYeaAwardsUsedAmount?: number
  userName?: string
  userPassword?: string
  isActive: boolean
  isFirstLogonFlg?: string
  lastLogonDate?: Date
  lastPwChangeDate?: Date
  yeaExpiryDate?: Date
  adjYgFundingWeeks?: number
  adjStaUpgradingWeeks?: number
  adjOutsideTravelCnt?: number
  yukonResidentFromMonth?: number
  yukonResidentFromYear?: number
  canadianResidentFromMonth?: number
  canadianResidentFromYear?: number
  oldYtid?: string
  residenceComment?: string
  kinFirstName?: string
  kinLastName?: string
  kinAddress1?: string
  kinAddress2?: string
  kinCityId?: number
  kinProvinceId?: number
  kinCountryId?: number
  kinPostalCode?: string
  dependents?: Dependent[]
  person?: Person
  residences?: Residence[]
  studentConsents?: StudentConsent[]
}
