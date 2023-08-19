import { Request, Response, NextFunction } from "express"

import BaseController from "@/controllers/base-controller"

import FundingRequestsLetterService from "@/services/admin/funding-requests/funding-requests-letter-service"

export default class FundingRequestsLettersController extends BaseController {
  async getLetter() {
    if (this.format === undefined || !["pdf", "html"].includes(this.format)) {
      return this.response.status(422).send({
        statusCode: 422,
        status: "Unprocessable Entity",
        message: 'Must provide a format of ".html" or ".pdf" to generate a letter.',
      })
    }

    const fundingRequestId = parseInt(this.request.params.fundingRequestId)
    const letterSlug = this.request.params.letterSlug

    const letterService = new FundingRequestsLetterService({
      fundingRequestId,
      letterSlug,
      signingOfficer: this.currentUser,
    })

    if (this.format === "pdf") {
      return letterService
        .generateLetterAsPdf()
        .then(async ({ fileContent, fileName }) => {
          this.response.setHeader("Content-disposition", `attachment; filename="${fileName}"`)
          this.response.setHeader("Content-type", "application/pdf")
          this.response.send(fileContent)
        })
        .catch((error) => {
          if (error instanceof Error) {
            if (
              error.message.includes("not found") ||
              error.message.includes("no such file or directory")
            ) {
              this.response.status(404).send({
                statusCode: 404,
                status: "Not Found",
                message: `Could not find funding request with id: "${fundingRequestId}".`,
                error: error.message,
                stackTrace: error.stack?.split("\n").map((line) => line.trim()),
              })
            } else {
              this.response.status(422).send({
                statusCode: 422,
                status: "Unprocessable Entity",
                message: error.message,
              })
            }
          } else {
            this.response.status(500).send({
              statusCode: 500,
              status: "Internal Server Error",
              message: JSON.stringify(error),
            })
          }
        })
    }

    return letterService
      .generateLetterAsHtml()
      .then((approvalLetter) => {
        this.response.send(approvalLetter)
      })
      .catch((error) => {
        if (error instanceof Error) {
          if (
            error.message.includes("not found") ||
            error.message.includes("no such file or directory")
          ) {
            this.response.status(404).send({
              statusCode: 404,
              status: "Not Found",
              message: `Could not find funding request with id: "${fundingRequestId}".`,
              error: error.message,
              stackTrace: error.stack?.split("\n").map((line) => line.trim()),
            })
          } else {
            this.response.status(422).send({
              statusCode: 422,
              status: "Unprocessable Entity",
              message: error.message,
            })
          }
        } else {
          this.response.status(500).send({
            statusCode: 500,
            status: "Internal Server Error",
            message: JSON.stringify(error),
          })
        }
      })
  }
}
