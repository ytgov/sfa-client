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
