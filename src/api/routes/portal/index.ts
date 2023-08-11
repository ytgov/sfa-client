import express, { Request, Response } from "express"

import { portalApplicationRouter } from "./application-router"
import { portalReferenceRouter } from "./reference-router"
import { portalStudentRouter } from "./student-router"

import { routedTo } from "@/controllers/helpers"
import StudentApplicationsController from "@/controllers/portal/students/student-applications-controller"
import StudentApplicationDraftsController from "@/controllers/portal/students/student-application-drafts-controller"

export const portalRouter = express.Router()

portalRouter.use("/student", portalStudentRouter)
portalRouter.use("/application", portalApplicationRouter)
portalRouter.use("/reference", portalReferenceRouter)

portalRouter.get("/", (req: Request, res: Response) => {
  res.send("portalRouterIndex")
})

portalRouter.get(
  "/students/:studentId/applications",
  routedTo(StudentApplicationsController, "listStudentApplications")
)
portalRouter.get(
  "/students/:studentId/applications/:applicationId",
  routedTo(StudentApplicationsController, "getStudentApplication")
)
portalRouter.get(
  "/students/:studentId/application-drafts",
  routedTo(StudentApplicationDraftsController, "listStudentApplicationDrafts")
)
portalRouter.get(
  "/students/:studentId/application-drafts/:applicationDraftId",
  routedTo(StudentApplicationDraftsController, "getStudentApplicationDraft")
)
