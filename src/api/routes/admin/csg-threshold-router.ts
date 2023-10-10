import express, { Request, Response } from "express";
import knex from "knex";
import { DB_CONFIG } from "../../config";
import { isArray } from "lodash";
import { param } from "express-validator";
import { ReturnValidationErrors } from "@/middleware";
import { cleanNumber } from "@/models";

const db = knex(DB_CONFIG);

const CSGDEP_REQUEST_TYPE_ID = 32;
const CSGD_REQUEST_TYPE_ID = 29;
const CSGTU_REQUEST_TYPE_ID = 28;
const CSGFT_REQUEST_TYPE_ID = 35;
const CSGDSE_REQUEST_TYPE_ID = 30;

export const csgThresholdRouter = express.Router();

csgThresholdRouter.get(
  "/:academic_year_id",
  param("academic_year_id").isInt(),
  ReturnValidationErrors,
  async (req: Request, res: Response) => {
    const { academic_year_id } = req.params;
    let data = await db("sfa.csg_threshold").where({ academic_year_id });
    let rates = await db("sfa.csg_lookup").where({ academic_year_id }).first();
    let childcare = await db("sfa.child_care_ceiling").where({ academic_year_id });
    let allowances = await db("sfa.student_living_allowance").where({ academic_year_id });
    res.json({ data, rates, childcare, allowances });
  }
);

csgThresholdRouter.get(
  "/cslft/:application_id",
  param("application_id").isInt(),
  ReturnValidationErrors,
  async (req: Request, res: Response) => {
    const { application_id } = req.params;

    let funding_request = await db("sfa.funding_request")
      .where({ application_id, request_type_id: 4 })
      .orderBy("id", "desc")
      .first();

    if (funding_request) {
      let assessment = await db("sfa.assessment")
        .where({
          funding_request_id: funding_request.id,
        })
        .orderBy("id", "desc")
        .first();

      let disbursements = await db("sfa.disbursement")
        .where({
          funding_request_id: funding_request.id,
        })
        .orderBy("issue_date")
        .orderBy("id");

      return res.json({ data: { funding_request, assessment, disbursements } });
    }

    res.status(404).send("Funding Request not found");
  }
);

csgThresholdRouter.get(
  "/cslpt/:application_id",
  param("application_id").isInt(),
  ReturnValidationErrors,
  async (req: Request, res: Response) => {
    const { application_id } = req.params;

    let funding_request = await db("sfa.funding_request")
      .where({ application_id, request_type_id: 5 })
      .orderBy("id", "desc")
      .first();

    if (funding_request) {
      let assessment = await db("sfa.assessment")
        .where({
          funding_request_id: funding_request.id,
        })
        .orderBy("id", "desc")
        .first();

      let disbursements = await db("sfa.disbursement")
        .where({
          funding_request_id: funding_request.id,
        })
        .orderBy("issue_date")
        .orderBy("id");

      return res.json({ data: { funding_request, assessment, disbursements } });
    }

    res.status(404).send("Funding Request not found");
  }
);

csgThresholdRouter.get(
  "/csgftdep/:application_id",
  param("application_id").isInt(),
  ReturnValidationErrors,
  async (req: Request, res: Response) => {
    const { application_id } = req.params;

    let funding_request = await db("sfa.funding_request")
      .where({ application_id, request_type_id: CSGDEP_REQUEST_TYPE_ID })
      .orderBy("id", "desc")
      .first();

    if (funding_request) {
      let assessment = await db("sfa.assessment")
        .where({
          funding_request_id: funding_request.id,
        })
        .orderBy("id", "desc")
        .first();

      let disbursements = await db("sfa.disbursement")
        .where({
          funding_request_id: funding_request.id,
        })
        .orderBy("issue_date")
        .orderBy("id");

      return res.json({ data: { funding_request, assessment, disbursements } });
    }

    res.status(404).send();
  }
);

csgThresholdRouter.get(
  "/csgd/:application_id",
  param("application_id").isInt(),
  ReturnValidationErrors,
  async (req: Request, res: Response) => {
    const { application_id } = req.params;

    let funding_request = await db("sfa.funding_request")
      .where({ application_id, request_type_id: CSGD_REQUEST_TYPE_ID })
      .orderBy("id", "desc")
      .first();

    if (funding_request) {
      let assessment = await db("sfa.assessment")
        .where({
          funding_request_id: funding_request.id,
        })
        .orderBy("id", "desc")
        .first();

      let disbursements = await db("sfa.disbursement")
        .where({
          funding_request_id: funding_request.id,
        })
        .orderBy("issue_date")
        .orderBy("id");

      return res.json({ data: { funding_request, assessment, disbursements } });
    }

    res.status(404).send();
  }
);

