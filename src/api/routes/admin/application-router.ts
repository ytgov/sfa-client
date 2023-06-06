import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import moment from "moment";
import knex from "knex";
import { DocumentService } from "../../services/shared";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";
import { Buffer } from 'buffer';
const db = knex(DB_CONFIG)
export const applicationRouter = express.Router();
export const portalStudentRouter = express.Router();
const documentService = new DocumentService();

applicationRouter.post("/",
    [body("studentId").notEmpty(), body("academicYear").notEmpty(), body("institutionId").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { studentId, academicYear, institutionId } = req.body;
        let existing = await db("sfa.application").where({ student_id: studentId, academic_year: academicYear, institution_id: institutionId }).count("* as count").first();


        let newApp = {
            student_id: parseInt(studentId),
            academic_year_id: academicYear,
            institution_id: parseInt(institutionId),
            program_division: 2,
            tuition_estimate: 0,
            prestudy_accom_code: 1,
            study_accom_code: 1,
            csl_classification: 1,
            prestudy_csl_classification: 1,
            outstanding_cslpt_amt: 0,
            prestudy_board_amount: 0,
            studty_board_amount: 0,
            parent1_income: 0,
            parent2_income: 0,
            parent1_tax_paid: 0,
            parent2_tax_paid: 0
        };

        let newRow = await db("sfa.application").insert(newApp).returning("*");

        if (newRow && newRow.length == 1) {
            return res.json({ data: { id: newRow[0].id }, messages: [{ text: "Application created", variant: "success" }] });
        }
        else {
            return res.json({ messages: [{ text: "This record appears to already exist", variant: "error" }] })
        }
    });

