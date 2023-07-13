import { Knex } from "knex";
import moment from "moment";
import { AssessmentDTO, ApplicationDTO, DisbursementDTO } from "models";
import { AssessmentBaseRepository } from "./assessment-base-repository";
import { ApplicationRepository } from "../application";

export class AssessmentSTA extends AssessmentBaseRepository {

    private applicationRepo: ApplicationRepository;
    private application: Partial<ApplicationDTO> = {};

    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
        this.applicationRepo = new ApplicationRepository(maindb);
    }

    async getNewInfo(
        application_id: number,
        funding_request_id: number,

    ): Promise<AssessmentDTO> {

        let initValues: AssessmentDTO = {};

        this.application = await this.applicationRepo.getApplicationById(application_id);

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
        initValues.assessed_amount = await this.getScalarValue<number>("fn_get_other_inst_total_sta", [
            initValues.weekly_amount || 0,
            initValues.second_residence_rate,
            0, // initValues.entitlement_days
            initValues.travel_allowance
        ]);
        initValues.previous_disbursement = await this.getScalarValue<number>("fn_get_disbursed_amount_fct", [
            funding_request_id,
            0 // assessment_id because is a preview
        ]);
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
        initValues.weekly_amount = await this.getScalarValue<number>("fn_get_weekly_amount_sta", [application_id]);


        return initValues;
    }

}