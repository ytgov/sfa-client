import { Knex } from "knex";
import { AssessmentBaseRepository } from "./assessment-base-repository";
import { ApplicationDTO, AssessmentDTO, CsgftGlobalDTO, CslftGlobalDTO, DisbursementDTO, FundingRequestDTO, StudentDTO } from "models";
import { NumbersHelper } from "utils/NumbersHelper";
import { ApplicationRepository, CslLookupRepository, DisbursementRepository, DependentRepository, FundingRequestRepository, StudentRepository } from "repositories";
import moment from "moment";
import { disabilityServiceRouter } from "routes/admin/disability-service-router";

export class AssessmentCsgftRepository extends AssessmentBaseRepository {

    // Repos
    private applicationRepo: ApplicationRepository;
    private studentRepo: StudentRepository;
    private fundingRequestRepo: FundingRequestRepository;
    private disbursementRepo: DisbursementRepository;
    private dependentRepo: DependentRepository;

    private numHelper: NumbersHelper;
    private assessment: Partial<AssessmentDTO> = {};
    private application: Partial<ApplicationDTO> = {};
    private student: Partial<StudentDTO> = {};
    private funding_request: Partial<FundingRequestDTO> = {};
    private disbursement: Partial<DisbursementDTO> = {};
    private disbursements: Array<Partial<DisbursementDTO>> = [];
    
