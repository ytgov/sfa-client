import db from "@/db/db-client"

export default class PersonAddressesService {
  #addressId: number

  constructor(addressId: number) {
    this.#addressId = addressId
  }

  getPersonAddress() {
    return db("personAddress")
      .leftOuterJoin("city", "city.id", "personAddress.cityId")
      .leftOuterJoin("province", "province.id", "personAddress.provinceId")
      .leftOuterJoin("country", "country.id", "personAddress.countryId")
      .where({ "personAddress.id": this.#addressId })
      .select({
        t1Id: "personAddress.id",
        t1PersonId: "personAddress.personId",
        t1AddressTypeId: "personAddress.addressTypeId",
        t1Address1: "personAddress.address1",
        t1Address2: "personAddress.address2",
        t1CityId: "personAddress.cityId",
        t1ProvinceId: "personAddress.provinceId",
        t1CountryId: "personAddress.countryId",
        t1PostalCode: "personAddress.postalCode",
        t1Notes: "personAddress.notes",
        t1Telephone: "personAddress.telephone",
        t1Email: "personAddress.email",
        t1IsActive: "personAddress.isActive",
        t1AddressType: "personAddress.addressType",
        t2Description: "city.description",
        t3Description: "province.description",
        t4Description: "country.description",
      })
      .first()
      .then((record) => ({
        id: record.t1Id,
        personId: record.t1PersonId,
        addressTypeId: record.t1AddressTypeId,
        address1: record.t1Address1,
        address2: record.t1Address2,
        cityId: record.t1CityId,
        provinceId: record.t1ProvinceId,
        countryId: record.t1CountryId,
        postalCode: record.t1PostalCode,
        notes: record.t1Notes,
        telephone: record.t1Telephone,
        email: record.t1Email,
        isActive: record.t1IsActive,
        addressType: record.t1AddressType,
        city: {
          description: record.t2Description,
        },
        province: {
          description: record.t3Description,
        },
        country: {
          description: record.t4Description,
        },
      }))
      .then((address) => {
        if (address === undefined) throw new Error("Address not found")

        return address
      })
  }
}
