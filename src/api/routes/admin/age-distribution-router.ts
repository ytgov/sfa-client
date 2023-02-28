import express, { Request, Response } from "express";
import { param, body } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG)

export const ageDistributionRouter = express.Router();

ageDistributionRouter.get("/", async (req: Request, res: Response) => {

    try {
        const results = await db("sfa.age_distribution")
            .select(
                'sfa.age_distribution.id',
                'sfa.age_distribution.start_age',
                'sfa.age_distribution.end_age',
            )

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

ageDistributionRouter.post("/", body('is_active').isBoolean(), body('description').isString(),

    async (req: Request, res: Response) => {
        const { start_age = 0, end_age = 1, } = req.body;

        try {

            if (!(Number(start_age) < Number(end_age))) return res.status(400).json({ success: false, message: "End Age must be higher", });

            const verify = await db("sfa.age_distribution")
                .where({ start_age, end_age });

            if (verify?.length) return res.status(400).send({ success: false, message: "this age distribution already exists", });

            const resInsert = await db("sfa.age_distribution")
                .insert({ start_age, end_age })
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

ageDistributionRouter.patch("/distribution/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { start_age = 1, end_age = 0, } = req.body;

        try {

            if (!(Number(start_age) < Number(end_age))) return res.status(400).json({ success: false, message: "End Age must be higher", });

            const verify = await db("sfa.age_distribution")
                .where({ start_age, end_age })
                .whereNot({ id });

            if (verify?.length) return res.status(400).send({ success: false, message: "this age distribution already exists", });

        } catch (error) {
            console.log(error);
            return res.status(400).send({ success: false, message: "Error!", });
        }

        db("sfa.age_distribution")
            .update({ start_age, end_age })
            .where({ id })
            .returning("*")
            .then((resp: any) => {
                if (resp[0]?.id === Number(id)) {
                    res.status(202).send({ wasUpdated: true, ...resp[0] });
                } else {
                    res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
                }
            })
            .catch(function (e: any) {
                res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
                console.log(e);
            });
    });

ageDistributionRouter.delete("/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        let description = "";
        try {

            const verifyRecord: any = await db("sfa.age_distribution")
                .where({ id: id })
                .first();

            if (!verifyRecord) {
                return res.status(404).send({ wasDelete: false, message: "The record does not exits" });
            }

            description = verifyRecord?.description;

            const deleteRecord: any = await db("sfa.age_distribution")
                .where({ id: id })
                .del();

            return (deleteRecord > 0) ?
                res.status(202).send({ wasDelete: true })
                :
                res.status(404).send({ wasDelete: false, message: `The record "${verifyRecord.description}" does not exits` });

        } catch (error: any) {

            console.log(error);

            if (error?.number === 547) {
                return res.status(409).send({ wasDelete: false, message: `"${description}" cannot be deleted because it is in use.` });
            }

            return res.status(409).send({ wasDelete: false, message: "Error to Delete" });
        }
    }
);
