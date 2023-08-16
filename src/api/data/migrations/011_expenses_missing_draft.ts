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
        if (app.csfaExpenses && app.csfaExpenses.expenses && app.csfaExpenses.expenses.length > 0) {
          for (let expense of app.csfaExpenses.expenses) {
            let exp = {
              application_id: submittedApp.id,
              category_id: expense.type,
              period_id: expense.description.startsWith("Pre-Study") ? 1 : 2,
              description: expense.comments,
              amount: cleanNumber(expense.amount),
            };

            await db("expense").insert(exp);
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
