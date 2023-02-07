import express, { Request, Response } from "express";
import { param, body } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG)

export const educationLevelRouter = express.Router();

educationLevelRouter.get("/", async (req: Request, res: Response) => {

    const { filter = true } = req.query;

    try {
        const results = await db("sfa.education_level")
            .select(
                'sfa.education_level.id',
                'sfa.education_level.description',
                'sfa.education_level.rank',
                'sfa.education_level.is_active',
            )
            .orderBy('sfa.education_level.rank');

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

educationLevelRouter.post("/", body('is_active').isBoolean(), body('description').isString(),

    async (req: Request, res: Response) => {
        const { is_active, description = "", } = req.body;
        const trimDescription = description?.trim();

        try {

            if (!trimDescription.length) return res.status(400).json({ success: false, message: "Description must be required", });

            const verify = await db("sfa.education_level")
                .select('description')
                .where({ description: trimDescription });

            if (verify?.length) return res.status(400).send({ success: false, message: "Description already exists", });

            const resInsert = await db("sfa.education_level")
                .insert({ description: trimDescription, is_active, rank: 0 })
                .returning("*");

            const getMaxRank = await db("sfa.education_level")
                .max('rank as topRank')
                .first();

            if (resInsert && getMaxRank) {
                const resUpdate = await db("sfa.education_level")
                    .update({ rank: getMaxRank.topRank + 1 })
                    .where({ id: resInsert[0].id })
                    .returning("*");

                return res.status(201).json({ success: true, data: resUpdate, });
            } else {
                return res.status(400).send();
            }

        } catch (err) {
            console.log(err);
            return res.status(400).send(err);
        }
    }
);

educationLevelRouter.patch("/status/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { is_active = false } = req.body;

        db("sfa.education_level")
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

educationLevelRouter.patch("/rank", [body('newRankList').isArray(), body('newIndex').isInt().notEmpty(), body('oldIndex').isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { newRankList = [], newIndex = 0, oldIndex = 0 } = req.body;
        const verifyResults = [];
        try {
            if (newIndex === oldIndex) {
                return res.status(400).send({
                    success: false,
                    message: "The positions are equal",
                });
            }
            if (!newRankList.length) {
                return res.status(400).send({
                    success: false,
                    message: "Rank List is required",
                });
            }

            if (oldIndex < newIndex) {
                newRankList.forEach(async (item: any, index: Number) => {
                    if (oldIndex + 1 === item.rank) {
                        const result = await db("sfa.education_level")
                            .update({ rank: newIndex + 1 })
                            .where({ id: item.id })
                            .returning("*");

                        verifyResults.push(result);

                        return;
                    }

                    const result = await db("sfa.education_level")
                        .update({ rank: item.rank - 1 })
                        .where({ id: item.id })
                        .returning("*");

                    verifyResults.push(result);
                });
            } else {
                newRankList.forEach(async (item: any, index: Number) => {
                    if (oldIndex + 1 === item.rank) {
                        const result = await db("sfa.education_level")
                            .update({ rank: newIndex + 1 })
                            .where({ id: item.id })
                            .returning("*");

                        verifyResults.push(result);

                        return;
                    }

                    const result = await db("sfa.education_level")
                        .update({ rank: item.rank + 1 })
                        .where({ id: item.id })
                        .returning("*");
                    verifyResults.push(result);
                });
            }

            res.status(202).send({ wasUpdated: true, message: "Updated!" });

        } catch (error) {
            console.log(error);
            res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
        }

    }
);

educationLevelRouter.patch("/description/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { description = "" } = req.body;

        const trimDescription = description?.trim();

        try {

            if (!trimDescription.length) return res.status(400).json({ success: false, message: "Description must be required", });

            const verify = await db("sfa.education_level")
                .select('id', 'description')
                .where({ description: trimDescription });

            if (verify?.[0]?.description.toLowerCase() === trimDescription.toLowerCase() &&
                verify?.[0]?.id !== Number(id))
                return res.status(400).send({ success: false, message: "Description already exists", });

        } catch (error) {
            console.log(error);
            return res.status(400).send({ success: false, message: "Error!", });
        }

        db("sfa.education_level")
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

educationLevelRouter.delete("/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    (req: Request, res: Response) => {

        const { id = null } = req.params;

        db("sfa.education_level")
            .where({ id: id })
            .del()
            .then((resp: any) => {
                res.status(202).send({ wasDelete: true });
            })
            .catch(function (e: any) {
                console.log({ ...e });
                res.status(409).send({ wasDelete: false, message: "Could Not Delete" });
            });
    }
);
