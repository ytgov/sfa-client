import express, { Request, Response } from "express";
import { param, body } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG)

export const disbursementRouter = express.Router();

disbursementRouter.get("/funding-request/:funding_request_id",
    [param("funding_request_id").isInt().notEmpty()],
    ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { funding_request_id } = req.params;

        try {
            const results = await db("sfa.disbursement")
                .where({ funding_request_id });

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

disbursementRouter.post("/",
    async (req: Request, res: Response) => {
        const { data } = req.body;

        try {
            if (!data.funding_request_id) return res.json({ success: false, message: "funding request id is required", });

            const verify = await db("sfa.funding_request")
                .where({ id: data.funding_request_id });

            if (!verify?.length) return res.json({ success: false, message: `Funding Request not founded`, });

            const resInsert = await db("sfa.disbursement")
                .insert({ ...data })
                .returning("*");

            if (resInsert) {
                return res.status(201).json({ success: true, data: resInsert, });
            } else {
                return res.status(400).send();
            }

        } catch (err) {
            console.log(err);
            return res.status(400).send(err);
        }
    }
);

disbursementRouter.patch("/:id", [ param("id").isInt().notEmpty(), ], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const { data } = req.body;
        const { id } = req.params;

        try {
            if (!data.funding_request_id) return res.json({ success: false, message: "funding request id is required", });

            const verify = await db("sfa.funding_request")
                .where({ id: data.funding_request_id });

            if (!verify.length) return res.json({ success: false, message: `Funding Request not founded`, });
            delete data.id;
            const resUpdate = await db("sfa.disbursement")
                .where({ id, funding_request_id: data.funding_request_id })
                .update({ ...data });

            return resUpdate ?
                res.json({ success: true, data: [], })
                :
                res.json({ success: false, message: `Some failed`, });

        } catch (err) {
            console.log(err);
            return res.status(400).send(err);
        }
    }
);

disbursementRouter.delete("/:id", [ param("id").isInt().notEmpty(), ], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const verify = await db("sfa.disbursement")
                .where({ id });

            if (!verify.length) return res.json({ success: false, message: `Disbursement not founded`, });

            const resDelete = await db("sfa.disbursement")
                .where({ id })
                .del();

            return resDelete ?
                res.json({ success: true, message: `Deleted!`, })
                :
                res.json({ success: false, message: `Some failed`, });

        } catch (err) {
            console.log(err);
            return res.status(400).send(err);
        }
    }
);