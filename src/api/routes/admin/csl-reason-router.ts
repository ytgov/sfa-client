import express, { Request, Response } from "express";
import knex from "knex";
import { DB_CONFIG } from "../../config";
import {CslReasonRepository} from "../../repositories/csl_reason";

const db = knex(DB_CONFIG);
const cslReasonRepo = new CslReasonRepository(db);

export const cslReasonRouter = express.Router();

cslReasonRouter.get("/non-award", async (req: Request, res: Response) => {

  try {

    const results = await cslReasonRepo.getCslReason('Non-Award');

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

cslReasonRouter.get("/over-award", async (req: Request, res: Response) => {

  try {

    const results =  await cslReasonRepo.getCslReason('Over-Award');

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