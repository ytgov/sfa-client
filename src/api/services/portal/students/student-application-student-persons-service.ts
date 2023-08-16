import db from "@/db/db-client"

export default class StudentApplicationStudentPersonsService {
  #studentId: number

  constructor({ studentId }: { studentId: number }) {
    this.#studentId = studentId
  }

  async getStudentPersons() {
    const studentPersonRows = await db
      .select({
        t1Id: "studentPersons.id",
        t1StudentId: "studentPersons.studentId",
        t1PersonId: "studentPersons.personId",
        t1RelationshipId: "studentPersons.relationshipId",
        t1IsActive: "studentPersons.isActive",
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
        t3Id: "relationship.id",
        t3Description: "relationship.description",
        t3IsActive: "relationship.isActive",
      })
      .from("studentPersons")
      .innerJoin("relationship", "relationship.id", "=", "studentPersons.relationshipId")
      .leftJoin("person", "person.id", "=", "studentPersons.personId")
      .where({ studentId: this.#studentId })

    const studentPersons = studentPersonRows.map((row) => ({
      id: row.t1Id,
      studentId: row.t1StudentId,
      personId: row.t1PersonId,
      relationshipId: row.t1RelationshipId,
      isActive: row.t1IsActive,
      person: {
        id: row.t2Id,
        languageId: row.t2LanguageId,
        sexId: row.t2SexId,
        birthCityId: row.t2BirthCityId,
        birthProvinceId: row.t2BirthProvinceId,
        birthCountryId: row.t2BirthCountryId,
        firstName: row.t2FirstName,
        lastName: row.t2LastName,
        initials: row.t2Initials,
        previousLastName: row.t2PreviousLastName,
        sin: row.t2Sin,
        citizenshipCode: row.t2CitizenshipCode,
        birthDate: row.t2BirthDate,
        telephone: row.t2Telephone,
        email: row.t2Email,
        personAddresses: row.t2PersonAddresses,
        citizenship: row.t2Citizenship,
        language: row.t2Language,
        sex: row.t2Sex,
      },
      relationship: {
        id: row.t3Id,
        description: row.t3Description,
        isActive: row.t3IsActive,
      },
    }))

    return studentPersons
  }
}
