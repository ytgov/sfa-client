import { isArray } from "lodash"

import Application from "@/models/application"
import Institution from "@/models/institution"
import Program from "@/models/program"

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
      durationOfProgram: application.programYearTotal, // duplicate of programDuration
      endDateOfClasses: application.classesEndDate,
      institution: this.#institutionAssociation(this.#application.institution || {} as Institution),
      institutionId: application.institutionCampusId,
      program: this.#programAssociation(this.#application.program || {} as Program),
      programDuration: application.programYearTotal, // duplicate of durationOfProgram
      programId: application.programId,
      programName: application.program?.description,
      startDateOfClasses: application.classesStartDate, // duplicate of startDate
      studyArea: application.studyAreaId,
      yearEntering: application.programYear,
      startDate: application.classesStartDate, // duplicate of startDateOfClasses
      attendance: "TODO",
    }
  }

  #institutionAssociation(institution: Institution) {
    return {
      id: institution.id,
      name: institution.name,
    }
  }

  #programAssociation(program: Program) {
    return {
      id: program.id,
      description: program.description,
    }
  }
}
