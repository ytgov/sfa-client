import express, { Request, Response } from "express";
import { param, body } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG)

export const disabilityTypeRouter = express.Router();

disabilityTypeRouter.get("/", async (req: Request, res: Response) => {

    const { filter = true } = req.query;

    try {
        const results = await db("sfa.disability_type")
            .select(
                'sfa.disability_type.id',
                'sfa.disability_type.description',
                'sfa.disability_type.csl_code',
                'sfa.disability_type.is_active',
            )
            .orderBy('sfa.disability_type.description');

        if (results) {

            if (filter !== 'false') {
                return res.status(200).json({ success: true, data: results.filter(c => c.is_active), })
            } else {
                return res.status(200).json({ success: true, data: [...results], });
            }

        } else {
            return res.status(404).send();
        }

    } catch (error: any) {
        console.log(error);
        return res.status(404).send();
    }
});

disabilityTypeRouter.post("/", body('is_active').isBoolean(), body('description').isString(),

    async (req: Request, res: Response) => {
        const { is_active, description = "", csl_code = "" } = req.body;
        const trimDescription = description?.trim();
        const trimCode = csl_code?.trim();
            
            

        try {

            if (!trimDescription.length) return res.status(400).json({ success: false, message: "Description must be required", });

            const verify = await db("sfa.disability_type")
                .select('description')
                .where({ description: trimDescription });

            if (verify?.length) return res.status(400).send({ success: false, message: `"${trimDescription}" already exists`, });

            if (trimCode?.length > 5) return res.status(400).json({ success: false, message: "CSL Code is to long.", });

            const resInsert = await db("sfa.disability_type")
                .insert({ description: trimDescription, is_active, csl_code: trimCode })
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
    });

disabilityTypeRouter.patch("/status/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { is_active = false } = req.body;

        db("sfa.disability_type")
            .update({ is_active })
            .where({ id })
            .returning("*")
            .then((resp: any) => {
                if (resp[0]?.is_active === is_active && resp[0]?.id === Number(id)) {
                    res.status(202).send({ wasUpdated: true, ...resp[0] });
                } else {
                    res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
                }
            })
            .catch(function (e: any) {
                console.log(e);
                res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
            });
    });

disabilityTypeRouter.patch("/description/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { description = "" } = req.body;

        const trimDescription = description?.trim();

        try {

            if (!trimDescription.length) return res.status(400).json({ success: false, message: "Description must be required", });

            const verify = await db("sfa.disability_type")
                .select('id', 'description')
                .where({ description: trimDescription });

            if (verify?.[0]?.description.toLowerCase() === trimDescription.toLowerCase() &&
                verify?.[0]?.id !== Number(id))
                return res.status(400).send({ success: false, message: `"${trimDescription}" already exists`, });

        } catch (error) {
            console.log(error);
            return res.status(400).send({ success: false, message: "Error!", });
        }

        db("sfa.disability_type")
            .update({ description: trimDescription })
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

disabilityTypeRouter.patch("/csl-code/:id", [param("id").isInt().notEmpty(), body('csl_code').isString()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { csl_code = "" } = req.body;

        try {
            const trimCode = csl_code?.trim();

            if (trimCode?.length > 5) return res.status(400).json({ success: false, message: "CSL Code is to long.", });

            const resUpdate = await db("sfa.disability_type")
                .update({ csl_code: trimCode })
                .where({ id })
                .returning("*");

            if (resUpdate[0]?.id === Number(id)) {
                return res.status(202).send({ wasUpdated: true, ...resUpdate[0] });
            } else {
                return res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
            }


        } catch (error) {
            console.log(error);
            return res.status(400).send({ success: false, message: "Error!", });
        }
    });

disabilityTypeRouter.delete("/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        let description = "";
        try {

            const verifyRecord: any = await db("sfa.disability_type")
                .where({ id: id })
                .first();

            if (!verifyRecord) {
                return res.status(404).send({ wasDelete: false, message: "The record does not exits" });
            }

            description = verifyRecord?.description;

            const deleteRecord: any = await db("sfa.disability_type")
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
    });
