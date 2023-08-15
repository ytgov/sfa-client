import db from "@/db/db-client"

import Language from "@/models/language"
import Person from "@/models/person"
import Sex from "@/models/sex"
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
        t1HighSchoolId: "student.highSchoolId",
        t1HighSchoolLeftYear: "student.highSchoolLeftYear",
        t1HighSchoolLeftMonth: "student.highSchoolLeftMonth",
        t2Id: "person.id",
        t2FirstName: "person.firstName",
        t2LastName: "person.lastName",
        t2Initials: "person.initials",
        t2Email: "person.email",
        t2Telephone: "person.telephone",
        t2BirthDate: "person.birthDate",
        t2CitizenshipCode: "person.citizenshipCode",
        t3Id: "language.id",
        t3Description: "language.description",
        t4Id: "sex.id",
        t4Description: "sex.description",
      })
      .from("student")
      .innerJoin("person", "person.id", "student.personId")
      .leftJoin("language", "language.id", "person.languageId")
      .leftJoin("sex", "sex.id", "person.sexId")
      .where({ ["student.id"]: this.#studentId })
      .first()
      .then((result) => {
        return {
          id: result.t1Id,
          highSchoolId: result.t1HighSchoolId,
          highSchoolLeftYear: result.t1HighSchoolLeftYear,
          highSchoolLeftMonth: result.t1HighSchoolLeftMonth,
          personId: result.t2Id,
          person: {
            id: result.t2Id,
            firstName: result.t2FirstName,
            initials: result.t2Initials,
            lastName: result.t2LastName,
            email: result.t2Email,
            telephone: result.t2Telephone,
            birthDate: result.t2BirthDate,
            citzenshipCode: result.t2CitizenshipCode,
            languageId: result.t3Id,
            language: {
              id: result.t3Id,
              description: result.t3Description,
            } as Language,
            sexId: result.t4Id,
            sex: {
              id: result.t4Id,
              description: result.t4Description,
            } as Sex,
          } as Person,
        } as Student
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
      .select("id", "addressTypeId", "address1", "cityId", "provinceId", "postalCode")
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