applicationRouter.post("/:history_detail_id/duplicate",
    [param("history_detail_id").notEmpty(), body("studentId").notEmpty(), body("academicYear").notEmpty(), body("institutionId").notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {
        let { studentId, academicYear, institutionId } = req.body;
        let existing = await db("sfaadmin.history_detail").where({ student_id: studentId, academic_year: academicYear, institution_id: institutionId }).count("* as count").first();
        let count = existing?.count;

        if (count == 0) {
            let tries = 5;
            let nextId = (await db("sfaadmin.history_detail").max("history_detail_id as max").first())?.max;

            while (tries > 0) {
                nextId++;
                tries--;

                let newApp = {
                    rowid: db.raw("newid()"),
                    student_id: parseInt(studentId),
                    academic_year: academicYear,
                    institution_id: parseInt(institutionId),
                    history_detail_id: parseInt(nextId),
                    program_division: 2,
                    tuition_estimate: 0,
                    prestudy_accom_code: 1,
                    study_accom_code: 1,
                    csl_classification: 1,
                    prestudy_csl_classification: 1,
                    outstanding_cslpt_amt: 0,
                    prestudy_board_amount: 0,
                    studty_board_amount: 0,
                    parent1_income: 0,
                    parent2_income: 0,
                    parent1_tax_paid: 0,
                    parent2_tax_paid: 0
                };

                try {
                    let newRow = await db("sfaadmin.history_detail").insert(newApp).returning("*");

                    if (newRow && newRow.length == 1) {
                        return res.json({ data: { id: newApp.history_detail_id }, messages: [{ text: "Application created", variant: "success" }] });
                    }
                }
                catch (e) {
                    console.log("ERROR", e)
                    nextId = (await db("sfaadmin.history_detail").max("history_detail_id as max").first())?.max;
                }
            }

            return res.json({ messages: [{ text: "Failed to create application", variant: "error" }] });
        }
        else {
            return res.json({ messages: [{ text: "This record appears to already exist", variant: "error" }] })
        }
    });
    
applicationRouter.get("/:id",
    [param("id").notEmpty()], ReturnValidationErrors, async (req: Request, res: Response) => {
        let { id } = req.params;

        let application = await db("sfa.application")
        .select(
            "sfa.application.*"
        )
        .where({ id })
        .first();

        if (application) {
            let student = await db("sfa.student").where({ id: application.student_id }).first();
            application.prev_pre_leg_weeks = application.prev_pre_leg_weeks ?? 22;
            application.funded_years_used_preleg_chg = application.funded_years_used_preleg_chg ?? 22;

            application.incomes = await db("sfa.income").where({ application_id: id });
            application.expenses = await db("sfa.expense").where({ application_id: id });
            application.disabilities = await db("sfa.disability").where({ application_id: id });
            application.disability_services = await db("sfa.disability_requirement").where({ application_id: id });
            application.disability_equipments = await db("sfa.equipment_required").where({ application_id: id });
            application.funding_requests = await db("sfa.funding_request").where({ application_id: id }).orderBy("received_date");
            application.parent_dependents = await db("sfa.parent_dependent").where({ application_id: id }).orderBy("birth_date");
            application.requirements = await db("sfa.requirement_met").where({ application_id: id }).orderBy("completed_date");
            application.other_funding = await db("sfa.agency_assistance").where({ application_id: id }).orderBy("id");
            application.yea = await db("sfa.yea").where({ yukon_id: student.yukon_id }).orderBy("school_year");
            application.institution = await db("sfa.institution_campus").where({ id: application.institution_campus_id }).first();
            application.warning_code = await db("sfa.application as app").innerJoin("sfa.csl_code as warning", function () {
                this.on("warning.id", "=", "csl_restriction_warn_id");
            }).select(
                "app.id",
                "csl_restriction_reason_id",
                "csl_restriction_warn_id",
                "warning.warning_code",
                "warning.code_type",
                "warning.definition"
            ).where("app.id", id).first();
            application.fileRef = await db("sfa.file_reference").select().where({ application_id: id}).andWhere({student_id: application.student_id});    
            
            //SELECT request_type_id  FROM sfa.funding_request  where application_id = 6049
            application.subDocumentation = await db("sfa.funding_request").select("request_type_id").where("application_id", id);

            const subquery = [];
            if(application.subDocumentation) {
                for(let element of application.subDocumentation) {
                    subquery.push(element.request_type_id)
                }
            }
                         
            application.docCatalog = await db("sfa.requirement_type");
            
            application.documentation = await db("sfa.request_requirement as doc")
            .innerJoin("sfa.request_type as rt", function () {
                this.on("rt.id", "=", "doc.request_type_id");
            })
            .innerJoin("sfa.requirement_type as t", function () {
                this.on("t.id", "=", "doc.requirement_type_id");
            })
            .leftJoin("sfa.requirement_met as ds", function () {
                this.on("ds.requirement_type_id", "=", "t.id");
            })
            .leftJoin("sfa.file_reference as fr", function () {
                this.on("fr.requirement_type_id", "=", "t.id").andOn("fr.application_id", "=", "ds.application_id");
            }).select(
                "fr.object_key", 
                "fr.object_key_pdf",
                "fr.person_id",
                "fr.dependent_id",
                "fr.disability_requirement_id",
                //"fr.requirement_type_id",
                "t.id as requirement_type_id",//
                "ds.comment",
                "fr.mime_type",
                "t.description", 
                "fr.file_name", 
                "fr.upload_date", 
                "fr.status", 
                "ds.completed_date" 
            ).where("t.is_active", 1)     
            .andWhere("ds.application_id", id)      
            .andWhere(function () {
                this.whereIn('rt.id', function () {
                    //await db("sfa.funding_request").select("request_type_id").where("application_id", id)
                  this.select('request_type_id').from('sfa.funding_request').where('application_id', id)
                })
                .orWhereNotNull('fr.object_key')})

                /*
            .andWhere("ds.application_id", id)        
            //.whereIn("rt.id", application.subDocumentation)    
            .whereIn("rt.id", subquery).orWhereNotNull("fr.object_key");
            */
            /*.groupBy("fr.requirement_type_id",
                                      "ds.comment",
                                      "t.description",
                                      "fr.mime_type",
                                      "fr.file_name", 
                                      "ds.application_id", 
                                      "fr.upload_date", 
                                      "fr.status", 
                                      "ds.completed_date",
                                      "fr.person_id",
                                      "fr.dependent_id",
                                      "fr.disability_requirement_id",
                                      "fr.object_key", 
                                      "fr.object_key_pdf",);       */
            
            application.finalDocumentation = [];

            

              function refreshDocuments() {
                application.documentation.forEach((objX: any) => {
                    const foundObjZ = application.finalDocumentation.find((objZ: any) => objZ.requirement_type_id === objX.requirement_type_id);
                    if (foundObjZ) {
                      if (objX.upload_date > foundObjZ.upload_date) {
                        // Si el objeto de "X" tiene una fecha más actual, reemplazar el objeto en "Z"
                        const index = application.finalDocumentation.indexOf(foundObjZ);
                        application.finalDocumentation[index] = objX;
                      }
                    } else {
                      // Si el objeto de "X" no existe en "Z", agregarlo directamente
                      application.finalDocumentation.push(objX);
                    }
                  });
              }

              refreshDocuments();
              

            application.reason_code = await db("sfa.application as app").innerJoin("sfa.csl_code as reason", function () {
                this.on("reason.id", "=", "csl_restriction_reason_id");
                }).select(
                "app.id",
                "csl_restriction_reason_id",
                "csl_restriction_warn_id",
                "reason.reason_code",
                "reason.code_type",
                "reason.definition"
                ).where("app.id", id).first();

            application.parent1 = await db("sfa.person")
            .leftJoin("sfa.person_address", "sfa.person.id", "sfa.person_address.person_id")
            .select(
                "sfa.person.*",
                "sfa.person_address.id AS person_address_id",
                "sfa.person_address.address_type_id",
                "sfa.person_address.address1",
                "sfa.person_address.address2",
                "sfa.person_address.city_id",
                "sfa.person_address.country_id",
                "sfa.person_address.province_id",
                "sfa.person_address.postal_code",
            )
            .where("sfa.person.id", application.parent1_id )
            .orderBy( "sfa.person_address.address_type_id")
            .first();

            application.parent2 = await db("sfa.person").where({ id: application.parent2_id }).first();
            application.spouse_info = await db("sfa.person").where({ id: application.spouse_id }).first();
            application.agencies_assistance = await db("sfa.agency_assistance").where({ application_id: application.id });    
            application.courses_enrolled = await db("sfa.course_enrolled").where({ application_id: application.id });   

            for (let dep of application.parent_dependents) {
                if (dep.birth_date)
                    dep.birth_date = moment(dep.birth_date).add(7, 'hours').format("YYYY-MM-DD");
            }

            for (let dep of application.requirements) {
                if (dep.completed_date)
                    dep.completed_date = moment(dep.completed_date).add(7, 'hours').format("YYYY-MM-DD");
            }

            for (let dep of application.funding_requests) {
                if (dep.received_date)
                    dep.received_date = moment(dep.received_date).add(7, 'hours').format("YYYY-MM-DD");

                if (dep.status_date)
                    dep.status_date = moment(dep.status_date).add(7, 'hours').format("YYYY-MM-DD");
            }
            if (student) {
                student.consents = await db("sfa.student_consent").where({ student_id: application.student_id }).orderBy("start_academic_year_id");
                student.residences = await db("sfa.residence").where({ student_id: application.student_id }).orderBy("from_year").orderBy("from_month");
                student.dependents = await db("sfa.dependent").where({ student_id: application.student_id }).orderBy("birth_date");

                for (let dep of student.dependents) {
                    let elg = await db("sfa.dependent_eligibility").where({ application_id: id, dependent_id: dep.id }).first();
                    dep.eligibility = elg || {};

                    if (dep.birth_date)
                        dep.birth_date = moment(dep.birth_date).add(7, 'hours').format("YYYY-MM-DD");
                }

                student.applications = await db("sfa.application")
                    .innerJoin("sfa.institution_campus", "application.institution_campus_id", "institution_campus.id")
                    .innerJoin("sfa.institution", "institution_id", "institution_campus.institution_id")
                    .select("application.*").select("institution.name as institution_name")
                    .where({ student_id: student.id }).orderBy("academic_year_id", "desc");

                for (let item of student.applications) {
                    item.title = `${item.academic_year_id}: ${item.institution_name}`;
                }

                if (student.birth_date) {
                    student.birth_date = moment(student.birth_date).utc(false).format("YYYY-MM-DD");
                }

                application.student = student;
                return res.json({ data: application });
            }
        }

        res.status(404).send();
    });

applicationRouter.put("/:id",
    [param("id").notEmpty()], ReturnValidationErrors, async (req: Request, res: Response) => {
        let { id } = req.params;

        db("sfa.application").where({ id }).update(req.body)
            .then((result: any) => {
                res.json({ messages: [{ variant: "success", text: "Application saved" }] })
            })
            .catch((err: any) => {
                console.log("FAILED", err)
                res.json({ messages: [{ variant: "error", text: "Save failed" }] })
            });
    });

applicationRouter.post("/:application_id/status",
    [param("application_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { application_id } = req.params;
        const {
            request_type_id = null,
            received_date = null,
            status_id = null,
            status_reason_id = null,
            status_date = null,
            comments = null,
        } = req.body;

        try {
            const application: any = await db("sfa.application").where({ id: application_id }).first();

            if (application) {

                const newRecord = {
                    request_type_id,
                    received_date,
                    status_id,
                    status_reason_id,
                    status_date,
                    comments,
                };
                const checkIsActive = await db("sfa.request_type")
                    .where("id", request_type_id)
                    .first();

                const checkIfExist = await db("sfa.funding_request")
                    .where("request_type_id", request_type_id)
                    .where("application_id", application_id)
                    .first();

                if (checkIfExist) {
                    return res.json({ messages: [{ variant: "error", text: "A record already exist with the same information" }] });
                }

                if (checkIsActive?.is_active) {

                    const resInsert = await db("sfa.funding_request")
                    .insert({ ...newRecord, is_csg_only: false, application_id });

                    return resInsert ?
                        res.json({ messages: [{ variant: "success", text: "Saved" }] })
                        :
                        res.json({ messages: [{ variant: "error", text: "Failed" }] });

                } else {
                    res.json({ messages: [{ variant: "error", text: "Request Type is not active" }] });
                }
                

            }

            return res.json({ messages: [{ text: "Application does not exist", variant: "error" }] });

        } catch (error) {
            return res.json({ messages: [{ text: "Failed to insert Funding Request", variant: "error" }] });
        }

    }
);

// downloads a document      
    applicationRouter.get("/:application_id/student/:student_id/files/:file_type", async (req: Request, res: Response) => {          
    const { student_id, application_id, file_type } = req.params;    
 
    //* Ordenar descendente mas nuevo a mas viejo
    let doc:any = await db("sfa.file_reference").where({ application_id: application_id}).andWhere({student_id: student_id}).andWhere
    ({requirement_type_id: file_type}).orderBy("upload_date", "desc").first();   
    
    if(doc) {
        let fileReference = await documentService.getDocumentWithFile(doc.object_key);    
    
        if (
          fileReference &&
          fileReference.student_id == parseInt(student_id) &&
          fileReference.application_id == parseInt(application_id)
        ) {
          res.set("Content-disposition", "attachment; filename=" + fileReference.file_name);
          res.set("Content-type", fileReference.mime_type);
          return res.send(fileReference.file_contents);
        }
    }
   
      
    res.status(404).send();
  });

  
//uploads a document

/*
    applicationRouter.post(":application_id/student/:student_id/files/:requirement_type_id/obj_key/:objKey", async (req: Request, res: Response) => {     
        console.log("Hi");
        
        const { student_id, application_id } = req.params;
        const { requirement_type_id, disability_requirement_id, person_id, dependent_id } = req.body;
        console.log("Hi");
        let email = "michael@icefoganalytics.com"; //req.user.email;
    
        if (req.files) {
        let files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];
    
        for (let file of files) {
            await documentService.uploadApplicationDocument(email, student_id, application_id, file, requirement_type_id, disability_requirement_id, person_id, dependent_id);
        }
        return res.json({ message: "success" });
        }
        res.json({ error: "No files included in request" });        
        
        

    });
*/

applicationRouter.post("/:application_id/student/:student_id/files", async (req: Request, res: Response) => {       
    const { student_id, application_id } = req.params;
    const { requirement_type_id, disability_requirement_id, person_id, dependent_id } = req.body;
  
    
    let email = "michael@icefoganalytics.com"; //req.user.email;
  
    if (req.files) {
      let files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];
  
      for (let file of files) {
        await documentService.uploadApplicationDocument(email, student_id, application_id, file, requirement_type_id, disability_requirement_id, person_id, dependent_id);
      }      
      return res.json({ messages: [{ variant: "success", text: "Saved" }] })      
    }    
    res.json({ error: "No files included in request" });
  });




  // updates _met
  applicationRouter.post("/:application_id/student/:student_id/files/:requirement_type_id",
    [param("application_id").isInt().notEmpty(), param("student_id").isInt().notEmpty(), param("requirement_type_id").isInt().notEmpty()],
    ReturnValidationErrors,
    async (req: Request, res: Response) => {        
        try {
            const { application_id, student_id, requirement_type_id } = req.params;
            const { completed_date } = req.body;            
            const application: any = await db("sfa.file_reference").where({ application_id: application_id }).andWhere({ student_id: student_id }).andWhere({ requirement_type_id: requirement_type_id }).first();

            if (application) {

                const resInsert = await db("sfa.requirement_met")
                    .insert({ completed_date, requirement_type_id, application_id });
                
                return resInsert ?
                    res.json({ messages: [{ variant: "success", text: "Saved" }] })
                    :
                    res.json({ messages: [{ variant: "error", text: "Save failed" }] });

            }

            return res.status(404).send();

        } catch (error) {
            console.error(error);
            return res.status(400).send(error);
        }
    }
);

  /*
  
                :
                res.json({ messages: [{ variant: "error", text: "Failed" }] });

  */

  // downloads a document with extra parameters
        applicationRouter.get("/:application_id/student/:student_id/files/:file_type/fellow_type/:fellow_type/fellow/:fellow", async (req: Request, res: Response) => {                      
            
            const { student_id, application_id, file_type, fellow_type, fellow } = req.params;    
         
            
            let doc:any;
            switch(fellow_type) {
                case "dependent":                    
                    doc = await db("sfa.file_reference").where({ application_id: application_id}).andWhere({student_id: student_id}).andWhere
                    ({requirement_type_id: file_type}).andWhere({dependent_id: fellow}).orderBy("upload_date", "desc").first();                      
                    break;
                case "parent":
                    doc = await db("sfa.file_reference").where({ application_id: application_id}).andWhere({student_id: student_id}).andWhere
                    ({requirement_type_id: file_type}).andWhere({fellow_type: fellow}).orderBy("upload_date", "desc").first();   
                    break;
                
            }
            
            if(doc) {
                let fileReference = await documentService.getDocumentWithFile(doc.object_key);    
            
                if (
                  fileReference &&
                  fileReference.student_id == parseInt(student_id) &&
                  fileReference.application_id == parseInt(application_id)
                ) {
                  res.set("Content-disposition", "attachment; filename=" + fileReference.file_name);
                  res.set("Content-type", fileReference.mime_type);
                  return res.send(fileReference.file_contents);
                }
                  
            }
            
            res.status(404).send();
          });
          
  

applicationRouter.put("/:application_id/status/:id",
    [param("application_id").isInt().notEmpty(), param("id").isInt().notEmpty()],
    ReturnValidationErrors,
    async (req: Request, res: Response) => {        

        const { application_id, id } = req.params;
        const { data } = req.body;

        try {
            
            const resUpdate = await db("sfa.funding_request")
                .where({id, application_id})
                .update({ ...data });

            return resUpdate ?
                res.json({ messages: [{ variant: "success", text: "Saved" }] })
                :
                res.json({ messages: [{ variant: "error", text: "Failed" }] });


        } catch (error) {
            return res.json({ messages: [{ text: "Failed to update Funding Request", variant: "error" }] });
        }

    }
);


// applicationRouter.put("/:application_id/student/:student_id/files/:requirement_type_id",
//     [param("application_id").isInt().notEmpty(), param("student_id").isInt().notEmpty(), param("requirement_type_id").isInt().notEmpty()],
//     ReturnValidationErrors,
//     async (req: Request, res: Response) => {                
//         const { application_id, student_id, requirement_type_id } = req.params;
//         const { data } = req.body;        
//         try {
            
//             const resUpdate = await db("sfa.requirement_met")
//                 .where({application_id, requirement_type_id})
//                 .update({ ...data });                
//             return resUpdate ?
//                 res.json({ messages: [{ variant: "success", text: "Saved" }] })
//                 :
//                 res.json({ messages: [{ variant: "error", text: "Failed" }] });

            
//         } catch (error) {
//             return res.json({ messages: [{ text: "Failed to update Funding Request", variant: "error" }] });
//         }

//     }
// );



applicationRouter.put("/:application_id/files/:requirement_type_id",
    [param("application_id").isInt().notEmpty(), param("requirement_type_id").isInt().notEmpty()],
    ReturnValidationErrors,
    async (req: Request, res: Response) => {   
               
        const { application_id, requirement_type_id } = req.params;
        const { data } = req.body;        
        try {
            
            const resUpdate = await db("sfa.requirement_met")
                .where({application_id, requirement_type_id})
                .update({ ...data });                
            return resUpdate ?
                res.json({ messages: [{ variant: "success", text: "Saved" }] })
                :
                res.json({ messages: [{ variant: "error", text: "Failed" }] });

            
        } catch (error) {
            return res.json({ messages: [{ text: "Failed to update Funding Request", variant: "error" }] });
        }

    }
);


applicationRouter.put("/:application_id/student/:student_id/files/:requirement_type_id",
    [param("application_id").isInt().notEmpty(), param("student_id").isInt().notEmpty(), param("requirement_type_id").isInt().notEmpty()],
    ReturnValidationErrors,
    async (req: Request, res: Response) => {        
        // console.log("Status")        
        const { application_id, student_id, requirement_type_id } = req.params;
        const { data } = req.body;        
        try {
            
            const resUpdate = await db("sfa.file_reference")
                .where({application_id, requirement_type_id, student_id})
                .update({ ...data });                
            return resUpdate ?
                res.json({ messages: [{ variant: "success", text: "Saved" }] })
                :
                res.json({ messages: [{ variant: "error", text: "Failed" }] });

            
        } catch (error) {
            return res.json({ messages: [{ text: "Failed to update Funding Request", variant: "error" }] });
        }

    }
);

applicationRouter.delete("/:id/status",
    [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id } = req.params;
        try {

            const verifyRecord: any = await db("sfa.funding_request")
                .where({ id: id })
                .first();

            if (!verifyRecord) {
                return res.status(404).send({ messages: [{ variant: "error", text: "The record does not exits" }] });
            }

            const deleteRecord: any = await db("sfa.funding_request")
                .where({ id: id })
                .del();

            return (deleteRecord > 0) ?
                res.status(202).send({ messages: [{ variant: "success", text: "Removed" }] })
                :
                res.status(404).send({ messages: [{ variant: "error", text: "Record does not exits" }] });

        } catch (error: any) {

            console.log(error);

            if (error?.number === 547) {
                return res.status(409).send({ messages: [{ variant: "error", text: "Cannot be deleted because it is in use." }] });
            }

            return res.status(409).send({ messages: [{ variant: "error", text: "Error To Delete" }] });
        }
    }
);

