import { Knex } from "knex";

exports.up = async function (knex: Knex) {
  return knex.raw(`
  CREATE OR ALTER VIEW sfa.vm_disbursement_sum ( funding_request_id, assessment_id , disbursed_amount) AS 
	SELECT funding_request_id, assessment_id , sum(disbursed_amount) as disbursed_amount
	FROM sfa.disbursement
    GROUP BY funding_request_id, assessment_id`  
  );
};

exports.down = async function (knex: Knex) {
  return knex.raw(`DROP VIEW sfa.VW_MSFAA_SEND`);
};
