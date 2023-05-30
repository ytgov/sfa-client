import { DB_CONFIG } from "../../config";
import knex from "knex";

const db = knex(DB_CONFIG);
const schema = "sfa";

export class ReferenceService {
  async getCities(): Promise<any[]> {
    return db("city")
      .withSchema(schema)
      .where({ is_active: true })
      .select(["id", "description"])
      .orderBy("description");
  }

  async getProvinces(): Promise<any[]> {
    return db("province")
      .withSchema(schema)
      .where({ is_active: true })
      .select(["id", "description"])
      .orderBy("description");
  }

  async getCountries(): Promise<any[]> {
    return db("country")
      .withSchema(schema)
      .where({ is_active: true })
      .select(["id", "description"])
      .orderBy("description");
  }

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
      .orderBy("description");
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

  async getCitizenship(): Promise<any[]> {
    return db("citizenship")
      .withSchema(schema)
      .where({ is_active: true })
      .whereNot({ id: 0 })
      .select(["id", "description"])
      .orderBy("id");
  }

  async getIncomeTypes(): Promise<any[]> {
    return db("income_type").withSchema(schema).where({ is_active: true }).select(["id", "description"]).orderBy("id");
  }

  async getStudyFields(): Promise<any[]> {
    let fields = await db("study_field")
      .withSchema(schema)
      .where({ is_active: true })
      .select(["id", "description"])
      .orderBy("description");
    let areas = await db("study_area")
      .withSchema(schema)
      .where({ is_active: true, show_online: true })
      .select(["id", "description", "study_field_id"])
      .orderBy("description");

    for (let field of fields) {
      field.areas = areas.filter((a) => a.study_field_id == field.id);
      field.areas.map((a: any) => delete a.study_field_id);
    }

    return fields;
  }

  async getPrograms(): Promise<any[]> {
    return db("program")
      .withSchema(schema)
      .where({ is_active: true })
      .select(["id", "description"])
      .orderBy("education_level_id", "id");
  }
}
