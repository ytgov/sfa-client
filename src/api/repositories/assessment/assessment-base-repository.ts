import { Knex } from "knex";
import { BaseRepository } from "../base-repository";

export class AssessmentBaseRepository extends BaseRepository {
    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    async getAssessmentInfoPrc(funding_request_id?: number): Promise<number | undefined> {
        let assessment_id = undefined;
        
        if (funding_request_id) {
            assessment_id = await this.getScalarValue<number>("fn_get_assessment_info_prc", [funding_request_id]);
            console.log("Assessment Id: ", assessment_id);
        }

        return assessment_id;
    }

    async getAssessmentCount(funding_request_id?: number): Promise<number> {
        let count = 0;
        
        if (funding_request_id) {
            count = await this.getScalarValue<number>("fn_get_assessment_count", [funding_request_id]);
        }

        return count;
    }
}