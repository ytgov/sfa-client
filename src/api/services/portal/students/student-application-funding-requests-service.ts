import db from "@/db/db-client"

export default class StudentApplicationFundingRequestsService {
  #applicationId: number

  constructor({ applicationId }: { applicationId: number }) {
    this.#applicationId = applicationId
  }

  async getFundingRequests() {
    const rows = await db("funding_request")
      .join("request_type", "funding_request.requestTypeId", "request_type.id")
      .select(
        "funding_request.id",
        "funding_request.requestTypeId",
        "request_type.description"
      )
      .where({ applicationId: this.#applicationId })
    return rows.map((row) => ({
      id: row.id,
      requestTypeId: row.requestTypeId,
      requestType: { id: row.requestTypeId, description: row.description },
    }))
  }
}
