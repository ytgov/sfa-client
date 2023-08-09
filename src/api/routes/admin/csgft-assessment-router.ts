import knex from "knex";
import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";
import { AssessmentCsgftRepository } from "../../repositories";
import { AssessmentDTO, CsgftResultDTO, DisbursementDTO } from "../../models";

const db = knex(DB_CONFIG)
export const assessmentCsgftRouter = express.Router();
const mainTable = "sfa.assessment";

assessmentCsgftRouter.get("/new-instance/:id",
    [param("id").isInt().notEmpty()], ReturnValidationErrors, 
    async (req: Request, res: Response) => {

        const assessmentCsgftRepo = new AssessmentCsgftRepository(db);
        const { id = undefined } = req.params;
        let results: Partial<CsgftResultDTO> = {};
        
        try {

            if (id) {
                results = await assessmentCsgftRepo.newFormInstance(parseInt(id));
            }

            if (Object.keys(results.data ?? {}).length > 0) {
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

assessmentCsgftRouter.post("/",
    [body("payload").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const { ...assessment } = req.body.payload.data;
        const disbursements = req.body.payload.disbursements;
        const funding_request = req.body.payload.funding_request;
        const assessmentRepo = new AssessmentCsgftRepository(db);
        let newApp: Partial<CsgftResultDTO> = {
            data: { ...assessment },
            disbursements: disbursements,
            funding_request: funding_request,
        };

        try {
            const newRow = await assessmentRepo.insertUpdateAll(newApp);

            if (newRow) {
                return res.json({ data: { id: newRow.data?.id }, messages: [{ text: "Assessment created", variant: "success" }] });
            }

            return res.status(404).send();
        }
        catch (err) {
            console.log(err);
            return res.json({ messages: [{ text: `Saved failed`, variant: "error" }] })
        }
    }
);

assessmentCsgftRouter.put("/:id",
    [param("id").isInt().notEmpty(), body("payload").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const { ...assessment } = req.body.payload.data;
        const disbursements = req.body.payload.disbursements;
        const funding_request = req.body.payload.funding_request;

        const assessmentRepo = new AssessmentCsgftRepository(db);
        let newApp: Partial<CsgftResultDTO> = {
            data: { ...assessment },
            disbursements: disbursements,
            funding_request: funding_request,
        };

        try {
            const updateRow = await assessmentRepo.insertUpdateAll(newApp);

            if (updateRow) {
                return res.json({ data: { id: updateRow.data?.id }, messages: [{ text: "Assessment updated", variant: "success" }] });
            }

            return res.status(404).send();
        }
        catch (err) {
            console.log(err);
            return res.json({ messages: [{ text: `Saved failed`, variant: "error" }] })
        }
    }
);

assessmentCsgftRouter.post("/:funding_request_id/recalc",
    [param("funding_request_id").isInt().notEmpty(), body("assessment").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const assessmentCsgftRepo = new AssessmentCsgftRepository(db);
        const { ...assessment } = req.body.assessment;
        const disbursements: Array<DisbursementDTO> = req.body.disbursements;
        const { funding_request_id = undefined } = req.params;        
        let results: Partial<CsgftResultDTO> = {};       
        
        try {

            if (funding_request_id) {
                results = await assessmentCsgftRepo.executeRecalc(parseInt(funding_request_id), assessment as AssessmentDTO, disbursements);
            }

            if (Object.keys(results.data ?? {}).length > 0) {
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

assessmentCsgftRouter.post("/:funding_request_id/disburse",
    [param("funding_request_id").isInt().notEmpty(), body("assessment").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const assessmentCsgftRepo = new AssessmentCsgftRepository(db);
        const { ...assessment } = req.body.assessment;
        const disbursements: Array<DisbursementDTO> = req.body.disbursements;
        const { funding_request_id = undefined } = req.params;
        let results: Partial<CsgftResultDTO> = {};
        
        try {

            if (funding_request_id) {
                const disburse = await assessmentCsgftRepo.executeDisburse(parseInt(funding_request_id), assessment as AssessmentDTO, disbursements);
                results.data = disburse.data;
                results.disbursements = disburse.disbursements;
                results.funding_request = disburse.funding_request;
                results.globals = disburse.globals;
            }

            if (Object.keys(results.data ?? {}).length > 0) {
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