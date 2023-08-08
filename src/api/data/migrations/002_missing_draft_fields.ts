import { Knex } from "knex";
import { studentCategoryToCSLClassification } from "../../models";

exports.up = async function (knex: Knex, Promise: any) {
  let subs = await knex("application_draft").withSchema("sfa").where({ status: "Submitted" });

  for (let sub of subs) {
    let app = JSON.parse(sub.application_json);

    let attendance_id = app.program_details.attendance == "Full Time" ? 1 : 2;
    let has_last_travel = app.residency.has_traveled;
    let last_travel_year = app.residency.last_return_date ? app.residency.last_return_date.split("/")[0] : null;
    let last_travel_month = app.residency.last_return_date ? app.residency.last_return_date.split("/")[1] : null;
    let csl_classification = studentCategoryToCSLClassification(app.personal_details.category);
    let prestudy_csl_classification = studentCategoryToCSLClassification(app.personal_details.category);

    console.log("HAS_TRAV", has_last_travel); //
    console.log("HAS_TRAV_RET", last_travel_year, last_travel_month);
    console.log("ATTEND", attendance_id);
    console.log("CSLCLASS", csl_classification);
    console.log("PSCSLCLASS", prestudy_csl_classification);

    let studentApps = await knex("application")
      .withSchema("sfa")
      .where({ student_id: sub.student_id, academic_year_id: 2023 });

    console.log("STUDENT HAS: ", studentApps.length);

    for (let submittedApp of studentApps) {
      await knex("application")
        .withSchema("sfa")
        .where({ id: submittedApp.id })
        .update({
          attendance_id,
          has_last_travel,
          last_travel_year,
          last_travel_month,
          csl_classification,
          prestudy_csl_classification,
        });
    }

    console.log("---------------------");
  }
};

exports.down = async function (knex: Knex, Promise: any) {};
