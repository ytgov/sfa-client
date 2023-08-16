import { Knex } from "knex";

exports.up = async function (knex: Knex, Promise: any) {
  await knex.raw(
    `CREATE OR ALTER TRIGGER sfa.msfaa_rec_last_modified_date
    ON sfa.msfaa FOR INSERT, UPDATE
    AS
     
    SET NOCOUNT ON;
     
    UPDATE ms
    SET ms.rec_last_mod_date = GETDATE()
    FROM sfa.msfaa AS ms
    INNER JOIN inserted AS i ON ms.id=i.id`
  );
};

exports.down = async function (knex: Knex, Promise: any) {
    await knex.raw('DROP TRIGGER sfa.msfaa_rec_last_modified_date');
};
