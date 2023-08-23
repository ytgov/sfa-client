import { isNil, last, sortBy } from "lodash"

import Application from "@/models/application"
import FundingRequest from "@/models/funding-request"
import Person from "@/models/person"
import PersonAddress from "@/models/person-address"
import User from "@/models/user"

export default class YukonGrantStudentApprovalTemplateSerializer {
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
    const serializer = new YukonGrantStudentApprovalTemplateSerializer({
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

    const studyArea = application.studyArea
    if (studyArea === undefined)
      throw new Error("Could not prepare template data as study area is missing from application.")

    const assessments = this.#fundingRequest.assessments
    if (assessments === undefined)
      throw new Error(
        "Could not prepare template data as assessments is missing from funding request."
      )
    if (assessments.length > 1)
      console.warn(
        "More than one assessment detected for funding request. This system state has not been investigated."
      )

    const assessment = last(sortBy(assessments, ["assessedDate"]))
    if (assessment === undefined)
      throw new Error(
        "Could not prepare template data as assessment is missing from funding request."
      )
    if (isNil(assessment.classesStartDate))
      throw new Error(
        "Could not prepare template data as classesStartDate is missing from studyArea."
      )
    if (isNil(assessment.classesEndDate))
      throw new Error(
        "Could not prepare template data as classesEndDate is missing from studyArea."
      )

    const institutionName = this.#prepareInstitutionName(application)

    if (isNil(assessment.weeklyAmount))
      throw new Error("Could not prepare template data as assessement weekly amount is missing.")
    const ratePerWeekInCents = assessment.weeklyAmount * 100

    if (isNil(assessment.weeksAllowed))
      throw new Error("Could not prepare template data as weeksAllowed is missing from assessment.")

    if (isNil(assessment.airfareAmount))
      throw new Error("Could not prepare template data as assessement airfaire amount is missing.")
    if (isNil(assessment.travelAllowance))
      throw new Error("Could not prepare template data as assessement travel allowance is missing.")
    const travelAndAirFairCostInCents =
      (assessment.airfareAmount + assessment.travelAllowance) * 100

    const disbursements = this.#prepareDisbursements(this.#fundingRequest)

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
      program: {
        name: studyArea.description,
        startDate: assessment.classesStartDate,
        endDate: assessment.classesEndDate,
        institutionName,
        ratePerWeekInCents,
        approvalWeeks: assessment.weeksAllowed,
        travelAndAirFairCostInCents,
      },
      disbursements,
      studentFinancialAssistanceOfficer: this.#signingOfficer,
    }
  }

  #preparePrimaryAddress(application: Application, person: Person): PersonAddress {
    const primaryAddress = application?.primaryAddress
    if (primaryAddress === undefined)
      throw new Error(
        "Could not prepare template data as primary address is missing from application."
      )
    // TODO: fall back to student.person.personAddress
    return primaryAddress
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

      return {
        amountInCents: disbursement.disbursedAmount * 100,
        releaseDate: disbursement.issueDate,
      }
    })
  }

  #prepareInstitutionName(application: Application) {
    const institutionCampus = application.institutionCampus
    if (institutionCampus === undefined)
      throw new Error(
        "Could not prepare template data as institution campus is missing from application."
      )

    const institution = institutionCampus.institution
    if (institution === undefined)
      throw new Error(
        "Could not prepare template data as institution is missing from institution campus."
      )

    return (
      institution.name + (institutionCampus.name == "Primary" ? "" : ` - ${institutionCampus.name}`)
    )
  }
}
