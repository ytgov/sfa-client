import db from "@/db/db-client"

export default class StudentApplicationsService {
  #studentId: number
  #applicationId?: number

  constructor({ studentId, applicationId }: { studentId: number; applicationId?: number }) {
    this.#studentId = studentId
    this.#applicationId = applicationId
  }

  getApplications() {
    return db("sfa.application").where({ student_id: this.#studentId })
  }

  getApplication() {
    if (this.#applicationId === undefined) {
      throw new Error("Application ID is not set")
    }

    return db("sfa.application").where({ id: this.#applicationId, student_id: this.#studentId })
  }
}
