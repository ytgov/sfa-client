import express, { Request, Response } from "express";
import { DocumentService } from "../../services/shared";
import { PortalStudentService } from "../../services/portal";

export const portalStudentRouter = express.Router();

const studentService = new PortalStudentService();
const documentService = new DocumentService();

portalStudentRouter.get("/:sub", async (req: Request, res: Response) => {
  const { sub } = req.params;
  let student = await studentService.getBySub(sub);

  if (student) {
    delete student.user_password;
  }

  res.json({ data: student });
});

portalStudentRouter.post("/:sub", async (req: Request, res: Response) => {
  const { sub } = req.params;
  const { date_of_birth, first_name, last_name, sin, email } = req.body;

  let student = await studentService.getBySub(sub);

  if (!student) {
    let result = await studentService.create(
      { first_name, last_name, sin, birth_date: date_of_birth, language_id: 1, sex_id: -1, email },
      sub
    );

    return res.json({ data: result });
  } else {
    res.json({ data: student });
  }
});

portalStudentRouter.post("/:sub/link", async (req: Request, res: Response) => {
  const { sub } = req.params;
  const { sin, date_of_birth, first_name, last_name, email_address, home_phone, home_postal, portal_id } = req.body;

  let student = await studentService.getBySub(sub);

  if (!student) {
    let foundMatch = await studentService.findStudentLink(
      sin,
      date_of_birth,
      first_name,
      last_name,
      email_address,
      home_phone,
      home_postal,
      portal_id,
      sub
    );

    return res.json({ data: foundMatch });
  } else {
    res.json({ data: false });
  }
});

//uploads a document
portalStudentRouter.post("/:student_id/draft/:application_id/files", async (req: Request, res: Response) => {
  const { student_id, application_id } = req.params;
  const { requirement_type_id, disability_requirement_id, person_id, dependent_id } = req.body;

  let email = "michael@icefoganalytics.com"; //req.user.email;

  if (req.files) {
    let files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];

    for (let file of files) {
      await documentService.uploadDraftDocument(email, student_id, application_id, file, requirement_type_id, disability_requirement_id, person_id, dependent_id);
    }
    return res.json({ message: "success" });
  }
  res.json({ error: "No files included in request" });
});

//uploads a document
portalStudentRouter.post("/:student_id/application/:application_id/files", async (req: Request, res: Response) => {
  const { student_id, application_id } = req.params;
  const { requirement_type_id, disability_requirement_id, person_id, dependent_id } = req.body;

  let email = "michael@icefoganalytics.com"; //req.user.email;

  if (req.files) {
    let files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];

    for (let file of files) {
      await documentService.uploadApplicationDocument(email, student_id, application_id, file, requirement_type_id, disability_requirement_id, person_id, dependent_id);
    }
    return res.json({ message: "success" });
  }
  res.json({ error: "No files included in request" });
});

// downloads a document
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

// at this point you can only update the status of a document
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

// deletes a document
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
