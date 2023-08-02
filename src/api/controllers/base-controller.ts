import { Request, Response, NextFunction } from "express"

export default class BaseController {
  protected request: Request
  protected response: Response
  protected next: NextFunction

  constructor(request: Request, response: Response, next: NextFunction) {
    this.request = request
    this.response = response
    this.next = next
  }

  get params() {
    return this.request.params
  }
}
