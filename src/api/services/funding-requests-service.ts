import db from "@/db/db-client"

import Application from "@/models/application"
import FundingRequest from "@/models/funding-request"

import ApplicationsService from "@/services/applications-service"

export default class FundingRequestsService {
  #fundingRequestId: number

  constructor(fundingRequestId: number) {
    this.#fundingRequestId = fundingRequestId
  }

  // NOTE: if you want this to be faster, switch to Sequelize.
  async getFundingRequest(
    {
      includes,
    }: {
      includes: ("application" | "assessment" | "disbursements")[]
    } = { includes: [] }
  ): Promise<FundingRequest> {
    const fundingRequest = await db("fundingRequest")
      .where({ id: this.#fundingRequestId })
      .first()
      .then((fundingRequest) => {
        if (fundingRequest === undefined) throw new Error("Funding request not found")

        return fundingRequest
      })

    if (includes.includes("application")) {
      fundingRequest.application = await this.#getApplication(fundingRequest.applicationId)
    }

    if (includes.includes("assessment")) {
      fundingRequest.assessment = await db("assessment")
        .where({ fundingRequestId: fundingRequest.id })
        .first()
        .then((assessment) => {
          if (assessment === undefined) throw new Error("Assessment not found")

          return assessment
        })
    }

    if (includes.includes("disbursements")) {
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
