import db from "@/db/db-client";
import { unparse } from "papaparse";
import moment from "moment";
import { renderReportAsHtml, renderReportAsPdf } from "@/utils/express-handlebars-pdf-client";
import { NarsV17ReportingService } from "./nars-v17-reporting-service";
import { NarsPTReportingService } from "./nars-pt-reporting-service";

const STA_YUKON_UNIVERSITY_TEMPLATE = "./templates/admin/reports/student-training-allowance-yukon-university";

export default class ReportingService {
  static async runFundingStatusReport({ years }: FundingStatusReportParams): Promise<any[]> {
    let results = await db.raw(
      `SELECT person.first_name 'First Name', 
      person.last_name 'Last Name', 
      person.email 'Email', 
      marital_status.description 'Student Category', 
      request_type.description 'Grant Type',
      status.description 'Application Status', 
      institution.name 'Institution Name', 
      application.academic_year_id 'Application Year',
      status_date 'Status Change Date', 
      funding_request.received_date 'Received Date'
    FROM sfa.funding_request
      INNER JOIN sfa.status ON funding_request.status_id = status.id
      INNER JOIN sfa.request_type ON request_type.id = funding_request.request_type_id
      INNER JOIN sfa.application ON funding_request.application_id = application.id
      INNER JOIN sfa.student ON application.student_id = student.id
      INNER JOIN sfa.person ON student.person_id = person.id
      INNER JOIN sfa.institution_campus ON application.institution_campus_id = institution_campus.id
      INNER JOIN sfa .institution ON institution_campus.institution_id = institution.id
      INNER JOIN sfa.marital_status ON application.marital_status_id = marital_status.id
    WHERE application.academic_year_id IN (` +
        years.join(",") +
        `)
    ORDER BY person.last_name, person.first_name, status.description, request_type.description, application.academic_year_id
    `
    );

    for (let row of results) {
      row.statusChangeDate = row.statusChangeDate ? moment.utc(row.statusChangeDate).format("YYYY-MM-DD") : "";
      row.receivedDate = row.receivedDate ? moment.utc(row.receivedDate).format("YYYY-MM-DD") : "";
    }

    return results;
  }

  static async runSTAYukonUniversityReport({ date }: { date: Date | undefined }): Promise<any[]> {
    let results = await db.raw(
      `SELECT CONCAT(person.first_name, ' ', person.last_name) 'Name', 
      person.sin, 
      assessment.effective_rate_date effectiveDate, 
      weeks_allowed weeks,
      weekly_amount,
      travel_allowance,
      disbursement.disbursed_amount as net,
      change_reason.description as comment
      FROM sfa.funding_request
      INNER JOIN sfa.application ON funding_request.application_id = application.id
      INNER JOIN sfa.student ON application.student_id = student.id
      INNER JOIN sfa.person ON student.person_id = person.id
      INNER JOIN sfa.assessment ON assessment.funding_request_id = funding_request.id
      INNER JOIN sfa.disbursement ON assessment.id = disbursement.assessment_id
      LEFT OUTER JOIN sfa.change_reason ON disbursement.change_reason_id = change_reason.id
      WHERE application.academic_year_id IN (2023)
        AND application.institution_campus_id IN (5326, 3488, 5648)
        AND disbursement.issue_date <= GETDATE()
        AND disbursement.due_date IS NULL
      ORDER BY person.last_name, person.first_name`
    );

    for (let row of results) {
      row.effectiveDate = row.effectiveDate ? moment.utc(row.effectiveDate).format("YYYY-MM-DD") : "";
    }

    return results;
  }

  static async runScholarshipReport({
    academic_year_id,
    status_id,
    scholarshipIds,
  }: ScholarshipReportParams): Promise<any[]> {
    let results = await db.raw(
      `SELECT request_type.description scholarship, person.first_name, person.last_name, study_area.description program, application.academic_percent
      FROM sfa.application
       INNER JOIN sfa.funding_request ON application.id = funding_request.application_id
       INNER JOIN sfa.request_type ON funding_request.request_type_id = request_type.id
       INNER JOIN sfa.student on application.student_id = student.id
       INNER JOIN sfa.person on student.person_id = person.id
       INNER JOIN sfa.study_area on application.study_area_id = study_area.id
      WHERE
        application.academic_year_id = ${academic_year_id}
        AND funding_request.request_type_id IN (${scholarshipIds.join(",")})
        AND funding_request.status_id = ${status_id}
      ORDER BY request_type.description, application.academic_percent desc`
    );

    return results;
  }

  static async runNars2022FTReport({ format = "json" }: { format: string | undefined }): Promise<any> {
    let service = new NarsV17ReportingService({
      startDate: new Date("2022-06-01"),
      endDate: new Date("2023-05-31"),
      year: 2022,
    });

    let results = await service.runReport();

    if (format == "json") {
      return results.map((r) => r.toJson());
    } else if (format == "csv") {
      let lines = results.map((r) => r.toCsv());

      lines.unshift(results[0].columns.map((c) => c.field).join(","));

      return lines.join("\n");
    }

    let lines = results.map((r) => r.toString());

    console.log("LINES", lines);

    return lines.join("\n");
  }

  static async runNars2022PTReport({ format = "json" }: { format: string | undefined }): Promise<any> {
    let service = new NarsPTReportingService({
      startDate: new Date("2022-06-01"),
      endDate: new Date("2023-05-31"),
      year: 2022,
    });

    let results = await service.runReport();

    if (format == "json") {
      return results.map((r) => r.toJson());
    } else if (format == "csv") {
      let lines = results.map((r) => r.toCsv());

      lines.unshift(results[0].columns.map((c) => c.field).join(","));

      return lines.join("\n");
    }

    let lines = results.map((r) => r.toString());

    console.log("LINES", lines);

    return lines.join("\n");
  }

