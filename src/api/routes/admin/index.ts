import express from "express";
import { acadecicYearRouter } from "./academic-year-router";
import { applicationRouter } from "./application-router";
import { institutionRouter } from "./institution-router";
import { studentRouter } from "./student-router";
import { RequireServerAuth, RequireAdmin } from "../auth";

export const adminRouter = express.Router();
//adminRouter.use("/", RequireServerAuth, RequireAdmin)

adminRouter.use("/institution", institutionRouter);
adminRouter.use("/academic-year", acadecicYearRouter);
adminRouter.use("/application", applicationRouter);
adminRouter.use("/student", studentRouter);
