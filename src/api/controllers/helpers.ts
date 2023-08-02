import { Request, Response, NextFunction } from "express"

import BaseController from "@/controllers/base-controller"

export function routedTo<T extends typeof BaseController>(
  controllerClass: T,
  method: string & keyof InstanceType<T>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const controllerInstance = new controllerClass(req, res, next) as InstanceType<T>
    const controllerMethod = controllerInstance[method]

    if (typeof controllerMethod === "function") {
      return controllerMethod()
    } else {
      throw new Error(`Method ${method} is not a function on the provided controller class`)
    }
  }
}
