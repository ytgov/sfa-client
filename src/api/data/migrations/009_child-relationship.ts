import { Knex } from "knex";
import db from "@/db/db-client";

exports.up = async function (knex: Knex) {
  let exists = await db("relationship").where({ description: "Child" }).count("id as counter").first();

  if (exists && exists.counter == 0) {
    await db("relationship").insert({ description: "Child", isActive: true });
  }
};

exports.down = async function (knex: Knex) {};
