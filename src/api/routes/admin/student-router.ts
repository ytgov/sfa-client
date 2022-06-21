import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import moment from "moment";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

let { RequireServerAuth, RequireAdmin } = require("../auth")

const db = knex(DB_CONFIG)

export const studentRouter = express.Router();


studentRouter.post("/",
    [body("first_name").notEmpty(), body("last_name").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        console.log(req.body)
        let { first_name, last_name, initials, locator_number, sin } = req.body;

        let student = {
            first_name, last_name, initials, locator_number, sin
        };

        let result = await insertStudent(student);

        res.json({ data: result })
    });

studentRouter.put("/:student_id",
    [param("student_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { student_id } = req.params;

        console.log("STUDENT SAVE:", req.body);

        db("sfaadmin.student").where({ student_id }).update(req.body)
            .then((result: any) => {
                res.json({ messages: [{ variant: "success", text: "Student saved" }] })
            })
            .catch((err: any) => {
                console.log("FAILED", err)
                res.json({ messages: [{ variant: "error", text: "Save failed" }] })
            });
    });

studentRouter.post("/search",
    async (req: Request, res: Response) => {
        let { terms } = req.body;
        terms = terms.toLowerCase().trim()

        if (terms.length == 0)
            res.json({ data: [], messages: [{ variant: "error", text: "You must include search terms" }] });

        let termParts = terms.split(/[,-\s]/);
        termParts = termParts.filter((t: string) => t.trim().length > 0);

        let kq = db('sfa.student').join("sfa.person", "student.person_id", "person.id");
        kq.select("student.id as student_id", "person.id as person_id", "*")

        for (let part of termParts) {
            kq.whereRaw(`(LTRIM(STR(sin,20,0)) like ? OR lower(first_name) like ? OR lower(locator_number) like ?
        OR lower(last_name) like ? OR lower(email) like ? OR lower(yukon_id) like ? OR lower(user_name) like ?
        )`, [`${part}%`, `%${part}%`, `${part}%`, `%${part}%`, `${part}%`, `${part}%`, `${part}%`])
        }

        let results = await kq.orderBy("first_name").orderBy("last_name");

        for (let r of results) {
            delete r.id;
            r.id = r.student_id;

            let history = await db("sfa.application").where({ student_id: r.student_id }).count("* as counter").first();
            r.application_count = history?.counter;

            r.name = `${r.first_name} ${r.initials || ""} ${r.last_name}`.replace("  ", " ");

            if (r.birth_date)
                r.birth_date = moment(r.birth_date).utc(false).format("YYYY-MM-DD")
        };

        res.json({ data: results, meta: { item_count: results.length, page: 1, page_count: 1, page_size: results.length } })
    });

studentRouter.get("/:id",
    [param("id").notEmpty()], ReturnValidationErrors, async (req: Request, res: Response) => {
        let { id } = req.params;

        let student = await db("sfa.student").where({ id }).first();

        if (student) {
            let person = await db("sfa.person").where({ id: student.person_id }).first();
            student = { ...person, ...student, };

            student.applications = await db("sfa.application")
                .innerJoin("sfa.institution_campus", "application.institution_campus_id", "institution_campus.id")
                .innerJoin("sfa.institution", "institution.id", "institution_campus.institution_id")
                .select("application.*").select("institution.name as institution_name")
                .where({ student_id: id }).orderBy("academic_year_id", "desc");

            for (let item of student.applications) {
                item.title = `${item.academic_year_id}: ${item.institution_name}`;
            }

            if (student.birth_date) {
                student.birth_date = moment(student.birth_date).utc(false).format("YYYY-MM-DD");
            }

            student.consents = await db("sfa.student_consent").where({ student_id: id }).orderBy("start_academic_year_Id");
            student.residences = await db("sfa.residence").where({ student_id: id }).orderBy("from_year").orderBy("from_month");
            student.dependents = await db("sfa.dependent").where({ student_id: id }).orderBy("birth_date");

            return res.json({ data: student });
        }

        res.status(404).send();
    });

studentRouter.post("/:student_id/consent",
    async (req: Request, res: Response) => {
        let { student_id } = req.params;
        let { ACADEMIC_YEAR_START, ACADEMIC_YEAR_END, CONSENT_PERSON, CONSENT_SFA_FLG, CONSENT_CSL_FLG } = req.body;

        let consent = {
            student_id, ACADEMIC_YEAR_START, ACADEMIC_YEAR_END, CONSENT_PERSON, CONSENT_SFA_FLG, CONSENT_CSL_FLG,
            rec_create_date: new Date(), rec_create_user: cleanUser(req.user.email)
        };

        let returning = await knex('sfaadmin.student_consent').insert(consent).returning("*");
        return returning[0];

        let data = await db("sfaadmin.student_consent").where({ student_id }).orderBy("academic_year_start");

        res.json({ data, messages: [{ variant: "success", text: "Conent saved" }] });
    });

studentRouter.put("/:student_id/consent/:student_consent_id",
    [param("student_id").isInt().notEmpty(), param("student_consent_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { student_id, student_consent_id } = req.params;
        let { ACADEMIC_YEAR_START, ACADEMIC_YEAR_END, CONSENT_PERSON, CONSENT_SFA_FLG, CONSENT_CSL_FLG } = req.body;

        let existing = await db("sfaadmin.student_consent").where({ student_id, student_consent_id }).first();

        if (existing) {
            delete existing.STUDENT_ID;
            delete existing.STUDENT_CONSENT_ID;

            if (ACADEMIC_YEAR_END == "")
                ACADEMIC_YEAR_END = null;

            existing.ACADEMIC_YEAR_START = ACADEMIC_YEAR_START;
            existing.ACADEMIC_YEAR_END = ACADEMIC_YEAR_END;
            existing.CONSENT_PERSON = CONSENT_PERSON;
            existing.CONSENT_SFA_FLG = CONSENT_SFA_FLG;
            existing.CONSENT_CSL_FLG = CONSENT_CSL_FLG;
            existing.REC_LAST_MOD_DATE = new Date();
            existing.REC_LAST_MOD_USER = cleanUser(req.user.email);

            await db("sfaadmin.student_consent").where({ student_id, student_consent_id }).update(existing);
        }

        let data = await db("sfaadmin.student_consent").where({ student_id }).orderBy("academic_year_start");

        res.json({ data, messages: [{ variant: "success", text: "Consent saved" }] })
    });

studentRouter.delete("/:student_id/consent/:student_consent_id",
    [param("student_id").isInt().notEmpty(), param("student_consent_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { student_id, student_consent_id } = req.params;
        let existing = await db("sfaadmin.student_consent").where({ student_id, student_consent_id }).delete();

        res.json({ messages: [{ variant: "success", text: "Consent removed" }] })
    });

studentRouter.get("/:student_id/applications",
    [param("student_id").notEmpty()], ReturnValidationErrors, async (req: Request, res: Response) => {
        let { student_id } = req.params;

        let history_details = await db("sfaadmin.history_detail")
            .innerJoin("sfaadmin.institution", "history_detail.institution_id", "institution.institution_id")
            .innerJoin("sfaadmin.study_area", "history_detail.study_area_id", "study_area.study_area_id")
            .innerJoin("sfaadmin.program", "history_detail.program_id", "program.program_id")
            .select("history_detail.*")
            .select("institution.name as institution_name")
            .select("study_area.description as study_area_name")
            .select("program.description as program_name")
            .where({ student_id }).orderBy("academic_year", "desc");


        for (let h of history_details) {
            let fundingRequests = await db("sfaadmin.funding_request")
                .innerJoin("sfaadmin.request_type", "funding_request.request_type_id", "request_type.request_type_id")
                .where({ "funding_request.history_detail_id": h.HISTORY_DETAIL_ID })
                .select("funding_request.*")
                .select("request_type.short_name");

            h.funding_requests = fundingRequests;
        }

        res.json({ data: history_details })
    });

studentRouter.get("/:studentId/applications/:applicationId",
    async (req: Request, res: Response) => {
        let { studentId, applicationId } = req.params;

        res.json({ data: [{ appliation_id: 1123, institution_name: "HAPPY TOWN" }] })
    });

async function insertStudent(student: any) {
    let max = (await db("SFAADMIN.STUDENT").max("student_id as smax").first())?.smax;
    let limit = 5;

    while (limit > 0) {
        let next = max //+ 1;
        try {
            student.student_id = next;
            let returning = await knex('SFAADMIN.STUDENT').insert(student).returning("*");
            return returning[0];
        }
        catch (err) {
            max++;
            limit--;
        }
    }
}

function cleanUser(email: string) {
    return email.substring(0, Math.min(10, email.indexOf("@")));
} 