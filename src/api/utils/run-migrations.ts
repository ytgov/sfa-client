import { migrateLatest } from "@/data/migrator"

// TODO: investigate if we want this in production as well
// In the past, I've worked on projects that _do_ automatically run all migrations on boot.
if (process.env.NODE_ENV === "development") {
  console.log("Running migrations on initial boot.")
  migrateLatest()
}
