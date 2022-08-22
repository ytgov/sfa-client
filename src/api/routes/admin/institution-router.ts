import express, { Request, Response } from "express";
import moment from "moment";
import _ from "lodash";
import { body, param } from "express-validator";
import { DB_CONFIG } from "../../config";
import knex from "knex";

let { ReturnValidationErrors } = require("../../middleware");
import { InstitutionRules } from "./rules/institution-rules";

export const institutionRouter = express.Router();
const db = knex(DB_CONFIG);

const rulesEngine = new InstitutionRules(DB_CONFIG);

institutionRouter.get("/", async (req: Request, res: Response) => {
    let { nameQ, codeQ } = req.query;
    let name = nameQ as string;
    let code = codeQ as string;
    let list = await db("sfa.institution").orderBy("name");

    if (name) {
        list = list.filter((l: any) => l.name.toLowerCase() == name.toLowerCase());
    }
    if (code) {
        list = list.filter((l: any) => (l.federal_institution_code || "").toLowerCase() == code.toLowerCase());
    }

    let levels = await db("sfa.institution_level");
    let campuses = await db("sfa.institution_campus");

    for (let item of list) {
        item.level = levels.filter((l: any) => l.id == item.institution_level_id)[0];
        item.campuses = campuses.filter((c: any) => c.institution_id == item.id);
        item.is_active_text = item.is_active ? "Active" : "Inactive";

        let coded = item.campuses.filter((c: any) => c.federal_institution_code && c.federal_institution_code.length > 0);

        let campusCodes = _.uniq(coded.map((i: any) => i.federal_institution_code)) as string[];

        campusCodes = campusCodes.filter(c => item.federal_institution_code != c);
        campusCodes = campusCodes.sort((a, b) => (a).localeCompare(b));

        if (campusCodes.length > 0) {
            if (item.federal_institution_code)
                item.federal_institution_code += ` (${campusCodes.join(", ")})`;

            else item.federal_institution_code = `(${campusCodes.join(", ")})`;
        }
    }

    res.json({ data: list });
});

institutionRouter.post("/",
    [body("name").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { name, institution_level_id, federal_institution_code } = req.body;
        let item = { name, institution_level_id, federal_institution_code, is_active: false, created_by: req.user.email };

        let error = await rulesEngine.applyApplicableRules(req.body);

        if (error) {
            console.log(error);
            return res.json({ messages: [{ variant: "error", text: error }] });
        }

        db("sfa.institution").insert(item).returning("*")
            .then((result: any) => {
                res.json({ data: result[0], messages: [{ variant: "success", text: "Institution created" }] });
            })
            .catch((err: any) => {
                console.log("FAILED", err);
                res.json({ messages: [{ variant: "error", text: "Save failed" }] });
            });
    });

institutionRouter.get("/:id",
    [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { id } = req.params;
        let item = await db("sfa.institution").where({ id }).first();

        item.level = await db("sfa.institution_level").where({ id: item.institution_level_id }).first();
        item.campuses = await db("sfa.institution_campus").where({ institution_id: id }).orderBy("is_active", "desc").orderBy("is_primary", "desc").orderBy("name");
        item.has_connections = false;
        item.total_connections = 0;

        for (let campus of item.campuses) {
            campus.address_city = await db("sfa.city").where({ id: campus.address_city_id }).first();
            campus.address_province = await db("sfa.province").where({ id: campus.address_province_id }).first();
            campus.address_country = await db("sfa.country").where({ id: campus.address_country_id }).first();

            campus.notes = await db("sfa.institution_campus_notes").where({ institution_campus_id: campus.id }).orderBy("create_date", "desc");
            campus.dates = await db("sfa.institution_campus_dates").where({ institution_campus_id: campus.id }).orderBy("id", "asc");

            for (let note of campus.notes) {
                note.create_date = moment(note.create_date).format("yyyy/MM/DD @ h:mm A");
                note.create_user = await db("sfa.user").where({ id: note.create_user_id }).first();
            }

            for (let dt of campus.dates) {
                dt.class_start_date = moment(dt.class_start_date).utc(false).format("yyyy-MM-DD");
                dt.class_end_date = moment(dt.class_end_date).utc(false).format("yyyy-MM-DD");
            }

            let apps = await db("sfa.application").where({ institution_campus_id: campus.id }).count("* as counter");
            campus.total_connections = apps[0].counter;
            item.total_connections += apps[0].counter;

            if (apps[0].counter > 0)
                item.has_connections = true;

        }

        res.json({ data: item });
    });

