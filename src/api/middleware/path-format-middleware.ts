import { Request, Response, NextFunction } from "express"

export default function pathFormatMiddleware(req: Request, res: Response, next: NextFunction) {
  const formatRegex = /(.+)\.(\w+)$/
  const match = req.path.match(formatRegex)

  if (match) {
    // Add the format as a parameter to req.params
    req.format = match[2]

    // Modify the URL path to strip off the format
    req.url = match[1]
  }

  next()
}
