import db from "@/db/db-client"

export default class StudentApplicationStudentsService {
  #studentId: number

  constructor({ studentId }: { studentId: number }) {
    this.#studentId = studentId
  }

  async getStudent() {
    return db
      .select({
        t1Id: "student.id",
        t2Id: "person.id",
        t2FirstName: "person.firstName",
        t2LastName: "person.lastName",
        t2Initials: "person.initials",
        t2Email: "person.email",
        t2Telephone: "person.telephone",
        t2BirthDate: "person.birthDate",
        t3Id: "language.id",
        t3Description: "language.description",
        t4Id: "sex.id",
        t4Description: "sex.description",
      })
      .from("student")
      .innerJoin("person", "person.id", "student.personId")
      .innerJoin("language", "language.id", "person.languageId")
      .innerJoin("sex", "sex.id", "person.sexId")
      .where({ ["student.id"]: this.#studentId })
      .first()
      .then((result) => {
        return {
          id: result.t1Id,
          person: {
            id: result.t2Id,
            firstName: result.t2FirstName,
            initials: result.t2Initials,
            lastName: result.t2LastName,
            email: result.t2Email,
            telephone: result.t2Telephone,
            birthDate: result.t2BirthDate,
            language: {
              id: result.t3Id,
              description: result.t3Description,
            },
            sex: {
              id: result.t4Id,
              description: result.t4Description,
            },
          },
        }
      })
  }
}
