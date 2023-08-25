import express, { Request, Response } from "express";
import knex from "knex";
import { body, param } from "express-validator";
import { DB_CONFIG } from "../../config";
import { Console } from "console";
import moment from "moment";
const db = knex(DB_CONFIG);

export const cslMsfaaReceiveRouter = express.Router();

cslMsfaaReceiveRouter.post("/:FILE_NAME", 
    [        
        param("FILE_NAME").notEmpty(),         
    ],     
    async (req: Request, res: Response) => {        
        const { FILE_NAME } = req.params;
        const file:any = req.files;                 

        try {        

            let vInRecord;
			let vCount = 0;
			let vTotalSin = 0;
			let vNonNumericSin = 0;
			let vNumSin;
			let vErrorMsg;
			let vValidDateMsg:any;
			let vInFile;
			let vStatusDesc;

            let textContent = file.file.data.toString('utf8');
            let linesContent = textContent.split("\n");            
            const fileName = FILE_NAME.trim();        
            let header = linesContent[0];
            let headerRecordType = header.substring(0, 3);            
            let vOriginator = header.substring(3, 7).replaceAll(' ', '');            
            let vTitle = header.substring(7, 47).replaceAll(' ', '')
            let vCreateDateTime = header.substring(47, 59);
            let vSeqNum = header.substring(59, 65);          
                                                         
            if(!fileName) {
                return res.json({flag: 0, data: 'You need to enter a filename'});                    
            } else {
                if
                (
                    !(fileName.substring(0,1).match(/[A-Z]/))                    
                    || !(fileName.length > 5)
                ) {
                    return res.json({flag: 0, data: 'Please try again with the complete file path and name'});
                }
                else {
                    const deleteMsfaaImport = await db.raw("DELETE FROM sfa.MSFAA_IMPORT");                    
                                        
                    if(headerRecordType !== '100') {
                        return res.json({flag: 0, data: 'There is no header record on this file'});
                    } else {                        
                        if(vOriginator !== '222') {
                            return res.json({flag: 0, data: 'File has not been provided by the service provider (222) but by: '+ vOriginator});
                        } else {
                            if(vTitle !== 'MSFAARECEIVED') {
                                return res.json({flag: 0, data: 'File is not a MSFAA Received file: '+ vTitle});                                
                            } else {                                
                                if(moment(vCreateDateTime, 'YYYYMMDDHHmm').format('YYYY - MMM - DD HH:mm') === 'Invalid date') {
                                    return res.json({flag: 0, data: 'Invalid creation date/time in header record: ' + vCreateDateTime});         
                                } 

                                if(isNaN(vSeqNum)) {
                                    return res.json({flag: 0, data: 'Invalid sequence number in header record: ' + vSeqNum});         
                                }                    
                            }
                        }
                    }
                    
                    for(let i = 1; i < linesContent.length; i++) {                        
                        let currentLine = linesContent[i];
                        let headerRecordType = currentLine.substring(0, 3);
                        vErrorMsg = '';
                        if(headerRecordType === '200') {                            
                            let vAgreementNumInit = currentLine.substring(3, 4).replaceAll(' ', '');
                            let vAgreementNum = currentLine.substring(4, 13).replaceAll(' ', '');
                            let vSin = currentLine.substring(13, 22).replaceAll(' ', '');
                            let vStatus = currentLine.substring(22, 23).replaceAll(' ', '');
                            let vBorrowSigned = currentLine.substring(23, 31).replaceAll(' ', '');
                            let vSpReceived = currentLine.substring(31, 39).replaceAll(' ', '');
                            let vNewIssueProv = currentLine.substring(48, 50).replaceAll(' ', '');
                            let vCancelled = currentLine.substring(50, 58).replaceAll(' ', '');                            

                            vNumSin = Number(vSin);

                            if(!vNumSin) {
                                vErrorMsg = vErrorMsg + 'SIN is not numeric. ';
						        vNumSin = 0;
						        vNonNumericSin = vNonNumericSin + 1;
                            }

                            if(vAgreementNum === '') {
                                vErrorMsg = vErrorMsg + 'Agreement Number missing. ';
                            }
                            
                            if(vSin === '') {
                                vErrorMsg = vErrorMsg + 'SIN missing. ';
                            }
                           
                            if(vStatus === '') {
                                vErrorMsg = vErrorMsg + 'Status code missing. ';
                            }
                         
                            if(vNewIssueProv === '' && vStatus === 'C') {
                                vErrorMsg = vErrorMsg + 'New issuing provice missing for Cancelled MSFAA. ';
                            }  
                            
                            vValidDateMsg = await db.raw(`select sfa.fn_check_valid_date( '${vBorrowSigned}', 'Borrower Signed') AS result_date`);
                                                        

                            if(vValidDateMsg[0].result_date !== null && vValidDateMsg[0].result_date !== "EMPTY") {
                                vErrorMsg = vErrorMsg + vValidDateMsg[0].result_date;
                            } else if(vValidDateMsg[0].result_date === "EMPTY" && vStatus === "R") {
                                vErrorMsg = vErrorMsg + 'Borrower signed date missing for Received MSFAA. ';
                            }
                         
                            vValidDateMsg = await db.raw(`select sfa.fn_check_valid_date('${vSpReceived}', 'Service Provider Received') AS result_date`);  
                            if(vValidDateMsg[0].result_date !== null && vValidDateMsg[0].result_date !== "EMPTY") {
                                vErrorMsg = vErrorMsg + vValidDateMsg[0].result_date;
                            } else if(vValidDateMsg[0].result_date === "EMPTY" && vStatus === "R") {
                                vErrorMsg = vErrorMsg + 'Service provider received date missing for Received MSFAA. ';
                            }                          

                            vValidDateMsg = await db.raw(`select sfa.fn_check_valid_date('${vCancelled}', 'Cancelled') AS result_date`); 
                            if(vValidDateMsg[0].result_date !== null && vValidDateMsg[0].result_date !== "EMPTY") {
                                vErrorMsg = vErrorMsg + vValidDateMsg[0].result_date;
                            } else if(vValidDateMsg[0].result_date === "EMPTY" && vStatus === "C") {
                                vErrorMsg = vErrorMsg + 'Cancel date missing for Cancelled MSFAA. ';
                            }    

                            const insert = await db.raw(`EXEC sfa.sp_insert_msfaa_import 
                                @v_agreement_num = ${vAgreementNum === '' ? null : `'${vAgreementNum}'`}, 
                                @v_sin = ${vSin === '' ? null : `'${vSin}'`}, 
                                @v_status = ${vStatus === '' ? null : `'${vStatus}'`}, 
                                @v_borrow_signed = ${vBorrowSigned === '' ? null : `'${vBorrowSigned}'`}, 
                                @v_sp_received = ${vSpReceived === '' ? null : `'${vSpReceived}'`}, 
                                @v_new_issue_prov = ${vNewIssueProv == '' ? null : `'${vNewIssueProv}'`}, 
                                @v_cancelled = ${vCancelled === '' ? null : `'${vCancelled}'`}, 
                                @v_error_msg = ${vErrorMsg == '' ? null : `'${vErrorMsg}'`};
                            `);
                            
                            vCount = vCount + 1;
                            vTotalSin = vTotalSin + vNumSin;	
                            
                        } else if(headerRecordType === '999') {  
                            if(isNaN(parseInt(currentLine.substring(43, 52).replaceAll(' ', '')))) {
                                return res.json({flag: 0, data: 'Trailer count is non numeric' + currentLine.substring(43, 52).replaceAll(' ', '')});   
                            }  

                            if(parseInt(currentLine.substring(43, 52).replaceAll(' ', '')) + 0 !== vCount) {
                                return res.json({flag: 0, data: 'Trailer count does not equal total detail records: Trailer -' + parseInt(currentLine.substring(43, 52).replaceAll(' ', '')) + 0 + ' Record Count - ' + vCount});         
                            }                              

                            if(isNaN(parseInt(currentLine.substring(52, 67).replaceAll(' ', '')))) {
                                return res.json({flag: 0, data: 'Trailer SIN hash is non numeric : ' + currentLine.substring(52, 67).replaceAll(' ', '')});   
                            }  

                            if(parseInt(currentLine.substring(52, 67).replaceAll(' ', '')) !== vTotalSin) {
                                return res.json({flag: 0, data: 'Trailer SIN hash total does not equal total of detail records: Trailer - ' + parseInt(currentLine.substring(52, 67).replaceAll(' ', '')) + ' Record SIN - ' + vTotalSin + '. SIN non-numeric count was: ' + vNonNumericSin});   
                            }                            
                        }                      
                    }                                                  
                    return res.json({flag: 1, data: 'CSL MSFAA response read complete. ' + vCount + ' records processed.', date: moment(vCreateDateTime.substring(0, 8), 'YYYYMMDD').format('YYYY-MMM-DD'), seq: vSeqNum });                    
                }
            }                                                 
        } catch (error: any) {
            console.log(error);
            return res.status(404).send();
        }        
});


