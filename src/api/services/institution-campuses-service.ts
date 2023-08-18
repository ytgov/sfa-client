import db from "@/db/db-client"

import InstitutionCampus from "@/models/institution-campus"

namespace InstitutionCampusesService {
  export type IncludeTypes = "institution"[]
}

export default class InstitutionCampusesService {
  #includes: InstitutionCampusesService.IncludeTypes

  constructor({ includes }: { includes?: InstitutionCampusesService.IncludeTypes } = {}) {
    this.#includes = includes || []
  }

  static includes(includes: InstitutionCampusesService.IncludeTypes) {
    return new InstitutionCampusesService({ includes })
  }

  static find(id: number) {
    const service = new InstitutionCampusesService()
    return service.find(id)
  }

  // OPINION: if you want this to be faster, switch to Sequelize.
  // It would be more worthwhile than writing these as massive dynamic queries and recreating an ORM.
  async find(id: number): Promise<InstitutionCampus> {
    const institutionCampus = await db<InstitutionCampus>("institutionCampus")
      .where({ id })
      .first()
      .then((institutionCampus) => {
        if (institutionCampus) return institutionCampus

        throw new Error("Institution not found")
      })

    if (this.#includes.includes("institution") && institutionCampus.institutionId !== undefined) {
      institutionCampus.institution = await db("institution")
        .where({ id: institutionCampus.institutionId })
        .first()
        .then((institution) => {
          if (institution) return institution

          throw new Error("Institution not found")
        })
    }

    return institutionCampus
  }
}
