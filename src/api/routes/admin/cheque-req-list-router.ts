import { ExpenseRepository } from './../../repositories/expense/expense-repository';
import knex from "knex";
import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";
import { AssessmentCslftRepository } from "../../repositories";
import { ChequeReqList } from '../../repositories/cheque_req_list';

const db = knex(DB_CONFIG)
export const chequeReqRouter = express.Router();

chequeReqRouter.post("/",
    async (req: Request, res: Response) => {
        const { issueDate = "" } = req.body;

        if (issueDate?.length !== 10) {
            return res.status(404).send();
        }

        try {
            const chequeRequest = new ChequeReqList(db);

            const validate = await chequeRequest.validate(issueDate);

            console.log(validate);

            return res.status(200).json(validate);
        } catch (error) {
            console.log(error);
            return res.status(404).send();
        }
    });