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
        const results = await db("sfa.funding_request")
            .where("funding_request_id", id);

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