cslMsfaaReceiveRouter.put("/", [], 
    async (req: Request, res: Response) => {
         
        try {                       
            let vStatusDesc;
            let vCount = 0;            
            const results = await db.select("mi.agreement_number","mi.sin", "mi.status_code", "mi.borrower_signed_date", "mi.sp_received_date", "mi.new_issue_prov", "mi.cancel_date")
            .from("sfa.msfaa_import AS mi")                    
            .innerJoin("sfa.msfaa AS m", "m.id", "=", "mi.agreement_number")
            .whereNull("error_message");                         
            for(let res of results) {
                switch(res.status_code){
                    case  "R":
                        vStatusDesc = "Received";
                        break;
                    case "C":
                        vStatusDesc = "Cancelled";
                        break; 
                    default:
                        vStatusDesc = "Pending";
                        break;
                }

                if(res.status_code === "C") {                    
                    const updateMSFAA = await db('sfa.msfaa')
                    .where('id', db.raw(`CAST (${res.agreement_number} AS INT)`))                    
                    .update({                            
                        msfaa_status: vStatusDesc,
                        cancel_date: db.raw(`CAST('${res.cancel_date}' AS DATE)`),
                        cancel_reason: db.raw(
                            `'New MSFAA issued by ' + '${res.new_issue_prov}'`
                        ),
                    })
                    .catch((err: any) => {
                        console.log("FAILED", err)
                        res.json({ messages: [{ variant: "error", text: "Save failed" }] })
                    }).catch((error) => {
                        console.error('Error: ', error);
                    })                                                                               
                } else {                                                         
                    const updateMSFAA = await db('sfa.msfaa')
                    .where('id', db.raw(`CAST(${res.agreement_number} AS INT)`))                    
                    .update({
                        msfaa_status: vStatusDesc,                                
                        signed_date: db.raw(`CAST('${res.borrower_signed_date}' AS DATE)`),                                
                        received_date: db.raw(`CAST('${res.sp_received_date}' AS DATE)`),
                    }).catch((error) => {
                        console.error('Error: ', error);
                    })                                                                                                                          
                }
                vCount = vCount + 1;
            }            
            return res.json({flag: 1, data: 'CSL MSFAA response update complete. ' + vCount + ' records processed.'   });                
        } catch (error: any) {
            console.log(error);
            return res.status(404).send();
        }        
       
    }
); 


