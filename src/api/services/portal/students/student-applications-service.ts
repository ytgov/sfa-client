import { isArray } from "lodash"

import db from "@/db/db-client"
import { NON_EXISTANT_ID } from "@/utils/constants"

import Application from "@/models/application"
import Relationship from "@/models/relationship"
import Student from "@/models/student"

import StudentApplicationExpensesService from "@/services/portal/students/student-application-expenses-service"
import StudentApplicationFundingRequestsService from "@/services/portal/students/student-application-funding-requests-service"
import StudentApplicationParentDependentsService from "@/services/portal/students/student-application-student-parent-dependents-service"
import StudentApplicationStudentsService from "@/services/portal/students/student-application-students-service"

export default class StudentApplicationsService {
  #studentId: number
  #applicationId?: number

  constructor({ studentId, applicationId }: { studentId: number; applicationId?: number }) {
    this.#studentId = studentId
    this.#applicationId = applicationId
  }

  getApplications() {
    return db("application")
      .select("id", "studentId", "academicYearId", "updatedAt", "onlineSubmitDate")
      .where({ studentId: this.#studentId })
  }

  async getApplication() {
    if (this.#applicationId === undefined) {
      throw new Error("Application ID is not set")
    }

    const application = await db("application")
      .where({ id: this.#applicationId, studentId: this.#studentId })
      .first()

    if (application === undefined) {
      throw new Error(
        `Application not found for id=${this.#applicationId} and studentId=${this.#studentId}`
      )
    }

    if (application.institutionCampusId) {
      application.institution = await db("institution")
        .where({ id: application.institutionCampusId })
        .first()
    }

    if (application.programId) {
      application.program = await db("program").where({ id: application.programId }).first()
    }

    if (application.attendanceId) {
      application.attendance = await db("attendance")
        .where({ id: application.attendanceId })
        .first()
    }

    application.fundingRequests = await this.#getApplicationFundingRequests(application.id)
    application.student = await this.#getApplicationStudent(
      application.studentId,
      this.#applicationId
    )
    application.agencyAssistances = await this.#getApplicationAgencyAssistances(application.id)
    application.incomes = await this.#getApplicationIncomes(application.id)
    application.expenses = await this.#getApplicationExpenses(application.id)
    application.parentDependents = await this.#getParentDependents(application.id)

    await this.#injectParents(application, application.student)

    return application
  }

  #getApplicationFundingRequests(applicationId: number) {
    const fundingRequestService = new StudentApplicationFundingRequestsService({ applicationId })
    return fundingRequestService.getFundingRequests()
  }

  #getApplicationStudent(studentId: number, applicationId: number) {
    const studentService = new StudentApplicationStudentsService({ studentId, applicationId })
    return studentService.getStudent()
  }

  #getApplicationAgencyAssistances(applicationId: number) {
    return db("agencyAssistance").where({ applicationId })
  }

  #getApplicationIncomes(applicationId: number) {
    return db("income").where({ applicationId })
  }

  #getApplicationExpenses(applicationId: number) {
    const expenseService = new StudentApplicationExpensesService({ applicationId })
    return expenseService.getExpenses()
  }

  async #injectParents(application: Application, student: Student) {
    if (isArray(student.parents) && student.parents.length > 0) {
      return
    }

    if (application.parent1Id === undefined && application.parent2Id === undefined) {
      return
    }

    const parentRelationship = await db("relationship")
      .where({ description: Relationship.Types.PARENT })
      .first()

    if (student.studentPersons === undefined) {
      student.studentPersons = []
    }

    if (application.parent1Id !== undefined) {
      const parent1 = await db("person").where({ id: application.parent1Id }).first()

      student.studentPersons.push({
        id: NON_EXISTANT_ID,
        studentId: student.id,
        personId: parent1.id,
        relationshipId: parentRelationship.id,
        isActive: true,
        person: parent1,
        relationship: parentRelationship,
      })
    }

    if (application.parent2Id !== undefined) {
      const parent2 = await db("person").where({ id: application.parent2Id }).first()

      student.studentPersons.push({
        id: NON_EXISTANT_ID,
        studentId: student.id,
        personId: parent2.id,
        relationshipId: parentRelationship.id,
        isActive: true,
        person: parent2,
        relationship: parentRelationship,
      })
    }
  }

  #getParentDependents(applicationId: number) {
    const parentDependentsService = new StudentApplicationParentDependentsService({ applicationId })
    return parentDependentsService.getParentDependents()
  }
}
