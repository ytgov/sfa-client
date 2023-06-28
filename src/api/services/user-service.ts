import knex, { Knex } from "knex";
import { User } from "../models";

export class UserService {
  private knex: Knex;

  constructor(config: Knex.Config<any>) {
    this.knex = knex(config);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return this.knex("sfa.user").where({ email }).first();
  }

  async getBySub(sub: string): Promise<User | undefined> {
    return this.knex("sfa.user").where({ sub }).first();
  }

  async getById(id: number): Promise<User | undefined> {
    return this.knex("sfa.user").where({ id }).first();
  }

  async getAll(): Promise<User[]> {
    let list = await this.knex("sfa.user");
    return list;
  }

  async update(id: any, value: any) {
    await this.knex("sfa.user").where({ id }).update(value);
  }

  async create(item: any): Promise<User[]> {
    if (item.email) item.email = item.email.toLocaleLowerCase();

    return this.knex("sfa.user").insert(item).returning("*");
  }

  async updateLoginDate(user: User): Promise<any> {
    return this.knex("sfa.user").where({ id: user.id }).update({ last_login_date: new Date() });
  }
}
