import { groupBy, keyBy } from "lodash"

import db from "@/db/db-client"

import { NON_EXISTANT_ID } from "@/utils/constants"

import FundingRequest from "@/models/funding-request"

export default class StudentApplicationFundingRequestsService {
  #applicationId: number

  constructor({ applicationId }: { applicationId: number }) {
    this.#applicationId = applicationId
  }

  async getFundingRequests() {
    const fundingRequests = await db("fundingRequest").where({ applicationId: this.#applicationId })

    await this.#injectRequestTypes(fundingRequests)
    await this.#injectAssessments(fundingRequests)

    return fundingRequests
  }

  async #injectRequestTypes(fundingRequests: FundingRequest[]) {
    const requestTypeIds = fundingRequests.map((fundingRequest) => fundingRequest.requestTypeId)
    const requestTypeHash = await db("requestType")
      .where("id", "in", requestTypeIds)
      .then((rows) => keyBy(rows, "id"))

    fundingRequests.forEach((fundingRequest) => {
      const requestTypeId = fundingRequest.requestTypeId || NON_EXISTANT_ID
      fundingRequest.requestType = requestTypeHash[requestTypeId]
    })
  }

  async #injectAssessments(fundingRequests: FundingRequest[]) {
    const fundingRequestIds = fundingRequests.map((fundingRequest) => fundingRequest.id)

    const assessments = await db("assessment").whereIn("fundingRequestId", fundingRequestIds)
    const assessmentsHash = groupBy(assessments, "fundingRequestId")

    fundingRequests.forEach((fundingRequest) => {
      const fundingRequestId = fundingRequest.id || NON_EXISTANT_ID
      fundingRequest.assessments = assessmentsHash[fundingRequestId]
    })
  }
}
