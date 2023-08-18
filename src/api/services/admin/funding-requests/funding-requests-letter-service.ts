import db from "@/db/db-client"

import { renderViewAsPdf, renderViewAsHtml } from "@/utils/express-handlebars-pdf-client"

import FundingRequest from "@/models/funding-request"
import RequestType from "@/models/request-type"
import Status from "@/models/status"
import User from "@/models/user"

import FundingRequestsService from "@/services/funding-requests-service"

enum YukonGrantLetterSlugs {
  STUDENT = "student",
  INSTITUTION = "institution",
}

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

    const templatePath = this.#getTemplatePathForRequest({
      requestType: fundingRequest.requestType?.description,
      status: fundingRequest.status?.description,
      letterSlug: this.#letterSlug,
    })
    const data = this.#serializeForTemplate(fundingRequest)

    return renderViewAsPdf(templatePath, data)
  }

  async generateLetterAsHtml(): Promise<Buffer | string> {
    const fundingRequest = await this.#getFundingRequest(this.#fundingRequestId)

    const templatePath = this.#getTemplatePathForRequest({
      requestType: fundingRequest.requestType?.description,
      status: fundingRequest.status?.description,
      letterSlug: this.#letterSlug,
    })
    const data = this.#serializeForTemplate(fundingRequest)

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
      // currentDate: new Date(),
      // recipient: {
      //   firstName: person.firstName,
      //   initials: person.initials,
      //   lastName: person.lastName,
      //   address: address.address1,
      //   city: address.cityName,
      //   province: address.provinceName,
      //   country: address.countryName,
      //   postalCode: address.postalCode,
      // },
      // program: {
      //   name: program.description,
      //   startDate: assessment.classesStartDate,
      //   endDate: assessment.classesEndDate,
      //   institutionName,
      //   ratePerWeekInCents: assessment.weeklyAmount * 100,
      //   approvalWeeks: assessment.weeksAllowed,
      //   travelAndAirFairCostInCents: (assessment.airfareAmount + assessment.travelAllowance) * 100,
      // },
      // disbursements,
      // studentFinancialAssistanceOfficer: {
      //   name: officerName,
      //   position: officerPosition,
      // },
    }
  }

  // get letter types from request type. e.g. yukon grant
  // get letter variant from request status. e.g. approval
  // get template path from letter type, varaint and letter slug. e.g. approval/yukon-grant-student.hbs
  // TODO: convert this to a hash map or something fancy like that.
  #getTemplatePathForRequest({
    requestType,
    status,
    letterSlug,
  }: {
    requestType?: string
    status?: string
    letterSlug?: string
  }): string {
    if (requestType === undefined || status === undefined || letterSlug === undefined) {
      throw new Error(
        `Could not determine template path with given request type: '${requestType}', status: '${status}', and letter slug: '${letterSlug}'`
      )
    }

    if (
      requestType === RequestType.Types.YUKON_GRANT &&
      Status.Types.AWARDED.includes(status) &&
      letterSlug === YukonGrantLetterSlugs.STUDENT
    ) {
      return `./templates/admin/application-letter/approval/yukon-grant-student`
    } else if (
      requestType === RequestType.Types.YUKON_GRANT &&
      Status.Types.AWARDED.includes(status) &&
      letterSlug === YukonGrantLetterSlugs.INSTITUTION
    ) {
      return `./templates/admin/application-letter/approval/yukon-grant-institution`
    } else {
      throw new Error(
        `Could not determine template path with given request type: '${requestType}', status: '${status}', and letter slug: '${letterSlug}'`
      )
    }
  }

  async #getFundingRequest(fundingRequestId: number) {
    if (this.#_fundingRequest) return this.#_fundingRequest

    this.#_fundingRequest = await FundingRequestsService.includes([
      "application",
      "assessments",
      "disbursements",
      "requestType",
      "status",
    ]).find(fundingRequestId)
    return this.#_fundingRequest
  }
}
