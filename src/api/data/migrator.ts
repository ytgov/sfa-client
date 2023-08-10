import { Express, Request, Response } from "express"
import { join } from "path"

import { DB_CONFIG } from "@/config"
import db from "@/db/db-client"

const MIGRATION_CONIG = {
  // This sets the location of the knex_migrations table, NOT the default schema for queries.
  schemaName: DB_CONFIG.defaultSchema,
  directory: join(__dirname, "migrations"),
}

export async function migrateUp() {
  console.log("-------- MIGRATE UP ---------")
  return await db.migrate.up(MIGRATION_CONIG)
}

export async function migrateDown() {
  console.log("-------- MIGRATE DOWN ---------")
  return await db.migrate.down(MIGRATION_CONIG)
}

export async function migrateLatest() {
  console.log("-------- MIGRATE LATEST ---------")
  return await db.migrate.latest(MIGRATION_CONIG)
}

export async function CreateMigrationRoutes(app: Express) {
  app.get("/migrate/up", async (req: Request, res: Response) => {
    res.send(await migrateUp())
  })

  app.get("/migrate/down", async (req: Request, res: Response) => {
    res.send(await migrateDown())
  })

  app.get("/migrate/latest", async (req: Request, res: Response) => {
    res.send(await migrateLatest())
  })
}
