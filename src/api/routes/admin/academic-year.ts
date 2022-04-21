import { DB_CONFIG } from "../../config";
import express, { Request, Response } from "express";
import knex from "knex";

let { RequireServerAuth, RequireAdmin } = require("../auth");
const db = knex(DB_CONFIG);


export const acadecicYearRouter = express.Router();


const ARCHIVED_STATUS = "Archived";
const OPEN_STATUS = "Open";
const CLOSED_STATUS = "Closed";

acadecicYearRouter.get("/", async (req: Request, res: Response) => {
    let list = await db("sfa.academic_year").whereNot({ status: ARCHIVED_STATUS }).orderBy("year", "desc");
    res.json({ data: list })
});

acadecicYearRouter.get("/open", async (req: Request, res: Response) => {
    let list = await db("sfa.academic_year").where({ status: OPEN_STATUS }).orderBy("year", "desc");
    res.json({ data: list })
});

acadecicYearRouter.get("/archived", async (req: Request, res: Response) => {
    let list = await db("sfa.academic_year").where({ status: ARCHIVED_STATUS }).orderBy("year", "desc");
    res.json({ data: list })
});

acadecicYearRouter.post("/", async (req: Request, res: Response) => {
    res.status(404).send();
});

acadecicYearRouter.get("/:id", async (req: Request, res: Response) => {
    res.status(404).send();
});

acadecicYearRouter.get("/:id/stats", async (req: Request, res: Response) => {
    res.status(404).send();
});

acadecicYearRouter.put("/:id", async (req: Request, res: Response) => {
    res.status(404).send();
});

acadecicYearRouter.delete("/:id", async (req: Request, res: Response) => {
    res.status(404).send();
});
