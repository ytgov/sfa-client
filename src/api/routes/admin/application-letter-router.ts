import express, { Request, Response } from "express";
import { param } from "express-validator";

import ApplicationLetterService from "../../services/admin/application-letter-service";

export const applicationLetterRouter = express.Router();

applicationLetterRouter.get(
  "/:applicationId/approval/:fundingRequestId/:format?",
  [param("id").isInt().notEmpty()],
  async (req: Request, res: Response) => {
    const applicationId = parseInt(req.params.applicationId);
    const fundingRequestId = parseInt(req.params.fundingRequestId);
    const format = req.params.format || "pdf";

    let officerName = `${req.user.first_name} ${req.user.last_name}`;
    let officerPosition = req.user.position as string;

    try {
      const applicationLetterService = new ApplicationLetterService({
        applicationId,
        fundingRequestId,
        format,
        officerName,
        officerPosition,
      });
      const approvalLetter = await applicationLetterService.generateApprovalLetter();
      if (format === "pdf") {
        const fileName = await applicationLetterService.buildApprovalLetterFileName();
        res.setHeader("Content-disposition", `attachment; filename="${fileName}"`);
        res.setHeader("Content-type", "application/pdf");
        res.send(approvalLetter);
      } else if (format === "html") {
        res.send(approvalLetter);
      } else {
        res.status(422).send({
          statusCode: 422,
          status: "Unprocessable Entity",
          message: `Could not generate letter in format ${format}`,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("not found") || error.message.includes("no such file or directory")) {
          res.status(404).send({
            statusCode: 404,
            status: "Not Found",
            message: `Could not find application letter with id "${applicationId}" and funding request "${fundingRequestId}".`,
            error: error.message,
            t: error.stack,
          });
        } else {
          res.status(422).send({
            statusCode: 422,
            status: "Unprocessable Entity",
            message: error.message,
          });
        }
      } else {
        res.status(500).send({
          statusCode: 500,
          status: "Internal Server Error",
          message: JSON.stringify(error),
        });
      }
    }
  }
);

applicationLetterRouter.get(
  "/:applicationId/rejection/:fundingRequestId/:format?",
  [param("id").isInt().notEmpty()],
  async (req: Request, res: Response) => {
    const applicationId = parseInt(req.params.applicationId);
    const fundingRequestId = parseInt(req.params.fundingRequestId);
    const format = req.params.format || "pdf";

    let officerName = `${req.user.first_name} ${req.user.last_name}`;
    let officerPosition = req.user.position;

    try {
      const applicationLetterService = new ApplicationLetterService({
        applicationId,
        fundingRequestId,
        format,
        officerName,
        officerPosition,
      });
      const rejectionLetter = await applicationLetterService.generateRejectionLetter();
      if (format === "pdf") {
        const fileName = await applicationLetterService.buildRejectionLetterFileName();
        res.setHeader("Content-disposition", `attachment; filename="${fileName}"`);
        res.setHeader("Content-type", "application/pdf");
        res.send(rejectionLetter);
      } else if (format === "html") {
        res.send(rejectionLetter);
      } else {
        res.status(422).send({
          statusCode: 422,
          status: "Unprocessable Entity",
          message: `Could not generate letter in format ${format}`,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("not found") || error.message.includes("no such file or directory")) {
          res.status(404).send({
            statusCode: 404,
            status: "Not Found",
            message: `Could not find application letter with id "${applicationId}" and funding request "${fundingRequestId}".`,
          });
        } else {
          res.status(422).send({
            statusCode: 422,
            status: "Unprocessable Entity",
            message: error.message,
          });
        }
      } else {
        res.status(500).send({
          statusCode: 500,
          status: "Internal Server Error",
          message: JSON.stringify(error),
        });
      }
    }
  }
);
