import { Request, Response } from "express"

import ApplicationsSerializer from "@/serializers/applications-serializer";
import StudentApplicationsService from "@/services/portal/students/student-applications-service";

export default class StudentApplicationsController {
  listStudentApplications(req: Request, res: Response) {
    const studentId = parseInt(req.params.studentId)

    const applicationService = new StudentApplicationsService({ studentId })
    applicationService
      .getApplications()
      .then((applications) => {
        const applicationSerializer = new ApplicationsSerializer(applications);
        const data = applicationSerializer.asListView()
        res.json({ data })
      })
      .catch((error: { message: string }) => {
        res.status(404).json({ error: error.message })
      })
  }

  getStudentApplication(req: Request, res: Response) {
    const studentId = parseInt(req.params.studentId)
    const applicationId = parseInt(req.params.applicationId)

    const applicationService = new StudentApplicationsService({ studentId, applicationId })
    applicationService
      .getApplication()
      .then((application) => {
        const applicationSerializer = new ApplicationsSerializer(application);
        const data = applicationSerializer.asDetailedView()
        res.json({ data })
      })
      .catch((error: { message: string }) => {
        res.status(404).json({ error: error.message })
      })
  }

  #getStudent(studentId: number) {}
}
