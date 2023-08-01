import db from "@/db/db-client"

export default class StudentApplicationsService {
  #studentId: number
  #applicationDraftId?: number

  constructor({ studentId, applicationDraftId }: { studentId: number; applicationDraftId?: number }) {
    this.#studentId = studentId
    this.#applicationDraftId = applicationDraftId
  }

  getApplicationDrafts() {
    return db("sfa.application_draft").where({ student_id: this.#studentId })
  }

  getApplicationDraft() {
    if (this.#applicationDraftId === undefined) {
      throw new Error("Application Draft ID is not set")
    }

    return db("sfa.application_draft").where({ id: this.#applicationDraftId, student_id: this.#studentId })
  }
}