institutionRouter.get("/:id/stats",
    [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { id } = req.params;
        let item = await db("sfa.institution").where({ id }).first();

        if (item) {
            let children = await db("sfa.institution_campus").where({ institution_id: id }).select("id");
            let lists = children.map((c: any) => parseInt(c.id));
            let counts = await db.select("academic_year_id", db.raw("count(*) as counter"))
                .from("sfa.application")
                .whereIn("institution_campus_id", lists)
                .groupByRaw("academic_year_id")
                .orderBy("academic_year_id", "desc");

            let current = moment().year();
            let limit = 10;
            let results = [];

            while (limit > 0) {
                let item = counts.filter((g: any) => g.academic_year_id == current);

                if (item.length == 1)
                    results.unshift({ academic_year_id: current, application_count: item[0].counter });
                else
                    results.unshift({ academic_year_id: current, application_count: 0 });

                current--;
                limit--;
            }

            return res.json({ data: results });
        }

        res.status(404).send();
    });

institutionRouter.post("/:id/merge-campuses",
    //[param("id").isInt().notEmpty(), body("sourceId").notEmpty(), body("destId").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { id } = req.params;
        let { sourceId, destId } = req.body;

        let item = await db("sfa.institution").where({ id }).first();

        if (item) {
            let source = await db("sfa.institution_campus").where({ id: sourceId }).first();
            let dest = await db("sfa.institution_campus").where({ id: destId }).first();

            if (source && dest) {
                await db("sfa.verification_log").where({ institution_campus_id: sourceId }).update({ institution_campus_id: destId });
                await db("sfa.education").where({ institution_campus_id: sourceId }).update({ institution_campus_id: destId });

                await db("sfa.application").where({ institution_campus_id: sourceId }).update({ institution_campus_id: destId });
                await db("sfa.institution_request_type").where({ institution_campus_id: sourceId }).delete();

                if (source.federal_institution_code != dest.federal_institution_code) {
                    /* await db("sfa.csl_nars_history").where({ institution_code: source.federal_institution_code }).update({ institution_code: dest.federal_institution_code });
                    await db("sfa.csl_nars_history_2010jul29").where({ institution_code: source.federal_institution_code }).update({ institution_code: dest.federal_institution_code });
                    await db("sfa.csl_nars_history_2010may").where({ institution_code: source.federal_institution_code }).update({ institution_code: dest.federal_institution_code });
                    await db("sfa.csl_nars_history_2011jan27").where({ institution_code: source.federal_institution_code }).update({ institution_code: dest.federal_institution_code }); */
                }

                await db("sfa.institution_campus").where({ id: sourceId }).delete();

                return res.json({ messages: [{ variant: "success", text: "Campuses merged" }] });
            }
        }

        res.status(404).send();
    });

institutionRouter.put("/:id",
    [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { id } = req.params;
        let error = await rulesEngine.applyApplicableRules(req.body, parseInt(id));

        if (error) {
            console.log(error);
            return res.json({ messages: [{ variant: "error", text: error }] });
        }

        db("sfa.institution").where({ id }).update(req.body)
            .then((result: any) => {
                res.json({ messages: [{ variant: "success", text: "Institution saved" }] });
            })
            .catch((err: any) => {
                console.log("FAILED", err);
                res.json({ messages: [{ variant: "error", text: "Save failed" }] });
            });
    });

institutionRouter.post("/:id/campus",
    [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { id } = req.params;
        let item = await db("sfa.institution").where({ id }).first();

        if (item) {
            let campus = {
                institution_id: id,
                name: "New campus"
            };

            let campusResult = await db("sfa.institution_campus").insert(campus).returning("*");
            res.json({ data: campusResult[0], messages: [{ variant: "success", text: "Campus created" }] });
        }

        res.status(404).send();
    });

