import db from "@/db/db-client"

export default class StudentApplicationDraftsService {
  #studentId: number
  #applicationDraftId?: number

  constructor({
    studentId,
    applicationDraftId,
  }: {
    studentId: number
    applicationDraftId?: number
  }) {
    this.#studentId = studentId
    this.#applicationDraftId = applicationDraftId
  }

  getApplicationDrafts() {
    return db("applicationDraft").where({ studentId: this.#studentId })
  }

  getApplicationDraft() {
    if (this.#applicationDraftId === undefined) {
      throw new Error("Application Draft ID is not set")
    }

    return db("applicationDraft")
      .where({ id: this.#applicationDraftId, studentId: this.#studentId })
      .first()
  }
}
