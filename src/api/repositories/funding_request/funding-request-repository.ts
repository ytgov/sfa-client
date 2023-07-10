import { Knex } from "knex";
import { FundingRequestDTO } from "models";
import { BaseRepository } from "../base-repository";

export class FundingRequestRepository extends BaseRepository {
    
    private funding_request: Partial<FundingRequestDTO> = {};

    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getFundingRequestById(id?: number): Promise<Partial<FundingRequestDTO>> {

        if (id) {
            this.funding_request = await this.mainDb("sfa.funding_request")
                .select("*")
                .where({ id })
                .first();
        }
                
        return this.funding_request;
    }
}