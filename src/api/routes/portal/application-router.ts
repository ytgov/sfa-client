import express, { Request, Response } from "express";
import { PortalApplicationService, PortalStudentService } from "../../services/portal";
import { DocumentService } from "../../services/shared";

export const portalApplicationRouter = express.Router();

const applicationService = new PortalApplicationService();
const studentService = new PortalStudentService();
const documentService = new DocumentService();

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
    let applications = await applicationService.getDraftsForStudent(student.id);
    let appIds = applications.map((a) => a.id);

    if (appIds.includes(parseInt(draftId))) {
      let result = await applicationService.updateDraft(parseInt(draftId), {
        application_json,
        is_active,
        update_date: new Date(),
      });
      res.json({ data: result });
    }
  }

  res.status(404);
});

portalApplicationRouter.put("/:sub/:draftId/submit", async (req: Request, res: Response) => {
  const { sub, draftId } = req.params;
  const { application_json, is_active } = req.body;

  let student = await studentService.getBySub(sub);

  if (student) {
    let applications = await applicationService.getDraftsForStudent(student.id);
    let appIds = applications.map((a) => a.id);

    if (appIds.includes(parseInt(draftId))) {
      let application = await applicationService.submitDraft(parseInt(draftId));

      if (application) {
        let draftDocs = await documentService.getDocumentsForDraft(parseInt(draftId));
        documentService.draftToApplication(parseInt(draftId), application.id);

        res.json({ data: application });
      }
    }
  }
  res.status(404);
});

portalApplicationRouter.delete("/:sub/:draftId", async (req: Request, res: Response) => {
  const { sub, draftId } = req.params;
  let student = await studentService.getBySub(sub);

  if (student) {
    let applications = await applicationService.getDraftsForStudent(student.id);
    let appIds = applications.map((a) => a.id);

    if (appIds.includes(parseInt(draftId))) {
      await documentService.deleteDocumentsForDraft(parseInt(draftId));
      await applicationService.deleteDraft(parseInt(draftId));
    }

    res.json({ data: "success" });
  }

  res.status(404);
});
