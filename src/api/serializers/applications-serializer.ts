import { isArray, pick } from "lodash"

import { Application } from "@/models/application"

export default class ApplicationsSerializer {
  #applications: Application[] = []
  #application: Application | {} = {}

  constructor(applicationOrApplications: Application[] | Application) {
    if (isArray(applicationOrApplications)) {
      this.#applications = applicationOrApplications || []
    } else {
      this.#application = applicationOrApplications || {}
    }
  }

  asListView() {
    return this.#applications.map((application) => {
      return pick(application, [
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
    return this.#application
  }
}
