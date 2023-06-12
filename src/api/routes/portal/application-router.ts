import express, { Request, Response } from "express";
import { PortalApplicationService, PortalStudentService } from "../../services/portal";
import { DocumentService } from "../../services/shared";
import { FundingFromDraft } from "../../models";
import { clone, isArray, sortBy, uniq } from "lodash";

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

portalApplicationRouter.get("/:sub/:draftId/required-documents", async (req: Request, res: Response) => {
  const { sub, draftId } = req.params;
  let student = await studentService.getBySub(sub);

  if (student) {
    let applications = await applicationService.getDraftsForStudent(student.id);
    let appIds = applications.map((a) => a.id);

    if (appIds.includes(parseInt(draftId))) {
      let existingDocs = await documentService.getDocumentsForDraft(parseInt(draftId));
      existingDocs = existingDocs.filter((d) => d.status_description != "Replaced");
      let draft = applications.filter((a) => a.id == draftId)[0];
      let app = JSON.parse(draft.application_json);

      let funding = FundingFromDraft(app);
      let requestTypes = uniq(funding.map((f) => f.request_type_id));

      let reqDocs = await applicationService.getDocumentRequirementsFor(requestTypes);
      let returnDocs = new Array<any>();

      for (let doc of reqDocs) {
        let existing = existingDocs.filter((d) => d.requirement_type_id == doc.requirement_type_id);
        existing = sortBy(existing, "upload_date");
        doc.status_description = "Missing";

        for (let i = 0; i < existing.length; i++) {
          if (i == 0) {
            doc.upload = existing[i];
            doc.status_description = existing[i].status_description;
          } else {
            let d1 = clone(doc);

            doc.upload = existing[i];
            doc.status_description = existing[i].status_description;
            returnDocs.push(d1);
          }
        }

        returnDocs.push(doc);
      }

      for (let doc of returnDocs) {
        switch (doc.condition) {
          case "CSL and SFA":
            break;
          case "CSL Only":
            break;
          case "Dependent":
            break;
          case "Has Dependant":
            break;
          case "Married/Common Law":
            break;
          case "Not CSL":
            break;
          case "Not Dependent Student":
            break;
          case "Other Agency Funding":
            break;
          case "Private/Distance/Outside Canada":
            break;
          case "Spouse as Dependent":
            break;
          case "Yukon and Previous CSL":
            break;
        }
      }

      //returnDocs = returnDocs.filter((r) => r.meets_conditions == true);

      returnDocs = sortBy(returnDocs, "description");

      res.json({ data: returnDocs });
    }
  }

  res.status(404);
});

//uploads a document
portalApplicationRouter.post("/:sub/:draftId/upload", async (req: Request, res: Response) => {
  const { sub, draftId } = req.params;
  const { requirement_type_id, disability_requirement_id, person_id, dependent_id, mimetype, replace, replace_id } =
    req.body;
  let student = await studentService.getBySub(sub);

  if (student) {
    let applications = await applicationService.getDraftsForStudent(student.id);
    let appIds = applications.map((a) => a.id);

    if (appIds.includes(parseInt(draftId))) {
      let email = student.email;

      if (req.files) {
        let file = isArray(req.files.file) ? req.files.file[0] : req.files.file;
        file.mimetype = mimetype;

        await documentService.uploadDraftDocument(
          email,
          student.id,
          draftId,
          file,
          requirement_type_id,
          disability_requirement_id,
          person_id,
          dependent_id
        );

        if (replace_id) {
          let doc = await documentService.getDocument(replace_id);

          if (doc) {
            await documentService.updateDocument(doc.object_key, { status: 4, status_date: new Date() });
          }
        }

        return res.json({ message: "success" });
      }
    }
  }

  res.json({ error: "No files included in request" });
});

// downloads a document
portalApplicationRouter.get("/:sub/:draftId/files/:key", async (req: Request, res: Response) => {
  const { sub, draftId, key } = req.params;
  let student = await studentService.getBySub(sub);

  if (student) {
    let applications = await applicationService.getDraftsForStudent(student.id);
    let appIds = applications.map((a) => a.id);

    if (appIds.includes(parseInt(draftId))) {
      let fileReference = await documentService.getDocumentWithFile(key);

      if (
        fileReference &&
        fileReference.student_id == student.id &&
        fileReference.application_draft_id == parseInt(draftId)
      ) {
        res.set("Content-disposition", "attachment; filename=" + fileReference.file_name);
        res.set("Content-type", fileReference.mime_type);
        return res.send(fileReference.file_contents);
      }
    }
  }

  res.status(404).send();
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
  let student = await studentService.getBySub(sub);

  if (student) {
    let applications = await applicationService.getDraftsForStudent(student.id);
    let appIds = applications.map((a) => a.id);

    if (appIds.includes(parseInt(draftId))) {
      let application = await applicationService.submitDraft(student, parseInt(draftId));

      console.log("Application Created", application);

      if (application) {
        let draftDocs = await documentService.getDocumentsForDraft(parseInt(draftId));
        documentService.draftToApplication(parseInt(draftId), application.id);

        return res.json({ data: application });
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
