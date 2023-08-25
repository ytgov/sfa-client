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

      for (let submittedApp of studentApps) {
        if (
          app.csfaAccomodation &&
          app.csfaAccomodation.accomodations &&
          app.csfaAccomodation.accomodations.length > 0
        ) {
          let prestudyAccomCode = 3;
          if (app.csfaAccomodation.accomodations[0].living == "Living at Parents") prestudyAccomCode = 1;
          else if (app.csfaAccomodation.accomodations[0].living == "Living on Own") prestudyAccomCode = 2;

          let update = {
            prestudyAccomCode: prestudyAccomCode,
            prestudyOwnHome: app.csfaAccomodation.accomodations[0].ownHome,
            prestudyBoardAmount: app.csfaAccomodation.accomodations[0].rentToParents,
            prestudyCityId: app.csfaAccomodation.accomodations[0].city,
            prestudyProvinceId: app.csfaAccomodation.accomodations[0].province,
            prestudyBus: app.csfaAccomodation.accomodations[0].busService,
            prestudyDistance: app.csfaAccomodation.accomodations[0].distinctFromSchool,
          };

          await db("application").where({ id: submittedApp.id }).update(update);
        }

        if (
          app.csfaAccomodation &&
          app.csfaAccomodation.accomodations &&
          app.csfaAccomodation.accomodations.length > 1
        ) {
          let studyAccomCode = 3;
          if (app.csfaAccomodation.accomodations[1].living == "Living at Parents") studyAccomCode = 1;
          else if (app.csfaAccomodation.accomodations[1].living == "Living on Own") studyAccomCode = 2;

          let update = {
            studyAccomCode: studyAccomCode,
            studyOwnHome: app.csfaAccomodation.accomodations[1].ownHome,
            studyBoardAmount: app.csfaAccomodation.accomodations[1].rentToParents,
            studyCityId: app.csfaAccomodation.accomodations[1].city,
            studyProvinceId: app.csfaAccomodation.accomodations[1].province,
            studyBus: app.csfaAccomodation.accomodations[1].busService,
            studyDistance: app.csfaAccomodation.accomodations[1].distinctFromSchool,
          };

          await db("application").where({ id: submittedApp.id }).update(update);
        }
      }
    } catch (e) {
      console.log("Failed to parse application json: " + e);
      continue;
    }
  }
};

exports.down = async function (knex: Knex) {};
