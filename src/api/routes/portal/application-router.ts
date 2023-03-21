import express, { Request, Response } from "express";
import { PortalApplicationService } from "../../services/portal";

export const portalApplicationRouter = express.Router();

const applicationService = new PortalApplicationService();

portalApplicationRouter.get("/", (req: Request, res: Response) => {
  res.send(applicationService.getApplication());
});
