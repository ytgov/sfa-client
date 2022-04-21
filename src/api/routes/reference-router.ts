import express, { Request, Response } from "express";
import knex from "knex";

import { DB_CONFIG } from "../config";

const db = knex(DB_CONFIG);

export const referenceRouter = express.Router();

referenceRouter.get("/city", async (req: Request, res: Response) => {
    let list = await db("sfa.city").orderBy("description");
    res.json({ data: list })
});

referenceRouter.get("/province", async (req: Request, res: Response) => {
    let list = await db("sfa.province").orderBy("description");
    res.json({ data: list })
});

referenceRouter.get("/country", async (req: Request, res: Response) => {
    let list = await db("sfa.country").orderBy("description");
    res.json({ data: list })
});

referenceRouter.get("/institution_level", async (req: Request, res: Response) => {
    let levels = await db("sfa.institution_level");
    res.json({ data: levels })
});
