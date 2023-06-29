import express, { Request, Response } from "express";
import { DB_CONFIG } from "../../config";
import { RequireAdmin } from "../auth";
import { UserService } from "../../services";

export const usersRouter = express.Router();

const db = new UserService(DB_CONFIG);

usersRouter.get("/", RequireAdmin, async (req: Request, res: Response) => {
  res.json({ data: await db.getAll() });
});

usersRouter.post("/", RequireAdmin, async (req: Request, res: Response) => {
  const { is_active, roles, email, email_public, first_name, last_name, position, phone, phone_tollfree, fax } =
    req.body;

  await db.create({
    is_active,
    roles,
    email,
    email_public,
    first_name,
    last_name,
    position,
    phone,
    phone_tollfree,
    fax,
  });
  res.json({ data: await db.getAll() });
});

usersRouter.put("/:id", RequireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { is_active, roles, email, email_public, first_name, last_name, position, phone, phone_tollfree, fax } =
    req.body;

  await db.update(id, {
    is_active,
    roles,
    email,
    email_public,
    first_name,
    last_name,
    position,
    phone,
    phone_tollfree,
    fax,
  });

  res.json({ data: "success" });
});
