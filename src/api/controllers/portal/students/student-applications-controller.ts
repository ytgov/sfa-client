import { Request, Response } from "express"

import { StudentApplicationsService } from "@/services/portal/students/student-applications-service";

export default class StudentApplicationsController {
  listStudentApplications(req: Request, res: Response) {
    const studentId = parseInt(req.params.studentId)

    const applicationService = new StudentApplicationsService({ studentId })
    applicationService
      .getApplications()
      .then((applications) => {
        res.json({ data: applications })
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
      .then((applications) => {
        res.json({ data: applications })
      })
      .catch((error: { message: string }) => {
        res.status(404).json({ error: error.message })
      })
  }

  #getStudent(studentId: number) {}
}
