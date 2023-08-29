import { Knex } from "knex";

exports.up = async function (knex: Knex) {
  await knex.schema.alterTable("sfa.fileReference", (t) => {
    t.integer("funding_request_id");
    t.boolean("visible_in_portal").defaultTo(false, { constraintName: "DEF_file_refe_visible" });
    t.foreign("funding_request_id", "FK__file_refe_funding_request").references("id").inTable("sfa.funding_request");
  });

  await knex.raw("ALTER TABLE [sfa].[file_reference] ALTER COLUMN [requirement_type_id] int NULL");

  await knex("sfa.fileReference").update({ visible_in_portal: false });
  await knex("sfa.fileReference").where({ upload_source: "Portal" }).update({ visible_in_portal: true });
};

exports.down = async function (knex: Knex) {
  return knex.schema.alterTable("sfa.file_reference", (t) => {
    t.dropChecks("DEF_file_refe_visible");
    t.dropForeign("funding_request_id", "FK__file_refe_funding_request");
    t.dropColumn("funding_request_id");
    t.dropColumn("visible_in_portal");
  });
};
