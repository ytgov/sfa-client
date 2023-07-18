import { Knex } from "knex";
import moment from "moment";
import { AssessmentBaseRepository } from "./assessment-base-repository";
import { ApplicationRepository } from "../application";
import {
    ApplicationDTO,
    assessmentColumns,
    AssessmentDTO,
    DisbursementDTO,
    AssessmentTable,
} from "../../models";

export class AssessmentSTA extends AssessmentBaseRepository {

    private applicationRepo: ApplicationRepository;
    private application: Partial<ApplicationDTO> = {};

    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
        this.applicationRepo = new ApplicationRepository(maindb);
    }

    getAssessmentTable(assessment: AssessmentDTO): AssessmentTable {
        return Object.keys(assessment)
            .filter(key => assessmentColumns.includes(key as keyof AssessmentTable))
            .reduce((obj: any, key) => {
                obj[key as keyof AssessmentTable] = assessment[key as keyof AssessmentTable];
                return obj as AssessmentTable;
            }, {});
    }

    async getNewInfo(
        application_id: number,
        funding_request_id: number,
        assessment_id: number,
        disbursementList: DisbursementDTO[],
    ): Promise<AssessmentDTO> {

        let initValues: AssessmentDTO = {};

        this.application = await this.applicationRepo.getApplicationById(application_id);

        initValues.funding_request_id = funding_request_id;
        initValues.assessed_date = moment().toDate();
        initValues.effective_rate_date = this.application.classes_start_date;
        initValues.classes_start_date = this.application.classes_start_date;
        initValues.classes_end_date = this.application.classes_end_date;
        initValues.home_city_id = await this.getScalarValue<number>("fn_get_home_city", [this.application.student_id || 0]);
        initValues.destination_city_id = await this.getScalarValue<number>("fn_get_institution_city", [application_id]);
        initValues.dependent_count = await this.getScalarValue<number>("fn_get_dependent_count_sta_fct", [application_id]);
        initValues.second_residence_rate = this.application.is_two_residence
            ? await this.getScalarValue<number>("fn_get_second_residence_sta", [application_id])
            : 0;
        initValues.travel_allowance = await this.getScalarValue<number>("fn_get_travel_allowance", [
            initValues.home_city_id || 0,
            initValues.destination_city_id || 0
        ]);
        initValues.weekly_amount = await this.getScalarValue<number>("fn_get_weekly_amount_sta", [application_id]);
        initValues.assessed_amount = await this.getScalarValue<number>("fn_get_other_inst_total_sta", [
            initValues.weekly_amount || 0,
            initValues.second_residence_rate,
            0, // initValues.entitlement_days
            initValues.travel_allowance
        ]);

        if (disbursementList.length) {
            let disbursedAmounts = disbursementList.map((d) => {
                return d.disbursed_amount ?? 0;
            });
            initValues.previous_disbursement = disbursedAmounts.reduce((a, b) => a + b, 0);
        } else {
            initValues.previous_disbursement = await this.getScalarValue<number>("fn_get_disbursed_amount_fct", [
                funding_request_id,
                assessment_id // assessment_id
            ]);
        }

        initValues.net_amount = await this.getScalarValue<number>("fn_get_net_sta", [
            initValues.assessed_amount || 0,
            initValues.previous_disbursement || 0,
        ]);
        initValues.assessment_type_id = 1;
        initValues.years_funded = await this.getScalarValue<number>("fn_get_total_funded_years", [this.application.student_id || 0, application_id]);
        initValues.disbursements_required = 1; // always is 1
        initValues.previous_weeks = await this.getScalarValue<number>("fn_get_previous_weeks_sfa", [
            "'Normal'",
            this.application.student_id || 0,
            this.application.id || 0

        ]);
        initValues.assessed_weeks = await this.getScalarValue<number>("fn_get_allowed_weeks", [
            `'${moment(this.application.classes_start_date).format("YYYY-MM-DD")}'`,
            `'${moment(this.application.classes_end_date).format("YYYY-MM-DD")}'`
        ]);
        initValues.weeks_allowed = await this.getScalarValue<number>("fn_get_weeks_allowed_sta", [
            initValues.previous_weeks || 0,
            initValues.assessed_weeks || 0,
            moment().year() // prev_weeks_curr_yr
        ]);
        initValues.previous_upgrade_weeks = await this.getScalarValue<number>("fn_get_previous_weeks_sfa", [
            "'Upgrade'",
            this.application.student_id || 0,
            this.application.id || 0
        ]);

        return initValues;
    }

    async getAssessInfo(
        application_id: number,
        funding_request_id: number,
        assessment: AssessmentDTO,
    ): Promise<AssessmentDTO> {

        let values: Partial<AssessmentDTO> = { ...assessment };

        values.previous_disbursement = await this.getScalarValue<number>("fn_get_disbursed_amount_fct", [
            funding_request_id,
            values.id || 0 // assessment_id because is a preview
        ]);

        values.net_amount = await this.getScalarValue<number>("fn_get_net_sta", [
            values.assessed_amount || 0,
            values.previous_disbursement || 0,
        ]);

        values.years_funded = await this.getScalarValue<number>("fn_get_total_funded_years", [this.application.student_id || 0, application_id]);

        values.previous_weeks = await this.getScalarValue<number>("fn_get_previous_weeks_sfa", [
            "'Normal'",
            this.application.student_id || 0,
            this.application.id || 0

        ]);
        values.assessed_weeks = await this.getScalarValue<number>("fn_get_allowed_weeks", [
            `'${moment(values.classes_start_date).format("YYYY-MM-DD")}'`,
            `'${moment(values.classes_end_date).format("YYYY-MM-DD")}'`
        ]);
        values.previous_upgrade_weeks = await this.getScalarValue<number>("fn_get_previous_weeks_sfa", [
            "'Upgrade'",
            this.application.student_id || 0,
            this.application.id || 0
        ]);

        return values;
    }

    async refreshData(
        assessment: AssessmentDTO,
        disbursementList: DisbursementDTO[],
        application_id: number,
    ): Promise<AssessmentDTO> {

        let refreshData: AssessmentDTO = { ...assessment };

        this.application = await this.applicationRepo.getApplicationById(application_id);

        refreshData.second_residence_rate = this.application.is_two_residence
            ? await this.getScalarValue<number>("fn_get_second_residence_sta", [application_id])
            : 0;
        refreshData.travel_allowance = await this.getScalarValue<number>("fn_get_travel_allowance", [
            refreshData.home_city_id || 0,
            refreshData.destination_city_id || 0
        ]);
        refreshData.weekly_amount = await this.getScalarValue<number>("fn_get_weekly_amount_sta", [application_id]);

        refreshData.assessed_amount = await this.getScalarValue<number>("fn_get_other_inst_total_sta", [
            refreshData.weekly_amount || 0,
            refreshData.second_residence_rate,
            0, // initValues.entitlement_days
            refreshData.travel_allowance
        ]);

        if (disbursementList.length) {
            let disbursedAmounts = disbursementList.map((d) => {
                return d.disbursed_amount ?? 0;
            });
            refreshData.previous_disbursement = disbursedAmounts.reduce((a, b) => a + b, 0);
        }

        refreshData.net_amount = await this.getScalarValue<number>("fn_get_net_sta", [
            refreshData.assessed_amount || 0,
            refreshData.previous_disbursement || 0,
        ]);
        refreshData.years_funded = await this.getScalarValue<number>("fn_get_total_funded_years", [this.application.student_id || 0, application_id]);
        refreshData.disbursements_required = 1; // always is 1
        refreshData.previous_weeks = await this.getScalarValue<number>("fn_get_previous_weeks_sfa", [
            "'Normal'",
            this.application.student_id || 0,
            this.application.id || 0

        ]);
        refreshData.assessed_weeks = await this.getScalarValue<number>("fn_get_allowed_weeks", [
            `'${moment(refreshData.classes_start_date).format("YYYY-MM-DD")}'`,
            `'${moment(refreshData.classes_end_date).format("YYYY-MM-DD")}'`
        ]);
        refreshData.weeks_allowed = await this.getScalarValue<number>("fn_get_weeks_allowed_sta", [
            refreshData.previous_weeks || 0,
            refreshData.assessed_weeks || 0,
            moment().year() // prev_weeks_curr_yr
        ]);
        refreshData.previous_upgrade_weeks = await this.getScalarValue<number>("fn_get_previous_weeks_sfa", [
            "'Upgrade'",
            this.application.student_id || 0,
            this.application.id || 0
        ]);

        return refreshData;
    }

    async saveAssessment(
        assessment_id: number,
        assessment: AssessmentDTO,
        disbursementList: DisbursementDTO[],
    ): Promise<AssessmentDTO[] | undefined> {

        try {
            const assessInfo: AssessmentDTO[] = await this.updateAssessment(assessment_id, assessment);

            for (const disburse of disbursementList) {
                if (disburse?.id) {
                    await this.updateDisbursements(disburse);
                } else {
                    disburse.assessment_id = assessment_id;
                    disburse.funding_request_id = assessment.funding_request_id;
                    await this.insertDisbursements(disburse);
                }
            }

            return assessInfo;
        } catch (error) {
            return undefined;
        }
    }

    async insertAssessment(assessment: AssessmentDTO): Promise<any[]> {
        const filtered = this.getAssessmentTable(assessment);
        return this.mainDb(this.mainTable).insert(filtered).returning("*");
    }

    async updateAssessment(id: number, assessment: AssessmentDTO): Promise<any[]> {
        const filtered = this.getAssessmentTable(assessment);
        return this.mainDb(this.mainTable)
            .update(filtered)
            .where({
                id: id
            })
            .returning("*");
    }

    async insertDisbursements(disbursement: DisbursementDTO): Promise<any[]> {
        return this.mainDb("sfa.disbursement").insert(disbursement).returning("*");
    }
    async updateDisbursements(disbursement: DisbursementDTO): Promise<any[]> {
        const id = disbursement.id;
        delete disbursement.id;
        return this.mainDb("sfa.disbursement").where({ id }).update(disbursement);
    }

}