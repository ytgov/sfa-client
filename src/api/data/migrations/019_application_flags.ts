import { Knex } from "knex";

exports.up = async function (knex: Knex) {
  await knex.schema.alterTable("sfa.application", (t) => {
    t.string("flags", 200);
  });
};

exports.down = async function (knex: Knex) {
  await knex.schema.alterTable("sfa.application", (t) => {
    t.dropColumn("flags");
  });
};
