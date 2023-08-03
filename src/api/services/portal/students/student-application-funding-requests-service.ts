import db from "@/db/db-client"

export default class StudentApplicationFundingRequestsService {
  #applicationId: number

  constructor({ applicationId }: { applicationId: number }) {
    this.#applicationId = applicationId
  }

  async getFundingRequests() {
    const rows = await db("sfa.funding_request")
      .join("sfa.request_type", "sfa.funding_request.requestTypeId", "sfa.request_type.id")
      .select(
        "sfa.funding_request.id",
        "sfa.funding_request.requestTypeId",
        "sfa.request_type.description"
      )
      .where({ applicationId: this.#applicationId })
    return rows.map((row) => ({
      id: row.id,
      requestTypeId: row.requestTypeId,
      requestType: { id: row.requestTypeId, description: row.description },
    }))
  }
}
