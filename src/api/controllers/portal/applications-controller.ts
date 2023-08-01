import { Request, Response } from "express"

import { ApplicationService } from "../../services/portal";

export default class ApplicationsController {
  listStudentApplications(req: Request, res: Response) {
    const studentId = parseInt(req.params.studentId)

    const applicationService = new ApplicationService({ studentId })
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

    const applicationService = new ApplicationService({ studentId, applicationId })
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
