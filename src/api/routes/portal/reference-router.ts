import express, { Request, Response } from "express";

export const portalReferenceRouter = express.Router();

portalReferenceRouter.get("/city", (req: Request, res: Response) => {
  res.send(["Whitehorse", "Tagish"]);
});
