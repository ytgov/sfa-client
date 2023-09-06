import BaseController from "@/controllers/base-controller"

import FundingRequestLettersService from "@/services/funding-request-letters-service"

export default class FundingRequestLettersController extends BaseController {
  async listLetters() {
    if (this.request.params.fundingRequestId === undefined) {
      const fundingRequestLetterMetadata = FundingRequestLettersService.all()
      return this.response.send(fundingRequestLetterMetadata)
    }
  }
}
