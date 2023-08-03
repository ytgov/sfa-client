import { isArray, pick } from "lodash"

import Application from "@/models/application"

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
      return {
        id: application.id,
        studentId: application.studentId,
        academicYearId: application.academicYearId,
        updatedAt: application.updatedAt,
        submittedAt: application.onlineSubmitDate,
        // TODO: these don't exist on the Application model, so need to be created here
        isActive: true ,
        status: 'TODO',
        description: "TODO",
        createdAt: null
      }
    })
  }

  asDetailedView() {
    return this.#application
  }
}
