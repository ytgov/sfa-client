import express, { Request, Response } from "express";
import knex from "knex";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG);

export const inSchoolStatusRouter = express.Router();

inSchoolStatusRouter.get("/", async (req: Request, res: Response) => {
  const { filter = true } = req.query;

  try {
    const results = await db("sfa.in_school_status")
      .where("is_active", 1)
      .select(
        "sfa.in_school_status.id",
        "sfa.in_school_status.description",
        "sfa.in_school_status.is_active"
      );

    if (results) {
      return res.status(200).json({ success: true, data: [...results] });
    } else {
      return res.status(404).send();
    }
  } catch (error: any) {
    console.log(error);
    return res.status(404).send();
  }
});