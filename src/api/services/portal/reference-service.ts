import { DB_CONFIG } from "../../config";
import knex from "knex";

const db = knex(DB_CONFIG);
const schema = "sfa";

export class ReferenceService {
  async getInstitutions(): Promise<any[]> {
    return db("institution")
      .withSchema(schema)
      .innerJoin("institution_campus", "institution.id", "institution_campus.institution_id")
      .where({ "institution.is_active": true, "institution_campus.is_active": true })
      .select(["institution_campus.id", db.raw("institution.name + ' (' +  institution_campus.name + ')' as name")])
      .orderBy(["institution.name"])
      .orderByRaw("case when institution_campus.name = 'Primary' then '' else institution_campus.name end");
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
    else return db("high_school").withSchema(schema).where({ is_active: true }).select(["id", "name"]).orderBy("name");
  }

  async getMaritalStatus(): Promise<any[]> {
    return db("marital_status")
      .withSchema(schema)
      .where({ is_active: true })
      .select(["id", "description"])
      .orderBy("id");
  }

  async getAboriginalStatus(): Promise<any[]> {
    return db("aboriginal_status")
      .withSchema(schema)
      .where({ is_active: true })
      .select(["id", "description"])
      .orderBy("id");
  }
}
