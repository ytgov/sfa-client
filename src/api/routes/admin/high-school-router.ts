import express, { Request, Response } from "express";
import { param, body } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG)

export const highSchoolRouter = express.Router();

highSchoolRouter.get("/", async (req: Request, res: Response) => {

    const { filter = true } = req.query;

    try {
        const results = await db("sfa.high_school")
            .leftJoin("sfa.city", { "sfa.high_school.city_id": "sfa.city.id" })
            .leftJoin("sfa.province", { "sfa.high_school.province_id": "sfa.province.id" })
            .leftJoin("sfa.country", { "sfa.high_school.country_id": "sfa.country.id" })
            .select(
                "sfa.high_school.id",
                "sfa.high_school.name",
                "sfa.high_school.is_active",
                "sfa.city.description as city_name",
                "sfa.city.id as city_id",
                "sfa.province.description as province_name",
                "sfa.province.id as province_id",
                "sfa.country.description as country_name",
                "sfa.country.id as country_id",
            )
            .orderBy('sfa.high_school.name');

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

highSchoolRouter.post("/", body('is_active').isBoolean(), body('description').isString(),

    async (req: Request, res: Response) => {
        const {
            is_active,
            name = "",
            citySelected = 0,
            provinceSelected = 0,
            countrySelected = 0,
        } = req.body;

        const trimName = name?.trim();

        try {

            if (!trimName.length) return res.status(400).json({ success: false, message: "Name must be required", });

            const verify = await db("sfa.high_school")
                .select('name', 'city_id', 'province_id', 'country_id')
                .where({ name: trimName });

            const hasSameHighSchool = verify?.some((highSchool) => {
                return highSchool.name.toLowerCase() === trimName.toLowerCase() &&
                    highSchool.city_id === Number(citySelected) &&
                    highSchool.province_id === Number(provinceSelected) &&
                    highSchool.country_id === Number(countrySelected)
            });
            if (hasSameHighSchool) return res.status(400).send({ success: false, message: "Record with the same data already exists", });

            const resInsert = await db("sfa.high_school")
                .insert({
                    name: trimName,
                    is_active,
                    city_id: citySelected,
                    province_id: provinceSelected,
                    country_id: countrySelected,
                })
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

highSchoolRouter.patch("/status/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { is_active = false } = req.body;

        db("sfa.high_school")
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

highSchoolRouter.patch("/location/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { type = "", value = null } = req.body;


        const types: any = {
            city: "city_id",
            province: "province_id",
            country: "country_id",
        };

        try {
            if (!type?.length || value === null) {
                res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
            }

            const verifyNameId = await db("sfa.high_school")
                .select(
                    'sfa.high_school.name',
                    'sfa.high_school.city_id',
                    'sfa.high_school.province_id',
                    'sfa.high_school.country_id'
                )
                .where({ id: id });

            const CurrentName = verifyNameId?.[0]?.name;
            const cityIdCurrentName = type === "city" ? value : verifyNameId?.[0]?.city_id;
            const provinceIdCurrentName = type === "province" ? value : verifyNameId?.[0]?.province_id;
            const countryIdCurrentName = type === "country" ? value : verifyNameId?.[0]?.country_id;

            const verifyAvailable = await db("sfa.high_school")
                .select(
                    'sfa.high_school.id',
                    'sfa.high_school.name',
                    'sfa.high_school.city_id',
                    'sfa.high_school.province_id',
                    'sfa.high_school.country_id'
                )
                .where({ name: CurrentName });

            const hasSameData = verifyAvailable?.some((highSchool) => {
                return highSchool.city_id === Number(cityIdCurrentName) &&
                    highSchool.province_id === Number(provinceIdCurrentName) &&
                    highSchool.country_id === Number(countryIdCurrentName) &&
                    highSchool.name.toLowerCase() === CurrentName.toLowerCase() &&
                    Number(id) !== highSchool.id;
            });

            if (hasSameData) return res.status(400).send({ wasUpdated: false, message: "A record with the same data already exists" });

        } catch (error) {
            res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
        }

        db("sfa.high_school")
            .update(types[type], value)
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
                console.log(e);
                res.status(409).send({ wasUpdated: false, message: "Could Not Updated" });
            });
    }
);

highSchoolRouter.patch("/name/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;
        const { name = "" } = req.body;

        const trimName = name?.trim();

        try {

            if (!trimName.length) return res.status(400).json({ success: false, message: "Name must be required", });


            const verifyNameId = await db("sfa.high_school")
                .select(
                    'sfa.high_school.name',
                    'sfa.high_school.city_id',
                    'sfa.high_school.province_id',
                    'sfa.high_school.country_id'
                )
                .where({ id: id });

            const cityIdCurrentName = verifyNameId?.[0]?.city_id;
            const provinceIdCurrentName = verifyNameId?.[0]?.province_id;
            const countryIdCurrentName = verifyNameId?.[0]?.country_id;


            const verifyAvailable = await db("sfa.high_school")
                .select(
                    'sfa.high_school.id',
                    'sfa.high_school.name',
                    'sfa.high_school.city_id',
                    'sfa.high_school.province_id',
                    'sfa.high_school.country_id'
                )
                .where({ name: trimName });

            const hasSameData = verifyAvailable?.some((highSchool) => {
                return highSchool.city_id === Number(cityIdCurrentName) &&
                    highSchool.province_id === Number(provinceIdCurrentName) &&
                    highSchool.country_id === Number(countryIdCurrentName) &&
                    highSchool.name.toLowerCase() === trimName.toLowerCase() &&
                    Number(id) !== highSchool.id;
            });

            if (hasSameData) return res.status(400).send({ wasInserted: false, message: "A record with the same data already exists" });

        } catch (error) {
            console.log(error);
            return res.status(400).send({ success: false, message: "Error!", });
        }

        db("sfa.high_school")
            .update({ name: trimName })
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

highSchoolRouter.delete("/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    (req: Request, res: Response) => {

        const { id = null } = req.params;

        db("sfa.high_school")
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
