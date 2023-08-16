// LEGACY: required until deleted from dbo.knex_migrations table production, after wich point they can be removed
import { Knex } from "knex";

exports.up = async function (knex: Knex) {
  return knex.raw(`CREATE OR ALTER TRIGGER sfa.msfaa_rec_last_modified_date
  ON sfa.msfaa FOR UPDATE AS  
  SET NOCOUNT ON;  
  UPDATE ms SET ms.rec_last_mod_date = GETDATE()
  FROM sfa.msfaa AS ms INNER JOIN inserted AS i ON ms.id=i.id`);
};

exports.down = async function (knex: Knex) {
  return knex.raw(`DROP TRIGGER sfa.msfaa_rec_last_modified_date`);
};
