import express, { Request, Response } from "express";
import { param, body } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG)

export const citiesRouter = express.Router();

citiesRouter.get("/", async (req: Request, res: Response) => {

    const { filter = true } = req.query;

    try {
        const cities = await db("sfa.city")
            .leftJoin('sfa.province', { 'sfa.city.province_id': 'sfa.province.id' })
            .select(
                'sfa.city.id',
                'sfa.city.description',
                'sfa.city.province_id',
                'sfa.province.description as province_name',
                'sfa.city.is_active',
            )
            .orderBy('sfa.city.description');

        if (cities) {

            if (filter !== 'false') {
                return res.status(200).json({ success: true, data: cities.filter(c => c.is_active), })
            } else {
                return res.status(200).json({ success: true, data: [...cities], });
            }

        } else {
            return res.status(404).send();
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send();
    }
});

citiesRouter.post("/", body('is_active').isBoolean(), body('description').isString(),

    async (req: Request, res: Response) => {
        const { is_active, description, province_id } = req.body;

        const trimDescription = description?.trim();

        try {
            if (!trimDescription.length) {

                return res.status(400).send({
                    wasInserted: false,
                    message: "Description must be required"
                });
            }

            const verify = await db("sfa.city")
                .select(
                    'sfa.city.description',
                    'sfa.city.province_id',
                )
                .where({ description });

            const hasSomeProvince = verify?.some((city) => {
                return city.province_id === Number(province_id) ||
                    city.province_id === null;
            });
            if (hasSomeProvince) return res.status(400).send({ wasInserted: false, message: "A record with the same province already exists" });

            const resInsertCity = await db("sfa.city")
                .insert({ description, is_active, province_id })
                .returning("*");

            if (resInsertCity) {
                return res.status(201).json({ success: true, data: resInsertCity, });
            } else {
                return res.status(400).send();
            }
        } catch (error) {
            console.log(error);
            return res.status(400).send();

        }
    });

citiesRouter.patch("/status/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { is_active = false } = req.body;

        db("sfa.city")
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

citiesRouter.patch("/province/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { province_id = null, description = "" } = req.body;

        try {
            if (province_id !== null && description.length) {

                const verify = await db("sfa.city")
                    .select(
                        'sfa.city.id',
                        'sfa.city.description',
                        'sfa.city.province_id',
                    )
                    .where({ description });

                const hasSameProvince = verify?.some((city) =>
                    (city.province_id === Number(province_id) && Number(id) !== city.id));

                if (hasSameProvince) return res.status(400).send({
                    wasInserted: false,
                    message: "A record with the same province already exists"
                });

            }
        } catch (error) {
            console.log(error);
            return res.status(400).send({ wasInserted: false, message: "Error", });
        }

        db("sfa.city")
            .update({ province_id })
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

citiesRouter.patch("/description/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
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

            const verifyDescriptionId = await db("sfa.city")
                .select(
                    'sfa.city.description',
                    'sfa.city.province_id',
                )
                .where({ id: id });

            const provinceIdCurrentDescription = verifyDescriptionId?.[0]?.province_id;

            if (provinceIdCurrentDescription === null || provinceIdCurrentDescription >= 0) {
                const verifyAvailable = await db("sfa.city")
                    .select(
                        'sfa.city.id',
                        'sfa.city.description',
                        'sfa.city.province_id',
                    )
                    .where({ description: trimDescription });

                const hasSomeProvince = verifyAvailable?.some((city) => {
                    return (city.province_id === Number(provinceIdCurrentDescription)
                        || city.province_id === null) && Number(id) !== city.id;
                });

                if (hasSomeProvince) return res.status(400).send({
                    wasInserted: false,
                    message: "A record with the same city and province already exists"
                });
            }
        } catch (error) {
            res.status(400).send({ wasInserted: false, message: "Error!" });
        }
        db("sfa.city")
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

citiesRouter.delete("/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        let description = "";
        try {

            const verifyRecord: any = await db("sfa.city")
                .where({ id: id })
                .first();

            if (!verifyRecord) {
                return res.status(404).send({ wasDelete: false, message: "The record does not exits" });
            }

            description = verifyRecord?.description;

            const deleteRecord: any = await db("sfa.city")
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
