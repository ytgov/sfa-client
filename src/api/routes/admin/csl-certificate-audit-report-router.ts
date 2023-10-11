import express, { Request, Response } from "express";
import knex from "knex";
import { param } from "express-validator";
import { DB_CONFIG, FRONTEND_URL } from "../../config";
import { renderReportAsHtml, renderReportAsPdf } from "@/utils/express-handlebars-pdf-client";
import moment from "moment";

const db = knex(DB_CONFIG);

export const cslCertificateAuditReportRouter = express.Router();
const TEMPLATE_PATH = "./templates/admin/reports/csl-certificate-audit-report";

const RELEVANT_REQUEST_TYPES = [4, 5, 28, 29, 30, 31, 32, 33, 35];
const RELEVANT_LOAN_TYPES = [4, 5];

cslCertificateAuditReportRouter.get(
  "/:FROM_DATE/:TO_DATE/:ACADEMIC_YEAR.:format",
  [param("ACADEMIC_YEAR").isInt().notEmpty(), param("FROM_DATE").notEmpty(), param("TO_DATE").notEmpty()],
  async (req: Request, res: Response) => {
    const { FROM_DATE, TO_DATE, ACADEMIC_YEAR, format } = req.params;

    try {
      let notSentData = await db.raw(`SELECT d.transaction_number cert_num, m.id msfaa_num, m.received_date,
          CONCAT(p.first_name,' ', p.last_name) [name], rt.description request_type, d.issue_date, 
          d.due_date, COALESCE(d.disbursed_amount, 0.00) * 100 amount, d.csl_cert_seq_number seq
        FROM sfa.disbursement d
          INNER JOIN sfa.funding_request fr ON (fr.id = d.funding_request_id)
          INNER JOIN sfa.request_type rt ON (rt.id = fr.request_type_id)
          INNER JOIN sfa.application a ON (a.id = fr.application_id)
          INNER JOIN sfa.student s ON (s.id = a.student_id)
          INNER JOIN sfa.person p ON (p.id = s.person_id)
          INNER JOIN sfa.msfaa m ON (m.application_id = a.id)
        WHERE a.academic_year_id = ${ACADEMIC_YEAR}
          AND rt.id IN (${RELEVANT_REQUEST_TYPES.join(",")})
          AND d.csl_cert_seq_number IS NULL
          AND m.msfaa_status != 'Cancelled'
        ORDER BY 1, CASE WHEN rt.id IN (${RELEVANT_LOAN_TYPES.join(",")}) THEN 1 ELSE 2 END, due_date, rt.id`);

      let sentData = await db.raw(`SELECT d.transaction_number cert_num, m.id msfaa_num, m.received_date,
          CONCAT(p.first_name,' ', p.last_name) [name], rt.description request_type, d.issue_date, 
          d.due_date, COALESCE(d.disbursed_amount, 0.00) * 100 amount, d.csl_cert_seq_number seq
        FROM sfa.disbursement d
          INNER JOIN sfa.funding_request fr ON (fr.id = d.funding_request_id)
          INNER JOIN sfa.request_type rt ON (rt.id = fr.request_type_id)
          INNER JOIN sfa.application a ON (a.id = fr.application_id)
          INNER JOIN sfa.student s ON (s.id = a.student_id)
          INNER JOIN sfa.person p ON (p.id = s.person_id)
          INNER JOIN sfa.msfaa m ON (m.application_id = a.id)
        WHERE a.academic_year_id = ${ACADEMIC_YEAR}
          AND rt.id IN (${RELEVANT_REQUEST_TYPES.join(",")})
          and d.csl_cert_seq_number IS NOT NULL
          and m.msfaa_status = 'Received'
        ORDER BY 1, CASE WHEN rt.id IN (${RELEVANT_LOAN_TYPES.join(",")}) THEN 1 ELSE 2 END, due_date, rt.id`);

      let data = {
        currentDate: new Date(),
        startDate: FROM_DATE,
        endDate: TO_DATE,

        notSent: notSentData,
        sent: sentData,
      };

      if (format == "pdf") {
        let pdf = await renderReportAsPdf(TEMPLATE_PATH, data, "LETTER", true);
        res.setHeader("Content-disposition", `attachment; filename="EDU-SFA-${moment().format("YYYY-MM-DD")}.pdf"`);
        res.setHeader("Content-type", "application/pdf");
        return res.send(pdf);
      }

      let html = await renderReportAsHtml(TEMPLATE_PATH, data);

      // fix the image locations (likely just the Yukon Logo.png)
      html = html.replace("http://localhost:3000", FRONTEND_URL);

      res.send(html);
    } catch (error: any) {
      console.log(error);
      return res.status(404).send();
    }
  }
);
