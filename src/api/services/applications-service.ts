import db from "@/db/db-client"

import Application from "@/models/application"

import InstitutionCampusesService from "@/services/institution-campuses-service"
import PersonAddressesService from "@/services/person-addresses-service"
import StudentsService from "@/services/students-service"

namespace ApplicationsService {
  export type IncludeTypes = ("institutionCampus" | "primaryAddress" | "student" | "studyArea")[]
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

    if (this.#includes.includes("student")) {
      application.student = await StudentsService.includes(["person"]).find(application.studentId)
    }

    if (this.#includes.includes("primaryAddress") && application.primaryAddressId) {
      application.primaryAddress = await PersonAddressesService.includes([
        "city",
        "province",
        "country",
      ]).find(application.primaryAddressId)
    }

    if (this.#includes.includes("institutionCampus") && application.institutionCampusId) {
      application.institutionCampus = await InstitutionCampusesService.includes([
        "institution",
        "addressCity",
        "addressProvince",
        "addressCountry",
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
