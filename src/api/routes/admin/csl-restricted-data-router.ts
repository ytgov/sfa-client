import knex from "knex";
import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";
import { toFormData } from "axios";
import { UploadedFile } from "express-fileupload";
import * as fs from "fs";

const db = knex(DB_CONFIG)
export const cslRestrictedData = express.Router();

cslRestrictedData.post("/upload-file",
    async (req: Request, res: Response) => {
        try {
            const file: any = req?.files?.file;

            const dataFile = file.data;
            
            const firstFilter:[] = dataFile.toString()?.split('\r\n');

            console.log(firstFilter);
            

            const secondFilter = firstFilter
            .filter((data: string, index) => data.length > 0)
            .map((data: string, index) => {

                const restrictedData:any = {};

                //CSL_RESTRICTED_ID
                restrictedData.CSL_RESTRICTED_ID = data.slice(0, 9).trim();
                //LAST_NAME
                restrictedData.LAST_NAME = data.slice(9, 39).trim();
                //FIRST_NAME
                restrictedData.FIRST_NAME = data.slice(39, 69).trim();
                //BIRTH_DATE
                restrictedData.BIRTH_DATE = data.slice(69, 77).trim();
                //OVER_AWARD
                restrictedData.OVER_AWARD = data.slice(77, 83).trim();
                //RESTRICTION_WARN_ID
                restrictedData.RESTRICTION_WARN_ID = data.slice(84, 85).trim();
                //RESTRICTION_REASON_ID
                restrictedData.RESTRICTION_REASON_ID = data.slice(85, 86).trim();
                //AMOUNT_DISBURSED
                restrictedData.AMOUNT_DISBURSED = data.slice(86, 92).trim();
                //WEEKS_ACCUMULATED
                restrictedData.WEEKS_ACCUMULATED = data.slice(93, 96).trim();

                return restrictedData;
            });
            
            console.log(secondFilter);

            return res.status(200).json({});
        } catch (error) {
            console.log(error);
            return res.status(404).send();
        }
    }
);