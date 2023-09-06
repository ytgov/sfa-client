import FundingRequestLettersService from "@/services/funding-request-letters-service"
import FundingRequestsService from "@/services/funding-requests-service"

import FundingRequest from "@/models/funding-request"
import RequestType from "@/models/request-type"
import Status from "@/models/status"
import User from "@/models/user"

export default class FundingRequestsLetterBuilderService {
  #fundingRequestId: number
  #letterSlug: string
  #signingOfficer: User

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
    const letterService = await this.#buildLetterService()

    const fileContent = await letterService.renderAsPdf()
    const fileName = letterService.buildFileName({ format: "pdf" })

    return {
      fileContent,
      fileName,
    }
  }

  async generateLetterAsHtml(): Promise<Buffer | string> {
    const letterService = await this.#buildLetterService()

    return letterService.renderAsHtml()
  }

  async generateLetterAsJson() {
    const letterService = await this.#buildLetterService()

    return letterService.renderAsJson()
  }

  async #buildLetterService() {
    if (!FundingRequestLettersService.isValidSlug(this.#letterSlug))
      throw new Error(`Invalid letter slug: ${this.#letterSlug}`)

    const fundingRequest = await this.#getFundingRequest(this.#fundingRequestId)
    const requestType = fundingRequest.requestType?.description
    if (!RequestType.isValidRequestType(requestType))
      throw new Error(`Invalid request type: ${requestType}`)

    const status = fundingRequest.status?.description
    if (!Status.isValidStatus(status)) throw new Error(`Invalid status: ${status}`)

    const director = await this.#getDirector()

    const LetterServiceClass = FundingRequestLettersService.getServiceClass({
      requestType,
      status,
      letterSlug: this.#letterSlug,
    })
    return new LetterServiceClass({
      fundingRequest,
      letterSlug: this.#letterSlug,
      requestType,
      signingOfficer: this.#signingOfficer,
      status,
      director,
    })
  }

  async #getFundingRequest(fundingRequestId: number): Promise<FundingRequest> {
    return FundingRequestsService.includes([
      "application",
      "assessments",
      "disbursements",
      "requestType",
      "status",
      "statusReason",
    ]).find(fundingRequestId)
  }

  // TODO: This should pull from the database once the director exists there
  async #getDirector(): Promise<User> {
    return {
      firstName: "Kirsti",
      lastName: "de Vries",
      email: "kirsti.devries@yukon.ca",
      phone: "867-667-5129",
      position: "Director of Training Programs"
    } as User
  }
}
