import { Request, Response, NextFunction } from "express";
import { User } from "../models";

export const UserRoles = {
  ADMINISTRATOR: "Admin",
};

export const UserRoleOptions = [UserRoles.ADMINISTRATOR];

// this function should likely not be used
export function authorize(roles: string[] = [], allowPending: boolean = false) {
  return (req: Request, res: Response, next: NextFunction) => {
    let currentUser = req.user as User;

    if (!req.oidc.isAuthenticated() || !currentUser) return res.status(401).send("Not authenticated");

    if (currentUser.is_active) return res.status(401).json({ message: "Unauthorized - User inactive" });

    // if route only requires an active user
    if (roles.length == 0) return next();

    for (let role of roles) {
      if (currentUser.roles && currentUser.roles.indexOf(role) >= 0) return next();
    }

    return res.status(401).json({ message: "Unauthorized - Missing role(s): " + roles });
  };
}
