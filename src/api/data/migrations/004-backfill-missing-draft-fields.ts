import { Knex } from "knex"
import camelcaseKeys from "camelcase-keys"

import db from "@/db/db-client"

import { studentCategoryToCSLClassification } from "@/models"

export async function up(_: Knex) {
  let subs = await db("applicationDraft").where({ status: "Submitted" })
  for (let sub of subs) {
    let app
    try {
      app = JSON.parse(sub.applicationJson)
      app = camelcaseKeys(app, { deep: true })
    } catch (e) {
      console.log("Failed to parse application json: " + e)
      continue
    }

    let attendanceId = app.programDetails.attendance == "Full Time" ? 1 : 2
    let hasLastTravel = app.residency.hasTraveled
    let lastTravelYear = app.residency.lastReturnDate
      ? app.residency.lastReturnDate.split("/")[0]
      : null
    let lastTravelMonth = app.residency.lastReturnDate
      ? app.residency.lastReturnDate.split("/")[1]
      : null
    let cslClassification = studentCategoryToCSLClassification(app.personalDetails.category)
    let prestudyCslClassification = studentCategoryToCSLClassification(app.personalDetails.category)

    console.log("HAS_TRAV", hasLastTravel) //
    console.log("HAS_TRAV_RET", lastTravelYear, lastTravelMonth)
    console.log("ATTEND", attendanceId)
    console.log("CSLCLASS", cslClassification)
    console.log("PSCSLCLASS", prestudyCslClassification)

    let studentApps = await db("application").where({
      studentId: sub.studentId,
      academicYearId: 2023,
    })

    console.log("STUDENT HAS: ", studentApps.length)

    for (let submittedApp of studentApps) {
      await db("application").where({ id: submittedApp.id }).update({
        attendanceId,
        hasLastTravel,
        lastTravelYear,
        lastTravelMonth,
        cslClassification,
        prestudyCslClassification,
      })
    }

    console.log("---------------------")
  }
}

export async function down(knex: Knex) {}
