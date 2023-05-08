import knex from "knex";
import { DB_CONFIG } from "../../config";

const db = knex(DB_CONFIG);
const schema = "sfa";

export class PortalApplicationService {
  getApplication() {
    return { name: "2022/23" };
  }

  async getApplicationsForStudent(student_id: number) {
    let drafts = await db("application_draft").withSchema(schema).where({ student_id, is_active: true });
    let applications = await db("application").withSchema(schema).where({ student_id });

    for (let d of drafts) {
      d.status = "In Progress";
    }

    for (let d of applications) {
      d.status = "Closed";
    }

    return drafts.concat(applications);
  }

  async createDraft(draft: any) {
    let inserted = await db("application_draft").withSchema(schema).insert(draft).returning("*");

    return inserted[0];
  }

  async updateDraft(id: number, draftPartial: any) {
    return await db("application_draft").withSchema(schema).where({ id }).update(draftPartial);
  }
}
