import { Request, Response } from "express"

import ApplicationDraftsSerializer from "@/serializers/application-drafts-serializer";
import StudentApplicationDraftsService from "@/services/portal/students/student-application-drafts-service";

export default class StudentApplicationDraftsController {
  listStudentApplicationDrafts(req: Request, res: Response) {
    const studentId = parseInt(req.params.studentId)

    const applicationService = new StudentApplicationDraftsService({ studentId })
    applicationService
      .getApplicationDrafts()
      .then((applicationDrafts) => {
        const applicationDraftsSerializer = new ApplicationDraftsSerializer(applicationDrafts);
        const data = applicationDraftsSerializer.asListView()
        res.json({ data })
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
      .then((applicationDraft) => {
        const applicationDraftsSerializer = new ApplicationDraftsSerializer(applicationDraft);
        const data = applicationDraftsSerializer.asDetailedView()
        res.json({ data })
      })
      .catch((error: { message: string }) => {
        res.status(404).json({ error: error.message })
      })
  }

  #getStudent(studentId: number) {}
}
