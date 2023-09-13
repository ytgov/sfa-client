import db from "@/db/db-client";
import { unparse } from "papaparse";
import moment from "moment";

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
      let t = unparse(reportData, {
        quotes: true,
      });

      return Promise.resolve({
        fileContent: t,
        fileName: `fundingStatusReport_${moment().format("YYYY-MM-DD")}.csv`,
        mimeType: "text/html",
      });
    } else if (format == "pdf") {

      //generate the pdf

      
      return Promise.resolve({
        fileContent: null,
        fileName: `STA_YukonUniversity_${moment().format("YYYY-MM-DD")}.csv`,
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
