import express, { Request, Response } from "express";
import { portalApplicationRouter } from "./application-router";
import { portalReferenceRouter } from "./reference-router";
import { portalStudentRouter } from "./student-router";
import StudentApplicationsController from "@/controllers/portal/students/student-applications-controller"
import StudentApplicationDraftsController from "@/controllers/portal/students/student-application-drafts-controller"

const studentApplicationsController = new StudentApplicationsController();
const studentApplicationDraftsController = new StudentApplicationDraftsController();
export const portalRouter = express.Router();

portalRouter.use("/student", portalStudentRouter);
portalRouter.use("/application", portalApplicationRouter);
portalRouter.use("/reference", portalReferenceRouter);

portalRouter.get("/", (req: Request, res: Response) => {
  res.send("portalRouterIndex");
});

portalRouter.get("/students/:studentId/applications", studentApplicationsController.listStudentApplications)
portalRouter.get("/students/:studentId/applications/:applicationId", studentApplicationsController.getStudentApplication)
portalRouter.get("/students/:studentId/application-drafts", studentApplicationDraftsController.listStudentApplicationDrafts)
portalRouter.get("/students/:studentId/draft-applications/:applicationDraftId", studentApplicationDraftsController.getStudentApplicationDraft)