institutionRouter.put("/:id/campus/:campusId",
    [param("id").isInt().notEmpty(), param("campusId").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { id, campusId } = req.params;

        let message = "Campus saved";

        if (req.body.is_primary) {
            if (req.body.is_primary == "true") {
                await db("sfa.institution_campus").where({ institution_id: id }).update({ is_primary: false });
                req.body.is_active = true;
                message += " and new primary set";
            }
            else {
                return res.json({ messages: [{ variant: "error", text: "You have to make another campus primary" }] });
            }
        }

        let error = await rulesEngine.applyApplicableCampusRules(req.body, parseInt(id), parseInt(campusId));

        if (error) {
            console.log(error);
            return res.json({ messages: [{ variant: "error", text: error }] });
        }

        db("sfa.institution_campus").where({ id: campusId, institution_id: id }).update(req.body)
            .then((result: any) => {
                res.json({ messages: [{ variant: "success", text: message }] });
            })
            .catch((err: any) => {
                console.log("FAILED", err);
                res.json({ messages: [{ variant: "error", text: "Save failed" }] });
            });
    });

institutionRouter.post("/:id/campus/:campusId/note",
    [param("id").isInt().notEmpty(), param("campusId").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { id, campusId } = req.params;
        let { note } = req.body;

        let newNote = {
            note, create_user_id: req.user.id, institution_campus_id: campusId
        };

        await db("sfa.institution_campus_notes").insert(newNote);

        res.json({ messages: [{ variant: "success", text: "Note added" }] });
    });

institutionRouter.put("/:id/campus/:campusId/note/:noteId",
    [param("id").isInt().notEmpty(), param("campusId").isInt().notEmpty(), param("noteId").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { id, campusId, noteId } = req.params;
        let { note } = req.body;

        await db("sfa.institution_campus_notes").where({ id: noteId }).update({ note });

        res.json({ messages: [{ variant: "success", text: "Note saved" }] });
    });

institutionRouter.delete("/:id/campus/:campusId/note/:noteId",
    [param("id").isInt().notEmpty(), param("campusId").isInt().notEmpty(), param("noteId").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { noteId } = req.params;

        await db("sfa.institution_campus_notes").where({ id: noteId }).delete();
        res.json({ messages: [{ variant: "success", text: "Note removed" }] });
    });

institutionRouter.post("/:id/campus/:campusId/dates",
    [param("id").isInt().notEmpty(), param("campusId").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { id, campusId } = req.params;
        let { class_start_date, class_end_date, academic_year_id } = req.body;

        let newDate = {
            class_start_date, class_end_date, academic_year_id, institution_campus_id: campusId
        };

        await db("sfa.institution_campus_dates").insert(newDate);

        res.json({ messages: [{ variant: "success", text: "Dates added" }] });
    });

institutionRouter.put("/:id/campus/:campusId/dates/:dateId",
    [param("id").isInt().notEmpty(), param("campusId").isInt().notEmpty(), param("dateId").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { id, campusId, dateId } = req.params;
        let { class_start_date, class_end_date, academic_year_id } = req.body;

        await db("sfa.institution_campus_dates").where({ id: dateId }).update({
            class_start_date, class_end_date, academic_year_id
        });

        res.json({ messages: [{ variant: "success", text: "Dates saved" }] });
    });

institutionRouter.delete("/:id/campus/:campusId/dates/:dateId",
    [param("id").isInt().notEmpty(), param("campusId").isInt().notEmpty(), param("dateId").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { dateId } = req.params;

        await db("sfa.institution_campus_dates").where({ id: dateId }).delete();
        res.json({ messages: [{ variant: "success", text: "Dates removed" }] });
    });

institutionRouter.delete("/:id",
    [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { id } = req.params;
        let item = await db("sfa.institution").where({ id }).first();
        let campuses = await db("sfa.institution_campus").where({ institution_id: id });
        let campusIds = campuses.map(c => c.id);
        let connections = await db("sfa.application").whereIn("institution_campus_id", campusIds).count("* as count").first();

        if ((connections as any).count > 0) {
            return res.json({ messages: [{ text: "This institutions has applications connected", variant: "error" }] });
        }

        // remove campus, notes, dates

        for (let campus of campuses) {
            let campusId = campus.id;
            await db("sfa.institution_campus_dates").where({ institution_campus_id: campusId }).delete();
            await db("sfa.institution_campus_notes").where({ institution_campus_id: campusId }).delete();
            await db("sfa.institution_campus").where({ id: campusId }).delete();
        }

        await db("sfa.institution").where({ id }).delete();

        res.json({ messages: [{ text: "Institution removed", variant: "success" }] });
    });
