import BaseController from "@/controllers/base-controller";
import ReportingService, { FundingStatusReportParams } from "@/services/admin/reporting-service";
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
}
