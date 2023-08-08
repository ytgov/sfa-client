import { compact, isArray, sumBy, uniq } from "lodash"

import Application from "@/models/application"
import CsfaAmounts from "@/models/csfa-amount"
import FundingRequest from "@/models/funding-request"
import FundingSource from "@/models/funding-source"
import Institution from "@/models/institution"
import Student from "@/models/student"

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
      personalDetails: this.#studentAssociation(
        this.#application.student || ({} as Student),
        this.#application.categoryId
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

    const hasCsfaRequestAmount = fundingRequests.some(
      (fundingRequest) => fundingRequest.cslRequestAmount
    )
    const isCslFullAmount = fundingRequests.some((fundingRequest) => fundingRequest.isCslFullAmount)
    const isCsfa = sources.includes(FundingSource.CANADA_STUDENT_FINANCIAL_ASSISTANCE_FULL_TIME)

    let csfaAmounts = null
    let csfaLoanAmount = 0
    if (isCsfa && isCslFullAmount) {
      csfaAmounts = CsfaAmounts.FULL_AMOUNT_LOANS_AND_GRANTS
    } else if (isCsfa && hasCsfaRequestAmount) {
      csfaAmounts = CsfaAmounts.GRANTS_AND_LOANS_UP_TO
      csfaLoanAmount = sumBy(fundingRequests, (r) => r.cslRequestAmount || 0)
    } else {
      csfaAmounts = CsfaAmounts.GRANTS_ONLY
    }

    return {
      sources,
      csfaLoanAmount,
      csfaAmounts,
    }
  }

  #studentAssociation(student: Student, categoryId?: number) {
    return {
      firstName: student.person?.firstName,
      middleName: student.person?.initials,
      lastName: student.person?.lastName,
      homeEmail: student.person?.email,
      homePhone: student.person?.telephone,
      birthDate: student.person?.birthDate,
      sin: student.person?.sin,
      category: categoryId,
    }
  }
}
