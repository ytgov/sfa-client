import knex, { Knex } from "knex";

import { DB_CONFIG } from "@/config";

const db =  knex(DB_CONFIG);

export default db;
