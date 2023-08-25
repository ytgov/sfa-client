import { Knex } from "knex";
import camelcaseKeys from "camelcase-keys";
import db from "@/db/db-client";

exports.up = async function (knex: Knex) {
  let subs = await db("applicationDraft").where({ status: "Submitted" });

  for (let sub of subs) {
    let app;

    try {
      app = JSON.parse(sub.applicationJson);
      app = camelcaseKeys(app, { deep: true });

      let educationHistory = app.education.educationHistory;

      if (educationHistory && educationHistory.length > 0) {
        let highSchoolId = educationHistory[0].school;
        let highSchoolLeftYear = educationHistory[0].leftHighSchool.split("/")[0];
        let highSchoolLeftMonth = educationHistory[0].leftHighSchool.split("/")[1];
        let isCrownWard = app.statistical.crownWard === true;

        await db("student")
          .where({ id: sub.studentId })
          .update({ highSchoolId, highSchoolLeftYear, highSchoolLeftMonth, isCrownWard });
      }
    } catch (e) {
      console.log("Failed to parse application json: " + e);
      continue;
    }
  }
};

exports.down = async function (knex: Knex) {};
