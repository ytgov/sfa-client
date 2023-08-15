import Dependent from "@/models/dependent"
import Person from "@/models/person"
import Relationship from "@/models/relationship"
import Residence from "@/models/residence"
import StudentConsent from "@/models/student-consent"
import StudentPerson from "@/models/student-person"

export default class Student {
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
  studentPersons?: StudentPerson[]

  constructor({
    id,
    personId,
    highSchoolId,
    educationLevelId,
    indigenousLearnerId,
    vendorId,
    yukonId,
    checkedForYukonId,
    nationalId,
    locatorNumber,
    isCrownWard,
    highSchoolFinalGrade,
    highSchoolLeftYear,
    highSchoolLeftMonth,
    preFundedYear,
    preFundingYearsUsed,
    cslLetterDate,
    cslWarnCode,
    preOverAwardAmount,
    preYeaAwardsUsedAmount,
    userName,
    userPassword,
    isActive,
    isFirstLogonFlg,
    lastLogonDate,
    lastPwChangeDate,
    yeaExpiryDate,
    adjYgFundingWeeks,
    adjStaUpgradingWeeks,
    adjOutsideTravelCnt,
    yukonResidentFromMonth,
    yukonResidentFromYear,
    canadianResidentFromMonth,
    canadianResidentFromYear,
    oldYtid,
    residenceComment,
    kinFirstName,
    kinLastName,
    kinAddress1,
    kinAddress2,
    kinCityId,
    kinProvinceId,
    kinCountryId,
    kinPostalCode,
  }: Student) {
    this.id = id
    this.personId = personId
    this.highSchoolId = highSchoolId
    this.educationLevelId = educationLevelId
    this.indigenousLearnerId = indigenousLearnerId
    this.vendorId = vendorId
    this.yukonId = yukonId
    this.checkedForYukonId = checkedForYukonId
    this.nationalId = nationalId
    this.locatorNumber = locatorNumber
    this.isCrownWard = isCrownWard
    this.highSchoolFinalGrade = highSchoolFinalGrade
    this.highSchoolLeftYear = highSchoolLeftYear
    this.highSchoolLeftMonth = highSchoolLeftMonth
    this.preFundedYear = preFundedYear
    this.preFundingYearsUsed = preFundingYearsUsed
    this.cslLetterDate = cslLetterDate
    this.cslWarnCode = cslWarnCode
    this.preOverAwardAmount = preOverAwardAmount
    this.preYeaAwardsUsedAmount = preYeaAwardsUsedAmount
    this.userName = userName
    this.userPassword = userPassword
    this.isActive = isActive
    this.isFirstLogonFlg = isFirstLogonFlg
    this.lastLogonDate = lastLogonDate
    this.lastPwChangeDate = lastPwChangeDate
    this.yeaExpiryDate = yeaExpiryDate
    this.adjYgFundingWeeks = adjYgFundingWeeks
    this.adjStaUpgradingWeeks = adjStaUpgradingWeeks
    this.adjOutsideTravelCnt = adjOutsideTravelCnt
    this.yukonResidentFromMonth = yukonResidentFromMonth
    this.yukonResidentFromYear = yukonResidentFromYear
    this.canadianResidentFromMonth = canadianResidentFromMonth
    this.canadianResidentFromYear = canadianResidentFromYear
    this.oldYtid = oldYtid
    this.residenceComment = residenceComment
    this.kinFirstName = kinFirstName
    this.kinLastName = kinLastName
    this.kinAddress1 = kinAddress1
    this.kinAddress2 = kinAddress2
    this.kinCityId = kinCityId
    this.kinProvinceId = kinProvinceId
    this.kinCountryId = kinCountryId
    this.kinPostalCode = kinPostalCode
  }

  get parents(): Person[] | undefined {
    if (this.studentPersons === undefined) {
      return undefined
    }

    const studentPersonsWithParentRelationship = this.studentPersons
      .filter(
        (studentPerson) =>
          studentPerson.isActive &&
          studentPerson.relationship?.description === Relationship.Types.PARENT
      )
      // I don't know why .filter(studentPerson => studentPerson.person !== undefined) doesn't work on its own
      .filter(StudentPerson.hasValidPerson)

    const parents = studentPersonsWithParentRelationship.map(
      (studentPerson) => studentPerson.person
    )

    return parents
  }
}
