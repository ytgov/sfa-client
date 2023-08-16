import express, { Request, Response } from "express";
import { PortalApplicationService, PortalStudentService } from "../../services/portal";
import { DocumentService } from "../../services/shared";
import { FundingFromDraft } from "../../models";
import { clone, isArray, sortBy, uniq } from "lodash";
import StudentApplicationsService from "@/services/portal/students/student-applications-service";

export const portalApplicationRouter = express.Router();

const applicationService = new PortalApplicationService();
const studentService = new PortalStudentService();
const documentService = new DocumentService();

portalApplicationRouter.get("/:sub", async (req: Request, res: Response) => {
  const { sub } = req.params;
  let student = await studentService.getBySub(sub);

  if (student) {
    // replace the section below with this once we show submitted in portal
    /* let drafts = await applicationService.getDraftsForStudent(student.id);
    let appService = new StudentApplicationsService({ studentId: student.id });
    let apps = await appService.getApplications();
    return res.json({ data: [...drafts.filter((a) => a.status == "In Progress"), ...apps] }); */

    let drafts = await applicationService.getDraftsForStudent(student.id);
    return res.json({ data: drafts });
  }

  res.status(404);
});

portalApplicationRouter.get("/:sub/application/:applicationId", async (req: Request, res: Response) => {
  const { sub, applicationId } = req.params;
  let student = await studentService.getBySub(sub);

  if (student) {
    let appService = new StudentApplicationsService({ studentId: student.id, applicationId: parseInt(applicationId) });
    let application = await appService
      .getApplication()
      .then((resp) => resp)
      .catch(() => {
        return res.status(404);
      });

    return res.json({ data: application });
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
        doc.meets_conditions = true;

       // if (doc.condition) console.log(doc, doc.condition);

        switch (doc.condition) {
          case "CSL Only":
            // I don't currently know how to handle this...
            // But I belive it's handled by not having the requirement
            break;
          case "Dependent":
            if (app.personal_details.category != 1) doc.meets_conditions = false;
            break;
          case "Has Dependant":
            if (app.student_dependants.has_dependants == false) doc.meets_conditions = false;
            break;
          case "Married/Common Law":
            if (app.personal_details.category != 2) doc.meets_conditions = false;
            break;
          case "Not CSL":
            // I don't currently know how to handle this...
            // But I belive it's handled by not having the requirement
            break;
          case "Not Dependent Student":
            if (app.personal_details.category == 1) doc.meets_conditions = false;
            break;
          case "Other Agency Funding":
            if (app.other_funding.has_funding == true) {
            } else doc.meets_conditions = false;
            break;
          case "Private/Distance/Outside Canada":
            break;
          case "Spouse as Dependent":
            // I don't currently know how to handle this...
            break;
          case "Yukon and Previous CSL":
            // I don't currently know how to handle this...
            // But I belive it's handled by not having the requirement
            break;
        }
      }

      returnDocs = returnDocs.filter((r) => r.meets_conditions == true);
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

// creates a new draft application
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

// saves a draft application
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

// submits a draft application and creates a real application
portalApplicationRouter.put("/:sub/:draftId/submit", async (req: Request, res: Response) => {
  const { sub, draftId } = req.params;
  let student = await studentService.getBySub(sub);

  if (student) {
    let applications = await applicationService.getDraftsForStudent(student.id);
    let appIds = applications.map((a) => a.id);

    if (appIds.includes(parseInt(draftId))) {
      let application = await applicationService.submitDraft(student, parseInt(draftId));

      if (application) {
        let draftDocs = await documentService.getDocumentsForDraft(parseInt(draftId));
        documentService.draftToApplication(parseInt(draftId), application.id);

        return res.json({ data: application });
      }
    }
  }
  res.status(404);
});

// deletes a draft application
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