applicationRouter.put("/:application_id/parent-dependent",
    [param("application_id").isInt().notEmpty()],
    ReturnValidationErrors,
    async (req: Request, res: Response) => {
        try {
            const { application_id } = req.params;
            const { data } = req.body;

            if (!Object.values(data).length || Object.values(data).some(v => v === null || v === undefined)) {
                return res.json({ messages: [{ variant: "error", text: "The value is required" }] });
            }

            const application: any = await db("sfa.application").where({ id: application_id }).first();

            if (application) {

                const resUpdate = await db("sfa.parent_dependent")
                    .where({ application_id })
                    .update({ ...data });
                
                return resUpdate > 0 ?
                    res.json({ messages: [{ variant: "success", text: "Saved" }] })
                    :
                    res.json({ messages: [{ variant: "error", text: "Save failed" }] });

            }

            return res.status(404).send();

        } catch (error) {
            console.error(error);
            return res.status(400).send(error);
        }
    }
);

applicationRouter.post("/:application_id/parent-dependent",
    [param("application_id").isInt().notEmpty()],
    ReturnValidationErrors,
    async (req: Request, res: Response) => {
        try {
            const { application_id } = req.params;
            const { data } = req.body;

            if (!Object.values(data).length) {
                return res.json({ messages: [{ variant: "error", text: "The value is required" }] });
            }

            const application: any = await db("sfa.application").where({ id: application_id }).first();

            if (application) {

                const resInsert = await db("sfa.parent_dependent")
                    .insert({ ...data, application_id });
                
                return resInsert ?
                    res.json({ messages: [{ variant: "success", text: "Saved" }] })
                    :
                    res.json({ messages: [{ variant: "error", text: "Save failed" }] });

            }

            return res.status(404).send();

        } catch (error) {
            console.error(error);
            return res.status(400).send(error);
        }
    }
);

