import { DB_CONFIG } from "../../config";
import knex from "knex";

const db = knex(DB_CONFIG);
const schema = "sfa";

export class ReferenceService {
  async getInstitutions(): Promise<any[]> {
    return db("institution").withSchema(schema).where({ is_active: true }).select(["id", "name"]);
  }

  async getEducationLevels(): Promise<any[]> {
    return db("education_level")
      .withSchema(schema)
      .where({ is_active: true })
      .select(["id", "description"])
      .orderBy("id");
  }

  async getRelationships(): Promise<any[]> {
    return db("relationship")
      .withSchema(schema)
      .where({ is_active: true })
      .select(["id", "description"])
      .orderBy("description");
  }

  async getFirstNations(): Promise<any[]> {
    return db("first_nation")
      .withSchema(schema)
      .where({ is_active: true })
      .select(["id", "description"])
      .orderBy("description");
  }
  async getStudentCategories(): Promise<any[]> {
    return db("student_category")
      .withSchema(schema)
      .where({ is_active: true })
      .select(["id", "description"])
      .orderBy("id");
  }
  async getHighSchools(province_id?: string): Promise<any[]> {
    if (province_id)
      return db("high_school")
        .withSchema(schema)
        .where({ is_active: true, province_id })
        .select(["id", "name"])
        .orderBy("name");
    else
      return db("high_school")
        .withSchema(schema)
        .where({ is_active: true })
        .select(["id", "name"])
        .orderBy("name");
  }
}
