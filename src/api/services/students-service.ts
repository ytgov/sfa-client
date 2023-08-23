import { isNil } from "lodash"

import db from "@/db/db-client"

import Student from "@/models/student"

import PersonAddressesService from "@/services/person-addresses-service"

namespace StudentsService {
  export type IncludeTypes = "person"[]
}

export default class StudentsService {
  #includes: StudentsService.IncludeTypes

  constructor({ includes }: { includes?: StudentsService.IncludeTypes } = {}) {
    this.#includes = includes || []
  }

  static includes(includes: StudentsService.IncludeTypes) {
    return new StudentsService({ includes })
  }

  static find(id: number) {
    const service = new StudentsService()
    return service.find(id)
  }

  // OPINION: if you want this to be faster, switch to Sequelize.
  // It would be more worthwhile than writing these as massive dynamic queries and recreating an ORM.
  async find(id: number): Promise<Student> {
    const student = await db<Student>("student")
      .where({ id })
      .first()
      .then((student) => {
        if (student) return student

        throw new Error("Student not found")
      })

    if (this.#includes.includes("person")) {
      student.person = await db("person").where({ id: student.personId }).first()
      if (isNil(student.person)) throw new Error("Person not found")

      student.person.personAddresses = await PersonAddressesService.includes([
        "city",
        "province",
        "country",
      ]).where({ personId: student.person.id })
    }

    return student
  }
}
