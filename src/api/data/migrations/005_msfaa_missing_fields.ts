// LEGACY: required until deleted from dbo.knex_migrations table production, after wich point they can be removed
import { Knex } from "knex";

exports.up = async function (knex: Knex) {
  await knex.schema.alterTable("sfa.msfaa", (t) => {
    t.specificType("rec_create_date", "DATETIME2(0)")
      .defaultTo(knex.raw("GETDATE()"), { constraintName: "msfaa_rec_create_date_default" })
      .notNullable();
    t.specificType("rec_last_mod_date", "DATETIME2(0)").nullable();
  });

  return knex.raw(`UPDATE sfa.msfaa SET rec_create_date = o.rec_create_date, rec_last_mod_date = o.rec_last_mod_date
  FROM sfa.msfaa n, SFAADMIN.MSFAA o
  WHERE n.id = o.msfaa_id`);
};

exports.down = async function (knex: Knex) {
  return knex.schema.alterTable("sfa.msfaa", (t) => {
    t.dropColumn("rec_create_date");
    t.dropColumn("rec_last_mod_date");
  });
};
