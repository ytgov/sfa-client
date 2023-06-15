import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors, ReturnValidationErrorsCustomMessage } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG);
export const communicationTypeRouter = express.Router();
communicationTypeRouter.get("/", async (req: Request, res: Response) => {
  const { filter = true } = req.query;    
  try {
    const communicationType = await db("sfa.communication_type")  
    .where("is_active", 1)    
    .select(
      "*",
    );

    if (communicationType) {      
      return res.status(200).json({ success: true, data: [...communicationType] });
    } else {
      return res.status(404).send();
    }
  } catch (error: any) {
    console.log(error);
    return res.status(404).send();
  }
});

communicationTypeRouter.get("/users", async (req: Request, res: Response) => {
  const { filter = true } = req.query;    
  try {
    const user = await db("sfa.[user]")      
    .select(
      "*",
    );

    if (user) {      
      return res.status(200).json({ success: true, data: [...user] });
    } else {
      return res.status(404).send();
    }
  } catch (error: any) {
    console.log(error);
    return res.status(404).send();
  }
});


communicationTypeRouter.get("/:student_id", async (req: Request, res: Response) => {
  const { filter = true } = req.query;
  const { student_id } = req.params;      
  try {
    const communication = await db("sfa.communication")  
    .where("student_id", student_id)    
    .orderBy("communication_date", "desc")
    .select(
      "*",
    );

    if (communication) {      
      return res.status(200).json({ success: true, data: [...communication] });
    } else {
      return res.status(404).send();
    }
  } catch (error: any) {
    console.log(error);
    return res.status(404).send();
  }
});


communicationTypeRouter.post("/communications-log/:student_id",
[param("student_id").isInt().notEmpty()], ReturnValidationErrors,
async (req: Request, res: Response) => {        
    try {      
        const { officer_id, student_id, request_type_id, communication_type_id, comments, communication_date, show_alert } = req.body;
        const currentUser = await db("sfa.[user]")
            .select("id")
            .whereLike('email', `%${officer_id}%`)        
            .first()        
        const { application_id } = req.params;
        const data = {
            officer_id: currentUser.id, 
            student_id: student_id, 
            request_type_id:request_type_id, 
            communication_type_id:communication_type_id, 
            comments: comments, 
            communication_date: communication_date, 
            show_alert:show_alert}
        
            const resInsert = await db("sfa.communication")
                .insert({ ...data});
            
            return resInsert ?
                res.json({ messages: [{ variant: "success", text: "Saved" }] })
                :
                res.json({ messages: [{ variant: "error", text: "Save failed" }] });        

        return res.status(404).send();

    } catch (error) {
        console.error(error);
        return res.status(400).send(error);
    }    
});

communicationTypeRouter.put("/communications-log/:student_id",
    [param("student_id").isInt().notEmpty()],
    ReturnValidationErrors,
    async (req: Request, res: Response) => {                
        const {student_id} = req.params;
        const { officer_id, request_type_id, communication_type_id, comments, communication_date, show_alert, id } = req.body;           
        
        
        try {
            
            const resUpdate = await db("sfa.communication")
                .where({id})
                .update({ officer_id, student_id, request_type_id, communication_type_id, comments, communication_date, show_alert });                
            return resUpdate ?
                res.json({ messages: [{ variant: "success", text: "Saved" }] })
                :
                res.json({ messages: [{ variant: "error", text: "Failed" }] });

            
        } catch (error) {
            return res.json({ messages: [{ text: "Failed to update Funding Request", variant: "error" }] });
        }
        

    }
);