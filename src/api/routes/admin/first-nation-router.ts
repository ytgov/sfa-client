import express, { Request, Response } from "express";
import { param, body } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG)

export const firstNationRouter = express.Router();

firstNationRouter.get("/", async (req: Request, res: Response) => {

    const { filter = true } = req.query;

    try {
        const results = await db("sfa.first_nation")
            .leftJoin('sfa.city', { 'sfa.first_nation.city_id': 'sfa.city.id' })
            .select(
                'sfa.first_nation.id',
                'sfa.first_nation.description',
                'sfa.first_nation.city_id',
                'sfa.city.description as city_name',
                'sfa.first_nation.is_active',
            )
            .orderBy('sfa.first_nation.description');

        if (results) {

            if (filter !== 'false') {
                return res.status(200).json({ success: true, data: results.filter(c => c.is_active), })
            } else {
                return res.status(200).json({ success: true, data: [...results], });
            }

        } else {
            return res.status(404).send();
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send();
    }
});

firstNationRouter.post("/", body('is_active').isBoolean(), body('description').isString(),

    async (req: Request, res: Response) => {
        const { is_active, description, city_id } = req.body;

        const trimDescription = description?.trim();

        try {
            if (!trimDescription.length) {

                return res.status(400).send({
                    wasInserted: false,
                    message: "Description must be required"
                });
            }

            const verify = await db("sfa.first_nation")
                .select(
                    'sfa.first_nation.description',
                    'sfa.first_nation.city_id',
                )
                .where({ description: trimDescription });

            const hasSameDescription = verify?.some((first_nation) => {
                return first_nation.description?.toLowerCase() === trimDescription?.toLowerCase();
            });
            if (hasSameDescription) return res.status(400).send({ wasInserted: false, message: "A record with the same description already exists" });

            const resInsert = await db("sfa.first_nation")
                .insert({ description: trimDescription, is_active, city_id })
                .returning("*");

            if (resInsert) {
                return res.status(201).json({ success: true, data: resInsert, });
            } else {
                return res.status(400).send();
            }
        } catch (error) {
            console.log(error);
            return res.status(400).send();

        }
    });

firstNationRouter.patch("/status/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { is_active = false } = req.body;

        db("sfa.first_nation")
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
                console.log(e);
                res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
            });
    });

firstNationRouter.patch("/city/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { city_id = null, description = "" } = req.body;

        try {
            if (city_id !== null && description.length) {

                const verify = await db("sfa.first_nation")
                    .select(
                        'sfa.first_nation.id',
                        'sfa.first_nation.description',
                        'sfa.first_nation.city_id',
                    )
                    .where({ description });

                const hasSameCity = verify?.some((first_nation) =>
                    (first_nation.city_id === Number(city_id) && Number(id) !== first_nation.id));

                if (hasSameCity) return res.status(400).send({
                    wasInserted: false,
                    message: "A record with the same city already exists"
                });

            }
        } catch (error) {
            console.log(error);
            return res.status(400).send({ wasInserted: false, message: "Error", });
        }

        db("sfa.first_nation")
            .update({ city_id })
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
                console.log(e);
                res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
            });
    });

firstNationRouter.patch("/description/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { description = "" } = req.body;

        const trimDescription = description?.trim();

        try {
            if (!trimDescription.length) {

                return res.status(400).send({
                    wasInserted: false,
                    message: "Description must be required"
                });
            }

            const verify = await db("sfa.first_nation")
                .select(
                    'sfa.first_nation.description',
                    'sfa.first_nation.id',
                )
                .where({ description: trimDescription });

            const hasSameDescription = verify?.some((first_nation) => {
                return (first_nation.description.toLowerCase() === trimDescription.toLowerCase() && first_nation.id !== Number(id));
            });
            if (hasSameDescription) return res.status(400).send({ wasInserted: false, message: "A record with the same description already exists" });

        } catch (error) {
            res.status(400).send({ wasInserted: false, message: "Error!" });
        }
        db("sfa.first_nation")
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
                console.log(e);
                res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
            });
    });

firstNationRouter.delete("/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    (req: Request, res: Response) => {

        const { id = null } = req.params;

        db("sfa.first_nation")
            .where({ id: id })
            .del()
            .then((resp) => {
                res.status(202).send({ wasDelete: true });
            }
            )
            .catch(function (e: any) {
                console.log(e);
                res.status(409).send({ wasDelete: false, message: "Could Not Delete" });
            });
    });
