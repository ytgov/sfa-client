import db from "@/db/db-client"

import InstitutionCampus from "@/models/institution-campus"
import { isNil } from "lodash"

namespace InstitutionCampusesService {
  export type IncludeTypes = (
    | "institution"
    | "addressCity"
    | "addressProvince"
    | "addressCountry"
  )[]
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

    if (this.#includes.includes("institution") && institutionCampus.institutionId) {
      institutionCampus.institution = await db("institution")
        .where({ id: institutionCampus.institutionId })
        .first()
        .then((institution) => {
          if (institution) return institution

          throw new Error("Institution not found")
        })
    }

    if (this.#includes.includes("addressCity") && institutionCampus.addressCityId) {
      const addressCity = await db("city")
        .where({
          id: institutionCampus.addressCityId,
        })
        .first()
      if (isNil(addressCity)) throw new Error("Address city not found")

      institutionCampus.addressCity = addressCity
    }

    if (this.#includes.includes("addressProvince") && institutionCampus.addressProvinceId) {
      const addressProvince = await db("province")
        .where({
          id: institutionCampus.addressProvinceId,
        })
        .first()
      if (isNil(addressProvince)) throw new Error("Address province not found")

      institutionCampus.addressProvince = addressProvince
    }

    if (this.#includes.includes("addressCountry") && institutionCampus.addressCountryId) {
      const addressCountry = await db("country")
        .where({ id: institutionCampus.addressCountryId })
        .first()
      if (isNil(addressCountry)) throw new Error("Address country not found")

      institutionCampus.addressCountry = addressCountry
    }

    return institutionCampus
  }
}