applicationRouter.delete("/:id/parent-dependent", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;

        try {

            const verifyRecord: any = await db("sfa.parent_dependent")
                .where({ id: id })
                .first();

            if (!verifyRecord) {
                return res.status(404).send({ wasDelete: false, message: "The record does not exits" });
            }

            const deleteRecord: any = await db("sfa.parent_dependent")
                .where({ id: id })
                .del();

            return (deleteRecord > 0) ?
                res.status(202).send({ messages: [{ variant: "success", text: "Removed" }] })
                :
                res.status(404).send({ messages: [{ variant: "error", text: "Record does not exits" }] });

        } catch (error: any) {

            console.log(error);

            if (error?.number === 547) {
                return res.status(409).send({ messages: [{ variant: "error", text: "Cannot be deleted because it is in use." }] });
            }

            return res.status(409).send({ messages: [{ variant: "error", text: "Error To Delete" }] });
        }
    }
);

applicationRouter.post("/:application_id/person",
    [param("application_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        try {
            const { application_id } = req.params;
            const { data, typeId } = req.body;

            const types: any = {
                spouse_id: "spouse_id",
                parent1_id: "parent1_id",
                parent2_id: "parent2_id",
            };

            if (!types[typeId]) {
                return res.json({ messages: [{ variant: "error", text: "type Id is required" }] });
            }
            
            if (!Object.keys(data).length) {
                return res.json({ messages: [{ variant: "error", text: "data is required" }] });
            }

            await db.transaction(async (trx) => {
                const [resInsert] = await Promise.all(
                    [
                        trx("sfa.person")
                        .insert({ ...data })
                        .returning("*"),
                    ]
                )

                if (resInsert) {
                    
                    const resUpdate = await trx("sfa.application")
                        .update(types[typeId], resInsert[0].id)
                        .where({ id: application_id })
                        .returning("*");

                    return res.json({ messages: [{ variant: "success", text: "Inserted" }] });

                } else {
                    res.json({ messages: [{ variant: "error", text: "Failed to update" }] });
                }
            });

        } catch (error) {
            console.log(error)
            return res.json({ messages: [{ variant: "error", text: "Save failed" }] });
        }
    }
);

