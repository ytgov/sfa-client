import { isArray, pick } from "lodash"

import ApplicationDraft from "@/models/application_draft"

export default class ApplicationsSerializer {
  #applicationDrafts: ApplicationDraft[] = []
  #applicationDraft: ApplicationDraft | {} = {}

  constructor(draftOrDrafts: ApplicationDraft[] | ApplicationDraft) {
    if (isArray(draftOrDrafts)) {
      this.#applicationDrafts = draftOrDrafts || []
    } else {
      this.#applicationDraft = draftOrDrafts || {}
    }
  }

  asListView() {
    return this.#applicationDrafts.map((applicationDraft) => {
      return pick(applicationDraft, [
        "id",
        "studentId",
        "academicYearId",
        "createDate",
        "updateDate",
        "isActive",
        "submitDate",
        "status",
        "description",
      ])
    })
  }

  asDetailedView() {
    return this.#applicationDraft
  }
}
