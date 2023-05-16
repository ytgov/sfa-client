import express, { Request, Response } from "express";
import { PortalApplicationService, PortalStudentService } from "../../services/portal";

export const portalApplicationRouter = express.Router();

const applicationService = new PortalApplicationService();
const studentService = new PortalStudentService();

portalApplicationRouter.get("/:sub", async (req: Request, res: Response) => {
  const { sub } = req.params;
  let student = await studentService.getBySub(sub);

  if (student) {
    let applications = await applicationService.getDraftsForStudent(student.id);
    res.json({ data: applications });
  }

  res.status(404);
});

portalApplicationRouter.post("/:sub", async (req: Request, res: Response) => {
  const { sub } = req.params;
  const { academic_year_id, student_id, application_json, is_active, create_date, update_date } = req.body;

  let newDraft = {
    student_id,
    academic_year_id,
    create_date,
    update_date,
    is_active,
    application_json,
  };

  let draft = await applicationService.createDraft(newDraft);

  res.json({ data: draft });
});

portalApplicationRouter.put("/:sub/:draftId", async (req: Request, res: Response) => {
  const { sub, draftId } = req.params;
  const { application_json, is_active } = req.body;

  let student = await studentService.getBySub(sub);

  if (student) {
    let applications = await applicationService.updateDraft(parseInt(draftId), {
      application_json,
      is_active,
      update_date: new Date(),
    });
    res.json({ data: applications });
  }

  res.status(404);
});
