import db from "@/db/db-client";
import { unparse } from "papaparse";
import moment from "moment";

export default class ReportingService {
  static async runFundingStatusReport({ years }: FundingStatusReportParams): Promise<any[]> {
    let results = await db.raw(
      `SELECT sfa.person.first_name 'First Name', 
      sfa.person.last_name 'Last Name', 
      sfa.marital_status.description 'Student Category', 
      request_type.description 'Grant Type',
      sfa.status.description 'Application Status', 
      sfa.institution.name 'Institution Name', 
      sfa.application.academic_year_id 'Application Year',
      status_date 'Status Change Date', 
      funding_request.received_date 'Received Date'
    FROM sfa.funding_request
      INNER JOIN sfa.status ON sfa.funding_request.status_id = sfa.status.id
      INNER JOIN sfa.request_type ON sfa.request_type.id = sfa.funding_request.request_type_id
      INNER JOIN sfa.application ON sfa.funding_request.application_id = sfa.application.id
      INNER JOIN sfa.student ON sfa.application.student_id = sfa.student.id
      INNER JOIN sfa.person ON sfa.student.person_id = sfa.person.id
      INNER JOIN sfa.institution_campus ON sfa.application.institution_campus_id = sfa.institution_campus.id
      INNER JOIN sfa .institution ON sfa.institution_campus.institution_id = sfa.institution.id
      INNER JOIN sfa.marital_status ON sfa.application.marital_status_id = sfa.marital_status.id
    WHERE sfa.application.academic_year_id IN (` +
        years.join(",") +
        `)
    ORDER BY sfa.person.last_name, sfa.person.first_name, sfa.status.description, sfa.request_type.description, sfa.application.academic_year_id
    `
    );

    for (let row of results) {
      row.statusChangeDate = row.statusChangeDate ? moment.utc(row.statusChangeDate).format("YYYY-MM-DD") : "";
      row.receivedDate = row.receivedDate ? moment.utc(row.receivedDate).format("YYYY-MM-DD") : "";
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
    if (format == "csv") {
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
    } else {
      return Promise.reject("Unsupported format");
    }

    console.log("GOING TO GENERATE AS ", format);

    return Promise.resolve({ fileContent: reportData, fileName: "asdf.csv", mimeType: "text/csv" });
  }
}

export interface FundingStatusReportParams {
  years: number[];
}
