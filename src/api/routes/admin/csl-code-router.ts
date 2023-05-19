import express, { Request, Response } from "express";
import knex from "knex";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG);

export const cslCodeRouter = express.Router();

cslCodeRouter.get("/", async (req: Request, res: Response) => {
  const { filter = true } = req.query;

  try {
    const results = await db("sfa.csl_code")
      .where("is_active", filter !== "false")
      .select(
        "sfa.csl_code.warning_code",
        "sfa.csl_code.definition",
        "sfa.csl_code.id"
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