applicationRouter.post("/:application_id/person-address",
    [param("application_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        try {
            const { application_id } = req.params;
            const { data, addressTypeId = 1, personAddressId = null } = req.body;
                
            if (!Object.keys(data).length) {
                return res.json({ messages: [{ variant: "error", text: "data is required" }] });
            }
            if (personAddressId) {
                const resInsertPA = await db("sfa.person_address")
                    .insert({ ...data, address_type_id: addressTypeId, person_id: personAddressId, is_active: true })
                    .returning("*");

                return res.json({ messages: [{ variant: "success", text: "Inserted" }] });
            } else {
                await db.transaction(async (trx) => {
                    const [resInsert] = await Promise.all(
                        [
                            trx("sfa.person")
                            .insert({ first_name: '' })
                            .returning("*"),
                        ]
                    )

                    if (resInsert) {
                        
                        const resUpdateA = await trx("sfa.application")
                            .update("parent1_id", resInsert[0].id)
                            .where({ id: application_id })
                            .returning("*");
    
                        const resInsertPA = await trx("sfa.person_address")
                            .insert({ ...data, person_id: resInsert[0].id, address_type_id: addressTypeId, is_active: true })
                            .returning("*");
    
                        return res.json({ messages: [{ variant: "success", text: "Inserted" }] });
    
                    } else {
                        res.json({ messages: [{ variant: "error", text: "Failed to update" }] });
                    }
                });
            }

        } catch (error) {
            console.log(error)
            return res.json({ messages: [{ variant: "error", text: "Save failed" }] });
        }
    }
);

applicationRouter.patch("/:person_address_id/person-address",
    [param("person_address_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        try {
            const { person_address_id } = req.params;
            const { data } = req.body;
            
            if (!Object.keys(data).length) {
                return res.json({ messages: [{ variant: "error", text: "data is required" }] });
            }

            const resUpdate = await db("sfa.person_address")
                .update({ ...data })
                .where({ id: person_address_id })
                .returning("*");

            return res.json({ messages: [{ variant: "success", text: "Inserted" }] });

        } catch (error) {
            console.log(error)
            return res.json({ messages: [{ variant: "error", text: "Save failed" }] });
        }
    }
);

applicationRouter.post("/:application_id/agency-assistance",
    [param("application_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        try {
            const { application_id } = req.params;
            const { data } = req.body;

            if (!Object.keys(data).length) {
                return res.json({ messages: [{ variant: "error", text: "data is required" }] });
            }

            if (data?.amount === '' || data?.amount === null || isNaN(data?.amount)) {
                data.amount = 0;
            }

            if (!data?.agency_id) {
                return res.json({ messages: [{ variant: "error", text: "Agency Id is required" }] });
            }

            data.is_tuition = !!data?.is_tuition;
            data.is_living_expenses = !!data?.is_living_expenses;
            data.is_books = !!data?.is_books;
            data.is_transportation = !!data?.is_transportation;

            const verifyAgency = await db("sfa.agency_assistance").where({application_id, agency_id: data.agency_id});

            if (verifyAgency?.length) {
                return res.json({ messages: [{ variant: "error", text: "The Agency already exists" }] });
            }

            const resInsert = await db("sfa.agency_assistance")
                    .insert({ ...data, application_id });

                return resInsert ?
                    res.json({ messages: [{ variant: "success", text: "Saved" }] })
                    :
                    res.json({ messages: [{ variant: "error", text: "Failed" }] });

        } catch (error) {
            console.log(error)
            return res.json({ messages: [{ variant: "error", text: "Save failed" }] });
        }
    }
);

applicationRouter.patch("/:application_id/agency-assistance/:id",
    [param("application_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        try {
            const { application_id, id } = req.params;
            const { data } = req.body;

            if (Object.keys(data).some(k => k === 'agency_id')) {
                const verifyAgency = await db("sfa.agency_assistance").where({application_id, agency_id: data.agency_id});

                if (verifyAgency?.length) {
                    return res.json({ messages: [{ variant: "error", text: "The Agency already exists" }] });
                }
            }

            if (Object.keys(data).some(k => k === 'amount')) {
                if (data?.amount === '' || data?.amount === null || isNaN(data?.amount)) {
                    data.amount = 0;
                }
            }

            const resUpdate = await db("sfa.agency_assistance")
                .where({id, application_id})
                .update({ ...data });

            return resUpdate ?
                res.json({ messages: [{ variant: "success", text: "Saved" }] })
                :
                res.json({ messages: [{ variant: "error", text: "Failed" }] });

        } catch (error) {
            console.log(error)
            return res.json({ messages: [{ variant: "error", text: "Save failed" }] });
        }
    }
);

applicationRouter.delete("/:id/agency-assistance", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;

        try {

            const verifyRecord: any = await db("sfa.agency_assistance")
                .where({ id: id })
                .first();

            if (!verifyRecord) {
                return res.status(404).send({ wasDelete: false, message: "The record does not exits" });
            }

            const deleteRecord: any = await db("sfa.agency_assistance")
                .where({ id: id })
                .del();

            return (deleteRecord > 0) ?
                res.status(202).send({ messages: [{ variant: "success", text: "Removed" }] })
                :
                res.status(404).send({ messages: [{ variant: "error", text: "Record does not exits" }] });

        } catch (error: any) {

            console.log(error);

            if (error?.number === 547) {
                return res.status(409).send({ messages: [{ variant: "error", text: "Cannot be deleted because it is in use." }] });
            }

            return res.status(409).send({ messages: [{ variant: "error", text: "Error To Delete" }] });
        }
    }
);

