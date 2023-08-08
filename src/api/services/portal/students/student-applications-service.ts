import { isNil } from "lodash"

import db from "@/db/db-client"

import StudentApplicationFundingRequestsService from "@/services/portal/students/student-application-funding-requests-service"

export default class StudentApplicationsService {
  #studentId: number
  #applicationId?: number

  constructor({ studentId, applicationId }: { studentId: number; applicationId?: number }) {
    this.#studentId = studentId
    this.#applicationId = applicationId
  }

  getApplications() {
    return db("application")
      .select("id", "studentId", "academicYearId", "updatedAt", "onlineSubmitDate")
      .where({ studentId: this.#studentId })
  }

  async getApplication() {
    if (this.#applicationId === undefined) {
      throw new Error("Application ID is not set")
    }

    const application = await db("application")
      .where({ id: this.#applicationId, studentId: this.#studentId })
      .first()

    if (application.institutionCampusId) {
      application.institution = await db("institution")
        .where({ id: application.institutionCampusId })
        .first()
    }

    if (application.programId) {
      application.program = await db("program").where({ id: application.programId }).first()
    }

    if (application.attendanceId) {
      application.attendance = await db("attendance")
        .where({ id: application.attendanceId })
        .first()
    }

    application.fundingRequests = await this.#getApplicationFundingRequests(application.id)

    if (application.studentId) {
      application.student = await db("student").where({ id: application.studentId }).first()
    }

    if (!isNil(application.student)) {
      application.student.person = await db("person").where({ id: application.student.personId }).first()
    }

    return application
  }

  #getApplicationFundingRequests(applicationId: number) {
    const fundingRequestService = new StudentApplicationFundingRequestsService({ applicationId })
    return fundingRequestService.getFundingRequests()
  }
}
