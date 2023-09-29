import express, { Request, Response } from "express";
import knex from "knex";
import { DB_CONFIG } from "../../config";
import { isArray } from "lodash";
import { param } from "express-validator";
import { ReturnValidationErrors } from "@/middleware";

const db = knex(DB_CONFIG);

const CSGDEP_REQUEST_TYPE_ID = 32;
const CSGD_REQUEST_TYPE_ID = 29;
const CSGTU_REQUEST_TYPE_ID = 28;
const CSGFT_REQUEST_TYPE_ID = 35;

export const csgThresholdRouter = express.Router();

csgThresholdRouter.get("/:academic_year_id", async (req: Request, res: Response) => {
  const { academic_year_id } = req.params;
  let data = await db("sfa.csg_threshold").where({ academic_year_id });
  let rates = await db("sfa.csg_lookup").where({ academic_year_id }).first();
  res.json({ data, rates });
});

csgThresholdRouter.get("/cslft/:application_id", async (req: Request, res: Response) => {
  const { application_id } = req.params;

  let funding_request = await db("sfa.funding_request")
    .where({ application_id, request_type_id: 4 })
    .orderBy("id", "desc")
    .first();

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

  res.json({ data: { funding_request, assessment, disbursements } });
});

csgThresholdRouter.get("/csgftdep/:application_id", async (req: Request, res: Response) => {
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
});

csgThresholdRouter.get("/csgd/:application_id", async (req: Request, res: Response) => {
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
});

csgThresholdRouter.get("/csgtu/:application_id", async (req: Request, res: Response) => {
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
});

csgThresholdRouter.get("/csgft/:application_id", async (req: Request, res: Response) => {
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
});

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

    let assessmentInsert = await db("sfa.assessment").insert(assessment).returning("*");

    if (assessmentInsert.length > 0 && disbursements && isArray(disbursements)) {
      for (let disb of disbursements) {
        disb.assessment_id = assessmentInsert[0].id;
        disb.funding_request_id = funding_request_id;

        if (disb.id) {
          let id = disb.id;
          delete disb.id;
          delete disb.financial_batch_id; // not editable through the interface
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

    await db("sfa.assessment").where({ id: assessment_id }).update(assessment);

    for (let disb of disbursements) {
      disb.assessment_id = assessment_id;
      disb.funding_request_id = funding_request_id;

      if (disb.id) {
        let id = disb.id;
        delete disb.id;
        delete disb.financial_batch_id; // not editable through the interface
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
