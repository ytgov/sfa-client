import { isNil } from "lodash"

import FundingRequest from "@/models/funding-request"
import User from "@/models/user"

export default class YukonGrantInstitutionApprovalTemplateSerializer {
  #fundingRequest: FundingRequest
  #signingOfficer: User

  constructor({
    fundingRequest,
    signingOfficer,
  }: {
    fundingRequest: FundingRequest
    signingOfficer: User
  }) {
    this.#fundingRequest = fundingRequest
    this.#signingOfficer = signingOfficer
  }

  static prepare({
    fundingRequest,
    signingOfficer,
  }: {
    fundingRequest: FundingRequest
    signingOfficer: User
  }) {
    const serializer = new YukonGrantInstitutionApprovalTemplateSerializer({
      fundingRequest,
      signingOfficer,
    })
    return serializer.prepare()
  }

  prepare() {
    const application = this.#fundingRequest.application
    if (application === undefined)
      throw new Error(
        "Could not prepare template data as application is missing from funding request."
      )

    const institutionCampus = application.institutionCampus
    if (institutionCampus === undefined)
      throw new Error(
        "Could not prepare template data as institutionCampus is missing from application."
      )

    if (isNil(institutionCampus.addressLine1))
      throw new Error(
        "Could not prepare template data as addressLine1 is missing from institutionCampus."
      )

    const addressCity = institutionCampus.addressCity
    if (addressCity === undefined)
      throw new Error(
        "Could not prepare template data as addressCity is missing from institutionCampus."
      )

    const addressProvince = institutionCampus.addressProvince
    if (addressProvince === undefined)
      throw new Error(
        "Could not prepare template data as addressProvince is missing from institutionCampus."
      )

    const addressCountry = institutionCampus.addressCountry
    if (addressCountry === undefined)
      throw new Error(
        "Could not prepare template data as addressCountry is missing from institutionCampus."
      )

    if (isNil(institutionCampus.addressPostalCode))
      throw new Error(
        "Could not prepare template data as addressPostalCode is missing from institutionCampus."
      )

    const student = application.student
    if (student === undefined)
      throw new Error("Could not prepare template data as student is missing from application.")
    if (isNil(student.yukonId))
      throw new Error("Could not prepare template data as yukonId is missing from student.")

    const person = student.person
    if (person === undefined)
      throw new Error("Could not prepare template data as person is missing from student.")

    if (isNil(person.firstName))
      throw new Error("Could not prepare template data as firstName is missing from person.")
    if (isNil(person.lastName))
      throw new Error("Could not prepare template data as lastName is missing from person.")

    const assessments = this.#fundingRequest.assessments
    if (assessments === undefined)
      throw new Error(
        "Could not prepare template data as assessments is missing from funding request."
      )
    if (assessments.length > 1)
      // TODO: consider returning only the last assessment?
      throw new Error("Could not prepare template data as multiple assessments are not supported.")

    const assessment = assessments[0]
    if (assessment === undefined)
      throw new Error(
        "Could not prepare template data as assessment is missing from funding request."
      )

    const disbursements = this.#prepareDisbursements(this.#fundingRequest)

    return {
      currentDate: new Date(),
      institution: {
        addressLine1: institutionCampus.addressLine1,
        addressLine2: institutionCampus.addressLine2,
        city: addressCity.description,
        province: addressProvince.description,
        country: addressCountry.description,
        postalCode: institutionCampus.addressPostalCode,
      },
      student: {
        firstName: person.firstName,
        lastName: person.lastName,
        // TODO: verify this is the correct field
        // might be application.studentNumber
        identificationCode: student.yukonId,
      },
      studyPeriod: {
        startDate: assessment.classesStartDate,
        endDate: assessment.classesEndDate,
      },
      disbursements,
      studentFinancialAssistanceOfficer: this.#signingOfficer,
    }
  }

  #prepareDisbursements(fundingRequest: FundingRequest) {
    const disbursements = fundingRequest.disbursements
    if (disbursements === undefined)
      throw new Error(
        "Could not prepare template data as disbursements are missing from funding request."
      )
    if (disbursements.length === 0)
      throw new Error("Could not prepare template data as no disbursements are present.")

    return disbursements.map((disbursement) => {
      if (disbursement.disbursedAmount === undefined)
        throw new Error(
          "Could not prepare template data as disbursement disbursed amount is missing."
        )

      if (disbursement.issueDate === undefined)
        throw new Error("Could not prepare template data as disbursement issue date is missing.")

      return {
        amountInCents: disbursement.disbursedAmount * 100,
        releaseDate: disbursement.issueDate,
      }
    })
  }
}