applicationRouter.post("/:application_id/course",
    [param("application_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        try {
            const { application_id } = req.params;
            const { data } = req.body;

            if (!Object.keys(data).length) {
                return res.json({ messages: [{ variant: "error", text: "data is required" }] });
            }

            if (data?.description === '' || data?.description === null) {
                return res.json({ messages: [{ variant: "error", text: "Description is required" }] });
            }

            if (!data?.instruction_type_id) {
                return res.json({ messages: [{ variant: "error", text: "Instruction Type is required" }] });
            }

            const resInsert = await db("sfa.course_enrolled")
                    .insert({ ...data, application_id });

                return resInsert ?
                    res.json({ messages: [{ variant: "success", text: "Saved" }] })
                    :
                    res.json({ messages: [{ variant: "error", text: "Failed" }] });

        } catch (error) {
            console.log(error)
            return res.json({ messages: [{ variant: "error", text: "Save failed" }] });
        }
    }
);

applicationRouter.patch("/:application_id/course/:id",
    [param("application_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        try {
            const { application_id, id } = req.params;
            const { data } = req.body;

            if (Object.keys(data).some(k => k === 'description')) {
                if (!data?.description?.length) {
                    return res.json({ messages: [{ variant: "error", text: "Description is required" }] });
                }
            }

            if (Object.keys(data).some(k => k === 'description')) {
                if (!data?.description?.length) {
                    return res.json({ messages: [{ variant: "error", text: "Description is required" }] });
                }
            }

            if (Object.keys(data).some(k => k === 'instruction_type_id')) {
                if (data?.instruction_type_id === '' || data?.instruction_type_id === null || isNaN(data?.instruction_type_id)) {
                    return res.json({ messages: [{ variant: "error", text: "Instruction Type is required" }] });
                }
            }

            const resUpdate = await db("sfa.course_enrolled")
                .where({id, application_id})
                .update({ ...data });

            return resUpdate ?
                res.json({ messages: [{ variant: "success", text: "Saved" }] })
                :
                res.json({ messages: [{ variant: "error", text: "Failed" }] });

        } catch (error) {
            console.log(error)
            return res.json({ messages: [{ variant: "error", text: "Save failed" }] });
        }
    }
);

applicationRouter.delete("/:id/course", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;

        try {

            const verifyRecord: any = await db("sfa.course_enrolled")
                .where({ id: id })
                .first();

            if (!verifyRecord) {
                return res.status(404).send({ wasDelete: false, message: "The record does not exits" });
            }

            const deleteRecord: any = await db("sfa.course_enrolled")
                .where({ id: id })
                .del();

            return (deleteRecord > 0) ?
                res.status(202).send({ messages: [{ variant: "success", text: "Removed" }] })
                :
                res.status(404).send({ messages: [{ variant: "error", text: "Record does not exits" }] });

        } catch (error: any) {

            console.log(error);

            if (error?.number === 547) {
                return res.status(409).send({ messages: [{ variant: "error", text: "Cannot be deleted because it is in use." }] });
            }

            return res.status(409).send({ messages: [{ variant: "error", text: "Error To Delete" }] });
        }
    }
);

applicationRouter.get("/yea/all", async (req: Request, res: Response) => {

    const { last_name = "" } = req.query;

    try {
        const results = await db("sfa.yea")
        .where("last_name", last_name)
        .orderBy('sfa.yea.first_name');

        if (results) {
            return res.status(200).json({ success: true, data: [...results], });
        } else {
            return res.status(404).send();
        }

    } catch (error: any) {
        console.log(error);
        return res.status(404).send();
    }
});

applicationRouter.post("/:application_id/income",
    [param("application_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        try {
            const { application_id } = req.params;
            const { data } = req.body;

            if (!Object.keys(data).length) {
                return res.json({ messages: [{ variant: "error", text: "data is required" }] });
            }

            if (data?.amount === '' || data?.amount === null || (!data?.amount && data?.amount !== 0)) {
                data.amount = 0;
            }

            const resInsert = await db("sfa.income")
                    .insert({ ...data, application_id });

                return resInsert ?
                    res.json({ messages: [{ variant: "success", text: "Saved" }] })
                    :
                    res.json({ messages: [{ variant: "error", text: "Failed" }] });

        } catch (error) {
            console.log(error)
            return res.json({ messages: [{ variant: "error", text: "Save failed" }] });
        }
    }
);

applicationRouter.patch("/:application_id/income/:id",
    [param("application_id").isInt().notEmpty(), param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        try {
            const { application_id, id } = req.params;
            const { data } = req.body;

            if (Object.keys(data).some(k => k === 'amount')) {
                if (data.amount === null || data.amount === '') {
                    data.amount = 0;
                }
            }

            if (Object.keys(data).some(k => k === 'income_type_id')) {
                if (data?.income_type_id === '' || data?.income_type_id === null || isNaN(data?.income_type_id)) {
                    return res.json({ messages: [{ variant: "error", text: "Income Type is required" }] });
                }
            }

            const resUpdate = await db("sfa.income")
                .where({id, application_id})
                .update({ ...data });

            return resUpdate ?
                res.json({ messages: [{ variant: "success", text: "Saved" }] })
                :
                res.json({ messages: [{ variant: "error", text: "Failed" }] });

        } catch (error) {
            console.log(error)
            return res.json({ messages: [{ variant: "error", text: "Save failed" }] });
        }
    }
);

applicationRouter.delete("/income/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;

        try {

            const verifyRecord: any = await db("sfa.income")
                .where({ id: id })
                .first();

            if (!verifyRecord) {
                return res.status(404).send({ wasDelete: false, message: "The record does not exits" });
            }

            const deleteRecord: any = await db("sfa.income")
                .where({ id: id })
                .del();

            return (deleteRecord > 0) ?
                res.status(202).send({ messages: [{ variant: "success", text: "Removed" }] })
                :
                res.status(404).send({ messages: [{ variant: "error", text: "Record does not exits" }] });

        } catch (error: any) {

            console.log(error);

            if (error?.number === 547) {
                return res.status(409).send({ messages: [{ variant: "error", text: "Cannot be deleted because it is in use." }] });
            }

            return res.status(409).send({ messages: [{ variant: "error", text: "Error To Delete" }] });
        }
    }
);

applicationRouter.post("/:application_id/expense",
    [param("application_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        try {
            const { application_id } = req.params;
            const { data } = req.body;

            if (!Object.keys(data).length) {
                return res.json({ messages: [{ variant: "error", text: "data is required" }] });
            }

            if (data?.amount === '' || data?.amount === null || (!data?.amount && data?.amount !== 0)) {
                data.amount = 0;
            }
            if ( !data?.period_id || !Number(data.period_id)) {
                return res.json({ messages: [{ variant: "error", text: "Period is required" }] });
            }

            const resInsert = await db("sfa.expense")
                    .insert({ ...data, application_id });

                return resInsert ?
                    res.json({ messages: [{ variant: "success", text: "Saved" }] })
                    :
                    res.json({ messages: [{ variant: "error", text: "Failed" }] });

        } catch (error) {
            console.log(error)
            return res.json({ messages: [{ variant: "error", text: "Save failed" }] });
        }
    }
);

