import db from "@/db/db-client"

import Application from "@/models/application"

import PersonAddressesService from "@/services/person-addresses-service"

export default class ApplicationsService {
  #applicationId: number

  constructor(applicationId: number) {
    this.#applicationId = applicationId
  }

  // includes?: ("student" | "personAddress" | "institutionCampus" | "studyArea")[]
  async getApplication(
    {
      includes,
    }: {
      includes: ("student" | "personAddress" | "institutionCampus" | "studyArea")[]
    } = { includes: [] }
  ): Promise<Application> {
    const application = await db<Application>("application")
      .where({ id: this.#applicationId })
      .first()
      .then((application) => {
        if (application === undefined) throw new Error("Application not found")

        return application
      })

    if (includes.includes("student")) {
      application.student = await db("student")
        .where({ id: application.studentId })
        .first()
        .then((student) => {
          if (student === undefined) throw new Error("Student not found")

          return student
        })

      if (application?.student?.personId !== undefined) {
        application.student.person = await db("person")
          .where({ id: application.student.personId })
          .first()
          .then((person) => {
            if (person === undefined) throw new Error("Person not found")

            return person
          })
      }
    }

    if (includes.includes("personAddress") && application.primaryAddressId !== undefined) {
      application.primaryAddress = await this.#getPersonAddress(application.primaryAddressId)
    }

    if (includes.includes("institutionCampus") && application.institutionCampusId !== undefined) {
      application.institutionCampus = await this.#getInstitutionCampus(
        application.institutionCampusId
      )
    }

    if (includes.includes("studyArea") && application.studyAreaId !== undefined) {
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

  #getInstitutionCampus(institutionCampusId: number) {
    return db("institutionCampus")
      .leftOuterJoin("institution", "institution.id", "institutionCampus.institutionId")
      .where({ "institutionCampus.id": institutionCampusId })
      .select({
        t1Id: "institutionCampus.id",
        t1InstitutionId: "institutionCampus.institutionId",
        t1Name: "institutionCampus.name",
        t1FederalInstitutionCode: "institutionCampus.federalInstitutionCode",
        t1IsActive: "institutionCampus.isActive",
        t1IsPrimary: "institutionCampus.isPrimary",
        t1CareOf: "institutionCampus.careOf",
        t1AddressLine1: "institutionCampus.addressLine1",
        t1AddressLine2: "institutionCampus.addressLine2",
        t1AddressCityId: "institutionCampus.addressCityId",
        t1AddressProvinceId: "institutionCampus.addressProvinceId",
        t1AddressCountryId: "institutionCampus.addressCountryId",
        t1AddressPostalCode: "institutionCampus.addressPostalCode",
        t1EmailAddress: "institutionCampus.emailAddress",
        t2Id: "institution.id",
        t2Name: "institution.name",
        t2IsActive: "institution.isActive",
        t2FederalInstitutionCode: "institution.federalInstitutionCode",
        t2InstitutionLevelId: "institution.institutionLevelId",
      })
      .first()
      .then((result) => {
        if (result === undefined) throw new Error("Institution not found")

        return {
          id: result.t1Id,
          institutionId: result.t1InstitutionId,
          name: result.t1Name,
          federalInstitutionCode: result.t1FederalInstitutionCode,
          isActive: result.t1IsActive,
          isPrimary: result.t1IsPrimary,
          careOf: result.t1CareOf,
          addressLine1: result.t1AddressLine1,
          addressLine2: result.t1AddressLine2,
          addressCityId: result.t1AddressCityId,
          addressProvinceId: result.t1AddressProvinceId,
          addressCountryId: result.t1AddressCountryId,
          addressPostalCode: result.t1AddressPostalCode,
          emailAddress: result.t1EmailAddress,
          institution: {
            id: result.t2Id,
            name: result.t2Name,
            isActive: result.t2IsActive,
            federalInstitutionCode: result.t2FederalInstitutionCode,
            institutionLevelId: result.t2InstitutionLevelId,
          },
        }
      })
  }

  #getPersonAddress(addressId: number) {
    const personAddressesServices = new PersonAddressesService(addressId)
    return personAddressesServices.getPersonAddress()
  }
}
