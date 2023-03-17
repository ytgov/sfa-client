import express, { Request, Response } from "express";
import { PortalStudentService } from "../../services/portal";

export const portalStudentRouter = express.Router();

const studentService = new PortalStudentService();

portalStudentRouter.get("/", (req: Request, res: Response) => {
  res.send(studentService.getStudent());
});
