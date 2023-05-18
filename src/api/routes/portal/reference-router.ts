import express, { Request, Response } from "express";
import { ReferenceService } from "../../services/portal/reference-service";

export const portalReferenceRouter = express.Router();

const db = new ReferenceService();

portalReferenceRouter.get("/city", (req: Request, res: Response) => {
  res.send(["Whitehorse", "Tagish"]);
});

portalReferenceRouter.get("/institution", async (req: Request, res: Response) => {
  res.json({ data: await db.getInstitutions() });
});
