import Dependent from "@/models/dependent"
import Person from "@/models/person"
import Relationship from "@/models/relationship"
import Residence from "@/models/residence"
import StudentConsent from "@/models/student-consent"
import StudentPerson from "@/models/student-person"

interface StudentRecord {
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
}

interface Student extends StudentRecord {}

class Student {
  constructor(params: StudentRecord) {
    this.id = params.id
    this.personId = params.personId
    this.highSchoolId = params.highSchoolId
    this.educationLevelId = params.educationLevelId
    this.indigenousLearnerId = params.indigenousLearnerId
    this.vendorId = params.vendorId
    this.yukonId = params.yukonId
    this.checkedForYukonId = params.checkedForYukonId
    this.nationalId = params.nationalId
    this.locatorNumber = params.locatorNumber
    this.isCrownWard = params.isCrownWard
    this.highSchoolFinalGrade = params.highSchoolFinalGrade
    this.highSchoolLeftYear = params.highSchoolLeftYear
    this.highSchoolLeftMonth = params.highSchoolLeftMonth
    this.preFundedYear = params.preFundedYear
    this.preFundingYearsUsed = params.preFundingYearsUsed
    this.cslLetterDate = params.cslLetterDate
    this.cslWarnCode = params.cslWarnCode
    this.preOverAwardAmount = params.preOverAwardAmount
    this.preYeaAwardsUsedAmount = params.preYeaAwardsUsedAmount
    this.userName = params.userName
    this.userPassword = params.userPassword
    this.isActive = params.isActive
    this.isFirstLogonFlg = params.isFirstLogonFlg
    this.lastLogonDate = params.lastLogonDate
    this.lastPwChangeDate = params.lastPwChangeDate
    this.yeaExpiryDate = params.yeaExpiryDate
    this.adjYgFundingWeeks = params.adjYgFundingWeeks
    this.adjStaUpgradingWeeks = params.adjStaUpgradingWeeks
    this.adjOutsideTravelCnt = params.adjOutsideTravelCnt
    this.yukonResidentFromMonth = params.yukonResidentFromMonth
    this.yukonResidentFromYear = params.yukonResidentFromYear
    this.canadianResidentFromMonth = params.canadianResidentFromMonth
    this.canadianResidentFromYear = params.canadianResidentFromYear
    this.oldYtid = params.oldYtid
    this.residenceComment = params.residenceComment
    this.kinFirstName = params.kinFirstName
    this.kinLastName = params.kinLastName
    this.kinAddress1 = params.kinAddress1
    this.kinAddress2 = params.kinAddress2
    this.kinCityId = params.kinCityId
    this.kinProvinceId = params.kinProvinceId
    this.kinCountryId = params.kinCountryId
    this.kinPostalCode = params.kinPostalCode
    this.dependents = params.dependents
    this.person = params.person
    this.residences = params.residences
    this.studentConsents = params.studentConsents
    this.studentPersons = params.studentPersons
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

export default Student
