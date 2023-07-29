import { Knex } from "knex";
import { BaseRepository } from "../base-repository";
import { CslReasonDTO } from "../../models";

export class CslReasonRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getCslReason(type?: string): Promise<Array<CslReasonDTO>> {
        let result: Array<CslReasonDTO> = [];

        if (type) {
            result = await this.mainDb({cr: "sfa.csl_reason"})
                .where("type", type)
                .select(
                    'cr.id',
                    'cr.name',
                    'cr.description'
                );

            result = this.loadResults(result);
        }

        return result;
    }

    async getCslReasonById(id?: number): Promise<CslReasonDTO> {
        let result: Partial<CslReasonDTO> = {};

        if (id) {
            const query = await this.mainDb({cr: "sfa.csl_reason"})
                .where("id", id)
                .select(
                    'cr.id',
                    'cr.name',
                    'cr.description'
                );

            result = this.singleResult(query);
        }

        return result;
    }
}