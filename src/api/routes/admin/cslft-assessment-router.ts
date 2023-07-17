import knex from "knex";
import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";
import { AssessmentCslftRepository, StudentRepository } from "../../repositories";
import { AddressLinesDTO, AssessmentDTO, DisbursementDTO, FundingRequestDTO } from "../../models";
import { CslftGlobalDTO } from "models/result/assessments/cslft/CslftGlobalDTO";
import { CslftResultDTO } from "models/result";

const db = knex(DB_CONFIG)
export const assessmentCslftRouter = express.Router();
const mainTable = "sfa.assessment";

assessmentCslftRouter.get("/assess-info/:id",
[param("id").isInt().notEmpty()], ReturnValidationErrors, 
async (req: Request, res: Response) => {

    const assessmentCslftRepo = new AssessmentCslftRepository(db);
    const { id = undefined } = req.params;
    let results: Partial<AssessmentDTO> = {};
    
    try {

        if (id) {
            results = await assessmentCslftRepo.getAssessInfoCslft(parseInt(id));
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

assessmentCslftRouter.post("/",
    [body("assessment").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const { ...assessment } = req.body.assessment;
        const assessmentRepo = new AssessmentCslftRepository(db);
        let newApp: AssessmentDTO = {
            ...assessment
        };

        try {
            const newRow = await assessmentRepo.insertAssessment(newApp);

            if (newRow && newRow.length == 1) {
                return res.json({ data: { id: newRow[0].id }, messages: [{ text: "Assessment created", variant: "success" }] });
            }

            return res.status(404).send();
        }
        catch (err) {
            console.log(err);
            return res.json({ messages: [{ text: `Saved failed`, variant: "error" }] })
        }
    }
);

assessmentCslftRouter.put("/:id",
    [param("id").isInt().notEmpty(), body("assessment").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const { ...assessment } = req.body.assessment;
        const id: number = parseInt(req.params.id);

        const assessmentRepo = new AssessmentCslftRepository(db);
        let newApp: AssessmentDTO = {
            ...assessment
        };

        try {
            const updateRow = await assessmentRepo.updateAssessment(id, newApp);

            if (updateRow && updateRow.length == 1) {
                return res.json({ data: { id: updateRow[0].id }, messages: [{ text: "Assessment updated", variant: "success" }] });
            }

            return res.status(404).send();
        }
        catch (err) {
            console.log(err);
            return res.json({ messages: [{ text: `Saved failed`, variant: "error" }] })
        }
    }
);

assessmentCslftRouter.post("/:funding_request_id/recalc",
    [param("funding_request_id").isInt().notEmpty(), body("assessment").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const assessmentCslftRepo = new AssessmentCslftRepository(db);
        const { ...assessment } = req.body.assessment;
        const { funding_request_id = undefined } = req.params;
        let results: Partial<AssessmentDTO> = {};       
        
        try {

            if (funding_request_id) {
                results = await assessmentCslftRepo.executeRecalc(parseInt(funding_request_id), assessment as AssessmentDTO);
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
    }
);

assessmentCslftRouter.post("/:funding_request_id/disburse",
    [param("funding_request_id").isInt().notEmpty(), body("assessment").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const assessmentCslftRepo = new AssessmentCslftRepository(db);
        const { ...assessment } = req.body.assessment;
        const { funding_request_id = undefined } = req.params;
        let results: Partial<CslftResultDTO> = {};
        
        try {

            if (funding_request_id) {
                const disburse = await assessmentCslftRepo.executeDisburse(parseInt(funding_request_id), assessment as AssessmentDTO);
                results.data = disburse.assessment;
                results.disbursements = disburse.disbursements;
                results.funding_request = disburse.funding_request;
                results.globals = disburse.globals;
            }

            if (Object.keys(results).length > 0) {
                results.success = true;
                return res.status(200).json(results);
            } else {
                return res.status(404).send();
            }

        } catch (error: any) {
            console.log(error);
            return res.status(404).send();
        }
    }
);