applicationRouter.patch("/:application_id/expense/:id",
    [param("application_id").isInt().notEmpty(), param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        try {
            const { application_id, id } = req.params;
            const { data } = req.body;

            if (Object.keys(data).some(k => k === 'amount')) {
                if (data.amount === null || data.amount === '') {
                    data.amount = 0;
                }
            }

            if (Object.keys(data).some(k => k === 'period_id')) {
                if ( !data.period_id || !Number(data.period_id)) {
                    return res.json({ messages: [{ variant: "error", text: "Period is required" }] });
                }
            }

            const resUpdate = await db("sfa.expense")
                .where({id, application_id})
                .update({ ...data });

            return resUpdate ?
                res.json({ messages: [{ variant: "success", text: "Saved" }] })
                :
                res.json({ messages: [{ variant: "error", text: "Failed" }] });

        } catch (error) {
            console.log(error)
            return res.json({ messages: [{ variant: "error", text: "Save failed" }] });
        }
    }
);

applicationRouter.delete("/expense/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;

        try {

            const verifyRecord: any = await db("sfa.expense")
                .where({ id: id })
                .first();

            if (!verifyRecord) {
                return res.status(404).send({ wasDelete: false, message: "The record does not exits" });
            }

            const deleteRecord: any = await db("sfa.expense")
                .where({ id: id })
                .del();

            return (deleteRecord > 0) ?
                res.status(202).send({ messages: [{ variant: "success", text: "Removed" }] })
                :
                res.status(404).send({ messages: [{ variant: "error", text: "Record does not exits" }] });

        } catch (error: any) {

            console.log(error);

            if (error?.number === 547) {
                return res.status(409).send({ messages: [{ variant: "error", text: "Cannot be deleted because it is in use." }] });
            }

            return res.status(409).send({ messages: [{ variant: "error", text: "Error To Delete" }] });
        }
    }
);

applicationRouter.post("/:application_id/disability",
    [param("application_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        try {
            const { application_id } = req.params;
            const { data } = req.body;

            if (!Object.keys(data).length) {
                return res.json({ messages: [{ variant: "error", text: "data is required" }] });
            }

            if ( !data?.disability_type_id || !Number(data.disability_type_id)) {
                return res.json({ messages: [{ variant: "error", text: "Disability Type is required" }] });
            }

            if (!data?.verified_disability_need) {
                data.verified_disability_need = false;
            }

            const resInsert = await db("sfa.disability")
                    .insert({ ...data, application_id });

                return resInsert ?
                    res.json({ messages: [{ variant: "success", text: "Saved" }] })
                    :
                    res.json({ messages: [{ variant: "error", text: "Failed" }] });

        } catch (error) {
            console.log(error)
            return res.json({ messages: [{ variant: "error", text: "Save failed" }] });
        }
    }
);

applicationRouter.patch("/:application_id/disability/:id",
    [param("application_id").isInt().notEmpty(), param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        try {
            const { application_id, id } = req.params;
            const { data } = req.body;

            if (Object.keys(data).some(k => k === 'disability_type_id')) {
                if ( !data?.disability_type_id || !Number(data.disability_type_id)) {
                    return res.json({ messages: [{ variant: "error", text: "Disability Type is required" }] });
                }
            }

            if (Object.keys(data).some(k => k === 'verified_disability_need')) {
                if (!Boolean(data?.verified_disability_need)) {
                    data.verified_disability_need = false;
                }
            }

            const resUpdate = await db("sfa.disability")
                .where({id, application_id})
                .update({ ...data });

            return resUpdate ?
                res.json({ messages: [{ variant: "success", text: "Saved" }] })
                :
                res.json({ messages: [{ variant: "error", text: "Failed" }] });

        } catch (error) {
            console.log(error)
            return res.json({ messages: [{ variant: "error", text: "Save failed" }] });
        }
    }
);

applicationRouter.delete("/disability/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;

        try {

            const verifyRecord: any = await db("sfa.disability")
                .where({ id: id })
                .first();

            if (!verifyRecord) {
                return res.status(404).send({ wasDelete: false, message: "The record does not exits" });
            }

            const deleteRecord: any = await db("sfa.disability")
                .where({ id: id })
                .del();

            return (deleteRecord > 0) ?
                res.status(202).send({ messages: [{ variant: "success", text: "Removed" }] })
                :
                res.status(404).send({ messages: [{ variant: "error", text: "Record does not exits" }] });

        } catch (error: any) {

            console.log(error);

            if (error?.number === 547) {
                return res.status(409).send({ messages: [{ variant: "error", text: "Cannot be deleted because it is in use." }] });
            }

            return res.status(409).send({ messages: [{ variant: "error", text: "Error To Delete" }] });
        }
    }
);

applicationRouter.post("/:application_id/disability-service",
    [param("application_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        try {
            const { application_id } = req.params;
            const { data } = req.body;

            if (!Object.keys(data).length) {
                return res.json({ messages: [{ variant: "error", text: "data is required" }] });
            }

            if ( !data?.disability_service_id || !Number(data.disability_service_id)) {
                return res.json({ messages: [{ variant: "error", text: "Disability Service is required" }] });
            }

            if (!data?.verified_service_need) {
                data.verified_service_need = false;
            }

            const resInsert = await db("sfa.disability_requirement")
                    .insert({ ...data, application_id });

                return resInsert ?
                    res.json({ messages: [{ variant: "success", text: "Saved" }] })
                    :
                    res.json({ messages: [{ variant: "error", text: "Failed" }] });

        } catch (error) {
            console.log(error)
            return res.json({ messages: [{ variant: "error", text: "Save failed" }] });
        }
    }
);

applicationRouter.patch("/:application_id/disability-service/:id",
    [param("application_id").isInt().notEmpty(), param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        try {
            const { application_id, id } = req.params;
            const { data } = req.body;

            if (Object.keys(data).some(k => k === 'disability_service_id')) {
                if ( !data?.disability_service_id || !Number(data.disability_service_id)) {
                    return res.json({ messages: [{ variant: "error", text: "Disability Type is required" }] });
                }
            }

            if (Object.keys(data).some(k => k === 'verified_service_need')) {
                if (!Boolean(data?.verified_service_need)) {
                    data.verified_service_need = false;
                }
            }

            const resUpdate = await db("sfa.disability_requirement")
                .where({id, application_id})
                .update({ ...data });

            return resUpdate ?
                res.json({ messages: [{ variant: "success", text: "Saved" }] })
                :
                res.json({ messages: [{ variant: "error", text: "Failed" }] });

        } catch (error) {
            console.log(error)
            return res.json({ messages: [{ variant: "error", text: "Save failed" }] });
        }
    }
);

