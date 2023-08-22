import RequestType from "@/models/request-type"
import Status from "@/models/status"

// Not a database model.
interface FundingRequestLetterRecord {
  slug: LetterSlugs
  description: string
  type: LetterTypes
  template: TemplatePaths
}

export enum TemplatePaths {
  YUKON_GRANT_STUDENT_APPROVAL = "./templates/admin/application-letter/approval/yukon-grant-student",
  YUKON_GRANT_INSTITUTION_APPROVAL = "./templates/admin/application-letter/approval/yukon-grant-institution",
}

enum LetterTypes {
  APPROVAL = "approval",
  REJECTION = "rejection",
}

enum LetterSlugs {
  STUDENT = "student",
  INSTITUTION = "institution",
}

export const FUNDING_REQUEST_TO_STATUS_TO_SLUG_TO_LETTER_MAPPING: {
  // TODO: consider switching something like the following signature
  // [K in RequestTypes]: {
  //   [K in RequestStatuses]: {
  //     [K in LetterSlugs]: FundingRequestLetterRecord
  //   }
  // }
  [key: string]: {
    [key: string]: {
      [key: string]: FundingRequestLetterRecord
    }
  }
} = {
  [RequestType.Types.YUKON_GRANT]: {
    [Status.Types.AWARDED]: {
      [LetterSlugs.STUDENT]: {
        slug: LetterSlugs.STUDENT,
        description: "Yukon Grant Student",
        type: LetterTypes.APPROVAL,
        template: TemplatePaths.YUKON_GRANT_INSTITUTION_APPROVAL,
      },
      [LetterSlugs.INSTITUTION]: {
        slug: LetterSlugs.INSTITUTION,
        description: "Yukon Grant Institution",
        type: LetterTypes.APPROVAL,
        template: TemplatePaths.YUKON_GRANT_INSTITUTION_APPROVAL,
      },
    },
  },
}

interface FundingRequestLetter extends FundingRequestLetterRecord {}

class FundingRequestLetter {
  static getTemplatePath({
    requestType,
    status,
    letterSlug,
  }: {
    requestType: string
    status: string
    letterSlug: string
  }): string {
    const statusToSlugToLetterMapping = FUNDING_REQUEST_TO_STATUS_TO_SLUG_TO_LETTER_MAPPING[requestType]
    if (statusToSlugToLetterMapping === undefined)
      throw new Error(`No letter mapping found for request type ${requestType}`)

    const slugToLetterMapping = statusToSlugToLetterMapping[status]
    if (slugToLetterMapping === undefined)
      throw new Error(
        `No letter mapping found for request type ${requestType} and status ${status}`
      )

    const letter = slugToLetterMapping[letterSlug]
    if (letter === undefined)
      throw new Error(
        `No letter mapping found for request type ${requestType} and status ${status} and letter slug ${letterSlug}`
      )

    return letter.template
  }

  static findByRequestType(requestType: string) {
    return FUNDING_REQUEST_TO_STATUS_TO_SLUG_TO_LETTER_MAPPING[requestType]
  }

  static findAll() {
    return FUNDING_REQUEST_TO_STATUS_TO_SLUG_TO_LETTER_MAPPING
  }
}

export default FundingRequestLetter
