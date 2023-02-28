import express, { Request, Response } from "express";
import { param } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG)

export const provinceRouter = express.Router();

provinceRouter.get("/", async (req: Request, res: Response) => {

    const { filter = true } = req.query;

    try {
        const provinces = await db("sfa.province")
            .leftJoin('sfa.country', { 'sfa.province.country_id': 'country.id' })
            .select(
                'sfa.province.id',
                'sfa.province.description',
                'sfa.province.country_id',
                'sfa.country.description as country_name',
                'sfa.province.is_active',
            )
            .orderBy('sfa.province.description');

        if (provinces) {
            if (filter !== 'false') {
                return res.status(200).json({ success: true, data: provinces.filter(c => c.is_active), })
            } else {
                return res.status(200).json({ success: true, data: [...provinces], });
            }

        } else {
            return res.status(404).send();
        }
    } catch (error) {
        return res.status(404).send();
    }
});

provinceRouter.post("/", async (req: Request, res: Response) => {
    const { is_active, country_id = null, description } = req.body;

    try {
        const verify = await db("sfa.province")
            .select(
                'sfa.province.description',
                'sfa.province.country_id',
            )
            .where({ description });

        const hasSameCountry = verify?.some((province) => {
            return province.country_id === Number(country_id) ||
                province.country_id === null;
        });

        if (hasSameCountry) return res.status(400).send({ wasInserted: false, message: "A record with the same country already exists" });

        const resInsertProvince = await db("sfa.province")
            .insert({ description, is_active, country_id })
            .returning("*")

        if (resInsertProvince) {
            return res.status(201).json({ success: true, data: resInsertProvince, });
        } else {
            return res.status(400).send();
        }
    } catch (error) {
        return res.status(400).send();
    }
});

provinceRouter.patch("/status/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { is_active = false } = req.body;

        db("sfa.province")
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
    });

provinceRouter.patch("/description/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { description = "" } = req.body;

        const trimDescription = description?.trim();

        try {
            if (!trimDescription.length) return res.status(400).json({
                success: false,
                message: "Description must be required",
            });

            const verifyDescriptionId = await db("sfa.province")
                .select(
                    'sfa.province.description',
                    'sfa.province.country_id',
                )
                .where({ id: id });

            const countryIdCurrentDescription = verifyDescriptionId?.[0]?.country_id;

            if (countryIdCurrentDescription === null || countryIdCurrentDescription >= 0) {
                const verifyAvailable = await db("sfa.province")
                    .select(
                        'sfa.province.id',
                        'sfa.province.description',
                        'sfa.province.country_id',
                    )
                    .where({ description: trimDescription });

                const hasSameCountry = verifyAvailable?.some((province) => {
                    return (province.country_id === Number(countryIdCurrentDescription)
                        || province.country_id === null) && Number(id) !== province.id;
                });

                if (hasSameCountry) return res.status(400).send({ wasInserted: false, message: "A record with the same province and country already exists" });
            }


        } catch (error) {
            res.status(400).send({ wasInserted: false, message: "Error!" });
        }

        db("sfa.province")
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
    });

provinceRouter.patch("/country/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { country_id = null, description = "" } = req.body;

        try {
            if (country_id !== null && description.length) {

                const verify = await db("sfa.province")
                    .select(
                        'sfa.province.id',
                        'sfa.province.description',
                        'sfa.province.country_id',
                    )
                    .where({ description });

                const hasSameCountry = verify?.some((province) => (province.country_id === Number(country_id)
                    && Number(id) !== province.id));

                if (hasSameCountry) return res.status(400).send({ wasInserted: false, message: "A record with the same country already exists" });

            }
        } catch (error) {
            res.status(400).send({ wasInserted: false, message: "Error!" });
        }

        db("sfa.province")
            .update({ country_id })
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
    });

provinceRouter.delete("/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        let description = "";
        try {

            const verifyRecord: any = await db("sfa.province")
                .where({ id: id })
                .first();

            if (!verifyRecord) {
                return res.status(404).send({ wasDelete: false, message: "The record does not exits" });
            }

            description = verifyRecord?.description;

            const deleteRecord: any = await db("sfa.province")
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
