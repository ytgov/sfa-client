import { TemplatePaths } from "@/models/funding-request-letter"

import CanadaStudentLoanFulltimeApprovalTemplateSerializer from "@/serializers/funding-requests/letters/canada-student-loan-fulltime-approval-template-serializer"

import FundingRequestsLettersBaseService from "@/services/admin/funding-requests/letters/funding-requests-letters-base-service"

export default class YukonGrantStudentFulltimeApprovalLetterService extends FundingRequestsLettersBaseService {
  getTemplatePath(): string {
    return TemplatePaths.CANADA_STUDENT_LOAN_FULLTIME_APPROVAL
  }

  serializeForTemplate() {
    return CanadaStudentLoanFulltimeApprovalTemplateSerializer.prepare({
      fundingRequest: this.fundingRequest,
      signingOfficer: this.signingOfficer,
    })
  }

  buildFileName({ format }: { format: string }): string {
    const person = this.fundingRequest.application?.student?.person
    if (person === undefined) throw new Error("Could not find person")

    const { firstName, lastName } = person
    if (firstName === undefined || lastName === undefined)
      throw new Error("Could not find person's name info")

    // See https://xkcd.com/1179/ -> https://en.wikipedia.org/wiki/ISO_8601 for date format
    const formattedDate = new Date().toISOString().slice(0, 10) // YYYYY-MM-DD
    return `CSLFT_Approval_Letter_${lastName}_${firstName}.${format}`
  }
}