import { Request, Response } from "express"

import StudentApplicationDraftsService from "@/services/portal/students/student-application-drafts-service";

export default class StudentApplicationDraftsController {
  listStudentApplicationDrafts(req: Request, res: Response) {
    const studentId = parseInt(req.params.studentId)

    const applicationService = new StudentApplicationDraftsService({ studentId })
    applicationService
      .getApplicationDrafts()
      .then((applications) => {
        res.json({ data: applications })
      })
      .catch((error: { message: string }) => {
        res.status(404).json({ error: error.message })
      })
  }

  getStudentApplicationDraft(req: Request, res: Response) {
    const studentId = parseInt(req.params.studentId)
    const applicationDraftId = parseInt(req.params.applicationDraftId)

    const applicationService = new StudentApplicationDraftsService({ studentId, applicationDraftId })
    applicationService
      .getApplicationDraft()
      .then((applications) => {
        res.json({ data: applications })
      })
      .catch((error: { message: string }) => {
        res.status(404).json({ error: error.message })
      })
  }

  #getStudent(studentId: number) {}
}
