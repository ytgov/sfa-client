import db from "@/db/db-client"

import PersonAddress from "@/models/person-address"

namespace PersonAddressesService {
  export type IncludeTypes = ("city" | "province" | "country")[]
}

export default class PersonAddressesService {
  #includes: PersonAddressesService.IncludeTypes

  constructor({ includes }: { includes?: PersonAddressesService.IncludeTypes } = {}) {
    this.#includes = includes || []
  }

  static includes(includes: PersonAddressesService.IncludeTypes) {
    return new PersonAddressesService({ includes })
  }

  static find(id: number) {
    const service = new PersonAddressesService()
    return service.find(id)
  }

  // OPINION: if you want this to be faster, switch to Sequelize.
  // It would be more worthwhile than writing these as massive dynamic queries and recreating an ORM.
  async find(id: number): Promise<PersonAddress> {
    const personAddress = await db<PersonAddress>("personAddress")
      .where({ id })
      .first()
      .then((address) => {
        if (address) return address

        throw new Error("Person address not found")
      })

    if (this.#includes.includes("city") && personAddress.cityId !== undefined) {
      personAddress.city = await db("city")
        .where({ id: personAddress.cityId })
        .first()
        .then((city) => {
          if (city) return city

          throw new Error("City not found")
        })
    }

    if (this.#includes.includes("province") && personAddress.provinceId !== undefined) {
      personAddress.province = await db("province")
        .where({ id: personAddress.provinceId })
        .first()
        .then((province) => {
          if (province) return province

          throw new Error("Province not found")
        })
    }

    if (this.#includes.includes("country") && personAddress.countryId !== undefined) {
      personAddress.country = await db("country")
        .where({ id: personAddress.countryId })
        .first()
        .then((country) => {
          if (country) return country

          throw new Error("Country not found")
        })
    }

    return personAddress
  }
}
