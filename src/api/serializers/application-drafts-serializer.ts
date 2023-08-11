import { isArray } from "lodash"
import camelcaseKeys from "camelcase-keys"

import Application from "@/models/application"
import ApplicationDraft from "@/models/application-draft"

export default class ApplicationDraftsSerializer {
  #applicationDrafts: ApplicationDraft[] = []
  #applicationDraft: ApplicationDraft = {} as ApplicationDraft

  constructor(draftOrDrafts: ApplicationDraft[] | ApplicationDraft) {
    if (isArray(draftOrDrafts)) {
      this.#applicationDrafts = draftOrDrafts || ([] as ApplicationDraft[])
    } else {
      this.#applicationDraft = draftOrDrafts || ({} as ApplicationDraft)
    }
  }

  asListView() {
    return this.#applicationDrafts.map((applicationDraft) => {
      return {
        id: applicationDraft.id,
        studentId: applicationDraft.studentId,
        academicYearId: applicationDraft.academicYearId,
        createDate: applicationDraft.createDate,
        updateDate: applicationDraft.updateDate,
        isActive: applicationDraft.isActive,
        submitDate: applicationDraft.submitDate,
        status: applicationDraft.status,
        description: "TODO", // Does not exist on model
      }
    })
  }

  asDetailedView() {
    const application = this.#parseApplicationJson(this.#applicationDraft.applicationJson)
    return {
      id: this.#applicationDraft.id,
      studentId: this.#applicationDraft.studentId,
      academicYearId: this.#applicationDraft.academicYearId,
      createDate: this.#applicationDraft.createDate,
      updateDate: this.#applicationDraft.updateDate,
      isActive: this.#applicationDraft.isActive,
      submitDate: this.#applicationDraft.submitDate,
      status: this.#applicationDraft.status,
      description: "TODO", // Does not exist on model
      application: this.#applicationAssocation(application),
    }
  }

  #parseApplicationJson(applicationJson: string): Application {
    try {
      return JSON.parse(applicationJson)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Could not parse application JSON: ${error.message}`)
      } else {
        throw new Error(`Could not parse application JSON`)
      }
    }
  }

  #applicationAssocation(application: Application) {
    return camelcaseKeys(application, { deep: true })
  }
}
