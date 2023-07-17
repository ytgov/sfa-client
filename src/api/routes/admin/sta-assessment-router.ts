import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";
import { AssessmentCslftRepository, AssessmentSTA } from "../../repositories";
import {AssessmentDTO, AssessmentTable} from "../../models";
import {assessmentRouter} from "./assessment-router";

const db = knex(DB_CONFIG)
export const assessmentSTARouter = express.Router();
const mainTable = "sfa.assessment";

assessmentSTARouter.get("/assess-info/:id",
[param("id").isInt().notEmpty()], ReturnValidationErrors, 
async (req: Request, res: Response) => {

    const assessmentSTARepo = new AssessmentSTA(db);
    const { id = undefined } = req.params;
    let results: Partial<AssessmentDTO> = {};
    
    try {
        const verifyFundingRequest = await db("sfa.funding_request")
            .where({ id })
            .first();

        if (verifyFundingRequest) {
            results = await assessmentSTARepo.getNewInfo(
                parseInt(verifyFundingRequest.application_id),
                parseInt(verifyFundingRequest.id),
            );
        }

        if (Object.keys(results).length > 0) {
            return res.status(200).json({ success: true, data: results, });
        } else {
            return res.status(404).send();
        }

    } catch (error: any) {
        console.log(error);
        return res.status(404).send();
    }
});