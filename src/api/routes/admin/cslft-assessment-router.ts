import { ExpenseRepository } from './../../repositories/expense/expense-repository';
import knex from "knex";
import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";
import { AssessmentCslftRepository, DisbursementRepository } from "../../repositories";
import { AssessmentDTO, CslftResultDTO, DataDTO, DisbursementDTO, UncappedExpensesDTO } from "../../models";

const db = knex(DB_CONFIG)
export const assessmentCslftRouter = express.Router();
const mainTable = "sfa.assessment";

assessmentCslftRouter.get("/assess-info/:id",
[param("id").isInt().notEmpty()], ReturnValidationErrors, 
async (req: Request, res: Response) => {

    const assessmentCslftRepo = new AssessmentCslftRepository(db);
    const { id = undefined } = req.params;
    let results: Partial<DataDTO<CslftResultDTO>> = {};
    
    try {

        if (id) {
            results = await assessmentCslftRepo.initAssessments(parseInt(id));
        }

        if (Object.keys(results.result ?? {}).length > 0) {
            if (results.result) {
                results.result.success = true;
            }
            return res.status(200).json(results);
        } else {
            return res.status(404).send();
        }

    } catch (error: any) {
        console.log(error);
        return res.status(404).send();
    }
});

assessmentCslftRouter.get("/funding_request/:id/assessment/create",
[param("id").isInt().notEmpty()], ReturnValidationErrors, 
async (req: Request, res: Response) => {

    const assessmentCslftRepo = new AssessmentCslftRepository(db);
    const { id = undefined } = req.params;
    let results: Partial<DataDTO<CslftResultDTO>> = {};
    
    try {

        if (id) {
            results = await assessmentCslftRepo.initAssessments(parseInt(id), true);
        }

        if (Object.keys(results.result ?? {}).length > 0) {
            if (results.result) {
                results.result.success = true;
            }
            return res.status(200).json(results);
        } else {
            return res.status(404).send();
        }

    } catch (error: any) {
        console.log(error);
        return res.status(404).send();
    }
});

assessmentCslftRouter.post("/",
    [body("payload").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const { ...assessment } = req.body.payload.data;
        const disbursements = req.body.payload.disbursements;
        const funding_request = req.body.payload.funding_request;
        const msfaa = req.body.payload.msfaa;
        const assessmentRepo = new AssessmentCslftRepository(db);
        let newApp: Partial<CslftResultDTO> = {
            data: { ...assessment },
            disbursements: disbursements,
            funding_request: funding_request,
            msfaa: msfaa,
        };

        try {
            const newRow = await assessmentRepo.insertUpdateAll(newApp);

            if (newRow) {
                return res.json({ data: { id: newRow.data?.id }, messages: [{ text: "Assessment created", variant: "success" }] });
            }

            return res.status(404).send();
        }
        catch (err) {
            console.log(err);
            return res.json({ messages: [{ text: `Saved failed`, variant: "error" }] })
        }
    }
);

assessmentCslftRouter.put("/:id",
    [param("id").isInt().notEmpty(), body("payload").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const { ...assessment } = req.body.payload.data;
        const disbursements = req.body.payload.disbursements;
        const funding_request = req.body.payload.funding_request;
        const msfaa = req.body.payload.msfaa;
        const id: number = parseInt(req.params.id);

        const assessmentRepo = new AssessmentCslftRepository(db);
        let newApp: Partial<CslftResultDTO> = {
            data: { ...assessment },
            disbursements: disbursements,
            funding_request: funding_request,
            msfaa: msfaa,
        };

        try {
            const updateRow = await assessmentRepo.insertUpdateAll(newApp);

            if (updateRow) {
                return res.json({ data: { id: updateRow.data?.id }, messages: [{ text: "Assessment updated", variant: "success" }] });
            }

            return res.status(404).send();
        }
        catch (err) {
            console.log(err);
            return res.json({ messages: [{ text: `Saved failed`, variant: "error" }] })
        }
    }
);

