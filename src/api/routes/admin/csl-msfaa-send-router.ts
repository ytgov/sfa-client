import express, { Request, Response } from "express";
import knex from "knex";
import { body, param } from "express-validator";
import { DB_CONFIG } from "../../config";
import moment from "moment";
import NodeMailer from 'nodemailer'
const db = knex(DB_CONFIG);

export const cslMsfaaSendRouter = express.Router();

cslMsfaaSendRouter.get("/:EXPORT_DATE/:SEQ_NUM/:FLAG", 
    [                                  
		param("FLAG").notEmpty(),  
    ],     
    async (req: Request, res: Response) => {     		
        let { EXPORT_DATE, SEQ_NUM, FLAG } = req.params;    		 		
        try {  
			let test = "A"

            let v_filename;
            let v_send_date;
            let v_send_time;
            let v_mailing;
            let v_out_record;
            let v_count = 0;
            let v_total_sin = 0;
            let v_mailing_address1;
            let v_mailing_address2;
            let v_mailing_city;
            let v_mailing_province;
            let v_home_province;
            let v_mailing_phone;
            let v_mailing_postal_code;
            let v_home_postal_code;
            let v_mailing_country;
            let v_mailing_email;
            let v_home_phone;
            let v_msfaa_status;
            let v_seq_num;
            let v_email_sent = 'No Emails sent.';
            let v_rec_count;
            let okMessage;
            let badMessage;
                                        
            let nextVal = await db.select(db.raw(`NEXT VALUE FOR sfa.msfaa_sent_seq AS nextVal;`));            
            let msfaa_view_select;               			           
			v_send_date = moment(new Date).format('YYYYMMDD');
		    v_send_time = moment(new Date).format('HH:ss');            
            			
			v_filename = 'PPYT.EDU.MSFA.SENT.' + v_send_date + nextVal[0].nextVal;

            v_out_record = '100' + 'YT  ' + 'MSFAA SENT'.padEnd(40, ' ') + v_send_date + v_send_time +  nextVal[0].nextVal.padStart(6, '0') + ' ' + '\n';

            if(FLAG === '0') {			
                msfaa_view_select = await db("sfa.vw_msfaa_send")
                .select(db.raw("'200' as record_type"), "agreement_num_init", "agreement_number", "sin", db.raw("'P' as status_code"), "institution_code", "date_of_birth", "date_produced", "last_name", "first_name", "initials", "gender", "marital_status", "home_address1", "home_address2", "home_city", "home_province", "home_province_id", "home_postal_code", "home_country", "home_phone", "home_email", "mailing_address1", "mailing_address2", "mailing_city", "mailing_province", "mailing_province_id", "mailing_postal_code", "mailing_country", "school_phone", "school_email", "sent_date", "sent_seq_number", "part_full_time")
                .whereNull("sent_date")
                .andWhere("msfaa_status", "=", "Pending")      	
                v_rec_count = await db("sfa.vw_msfaa_send").select(db.raw("COUNT(*)")).whereNull("sent_date").andWhere("msfaa_status", "=", "Pending");	
                
                if(v_rec_count[0].count < 1) {                    
                    badMessage =  ' There are no MSFAAs to Send, Header and Trailer still written'; 
                } else {
                    for(let col of msfaa_view_select) { 						  											
                        v_home_phone = col.home_phone ? col.home_phone.replace(/-/g, '').replace(/\(/g, '').replace(/\)/g, '').substring(0, 20) : '';

                        if(col.home_province_id && col.home_province_id >= 1 && col.home_province_id <= 13) {
                            v_home_province = col.home_province ? col.home_province.substring(0, 2) : '';
                            v_home_postal_code = col.home_postal_code ? col.home_postal_code.substring(0, 6) : '';
                        } else {
                            v_home_province = col.home_province ? col.home_province.substring(0, 4) : '';
                            v_home_postal_code = col.home_postal_code ? col.home_postal_code.substring(0, 16) : '';	
                        }

                        if(!col.mailing_address1) {
                            v_mailing_address1 =  col.home_address1 ? col.home_address1.substring(0, 40) : '';
                            v_mailing_address2 =  col.home_address2 ? col.home_address2.substring(0, 40) : '';
                            v_mailing_city =  col.home_city ? col.home_city.substring(0, 25) : '';
                            v_mailing_province =  v_home_province ? v_home_province : '';
                            v_mailing_postal_code =  v_home_postal_code ? v_home_postal_code : '';
                            v_mailing_phone =  v_mailing_phone ? v_home_phone.substring(0, 20) : '';
                            v_mailing_country =  v_mailing_country ? col.home_country.substring(0, 20) : '';
                            v_mailing_email =  v_mailing_email ? col.home_email.substring(0, 70) : '';                             
                        } else {
                            v_mailing_address1 = col.mailing_address1 ? col.mailing_address1.substring(0,40) : '';
                            v_mailing_address2 = col.mailing_address2 ? col.mailing_address2.substring(0,40) : '';
                            v_mailing_city = col.mailing_city ? col.mailing_city.substring(0,25) : '';

                            if(col.mailing_province_id && col.mailing_province_id >= 1 && col.mailing_province_id <= 13) {
                                v_mailing_province = col.mailing_province ? col.mailing_province.substring(0,2) : '';
                                v_mailing_postal_code = col.mailing_postal_code ? col.mailing_postal_code.substring(0,6) : '';
                            } else {
                                v_mailing_province = col.mailing_province ? col.mailing_province.substring(0,4) : '';
                                v_mailing_postal_code = col.mailing_postal_code ? col.mailing_postal_code.substring(0,16) : '';		
                            }

                            v_mailing_phone = col.school_phone ? col.school_phone.replace(/-/g, '').replace(/\(/g, '').replace(/\)/g, '').substring(0, 20) : '';
                            
                            v_mailing_country = col.mailing_country ? col.mailing_country.substring(0,20) : '';
                            v_mailing_email = col.school_email ? col.school_email.substring(0,70) : '';	                           
                        }

                        v_out_record = 
						v_out_record +
                        '200' +
                        (col.agreement_num_init ? col.agreement_num_init :  '').toString().padStart(1, '0') +
                        (col.agreement_number ? col.agreement_number :  '').toString().padStart(9, '0') +
                        (col.sin ? col.sin :  ' ').padEnd(9, ' ') +
                        (col.status_code ? col.status_code :  '').padEnd(1, ' ') +
                        (col.institution_code ? col.institution_code :  '').padEnd(4, ' ') +
                        (col.date_of_birth ? col.date_of_birth :  ' ').padStart(8, '0') +
                        (col.date_produced ? col.date_produced :  ' ').padStart(8, '0') +
                        (col.last_name ? col.last_name :  '').padEnd(25, ' ') +
                        (col.first_name ? col.first_name :  '').padEnd(15, ' ') +
                        (col.initials ? col.initials :  '').padEnd(3, ' ') +
                        (col.gender ? col.gender :  '').padEnd(1, ' ') +
                        (col.marital_status ? col.marital_status :  '').padEnd(1, ' ') +
                        (v_mailing_address1 ? v_mailing_address1 :  ' ').padEnd(40, ' ') +
                        (v_mailing_address2 ? v_mailing_address2 :  ' ').padEnd(40, ' ') +
                        (v_mailing_city ? v_mailing_city :  ' ').padEnd(25, ' ') +
                        (v_mailing_province ? v_mailing_province :  ' ').padEnd(4, ' ') +
                        (v_mailing_postal_code ? v_mailing_postal_code :  ' ').padEnd(16, ' ') +
                        (v_mailing_country ? v_mailing_country :  ' ').padEnd(20, ' ') +
                        (v_mailing_phone ? v_mailing_phone :  ' ').padStart(20, '0') +
                        (v_mailing_email ? v_mailing_email :  ' ').padEnd(70, ' ') +
                        (col.home_address1 ? col.home_address1 :  ' ').substring(0, 40).padEnd(40, ' ') +
                        (col.home_address2 ? col.home_address2 :  ' ').substring(0, 40).padEnd(40, ' ') +
                        (col.home_city ? col.home_city :  ' ').substring(0, 25).padEnd(25, ' ') +
                        (v_home_province ? v_home_province :  ' ').substring(0, 4).padEnd(4, ' ') +
                        (v_home_postal_code ? v_home_postal_code :  ' ').substring(0, 16).padEnd(16, ' ') +
                        (col.home_country ? col.home_country : ' ').substring(0, 20).padEnd(20, ' ') +
                        (v_home_phone ? v_home_phone : ' ').padStart(20, '0') +
                        (col.part_full_time ? col.part_full_time :  'FT').padEnd(2, ' ') +
                        ' ' + '\n';

                        v_count = v_count + 1;
                        v_total_sin = v_total_sin + Number((col.sin ? col.sin : 0));
                						
                        let sp_msfaa_send = await db.raw(`EXEC sfa.sp_update_msfa_send ${nextVal[0].nextVal}, ${col.agreement_number ? col.agreement_number : -1};`);  						             
                    }								
					const exec_insert_communication_log_from_msfaa = await db.raw(`EXEC sfa.sp_insert_communication_log_from_msfaa ${SEQ_NUM}`);
                }
			} else {	
                msfaa_view_select = await db("sfa.vw_msfaa_send")
                .select(db.raw("'200' as record_type"), "agreement_num_init", "agreement_number", "sin", db.raw("'P' as status_code"), "institution_code", "date_of_birth", "date_produced", "last_name", "first_name", "initials", "gender", "marital_status", "home_address1", "home_address2", "home_city", "home_province", "home_province_id", "home_postal_code", "home_country", "home_phone", "home_email", "mailing_address1", "mailing_address2", "mailing_city", "mailing_province", "mailing_province_id", "mailing_postal_code", "mailing_country", "school_phone", "school_email", "sent_date", "sent_seq_number", "part_full_time")
                .where("sent_date", "=", moment(EXPORT_DATE).format('YYYY-MM-DD'))
                .andWhere("sent_seq_number", "=", SEQ_NUM)                
                .andWhere("msfaa_status", "=", "Pending")
                            
				for(let col of msfaa_view_select) {							
					v_home_phone =  col.home_phone ? col.home_phone.replace(/-/g, '').replace(/\(/g, '').replace(/\)/g, '').substring(0, 20) : '';

					if(col.home_province_id && col.home_province_id >= 1 && col.home_province_id <= 13) {
						v_home_province = col.home_province ? col.home_province.substring(0, 2) : '';
						v_home_postal_code = col.home_postal_code ? col.home_postal_code.substring(0, 6) : '';
					} else {
						v_home_province = col.home_province ? col.home_province.substring(0, 4) : '';
						v_home_postal_code = col.home_postal_code ? col.home_postal_code.substring(0, 16) : '';	
					}

					if(!col.mailing_address1) {
						v_mailing_address1 =  col.home_address1 ? col.home_address1.substring(0, 40) : '';
						v_mailing_address2 =  col.home_address2 ? col.home_address2.substring(0, 40) : '';
						v_mailing_city =  col.home_city ? col.home_city.substring(0, 25) : '';
						v_mailing_province =  v_home_province ? v_home_province : '';
						v_mailing_postal_code =  v_home_postal_code ? v_home_postal_code : '';
						v_mailing_phone =  v_home_phone ? v_home_phone.substring(0, 20) : '';
						v_mailing_country =  col.home_country ? col.home_country.substring(0, 20) : '';
						v_mailing_email =  col.home_email ? col.home_email.substring(0, 70) : '';                             
					} else {
						v_mailing_address1 = col.mailing_address1 ? col.mailing_address1.substring(0,40) : '';
						v_mailing_address2 = col.mailing_address2 ? col.mailing_address2.substring(0,40) : '';
						v_mailing_city = col.mailing_city ? col.mailing_city.substring(0,25) : '';

						if(col.mailing_province_id && col.mailing_province_id >= 1 && col.mailing_province_id <= 13) {
							v_mailing_province = col.mailing_province ? col.mailing_province.substring(0,2) : '';
							v_mailing_postal_code = col.mailing_postal_code ? col.mailing_postal_code.substring(0,6) : '';
						} else {
							v_mailing_province = col.mailing_province ? col.mailing_province.substring(0,4) : '';
							v_mailing_postal_code = col.mailing_postal_code ? col.mailing_postal_code.substring(0,16) : '';		
						}

						v_mailing_phone = col.school_phone.replace(/-/g, '').replace(/\(/g, '').replace(/\)/g, '').substring(0, 20);
						
						v_mailing_country = col.mailing_countr ? col.mailing_country.substring(0,20) : '';
						v_mailing_email = col.school_email ? col.school_email.substring(0,70) : '';	                           
					}	

					v_out_record = 
					v_out_record + 
					'200' +
					(col.agreement_num_init ? col.agreement_num_init :  '').toString().padStart(1, '0') +
					(col.agreement_number ? col.agreement_number :  '').toString().padStart(9, '0') +
					(col.sin ? col.sin :  ' ').padEnd(9, ' ') +
					(col.status_code ? col.status_code :  'P').padEnd(1, ' ') +
					(col.institution_code ? col.institution_code :  '').padEnd(4, ' ') +
					(col.date_of_birth ? col.date_of_birth :  ' ').padStart(8, '0') +
					(col.date_produced ? col.date_produced :  ' ').padStart(8, '0') +
					(col.last_name ? col.last_name :  '').padEnd(25, ' ') +
					(col.first_name ? col.first_name :  '').padEnd(15, ' ') +
					(col.initials ? col.initials :  '').padEnd(3, ' ') +
					(col.gender ? col.gender :  '').padEnd(1, ' ') +
					(col.marital_status ? col.marital_status :  '').padEnd(1, ' ') +
					(v_mailing_address1 ? v_mailing_address1 :  ' ').padEnd(40, ' ') +
					(v_mailing_address2 ? v_mailing_address2 :  ' ').padEnd(40, ' ') +
					(v_mailing_city ? v_mailing_city :  ' ').padEnd(25, ' ') +
					(v_mailing_province ? v_mailing_province :  ' ').padEnd(4, ' ') +
					(v_mailing_postal_code ? v_mailing_postal_code :  ' ').padEnd(16, ' ') +
					(v_mailing_country ? v_mailing_country :  ' ').padEnd(20, ' ') +
					(v_mailing_phone ? v_mailing_phone :  ' ').padStart(20, '0') +
					(v_mailing_email ? v_mailing_email :  ' ').padEnd(70, ' ') +
					(col.home_address1 ? col.home_address1 :  ' ').substring(0, 40).padEnd(40, ' ') +
					(col.home_address2 ? col.home_address2 :  ' ').substring(0, 40).padEnd(40, ' ') +
					(col.home_city ? col.home_city :  ' ').substring(0, 25).padEnd(25, ' ') +
					(v_home_province ? v_home_province : ' ').substring(0, 4).padEnd(4, ' ') +
					(v_home_postal_code ? v_home_postal_code : ' ').substring(0, 16).padEnd(16, ' ') +
					(col.home_country ? col.home_country : ' ').substring(0, 20).padEnd(20, ' ') +
					(v_home_phone ? v_home_phone : ' ').padStart(20, '0') +
					(col.part_full_time ? col.part_full_time : 'FT').padEnd(2, ' ') +
					' ' + '\n';

					v_count = v_count + 1;
					v_total_sin = v_total_sin + Number((col.sin ? col.sin : 0));
								
					let sp_msfaa_send = await db.raw(`EXEC sfa.sp_update_date_msfa_send ${nextVal[0].nextVal}, '${moment(v_send_date, 'YYYYMMDD').format('YYYY-MM-DD')}', ${col.agreement_number ? col.agreement_number : -1};`);  
				}
			}

			v_out_record = v_out_record + '999' + 'MSFAA SENT'.padEnd(40, ' ') + String(v_count).padStart(9, '0') + String(v_total_sin).padStart(15, '0') + ' '.padEnd(533, ' ');
			
			let sp_system_parameter_send = await db.raw(`EXEC sfa.sp_update_system_parameter_send '${moment(new Date).format('YYYY-MM-DD HH:ss')}', ${nextVal[0].nextVal};`);   			
			
			okMessage = 'MSFAA export complete. ' + v_filename + ' has been saved.  ' + v_email_sent;
            
			nextVal = await db.select(db.raw(`NEXT VALUE FOR sfa.msfaa_sent_seq AS nextVal;`));  
			EXPORT_DATE = "";
            
			return res.json({flag: !badMessage ? 1 : 0, data: v_out_record, message: (badMessage ? badMessage + ". " : "") + okMessage, filename: v_filename}); 


                               
        } catch (error: any) {
            console.log(error);
            return res.status(404).send();
        }   		  
});


