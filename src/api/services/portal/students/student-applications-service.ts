import { isArray } from "lodash";

import db from "@/db/db-client";
import { NON_EXISTANT_ID } from "@/utils/constants";

import Application from "@/models/application";
import PrestudyEmploymentStatus from "@/models/prestudy-employment-status";
import Relationship from "@/models/relationship";
import Student from "@/models/student";

import StudentApplicationExpensesService from "@/services/portal/students/student-application-expenses-service";
import StudentApplicationFundingRequestsService from "@/services/portal/students/student-application-funding-requests-service";
import StudentApplicationParentDependentsService from "@/services/portal/students/student-application-student-parent-dependents-service";
import StudentApplicationStudentsService from "@/services/portal/students/student-application-students-service";
import PersonAddressesService from "@/services/person-addresses-service";

export default class StudentApplicationsService {
  #studentId: number;
  #applicationId?: number;

  constructor({ studentId, applicationId }: { studentId: number; applicationId?: number }) {
    this.#studentId = studentId;
    this.#applicationId = applicationId;
  }

  getApplications() {
    return db("application")
      .select("id", "studentId", "academicYearId", "updatedAt", "onlineSubmitDate")
      .where({ studentId: this.#studentId });
  }

  async getApplication() {
    if (this.#applicationId === undefined) {
      throw new Error("Application ID is not set");
    }

    const application = await db("application")
      .where({ "application.id": this.#applicationId, studentId: this.#studentId })
      .leftJoin("cslClassification", "application.cslClassification", "cslClassification.id")
      .leftJoin("maritalStatus", "application.maritalStatusId", "maritalStatus.id")
      .leftJoin("studyArea", "application.studyAreaId", "studyArea.id")
      .leftJoin("citizenship", "application.citizenshipStatus", "citizenship.id")

      .select(
        "application.*",
        "cslClassification.description as cslClassificationDescription",
        "maritalStatus.description as maritalStatusDescription",
        "studyArea.description as studyAreaDescription",
        "citizenship.description as citizenshipStatusDescription"
      )
      .first();

    if (application === undefined) {
      throw new Error(`Application not found for id=${this.#applicationId} and studentId=${this.#studentId}`);
    }

    if (application.attendanceId) {
      application.attendance = await db("attendance").where({ id: application.attendanceId }).first();
    }

    if (application.institutionCampusId) {
      application.institutionCampus = await db("institutionCampus")
        .innerJoin("institution", "institutionCampus.institutionId", "institution.id")
        .where({ "institutionCampus.id": application.institutionCampusId })
        .select("institution.*", "institutionCampus.name as campusName")
        .first();
    }

    if (application.spouseStudyEmpStatusId) {
      application.spouseStudyEmpolymentStatus = await this.#getPrestudyEmploymentStatus(
        application.spouseStudyEmpStatusId
      );
    }

    if (application.programId) {
      application.program = await db("program").where({ id: application.programId }).first();
    }

    if (application.spouseId) {
      application.spouse = await db("person").where({ id: application.spouseId }).first();
    }

    if (application.primaryAddressId) {
      application.primaryAddress = await new PersonAddressesService().getFullAddressById(application.primaryAddressId);
      if (application.primaryAddress) {
        application.primaryAddress.addressDisplay = `${application.primaryAddress.cityName}, ${application.primaryAddress.provinceName} ${application.primaryAddress.postalCode}`;

        if (application.primaryAddress.address2)
          application.primaryAddress.addressDisplay = `${application.primaryAddress.address2}<br>${application.primaryAddress.addressDisplay}`;
        if (application.primaryAddress.address1)
          application.primaryAddress.addressDisplay = `${application.primaryAddress.address1}<br>${application.primaryAddress.addressDisplay}`;
      }
    }

    application.agencyAssistances = await this.#getApplicationAgencyAssistances(application.id);
    application.expenses = await this.#getApplicationExpenses(application.id);
    application.fundingRequests = await this.#getApplicationFundingRequests(application.id);
    application.incomes = await this.#getApplicationIncomes(application.id);
    //application.parentDependents = await this.#getParentDependents(application.id);
    application.student = await this.#getApplicationStudent(application.studentId, this.#applicationId);

    //await this.#injectParents(application, application.student)

    return application;
  }

  #getApplicationAgencyAssistances(applicationId: number) {
    return db("agencyAssistance").where({ applicationId });
  }

  #getApplicationExpenses(applicationId: number) {
    const expenseService = new StudentApplicationExpensesService({ applicationId });
    return expenseService.getExpenses();
  }

  #getApplicationFundingRequests(applicationId: number) {
    const fundingRequestService = new StudentApplicationFundingRequestsService({ applicationId });
    return fundingRequestService.getFundingRequests();
  }

  #getApplicationIncomes(applicationId: number) {
    return db("income").where({ applicationId });
  }

  #getApplicationStudent(studentId: number, applicationId: number) {
    const studentService = new StudentApplicationStudentsService({ studentId, applicationId });
    return studentService.getStudent();
  }

  #getParentDependents(applicationId: number) {
    const parentDependentsService = new StudentApplicationParentDependentsService({ applicationId });
    return parentDependentsService.getParentDependents();
  }

  async #getPrestudyEmploymentStatus(prestudyEmploymentStatusId: number) {
    const row = await db("prestudyEmploymentStatus").where({ id: prestudyEmploymentStatusId, isActive: true }).first();
    return new PrestudyEmploymentStatus({
      id: row.id,
      description: row.description,
      isActive: row.isActive,
    });
  }

  async #injectParents(application: Application, student: Student) {
    if (isArray(student.parents) && student.parents.length > 0) {
      return;
    }

    if (application.parent1Id === undefined && application.parent2Id === undefined) {
      return;
    }

    const parentRelationship = await db("relationship").where({ description: Relationship.Types.PARENT }).first();

    if (student.studentPersons === undefined) {
      student.studentPersons = [];
    }

    if (application.parent1Id !== undefined) {
      const parent1 = await db("person").where({ id: application.parent1Id }).first();

      student.studentPersons.push({
        id: NON_EXISTANT_ID,
        studentId: student.id,
        personId: parent1.id,
        relationshipId: parentRelationship.id,
        isActive: true,
        person: parent1,
        relationship: parentRelationship,
      });
    }

    if (application.parent2Id !== undefined) {
      const parent2 = await db("person").where({ id: application.parent2Id }).first();

      student.studentPersons.push({
        id: NON_EXISTANT_ID,
        studentId: student.id,
        personId: parent2.id,
        relationshipId: parentRelationship.id,
        isActive: true,
        person: parent2,
        relationship: parentRelationship,
      });
    }
  }
}
