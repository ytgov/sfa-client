import { Request, Response, NextFunction } from "express";

// Should be kept in sync with src/api/controllers/base-controller.ts
// Probably should be moved to a shared types file
interface ControllerClass {
  new (req: Request, res: Response, next: NextFunction): {
    [method: string]: () => any;
  };
}

export function routedTo(controllerClass: ControllerClass, method: string) {
  return (req: Request, res: Response, next: NextFunction) => {
      const controllerInstance = new controllerClass(req, res, next)
      return controllerInstance[method]()
  }
}
