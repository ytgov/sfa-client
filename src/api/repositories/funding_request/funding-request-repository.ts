import { Knex } from "knex";
import { FundingRequestDTO } from "models";
import { BaseRepository } from "../base-repository";

export class FundingRequestRepository extends BaseRepository {
    
    private funding_request: Partial<FundingRequestDTO> = {};

    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getCsgOnlyFlag(funding_request_id?: number, application_id?: number): Promise<boolean> {
        let result = false;

        if (funding_request_id && application_id) {
            result = await this.getScalarValue<boolean>("fn_get_csg_only_flag", [funding_request_id, application_id])
        }

        return result;
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