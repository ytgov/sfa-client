import knex from "knex"
import camelcaseKeys from "camelcase-keys"

import { DB_CONFIG } from "@/config";

const db = knex({
  ...DB_CONFIG,
  postProcessResponse: (result, queryContext) => {
    if (Array.isArray(result)) {
      // For SELECT queries
      return result.map((row) => camelcaseKeys(row, { deep: true }))
    } else {
      // for INSERT/UPDATE/DELETE queries
      return camelcaseKeys(result, { deep: true })
    }
  },
})

export default db
