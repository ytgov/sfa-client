import db from "@/db/db-client"

import FundingRequest from "@/models/funding-request"

import ApplicationsService from "@/services/applications-service"

namespace FundingRequestsService {
  export type IncludeTypes = (
    | "application"
    | "assessments"
    | "disbursements"
    | "requestType"
    | "status"
  )[]
}

export default class FundingRequestsService {
  #includes: FundingRequestsService.IncludeTypes

  constructor({ includes }: { includes?: FundingRequestsService.IncludeTypes } = {}) {
    this.#includes = includes || []
  }

  static includes(includes: FundingRequestsService.IncludeTypes) {
    return new FundingRequestsService({ includes })
  }

  static find(id: number) {
    const service = new FundingRequestsService()
    return service.find(id)
  }

  // OPINION: if you want this to be faster, switch to Sequelize.
  // It would be more worthwhile than writing these as massive dynamic queries and recreating an ORM.
  async find(id: number): Promise<FundingRequest> {
    const fundingRequest = await db<FundingRequest>("fundingRequest")
      .where({ id })
      .first()
      .then((fundingRequest) => {
        if (fundingRequest) return fundingRequest

        throw new Error("Funding request not found")
      })

    if (this.#includes.includes("application")) {
      fundingRequest.application = await ApplicationsService.includes([
        "institutionCampus",
        "primaryAddress",
        "student",
        "studyArea",
      ]).find(fundingRequest.applicationId)
    }

    if (this.#includes.includes("assessments")) {
      fundingRequest.assessments = await db("assessment").where({
        fundingRequestId: fundingRequest.id,
      })
    }

    if (this.#includes.includes("disbursements")) {
      fundingRequest.disbursements = await db("disbursement").where({
        fundingRequestId: fundingRequest.id,
      })
    }

    if (this.#includes.includes("requestType") && fundingRequest.requestTypeId) {
      fundingRequest.requestType = await db("requestType")
        .where({ id: fundingRequest.requestTypeId })
        .first()
        .then((requestType) => {
          if (requestType) return requestType

          throw new Error("Request type not found")
        })
    }

    if (this.#includes.includes("status") && fundingRequest.statusId) {
      fundingRequest.status = await db("status")
        .where({ id: fundingRequest.statusId })
        .first()
        .then((status) => {
          if (status) return status

          throw new Error("Status not found")
        })
    }

    return fundingRequest
  }
}
