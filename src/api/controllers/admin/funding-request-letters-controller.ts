import FundingRequestLetter from "@/models/funding-request-letter"

import BaseController from "@/controllers/base-controller"

export default class FundingRequestLettersController extends BaseController {
  async listLetters() {
    if (this.request.params.fundingRequestId === undefined) {
      const fundingRequestLetterMetadata = FundingRequestLetter.findAll()
      return this.response.send(fundingRequestLetterMetadata)
    }
  }
}
