import express, { Request, Response } from "express";
import { param, body } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG)

export const fundingGroupRouter = express.Router();

fundingGroupRouter.get("/", async (req: Request, res: Response) => {

    const { filter = true } = req.query;

    try {
        const results = await db("sfa.funding_group")
            .select(
                'sfa.funding_group.id',
                'sfa.funding_group.description',
                'sfa.funding_group.sort_order',
                'sfa.funding_group.is_active',
            )
            .orderBy('sfa.funding_group.sort_order');

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

fundingGroupRouter.post("/", body('is_active').isBoolean(), body('description').isString(),

    async (req: Request, res: Response) => {
        const { is_active, description = "", } = req.body;
        const trimDescription = description?.trim();

        try {

            if (!trimDescription.length) return res.status(400).json({ success: false, message: "Description must be required", });

            const verify = await db("sfa.funding_group")
                .select('description')
                .where({ description: trimDescription });

            if (verify?.length) return res.status(400).send({ success: false, message: `"${trimDescription}" already exists`, });

            await db.transaction(async (trx) => {
                const [resInsert, getMaxRank] = await Promise.all(
                    [
                        trx('sfa.funding_group')
                            .insert({ description: trimDescription, is_active, sort_order: 0 })
                            .returning("*"),
                        trx('sfa.funding_group')
                            .max('sort_order as topSortOrder')
                            .first(),
                    ]
                )

                if (resInsert && getMaxRank) {
                    const resUpdate = await trx("sfa.funding_group")
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

fundingGroupRouter.patch("/status/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { is_active = false } = req.body;

        db("sfa.funding_group")
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

fundingGroupRouter.patch("/sort-order", [body('newSortOrderList').isArray(), body('newIndex').isInt().notEmpty(), body('oldIndex').isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { newSortOrderList = [], newIndex = 0, oldIndex = 0 } = req.body;
        const verifyResults: any = [];
        try {
            if (newIndex === oldIndex) {
                return res.status(400).send({
                    success: false,
                    message: "The positions are equal",
                });
            }
            if (!newSortOrderList.length) {
                return res.status(400).send({
                    success: false,
                    message: "Sort Order List is required",
                });
            }
            if (oldIndex < newIndex) {

                for (let index = 0; index < newSortOrderList.length; index++) {
                    const item = newSortOrderList[index];

                    if (oldIndex + 1 === item.sort_order) {
                        const result = await db("sfa.funding_group")
                            .update({ sort_order: newIndex + 1 })
                            .where({ id: item.id })
                            .returning("*");

                        verifyResults.push({ ...result });

                        continue;
                    }

                    const result = await db("sfa.funding_group")
                        .update({ sort_order: item.sort_order - 1 })
                        .where({ id: item.id })
                        .returning("*");

                    verifyResults.push({ ...result });
                }
            } else {
                for (let index = 0; index < newSortOrderList.length; index++) {
                    const item = newSortOrderList[index];
                    if (oldIndex + 1 === item.sort_order) {
                        const result = await db("sfa.funding_group")
                            .update({ sort_order: newIndex + 1 })
                            .where({ id: item.id })
                            .returning("*");

                        verifyResults.push({ ...result });

                        continue;
                    }

                    const result = await db("sfa.funding_group")
                        .update({ sort_order: item.sort_order + 1 })
                        .where({ id: item.id })
                        .returning("*");
                    verifyResults.push({ ...result });
                }
            }

            verifyResults?.length === newSortOrderList?.length ?
                res.status(202).send({ wasUpdated: true, message: "Updated!" })
                :
                res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });

        } catch (error) {
            console.log(error);
            res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
        }

    }
);

fundingGroupRouter.patch("/description/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { description = "" } = req.body;

        const trimDescription = description?.trim();

        try {

            if (!trimDescription.length) return res.status(400).json({ success: false, message: "Description must be required", });

            const verify = await db("sfa.funding_group")
                .select('id', 'description')
                .where({ description: trimDescription });

            if (verify?.[0]?.description.toLowerCase() === trimDescription.toLowerCase() &&
                verify?.[0]?.id !== Number(id))
                return res.status(400).send({ success: false, message: `"${trimDescription}" already exists`, });

        } catch (error) {
            console.log(error);
            return res.status(400).send({ success: false, message: "Error!", });
        }

        db("sfa.funding_group")
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

fundingGroupRouter.delete("/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        let description = "";

        try {
            const verifyRecord: any = await db("sfa.funding_group")
                .where({ id: id })
                .first();

            if (!verifyRecord) {
                return res.status(404).send({ wasDelete: false, message: "The record does not exits" });
            }

            description = verifyRecord?.description;
            
            await db.transaction(async (trx) => {
                const [resDelete] = await Promise.all(
                    [
                        trx('sfa.funding_group')
                            .where({ id: id })
                            .del(),
                    ]
                )

                if (resDelete > 0) {
                    const resList = await trx("sfa.funding_group");
                    const verifyResults = [];
                    for (let index = 0; index < resList.length; index++) {
                        const item = resList[index];

                        const result = await db("sfa.funding_group")
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
                    return res.status(404).send({ wasDelete: false, message: `The record does not exits` });
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
