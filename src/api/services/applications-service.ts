import db from "@/db/db-client"

import Application from "@/models/application"

import PersonAddressesService from "@/services/person-addresses-service"
import InstitutionCampusesService from "@/services/institution-campuses-service"

namespace ApplicationsService {
  export type IncludeTypes = ("student" | "personAddress" | "institutionCampus" | "studyArea")[]
}

export default class ApplicationsService {
  #includes: ApplicationsService.IncludeTypes

  constructor({ includes }: { includes?: ApplicationsService.IncludeTypes } = {}) {
    this.#includes = includes || []
  }

  static includes(includes: ApplicationsService.IncludeTypes) {
    return new ApplicationsService({ includes })
  }

  static find(id: number) {
    const service = new ApplicationsService()
    return service.find(id)
  }

  // OPINION: if you want this to be faster, switch to Sequelize.
  // It would be more worthwhile than writing these as massive dynamic queries and recreating an ORM.
  async find(id: number): Promise<Application> {
    const application = await db<Application>("application")
      .where({ id })
      .first()
      .then((application) => {
        if (application) return application

        throw new Error("Application not found")
      })

    // TODO: move this to a StudentsService
    if (this.#includes.includes("student")) {
      application.student = await db("student")
        .where({ id: application.studentId })
        .first()
        .then((student) => {
          if (student) return student

          throw new Error("Student not found")
        })

      if (application?.student?.personId) {
        application.student.person = await db("person")
          .where({ id: application.student.personId })
          .first()
          .then((person) => {
            if (person) return person

            throw new Error("Person not found")
          })
      }
    }

    if (this.#includes.includes("personAddress") && application.primaryAddressId) {
      application.primaryAddress = await PersonAddressesService.includes([
        "city",
        "province",
        "country",
      ]).find(application.primaryAddressId)
    }

    if (this.#includes.includes("institutionCampus") && application.institutionCampusId) {
      application.institutionCampus = await InstitutionCampusesService.includes([
        "institution",
      ]).find(application.institutionCampusId)
    }

    if (this.#includes.includes("studyArea") && application.studyAreaId) {
      application.studyArea = await db("studyArea")
        .where({ id: application.studyAreaId })
        .first()
        .then((studyArea) => {
          if (studyArea === undefined) throw new Error("Study area not found")

          return studyArea
        })
    }

    return application
  }
}
