import RequestType from "@/models/request-type";
import Status from "@/models/status";

import { FundingRequestsLettersBaseServiceConstructor } from "@/services/admin/funding-requests/letters/funding-requests-letters-base-service";
import YukonGrantInstitutionApprovalLetterService from "@/services/admin/funding-requests/letters/yukon-grant-institution-approval-letter-service";
import YukonGrantStudentApprovalLetterService from "@/services/admin/funding-requests/letters/yukon-grant-student-approval-letter-service";
import YukonGrantStudentRejectionLetterService from "@/services/admin/funding-requests/letters/yukon-grant-student-rejection-letter-service";
import STAApprovalLetterService from "@/services/admin/funding-requests/letters/sta-approval-letter-service";
import STARejectionLetterService from "@/services/admin/funding-requests/letters/sta-rejection-letter-service";

export enum TemplatePaths {
  YUKON_GRANT_INSTITUTION_APPROVAL = "./templates/admin/application-letter/approval/yukon-grant-institution",
  YUKON_GRANT_STUDENT_APPROVAL = "./templates/admin/application-letter/approval/yukon-grant-student",
  YUKON_GRANT_STUDENT_REJECTION = "./templates/admin/application-letter/rejection/yukon-grant-student",
  STA_YUKON_UNIVERSITY_APPROVAL = "./templates/admin/application-letter/approval/sta-yukon-university",
  STA_OTHER_INSTITUTION_APPROVAL = "./templates/admin/application-letter/approval/sfa-other-institution",
  STA_REJECTION = "./templates/admin/application-letter/rejection/sta",
}

export enum LetterTypes {
  APPROVAL = "approval",
  REJECTION = "rejection",
}

export enum LetterSlugs {
  INSTITUTION = "institution",
  STUDENT = "student",
  STA_YUKON = "sta-yukon",
  STA_OTHER = "sta-other",
}

// Not a database model.
interface FundingRequestLetterInterface {
  slug: LetterSlugs;
  description: string;
  type: LetterTypes;
  template: TemplatePaths;
  service: FundingRequestsLettersBaseServiceConstructor;
}

// CONSIDER: moving this to a funding-request-letter-service.ts
export const FUNDING_REQUEST_LETTERS: {
  // CONSIDER: switching something like the following signature
  // [K in RequestTypes]: {
  //   [K in RequestStatuses]: {
  //     [K in LetterSlugs]: FundingRequestLetterInterface
  //   }
  // }
  [key: string]: {
    [key: string]: {
      [key: string]: FundingRequestLetterInterface;
    };
  };
} = {
  [RequestType.Types.YUKON_GRANT]: {
    [Status.Types.AWARDED]: {
      [LetterSlugs.INSTITUTION]: {
        slug: LetterSlugs.INSTITUTION,
        description: "Yukon Grant Institution",
        type: LetterTypes.APPROVAL,
        template: TemplatePaths.YUKON_GRANT_INSTITUTION_APPROVAL,
        service: YukonGrantInstitutionApprovalLetterService,
      },
      [LetterSlugs.STUDENT]: {
        slug: LetterSlugs.STUDENT,
        description: "Yukon Grant Student",
        type: LetterTypes.APPROVAL,
        template: TemplatePaths.YUKON_GRANT_STUDENT_APPROVAL,
        service: YukonGrantStudentApprovalLetterService,
      },
    },
    [Status.Types.REJECTED]: {
      [LetterSlugs.STUDENT]: {
        slug: LetterSlugs.STUDENT,
        description: "Yukon Grant Rejection",
        type: LetterTypes.REJECTION,
        template: TemplatePaths.YUKON_GRANT_STUDENT_REJECTION,
        service: YukonGrantStudentRejectionLetterService,
      },
    },
  },

  [RequestType.Types.STUDENT_TRAINING_ALLOWANCE]: {
    [Status.Types.AWARDED]: {
      [LetterSlugs.STA_YUKON]: {
        slug: LetterSlugs.STA_YUKON,
        description: "STA Yukon University",
        type: LetterTypes.APPROVAL,
        template: TemplatePaths.STA_YUKON_UNIVERSITY_APPROVAL,
        service: STAApprovalLetterService,
      },
      [LetterSlugs.STA_OTHER]: {
        slug: LetterSlugs.STA_OTHER,
        description: "STA Other Institution",
        type: LetterTypes.APPROVAL,
        template: TemplatePaths.STA_OTHER_INSTITUTION_APPROVAL,
        service: STAApprovalLetterService,
      },
    },
    [Status.Types.REJECTED]: {
      [LetterSlugs.STUDENT]: {
        slug: LetterSlugs.STUDENT,
        description: "STA Rejection",
        type: LetterTypes.REJECTION,
        template: TemplatePaths.STA_REJECTION,
        service: STARejectionLetterService,
      },
    },
  },
};

interface FundingRequestLetter extends FundingRequestLetterInterface {}

class FundingRequestLetter {
  static getLetterService({
    requestType,
    status,
    letterSlug,
  }: {
    requestType: string;
    status: string;
    letterSlug: string;
  }): FundingRequestsLettersBaseServiceConstructor {
    const letter = FundingRequestLetter.findBy({ requestType, status, letterSlug });
    return letter.service;
  }

  static getTemplatePath({
    requestType,
    status,
    letterSlug,
  }: {
    requestType: string;
    status: string;
    letterSlug: string;
  }): string {
    const letter = FundingRequestLetter.findBy({ requestType, status, letterSlug });
    return letter.template;
  }

  static findBy({
    requestType,
    status,
    letterSlug,
  }: {
    requestType: string;
    status: string;
    letterSlug: string;
  }): FundingRequestLetterInterface {
    const statusToSlugToLetterMapping = FUNDING_REQUEST_LETTERS[requestType];
    if (statusToSlugToLetterMapping === undefined)
      throw new Error(`No letter mapping found for request type ${requestType}`);

    const slugToLetterMapping = statusToSlugToLetterMapping[status];
    if (slugToLetterMapping === undefined)
      throw new Error(`No letter mapping found for request type ${requestType} and status ${status}`);

    const letter = slugToLetterMapping[letterSlug];
    if (letter === undefined)
      throw new Error(
        `No letter mapping found for request type ${requestType} and status ${status} and letter slug ${letterSlug}`
      );

    return letter;
  }

  static findByRequestType(requestType: string) {
    return FUNDING_REQUEST_LETTERS[requestType];
  }

  static findAll() {
    return FUNDING_REQUEST_LETTERS;
  }

  static isValidLetterSlug(slug: any): slug is LetterSlugs {
    return Object.values(LetterSlugs).includes(slug);
  }
}

export default FundingRequestLetter;
