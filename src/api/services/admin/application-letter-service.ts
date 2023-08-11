import { Application } from "models";
import { renderViewAsPdf, renderViewAsPromise } from "../../utils/express-handlebars-pdf-client";
import db from "@/db/db-client";

export default class ApplicationLetterService {
  #applicationId: number;
  #fundingRequestId: number;
  #applicationData: any;
  #format: string;

  constructor({
    applicationId,
    fundingRequestId,
    format,
  }: {
    applicationId: number;
    fundingRequestId: number;
    format: string;
  }) {
    this.#applicationId = applicationId;
    this.#fundingRequestId = fundingRequestId;
    this.#format = format;
  }

  async generateApprovalLetter(name:string, position:string): Promise<Buffer | string> {
    const data = await this.#getApplicationData(name, position);
    const fundingRequest = await this.#getFundingRequest();
    data.title = "Application Approval Letter";

    if (this.#format === "pdf") {
      return renderViewAsPdf(this.#getTemplatePathForRequestType("approval", fundingRequest.requestTypeId), data);
    }

    if (this.#format === "html") {
      return renderViewAsPromise(this.#getTemplatePathForRequestType("approval", fundingRequest.requestTypeId), data);
    }

    return Promise.reject(new Error(`Invalid format: ${this.#format}`));
  }

  async generateRejectionLetter(name:string, position:string): Promise<Buffer | string> {
    const data = await this.#getApplicationData(name, position);
    const fundingRequest = await this.#getFundingRequest();
    data.title = "Application Rejection Letter";

    if (this.#format === "pdf") {
      return renderViewAsPdf(this.#getTemplatePathForRequestType("rejection", fundingRequest.requestTypeId), data);
    }

    if (this.#format === "html") {
      return renderViewAsPromise(this.#getTemplatePathForRequestType("rejection", fundingRequest.requestTypeId), data);
    }

    return Promise.reject(new Error(`Invalid format: ${this.#format}`));
  }

  ////
  // See https://xkcd.com/1179/ -> https://en.wikipedia.org/wiki/ISO_8601 for date format
  async buildApprovalLetterFileName() {
    const data = await this.#getApplicationData("", "");

    const studentLastName = this.#applicationData.student.person.lastName;
    if (!studentLastName) {
      Promise.reject(new Error("No student last name"));
    }

    const formattedData = new Date().toISOString().slice(0, 10); // YYYYY-MM-DD
    return `Approval Letter, ${studentLastName}, ${formattedData}.${this.#format}`;
  }

  async buildRejectionLetterFileName() {
    await this.#getApplicationData("", "");

    const studentLastName = this.#applicationData.student.person.lastName;
    if (!studentLastName) {
      Promise.reject(new Error("No student last name"));
    }

    const formattedData = new Date().toISOString().slice(0, 10); // YYYYY-MM-DD
    return `Rejection Letter, ${studentLastName}, ${formattedData}.pdf`;
  }

  // Private Methods
  async #getApplicationData(name:string, position:string): Promise<any> {
    if (this.#applicationData) return this.#applicationData;

    const application = await db("application").where({ id: this.#applicationId }).first();
    if (!application) {
      return Promise.reject(new Error("Application not found"));
    }

    const student = await db("student").where({ id: application.studentId }).first();
    if (!student) {
      return Promise.reject(new Error("Student not found"));
    }

    const person = await db("person").where({ id: student.personId }).first();
    if (!person) {
      return Promise.reject(new Error("Person not found"));
    }

    const address = await db("person_address")
      .leftOuterJoin("city", "city.id", "person_address.city_id")
      .leftOuterJoin("province", "province.id", "person_address.province_id")
      .leftOuterJoin("country", "country.id", "person_address.country_id")
      .where({ "person_address.id": application.primaryAddressId })
      .select([
        "address1",
        "address2",
        "postalCode",
        "city.description as cityName",
        "province.description as provinceName",
        "country.description as countryName",
      ])
      .first();
    if (!address) {
      return Promise.reject(new Error("Address not found"));
    }

    const assessment = await db("assessment").where({ funding_request_id: this.#fundingRequestId }).first();
    if (!assessment) {
      return Promise.reject(new Error("Assessment not found"));
    }

    const disbursementList = await db("disbursement").where({ funding_request_id: this.#fundingRequestId }).first();
    if (!assessment) {
      return Promise.reject(new Error("Assessment not found"));
    }

    const institution = await db("institution")
      .innerJoin("institution_campus", "institution.id", "institution_campus.institution_id")
      .where({ "institution_campus.id": application.institutionCampusId })
      .select("institution.name")
      .select("institution_campus.name as campusName")
      .first();
    if (!institution) {
      return Promise.reject(new Error("Institution not found"));
    }
    
    const program = await db("study_area").where({ id: application.studyAreaId }).first();
    if (!program) {
      return Promise.reject(new Error("Progrm not found"));
    }

    student.person = person;
    application.student = student;
    application.institution = institution;
    application.primaryAddress = address;

    this.#applicationData = application;

    let disbursements = [];
    if (disbursementList) {
      disbursements = disbursementList.map((d: any) => {
        return { amountInCents: d.paidAmount * 100, releaseDate: d.issueDate };
      });
    }
    // return this.#applicationData
    // TODO: replace dummy data with real data
    return Promise.resolve({
      currentDate: new Date(),
      // Example content
      recipient: {
        firstName: person.firstName,
        initials: person.initials,
        lastName: person.lastName,
        address: address.address1,
        city: address.cityName,
        province: address.provinceName,
        country: address.countryName,
        postalCode: address.postalCode,
      },
      program: {
        name: program.description,
        startDate: assessment.classesStartDate,
        endDate: assessment.classesEndDate,
        institutionName:
          application.institution.name +
          (application.institution.campusName == "Primary" ? "" : ` - ${application.institution.campusName}`),
        ratePerWeekInCents: assessment.weeklyAmount * 100,
        approvalWeeks: assessment.weeksAllowed,
        travelAndAirFairCostInCents: (assessment.airfareAmount + assessment.travelAllowance) * 100,
      },
      disbursements,
      studentFinancialAssistanceOfficer: {
        name,
        position
      },
    });
  }

  async #getFundingRequest(): Promise<any> {
    const fundingRequest = await db("funding_request").where({ id: this.#fundingRequestId }).first();
    if (!fundingRequest) {
      return Promise.reject(new Error("Funding request not found"));
    }
    return Promise.resolve(fundingRequest);
  }

  #getTemplatePathForRequestType(outcome: string, typeId: number): string {
    let base = `./templates/admin/application-letter/${outcome}`;
    switch (typeId) {
      case 2:
        return `${base}/yukon-grant-student`;
      default:
        return `${base}/test`;
    }
  }
}
