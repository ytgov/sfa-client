import { Knex } from "knex";
import { BaseRepository } from "../base-repository";
import { ScalarResult } from "models/repository";
import { AssessmentDTO, AssessmentTable, assessmentColumns } from "../../models";
import { IMainTable } from "../i-main-table";

export class AssessmentBaseRepository extends BaseRepository implements IMainTable {
    protected mainTable = "sfa.assessment";

    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
    }

    getMainTable(): string {
        return this.mainTable;
    }

    getAssessmentTable(assessment: AssessmentDTO): AssessmentTable {
        return Object.keys(assessment)
            .filter(key => assessmentColumns.includes(key as keyof AssessmentTable))
            .reduce((obj: any, key) => {
                obj[key as keyof AssessmentTable] = assessment[key as keyof AssessmentTable];
                return obj as AssessmentTable;
            }, {});
    }

    async getDependentCount(application_id?: number): Promise<number> {
        let result = 0;

        if (application_id) {
            result = await this.getScalarValue<number>("fn_get_dependent_count", [application_id]);
        }

        return result;
    }

    async getParentFamilySize(application_id?: number): Promise<number> {
        let result = 0;

        if (application_id) {
            result = await this.getScalarValue<number>("fn_get_parent_family_size", [application_id]);
        }

        return result;
    }

    async getAllAssessmentsByFundingRequestId(funding_request_id?: number): Promise<Array<number>> {
        let assessments: Array<number> = [];

        if (funding_request_id) {
            const result = await this.mainDb.raw(`SELECT id FROM sfa.fn_get_assessments_by_funding_request(${funding_request_id}) ORDER BY id ASC`);
            if (Array.isArray(result)) {
                result.forEach((x) => assessments.push(x.id));
            }
        }

        return assessments;
    }

    async getAssessmentByFundingRequestId(funding_request_id: number | undefined): Promise<AssessmentDTO> {
        let assessment: Partial<AssessmentDTO> = {};

        if (funding_request_id) {
            const result = await this.mainDb.raw(`EXEC sfa.sp_get_assessment_by_funding_request @funding_request_id = ${funding_request_id}`);
            if (Array.isArray(result) && result.length > 0) {
                assessment = this.singleResult(result);
            }
        }

        return assessment;
    }

    async getMaxAssessmentByFundingRequestId(funding_request_id: number | undefined): Promise<AssessmentDTO> {
        let assessment: Partial<AssessmentDTO> = {};

        if (funding_request_id) {
            const result = await this.mainDb.raw(`EXEC sfa.sp_get_max_assessment_by_funding_request @funding_request_id = ${funding_request_id}`);
            if (Array.isArray(result) && result.length > 0) {
                assessment = this.singleResult(result);
            }
        }

        return assessment;
    }

    async getAssessmentById(assessment_id: number | undefined): Promise<AssessmentDTO> {
        let assessment: Partial<AssessmentDTO> = {};

        if (assessment_id) {
            const result = await this.mainDb.raw(`EXEC sfa.sp_get_assessment_by_id @id = ${assessment_id}`);
            if (Array.isArray(result) && result.length > 0) {
                assessment = this.singleResult(result);
            }
        }

        return assessment;
    }

    async getAssessmentInfoPrc(funding_request_id?: number): Promise<number | undefined> {
        let assessment_id = undefined;
        
        if (funding_request_id) {
            assessment_id = await this.getScalarValue<number>("fn_get_assessment_info_prc", [funding_request_id]);
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

    async getStudentPreviousContribAmount(assessment_id?: number, academic_year_id?: number, student_id?: number): Promise<number> {
        let result = 0;

        if (assessment_id && academic_year_id && student_id) {
            result = await this.getScalarValue<number>("fn_get_student_previous_contrib_amount", [assessment_id, academic_year_id, student_id]);
        }

        return result;
    }

    async getSpousePreviousContribAmount(assessment_id?: number, academic_year_id?: number, student_id?: number): Promise<number> {
        let result = 0;

        if (assessment_id && academic_year_id && student_id) {
            result = await this.getScalarValue<number>("fn_get_spouse_previous_contrib_amount", [assessment_id, academic_year_id, student_id]);
        }

        return result;
    }
}