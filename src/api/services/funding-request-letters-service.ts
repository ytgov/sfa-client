import FundingRequestLetter, { FUNDING_REQUEST_LETTERS } from "@/models/funding-request-letter"
import { FundingRequestsLettersBaseServiceConstructor } from "./admin/funding-requests/letters/funding-requests-letters-base-service"

interface FilterOptions {
  requestType: string
  status: string
  letterSlug: string
}

export default class FundingRequestLettersService {
  static findBy({ requestType, status, letterSlug }: FilterOptions): FundingRequestLetter {
    const letter = FUNDING_REQUEST_LETTERS.find(
      (letter) =>
        letter.requestType === requestType &&
        letter.requestStatus === status &&
        letter.slug === letterSlug
    )

    if (letter === undefined)
      throw new Error(
        `No letter mapping found for request type ${requestType} and status ${status} and letter slug ${letterSlug}`
      )

    return letter
  }

  static getServiceClass({
    requestType,
    status,
    letterSlug,
  }: FilterOptions): FundingRequestsLettersBaseServiceConstructor {
    const letter = FundingRequestLettersService.findBy({ requestType, status, letterSlug })
    return letter.service
  }

  static findByRequestType(requestType: string) {
    return FUNDING_REQUEST_LETTERS.find((letter) => letter.requestType === requestType)
  }

  static all() {
    return FUNDING_REQUEST_LETTERS
  }

  static isValidSlug(slug: string) {
    return FUNDING_REQUEST_LETTERS.some((letter) => letter.slug === slug)
  }
}
