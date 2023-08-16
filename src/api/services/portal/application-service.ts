import knex from "knex";
import { DB_CONFIG } from "@/config";
import {
  AddressesFromDraft,
  Application,
  ApplicationFromDraft,
  ConsentFromDraft,
  DependantsFromDraft,
  ExpensesFromDraft,
  FundingFromDraft,
  IncomeFromDraft,
  OtherFundingFromDraft,
  ParentsFromDraft,
  PersonFromDraft,
  ResidenceFromDraft,
  StudentFromDraft,
} from "@/models";
import moment from "moment";

const db = knex(DB_CONFIG);
const schema = "sfa";

export class PortalApplicationService {
  getApplication() {
    return { name: "2022/23" };
  }

  async getDraftsForStudent(student_id: number) {
    let drafts = await db("application_draft")
      .withSchema(schema)
      .where({ student_id, is_active: true })
      .orderBy("status")
      .orderBy("update_date", "desc");

    for (let d of drafts) {
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

  async submitDraft(student: any, id: number): Promise<undefined | Application> {
    let draft = await db("application_draft").withSchema(schema).where({ id }).first();

    if (draft) {
      let draftApp = JSON.parse(draft.application_json);
      let combinedApp = { ...draft, ...draftApp };
      let conv = ApplicationFromDraft(combinedApp);

      let parents = ParentsFromDraft(combinedApp);
      if (parents && parents[0]) {
        let relationship_id = parents[0].relationship;
        delete parents[0].relationship;
        let p1 = await db("person").withSchema(schema).insert(parents[0]).returning("*");

        if (p1 && p1.length == 1) {
          conv.parent1_id = p1[0].id;
        }

        await db("student_persons").withSchema(schema).insert({
          student_id: student.id,
          person_id: p1[0].id,
          relationship_id,
          is_active: true,
        });
      }

      if (parents && parents[1]) {
        let relationship_id = parents[1].relationship;
        delete parents[1].relationship;
        let p2 = await db("person").withSchema(schema).insert(parents[1]).returning("*");

        if (p2 && p2.length == 1) {
          conv.parent2_id = p2[0].id;
        }

        await db("student_persons").withSchema(schema).insert({
          student_id: student.id,
          person_id: p2[0].id,
          relationship_id,
          is_active: true,
        });
      }

      let addresses = AddressesFromDraft(combinedApp);
      if (addresses && addresses.length > 0) {
        for (let address of addresses) {
          address.person_id = student.person_id;
          let newAddrId = await db("person_address").withSchema(schema).insert(address).returning("*");

          if (
            newAddrId &&
            newAddrId.length > 0 &&
            combinedApp.addresses.primary == "Permanent" &&
            address.address_type_id == 1
          )
            (conv as any).primary_address_id = newAddrId[0].id;
          else if (
            newAddrId &&
            newAddrId.length > 0 &&
            combinedApp.addresses.primary == "School" &&
            address.address_type_id == 3
          )
            (conv as any).primary_address_id = newAddrId[0].id;
        }
      }

      if (combinedApp.addresses.home_address1_id != -1 && combinedApp.addresses.primary == "Permanent") {
        (conv as any).primary_address_id = combinedApp.addresses.home_address1_id;
      }
      if (combinedApp.addresses.home_address2_id != -1 && combinedApp.addresses.primary == "School") {
        (conv as any).primary_address_id = combinedApp.addresses.home_address2_id;
      }

      let person = PersonFromDraft(combinedApp);
      await db("person").withSchema(schema).where({ id: student.person_id }).update(person);

      let consents = ConsentFromDraft(combinedApp);
      if (consents && consents.length > 0) {
        for (let consent of consents) {
          consent.student_id = student.id;
          await db("student_consent").withSchema(schema).insert(consent);
        }
      }

      let residences = ResidenceFromDraft(combinedApp);
      if (residences && residences.length > 0) {
        for (let residence of residences) {
          residence.student_id = student.id;
          await db("residence").withSchema(schema).insert(residence);
        }
      }

      let newApplication = await db("application").withSchema(schema).insert(conv).returning("*");

      if (newApplication) {
        let fundings = FundingFromDraft(combinedApp);
        if (fundings && fundings.length > 0) {
          for (let funding of fundings) {
            funding.application_id = newApplication[0].id;
            await db("funding_request").withSchema(schema).insert(funding);
          }
        }

        let otherFundings = OtherFundingFromDraft(combinedApp);
        if (otherFundings && otherFundings.length > 0) {
          for (let funding of otherFundings) {
            funding.application_id = newApplication[0].id;
            await db("agency_assistance").withSchema(schema).insert(funding);
          }
        }

        let incomes = IncomeFromDraft(combinedApp);
        if (incomes && incomes.length > 0) {
          for (let income of incomes) {
            income.application_id = newApplication[0].id;
            await db("income").withSchema(schema).insert(income);
          }
        }

        let expenses = ExpensesFromDraft(combinedApp);
        if (expenses && expenses.length > 0) {
          for (let expense of expenses) {
            expense.application_id = newApplication[0].id;
            await db("expense").withSchema(schema).insert(expense);
          }
        }

        let depends = DependantsFromDraft(combinedApp);
        if (depends && depends.length > 0) {
          for (let depend of depends) {
            let elig = depend.eligibility;
            delete depend.eligibility;
            depend.student_id = student.id;
            let newDep = await db("dependent").withSchema(schema).insert(depend).returning("*");

            elig.application_id = newApplication[0].id;
            elig.dependent_id = newDep[0].id;
            await db("dependent_eligibility").withSchema(schema).insert(elig);
          }
        }

        let studentUpdate = StudentFromDraft(combinedApp);
        await db("student").withSchema(schema).where({ id: student.id }).update(studentUpdate);

        await db("application_draft").withSchema(schema).where({ id }).update({
          status: "Submitted",
          application_id: newApplication[0].id,
          submit_date: new Date(),
        });
      }

      return newApplication[0];
    }

    return undefined;
  }

  async deleteDraft(id: number) {
    return await db("application_draft").withSchema(schema).where({ id }).delete();
  }

  async getDocumentRequirementsFor(reqTypes: number[]): Promise<any[]> {
    return db("request_requirement")
      .withSchema(schema)
      .innerJoin("requirement_type", "requirement_type.id", "request_requirement.requirement_type_id")
      .where({ "requirement_type.show_online": 1, "requirement_type.is_active": 1 })
      .whereIn("request_requirement.request_type_id", reqTypes)
      .select([
        "requirement_type.description",
        "requirement_type.document_location",
        "request_requirement.requirement_type_id",
      ])
      .min("request_requirement.condition as condition")
      .groupBy([
        "requirement_type.description",
        "requirement_type.document_location",
        "request_requirement.requirement_type_id",
      ])
      .orderBy("requirement_type.description");
  }
}
