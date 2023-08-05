import express, { Request, Response } from "express"
import { param } from "express-validator"

import { ApplicationLetterService } from "../../services/admin/application-letter-service"

export const applicationLetterRouter = express.Router()

applicationLetterRouter.get(
  "/:applicationId/approval/:fundingType([^./]+).:format(pdf|html)?",
  [param("id").isInt().notEmpty()],
  async (req: Request, res: Response) => {
    const applicationId = parseInt(req.params.applicationId)
    const fundingType = req.params.fundingType
    const format = req.params.format || "pdf"

    try {
      const applicationLetterService = new ApplicationLetterService({ applicationId, fundingType, format })
      const approvalLetter = await applicationLetterService.generateApprovalLetter()
      if (format === "pdf") {
        const fileName = await applicationLetterService.buildApprovalLetterFileName()
        res.setHeader("Content-disposition", `attachment; filename="${fileName}"`)
        res.setHeader("Content-type", "application/pdf")
        res.send(approvalLetter)
      } else if (format === "html"){
        res.send(approvalLetter)
      } else {
        res.status(422).send({
          statusCode: 422,
          status: "Unprocessable Entity",
          message: `Could not generate letter in format ${format}`,
        })
      }
    } catch (error) {
      // TODO: standarize this pattern
      if (error instanceof Error) {
        if (error.message.includes("not found") || error.message.includes("no such file or directory")) {
          res.status(404).send({
            statusCode: 404,
            status: "Not Found",
            message: `Could not find application letter with id "${applicationId}" and funding type "${fundingType}".`,
          })
        } else {
          res.status(422).send({
            statusCode: 422,
            status: "Unprocessable Entity",
            message: error.message,
          })
        }
      } else {
        res.status(500).send({
          statusCode: 500,
          status: "Internal Server Error",
          message: JSON.stringify(error),
        })
      }
    }
  }
)

// TODO: support .html and .pdf extensions
// e.g. "/:applicationId/approval/:fundingType([^.\/]+).:format?"
applicationLetterRouter.get(
  "/:applicationId/rejection/:fundingType",
  [param("id").isInt().notEmpty()],
  async (req: Request, res: Response) => {
    const applicationId = parseInt(req.params.applicationId)
    const fundingType = req.params.fundingType

    try {
      const applicationLetterService = new ApplicationLetterService({ applicationId, fundingType, format: "pdf" })
      const fileName = await applicationLetterService.buildRejectionLetterFileName()
      const rejectionLetter = await applicationLetterService.generateRejectionLetter()

      res.setHeader("Content-disposition", `attachment; filename="${fileName}"`)
      res.setHeader("Content-type", "application/pdf")
      res.send(rejectionLetter)
    } catch (error) {
      // TODO: standarize this pattern
      if (error instanceof Error) {
        if (error.message.includes("not found")) {
          res.status(404).send({
            statusCode: 404,
            status: "Not Found",
            message: error.message,
          })
        } else {
          res.status(422).send({
            statusCode: 422,
            status: "Unprocessable Entity",
            message: error.message,
          })
        }
      } else {
        res.status(500).send({
          statusCode: 500,
          status: "Internal Server Error",
          message: JSON.stringify(error),
        })
      }
    }
  }
)
