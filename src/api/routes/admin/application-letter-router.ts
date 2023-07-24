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

        const applicationLetterService = new ApplicationLetterService({ applicationId });
        const approvalLeter = await applicationLetterService.generateApprovalLetter();
        const fileName = applicationLetterService.buildApprovalLetterFileName();

        res.setHeader("Content-disposition", `attachment; filename="${fileName}"`);
        res.setHeader("Content-type", "application/pdf");
        res.send(approvalLeter);
    }

    // res.status(404).send();
)
