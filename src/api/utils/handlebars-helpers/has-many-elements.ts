import { isEmpty } from "lodash"

export default function hasManyElements(iterable: any): boolean {
  if (isEmpty(iterable)) return false

  if (!Array.isArray(iterable))
    throw new Error("Not implemented: only arrays are currently supported.")

  return iterable.length > 1
}
