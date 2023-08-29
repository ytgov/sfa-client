import { renderViewAsPdf, renderViewAsHtml } from "@/utils/express-handlebars-pdf-client"

import { RequestTypes } from "@/models/request-type"
import { Statuses } from "@/models/status"
import FundingRequest from "@/models/funding-request"
import User from "@/models/user"

export type FundingRequestsLettersBaseServiceConstructor = new (
  ...args: ConstructorParameters<typeof FundingRequestsLettersBaseService>
) => FundingRequestsLettersBaseService

export default class FundingRequestsLettersBaseService {
  protected fundingRequest: FundingRequest
  protected letterSlug: string
  protected requestType: RequestTypes
  protected signingOfficer: User
  protected status: Statuses
  protected director: User

  constructor({
    fundingRequest,
    letterSlug,
    requestType,
    signingOfficer,
    status,
    director,
  }: {
    fundingRequest: FundingRequest
    letterSlug: string
    requestType: RequestTypes
    signingOfficer: User
    status: Statuses
    director: User
  }) {
    this.fundingRequest = fundingRequest
    this.letterSlug = letterSlug
    this.requestType = requestType
    this.signingOfficer = signingOfficer
    this.status = status
    this.director = director
  }

  renderAsPdf() {
    const templatePath = this.getTemplatePath()
    const data = this.serializeForTemplate()

    return renderViewAsPdf(templatePath, data)
  }

  renderAsHtml() {
    const templatePath = this.getTemplatePath()
    const data = this.serializeForTemplate()

    return renderViewAsHtml(templatePath, data)
  }

  renderAsJson() {
    const templatePath = this.getTemplatePath()

    let data: { error?: string; stackTrace?: string[] } = {}
    try {
      data = this.serializeForTemplate()
    } catch (error) {
      if (error instanceof Error) {
        data.error = error.message
        data.stackTrace = error.stack?.split("\n").map((line) => line.trim())
      } else {
        throw error
      }
    }

    return {
      templatePath,
      serializerData: data,
      rawData: {
        fundingRequest: this.fundingRequest,
        letterSlug: this.letterSlug,
        requestType: this.requestType,
        signingOfficer: this.signingOfficer,
        status: this.status,
      },
    }
  }

  getTemplatePath(): string {
    throw new Error("Method not implemented.")
  }

  serializeForTemplate(): any {
    throw new Error("Method not implemented.")
  }

  buildFileName({ format }: { format: string }): string {
    throw new Error("Method not implemented.")
  }
}
