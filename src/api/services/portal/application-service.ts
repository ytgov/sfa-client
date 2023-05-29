import knex from "knex";
import { DB_CONFIG } from "../../config";
import { Application, ApplicationFromDraft } from "../../models";
import moment from "moment";

const db = knex(DB_CONFIG);
const schema = "sfa";

export class PortalApplicationService {
  getApplication() {
    return { name: "2022/23" };
  }

  async getDraftsForStudent(student_id: number) {
    let drafts = await db("application_draft").withSchema(schema).where({ student_id, is_active: true });

    for (let d of drafts) {
      d.status = "In Progress";
      d.description = `This application was created on ${moment
        .utc(d.create_date)
        .format("MMMM D, YYYY")} and last saved ${moment.utc(d.update_date).fromNow()}.`;
    }

    return drafts;
  }

  async getApplicationsForStudent(student_id: number) {
    let drafts = await db("application_draft").withSchema(schema).where({ student_id, is_active: true });
    let applications = await db("application").withSchema(schema).where({ student_id });

    for (let d of drafts) {
      d.status = "In Progress";
      d.description = "This ";
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

  async submitDraft(id: number): Promise<undefined | Application> {
    let draft = await db("application_draft").withSchema(schema).where({ id }).first();

    if (draft) {
      let draftApp = JSON.parse(draft.application_json);

      let conv = ApplicationFromDraft({ ...draft, ...draftApp });


      //let appArr = await db<Application>("sfa.application").insert({}).returning("*");

      /* if (appArr && appArr.length == 1) {
        let app = appArr[0];

        // dependent
        //
        return app;
      } */
    }

    return undefined;
  }

  async deleteDraft(id: number) {
    return await db("application_draft").withSchema(schema).where({ id }).delete();
  }
}