    // Globals
    private globals: Partial<CsgftGlobalDTO> = {};

    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
        this.numHelper = new NumbersHelper();
        this.applicationRepo = new ApplicationRepository(maindb);
        this.studentRepo = new StudentRepository(maindb);
        this.fundingRequestRepo = new FundingRequestRepository(maindb);
        this.disbursementRepo = new DisbursementRepository(maindb);
        this.dependentRepo = new DependentRepository(maindb);
        
    }

    async getPreviousAssessment(assessment_id?: number): Promise<void> {
        let previous_assessment = undefined;

        if (assessment_id) {
            previous_assessment = await this.mainDb.raw(`EXEC sfa.sp_get_previous_assessment ${assessment_id};`) as AssessmentDTO;
            this.assessment = { ...this.assessment, ...previous_assessment };
        }
    }

    async loadData(funding_request_id: number, loadAssessment: boolean = true): Promise<void> {
        if (funding_request_id) {
            this.funding_request = await this.fundingRequestRepo.getFundingRequestById(funding_request_id);
            this.application = await this.applicationRepo.getApplicationByFundingRequestId(funding_request_id);
            this.student = await this.studentRepo.getStudentById(this.application.student_id);
            if (loadAssessment) {
                this.assessment = await this.getAssessmentByFundingRequestId(funding_request_id);
                this.disbursements = await this.disbursementRepo.getByAssessmentId(this.assessment.id);                
                this.disbursement = this.disbursements[0] ?? {};
            }                        
        }
    }

    async newFormInstance(funding_request_id: number): Promise<void> {
        await this.loadData(funding_request_id, true);

        await this.getInitValues();        

        if (this.globals.new_calc) {
            this.globals.new_calc = false;  
        }
    }

    async getInitValues(): Promise<void> {
        
        if ((this.assessment.id ?? 0) === 0) {
            await this.getAssessInfo();
        }
        else {
            await this.getScreenValues();
        }

        let disbursed_amt = 0;
        if (this.disbursements.length == 0) {
            disbursed_amt = await this.disbursementRepo.getDisbursedAmount(this.funding_request.id, this.assessment.id);
        }
        else {
            this.disbursements.forEach((x) => {
                disbursed_amt += parseInt((x.disbursed_amount?.toString() ?? '0'));
            });
        }
        
        this.assessment.previous_disbursement = disbursed_amt > 0 ? disbursed_amt : 0;
        this.assessment.net_amount = this.getNetAmount(this.assessment.assessed_amount, this.assessment.previous_disbursement);         

    }

    getNetAmount(assessed_amount: number | undefined, previous_disbursement: number | undefined): number | undefined {
        return this.numHelper.getNum(assessed_amount ?? 0) - this.numHelper.getNum(previous_disbursement ?? 0);
    }

    async getAssessInfo(): Promise<void> { 
        const assess_count = await this.getAssessmentCount(this.funding_request.id);

        if (assess_count > 0) {
            const assess_id = await this.getAssessmentInfoPrc(this.funding_request.id);

            this.assessment.assessment_type_id = 2;

            await this.getPreviousAssessment(assess_id);

            this.assessment.net_amount = this.getNetAmount(this.assessment.assessed_amount, this.assessment.previous_disbursement);
        }
        else {
            await this.getNewInfo();
        }
    }

    async getFamilySize(csl_classification?: number, application_id?: number): Promise<number> {

        let result = 1;

        if (csl_classification && application_id) {
            if (csl_classification === 1) {
                result = await this.getParentFamilySize(application_id) + 1;
            }
            else if (csl_classification === 4) {
                result = await this.dependentRepo.getCslDependentCount(application_id) + 1;
            }
            else if (csl_classification === 3) {
                result = await this.dependentRepo.getCslDependentCount(application_id) + 2;
            }
            else {
                result = 1;
            }
        }

        return result;
    }

    async getScreenValues(): Promise<void> {

        // Calculate family income
        if (this.assessment.csl_classification === 1) {
            this.assessment.family_income = (this.assessment.parent1_income ?? 0) + (this.assessment.parent2_income ?? 0);
            this.assessment.student_ln150_income = 0;
            this.assessment.spouse_ln150_income = 0;
        }
        else if (this.assessment.csl_classification === 3) {
            this.assessment.family_income = (this.assessment.student_ln150_income ?? 0) + (this.assessment.spouse_ln150_income ?? 0);
            this.assessment.parent1_income = 0;
            this.assessment.parent2_income = 0;
        }
        else {
            this.assessment.family_income = (this.assessment.student_ln150_income ?? 0);
            this.assessment.parent1_income = 0;
            this.assessment.parent2_income = 0;
            this.assessment.spouse_ln150_income = 0;
        }

        this.assessment.csl_assessed_need = 0;
    }

    async getNewInfo(): Promise<void> {

        if ((this.assessment.id ?? 0) === 0) {
            this.globals.new_calc = true;
            this.assessment.assessment_type_id = 1;
            this.assessment.effective_rate_date = this.application.classes_start_date;
        }
    
        this.assessment.dependent_count = await this.getDependentCount(this.application.id);
        this.assessment.classes_start_date = this.application.classes_start_date;
        this.assessment.classes_end_date = this.application.classes_end_date;
        this.assessment.csl_classification = this.application.csl_classification;
        const daysDiff = moment.utc(this.assessment.classes_end_date).diff(moment(this.assessment.classes_start_date), "day");
        this.assessment.study_weeks = Math.trunc((daysDiff + 1)/7 + .9999);

        this.assessment.parent1_income = this.application.parent1_income;
        this.assessment.parent2_income = this.application.parent2_income;
        this.assessment.student_ln150_income = this.application.student_ln150_income;
        this.assessment.spouse_ln150_income = this.application.spouse_ln150_income;

        this.assessment.family_size = await this.getFamilySize(this.assessment.csl_classification, this.application.id);

        await this.getScreenValues();

        if ((this.assessment.csl_assessed_need ?? 0) > 0) {
            const assess_amount = 0;
        }
            
    }

    getAssessedCost(assessment: Partial<AssessmentDTO>): number {
        let result = 0;

        const multiplier = (weeks: number): number => {
            if (weeks >= 1 && weeks < 24) {
                return 1;
            }
            else if (weeks >= 24) {
                return 2;
            }
            else {
                return 0
            }
        };

        const tuition = (assessment.tuition_estimate ?? 0);
        const books = (assessment.books_supplies_cost ?? 0);
        const shelter = this.numHelper.round((assessment.shelter_month ?? 0) * (assessment.study_months ?? 0));
        const p_trans = this.numHelper.round((assessment.p_trans_month ?? 0) * (assessment.study_months ?? 0));
        const x_trans = assessment.x_trans_total ?? 0;
        const relocation = assessment.relocation_total ?? 0;
        const r_trans = this.numHelper.round((assessment.r_trans_16wk ?? 0) * multiplier(assessment.study_weeks ?? 0));
        const d_food = this.numHelper.round((assessment.depend_food_allowable ?? 0) * (assessment.study_months ?? 0));
        const d_trans = this.numHelper.round((assessment.depend_tran_allowable ?? 0) * (assessment.study_months ?? 0));
        const day_care = this.numHelper.round(Math.min((assessment.day_care_actual ?? 0), (assessment.day_care_allowable ?? 0)) * (assessment.study_months ?? 0));
        const discretionary = this.numHelper.round(Math.min((assessment.discretionary_cost_actual ?? 0), (assessment.discretionary_cost ?? 0)));
        const uncapped = (assessment.uncapped_costs_total ?? 0);

        result = tuition + books + shelter + p_trans + x_trans + relocation + r_trans + d_food + d_trans + day_care + discretionary + uncapped;

        return result;
    }
}