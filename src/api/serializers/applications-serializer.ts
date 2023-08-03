import { isArray } from "lodash"

import Application from "@/models/application"
import Institution from "@/models/institution"

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
        isActive: true,
        status: "Submitted",
        // TODO: these don't exist on the Application model, so need to be created here
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

      durationOfProgram: application.programYearTotal, // duplicate of programDuration
      programDuration: application.programYearTotal, // duplicate of durationOfProgram

      yearEntering: application.programYear,
      institution: this.#institutionAssociation(this.#application.institution || {} as Institution),

      programName: "TODO",
      startDate: null, // TODO
      attendance: "TODO",
    }
  }

  #institutionAssociation(institution: Institution) {
    return {
      id: institution.id,
      name: institution.name,
    }
  }
}
