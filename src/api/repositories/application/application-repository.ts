import { Knex } from "knex";
import { ApplicationDTO } from "models";
import { BaseRepository } from "../base-repository";

export class ApplicationRepository extends BaseRepository {

    private application: ApplicationDTO = {} as ApplicationDTO;

    constructor(maindb: Knex<any, unknown>) {
        super(maindb)
    }

    async getApplicationById(application_id: number | undefined): Promise<ApplicationDTO> {

        if (application_id) {
            this.application = await this.mainDb("sfa.application")
                .select(
                    "sfa.application.*"
                )
                .where({ id: application_id })
                .first();
        }
        
        return this.application;
    }

    async getApplicationByFundingRequestId(funding_request_id: number | undefined): Promise<ApplicationDTO> {

        if (funding_request_id) {
            const result = await this.mainDb.raw(`EXEC sfa.sp_get_application_by_funding_request @funding_request_id = ${funding_request_id}`);
            this.application = this.singleResult(result);
        }
        
        return this.application;
    }
}