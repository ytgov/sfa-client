import { compact, isArray, uniq } from "lodash"

import Application from "@/models/application"
import Institution from "@/models/institution"
import FundingRequest from "@/models/funding-request"

export default class ApplicationsSerializer {
  #applications: Application[] = []
  #application: Application = {} as Application

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

  asDetailedView() {
    return {
      termsAgree: true,
      programDetails: this.#programDetailsSection(this.#application),
      fundingSources: this.#fundingRequestsAssocation(
        this.#application.fundingRequests || ([] as FundingRequest[])
      ),
    }
  }

  #programDetailsSection(application: Application) {
    return {
      attendance: application.attendance?.description,
      durationOfProgram: application.programYearTotal, // duplicate of programDuration
      endDateOfClasses: application.classesEndDate,
      institution: this.#institutionAssociation(
        this.#application.institution || ({} as Institution)
      ),
      institutionId: application.institutionCampusId,
      program: application.programId,
      programDuration: application.programYearTotal, // duplicate of durationOfProgram
      programName: application.program?.description,
      startDate: application.classesStartDate, // duplicate of startDateOfClasses
      startDateOfClasses: application.classesStartDate, // duplicate of startDate
      studyArea: application.studyAreaId,
      yearEntering: application.programYear,
    }
  }

  #institutionAssociation(institution: Institution) {
    return {
      id: institution.id,
      name: institution.name,
    }
  }

  #fundingRequestsAssocation(fundingRequests: FundingRequest[]) {
    const sources = uniq(
      compact(fundingRequests.map((fundingRequest) => fundingRequest.requestType?.description))
    )
    return {
      sources,
      csfaAmounts: "TODO",
    }
  }
}
