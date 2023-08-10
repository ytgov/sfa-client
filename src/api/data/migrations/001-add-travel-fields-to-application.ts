import { Knex } from "knex"

import { DB_CONFIG } from "@/config"

export function up(knex: Knex) {
  return knex.schema
    .withSchema(DB_CONFIG.defaultSchema)
    .table("application_draft", (table) => {
      table.integer("application_id").nullable()
    })
    .table("application", (table) => {
      table.integer("has_last_travel").nullable()
      table.integer("last_travel_year").nullable()
      table.integer("last_travel_month").nullable()
    })
}

export function down(knex: Knex) {
  knex.schema
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
