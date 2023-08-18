import db from "@/db/db-client"

import { renderViewAsPdf, renderViewAsHtml } from "@/utils/express-handlebars-pdf-client"

import Application from "@/models/application"
import FundingRequest from "@/models/funding-request"
import User from "@/models/user"

import PersonAddressesService from "@/services/person-addresses-service"
import ApplicationsService from "@/services/applications-service"
import FundingRequestsService from "@/services/funding-requests-service"

export default class FundingRequestsLetterService {
  #fundingRequestId: number
  #letterSlug: string
  #signingOfficer: User

  #_fundingRequest?: FundingRequest

  constructor({
    fundingRequestId,
    letterSlug,
    signingOfficer,
  }: {
    fundingRequestId: number
    letterSlug: string
    signingOfficer: User
  }) {
    this.#fundingRequestId = fundingRequestId
    this.#letterSlug = letterSlug
    this.#signingOfficer = signingOfficer
  }

  async generateLetterAsPdf(): Promise<Buffer | string> {
    const fundingRequest = await this.#getFundingRequest(this.#fundingRequestId)
    const data = this.#serializeForTemplate(fundingRequest)

    const requestType = fundingRequest.requestType
    const templatePath = this.#getTemplatePathForRequestType("approval", requestType)

    return renderViewAsPdf(templatePath, data)
  }

  async generateLetterAsHtml(): Promise<Buffer | string> {
    return renderViewAsHtml(templatePath, data)
  }

  ////
  // See https://xkcd.com/1179/ -> https://en.wikipedia.org/wiki/ISO_8601 for date format
  async buildLetterFileName(): Promise<string> {
    const fundingRequest = await this.#getFundingRequest(this.#fundingRequestId)
    const application = fundingRequest.application

    const studentLastName = application?.student?.person?.lastName
    if (studentLastName === undefined) {
      throw new Error("No student last name")
    }

    const formattedData = new Date().toISOString().slice(0, 10) // YYYYY-MM-DD

    if (type === "rejection") {
      return `Rejection Letter, ${studentLastName}, ${formattedData}.${this.#format}`
    } else if (type === "approval") {
      return `Approval Letter, ${studentLastName}, ${formattedData}.${this.#format}`
    } else {
      throw new Error(`Invalid type: ${type}`)
    }
  }

  // Private Methods
  #serializeForTemplate(fudningRequest: FundingRequest) {
    return {
      currentDate: new Date(),
      recipient: {
        firstName: person.firstName,
        initials: person.initials,
        lastName: person.lastName,
        address: address.address1,
        city: address.cityName,
        province: address.provinceName,
        country: address.countryName,
        postalCode: address.postalCode,
      },
      program: {
        name: program.description,
        startDate: assessment.classesStartDate,
        endDate: assessment.classesEndDate,
        institutionName,
        ratePerWeekInCents: assessment.weeklyAmount * 100,
        approvalWeeks: assessment.weeksAllowed,
        travelAndAirFairCostInCents: (assessment.airfareAmount + assessment.travelAllowance) * 100,
      },
      disbursements,
      studentFinancialAssistanceOfficer: {
        name: officerName,
        position: officerPosition,
      },
    }
  }

  async #getFundingRequest(fundingRequestId: number) {
    if (this.#_fundingRequest) return this.#_fundingRequest

    this.#_fundingRequest = await FundingRequestsService.includes([
      "application",
      "assessments",
      "disbursements",
      "requestType",
    ]).find(fundingRequestId)
    return this.#_fundingRequest
  }

  #getTemplatePathForRequestType(outcome: string, typeId: number): string {
    let base = `./templates/admin/application-letter/${outcome}`
    switch (typeId) {
      case 2:
        return `${base}/yukon-grant-student`
      default:
        return `${base}/test`
    }
  }
}
