import express, { Request, Response } from "express";
import { param } from "express-validator";
import knex from "knex";
import { ReturnValidationErrors } from "../../middleware";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG);
export const communicationTypeRouter = express.Router();

communicationTypeRouter.get("/", async (req: Request, res: Response) => {
  const list = await db("sfa.communication_type").where({ is_active: true });
  res.json({ success: true, data: list });
});

communicationTypeRouter.get("/users", async (req: Request, res: Response) => {
  const list = await db("sfa.[user]").select("id", "email");
  res.json({ success: true, data: list });
});

communicationTypeRouter.get(
  "/:student_id",
  [param("student_id").isInt().notEmpty()],
  ReturnValidationErrors,
  async (req: Request, res: Response) => {
    const { student_id } = req.params;
    const list = await db("sfa.communication").where({ student_id }).orderBy("communication_date", "desc");
    res.json({ success: true, data: list });
  }
);

communicationTypeRouter.post(
  "/communications-log/:student_id",
  [param("student_id").isInt().notEmpty()],
  ReturnValidationErrors,
  async (req: Request, res: Response) => {
    const { student_id } = req.params;
    try {
      const { request_type_id, communication_type_id, comments, communication_date, show_alert } = req.body;

      const data = {
        officer_id: req.user.id,
        student_id: student_id,
        request_type_id: request_type_id,
        communication_type_id: communication_type_id,
        comments: comments,
        communication_date: communication_date,
        show_alert: show_alert,
      };

      const resInsert = await db("sfa.communication").insert(data);

      return resInsert
        ? res.json({ messages: [{ variant: "success", text: "Saved" }] })
        : res.json({ messages: [{ variant: "error", text: "Save failed" }] });
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
  }
);

communicationTypeRouter.put(
  "/communications-log/:student_id",
  [param("student_id").isInt().notEmpty()],
  ReturnValidationErrors,
  async (req: Request, res: Response) => {
    const { request_type_id, communication_type_id, comments, communication_date, show_alert, id } = req.body;
    try {
      const resUpdate = await db("sfa.communication").where({ id }).update({
        officer_id: req.user.id,
        request_type_id,
        communication_type_id,
        comments,
        communication_date,
        show_alert,
      });

      return resUpdate
        ? res.json({ messages: [{ variant: "success", text: "Saved" }] })
        : res.json({ messages: [{ variant: "error", text: "Failed" }] });
    } catch (error) {
      console.log(error);
      return res.json({ messages: [{ text: "Failed to update Funding Request", variant: "error" }] });
    }
  }
);