  static async runStepReport({
    academic_year_id,
    format = "json",
  }: {
    academic_year_id: number;
    format: string | undefined;
  }): Promise<any> {
    let results = await db.raw(
      `SELECT distinct person.last_name, person.first_name, study_area.description program_name, 
         program.description program_type, program_year, institution.name institution_name, person.email
       FROM sfa.application
         INNER JOIN sfa.student on application.student_id = student.id
         INNER JOIN sfa.person on student.person_id = person.id
         INNER JOIN sfa.study_area on application.study_area_id = study_area.id
         INNER JOIN sfa.program on application.program_id = program.id
         INNER JOIN sfa.institution_campus on application.institution_campus_id = institution_campus.id
         INNER JOIN sfa.institution on institution_campus.institution_id = institution.id
       WHERE application.academic_year_id = ${academic_year_id} and has_consent_to_share_data = 1
       ORDER BY 1, 2`
    );

    if (format == "csv") {
      let lines = results.map((r: any) => r.toCsv());
      lines.unshift(results[0].columns.map((c: any) => c.field).join(","));
      return lines.join("\n");
    }

    return results;
  }

  static async generateAs({
    format,
    reportData,
  }: {
    format: string | undefined;
    reportData: any[];
  }): Promise<{ fileContent: any; fileName: string; mimeType: string }> {
    if (format == "json") {
    } else if (format == "csv") {
      let t = unparse(reportData, {
        quotes: true,
      });

      return Promise.resolve({
        fileContent: t,
        fileName: `fundingStatusReport_${moment().format("YYYY-MM-DD")}.csv`,
        mimeType: "text/csv",
      });
    } else if (format == "html") {
      let disbursements = await db.raw(
        `SELECT disbursement.id,
        CONCAT(person.first_name, ' ', person.last_name) 'Name', 
        person.sin, 
        assessment.effective_rate_date effectiveDate, 
        weeks_allowed weeks,
        weekly_amount * 100 AS weekly_amount,
        travel_allowance * 100 AS travel_allowance,
        disbursement.disbursed_amount * 100 as net,
        change_reason.description as comment
        FROM sfa.funding_request
        INNER JOIN sfa.application ON funding_request.application_id = application.id
        INNER JOIN sfa.student ON application.student_id = student.id
        INNER JOIN sfa.person ON student.person_id = person.id
        INNER JOIN sfa.assessment ON assessment.funding_request_id = funding_request.id
        INNER JOIN sfa.disbursement ON assessment.id = disbursement.assessment_id
        LEFT OUTER JOIN sfa.change_reason ON disbursement.change_reason_id = change_reason.id
        WHERE application.academic_year_id IN (2023)
          AND application.institution_campus_id IN (5326, 3488, 5648)
          AND disbursement.issue_date <= GETDATE()
          AND disbursement.due_date IS NULL
        ORDER BY person.last_name, person.first_name`
      );

      let total = disbursements.reduce((t: number, a: any) => {
        return t + a.net;
      }, 0);

      let data = { currentDate: new Date(), disbursements, total };
      let file = await renderReportAsHtml(STA_YUKON_UNIVERSITY_TEMPLATE, data);

      return Promise.resolve({
        fileContent: file,
        fileName: `fundingStatusReport_${moment().format("YYYY-MM-DD")}.html`,
        mimeType: "text/html",
      });
    } else if (format == "pdf") {
      let results = await db.raw(
        `SELECT disbursement.id,
        CONCAT(person.first_name, ' ', person.last_name) 'Name', 
        person.sin, 
        assessment.effective_rate_date effectiveDate, 
        weeks_allowed weeks,
        weekly_amount * 100 AS weekly_amount,
        travel_allowance * 100 AS travel_allowance,
        disbursement.disbursed_amount * 100 as net,
        change_reason.description as comment
        FROM sfa.funding_request
        INNER JOIN sfa.application ON funding_request.application_id = application.id
        INNER JOIN sfa.student ON application.student_id = student.id
        INNER JOIN sfa.person ON student.person_id = person.id
        INNER JOIN sfa.assessment ON assessment.funding_request_id = funding_request.id
        INNER JOIN sfa.disbursement ON assessment.id = disbursement.assessment_id
        LEFT OUTER JOIN sfa.change_reason ON disbursement.change_reason_id = change_reason.id
        WHERE application.academic_year_id IN (2023)
          AND application.institution_campus_id IN (5326, 3488, 5648)
          AND disbursement.issue_date <= GETDATE()
          AND disbursement.due_date IS NULL
        ORDER BY person.last_name, person.first_name`
      );

      for (let line of results) {
        await db("disbursement").where({ id: line.id }).update({ due_date: new Date() });
      }

      let total = results.reduce((t: number, a: any) => {
        return t + a.net;
      }, 0);

      let data = { currentDate: new Date(), disbursements: results, total };
      let pdf = await renderReportAsPdf(STA_YUKON_UNIVERSITY_TEMPLATE, data, "LETTER", true);

      return Promise.resolve({
        fileContent: pdf,
        fileName: `STA_YukonUniversity_${moment().format("YYYY-MM-DD")}.pdf`,
        mimeType: "application/pdf",
      });
    } else {
      return Promise.reject("Unsupported format");
    }

    return Promise.resolve({ fileContent: reportData, fileName: "asdf.csv", mimeType: "text/csv" });
  }
}

export interface FundingStatusReportParams {
  years: number[];
}

export interface ScholarshipReportParams {
  academic_year_id: number;
  status_id: number;
  scholarshipIds: number[];
}
