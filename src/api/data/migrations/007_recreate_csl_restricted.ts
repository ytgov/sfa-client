// LEGACY: required until deleted from dbo.knex_migrations table production, after wich point they can be removed
import { Knex } from "knex";

exports.up = async function (knex: Knex) {
  return knex.raw(`DROP TABLE sfa.csl_restricted;
  CREATE TABLE sfa.csl_restricted
    (
        id                    INT IDENTITY (1,1) PRIMARY KEY,
        sin                   NVARCHAR(15)  NULL,
        amount_disbursed      NUMERIC(10, 2) NULL,
        birth_date            DATETIME2(0)   NULL,
        first_name            NVARCHAR(100)  NULL,
        last_name             NVARCHAR(100)  NULL,
        over_award            NUMERIC(10, 2) NULL,
        restriction_reason_id NVARCHAR(1)    NULL,
        restriction_warn_id   NVARCHAR(1)    NULL,
        weeks_accumulated     FLOAT          NULL,
        nslsc_restrict1       NVARCHAR(1)    NULL,
        nslsc_restrict2       NVARCHAR(1)    NULL,
        nslsc_restrict3       NVARCHAR(1)    NULL,
        calsc_restrict1       NVARCHAR(1)    NULL,
        calsc_restrict2       NVARCHAR(1)    NULL,
        calsc_restrict3       NVARCHAR(1)    NULL,
        fi_restrict1          NVARCHAR(1)    NULL
    );
    SET IDENTITY_INSERT sfa.csl_restricted ON
    INSERT INTO sfa.csl_restricted (sin, amount_disbursed, birth_date, first_name, last_name, over_award, restriction_reason_id,
                            restriction_warn_id, weeks_accumulated, nslsc_restrict1, nslsc_restrict2, nslsc_restrict3,
                            calsc_restrict1, calsc_restrict2, calsc_restrict3, fi_restrict1)
    SELECT csl_restricted_id, [AMOUNT_DISBURSED], [BIRTH_DATE], [FIRST_NAME], [LAST_NAME], [OVER_AWARD],
          [RESTRICTION_REASON_ID], [RESTRICTION_WARN_ID], [WEEKS_ACCUMULATED], [NSLSC_RESTRICT1], [NSLSC_RESTRICT2],
          [NSLSC_RESTRICT3], [CALSC_RESTRICT1], [CALSC_RESTRICT2], [CALSC_RESTRICT3], [FI_RESTRICT1]
    FROM sfaadmin.csl_restricted

    SET IDENTITY_INSERT sfa.csl_restricted OFF
    
    CREATE INDEX csl_restricted_sin ON sfa.csl_restricted (sin);
    CREATE INDEX person_sin ON sfa.person (sin);
  `);
};


exports.down = async function (knex: Knex) {
  return knex.raw(`DROP TABLE sfa.csl_restricted;
    CREATE TABLE sfa.csl_restricted
      (
          id                    INT IDENTITY (1,1) PRIMARY KEY,
          amount_disbursed      NUMERIC(10, 2) NULL,
          birth_date            DATETIME2(0)   NULL,
          first_name            NVARCHAR(100)  NULL,
          last_name             NVARCHAR(100)  NULL,
          over_award            NUMERIC(10, 2) NULL,
          restriction_reason_id NVARCHAR(1)    NULL,
          restriction_warn_id   NVARCHAR(1)    NULL,
          weeks_accumulated     FLOAT          NULL,
          nslsc_restrict1       NVARCHAR(1)    NULL,
          nslsc_restrict2       NVARCHAR(1)    NULL,
          nslsc_restrict3       NVARCHAR(1)    NULL,
          calsc_restrict1       NVARCHAR(1)    NULL,
          calsc_restrict2       NVARCHAR(1)    NULL,
          calsc_restrict3       NVARCHAR(1)    NULL,
          fi_restrict1          NVARCHAR(1)    NULL
      );
      SET IDENTITY_INSERT sfa.csl_restricted ON
      INSERT INTO sfa.csl_restricted (id, amount_disbursed, birth_date, first_name, last_name, over_award, restriction_reason_id,
                              restriction_warn_id, weeks_accumulated, nslsc_restrict1, nslsc_restrict2, nslsc_restrict3,
                              calsc_restrict1, calsc_restrict2, calsc_restrict3, fi_restrict1)
      SELECT csl_restricted_id, [AMOUNT_DISBURSED], [BIRTH_DATE], [FIRST_NAME], [LAST_NAME], [OVER_AWARD],
            [RESTRICTION_REASON_ID], [RESTRICTION_WARN_ID], [WEEKS_ACCUMULATED], [NSLSC_RESTRICT1], [NSLSC_RESTRICT2],
            [NSLSC_RESTRICT3], [CALSC_RESTRICT1], [CALSC_RESTRICT2], [CALSC_RESTRICT3], [FI_RESTRICT1]
      FROM sfaadmin.csl_restricted

      SET IDENTITY_INSERT sfa.csl_restricted OFF
        
  `);
};
