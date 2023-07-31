import { Request, Response } from "express"

export default class ApplicationsController {
  listStudentApplications(req: Request, res: Response) {
    const studentId = parseInt(req.params.studentId)

    res.send(`list student applications for Student#${studentId}`)
  }

  getStudentApplication(req: Request, res: Response) {
    const studentId = parseInt(req.params.studentId)
    const applicationId = parseInt(req.params.applicationId)

    res.send(`get student application for Application#${applicationId} with Student#${studentId}`)
  }
}