assessmentCslftRouter.post("/academic-year/:academic_year_id/person/:person_id/parentweeklycontrib",
    [param("academic_year_id").isInt().notEmpty(), param("person_id").isInt().notEmpty(), body("assessment").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const assessmentCslftRepo = new AssessmentCslftRepository(db);
        const { ...assessment } = req.body.assessment;
        const { academic_year_id = undefined, person_id = undefined } = req.params;
        let result: number | undefined = 0;       
        
        try {

            if (academic_year_id && person_id) {
                result = await assessmentCslftRepo.calculateParentWeeklyContrib(parseInt(person_id), parseInt(academic_year_id), assessment as AssessmentDTO);
            }

            if (result !== undefined && result >= 0) {
                return res.status(200).json({ success: true, data: result, });
            } else {
                return res.status(404).send();
            }

        } catch (error: any) {
            console.log(error);
            return res.status(404).send();
        }
    }
);

assessmentCslftRouter.post("/getcombinedcontrib",
    [body("assessment").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const assessmentCslftRepo = new AssessmentCslftRepository(db);
        const { ...assessment } = req.body.assessment;
        let result: number | undefined = 0;       
        
        try {

            if (assessment) {
                result = await assessmentCslftRepo.calculateCombinedContrib(assessment as AssessmentDTO);
            }

            if (result !== undefined && result >= 0) {
                return res.status(200).json({ success: true, data: result });
            } else {
                return res.status(404).send();
            }

        } catch (error: any) {
            console.log(error);
            return res.status(404).send();
        }
    }
);

assessmentCslftRouter.post("/:funding_request_id/recalc",
    [param("funding_request_id").isInt().notEmpty(), body("assessment").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const assessmentCslftRepo = new AssessmentCslftRepository(db);
        const { ...assessment } = req.body.assessment;
        const disbursements: Array<DisbursementDTO> = req.body.disbursements;
        const { funding_request_id = undefined } = req.params;        
        let results: Partial<CslftResultDTO> = {};       
        
        try {

            if (funding_request_id) {
                results = await assessmentCslftRepo.executeRecalc(parseInt(funding_request_id), assessment as AssessmentDTO, disbursements);
            }

            if (Object.keys(results.data ?? {}).length > 0) {
                results.success = true;
                return res.status(200).json(results);
            } else {
                return res.status(404).send();
            }

        } catch (error: any) {
            console.log(error);
            return res.status(404).send();
        }
    }
);

assessmentCslftRouter.post("/:funding_request_id/disburse",
    [param("funding_request_id").isInt().notEmpty(), body("assessment").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const assessmentCslftRepo = new AssessmentCslftRepository(db);
        const { ...assessment } = req.body.assessment;
        const disbursements: Array<DisbursementDTO> = req.body.disbursements;
        const { funding_request_id = undefined } = req.params;
        let results: Partial<CslftResultDTO> = {};
        
        try {

            if (funding_request_id) {
                const disburse = await assessmentCslftRepo.executeDisburse(parseInt(funding_request_id), assessment as AssessmentDTO, disbursements);
                results.data = disburse.data;
                results.disbursements = disburse.disbursements;
                results.funding_request = disburse.funding_request;
                results.globals = disburse.globals;
                results.msfaa = disburse.msfaa;
            }

            if (Object.keys(results.data ?? {}).length > 0) {
                results.success = true;
                return res.status(200).json(results);
            } else {
                return res.status(404).send();
            }

        } catch (error: any) {
            console.log(error);
            return res.status(404).send();
        }
    }
);

assessmentCslftRouter.get("/application/:application_id/expenses/uncapped/:period_id", 
    [param("application_id").isInt().notEmpty(), param("period_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const expenseRepo = new ExpenseRepository(db);
        const { application_id = undefined, period_id = undefined } = req.params;
        let results: Array<UncappedExpensesDTO> = [];
        
        try {
            
            if (application_id && period_id) {
                results = await expenseRepo.getUncappedExpenseTable(parseInt(application_id), parseInt(period_id));
            }

            if (results.length > 0) {                
                return res.status(200).json({ success: true, data: results });
            } else {
                return res.status(200).json({ success: true, data: [] });
            }

        } catch (error: any) {
            console.log(error);
            return res.status(404).send();
        }
    }
);

assessmentCslftRouter.get("/e-certificate/list/:assessment_id", 
    [param("assessment_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        const disbursementRepo = new DisbursementRepository(db);
        const { assessment_id = undefined } = req.params;
        let results: Array<DisbursementDTO> = [];
        
        try {
           

            if (assessment_id) {
                results = await disbursementRepo.getECertificateList(parseInt(assessment_id));
            }

            if (results.length > 0) {                
                return res.status(200).json({ success: true, data: results });
            } else {
                return res.status(404).send();
            }

        } catch (error: any) {
            console.log(error);
            return res.status(404).send();
        }
    }
);