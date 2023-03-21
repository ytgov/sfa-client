import express, { Request, Response } from "express";
import { portalApplicationRouter } from "./application-router";
import { portalReferenceRouter } from "./reference-router";
import { portalStudentRouter } from "./student-router";

export const portalRouter = express.Router();

portalRouter.use("/student", portalStudentRouter);
portalRouter.use("/application", portalApplicationRouter);
portalRouter.use("/reference", portalReferenceRouter);

portalRouter.get("/", (req: Request, res: Response) => {
  res.send("portalRouterIndex");
});
