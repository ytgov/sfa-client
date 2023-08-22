import YukonGrantStudentTemplateSerializer from "@/serializers/funding-requests/letters/yukon-grant-student-template-serializer"

import FundingRequestsLettersBaseService from "@/services/admin/funding-requests/letters/funding-requests-letters-base-service"

export default class YukonGrantStudentApprovalLetterService extends FundingRequestsLettersBaseService {
  getTemplatePath(): string {
    return "./templates/admin/application-letter/approval/yukon-grant-student"
  }

  serializeForTemplate() {
    return YukonGrantStudentTemplateSerializer.prepare({
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
    return `YG Approval Letter, ${lastName} ${firstName}, ${formattedDate}.${format}`
  }
}
