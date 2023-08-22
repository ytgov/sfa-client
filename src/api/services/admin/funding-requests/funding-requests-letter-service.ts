import { renderViewAsPdf, renderViewAsHtml } from "@/utils/express-handlebars-pdf-client"

import FundingRequestLetterRecord, { TemplatePaths } from "@/models/funding-request-letter"
import FundingRequest from "@/models/funding-request"
import User from "@/models/user"

import FundingRequestsService from "@/services/funding-requests-service"
import YukonGrantStudentTemplateSerializer from "@/serializers/funding-requests/letters/yukon-grant-student-template-serializer"

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

  async generateLetterAsPdf(): Promise<{ fileContent: Buffer; fileName: string }> {
    const fundingRequest = await this.#getFundingRequest(this.#fundingRequestId)

    const templatePath = this.#getTemplatePathForRequest({
      requestType: fundingRequest.requestType?.description,
      status: fundingRequest.status?.description,
      letterSlug: this.#letterSlug,
    })
    const data = this.#serializeForTemplate({
      templatePath,
      fundingRequest,
      signingOfficer: this.#signingOfficer,
    })
    const fileContent = await renderViewAsPdf(templatePath, data)

    const fileName = this.#buildFileName({
      fundingRequest,
      templatePath,
      format: "pdf",
    })

    return {
      fileContent,
      fileName,
    }
  }

  async generateLetterAsHtml(): Promise<Buffer | string> {
    const fundingRequest = await this.#getFundingRequest(this.#fundingRequestId)

    const templatePath = this.#getTemplatePathForRequest({
      requestType: fundingRequest.requestType?.description,
      status: fundingRequest.status?.description,
      letterSlug: this.#letterSlug,
    })
    const data = this.#serializeForTemplate({
      templatePath,
      fundingRequest,
      signingOfficer: this.#signingOfficer,
    })

    return renderViewAsHtml(templatePath, data)
  }

  // Private Methods
  #serializeForTemplate({
    templatePath,
    fundingRequest,
    signingOfficer,
  }: {
    templatePath: string
    fundingRequest: FundingRequest
    signingOfficer: User
  }) {
    if (templatePath === TemplatePaths.YUKON_GRANT_INSTITUTION_APPROVAL) {
      return {
        fundingRequest,
        signingOfficer,
      }
    } else if (templatePath === TemplatePaths.YUKON_GRANT_STUDENT_APPROVAL) {
      return YukonGrantStudentTemplateSerializer.prepare({
        fundingRequest,
        signingOfficer,
      })
    } else {
      throw new Error(`Unknown serialization requirement for template path: ${templatePath}`)
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

    return FundingRequestLetterRecord.getTemplatePath({
      requestType,
      status,
      letterSlug,
    })
  }

  // TODO: convert this to a hash map or something fancy like that.
  #buildFileName({
    templatePath,
    fundingRequest,
    format,
  }: {
    templatePath: string
    fundingRequest: FundingRequest
    format: string
  }): string {
    const person = fundingRequest.application?.student?.person
    if (person === undefined) throw new Error("Could not find person")

    const { firstName, lastName } = person
    if (firstName === undefined || lastName === undefined)
      throw new Error("Could not find person's name info")

    // See https://xkcd.com/1179/ -> https://en.wikipedia.org/wiki/ISO_8601 for date format
    const formattedDate = new Date().toISOString().slice(0, 10) // YYYYY-MM-DD
    if (
      templatePath === TemplatePaths.YUKON_GRANT_INSTITUTION_APPROVAL ||
      templatePath === TemplatePaths.YUKON_GRANT_STUDENT_APPROVAL
    ) {
      return `YG Approval Letter, ${lastName} ${firstName}, ${formattedDate}.${format}`
    } else {
      throw new Error(`Could not determine file name with given template path: '${templatePath}'`)
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
