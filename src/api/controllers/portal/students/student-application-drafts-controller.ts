import BaseController from "@/controllers/base-controller"

import ApplicationDraftsSerializer from "@/serializers/application-drafts-serializer";
import StudentApplicationDraftsService from "@/services/portal/students/student-application-drafts-service";

export default class StudentApplicationDraftsController extends BaseController {
  listStudentApplicationDrafts() {
    const studentId = parseInt(this.params.studentId)

    const applicationService = new StudentApplicationDraftsService({ studentId })
    return applicationService
      .getApplicationDrafts()
      .then((applicationDrafts) => {
        const applicationDraftsSerializer = new ApplicationDraftsSerializer(applicationDrafts);
        const data = applicationDraftsSerializer.asListView()
        this.response.json({ data })
      })
      .catch((error: { message: string }) => {
        this.response.status(404).json({ error: error.message })
      })
  }

  getStudentApplicationDraft() {
    const studentId = parseInt(this.params.studentId)
    const applicationDraftId = parseInt(this.params.applicationDraftId)

    const applicationService = new StudentApplicationDraftsService({ studentId, applicationDraftId })
    return applicationService
      .getApplicationDraft()
      .then((applicationDraft) => {
        const applicationDraftsSerializer = new ApplicationDraftsSerializer(applicationDraft);
        const data = applicationDraftsSerializer.asDetailedView()
        this.response.json({ data })
      })
      .catch((error: { message: string }) => {
        this.response.status(404).json({ error: error.message })
      })
  }

  #getStudent(studentId: number) {}
}
