import db from "@/db/db-client"

export default class StudentApplicationsService {
  #studentId: number
  #applicationId?: number

  constructor({ studentId, applicationId }: { studentId: number; applicationId?: number }) {
    this.#studentId = studentId
    this.#applicationId = applicationId
  }

  getApplications() {
    return db("sfa.application")
      .select("id", "studentId", "academicYearId", "updatedAt", "onlineSubmitDate")
      .where({ studentId: this.#studentId })
  }

  async getApplication() {
    if (this.#applicationId === undefined) {
      throw new Error("Application ID is not set")
    }

    const application = await db("sfa.application")
      .where({ id: this.#applicationId, student_id: this.#studentId })
      .first()

    if (application.institutionCampusId) {
      application.institution = await db("sfa.institution")
        .where({ id: application.institutionCampusId })
        .first()
    }

    if (application.programId) {
      application.program = await db("sfa.program")
        .where({ id: application.programId })
        .first()
    }

    return application
  }
}
