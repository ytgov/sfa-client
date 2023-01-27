import express from "express";
import { acadecicYearRouter } from "./academic-year-router";
import { applicationRouter } from "./application-router";
import { institutionRouter } from "./institution-router";
import { studentRouter } from "./student-router";
import { provinceRouter } from "./province-router";
import { countriesRouter } from "./countries-router";
import { citiesRouter } from "./cities-router";
import { addressTypeRouter } from "./address-type-router";
import { indigenousLearnerRouter } from "./indigenous-learner-router";
import { languageRouter } from "./language-router";
import { maritalStatusRouter } from "./marital-status-router";
import { studyFieldRouter } from "./study-field-router";
import { parentalRelationshipRouter } from "./parental-relationship-router";
import { firstNationRouter } from "./first-nation-router";
import { portalStatusRouter } from "./portal-status-router";
import { sexRouter } from "./sex-router";
import { RequireServerAuth, RequireAdmin } from "../auth";

export const adminRouter = express.Router();
//adminRouter.use("/", RequireServerAuth, RequireAdmin)

adminRouter.use("/institution", institutionRouter);
adminRouter.use("/academic-year", acadecicYearRouter);
adminRouter.use("/application", applicationRouter);
adminRouter.use("/student", studentRouter);
adminRouter.use("/province", provinceRouter);
adminRouter.use("/countries", countriesRouter);
adminRouter.use("/cities", citiesRouter);
adminRouter.use("/address-type", addressTypeRouter);
adminRouter.use("/indigenous-learner", indigenousLearnerRouter);
adminRouter.use("/language", languageRouter);
adminRouter.use("/marital-status", maritalStatusRouter);
adminRouter.use("/study-field", studyFieldRouter);
adminRouter.use("/parental-relationship", parentalRelationshipRouter);
adminRouter.use("/first-nation", firstNationRouter);
adminRouter.use("/portal-status", portalStatusRouter);
adminRouter.use("/sex", sexRouter);
