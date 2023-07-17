import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";
import { AssessmentCslftRepository, AssessmentSTA } from "../../repositories";
import { AssessmentDTO, AssessmentTable, DisbursementDTO } from "../../models";
import { assessmentRouter } from "./assessment-router";
import axios from "axios";

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

            if (verifyFundingRequest && verifyFundingRequest?.request_type_id === 1) {
                const getAssessment = await db(mainTable)
                    .where("funding_request_id", verifyFundingRequest.id)
                    .first();

                if (getAssessment) {
                    results = await assessmentSTARepo.getAssessInfo(
                        parseInt(verifyFundingRequest.application_id),
                        parseInt(verifyFundingRequest.id),
                        getAssessment
                    );
                } else {
                    results = await assessmentSTARepo.getNewInfo(
                        parseInt(verifyFundingRequest.application_id),
                        parseInt(verifyFundingRequest.id),
                        []
                    );
                }
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
assessmentSTARouter.post("/",
    async (req: Request, res: Response) => {
        try {
            const { assessment = undefined } = req.body;

            const assessmentRepo = new AssessmentSTA(db);

            const notNullValues = {
                student_contrib_exempt: "No",
                spouse_contrib_exempt: "No",
                student_contribution_review: "No",
                spouse_contribution_review: "No",
                parent_contribution_review: "No",
            };

            let newApp: AssessmentDTO = {
                ...assessment,
                ...notNullValues
            };

            const newRow = await assessmentRepo.insertAssessment(newApp);

            if (newRow && newRow.length === 1) {
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
assessmentSTARouter.put("/:id",
    [param("id").isInt().notEmpty(), body("assessment").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const { assessment, disbursementList = undefined } = req.body;
        const id: number = parseInt(req.params.id);

        const assessmentRepo = new AssessmentSTA(db);

        let newApp: AssessmentDTO = {
            ...assessment
        };

        try {
            const updateRow = await assessmentRepo.saveAssessment(id, newApp, disbursementList ?? []);

            if (updateRow && updateRow.length === 1) {
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
assessmentSTARouter.get("/disbursements/:assessment_id",
    [param("assessment_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { assessment_id = undefined } = req.params;

        let results: DisbursementDTO[] | undefined = undefined;
        
        try {
            const verifyAssessment = await db(mainTable)
                .where({ id: assessment_id })
                .first();
                console.log("verifyAssessment", verifyAssessment);
            if (verifyAssessment) {
                results = await db("sfa.disbursement")
                .where({ assessment_id });
            }

            if (results) {
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