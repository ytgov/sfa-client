import { isArray, isEmpty } from "lodash"

import Application from "@/models/application"

export default class ApplicationsSerializer {
  #applications: Application[] = []
  #application: Application = {} as Application

  constructor(applicationOrApplications: Application[] | Application) {
    if (isArray(applicationOrApplications)) {
      this.#applications = applicationOrApplications || [] as Application[]
    } else {
      this.#application = applicationOrApplications || {} as Application
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
        isActive: true,
        status: "TODO",
        description: "TODO",
        createdAt: null,
      }
    })
  }

  asDetailedView() {
    return {
      termsAgree: true,
      programDetails: this.#programDetailsField(this.#application),
    }
  }

  #programDetailsField(application: Application) {
    return {
      institutionId: application.institutionCampusId,
      studyArea: application.studyAreaId,
      program: application.programId,

      startDateOfClasses: application.classesStartDate,
      endDateOfClasses: application.classesEndDate,

      durationOfProgram: application.programYearTotal,
      programDuration: application.programYearTotal,

      yearEntering: application.programYear,
      programName: "TODO",
      startDate: null, // TODO
      institution: {}, // TODO
      attendance: "TODO",
    }
  }
}
