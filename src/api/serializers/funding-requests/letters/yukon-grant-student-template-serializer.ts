import Application from "@/models/application"
import FundingRequest from "@/models/funding-request"
import User from "@/models/user"

export default class YukonGrantStudentTemplateSerializer {
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
    const serializer = new YukonGrantStudentTemplateSerializer({ fundingRequest, signingOfficer })
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

    const primaryAddress = application?.primaryAddress
    if (primaryAddress === undefined)
      throw new Error(
        "Could not prepare template data as primary address is missing from application."
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
    if (assessments.length > 1) // TODO: consider returning only the last assessment?
      throw new Error("Could not prepare template data as multiple assessments are not supported.")

    const assessment = assessments[0]
    if (assessment === undefined)
      throw new Error(
        "Could not prepare template data as assessment is missing from funding request."
      )

    const institutionName = this.#prepareInstitutionName(application)

    if (assessment.weeklyAmount === undefined)
      throw new Error("Could not prepare template data as assessement weekly amount is missing.")
    const ratePerWeekInCents = assessment.weeklyAmount * 100

    if (assessment.airfareAmount === undefined)
      throw new Error("Could not prepare template data as assessement airfaire amount is missing.")
    if (assessment.travelAllowance === undefined)
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
        address: primaryAddress.address1,
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
