import express, { Request, Response } from "express";
import knex from "knex";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG);

export const requestTypeRouter = express.Router();

requestTypeRouter.get("/", async (req: Request, res: Response) => {  
  const { filter = true } = req.query;
  
  try {
    const results = await db("sfa.request_type")  
    .where("is_active", 1)    
    .select(
      "*",
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