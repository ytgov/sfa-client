import { Knex } from "knex";
import { BaseRepository } from "../base-repository";

export class BatchParameterRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }
    
    async getBatchParameterId(batch_parameter_name?: string): Promise<number> {
        let result = 0;

        if (batch_parameter_name) {
            result = await this.getScalarValue<number>("fn_get_batch_parameter_id", [batch_parameter_name])
        }

        return result;
    }
}