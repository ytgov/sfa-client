import express, { Request, Response } from "express";
import { param, body } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG)

export const disbursementRouter = express.Router();

disbursementRouter.get("/funding-request/:funding_request_id",
    [param("funding_request_id").isInt().notEmpty()],
    ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { funding_request_id } = req.params;

        try {
            const results = await db("sfa.disbursement")
                .where({ funding_request_id });

            if (results) {
                return res.status(200).json({ success: true, data: [...results], });
            } else {
                return res.status(404).send();
            }

        } catch (error: any) {
            console.log(error);
            return res.status(404).send();
        }
    });

disbursementRouter.post("/",
    async (req: Request, res: Response) => {
        const { data, isList = "" } = req.body;

        try {
            if (!Array.isArray(data) && !data?.funding_request_id) return res.json({ success: false, message: "funding request id is required", });

            if (!Array.isArray(data)) {
                const verify = await db("sfa.funding_request")
                .where({ id: data.funding_request_id });

                if (!verify?.length) return res.json({ success: false, message: `Funding Request not founded`, });
            }

            if (Array.isArray(data) && isList === "disburseList") {
                for (const item of data) {
                    const resInsert = await db("sfa.disbursement")
                        .insert({
                            disbursement_type_id: item.disbursement_type_id,
                            assessment_id: item.assessment_id,
                            funding_request_id: item.funding_request_id,
                            disbursed_amount: item.disbursed_amount,
                            due_date: item.due_date,
                            tax_year: item.tax_year,
                            issue_date: item.issue_date,
                            paid_amount: item.paid_amount,
                            change_reason_id: item.change_reason_id,
                            financial_batch_id: item.financial_batch_id,
                            financial_batch_id_year: item.financial_batch_id_year,
                            financial_batch_run_date: item.financial_batch_run_date,
                            financial_batch_serial_no: item.financial_batch_serial_no,
                            transaction_number: item.transaction_number,
                            csl_cert_seq_number: item.csl_cert_seq_number,
                            ecert_sent_date: item.ecert_sent_date,
                            ecert_response_date: item.ecert_response_date,
                            ecert_status: item.ecert_status,
                            ecert_portal_status_id: item.ecert_portal_status_id
                        
                        })
                        .returning("*");
                }
                return res.status(201).json({ success: true });
            } else if (!Array.isArray(data)) {
                const resInsert = await db("sfa.disbursement")
                .insert({ ...data })
                .returning("*");

                if (resInsert) {
                    return res.status(201).json({ success: true, data: resInsert, });
                } else {
                    return res.status(400).send();
                }
            } else {
                return res.status(201).json({ success: false, message: `the data type (Data) is wrong`, });
            }

        } catch (err) {
            console.log(err);
            return res.status(400).send(err);
        }
    }
);

disbursementRouter.patch("/:id", [ param("id").isInt().notEmpty(), ], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const { data } = req.body;
        const { id } = req.params;

        try {
            if (!data.funding_request_id) return res.json({ success: false, message: "funding request id is required", });

            const verify = await db("sfa.funding_request")
                .where({ id: data.funding_request_id });

            if (!verify.length) return res.json({ success: false, message: `Funding Request not founded`, });
            delete data.id;
            const resUpdate = await db("sfa.disbursement")
                .where({ id, funding_request_id: data.funding_request_id })
                .update({ ...data });

                
            const updateStatusFundingRequest = await db("sfa.funding_request")
                .where({ id: data.funding_request_id })
                .update({ status_id: 7 });

            return resUpdate ?
                res.json({ success: true, data: [], })
                :
                res.json({ success: false, message: `Some failed`, });

        } catch (err) {
            console.log(err);
            return res.status(400).send(err);
        }
    }
);

disbursementRouter.delete("/:id", [ param("id").isInt().notEmpty(), ], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const verify = await db("sfa.disbursement")
                .where({ id });

            if (!verify.length) return res.json({ success: false, message: `Disbursement not founded`, });

            const resDelete = await db("sfa.disbursement")
                .where({ id })
                .del();

            return resDelete ?
                res.json({ success: true, message: `Deleted!`, })
                :
                res.json({ success: false, message: `Some failed`, });

        } catch (err) {
            console.log(err);
            return res.status(400).send(err);
        }
    }
);