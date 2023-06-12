import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG)
export const assessmentRouter = express.Router();
const mainTable = "sfa.assessment";

assessmentRouter.get("/:id", 
[param("id").isInt().notEmpty()], ReturnValidationErrors, 
async (req: Request, res: Response) => {

    const { id = null } = req.params;

    try {
        const results = await db(mainTable)
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
        const existing = await db(mainTable).where({ funding_request_id: funding_request_id }).count("* as count").first();

        let newApp = {
            funding_request_id: funding_request_id,            
            ...assessment
        };

        const newRow = await db(mainTable).insert(newApp).returning("*");

        if (newRow && newRow.length == 1) {
            return res.json({ data: { id: newRow[0].id }, messages: [{ text: "Assessment created", variant: "success" }] });
        }
        else {
            return res.json({ messages: [{ text: "This record appears to already exist", variant: "error" }] })
        }
    }
);

assessmentRouter.patch("/:id", 
    [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const { id = null } = req.params;
        const { ...assessment } = req.body;

        console.log(id);

        try {
            const result = await db(mainTable).where({id:id}).update(assessment);

            if (result) {
                return res.status(200).json({ messages: [{ variant: "success", text: "Assessment saved" }] })
            }

            return res.status(404).send();
        }
        catch (err: any) {
            console.log("FAILED", err)
            return res.json({ messages: [{ variant: "error", text: "Save failed" }] })
        }
        
    }
);

assessmentRouter.delete("/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        let description = "";
        try {

            const verifyRecord: any = await db(mainTable)
                .where({ id: id })
                .first();

            if (!verifyRecord) {
                return res.status(404).send({ wasDelete: false, message: "The record does not exits" });
            }

            const deleteRecord: any = await db(mainTable)
                .where({ id: id })
                .del();

            return (deleteRecord > 0) ?
                res.status(202).send({ wasDelete: true })
                :
                res.status(404).send({ wasDelete: false, message: `The record with Id: "${id}" does not exits` });

        } catch (error: any) {

            console.log(error);
            if (error?.number === 547) {
                return res.status(409).send({ wasDelete: false, message: `The assessment Id: "${id}" cannot be deleted because it is in use.` });
            }

            return res.status(409).send({ wasDelete: false, message: "Error to Delete" });
        }
    }
);