import { isArray, isNil } from "lodash"

import Application from "@/models/application"
import FundingRequest from "@/models/funding-request"
import Person from "@/models/person"
import PersonAddress from "@/models/person-address"
import User from "@/models/user"
import AddressType from "@/models/address-type"

export default class CanadaStudentLoanFulltimeRejectionTemplateSerializer {
  #fundingRequest: FundingRequest
  #signingOfficer: User
  #director: User

  constructor({
    fundingRequest,
    signingOfficer,
    director,
  }: {
    fundingRequest: FundingRequest
    signingOfficer: User
    director: User
  }) {
    this.#fundingRequest = fundingRequest
    this.#signingOfficer = signingOfficer
    this.#director = director
  }

  static prepare({
    fundingRequest,
    signingOfficer,
    director,
  }: {
    fundingRequest: FundingRequest
    signingOfficer: User
    director: User
  }) {
    const serializer = new CanadaStudentLoanFulltimeRejectionTemplateSerializer({
      fundingRequest,
      signingOfficer,
      director,
    })
    return serializer.prepare()
  }

  prepare() {
    const application = this.#fundingRequest.application
    if (application === undefined)
      throw new Error(
        "Could not prepare template data as application is missing from funding request."
      )

    const person = application?.student?.person
    if (person === undefined)
      throw new Error("Could not prepare template data as person is missing from student.")
    if (isNil(person.firstName))
      throw new Error("Could not prepare template data as firstName is missing from person.")
    if (isNil(person.lastName))
      throw new Error("Could not prepare template data as lastName is missing from person.")

    const primaryAddress = this.#preparePrimaryAddress(application, person)
    if (isNil(primaryAddress.address1))
      throw new Error("Could not prepare template data as address1 is missing from primaryAddress.")
    if (isNil(primaryAddress.postalCode))
      throw new Error(
        "Could not prepare template data as postalCode is missing from primaryAddress."
      )

    const city = primaryAddress.city
    if (city === undefined)
      throw new Error("Could not prepare template data as city is missing from primary address.")

    const province = primaryAddress.province
    if (province === undefined)
      throw new Error(
        "Could not prepare template data as province is missing from primary address."
      )

    const country = primaryAddress.country
    if (country === undefined)
      throw new Error("Could not prepare template data as country is missing from primary address.")

    const statusReason = this.#fundingRequest.statusReason
    if (isNil(statusReason))
      throw new Error(
        "Could not prepare template data as statusReason is missing from funding request."
      )

    return {
      currentDate: new Date(),
      recipient: {
        firstName: person.firstName,
        initials: person.initials,
        lastName: person.lastName,
        address1: primaryAddress.address1,
        address2: primaryAddress.address2,
        city: city.description,
        province: province.description,
        country: country.description,
        postalCode: primaryAddress.postalCode,
      },
      rejectionReason: statusReason.description,
      studentFinancialAssistanceOfficer: this.#signingOfficer,
      directorOfTrainingPrograms: this.#director,
    }
  }

  // CONSIDER: Generalizing this function, as it used in several serializers.
  // It might even work as model method?
  #preparePrimaryAddress(application: Application, person: Person): PersonAddress {
    let primaryAddress = application?.primaryAddress

    if (primaryAddress === undefined) {
      const personAddresses = person.personAddresses
      if (
        personAddresses === undefined ||
        (isArray(personAddresses) && personAddresses.length === 0)
      ) {
        throw new Error(
          "Could not prepare template data as application primaryAddress is missing and person has no addresses."
        )
      }

      const firstChoice = personAddresses?.find(
        (address) => address.addressTypeId === AddressType.Types.MAILING
      )
      const secondChoice = personAddresses?.find(
        (address) => address.addressTypeId === AddressType.Types.HOME
      )
      const thirdChoice = personAddresses?.find(
        (address) => address.addressTypeId === AddressType.Types.SCHOOL
      )
      const fourthChoice = personAddresses?.find(
        (address) => address.addressTypeId === AddressType.Types.PARENT
      )
      const fifthChoice = personAddresses[0]

      primaryAddress = firstChoice || secondChoice || thirdChoice || fourthChoice || fifthChoice
    }

    return primaryAddress
  }
}
