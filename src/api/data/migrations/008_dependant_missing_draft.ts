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

      let studentApps = await db("application").where({
        studentId: sub.studentId,
        academicYearId: 2023,
      });

      if (app.studentDependants && app.studentDependants.hasDependants && app.studentDependants.dependants) {
        for (let depend of app.studentDependants.dependants) {
          let dep = {
            student_id: sub.studentId,
            relationship_id: depend.relationship,
            firstName: depend.firstName,
            lastName: depend.lastName,
            comments: depend.comments,
            birthDate: depend.dob,
            isInProgress: true,
            isConversion: false,
            isDisability: false,
          };

          let newDep = await db("dependent").insert(dep).returning("*");

          for (let submittedApp of studentApps) {
            let eligibility = {
              applicationId: submittedApp.id,
              dependentId: newDep[0].id,
              isStaEligible: false,
              isPostSecondary: depend.isPostSecondary,
              residesWithStudent: depend.residesWith,
              isSharesCustody: depend.sharedCustody,
              sharesCustodyDetails: depend.custodyDetails,
              isCslEligible: false,
              isCsgEligible: false,
              isInProgress: true,
            };

            await db("dependent_eligibility").insert(eligibility);
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
