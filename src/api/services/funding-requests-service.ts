import db from "@/db/db-client"

import Application from "@/models/application"
import FundingRequest from "@/models/funding-request"

import ApplicationsService from "@/services/applications-service"

namespace FundingRequestsService {
  export type IncludeTypes = ("application" | "assessment" | "disbursements")[]
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
  async find(id: number): Promise<FundingRequest> {
    const fundingRequest = await db("fundingRequest")
      .where({ id })
      .first()
      .then((fundingRequest) => {
        if (fundingRequest === undefined) throw new Error("Funding request not found")

        return fundingRequest
      })

    if (this.#includes.includes("application")) {
      fundingRequest.application = await this.#getApplication(fundingRequest.applicationId)
    }

    if (this.#includes.includes("assessment")) {
      fundingRequest.assessment = await db("assessment")
        .where({ fundingRequestId: fundingRequest.id })
        .first()
        .then((assessment) => {
          if (assessment === undefined) throw new Error("Assessment not found")

          return assessment
        })
    }

    if (this.#includes.includes("disbursements")) {
      fundingRequest.disbursements = await db("disbursement")
        .where({
          fundingRequestId: fundingRequest.id,
        })
        .then((disbursements) => {
          if (disbursements === undefined) throw new Error("Disbursements not found")

          return disbursements
        })
    }

    return fundingRequest
  }

  #getApplication(applicationId: number): Promise<Application> {
    const applicationsService = new ApplicationsService(applicationId)
    return applicationsService.getApplication({
      includes: ["student", "personAddress", "institutionCampus", "studyArea"],
    })
  }
}
