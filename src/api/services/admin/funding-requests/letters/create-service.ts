import FundingRequest from "@/models/funding-request"
import Institution, { InstitutionNames } from "@/models/institution"
import RequestType, { RequestTypes } from "@/models/request-type"
import Status, { Statuses } from "@/models/status"
import User from "@/models/user"

import FundingRequestsService from "@/services/funding-requests-service"

import YukonGrantInstitutionApprovalLetterService from "@/services/admin/funding-requests/letters/yukon-grant-institution-approval-letter-service"

export default class CreateService {
  #fundingRequestId: number
  #signingOfficer: User

  constructor({
    fundingRequestId,
    signingOfficer,
  }: {
    fundingRequestId: number
    signingOfficer: User
  }) {
    this.#fundingRequestId = fundingRequestId
    this.#signingOfficer = signingOfficer
  }

  async preform(): Promise<string[]> {
    const fundingRequest = await this.#getFundingRequest(this.#fundingRequestId)
    const requestStatus = this.#getRequestStatus(fundingRequest)
    const requestType = this.#getRequestType(fundingRequest)
    const signingOfficer = this.#signingOfficer

    if (requestType === RequestType.Types.YUKON_GRANT && requestStatus === Status.Types.AWARDED) {
      const director = await this.#getDirector()
      return this.#generateYukonGrantLetters({ fundingRequest, director, signingOfficer })
    } else if (
      requestType === RequestType.Types.YUKON_GRANT &&
      requestStatus === Status.Types.REJECTED
    ) {
      // generate yukon-grant-student-rejection
      return []
    } else if (
      requestType === RequestType.Types.STUDENT_TRAINING_ALLOWANCE &&
      requestStatus === Status.Types.AWARDED
    ) {
      const institutionName = this.#getInstitutionName(fundingRequest)

      if (institutionName === Institution.Names.YUKON_UNIVERSITY) {
        // generate student-training-allowance-yukon-university-approval
        return []
      } else if (institutionName === Institution.Names.ALKAN_AIR_FLIGHT_TRAINING) {
        // generate student-training-allowance-alkan-air-flight-training-approval
        return []
      } else {
        throw new Error(
          `Could not generate Student Training Allowance letter for institution name: ${institutionName}`
        )
      }
    } else {
      throw new Error(
        `Could not generate letter for this funding request with request type: ${requestType} and status: ${requestStatus}`
      )
    }
  }

  // TODO: consider refactoring this to its own service
  // generate yukon-grant-institution-approval
  // generate yukon-grant-student-approval
  async #generateYukonGrantLetters({
    director,
    fundingRequest,
    signingOfficer,
  }: {
    director: User
    fundingRequest: FundingRequest
    signingOfficer: User
  }): Promise<string[]> {
    const letterNames = []
    const yukonGrantInstitutionLetterService = new YukonGrantInstitutionApprovalLetterService({
      fundingRequest,
      director,
      signingOfficer,
    })

    const yukonGrantInstitutionLetter = await yukonGrantInstitutionLetterService.renderAsPdf()
    // save somewhere ...
    letterNames.push(yukonGrantInstitutionLetterService.buildFileName({ format: "pdf" }))

    const yukonGrantStudentLetterService = new YukonGrantInstitutionApprovalLetterService({
      director,
      fundingRequest,
      signingOfficer,
    })
    const yukonGrantStudentLetter = await yukonGrantStudentLetterService.renderAsPdf()
    // save somewhere...
    letterNames.push(yukonGrantStudentLetterService.buildFileName({ format: "pdf" }))

    return letterNames
  }

  #getFundingRequest(fundingRequestId: number): Promise<FundingRequest> {
    return FundingRequestsService.includes([
      "application",
      "assessments",
      "disbursements",
      "requestType",
      "status",
      "statusReason",
    ]).find(fundingRequestId)
  }

  #getRequestType(fundingRequest: FundingRequest): RequestTypes {
    const requestType = fundingRequest.requestType?.description
    if (!RequestType.isValidRequestType(requestType))
      throw new Error(`Invalid request type: ${requestType}`)

    return requestType
  }

  #getRequestStatus(fundingRequest: FundingRequest): Statuses {
    const status = fundingRequest.status?.description
    if (!Status.isValidStatus(status)) throw new Error(`Invalid status: ${status}`)

    return status
  }

  #getInstitutionName(fundingRequest: FundingRequest): InstitutionNames {
    const institutionName = fundingRequest.application?.institutionCampus?.institution?.name
    if (!Institution.isValidInstitutionName(institutionName))
      throw new Error(`Invalid institution name: ${institutionName}`)

    return institutionName
  }

  // TODO: This should pull from the database once the director exists there
  async #getDirector(): Promise<User> {
    return {
      firstName: "Kirsti",
      lastName: "de Vries",
      email: "kirsti.devries@yukon.ca",
      phone: "867-667-5129",
      position: "Director of Training Programs",
    } as User
  }
}
