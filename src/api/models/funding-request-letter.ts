import { uniq } from "lodash"

import RequestType, { RequestTypes } from "@/models/request-type"
import Status, { Statuses } from "@/models/status"

import { FundingRequestsLettersBaseServiceConstructor } from "@/services/admin/funding-requests/letters/funding-requests-letters-base-service"
import StudentTrainingAllowanceAlkanAirApprovalLetterService from "@/services/admin/funding-requests/letters/student-training-allowance-alkan-air-approval-letter-service"
import StudentTrainingAllowanceRejectionLetterService from "@/services/admin/funding-requests/letters/student-training-allowance-rejection-letter-service"
import StudentTrainingAllowanceYukonUniversityApprovalLetterService from "@/services/admin/funding-requests/letters/student-training-allowance-yukon-university-approval-letter-service"
import YukonGrantInstitutionApprovalLetterService from "@/services/admin/funding-requests/letters/yukon-grant-institution-approval-letter-service"
import YukonGrantStudentApprovalLetterService from "@/services/admin/funding-requests/letters/yukon-grant-student-approval-letter-service"
import YukonGrantStudentRejectionLetterService from "@/services/admin/funding-requests/letters/yukon-grant-student-rejection-letter-service"

export enum TemplatePaths {
  YUKON_GRANT_INSTITUTION_APPROVAL = "./templates/admin/application-letter/approval/yukon-grant-institution",
  YUKON_GRANT_STUDENT_APPROVAL = "./templates/admin/application-letter/approval/yukon-grant-student",
  YUKON_GRANT_STUDENT_REJECTION = "./templates/admin/application-letter/rejection/yukon-grant-student",
  STUDENT_TRAINING_ALLOWANCE_YUKON_UNIVERSITY_APPROVAL = "./templates/admin/application-letter/approval/student-training-allowance-yukon-university",
  STUDENT_TRAINING_ALLOWANCE_ALKAN_AIR_APPROVAL = "./templates/admin/application-letter/approval/student-training-allowance-alkan-air",
  STUDENT_TRAINING_ALLOWANCE_REJECTION = "./templates/admin/application-letter/rejection/student-training-allowance",
}

export enum LetterTypes {
  APPROVAL = "approval",
  REJECTION = "rejection",
}

// Not a database model.
export default interface FundingRequestLetter {
  description: string
  requestStatus: Statuses
  requestType: RequestTypes
  service: FundingRequestsLettersBaseServiceConstructor
  slug: string
  template: TemplatePaths
  type: LetterTypes
}

export const FUNDING_REQUEST_LETTERS: FundingRequestLetter[] = [
  {
    description: "Yukon Grant Institution",
    requestStatus: Status.Types.AWARDED,
    requestType: RequestType.Types.YUKON_GRANT,
    service: YukonGrantInstitutionApprovalLetterService,
    slug: "yukon-grant-institution-approval",
    template: TemplatePaths.YUKON_GRANT_INSTITUTION_APPROVAL,
    type: LetterTypes.APPROVAL,
  },
  {
    description: "Yukon Grant Student",
    requestStatus: Status.Types.AWARDED,
    requestType: RequestType.Types.YUKON_GRANT,
    service: YukonGrantStudentApprovalLetterService,
    slug: "yukon-grant-student-approval",
    template: TemplatePaths.YUKON_GRANT_STUDENT_APPROVAL,
    type: LetterTypes.APPROVAL,
  },
  {
    description: "Yukon Grant Rejection",
    requestStatus: Status.Types.REJECTED,
    requestType: RequestType.Types.YUKON_GRANT,
    service: YukonGrantStudentRejectionLetterService,
    slug: "yukon-grant-student-rejection",
    template: TemplatePaths.YUKON_GRANT_STUDENT_REJECTION,
    type: LetterTypes.REJECTION,
  },
  {
    description: "Student Training Allowance - Yukon University",
    requestStatus: Status.Types.AWARDED,
    requestType: RequestType.Types.STUDENT_TRAINING_ALLOWANCE,
    service: StudentTrainingAllowanceYukonUniversityApprovalLetterService,
    slug: "student-training-allowance-yukon-university-approval",
    template: TemplatePaths.STUDENT_TRAINING_ALLOWANCE_YUKON_UNIVERSITY_APPROVAL,
    type: LetterTypes.APPROVAL,
  },
  {
    description: "Student Training Allowance - Alkan Air",
    requestStatus: Status.Types.AWARDED,
    requestType: RequestType.Types.STUDENT_TRAINING_ALLOWANCE,
    service: StudentTrainingAllowanceAlkanAirApprovalLetterService,
    slug: "student-training-allowance-alkan-air-approval",
    template: TemplatePaths.STUDENT_TRAINING_ALLOWANCE_ALKAN_AIR_APPROVAL,
    type: LetterTypes.APPROVAL,
  },
  {
    description: "Student Training Allowance Rejection",
    requestStatus: Status.Types.REJECTED,
    requestType: RequestType.Types.STUDENT_TRAINING_ALLOWANCE,
    service: StudentTrainingAllowanceRejectionLetterService,
    slug: "student-training-allowance-rejection",
    template: TemplatePaths.STUDENT_TRAINING_ALLOWANCE_REJECTION,
    type: LetterTypes.REJECTION,
  },
]

if (uniq(FUNDING_REQUEST_LETTERS.map((letter) => letter.slug)).length !== FUNDING_REQUEST_LETTERS.length)
  throw new Error("All funding request letters must have a unique slug.")
