import express, { Request, Response } from "express";
import { param } from "express-validator";

import { ApplicationLetterService } from "../../services/admin/application-letter-service";


export const applicationLetterRouter = express.Router();


applicationLetterRouter.get(
    '/:applicationId/approval',
    [
        param("id").isInt().notEmpty(),
    ],
    async (req: Request, res: Response) => {
        const applicationId = parseInt(req.params.applicationId);

        try {
            const applicationLetterService = new ApplicationLetterService({ applicationId })
            const fileName = await applicationLetterService.buildApprovalLetterFileName();
            const approvalLetter = await applicationLetterService.generateApprovalLetter();

            res.setHeader("Content-disposition", `attachment; filename="${fileName}"`);
            res.setHeader("Content-type", "application/pdf");
            res.send(approvalLetter);
        } catch (error) {
            // TODO: standarize this pattern
            if (error instanceof Error) {
                if (error.message.includes("not found")) {
                    res.status(404).send({
                        statusCode: 404,
                        status: "Not Found",
                        message: error.message
                    });
                } else {
                    res.status(422).send({
                        statusCode: 422,
                        status: "Unprocessable Entity",
                        message: error.message
                    });
                }
            } else {
                res.status(500).send({
                    statusCode: 500,
                    status: "Internal Server Error",
                    message: JSON.stringify(error)
                });
            }
        }
    }
)
