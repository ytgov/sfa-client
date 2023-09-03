import express, { Request, Response } from "express";
import knex from "knex";
import { body, param } from "express-validator";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";
import moment from "moment";

const db = knex(DB_CONFIG);

export const cslEntitlementFeedbackRouter = express.Router();


cslEntitlementFeedbackRouter.post("/:FILE_NAME", [param("FILE_NAME").notEmpty()],     
    async (req: Request, res: Response) => {      
        const { FILE_NAME } = req.params;
        const file:any = req.files;     

		async function getErrorDesc(id:Number) {
			let result;
			try {
				result  = await db("sfa.entitlement_error_codes").select(db.raw("description as description")).where("id", "=", 77).first();					
			} catch (error: any) {				
				return "-1";
			}			
			if(result.description) {
				return result.description;
			} else {
				return "0"
			}
		}
        try {                       
            const filename = file.file.name.toUpperCase().trim();		

            if(filename) {				
				let textContent = file.file.data.toString('utf8');
				let linesContent = textContent.split("\n");   
				let resDisbursement;
				let header = linesContent[0];					
				let vInRecord; 		
				let vCount = 0;					
				let vEcertSentDate;		
				let vRejectedCount = 0;		
				let vTotalSin = 0;		
				let vNonNumericSin = 0; //used to count number of non-numeric sins
				let vNumSin;				
				let vErrorMsg;				
				let vDisbursementId;
				let vInFile;		

				//header record variables			
				let vOriginator;
				let vTitle;
				let vCreateDate;
				let vSeqNum;
				let vProvince;
						
				//detail record variables			
				let vSin;
				let vCertNumber;
				let vCslAmount;
				let vCslAmountNum;
				let vErrorCode1;
				let vErrorCode2;
				let vErrorCode3;
				let vErrorCode4;
				let vErrorCode5;
				let vIsResend;
				let vResend;
				let vStatus;
				let vErrorDesc;
						
				//trailer record variables
				let vAcceptedTot;
				let vRejectedTot;
				let vPaperTot;
				let vUpdate;
				let vTotal;
				let is_resend_p;
				let error_id_p;
				let error_desc;

				//report variables
				let vParmListId;    

				let responseRead;
				
                if(filename.substring(0, 1).match(/[A-Z]/) && filename.length > 5) {																		
					const truncate = await db.raw("TRUNCATE TABLE sfa.ECERT_IMPORT");
                    vUpdate = "Yes";				
                    if(header.substring(0, 1).toUpperCase() !== "H") {    						
                        return res.json({flag: 0, data: 'There is no header record on this file'});       
                    } else {        						   
                        vSeqNum = Number(header.substring(1, 10));
                        if(isNaN(vSeqNum)) {							                    
                            return res.json({flag: 0, data: 'Invalid sequence number in header record: ' + header.substring(1, 10)})
                        } 
						
                        vProvince = header.substring(10, 12).replaceAll(' ', '');
                        //ORIGINALLY THIS IF CHECKS V_ORIGINATOR
                        if(vProvince !== "YT") {							
                            return res.json({flag: 0, data: 'File is not intended for Yukon by for: '+ vProvince})
                        } else {							
                            vOriginator = header.substring(12, 15).replaceAll(' ', '');                             
                            if(vOriginator !== '222') {								
                                return res.json({flag: 0, data: 'File has not been provided by the service provider (222) but by: '+ vOriginator})
                            } else {								
                                vCreateDate = moment(header.substring(15, 23), 'YYYYMMDD').format('YYYYMMDD');
                                if(vCreateDate === 'Invalid date') {									
                                    return res.json({flag: 0, data: 'Invalid creation date/time in header record: '+ header.substring(15, 23)});
                                }   								
                                vTitle = header.substring(23, 63).toUpperCase().replaceAll(' ', '');
                                if(vTitle !== "ENTITLEMENTFEEDBACK") {									
                                    return res.json({flag: 0, data: 'File is not a ECERT Received file:' + header.substring(7, 47)});
                                }                        								
                            }
                        }
                    }

					const selectCountDisbursement = await db("sfa.disbursement").select(db.raw("COUNT (*) AS count"))
					.where("csl_cert_seq_number", "=", vSeqNum)
					.andWhere(db.raw("disbursement_type_id IN (4, 3)"))					
					.andWhereNot(db.raw("ecert_sent_date IS NULL"))					
					.andWhere("issue_date", ">", "2013-01-01");
					
					vCount = selectCountDisbursement[0].count;					

					if((vCount === null || vCount === undefined ? 0 : vCount) !== 0) {						
						const selectCountAndDateDisbursement = await db("sfa.disbursement").select(db.raw("ecert_sent_date AS date, COUNT (*) AS count"))
						.where("csl_cert_seq_number", "=", vSeqNum)
						.andWhere(db.raw("disbursement_type_id IN (4, 3)"))					
						.andWhereNot(db.raw("ecert_sent_date IS NULL"))					
						.andWhere("issue_date", ">", "2013-01-01")
						.groupBy("ecert_sent_date");
						
						vEcertSentDate = selectCountAndDateDisbursement[0].date; 
						vCount = selectCountAndDateDisbursement[0].count;
					} 

                    for(let i = 1; i < linesContent.length; i++) {						
                        vErrorMsg = "";
                        vIsResend = 'No';

                        let currentLine = linesContent[i];
                        if(currentLine.substring(0, 1) === "D") {							
                            vSin = currentLine.substring(1, 10).replaceAll(' ','');							
                            vCslAmount =  currentLine.substring(358, 364).replaceAll(' ','');
                            vCertNumber =  currentLine.substring(367, 375).replaceAll(' ','');
                            vStatus =  currentLine.substring(391, 392).replaceAll(' ','');
                            vErrorCode1 =  currentLine.substring(612, 622).replaceAll(' ','');
                            vErrorCode2 =  currentLine.substring(622, 632).replaceAll(' ','');
                            vErrorCode3 =  currentLine.substring(632, 642).replaceAll(' ','');
                            vErrorCode4 =  currentLine.substring(642, 652).replaceAll(' ','');
                            vErrorCode5 =  currentLine.substring(652, 662).replaceAll(' ','');								
							
							vNumSin = Number(vSin);
							if(isNaN(vNumSin)) {								
								if(vErrorMsg.length > 1) {
									vErrorMsg = vErrorMsg + ', ';									
								}
								vErrorMsg = vErrorMsg + 'SIN is not numeric. ';
								vNumSin = 0;
								vNonNumericSin = vNonNumericSin + 1;
							}																					

							if(vCertNumber === '') {								
								if(vErrorMsg.length > 1) {
									vErrorMsg = vErrorMsg + ', ';
								}
								vErrorMsg = vErrorMsg + ' Certificate Number is missing. ';
							} else {								
								vCslAmountNum = Number(vCslAmount) + 0;								
								if(isNaN(vCslAmountNum)) {									
									if(vErrorMsg.length > 1) {
										vErrorMsg = vErrorMsg + ', ';									
									}
									vErrorMsg = vErrorMsg + 'CSL Amount is non numeric';
								} else {																
									if(vStatus === "N") {										
										vCslAmountNum = vCslAmountNum * -1;
									}
								}								
								
								vDisbursementId = await db("sfa.disbursement").select("id")
								.whereIn("disbursement_type_id", [3, 4])		
								.andWhere("transaction_number", "=", vCertNumber)
								.andWhere("csl_cert_seq_number", "=", vSeqNum)
								.andWhere("disbursed_amount", "=", vCslAmountNum)		
								.first();
								
																
								if(!vDisbursementId || !vDisbursementId.id) {									
									return res.json({flag: 2, data: 'No records found with transaction number: ' + vCertNumber + ", CSL Cert Number: " + vSeqNum + ", or disbursed amount: " + vCslAmountNum, date: vEcertSentDate, seq: vSeqNum});								
								}
							}					

							if(vSin === "") {								
								if(vErrorMsg.length > 1) {
									vErrorMsg = vErrorMsg + ', ';									
								}
								vErrorMsg = vErrorMsg + ' SIN is missing. ';
							}							

							if(vStatus === "") {								
								if(vErrorMsg.length > 1) {
									vErrorMsg = vErrorMsg + ', ';									
								}
								vErrorMsg = vErrorMsg + ' Status code is missing. ';
							}							
														
							if(vErrorCode1 === "") {								
								if(vErrorMsg.length > 1) {
									vErrorMsg = vErrorMsg + ', ';									
								}
								vErrorMsg = vErrorMsg + ' First error code is missing. ';
							} else {								
								let result;
								try {
									result  = await db.raw(
										'DECLARE @is_resend_p VARCHAR(255), @error_id_p INT; ' +
										`EXEC sfa.sp_check_error_status '${vErrorCode1.replaceAll("\r", '')}', ${vDisbursementId.id}, @is_resend_p OUTPUT, @error_id_p OUTPUT; ` +
										'SELECT @is_resend_p as is_resend_p, @error_id_p as error_id_p;'									
										);	
										
								} catch (error: any) {
									console.log(error);
									return res.json({flag: 0, data: 'Something went wrong, please contact the administrator. '});
								}
									
								
								is_resend_p = result[0].is_resend_p;
								error_id_p = result[0].error_id_p;		

								if(error_id_p !== -1) {
									vErrorDesc = await getErrorDesc(error_id_p);								
									vErrorMsg = vErrorMsg + ' ' + `${vErrorDesc !== "-1" ? vErrorDesc : ""}`;
								}
							}	
																					
							if(vErrorCode2.length > 1) {									
								let result;
								try {
								result = await db.raw(
									'DECLARE @is_resend_p VARCHAR(255), @error_id_p INT; ' +
									`EXEC sfa.sp_check_error_status '${vErrorCode2.replaceAll("\r", '')}', ${vDisbursementId.id}, @is_resend_p OUTPUT, @error_id_p OUTPUT; ` +
									'SELECT @is_resend_p as is_resend_p, @error_id_p as error_id_p;'
								  );									
								} catch (error: any) {	
									console.log(error);								
									return res.json({flag: 0, data: 'Something went wrong, please contact the administrator. '});
								} 
								is_resend_p = result[0].is_resend_p;
								error_id_p = result[0].error_id_p;																			

								if(vErrorMsg.length > 1) {
									vErrorMsg = vErrorMsg + ', ';									
								}

								if(error_id_p !== -1) {
									vErrorDesc = await getErrorDesc(error_id_p);								
									vErrorMsg = vErrorMsg + ' ' + `${vErrorDesc !== "-1" ? vErrorDesc : ""}`;						
								}

								if(is_resend_p === 1) {
									vIsResend = is_resend_p;
								}								
							} 								
							
							if(vErrorCode3.length > 1) {								
								let result;
								try {													
								result = await db.raw(
									'DECLARE @is_resend_p VARCHAR(255), @error_id_p INT; ' +
									`EXEC sfa.sp_check_error_status '${vErrorCode3.replaceAll("\r", '')}', ${vDisbursementId.id}, @is_resend_p OUTPUT, @error_id_p OUTPUT; ` +
									'SELECT @is_resend_p as is_resend_p, @error_id_p as error_id_p;'									
								  );
								} catch (error: any) {									
									console.log(error);
									return res.json({flag: 0, data: 'Something went wrong, please contact the administrator. '});
								} 

								is_resend_p = result[0].is_resend_p;
								error_id_p = result[0].error_id_p;		

								if(vErrorMsg.length > 1) {
									vErrorMsg = vErrorMsg + ', ';
								}

								if(error_id_p !== -1) {
									vErrorDesc = await getErrorDesc(error_id_p);								
									vErrorMsg = vErrorMsg + ' ' + `${vErrorDesc !== "-1" ? vErrorDesc : ""}`;
								}

								if(is_resend_p === 1) {
									vIsResend = is_resend_p;
								}	
							}							
							
							if(vErrorCode4.length > 1) {								
								let result;
								try {
								result = await db.raw(
									'DECLARE @is_resend_p VARCHAR(255), @error_id_p INT; ' +
									`EXEC sfa.sp_check_error_status '${vErrorCode4.replaceAll("\r", '')}', ${vDisbursementId.id}, @is_resend_p OUTPUT, @error_id_p OUTPUT; ` +
									'SELECT @is_resend_p as is_resend_p, @error_id_p as error_id_p;'									
								  );
								} catch (error: any) {		
									console.log(error);							
									return res.json({flag: 0, data: 'Something went wrong, please contact the administrator. '});
								} 

								is_resend_p = result[0].is_resend_p;
								error_id_p = result[0].error_id_p;		

								if(vErrorMsg.length > 1) {
									vErrorMsg = vErrorMsg + ', ';
								}

								if(error_id_p !== -1) {
									vErrorDesc = await getErrorDesc(error_id_p);								
									vErrorMsg = vErrorMsg + ' ' + `${vErrorDesc !== "-1" ? vErrorDesc : ""}`;
								}

								if(is_resend_p === 1) {
									vIsResend = is_resend_p;
								}	
							}							
							
							if(vErrorCode5.length > 1) {								
								let result;
								try {
								result = await db.raw(
									'DECLARE @is_resend_p VARCHAR(255), @error_id_p INT; ' +
									`EXEC sfa.sp_check_error_status '${vErrorCode5.replaceAll("\r", '')}', ${vDisbursementId.id}, @is_resend_p OUTPUT, @error_id_p OUTPUT; ` +
									'SELECT @is_resend_p as is_resend_p, @error_id_p as error_id_p;'									
								  );
								} catch (error: any) {		
									console.log(error);							
									return res.json({flag: 0, data: 'Something went wrong, please contact the administrator. '});
								} 

								is_resend_p = result[0].is_resend_p;
								error_id_p = result[0].error_id_p;		

								if(vErrorMsg.length > 1) {
									vErrorMsg = vErrorMsg + ', ';
								}

								if(error_id_p !== -1) {
									vErrorDesc = await getErrorDesc(error_id_p);								
									vErrorMsg = vErrorMsg + ' ' + `${vErrorDesc !== "-1" ? vErrorDesc : ""}`;
								}

								if(is_resend_p === 1) {
									vIsResend = is_resend_p;
								}	
							}							
							
							try {
								const insertEcertImport = await db.raw(`
								EXEC sfa.sp_insert_ecert_import 
								${vSeqNum ? `'${vSeqNum}'` : null},
								${vEcertSentDate ? `'${moment(vEcertSentDate).format('YYYY-MM-DD')}'` : null},
								${vSin ? `'${vSin}'` : null},
								${vCertNumber ? `'${vCertNumber}'` : null},
								${vCreateDate ? `'${vCreateDate}'` : null},
								${vIsResend ? `'${vIsResend}'` : null},
								${vErrorMsg ? `'${vErrorMsg}'` : null},
								${vDisbursementId.id ? vDisbursementId.id : null};
								`);		
							} catch (error:any) {
								console.log(error);
								return res.json({flag: 0, data: 'Something went wrong, please contact the administrator. 0'});
							}														
							vTotalSin = vTotalSin + vNumSin;
							vRejectedCount = vRejectedCount + 1;											
                        } else if(currentLine.substring(0, 1).toUpperCase() === "T") {							
							vAcceptedTot = Number(currentLine.substring(1, 10).replaceAll(' ', ''));

							if(isNaN(vAcceptedTot)) {								
								return res.json({flag: 0, data: 'Trailer accepted count is non numeric' + currentLine.substring(1, 10).replaceAll(' ', '')});
							}							
							vRejectedTot = Number(currentLine.substring(10, 19).replaceAll(' ', ''));	

							if(isNaN(vRejectedTot)) {								
								return res.json({flag: 0, data: 'Trailer rejected count is non numeric: '+ currentLine.substring(10, 19).replaceAll(' ', '')});
							}							
							if(vRejectedTot !== vRejectedCount)  {								
								return res.json({flag: 0, data: 'Trailer rejected count does not equal total rejected records: Trailer - ' + Number(currentLine.substring(43, 52).replaceAll(' ', '') + ' Rejected Count - '+ vRejectedCount)});
							}								
							vPaperTot = Number(currentLine.substring(19, 28).replace(' ', ''));
							if(isNaN(vPaperTot)) {								
								return res.json({flag: 0, data: 'Trailer paper enrollment count is non numeric: ' + currentLine.substring(19, 28).replace(' ', '')});
							}							
							vTotal = vAcceptedTot + vRejectedTot + vPaperTot;

							if(vTotal !== vCount && vCount !== vRejectedTot) {								
								return res.json({flag: 0, data: 'Trailer accepted/rejected/paper enrollment count does not equal total records sent: Trailer - ' + vTotal + ' Record sent - '+ vCount});
							}							

							if(isNaN(Number(currentLine.substring(52, 67).replaceAll(' ', '')))) {								
								return res.json({flag: 0, data: 'Trailer SIN hash is non numeric : ' + currentLine.substring(52, 67).replaceAll(' ', '')});
							}							

							if(Number(currentLine.substring(52, 67).replaceAll(' ', '')) !== vTotalSin) {								
								return res.json({flag: 0, data: 'Trailer SIN hash total does not equal total of detail records: Trailer - ' + Number(currentLine.substring(52, 67).replaceAll(' ', '')) + ' Record SIN - ' + vTotalSin + '. SIN non-numeric count was: ' + vNonNumericSin});
							}							
						} else {							
							null;
						}
                    }						
					responseRead = ({flag: 1, data: 'CSL ECERT response read complete. ' + vAcceptedTot + ' accepted records processed, '+ vRejectedTot + ' rejected records processed and ' + vPaperTot + ' paper enrollment records processed.', date: vEcertSentDate, seq: vSeqNum});				

                } else {					
                    return res.json({flag: 0, data: 'Please try again with the complete filename'});   
                }
								
				if(!vEcertSentDate) {
					vEcertSentDate = null;
				}				
				
				try {
					const execSPDisbursementById = await db.raw("EXEC sfa.sp_update_disbursement_by_id");					
				} catch (error: any) {
					return res.json({flag: 0, data: 'Something went wrong, please contact the administrator. '});
				}
				try {
					const execSPDisbursementBySeq = await db.raw(`EXEC sfa.sp_update_disbursement_by_seq ${vCreateDate ? `'${moment(vCreateDate, 'YYYYMMDD').format("YYYY-MM-DD")}'` : null}, ${vSeqNum}, ${vEcertSentDate ? `'${moment(vEcertSentDate, 'YYYYMMDD').format("YYYY-MM-DD")}'` : null}`);					
				} catch(error: any) {
					return res.json({flag: 0, data: 'Something went wrong, please contact the administrator. '});
				}
												
				const count = await db.raw("SELECT COUNT(*)	AS count FROM SFA.msfaa_import;")				
				if(count === null || count === 0) {
					return res.json({flag: 0, data: 'There are no MSFAA Received records found.'});					
				} else {					
					responseRead.data = responseRead.data + ' CSL ECERT response update complete. ' + vCount + ' records processed.'					
					
					const queryPDF = await db("sfa.ecert_import AS ei")
					.select("ei.sequence_number", "ei.sin", "ei.ecert_sent_date", "ei.response_date", "ei.certificate_number", db.raw("CASE WHEN ei.is_resend_flg = 'Yes' THEN 'Rejected' ELSE 'Warning' END AS ecert_status"), db.raw("ei.error_message + ISNULL((SELECT CONCAT(FIRST_NAME, ' ', LAST_NAME) FROM sfa.person WHERE SIN = ei.SIN), ' No Student Match') + ISNULL((SELECT DISTINCT transaction_number FROM sfa.disbursement WHERE transaction_number = ei.certificate_number AND ecert_sent_date = ei.ecert_sent_date), ' No CSL Certificate Match') AS error_message"), db.raw(`ISNULL((SELECT CONCAT(FIRST_NAME, ' ', LAST_NAME) FROM sfa.person WHERE SIN = ei.SIN), '') AS student_name`))
					.orderBy('ei.sin');									

					let finalResponse = {...responseRead, tableData: queryPDF};

					return res.json(finalResponse)
				}
				

            } else {				
                return res.json({flag: 0, data: 'You need to enter a filename'});               
            }			
        } catch (error: any) {
            console.log(error);
            return res.status(404).send();
        }        
});