csgThresholdRouter.get(
  "/csgtu/:application_id",
  param("application_id").isInt(),
  ReturnValidationErrors,
  async (req: Request, res: Response) => {
    const { application_id } = req.params;

    let funding_request = await db("sfa.funding_request")
      .where({ application_id, request_type_id: CSGTU_REQUEST_TYPE_ID })
      .orderBy("id", "desc")
      .first();

    if (funding_request) {
      let assessment = await db("sfa.assessment")
        .where({
          funding_request_id: funding_request.id,
        })
        .orderBy("id", "desc")
        .first();

      let disbursements = await db("sfa.disbursement")
        .where({
          funding_request_id: funding_request.id,
        })
        .orderBy("issue_date")
        .orderBy("id");

      return res.json({ data: { funding_request, assessment, disbursements } });
    }

    res.status(404).send();
  }
);

csgThresholdRouter.get(
  "/csgdse/:application_id",
  param("application_id").isInt(),
  ReturnValidationErrors,
  async (req: Request, res: Response) => {
    const { application_id } = req.params;

    let funding_request = await db("sfa.funding_request")
      .where({ application_id, request_type_id: CSGDSE_REQUEST_TYPE_ID })
      .orderBy("id", "desc")
      .first();

    if (funding_request) {
      let assessment = await db("sfa.assessment")
        .where({
          funding_request_id: funding_request.id,
        })
        .orderBy("id", "desc")
        .first();

      let disbursements = await db("sfa.disbursement")
        .where({
          funding_request_id: funding_request.id,
        })
        .orderBy("issue_date")
        .orderBy("id");

      return res.json({ data: { funding_request, assessment, disbursements } });
    }

    res.status(404).send();
  }
);

csgThresholdRouter.get(
  "/csgft/:application_id",
  param("application_id").isInt(),
  ReturnValidationErrors,
  async (req: Request, res: Response) => {
    const { application_id } = req.params;

    let funding_request = await db("sfa.funding_request")
      .where({ application_id, request_type_id: CSGFT_REQUEST_TYPE_ID })
      .orderBy("id", "desc")
      .first();

    if (funding_request) {
      let assessment = await db("sfa.assessment")
        .where({
          funding_request_id: funding_request.id,
        })
        .orderBy("id", "desc")
        .first();

      let disbursements = await db("sfa.disbursement")
        .where({
          funding_request_id: funding_request.id,
        })
        .orderBy("issue_date")
        .orderBy("id");

      return res.json({ data: { funding_request, assessment, disbursements } });
    }

    res.status(404).send();
  }
);

csgThresholdRouter.post(
  "/csgftdep/:application_id/funding-request/:funding_request_id/assessment",
  param("application_id").isInt(),
  param("funding_request_id").isInt(),
  ReturnValidationErrors,
  async (req: Request, res: Response) => {
    const { application_id, funding_request_id } = req.params;

    let assessment = req.body;
    let disbursements = assessment.disbursements;
    assessment.funding_request_id = funding_request_id;
    delete assessment.disbursements;

    if (assessment.return_uncashable_cert)
      assessment.return_uncashable_cert = cleanNumber(assessment.return_uncashable_cert);

    let assessmentInsert = await db("sfa.assessment").insert(assessment).returning("*");
    if (assessmentInsert.length > 0 && disbursements && isArray(disbursements)) {
      for (let disb of disbursements) {
        disb.assessment_id = assessmentInsert[0].id;
        disb.funding_request_id = funding_request_id;
        delete disb.financial_batch_id; // not editable through the interface
        delete disb.csl_cert_seq_number;

        if (disb.id) {
          let id = disb.id;
          delete disb.id;
          disb.disbursed_amount = cleanNumber(disb.disbursed_amount);
          await db("sfa.disbursement").where({ id }).update(disb);
        } else {
          await db("sfa.disbursement").insert(disb);
        }
      }
    }

    res.status(201).send();
  }
);

csgThresholdRouter.put(
  "/csgftdep/:application_id/funding-request/:funding_request_id/assessment/:assessment_id",
  async (req: Request, res: Response) => {
    const { application_id, funding_request_id, assessment_id } = req.params;
    let assessment = req.body;
    let disbursements = assessment.disbursements;
    delete assessment.id;
    delete assessment.disbursements;

    if (assessment.return_uncashable_cert)
      assessment.return_uncashable_cert = cleanNumber(assessment.return_uncashable_cert);

    await db("sfa.assessment").where({ id: assessment_id }).update(assessment);

    for (let disb of disbursements) {
      disb.assessment_id = assessment_id;
      disb.funding_request_id = funding_request_id;
      disb.disbursed_amount = cleanNumber(disb.disbursed_amount);

      delete disb.financial_batch_id; // not editable through the interface
      delete disb.csl_cert_seq_number;

      if (disb.id) {
        let id = disb.id;
        delete disb.id;

        await db("sfa.disbursement").where({ id }).update(disb);
      } else {
        await db("sfa.disbursement").insert(disb);
      }
    }

    res.status(202).send();
  }
);

csgThresholdRouter.delete(
  "/csgftdep/:application_id/funding-request/:funding_request_id/disbursement/:disbursement_id",
  async (req: Request, res: Response) => {
    const { application_id, funding_request_id, disbursement_id } = req.params;

    await db("sfa.disbursement").where({ id: disbursement_id }).delete();

    res.status(202).send();
  }
);
