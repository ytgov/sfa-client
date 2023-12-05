import BaseController from "@/controllers/base-controller";
import ReportingService, {
  FundingStatusReportParams,
  ScholarshipReportParams,
} from "@/services/admin/reporting-service";
import { isNumber } from "lodash";
import moment from "moment";

export default class ReportingController extends BaseController {
  async runFundingStatusReport() {
    let years = this.request.params.years || moment().format("YYYY");
    let yList = years.split(",").map(Number);

    let reportData = await ReportingService.runFundingStatusReport({
      years: yList,
    } as FundingStatusReportParams);

    return ReportingService.generateAs({ format: this.format, reportData })
      .then(async ({ fileContent, fileName, mimeType }) => {
        if (this.format == "html") {
          this.response.send(fileContent);
        } else if (this.format == "json") {
          this.response.json(fileContent);
        } else {
          this.response.setHeader("Content-disposition", `attachment; filename="${fileName}"`);
          this.response.setHeader("Content-type", mimeType);
          this.response.send(fileContent);
        }
      })
      .catch((e) => {
        this.response.send("Error generating report: " + e);
      });
  }

  async runSTAYukonUniversityReport() {
    let years = this.request.params.years || moment().format("YYYY");
    let yList = years.split(",").map(Number);

    let reportData = await ReportingService.runSTAYukonUniversityReport({ date: undefined });

    return ReportingService.generateAs({ format: this.format, reportData })
      .then(async ({ fileContent, fileName, mimeType }) => {
        if (this.format == "html") {
          this.response.send(fileContent);
        } else if (this.format == "json") {
          for (let line of fileContent) {
            line.weeklyAmount = formatMoney(line.weeklyAmount);
            line.travelAllowance = formatMoney(line.travelAllowance);
            line.net = formatMoney(line.net);
          }

          this.response.json(fileContent);
        } else {
          this.response.setHeader("Content-disposition", `attachment; filename="${fileName}"`);
          this.response.setHeader("Content-type", mimeType);
          this.response.send(fileContent);
        }
      })
      .catch((e) => {
        this.response.send("Error generating report: " + e);
      });
  }

  async runScholarshipReport() {
    let academic_year_id = parseInt(this.request.params.academic_year_id ?? moment().format("YYYY"));

    let reportData = await ReportingService.runScholarshipReport({
      academic_year_id,
      status_id: 6, // qualified
      scholarshipIds: [7, 9, 10, 11],
    } as ScholarshipReportParams);

    return ReportingService.generateAs({ format: this.format, reportData })
      .then(async ({ fileContent, fileName, mimeType }) => {
        if (this.format == "html") {
          this.response.send(fileContent);
        } else if (this.format == "json") {
          this.response.json(fileContent);
        } else {
          this.response.setHeader("Content-disposition", `attachment; filename="${fileName}"`);
          this.response.setHeader("Content-type", mimeType);
          this.response.send(fileContent);
        }
      })
      .catch((e) => {
        this.response.send("Error generating report: " + e);
      });
  }

  async runNars2022FTReport() {
    return ReportingService.runNars2022FTReport({ format: this.format }).then((reportData) => {
      if (this.format == "html") {
        this.response.send(reportData);
      } else if (this.format == "csv") {
        this.response.setHeader("Content-disposition", `attachment; filename="PPYT.CSLS.NARS_2223.001.csv"`);
        this.response.setHeader("Content-type", "text/csv");
        this.response.send(reportData);
      } else if (this.format == "json") {
        this.response.json(reportData);
      } else {
        this.response.setHeader("Content-disposition", `attachment; filename="PPYT.CSLS.NARS_2223.001.txt"`);
        this.response.setHeader("Content-type", "text/plain");
        this.response.send(reportData);
      }
    });
  }
  async runNars2022PTReport() {
    return ReportingService.runNars2022PTReport({ format: this.format }).then((reportData) => {
      if (this.format == "html") {
        this.response.send(reportData);
      } else if (this.format == "csv") {
        this.response.setHeader("Content-disposition", `attachment; filename="PPYT.CSLS.PT_NARS_2223.001.csv"`);
        this.response.setHeader("Content-type", "text/csv");
        this.response.send(reportData);
      } else if (this.format == "json") {
        this.response.json(reportData);
      } else {
        this.response.setHeader("Content-disposition", `attachment; filename="PPYT.CSLS.PT_NARS_2223.001.txt"`);
        this.response.setHeader("Content-type", "text/plain");
        this.response.send(reportData);
      }
    });
  }
}

function formatMoney(input: number) {
  if (isNumber(input)) {
    return Intl.NumberFormat("en", {
      currency: "USD",
      style: "currency",
    }).format(input);
  }
  return "";
}
