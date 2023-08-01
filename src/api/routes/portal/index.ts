import express, { Request, Response } from "express";
import { portalApplicationRouter } from "./application-router";
import { portalReferenceRouter } from "./reference-router";
import { portalStudentRouter } from "./student-router";
import ApplicationsController from "@/controllers/portal/students/student-applications-controller"

const applicationsController = new ApplicationsController();
export const portalRouter = express.Router();

portalRouter.use("/student", portalStudentRouter);
portalRouter.use("/application", portalApplicationRouter);
portalRouter.use("/reference", portalReferenceRouter);

portalRouter.get("/", (req: Request, res: Response) => {
  res.send("portalRouterIndex");
});

portalRouter.get("/students/:studentId/applications", applicationsController.listStudentApplications)
portalRouter.get("/students/:studentId/applications/:applicationId", applicationsController.getStudentApplication)
// portalRouter.get("/students/:studentId/application-drafts", applicationDraftsController.listStudentApplicationDrafts)
// portalRouter.get("/students/:studentId/draft-applications/:applicationId", applicationDraftsController.getStudentApplicationDraft)
