import knex from "knex";
import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";
import { AssessmentCsgftRepository, DisbursementRepository } from "../../repositories";
import { AssessmentDTO, DisbursementDTO } from "../../models";

const db = knex(DB_CONFIG)
export const assessmentCsgftRouter = express.Router();
const mainTable = "sfa.assessment";

assessmentCsgftRouter.get("/new-instance/:id",
[param("id").isInt().notEmpty()], ReturnValidationErrors, 
async (req: Request, res: Response) => {

    const assessmentCsgftRepo = new AssessmentCsgftRepository(db);
    const { id = undefined } = req.params;
    let results: Partial<AssessmentDTO> = {};
    
    try {

        if (id) {
            results = await assessmentCsgftRepo.newFormInstance(parseInt(id));
        }

        if (Object.keys(results ?? {}).length > 0) {
            return res.status(200).json({success: true, data: results});
        } else {
            return res.status(404).send();
        }

    } catch (error: any) {
        console.log(error);
        return res.status(404).send();
    }
});