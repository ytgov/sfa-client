import express, { Request, Response } from "express";
import { param } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG)

export const countriesRouter = express.Router();

countriesRouter.get("/", async (req: Request, res: Response) => {

    const { filter = true } = req.query;

    try {
        const countries = await db("sfa.country")
            .select('id', 'description', 'is_active')
            .orderBy('sfa.country.description');

        if (countries) {

            if (filter !== 'false') {
                return res.status(200).json({ success: true, data: countries.filter(c => c.is_active), })
            } else {
                return res.status(200).json({ success: true, data: [...countries], });
            }

        } else {
            return res.status(404).send();
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send();
    }
});

countriesRouter.post("/", async (req: Request, res: Response) => {
    const { is_active, description = "" } = req.body;
    
    const trimDescription = description?.trim();
    
    try {

        if (!trimDescription.length) {

            return res.status(400).send({
                wasInserted: false,
                message: "Description must be required"
            });
        }

        const verify = await db("sfa.country")
            .select('description')
            .where({ description: trimDescription });

        if (verify?.length) return res.status(400).send({ success: false, message: `"${trimDescription}" already exists`, });

        const resInsertCountry = await db("sfa.country")
            .insert({ description: trimDescription, is_active })
            .returning("*");

        if (resInsertCountry) {
            return res.status(201).json({ success: true, data: resInsertCountry, });
        } else {
            return res.status(400).send();
        }

    } catch (error) {
        console.log(error);
        return res.status(400).send();
    }
});

countriesRouter.patch("/status/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { is_active = false } = req.body;

        db("sfa.country")
            .update({ is_active })
            .where({ id })
            .returning("*")
            .then((resp) => {
                if (resp[0]?.is_active === is_active && resp[0]?.id === Number(id)) {
                    res.status(202).send({ wasUpdated: true, ...resp[0] });
                } else {
                    res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
                }
            }
            )
            .catch(function (e: any) {
                res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
                console.log(e);
            });
    }
);

countriesRouter.patch("/description/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { description = "" } = req.body;

        const trimDescription = description?.trim();
        
        const verify = await db("sfa.country")
            .select('id', 'description')
            .where({ description });

        const hasSameDescription = verify?.some((country) => (country?.description.toLowerCase() === description.toLowerCase() &&
            country?.id !== Number(id)));

        if (hasSameDescription) return res.status(400).send({ success: false, message: `"${trimDescription}" already exists`, });

        if (trimDescription.length) {
            db("sfa.country")
                .update({ description: trimDescription })
                .where({ id })
                .returning("*")
                .then((resp) => {
                    if (resp[0]?.id === Number(id)) {
                        res.status(202).send({ wasUpdated: true, ...resp[0] });
                    } else {
                        res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
                    }
                }
                )
                .catch(function (e: any) {
                    res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
                    console.log(e);
                });
        } else {
            res.status(409).send({ wasUpdated: false, message: "Description is required" });
        }

    }
);

countriesRouter.delete("/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        let description = "";
        try {

            const verifyRecord: any = await db("sfa.country")
                .where({ id: id })
                .first();

            if (!verifyRecord) {
                return res.status(404).send({ wasDelete: false, message: "The record does not exits" });
            }

            description = verifyRecord?.description;

            const deleteRecord: any = await db("sfa.country")
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