import { Knex } from "knex"

import { DB_CONFIG } from "@/config"

export async function up(knex: Knex) {
  const schema = knex.schema.withSchema(DB_CONFIG.defaultSchema)

  // Check and add column for 'application_draft' table
  const hasApplicationIdOnApplicationDraft = await schema.hasColumn(
    "application_draft",
    "application_id"
  )
  await schema.table("application_draft", (table) => {
    if (!hasApplicationIdOnApplicationDraft) {
      table.integer("application_id").nullable()
    }
  })

  // Check and add columns for 'application' table
  const hasLastTravelOnApplication = await schema.hasColumn("application", "has_last_travel")
  const hasLastYearOnApplication = await schema.hasColumn("application", "last_travel_year")
  const hasLastMonthOnApplication = await schema.hasColumn("application", "last_travel_month")
  await schema.table("application", async (table) => {
    if (!hasLastTravelOnApplication) {
      table.integer("has_last_travel").nullable()
    }
    if (!hasLastYearOnApplication) {
      table.integer("last_travel_year").nullable()
    }
    if (!hasLastMonthOnApplication) {
      table.integer("last_travel_month").nullable()
    }
  })
}

export function down(knex: Knex) {
  return knex.schema
    .withSchema(DB_CONFIG.defaultSchema)
    .table("application_draft", (table) => {
      table.dropColumn("application_id")
    })
    .table("application", (table) => {
      table.dropColumn("has_last_travel")
      table.dropColumn("last_travel_year")
      table.dropColumn("last_travel_month")
    })
}
