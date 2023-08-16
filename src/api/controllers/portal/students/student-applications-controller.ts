import BaseController from "@/controllers/base-controller"

import ApplicationsSerializer, { Views } from "@/serializers/applications-serializer"
import StudentApplicationsService from "@/services/portal/students/student-applications-service"

export default class StudentApplicationsController extends BaseController {
  listStudentApplications() {
    const studentId = parseInt(this.params.studentId)

    const applicationService = new StudentApplicationsService({ studentId })
    return applicationService
      .getApplications()
      .then((applications) => {
        const applicationSerializer = new ApplicationsSerializer(applications)
        const data = applicationSerializer.asListView()
        this.response.json({ data })
      })
      .catch((error: { message: string }) => {
        this.response.status(404).json({ error: error.message })
      })
  }

  getStudentApplication() {
    const studentId = parseInt(this.params.studentId)
    const applicationId = parseInt(this.params.applicationId)

    const applicationService = new StudentApplicationsService({ studentId, applicationId })
    return applicationService
      .getApplication()
      .then((application) => {
        const applicationSerializer = new ApplicationsSerializer(application)
        const data = applicationSerializer.asDetailedView({ view: Views.STUDENT_APPLICATION })
        this.response.json({ data })
      })
      .catch((error: { message: string }) => {
        this.response.status(404).json({ error: error.message })
      })
  }

  #getStudent(studentId: number) {}
}
