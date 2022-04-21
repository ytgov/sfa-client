import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import moment from "moment";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG)
export const applicationRouter = express.Router();

applicationRouter.post("/",
    [body("studentId").notEmpty(), body("academicYear").notEmpty(), body("institutionId").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { studentId, academicYear, institutionId } = req.body;
        let existing = await db("sfa.application").where({ student_id: studentId, academic_year: academicYear, institution_id: institutionId }).count("* as count").first();


        let newApp = {
            student_id: parseInt(studentId),
            academic_year_id: academicYear,
            institution_id: parseInt(institutionId),
            program_division: 2,
            tuition_estimate: 0,
            prestudy_accom_code: 1,
            study_accom_code: 1,
            csl_classification: 1,
            prestudy_csl_classification: 1,
            outstanding_cslpt_amt: 0,
            prestudy_board_amount: 0,
            studty_board_amount: 0,
            parent1_income: 0,
            parent2_income: 0,
            parent1_tax_paid: 0,
            parent2_tax_paid: 0
        };

        let newRow = await db("sfa.application").insert(newApp).returning("*");

        if (newRow && newRow.length == 1) {
            return res.json({ data: { id: newRow[0].id }, messages: [{ text: "Application created", variant: "success" }] });
        }
        else {
            return res.json({ messages: [{ text: "This record appears to already exist", variant: "error" }] })
        }
    });

applicationRouter.post("/:history_detail_id/duplicate",
    [param("history_detail_id").notEmpty(), body("studentId").notEmpty(), body("academicYear").notEmpty(), body("institutionId").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { studentId, academicYear, institutionId } = req.body;
        let existing = await db("sfaadmin.history_detail").where({ student_id: studentId, academic_year: academicYear, institution_id: institutionId }).count("* as count").first();
        let count = existing?.count;

        if (count == 0) {
            let tries = 5;
            let nextId = (await db("sfaadmin.history_detail").max("history_detail_id as max").first())?.max;

            while (tries > 0) {
                nextId++;
                tries--;

                let newApp = {
                    rowid: db.raw("newid()"),
                    student_id: parseInt(studentId),
                    academic_year: academicYear,
                    institution_id: parseInt(institutionId),
                    history_detail_id: parseInt(nextId),
                    program_division: 2,
                    tuition_estimate: 0,
                    prestudy_accom_code: 1,
                    study_accom_code: 1,
                    csl_classification: 1,
                    prestudy_csl_classification: 1,
                    outstanding_cslpt_amt: 0,
                    prestudy_board_amount: 0,
                    studty_board_amount: 0,
                    parent1_income: 0,
                    parent2_income: 0,
                    parent1_tax_paid: 0,
                    parent2_tax_paid: 0
                };

                try {
                    let newRow = await db("sfaadmin.history_detail").insert(newApp).returning("*");

                    if (newRow && newRow.length == 1) {
                        return res.json({ data: { id: newApp.history_detail_id }, messages: [{ text: "Application created", variant: "success" }] });
                    }
                }
                catch (e) {
                    console.log("ERROR", e)
                    nextId = (await db("sfaadmin.history_detail").max("history_detail_id as max").first())?.max;
                }
            }

            return res.json({ messages: [{ text: "Failed to create application", variant: "error" }] });
        }
        else {
            return res.json({ messages: [{ text: "This record appears to already exist", variant: "error" }] })
        }
    });

applicationRouter.get("/:id",
    [param("id").notEmpty()], ReturnValidationErrors, async (req: Request, res: Response) => {
        let { id } = req.params;

        let application = await db("sfa.application").where({ id }).first();

        if (application) {
            let student = await db("sfa.student").where({ id: application.student_id }).first();
            application.funding_requests = await db("sfa.funding_request").where({ application_id: id }).orderBy("received_date");
            application.parent_dependents = await db("sfa.parent_dependent").where({ application_id: id }).orderBy("birth_date");
            application.requirements = await db("sfa.requirement_met").where({ application_id: id }).orderBy("completed_date");
            application.other_funding = await db("sfa.agency_assistance").where({ application_id: id }).orderBy("id");
            application.yea = await db("sfa.yea").where({ yukon_id: student.yukon_id }).orderBy("school_year");
            application.institution = await db("sfa.institution_campus").where({ id: application.institution_campus_id }).first()

            for (let dep of application.parent_dependents) {
                if (dep.birth_date)
                    dep.birth_date = moment(dep.birth_date).add(7, 'hours').format("YYYY-MM-DD");
            }

            for (let dep of application.requirements) {
                if (dep.completed_date)
                    dep.completed_date = moment(dep.completed_date).add(7, 'hours').format("YYYY-MM-DD");
            }

            for (let dep of application.funding_requests) {
                if (dep.received_date)
                    dep.received_date = moment(dep.received_date).add(7, 'hours').format("YYYY-MM-DD");

                if (dep.status_date)
                    dep.status_date = moment(dep.status_date).add(7, 'hours').format("YYYY-MM-DD");
            }
            if (student) {
                student.consents = await db("sfa.student_consent").where({ student_id: application.student_id }).orderBy("start_academic_year_id");
                student.residences = await db("sfa.residence").where({ student_id: application.student_id }).orderBy("from_year").orderBy("from_month");
                student.dependents = await db("sfa.dependent").where({ student_id: application.student_id }).orderBy("birth_date");

                for (let dep of student.dependents) {
                    let elg = await db("sfa.dependent_eligibility").where({ application_id: id, dependent_id: dep.id }).first();
                    dep.eligibility = elg || {};

                    if (dep.birth_date)
                        dep.birth_date = moment(dep.birth_date).add(7, 'hours').format("YYYY-MM-DD");
                }

                student.applications = await db("sfa.application")
                    .innerJoin("sfa.institution_campus", "application.institution_campus_id", "institution_campus.id")
                    .innerJoin("sfa.institution", "institution_id", "institution_campus.institution_id")
                    .select("application.*").select("institution.name as institution_name")
                    .where({ student_id: student.id }).orderBy("academic_year_id", "desc");

                for (let item of student.applications) {
                    item.title = `${item.academic_year_id}: ${item.institution_name}`;
                }

                if (student.birth_date) {
                    student.birth_date = moment(student.birth_date).utc(false).format("YYYY-MM-DD");
                }

                application.student = student;
                return res.json({ data: application });
            }
        }

        res.status(404).send();
    });

applicationRouter.put("/:id",
    [param("id").notEmpty()], ReturnValidationErrors, async (req: Request, res: Response) => {
        let { id } = req.params;

        console.log("APPLICATION SAVE:", req.body);

        db("sfa.application").where({ id }).update(req.body)
            .then((result: any) => {
                res.json({ messages: [{ variant: "success", text: "Application saved" }] })
            })
            .catch((err: any) => {
                console.log("FAILED", err)
                res.json({ messages: [{ variant: "error", text: "Save failed" }] })
            });
    });
