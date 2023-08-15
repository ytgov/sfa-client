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

// Stub that lets us safely perform type-checked param assigment in the Student constructor
class StudentRecord {
  [key: string]: StudentRecord[keyof StudentRecord]
}

// Stub that hoists all the properties of a StudentRecord onto the Student class.
interface Student extends StudentRecord {}

class Student {
  constructor(params: StudentRecord) {
    Object.keys(StudentRecord).forEach((key) => {
      this[key] = params[key]
    })
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
