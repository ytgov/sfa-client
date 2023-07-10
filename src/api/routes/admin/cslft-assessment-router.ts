import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";
import { AssessmentCslftRepository } from "../../repositories";
import {AssessmentDTO, AssessmentTable} from "../../models";
import {assessmentRouter} from "./assessment-router";

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
            const filtered = assessmentRepo.getAssessmentTable(newApp);
            const newRow = await db(mainTable).insert(filtered).returning("*");

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
    [param("id").notEmpty(), body("assessment").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const { ...assessment } = req.body.assessment;
        const id = req.params.id;

        const assessmentRepo = new AssessmentCslftRepository(db);
        let newApp: AssessmentDTO = {
            ...assessment
        };

        try {
            const filtered = assessmentRepo.getAssessmentTable(newApp);
            const updateRow = await db(mainTable)
                .update(filtered)
                .where({
                    id: id
                })
                .returning("*");

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