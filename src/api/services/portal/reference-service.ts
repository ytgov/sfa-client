import { DB_CONFIG } from "../../config";
import knex from "knex";

const db = knex(DB_CONFIG);
const schema = "sfa";

export class ReferenceService {
  async getInstitutions(): Promise<any[]> {
    return db("institution").withSchema(schema).where({ is_active: true }).select(["id", "name"]);
  }

  async getEducationLevels(): Promise<any[]> {
    return db("education_level").withSchema(schema).where({ is_active: true }).select(["id", "description"]);
  }

  async getRelationships(): Promise<any[]> {
    return db("relationship").withSchema(schema).where({ is_active: true }).select(["id", "description"]);
  }
}
