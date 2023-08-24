import { isArray } from "lodash"

import Application from "@/models/application"
import StudentApplicationsSerializer from "@/serializers/applications/student-applications-serializer"

export enum Views {
  DEFAULT = "default",
  STUDENT_APPLICATION = "student_application",
}

export default class ApplicationsSerializer {
  #applications: Application[] = []
  #application: Application = {} as Application

  static readonly Views = Views

  constructor(applicationOrApplications: Application[] | Application) {
    if (isArray(applicationOrApplications)) {
      this.#applications = applicationOrApplications || ([] as Application[])
    } else {
      this.#application = applicationOrApplications || ({} as Application)
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
        isActive: true,
        status: "Submitted",
        // TODO: these don't exist on the Application model, so need to be created here
        description: "TODO",
        createdAt: null,
      }
    })
  }

  asDetailedView({ view }: { view: Views } = { view: Views.DEFAULT }) {
    switch (view) {
      case Views.STUDENT_APPLICATION:
        const studentApplicationSerializer = new StudentApplicationsSerializer(this.#application)
        return studentApplicationSerializer.asDetailedView()
      default:
        return this.#application
    }
  }
}
