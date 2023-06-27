import { Knex } from "knex";

export abstract class BaseRepository {

    /**
     * Main Db
     */
    readonly mainDb: Knex<any, unknown>;

    constructor(maindb: Knex<any, unknown>) {
        this.mainDb = maindb;
    }

    loadResults<T>(data: Array<any>): Array<T> {
        const result: Array<T> = [];
        if (Array.isArray(data)) {
            data.forEach((row) => {                  
                result.push(row as T);
            });
        }
        return result;
    }

    async getScalarValue<T>(funcName: string, args: Array<string | number>, schema: string = "sfa"): Promise<T> {
        let result = undefined;
        result = await this.mainDb.raw(`SELECT ${schema}.${funcName}(${args.join(',')}) as result;`);
        if (result) {
            return result[0].result as T;    
        }
        return result;
    }
}