import express, { Request, Response } from "express";
import { param, body } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG)

export const aboriginalStatusRouter = express.Router();

aboriginalStatusRouter.get("/", async (req: Request, res: Response) => {

    const { filter = true } = req.query;

    try {
        const results = await db("sfa.aboriginal_status")
            .select(
                'sfa.aboriginal_status.id',
                'sfa.aboriginal_status.description',
                'sfa.aboriginal_status.nars_status_id',
                'sfa.aboriginal_status.sort_order',
                'sfa.aboriginal_status.is_active',
            )
            .orderBy('sfa.aboriginal_status.sort_order');

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

aboriginalStatusRouter.post("/", body('is_active').isBoolean(),
    body('description').isString(), body('nars_status_id').isInt().notEmpty(),

    async (req: Request, res: Response) => {
        const { is_active, description = "", nars_status_id = null } = req.body;
        const trimDescription = description?.trim();
        console.log(is_active, description, nars_status_id);

        try {

            if (!trimDescription.length) return res.status(400).json({ success: false, message: "Description must be required", });

            const verify = await db("sfa.aboriginal_status")
                .select('description')
                .where({ description: trimDescription });

            if (verify?.length) return res.status(400).send({ success: false, message: `"${trimDescription}" already exists`, });

            await db.transaction(async (trx) => {
                const [resInsert, getMaxRank] = await Promise.all(
                    [
                        trx('sfa.aboriginal_status')
                            .insert({ description: trimDescription, is_active, nars_status_id, sort_order: 0 })
                            .returning("*"),
                        trx('sfa.aboriginal_status')
                            .max('sort_order as topSortOrder')
                            .first(),
                    ]
                )

                if (resInsert && getMaxRank) {
                    const resUpdate = await trx("sfa.aboriginal_status")
                        .update({ sort_order: getMaxRank.topSortOrder + 1 })
                        .where({ id: resInsert[0].id })
                        .returning("*");

                    return res.status(201).json({ success: true, data: resUpdate, });
                } else {
                    return res.status(400).send();
                }
            });

        } catch (err) {
            console.log(err);
            return res.status(400).send(err);
        }
    }
);

aboriginalStatusRouter.patch("/status/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { is_active = false } = req.body;

        db("sfa.aboriginal_status")
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
    }
);

aboriginalStatusRouter.patch("/sort-order", [body('list').isArray(), body('newIndex').isInt().notEmpty(), body('oldIndex').isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { list = [], newIndex = 0, oldIndex = 0 } = req.body;
        const verifyResults: any = [];
        try {
            if (newIndex === oldIndex) {
                return res.status(400).send({
                    success: false,
                    message: "The positions are equal",
                });
            }
            if (!list.length) {
                return res.status(400).send({
                    success: false,
                    message: "Sort Order List is required",
                });
            }
            if (oldIndex < newIndex) {

                for (let index = 0; index < list.length; index++) {
                    const item = list[index];

                    if (oldIndex + 1 === item.sort_order) {
                        const result = await db("sfa.aboriginal_status")
                            .update({ sort_order: newIndex + 1 })
                            .where({ id: item.id })
                            .returning("*");

                        verifyResults.push({ ...result });

                        continue;
                    }

                    const result = await db("sfa.aboriginal_status")
                        .update({ sort_order: item.sort_order - 1 })
                        .where({ id: item.id })
                        .returning("*");

                    verifyResults.push({ ...result });
                }
            } else {
                for (let index = 0; index < list.length; index++) {
                    const item = list[index];
                    if (oldIndex + 1 === item.sort_order) {
                        const result = await db("sfa.aboriginal_status")
                            .update({ sort_order: newIndex + 1 })
                            .where({ id: item.id })
                            .returning("*");

                        verifyResults.push({ ...result });

                        continue;
                    }

                    const result = await db("sfa.aboriginal_status")
                        .update({ sort_order: item.sort_order + 1 })
                        .where({ id: item.id })
                        .returning("*");
                    verifyResults.push({ ...result });
                }
            }

            verifyResults?.length === list?.length ?
                res.status(202).send({ wasUpdated: true, message: "Updated!" })
                :
                res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });

        } catch (error) {
            console.log(error);
            res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
        }

    }
);

aboriginalStatusRouter.patch("/description/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { description = "" } = req.body;

        const trimDescription = description?.trim();

        try {

            if (!trimDescription.length) return res.status(400).json({ success: false, message: "Description must be required", });

            const verify = await db("sfa.aboriginal_status")
                .select('id', 'description')
                .where({ description: trimDescription });

            if (verify?.[0]?.description.toLowerCase() === trimDescription.toLowerCase() &&
                verify?.[0]?.id !== Number(id))
                return res.status(400).send({ success: false, message: `"${trimDescription}" already exists`, });

        } catch (error) {
            console.log(error);
            return res.status(400).send({ success: false, message: "Error!", });
        }

        db("sfa.aboriginal_status")
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
    }
);

aboriginalStatusRouter.patch("/nars/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { nars = null } = req.body;

        db("sfa.aboriginal_status")
            .update({ nars_status_id: nars === "" ? null : nars })
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
    }
);

aboriginalStatusRouter.delete("/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        let description = "";

        try {
            const verifyRecord: any = await db("sfa.aboriginal_status")
                .where({ id: id })
                .first();

            if (!verifyRecord) {
                return res.status(404).send({ wasDelete: false, message: "The record does not exits" });
            }

            description = verifyRecord?.description;

            await db.transaction(async (trx) => {
                const [resDelete] = await Promise.all(
                    [
                        trx('sfa.aboriginal_status')
                            .where({ id: id })
                            .del(),
                    ]
                )

                if (resDelete) {
                    const resList = await trx("sfa.aboriginal_status")
                        .orderBy('sfa.aboriginal_status.sort_order');
                    const verifyResults = [];
                    for (let index = 0; index < resList.length; index++) {
                        const item = resList[index];

                        const result = await db("sfa.aboriginal_status")
                            .update({ sort_order: index + 1 })
                            .where({ id: item.id })
                            .returning("*");

                        verifyResults.push({ ...result });
                    }
                    return verifyResults.length === resList.length ?
                        res.status(202).send({ wasDelete: true })
                        :
                        res.status(400).send();
                } else {
                    return res.status(400).send();
                }
            });

        } catch (error: any) {
            console.log(error);

            if (error?.number === 547) {
                return res.status(409).send({ wasDelete: false, message: `"${description}" cannot be deleted because it is in use.` });
            }

            return res.status(409).send({ wasDelete: false, message: "Error to Delete" });
        }
    }
);
