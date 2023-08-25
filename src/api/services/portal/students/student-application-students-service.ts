import db from "@/db/db-client"

import Student from "@/models/student"

import StudentApplicationDependentsService from "@/services/portal/students/student-application-dependents-service"
import StudentApplicationStudentPersonsService from "@/services/portal/students/student-application-student-persons-service"

export default class StudentApplicationStudentsService {
  #studentId: number
  #applicationId?: number

  constructor({ studentId, applicationId }: { studentId: number; applicationId?: number }) {
    this.#studentId = studentId
    this.#applicationId = applicationId
  }

  async getStudent() {
    const student = await db
      .select({
        t1Id: "student.id",
        t1PersonId: "student.personId",
        t1HighSchoolId: "student.highSchoolId",
        t1EducationLevelId: "student.educationLevelId",
        t1IndigenousLearnerId: "student.indigenousLearnerId",
        t1VendorId: "student.vendorId",
        t1YukonId: "student.yukonId",
        t1CheckedForYukonId: "student.checkedForYukonId",
        t1NationalId: "student.nationalId",
        t1LocatorNumber: "student.locatorNumber",
        t1IsCrownWard: "student.isCrownWard",
        t1HighSchoolFinalGrade: "student.highSchoolFinalGrade",
        t1HighSchoolLeftYear: "student.highSchoolLeftYear",
        t1HighSchoolLeftMonth: "student.highSchoolLeftMonth",
        t1PreFundedYear: "student.preFundedYear",
        t1PreFundingYearsUsed: "student.preFundingYearsUsed",
        t1CslLetterDate: "student.cslLetterDate",
        t1CslWarnCode: "student.cslWarnCode",
        t1PreOverAwardAmount: "student.preOverAwardAmount",
        t1PreYeaAwardsUsedAmount: "student.preYeaAwardsUsedAmount",
        t1UserName: "student.userName",
        t1UserPassword: "student.userPassword",
        t1IsActive: "student.isActive",
        t1IsFirstLogonFlg: "student.isFirstLogonFlg",
        t1LastLogonDate: "student.lastLogonDate",
        t1LastPwChangeDate: "student.lastPwChangeDate",
        t1YeaExpiryDate: "student.yeaExpiryDate",
        t1AdjYgFundingWeeks: "student.adjYgFundingWeeks",
        t1AdjStaUpgradingWeeks: "student.adjStaUpgradingWeeks",
        t1AdjOutsideTravelCnt: "student.adjOutsideTravelCnt",
        t1YukonResidentFromMonth: "student.yukonResidentFromMonth",
        t1YukonResidentFromYear: "student.yukonResidentFromYear",
        t1CanadianResidentFromMonth: "student.canadianResidentFromMonth",
        t1CanadianResidentFromYear: "student.canadianResidentFromYear",
        t1OldYtid: "student.oldYtid",
        t1ResidenceComment: "student.residenceComment",
        t1KinFirstName: "student.kinFirstName",
        t1KinLastName: "student.kinLastName",
        t1KinAddress1: "student.kinAddress1",
        t1KinAddress2: "student.kinAddress2",
        t1KinCityId: "student.kinCityId",
        t1KinProvinceId: "student.kinProvinceId",
        t1KinCountryId: "student.kinCountryId",
        t1KinPostalCode: "student.kinPostalCode",
        t2Id: "person.id",
        t2LanguageId: "person.languageId",
        t2SexId: "person.sexId",
        t2BirthCityId: "person.birthCityId",
        t2BirthProvinceId: "person.birthProvinceId",
        t2BirthCountryId: "person.birthCountryId",
        t2FirstName: "person.firstName",
        t2LastName: "person.lastName",
        t2Initials: "person.initials",
        t2PreviousLastName: "person.previousLastName",
        t2Sin: "person.sin",
        t2CitizenshipCode: "person.citizenshipCode",
        t2BirthDate: "person.birthDate",
        t2Telephone: "person.telephone",
        t2Email: "person.email",
        t3Id: "language.id",
        t3Description: "language.description",
        t3IsActive: "language.isActive",
        t4Id: "sex.id",
        t4Description: "sex.description",
        t4IsActive: "sex.isActive",
      })
      .from("student")
      .innerJoin("person", "person.id", "student.personId")
      .leftJoin("language", "language.id", "person.languageId")
      .leftJoin("sex", "sex.id", "person.sexId")
      .where({ ["student.id"]: this.#studentId })
      .first()
      .then((result) => {
        return new Student({
          id: result.t1Id,
          personId: result.t1PersonId,
          highSchoolId: result.t1HighSchoolId,
          educationLevelId: result.t1EducationLevelId,
          indigenousLearnerId: result.t1IndigenousLearnerId,
          vendorId: result.t1VendorId,
          yukonId: result.t1YukonId,
          checkedForYukonId: result.t1CheckedForYukonId,
          nationalId: result.t1NationalId,
          locatorNumber: result.t1LocatorNumber,
          isCrownWard: result.t1IsCrownWard,
          highSchoolFinalGrade: result.t1HighSchoolFinalGrade,
          highSchoolLeftYear: result.t1HighSchoolLeftYear,
          highSchoolLeftMonth: result.t1HighSchoolLeftMonth,
          preFundedYear: result.t1PreFundedYear,
          preFundingYearsUsed: result.t1PreFundingYearsUsed,
          cslLetterDate: result.t1CslLetterDate,
          cslWarnCode: result.t1CslWarnCode,
          preOverAwardAmount: result.t1PreOverAwardAmount,
          preYeaAwardsUsedAmount: result.t1PreYeaAwardsUsedAmount,
          userName: result.t1UserName,
          userPassword: result.t1UserPassword,
          isActive: result.t1IsActive,
          isFirstLogonFlg: result.t1IsFirstLogonFlg,
          lastLogonDate: result.t1LastLogonDate,
          lastPwChangeDate: result.t1LastPwChangeDate,
          yeaExpiryDate: result.t1YeaExpiryDate,
          adjYgFundingWeeks: result.t1AdjYgFundingWeeks,
          adjStaUpgradingWeeks: result.t1AdjStaUpgradingWeeks,
          adjOutsideTravelCnt: result.t1AdjOutsideTravelCnt,
          yukonResidentFromMonth: result.t1YukonResidentFromMonth,
          yukonResidentFromYear: result.t1YukonResidentFromYear,
          canadianResidentFromMonth: result.t1CanadianResidentFromMonth,
          canadianResidentFromYear: result.t1CanadianResidentFromYear,
          oldYtid: result.t1OldYtid,
          residenceComment: result.t1ResidenceComment,
          kinFirstName: result.t1KinFirstName,
          kinLastName: result.t1KinLastName,
          kinAddress1: result.t1KinAddress1,
          kinAddress2: result.t1KinAddress2,
          kinCityId: result.t1KinCityId,
          kinProvinceId: result.t1KinProvinceId,
          kinCountryId: result.t1KinCountryId,
          kinPostalCode: result.t1KinPostalCode,
          person: {
            id: result.t2Id,
            languageId: result.t2LanguageId,
            sexId: result.t2SexId,
            birthCityId: result.t2BirthCityId,
            birthProvinceId: result.t2BirthProvinceId,
            birthCountryId: result.t2BirthCountryId,
            firstName: result.t2FirstName,
            lastName: result.t2LastName,
            initials: result.t2Initials,
            previousLastName: result.t2PreviousLastName,
            sin: result.t2Sin,
            citizenshipCode: result.t2CitizenshipCode,
            birthDate: result.t2BirthDate,
            telephone: result.t2Telephone,
            email: result.t2Email,
            language: {
              id: result.t3Id,
              description: result.t3Description,
              isActive: result.t3IsActive,
            },
            sex: {
              id: result.t4Id,
              description: result.t4Description,
              isActive: result.t4IsActive,
            },
          },
        })
      })

    if (student.person) {
      const personAddresses = await this.#getPersonAddresses(student.personId)
      student.person.personAddresses = personAddresses
    }

    if (this.#applicationId === undefined) {
      throw new Error("Application ID is not set")
    } else {
      student.dependents = await this.#getDependents(student.id, this.#applicationId)
    }

    student.studentConsents = await this.#getStudentConsents(student.id)
    student.residences = await this.#getResidences(student.id)
    student.studentPersons = await this.#getStudentPersons(student.id)

    return student
  }

  #getDependents(studentId: number, applicationId: number) {
    const dependentsService = new StudentApplicationDependentsService({ studentId, applicationId })
    return dependentsService.getDependents()
  }

  #getPersonAddresses(personId: number) {
    return db
      .from("personAddress")
      .where({ personId })
  }

  #getStudentConsents(studentId: number) {
    return db("studentConsent").where({ studentId })
  }

  #getStudentPersons(studentId: number) {
    const studentPersonsService = new StudentApplicationStudentPersonsService({ studentId })
    return studentPersonsService.getStudentPersons()
  }

  #getResidences(studentId: number) {
    return db("residence").where({ studentId })
  }
}