cslMsfaaReceiveRouter.get("/", 
async (req: Request, res: Response) => {
    try {        
        let pdfRes = await db('sfa.MSFAA_IMPORT as mi')
        .select(
          'mi.agreement_number',
          'mi.sin',
          'mi.status_code',
          'mi.borrower_signed_date',
          'mi.sp_received_date',
          'mi.new_issue_prov',
          'mi.cancel_date',
          db.raw(
            `CASE
              WHEN (
                SELECT TOP 1 p.FIRST_NAME + ' ' + p.LAST_NAME 
                FROM sfa.STUDENT s 
                INNER JOIN sfa.PERSON p ON s.person_id = p.id 
                WHERE p.SIN = MI.SIN
              ) IS NULL THEN ' No Student Match'
              ELSE ''
            END +
            CASE
              WHEN (
                SELECT TOP 1 id 
                FROM sfa.msfaa 
                WHERE id = CONVERT(INT, mi.agreement_number)
              ) IS NULL THEN ' No MSFAA Match'
              ELSE ''
            END as error_message`
          ),
          db.raw(
            `(SELECT TOP 1 p.FIRST_NAME + ' ' + p.LAST_NAME 
              FROM sfa.STUDENT s 
              INNER JOIN sfa.PERSON p ON s.person_id = p.id 
              WHERE p.SIN = MI.SIN) as student_name`
          )
        )
        .orderBy('mi.sin');

        return res.json({ data: pdfRes });
    } catch (error) {
        console.log("/all-ERR: ", error);
        res.status(404).send(error);
    }

});
