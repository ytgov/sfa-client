import knex from "knex";
import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";
import { ChequeReqList } from '../../repositories/cheque_req_list';

const db = knex(DB_CONFIG)
export const chequeReqRouter = express.Router();

chequeReqRouter.get("/",
    async (req: Request, res: Response) => {
        try {
            const { issueDate = "", reRunBatch = null } = req.query;
            
            let start_p = 0;

            if (
                reRunBatch !== null && 
                reRunBatch !== "" &&
                Number(reRunBatch)
            ) {
                start_p = Number(reRunBatch);
            }

            if (issueDate?.length !== 10) {
                return res.status(200).json({ 
                    success: false, 
                    text: 'Select a valid date' 
                });
            }

            const chequeRequest = new ChequeReqList(db);

            const records: any = await chequeRequest.validate(issueDate.toString(), start_p);
            
            return res.status(200).json({ ...records });

        } catch (error) {
            console.log(error);
            return res.status(404).send();
        }
    }
);