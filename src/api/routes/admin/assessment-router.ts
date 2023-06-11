import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import moment from "moment";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG)
export const assessmentRouter = express.Router();

assessmentRouter.get("/:id", 
[param("id").isInt().notEmpty()], ReturnValidationErrors, 
async (req: Request, res: Response) => {

    const { id = null } = req.query;

    try {
        const results = await db("sfa.assessment")
            .where("id", id);

        if (results) {
            return res.status(200).json({ success: true, data: [...results], });
        } else {
            return res.status(404).send();
        }

    } catch (error: any) {
        console.log(error);
        return res.status(404).send();
    }
});

assessmentRouter.post("/",
    [body("funding_request_id").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const { funding_request_id, ...assessment } = req.body;
        const existing = await db("sfa.assessment").where({ funding_request_id: funding_request_id }).count("* as count").first();

        let newApp = {
            funding_request_id: funding_request_id,            
            ...assessment
        };

        const newRow = await db("sfa.assessment").insert(newApp).returning("*");

        if (newRow && newRow.length == 1) {
            return res.json({ data: { id: newRow[0].id }, messages: [{ text: "Assessment created", variant: "success" }] });
        }
        else {
            return res.json({ messages: [{ text: "This record appears to already exist", variant: "error" }] })
        }
    });