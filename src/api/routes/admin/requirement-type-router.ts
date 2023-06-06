import express, { Request, Response } from "express";
import knex from "knex";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG);

export const requirementTypeRouter = express.Router();

requirementTypeRouter.get("/", async (req: Request, res: Response) => {
  const { filter = true } = req.query;

  try {
    const results = await db("sfa.requirement_type")
      .where("is_active", filter !== "false")
      .select(
        "sfa.requirement_type.id",
        "sfa.requirement_type.description",
        "sfa.requirement_type.document_location",
        
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

