import express, { Request, Response } from "express";
import { DocumentService } from "../../services/shared";
import { PortalStudentService } from "../../services/portal";

export const portalStudentRouter = express.Router();

const studentService = new PortalStudentService();
const documentService = new DocumentService();

portalStudentRouter.get("/", (req: Request, res: Response) => {
  res.send(studentService.getStudent());
});

portalStudentRouter.post("/:student_id/application/:application_id/files", async (req: Request, res: Response) => {
  const { student_id, application_id } = req.params;

  let email = "michael@icefoganalytics.com"; //req.user.email;

  if (req.files) {
    let files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];

    for (let file of files) {
      await documentService.uploadApplicationDocument(email, student_id, application_id, file);
    }
    return res.json({ message: "success" });
  }
  res.json({ error: "No files included in request" });
});

portalStudentRouter.get("/:student_id/application/:application_id/files/:key", async (req: Request, res: Response) => {
  const { student_id, application_id, key } = req.params;

  let fileReference = await documentService.getDocumentWithFile(key);

  if (
    fileReference &&
    fileReference.student_id == parseInt(student_id) &&
    fileReference.application_id == parseInt(application_id)
  ) {
    res.set("Content-disposition", "attachment; filename=" + fileReference.file_name);
    res.set("Content-type", fileReference.mime_type);
    return res.send(fileReference.file_contents);
  }

  res.status(404).send();
});

portalStudentRouter.put("/:student_id/application/:application_id/files/:key", async (req: Request, res: Response) => {
  const { student_id, application_id, key } = req.params;
  const { status } = req.body;

  let fileReference = await documentService.getDocument(key);

  if (
    fileReference &&
    fileReference.student_id == parseInt(student_id) &&
    fileReference.application_id == parseInt(application_id)
  ) {
    if (fileReference.status != status) {
      fileReference.status = status;
      fileReference.status_date = new Date();

      await documentService.updateDocument(key, fileReference);
    }
    return res.json({ message: "success" });
  }

  res.status(404).send();
});

portalStudentRouter.delete(
  "/:student_id/application/:application_id/files/:key",
  async (req: Request, res: Response) => {
    const { student_id, application_id, key } = req.params;

    let fileReference = await documentService.getDocument(key);

    if (
      fileReference &&
      fileReference.student_id == parseInt(student_id) &&
      fileReference.application_id == parseInt(application_id)
    ) {
      await documentService.removeDocument(fileReference.object_key);
      return res.json({ message: "success" });
    }

    res.status(404).send();
  }
);
