import { Knex } from "knex";
import { BaseRepository } from "../base-repository";
import { ScalarResult } from "models/repository";

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

    async getCslOveraward(student_id?: number, funding_request_id?: number): Promise<number> {
        let result = 0;

        if (student_id && funding_request_id) {
            result = await this.getScalarValue<number>("fn_get_csl_overaward", [student_id, funding_request_id]);
        }

        return result;
    }

    async countIncomeTypeByApplication(income_type_id: number, application_id?: number): Promise<number> {
        if (application_id) {
            const query = await this.mainDb
            .count<ScalarResult<number>>("id", { as: "result"})
            .from("sfa.income")
            .where({
                income_type_id,
                application_id
            });
        
            return query.result;
        }
        return 0;
    }

    async getExpenseAmount(application_id?: number, period_id?: number): Promise<number> {
        let result = 0;

        if (application_id && period_id) {
            result = await this.getScalarValue<number>("fn_get_expense_amount", [application_id, period_id]);
        }

        return result;
    }
}