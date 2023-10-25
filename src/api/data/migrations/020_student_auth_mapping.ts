import { Knex } from "knex";

exports.up = async function (knex: Knex) {
  await knex.schema.alterTable("sfa.student_auth", (t) => {
    t.specificType("citizenone", "NVARCHAR(100)");
  });
  
  await knex.raw("UPDATE sfa.student_auth SET citizenone = sub");
};

exports.down = async function (knex: Knex) {
  await knex.schema.alterTable("sfa.student_auth", (t) => {
    t.dropColumn("citizenone");
  });
};
