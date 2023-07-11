import { Knex } from "knex";
import { ScalarResult } from "models/repository";

export abstract class BaseRepository {

    /**
     * Main Db
     */
    protected readonly mainDb: Knex<any, unknown>;

    constructor(maindb: Knex<any, unknown>) {
        this.mainDb = maindb;
    }

    protected loadResults<T>(data: Array<unknown>): Array<T> {
        const result: Array<T> = [];
        if (Array.isArray(data)) {
            data.forEach((row) => {                  
                result.push(row as T);
            });
        }
        return result;
    }

    protected singleResult<T>(data: Array<unknown>): Partial<T> {
        let result: Partial<T> = {};
        if (Array.isArray(data)) {
            result = data[0] as T;
        }
        return result;
    }

    protected async getScalarValue<T>(funcName: string, args: Array<string | number>, schema: string = "sfa"): Promise<T> {
        const query = await this.mainDb.raw(`SELECT ${schema}.${funcName}(${args.join(',')}) as result;`);
        if (query) {
            const result = this.singleResult(query) as ScalarResult<T>;
            return result.result as T;
        }
        return {} as T;
    }
}