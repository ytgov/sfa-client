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

portalReferenceRouter.get("/education_level", async (req: Request, res: Response) => {
  res.json({ data: await db.getEducationLevels() });
});

portalReferenceRouter.get("/relationship", async (req: Request, res: Response) => {
  res.json({ data: await db.getRelationships() });
});

portalReferenceRouter.get("/first-nation", async (req: Request, res: Response) => {
  res.json({ data: await db.getFirstNations() });
});

portalReferenceRouter.get("/student-category", async (req: Request, res: Response) => {
  res.json({ data: await db.getStudentCategories() });
});

portalReferenceRouter.get("/high-school/:provinceId", async (req: Request, res: Response) => {
  const { provinceId } = req.params;
  res.json({ data: await db.getHighSchools(provinceId) });
});
