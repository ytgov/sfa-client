import { Knex } from "knex";
import camelcaseKeys from "camelcase-keys";
import db from "@/db/db-client";
import { cleanNumber } from "@/models";

exports.up = async function (knex: Knex) {
  let subs = await db("applicationDraft").where({ status: "Submitted" });

  for (let sub of subs) {
    let app;

    try {
      app = JSON.parse(sub.applicationJson);
      app = camelcaseKeys(app, { deep: true });

      let studentApps = await db("application").where({
        studentId: sub.studentId,
        academicYearId: 2023,
      });

      for (let submittedApp of studentApps) {
        let fundingRequest = await db("fundingRequest")
          .where({ applicationId: submittedApp.id, is_csg_only: false })
          .whereIn("requestTypeId", [4, 5]);

        for (let fund of fundingRequest) {
          if (app.fundingSources && app.fundingSources.csfaAmounts) {
            if (app.fundingSources.csfaAmounts == "Grants only") {
              await db("fundingRequest").where({ id: fund.id }).update({ is_csg_only: true });
            }
          }
        }
      }
    } catch (e) {
      console.log("Failed to parse application json: " + e);
      continue;
    }
  }
};

exports.down = async function (knex: Knex) {};
