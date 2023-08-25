import { Knex } from "knex";

exports.up = async function (knex: Knex) {
  return knex.raw(`
    CREATE SEQUENCE sfa.msfaa_sent_seq  
      START WITH 1  
      INCREMENT BY 1 ;  
  `  
  );
};

exports.down = async function (knex: Knex) {
  return knex.raw(`DROP SEQUENCE sfa.msfaa_sent_seq`);
};
