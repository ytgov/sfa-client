import express, { Request, Response } from "express";
import knex from "knex";
import { body, param } from "express-validator";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG);

export const cslCertificateExportRouter = express.Router();


cslCertificateExportRouter.get("/:FROM_DATE_P/:TO_DATE_P/:CSL_CERT_SEQ_P/:IS_PREVIEW", 
    [   
        param("CSL_CERT_SEQ_P").isInt().notEmpty(),      
        param("FROM_DATE_P").notEmpty(), 
        param("TO_DATE_P").notEmpty(),
        param("IS_PREVIEW").notEmpty()
    ], 
    //ReturnValidationErrors, 
    async (req: Request, res: Response) => {
        const { filter = true } = req.query;
        const { CSL_CERT_SEQ_P, FROM_DATE_P, TO_DATE_P, IS_PREVIEW} = req.params;
        
        try {                     
            const results = await db.select('s.id', db.raw('CONCAT(p.last_name, \', \', p.first_name) AS name'), 
            db.raw('ISNULL(ROUND(d.disbursed_amount, 0), 0) AS csl_amount'), 
            'd.transaction_number', 
            'd.issue_date', 
            'd.due_date', 
            'r.description')
            .from('sfa.student AS s')
            .join('sfa.person AS p', 's.person_id', '=', 'p.id')
            .join('sfa.application AS hd', 's.id', '=', 'hd.student_id')
            .join('sfa.funding_request AS fr', 'hd.id', '=', 'fr.application_id')
            .join('sfa.disbursement AS d', 'fr.id', '=', 'd.funding_request_id')
            .join('sfa.request_type AS r', 'fr.request_type_id', '=', 'r.id')
            .join('sfa.msfaa AS m', 's.id', '=', 'm.student_id')            
            .where(IS_PREVIEW === '1' ? 'd.csl_cert_seq_number_prev' : 'd.csl_cert_seq_number', '=', CSL_CERT_SEQ_P)                        
            .andWhere('d.issue_date', '>=', FROM_DATE_P)
            .andWhere('d.issue_date', '<=', TO_DATE_P)  
            .andWhere('m.msfaa_status', '=', 'Received')    
            .andWhere(db.raw("((m.is_full_time = CASE d.disbursement_type_id WHEN 4 THEN 1 ELSE 0 END) OR hd.academic_year_id <= 2012) "))                        
            
            if(results.length) {
                const results2 = await db.raw(
                    'SELECT sfa.fn_cert_data(?, ?, ?) as fileText',
                    [CSL_CERT_SEQ_P, FROM_DATE_P, TO_DATE_P]                                        
                  );                       
                                    
                  if (results2[0].fileText) {                    
                    return res.status(200).json({ success: true, data1: results, data2:results2, batch: CSL_CERT_SEQ_P});
                } else {
                    return res.status(200).json({ success: false, data1: results, data2:results2, batch: CSL_CERT_SEQ_P});
                }                
            } else {
                return res.status(200).json({ success: false, batch: CSL_CERT_SEQ_P, message: "There are no records between " + FROM_DATE_P + " and " + TO_DATE_P});
            }
                          
        } catch (error: any) {
            console.log(error);
            return res.status(404).send();
        }        
});


cslCertificateExportRouter.put("/:FROM_DATE_P/:TO_DATE_P/:PREVIEW", 
    [        
        param("FROM_DATE_P").notEmpty(), 
        param("TO_DATE_P").notEmpty(),
        param("PREVIEW")
    ], 
    //ReturnValidationErrors, 
    async (req: Request, res: Response) => {
        const { filter = true } = req.query;
        const { FROM_DATE_P, TO_DATE_P, PREVIEW} = req.params;
                
        try {           

                const results = await db 
                .select(db.raw(`sfa.fn_get_count_disbursement_ecerts('${FROM_DATE_P}', '${TO_DATE_P}') AS result`))               
                                                                 
                if(results[0].result > 0) {                    
                    const nextVal = await db
                    .select(db.raw(`NEXT VALUE FOR ${PREVIEW === '1' ?  'sfa.csl_cert_seq_prev' : 'sfa.csl_cert_seq'} AS nextVal;`));
                                        
                    const innerSelect = await db.raw(`EXEC ${PREVIEW === '1' ? 'sfa.sp_get_and_update_csl_cert_seq_num_prev' : 'sfa.sp_get_and_update_csl_cert_seq_num'} '${FROM_DATE_P}','${TO_DATE_P}', ${nextVal[0].nextVal};`);     
                    
                    const resultsCheck = await db.raw(`SELECT count(id) as count FROM sfa.disbursement d where ${PREVIEW === '1' ? 'csl_cert_seq_number_prev' : 'csl_cert_seq_number'} = ${nextVal[0].nextVal}`);
                    
                    if(resultsCheck[0].count) {
                        return res.json({flag: 1, data: nextVal[0].nextVal});  
                    } else {
                        return res.json({flag: 0, data: `Something went wrong! No records have been modified from ${FROM_DATE_P} to ${TO_DATE_P}`}); 
                    }                                                                           
                } else {
                    return res.json({flag: 0, data: `There are no certificates with received MSFAA between ${FROM_DATE_P} and ${TO_DATE_P}`});                                                			                                            
                } 
                               
        } catch (error: any) {
            console.log(error);
            return res.status(404).send();
        }        
});