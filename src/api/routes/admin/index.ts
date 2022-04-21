import express from "express";
import { acadecicYearRouter } from "./academic-year";
import { applicationRouter } from "./application";
import { institutionRouter } from "./institution";
import { studentRouter } from "./student";
import { RequireServerAuth, RequireAdmin } from "../auth";

export const adminRouter = express.Router();
//adminRouter.use("/", RequireServerAuth, RequireAdmin)

adminRouter.use("/institution", institutionRouter);
adminRouter.use("/academic-year", acadecicYearRouter);
adminRouter.use("/application", applicationRouter);
adminRouter.use("/student", studentRouter);
