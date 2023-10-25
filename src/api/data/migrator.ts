import { Express, Request, Response } from "express";
import { join } from "path";

import { DB_CONFIG } from "@/config";
import db from "@/db/db-client";
import { isArray } from "lodash";

const MIGRATION_CONIG = {
  // This sets the location of the knex_migrations table, NOT the default schema for queries.
  schemaName: DB_CONFIG.defaultSchema,
  directory: join(__dirname, "migrations"),
};

export async function migrateUp() {
  console.log("-------- MIGRATE UP ---------");
  return await db.migrate.up(MIGRATION_CONIG);
}

export async function migrateDown() {
  console.log("-------- MIGRATE DOWN ---------");
  return await db.migrate.down(MIGRATION_CONIG);
}

export async function migrateLatest() {
  console.log("-------- MIGRATE LATEST ---------");
  return await db.migrate.latest(MIGRATION_CONIG);
}

export async function CreateMigrationRoutes(app: Express) {
  app.get("/migrate/up", async (req: Request, res: Response) => {
    res.send(await migrateUp());
  });

  app.get("/migrate/down", async (req: Request, res: Response) => {
    res.send(await migrateDown());
  });

  app.get("/migrate/latest", async (req: Request, res: Response) => {
    res.send(await migrateLatest());
  });

  app.post("/migrate/sub", async (req: Request, res: Response) => {
    if (req.files && req.files.file) {
      let file = isArray(req.files.file) ? req.files.file[0] : req.files.file;

      let fileData = file.data.toString();
      let lines = fileData.split(/\r?\n/).filter((l) => l.trim().length > 0);
      let importData = [];

      for (let line of lines) {
        let parts = line.split(",");

        if (parts.length == 2) {
          importData.push({ citizenone: parts[0], sub: parts[1] });
        } else {
          return res.status(400).send("Parsing failed: " + line);
        }
      }

      let count = 0;

      for (let line of importData) {
        count += await db("studentAuth").update({ sub: line.sub }).where({ citizenone: line.citizenone });
      }

      res.send(`Updated ${count}`);
    }

    res.send();
  });
}
