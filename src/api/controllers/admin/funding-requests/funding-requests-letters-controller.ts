import BaseController from "@/controllers/base-controller"

import FundingRequestLettersService from "@/services/funding-request-letters-service"
import FundingRequestsLetterBuilderService from "@/services/admin/funding-requests/funding-requests-letter-builder-service"
import FundingRequestsService from "@/services/funding-requests-service"
import CreateService from "@/services/admin/funding-requests/letters/create-service"

export default class FundingRequestsLettersController extends BaseController {
  async listLetters() {
    const fundingRequestId = parseInt(this.request.params.fundingRequestId)

    return FundingRequestsService.includes([
      "requestType",
      // "status", // TODO: should I restrict the list by status of funding request?
    ])
      .find(fundingRequestId)
      .then((fundingRequest) => {
        if (fundingRequest === undefined) throw new Error("Funding request not found")
        if (fundingRequest.requestType === undefined)
          throw new Error("Funding request has no request type")
        if (fundingRequest.requestType.description === undefined)
          throw new Error("Funding request, request type has no description")

        const requestType = fundingRequest.requestType.description
        const fundingRequestLetterMetadata = FundingRequestLettersService.where({ requestType })
        this.response.send(fundingRequestLetterMetadata)
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
              stackTrace: error.stack?.split("\n").map((line) => line.trim()),
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

  async getLetter() {
    if (this.format === undefined || !["pdf", "html", "json"].includes(this.format)) {
      return this.response.status(422).send({
        statusCode: 422,
        status: "Unprocessable Entity",
        message: 'Must provide a format of ".html", ".pdf", or ".json" to generate a letter.',
      })
    }

    const fundingRequestId = parseInt(this.request.params.fundingRequestId)
    const letterSlug = this.request.params.letterSlug

    const letterService = new FundingRequestsLetterBuilderService({
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
                stackTrace: error.stack?.split("\n").map((line) => line.trim()),
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

    if (this.format === "html") {
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
                stackTrace: error.stack?.split("\n").map((line) => line.trim()),
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
      .generateLetterAsJson()
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
              stackTrace: error.stack?.split("\n").map((line) => line.trim()),
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

  async createLetters() {
    const fundingRequestId = parseInt(this.request.params.fundingRequestId)

    const letterCreationService = new CreateService({
      fundingRequestId,
      signingOfficer: this.currentUser,
    })

    return letterCreationService
      .preform()
      .then((letterNames) => {
        const letterNamesString = letterNames.join(", ")
        return this.response.status(201).send({
          statusCode: 201,
          status: "Created",
          message: `Created the following letters: ${letterNamesString}`,
        })
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
              stackTrace: error.stack?.split("\n").map((line) => line.trim()),
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
