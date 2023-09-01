import express, { Request, Response } from "express";
import knex from "knex";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG);

export const csgThresholdRouter = express.Router();

csgThresholdRouter.get("/:academic_year_id", async (req: Request, res: Response) => {
  const { academic_year_id } = req.params;
  res.json({ data: await db("sfa.csg_threshold").where({ academic_year_id }) });
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
    .orderBy("issue_date").orderBy("id");

  res.json({ data: { funding_request, assessment, disbursements } });
});

csgThresholdRouter.get("/csgftdep/:application_id", async (req: Request, res: Response) => {
  const { application_id } = req.params;

  let funding_request = await db("sfa.funding_request")
    .where({ application_id, request_type_id: 32 })
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
    .orderBy("issue_date").orderBy("id");

  res.json({ data: { funding_request, assessment, disbursements } });
});

csgThresholdRouter.post(
  "/csgftdep/:application_id/funding-request/:funding_request_id/assessment",
  async (req: Request, res: Response) => {
    const { application_id, funding_request_id } = req.params;

    let assessment = req.body;
    assessment.funding_request_id = funding_request_id;

    await db("sfa.assessment").insert(assessment);

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
