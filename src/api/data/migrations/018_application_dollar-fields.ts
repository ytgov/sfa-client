import { Knex } from "knex";

exports.up = async function (knex: Knex) {
  await knex.schema.alterTable("sfa.application", (t) => {
    t.specificType("books_supplies_cost_2", "numeric(10,2)");
  });

  await knex.raw("UPDATE sfa.application SET books_supplies_cost_2 = books_supplies_cost");
  await knex.raw("ALTER TABLE sfa.application DROP COLUMN books_supplies_cost");
  await knex.raw("EXEC sp_rename 'sfa.application.books_supplies_cost_2', 'books_supplies_cost', 'COLUMN'");
};

exports.down = async function (knex: Knex) {
  await knex.schema.alterTable("sfa.application", (t) => {
    t.specificType("books_supplies_cost_2", "int");
  });

  await knex.raw("UPDATE sfa.application SET books_supplies_cost_2 = CONVERT(INT, ROUND(books_supplies_cost, 0))");
  await knex.raw("ALTER TABLE sfa.application DROP COLUMN books_supplies_cost");
  await knex.raw("EXEC sp_rename 'sfa.application.books_supplies_cost_2', 'books_supplies_cost', 'COLUMN'");
};
