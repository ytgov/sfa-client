import { Knex } from "knex";

exports.up = async function (knex: Knex, Promise: any) {
  knex.schema
    .table('sfa.application_draft', function(table) {
      table.integer('application_id').nullable();
    })
    .table('sfa.application', function(table) {
      table.integer('has_last_travel').nullable();
      table.integer('last_travel_year').nullable();
      table.integer('last_travel_month').nullable();
    });
};

exports.down = async function (knex: Knex, Promise: any) {
  knex.schema
    .table('sfa.application_draft', function(table) {
      table.dropColumn('application_id');
    })
    .table('sfa.application', function(table) {
      table.dropColumn('has_last_travel');
      table.dropColumn('last_travel_year');
      table.dropColumn('last_travel_month');
    });
};
