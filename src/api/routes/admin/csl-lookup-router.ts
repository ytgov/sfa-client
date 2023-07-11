import express, { Request, Response } from "express";
import knex from "knex";
import { DB_CONFIG } from "../../config";
import {CslLookupRepository} from "../../repositories";

const db = knex(DB_CONFIG);
const cslLookupRepo = new CslLookupRepository(db);

export const cslLookupRouter = express.Router();

cslLookupRouter.get("/year/:id", async (req: Request, res: Response) => {
  const { id = undefined } = req.params;

  try {
    const results = await cslLookupRepo.getCslLookupByYear(parseInt(id ?? "0"));

    if (results) {
      return res.status(200).json({ success: true, data: results });
    } else {
      return res.status(404).send();
    }
  } catch (error: any) {
    console.log(error);
    return res.status(404).send();
  }
});