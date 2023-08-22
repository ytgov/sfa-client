import knex from "knex";
import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";
import * as fs from "fs";
import { CSLRestrictedData } from "@/repositories/csl-restricted-data";

const db = knex(DB_CONFIG)
export const cslRestrictedData = express.Router();

cslRestrictedData.post("/upload-file",
    async (req: Request, res: Response) => {
        try {
            const file: any = req?.files?.file;

            //const cslRestricted = new CSLRestrictedData(db);

            //const results = await cslRestricted.getResponse(file);

            return res.status(200).json({});
        } catch (error) {
            console.log(error);
            return res.status(404).send();
        }
    }
);