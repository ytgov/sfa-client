import knex, { Knex } from "knex";
import { User } from "../models";

export class UserService {
    private knex: Knex;

    constructor(config: Knex.Config<any>) {
        this.knex = knex(config);
    }

    async getByEmail(email: string): Promise<User | undefined> {
        let user = await this.knex("Security.User").where({ email }).first();
        return user;
    }

    async getById(id: number): Promise<User | undefined> {
        let user = await this.knex("Security.User").where({ id }).first();

        return user;
    }

    async getAll(): Promise<User[]> {
        let list = await this.knex("Security.User");
        return list;
    }

    async update(id: any, value: any) {
        await this.knex("Security.User").where({ id }).update(value);
    }

    async create(email: string, first_name: string, last_name: string): Promise<User[]> {
        email = email.toLocaleLowerCase();
        console.log("-- Creating User account for " + email);
        return this.knex("Security.User").insert({ email, first_name, last_name, last_login_date: new Date(), status: "Pending" }).returning("*")
    }

    async updateLoginDate(user: User): Promise<any> {
        return this.knex("Security.User").where({ id: user.id }).update({ last_login_date: new Date() });
    }
}
