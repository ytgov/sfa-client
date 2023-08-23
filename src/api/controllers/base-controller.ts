import { Request, Response, NextFunction } from "express"
import camelcaseKeys from "camelcase-keys"

import User from "@/models/user"

export default class BaseController {
  protected request: Request
  protected response: Response
  protected next: NextFunction

  constructor(request: Request, response: Response, next: NextFunction) {
    this.request = request
    this.response = response
    this.next = next
  }

  protected get format() {
    return this.request.format
  }

  protected get params() {
    return this.request.params
  }

  // This attempts to standardize what a user will actually look like
  // Note that the request user is a merge of database user data and OAuth user data.
  // This will probably need a lot more validation to be correct.
  protected get currentUser(): User {
    const normalizedRequestUser = camelcaseKeys(this.request.user, { deep: true })
    return new User({
      ...normalizedRequestUser,
    })
  }
}