applicationRouter.delete("/disability-service/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;

        try {

            const verifyRecord: any = await db("sfa.disability_requirement")
                .where({ id: id })
                .first();

            if (!verifyRecord) {
                return res.status(404).send({ wasDelete: false, message: "The record does not exits" });
            }

            const deleteRecord: any = await db("sfa.disability_requirement")
                .where({ id: id })
                .del();

            return (deleteRecord > 0) ?
                res.status(202).send({ messages: [{ variant: "success", text: "Removed" }] })
                :
                res.status(404).send({ messages: [{ variant: "error", text: "Record does not exits" }] });

        } catch (error: any) {

            console.log(error);

            if (error?.number === 547) {
                return res.status(409).send({ messages: [{ variant: "error", text: "Cannot be deleted because it is in use." }] });
            }

            return res.status(409).send({ messages: [{ variant: "error", text: "Error To Delete" }] });
        }
    }
);

applicationRouter.post("/:application_id/disability-equipment",
    [param("application_id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        try {
            const { application_id } = req.params;
            const { data } = req.body;

            if (!Object.keys(data).length) {
                return res.json({ messages: [{ variant: "error", text: "data is required" }] });
            }

            if ( !data?.equipment_category_id || !Number(data.equipment_category_id)) {
                return res.json({ messages: [{ variant: "error", text: "Equipment Category is required" }] });
            }

            if (!data?.verified_equipment_need) {
                data.verified_equipment_need = false;
            }

            const resInsert = await db("sfa.equipment_required")
                    .insert({ ...data, application_id });

                return resInsert ?
                    res.json({ messages: [{ variant: "success", text: "Saved" }] })
                    :
                    res.json({ messages: [{ variant: "error", text: "Failed" }] });

        } catch (error) {
            console.log(error)
            return res.json({ messages: [{ variant: "error", text: "Save failed" }] });
        }
    }
);

applicationRouter.patch("/:application_id/disability-equipment/:id",
    [param("application_id").isInt().notEmpty(), param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        try {
            const { application_id, id } = req.params;
            const { data } = req.body;

            if (Object.keys(data).some(k => k === 'equipment_category_id')) {
                if ( !data?.equipment_category_id || !Number(data.equipment_category_id)) {
                    return res.json({ messages: [{ variant: "error", text: "Equipment Category is required" }] });
                }
            }

            if (Object.keys(data).some(k => k === 'verified_equipment_need')) {
                if (!Boolean(data?.verified_equipment_need)) {
                    data.verified_equipment_need = false;
                }
            }

            const resUpdate = await db("sfa.equipment_required")
                .where({id, application_id})
                .update({ ...data });

            return resUpdate ?
                res.json({ messages: [{ variant: "success", text: "Saved" }] })
                :
                res.json({ messages: [{ variant: "error", text: "Failed" }] });

        } catch (error) {
            console.log(error)
            return res.json({ messages: [{ variant: "error", text: "Save failed" }] });
        }
    }
);

applicationRouter.delete("/disability-equipment/:id", [param("id").isInt().notEmpty()], ReturnValidationErrors,
    async (req: Request, res: Response) => {

        const { id = null } = req.params;

        try {

            const verifyRecord: any = await db("sfa.equipment_required")
                .where({ id: id })
                .first();

            if (!verifyRecord) {
                return res.status(404).send({ wasDelete: false, message: "The record does not exits" });
            }

            const deleteRecord: any = await db("sfa.equipment_required")
                .where({ id: id })
                .del();

            return (deleteRecord > 0) ?
                res.status(202).send({ messages: [{ variant: "success", text: "Removed" }] })
                :
                res.status(404).send({ messages: [{ variant: "error", text: "Record does not exits" }] });

        } catch (error: any) {

            console.log(error);

            if (error?.number === 547) {
                return res.status(409).send({ messages: [{ variant: "error", text: "Cannot be deleted because it is in use." }] });
            }

            return res.status(409).send({ messages: [{ variant: "error", text: "Error To Delete" }] });
        }
    }
);

applicationRouter.get("/:application_id/:funding_request_id/assessments",
    [param("application_id").isInt().notEmpty(), param("funding_request_id").isInt().notEmpty()], 
    ReturnValidationErrors, 
    async (req: Request, res: Response) => {
        try {
            const { application_id, funding_request_id } = req.params;

            const application = await db("sfa.application")
                .where({ id: application_id })
                .first();

            const fundingRequest = await db("sfa.funding_request")
                .where({ application_id })
                .where({ id: funding_request_id })
                .first();

            if (application && fundingRequest) {

                const getAsessment = await db("sfa.assessment")
                .where({ funding_request_id });

                const listAssessment = getAsessment.map((a, index) => {
                    return {
                        name_assessment: `assessment ${index+1} - ${a.id}`,
                        ...a,
                    };
                });

                return res.json({
                    messages: [{ variant: "success" }],
                    data: [ ...listAssessment ],
                });
            } else {
                return res.status(409).send({ messages: [{ variant: "error", text: "Error get data" }] });
            }

        } catch (error) {
            console.log(error);
            return res.status(409).send({ messages: [{ variant: "error", text: "Error get data" }] });
        }   
    }
);

applicationRouter.post("/:application_id/:funding_request_id/assessments",
    [param("application_id").isInt().notEmpty(), param("funding_request_id").isInt().notEmpty()], 
    ReturnValidationErrors, 
    async (req: Request, res: Response) => {
        try {
            const { application_id, funding_request_id } = req.params;

            const application = await db("sfa.application")
                .where({ id: application_id })
                .first();

            if (application) {

                const fundingRequest = await db("sfa.funding_request")
                    .where({ application_id })
                    .where({ id: funding_request_id })
                    .first();

                if (fundingRequest?.request_type_id === 2) { // Create Assessment YG

                    db.transaction(async (trx) => {

                        const resSP = await db.raw(`EXEC sfa.sp_get_init_value ${funding_request_id}, ${application.id}, ${application.student_id};`);

                        console.log(resSP);

                        return resSP?.[0]?.status
                            ? res.json({
                                messages: [{ variant: "success" }],
                                data: [],
                            })
                            : res.json({
                                messages: [{ variant: "error" }],
                                data: [],
                            });

                    });
                } else {
                    return res.json({
                        messages: [{ variant: "error" }],
                        data: [],
                    });
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(409).send({ messages: [{ variant: "error", text: "Error to insert" }] });
        }   
    }
);