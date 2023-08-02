import { Knex } from "knex";
import { AssessmentBaseRepository } from "./assessment-base-repository";
import { ApplicationDTO, AssessmentDTO, CsgftGlobalDTO, CslftGlobalDTO, DisbursementDTO, FundingRequestDTO, PersonAddressDTO, StudentDTO } from "models";
import { NumbersHelper } from "utils/NumbersHelper";
import { ApplicationRepository, CslLookupRepository, DisbursementRepository, DependentRepository, FundingRequestRepository, StudentRepository, ParentRepository } from "repositories";
import moment from "moment";
import { disabilityServiceRouter } from "routes/admin/disability-service-router";
import { PersonRepository } from "repositories/person";
import { StandardOfLivingRepository } from "repositories/standard_of_living";

export class AssessmentCsgftRepository extends AssessmentBaseRepository {

    // Repos
    private applicationRepo: ApplicationRepository;
    private studentRepo: StudentRepository;
    private fundingRequestRepo: FundingRequestRepository;
    private disbursementRepo: DisbursementRepository;
    private dependentRepo: DependentRepository;
    private clsLookupRepo: CslLookupRepository;
    private personRepo: PersonRepository;
    private standardLivingRepo: StandardOfLivingRepository;
    private parentRepo: ParentRepository;

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
        this.clsLookupRepo = new CslLookupRepository(maindb);
        this.personRepo = new PersonRepository(maindb);
        this.standardLivingRepo = new StandardOfLivingRepository(maindb);
        this.parentRepo = new ParentRepository(maindb);
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

    async getAssessedNeed(assessment: Partial<AssessmentDTO>, funding_request: Partial<FundingRequestDTO>, application: Partial<ApplicationDTO>, student: Partial<StudentDTO>): Promise<number> {
        let result = 0;

        if ((assessment.id ?? 0) > 0) {
            assessment = await this.getMaxAssessmentByFundingRequestId(funding_request.id);
        }

        if ((assessment.id ?? 0) > 0) {
            result = this.getAssessedCost(assessment) - await this.getAssessedResources(assessment, application, student);
        }
        
        if (result < 0) {
            result = 0;
        }

        return result;
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

        this.assessment.csl_assessed_need = Math.ceil(await this.getAssessedNeed({}, this.funding_request, this.application, this.student));

        
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

    async getAssessedResources(assessment: Partial<AssessmentDTO>, application: Partial<ApplicationDTO>, student: Partial<StudentDTO>): Promise<number> {
        let result = 0;
        let ps_combined_net = 0;
        const grossCalc = (gross: number, rate: number): number => {
            return this.numHelper.round(gross - this.numHelper.round(gross * (rate/100)));
        }

        if (application.academic_year_id && application.academic_year_id < 2017) {


            if ((assessment.stud_pstudy_gross ?? 0) > 0) {
                ps_combined_net = grossCalc((assessment.stud_pstudy_gross ?? 0), (assessment.stud_pstudy_tax_rate ?? 0));
            }

            if ((assessment.spouse_pstudy_gross ?? 0) > 0) {
                ps_combined_net += grossCalc((assessment.spouse_pstudy_gross ?? 0), (assessment.spouse_pstudy_tax_rate ?? 0));
            }

            // Calculate the total allowable costs for the prestudy period.
            const calcWithMonths = (value: number, months: number): number => {
                return this.numHelper.round(value * months);
            }
            let ps_allowable_total = 0;
            ps_allowable_total = calcWithMonths((assessment.pstudy_shelter_month ?? 0), (assessment.pstudy_months ?? 0));
            ps_allowable_total += calcWithMonths((assessment.pstudy_p_trans_month ?? 0), (assessment.pstudy_months ?? 0));
            ps_allowable_total += this.numHelper.round((assessment.pstudy_x_trans_total ?? 0));
            ps_allowable_total += calcWithMonths((Math.min((assessment.pstudy_day_care_actual ?? 0), (assessment.day_care_allowable ?? 0))), (assessment.pstudy_months ?? 0));
            ps_allowable_total += calcWithMonths((assessment.pstudy_depend_food_allow ?? 0), (assessment.pstudy_months ?? 0));
            ps_allowable_total += calcWithMonths((assessment.pstudy_depend_tran_allow ?? 0), (assessment.pstudy_months ?? 0));

            const disc_cost = this.numHelper.round(ps_combined_net - (assessment.uncapped_pstudy_total ?? 0) - ps_allowable_total);
            const disc_80 = this.numHelper.round(Math.max(disc_cost, 0) * 0.8);

            const ps_contrib = (assessment.married_pstudy ?? this.numHelper.round(Math.max((assessment.pstudy_expected_contrib ?? 0), disc_80))); 

            // Calculate the combined net income for the study period.
            let combined_net = 0;
            let spouse_exempt_amt = 0;
            let exempt_amt = await this.clsLookupRepo.getStudentExemptAmount(application.academic_year_id);

            if (application.academic_year_id && application.academic_year_id > 2003) {
                exempt_amt = exempt_amt * (assessment.study_weeks ?? 0);
            }

            // Calculate the spouse exempt amount
            if (application.spouse_study_school_to && application.spouse_study_school_from) {
                
                spouse_exempt_amt = await this.clsLookupRepo.getStudentExemptAmount(application.academic_year_id);

                if (application.academic_year_id && application.academic_year_id > 2003) {
                    const spouse_school_diff = moment.utc(application.spouse_study_school_from).diff(moment(application.spouse_study_school_to), "day");
                    const spouse_school_weeks = Math.trunc((spouse_school_diff + 1)/7 + .9999);
                    spouse_exempt_amt = exempt_amt * Math.max((assessment.study_weeks ?? 0), spouse_school_weeks);
                }              
            }

            if ((assessment.student_gross_income ?? 0) > 0) {
                const s_gross = assessment.student_gross_income ?? 0;
                const s_tax = assessment.student_tax_rate ?? 0;
                combined_net = Math.max(0, this.numHelper.round(s_gross - this.numHelper.round(s_gross * (s_tax/100))));
            }

            if ((assessment.spouse_gross_income ?? 0) > 0) {
                const sp_gross = assessment.spouse_gross_income ?? 0;
                const sp_tax = assessment.spouse_tax_rate ?? 0;

                combined_net = combined_net + Math.max((this.numHelper.round(sp_gross - (sp_gross - (sp_tax/100)))), spouse_exempt_amt);
            }

            const contrib = (assessment.married_study ?? (this.numHelper.round(Math.max((assessment.spouse_expected_contribution ?? 0), combined_net))));
            
            let assets = 0;

            if ((assessment.vehicle_deduction ?? 0) > 0) {
                const v_deduction = await this.clsLookupRepo.getVehicleDeductionAmount(application.academic_year_id);
                assets = this.numHelper.round(Math.max(0, ((assessment.vehicle_deduction ?? 0) - v_deduction)));
            }

            if ((assessment.financial_investments ?? 0) > 0) {
                assets += assessment.financial_investments ?? 0;
            }

            if ((assessment.other_income ?? 0) > 0) {
                const other_income = assessment.other_income ?? 0;
                const asset_tax = assessment.asset_tax_rate ?? 0;
                assets += this.numHelper.round(other_income - (other_income * (asset_tax/100)));
            }
            
            const getYear = (year?: number, month?: number, sDate?: Date): number => {
                let result = 0;
                if (year && month && sDate) {
                    const date = moment().year(year).month(month - 1).endOf("month");
                    const diffDays = moment.utc(date).diff(sDate, "day");
                    result = Math.round(diffDays / 365.25 + 0.4999);
                }
                return result;
            };

            if ((assessment.rrsp_student_gross ?? 0) > 0) {
                const s_gross = assessment.rrsp_student_gross ?? 0;
                const s_year = getYear(student.high_school_left_year, student.high_school_left_month, assessment.pstudy_start_date);
                const s_deduct = await this.clsLookupRepo.getRRSPDeductionYearlyAmount(application.academic_year_id);
                assets += Math.max(0, (s_gross - (s_year * s_deduct)));
            }

            if ((assessment.rrsp_spouse_gross ?? 0) > 0) {
                const sp_gross = assessment.rrsp_spouse_gross ?? 0;
                const sp_year = getYear(application.spouse_hs_end_year, application.spouse_hs_end_month, assessment.pstudy_start_date);
                const sp_deduct = await this.clsLookupRepo.getRRSPDeductionYearlyAmount(application.academic_year_id);
                assets += Math.max(0, (sp_gross - (sp_year * sp_deduct)));
            }

            let parent_contrib = 0;
            const netIncome = (p1_income?: number, p2_income?: number, p1_tax?: number, p2_tax?: number): number {
                return (p1_income ?? 0) + (p2_income ?? 0) - (p1_tax ?? 0) - (p2_tax ?? 0);
            };

            if ((assessment.csl_classification ?? 0) === 1)
            {
                let msol = 0;
                let parent_contribution = 0;
                if (!assessment.parent_contribution_override) {
                    const mailing_address: PersonAddressDTO = await this.personRepo.getPersonAddress(student.id, 4);
                    if (mailing_address && mailing_address.province_id) {
                        msol = await this.standardLivingRepo.getStandardLivingAmount(application.academic_year_id, mailing_address.province_id, assessment.family_size ?? 0);
                    }

                    const discretionary_income = netIncome(assessment.parent1_income, assessment.parent2_income, assessment.parent1_tax_paid, assessment.parent2_tax_paid) - msol;
                    parent_contribution = await this.parentRepo.getParentContributionAmount(application.academic_year_id, discretionary_income);
                    parent_contrib = Math.round(parent_contribution * (assessment.study_weeks ?? 0)/Math.max(assessment.parent_ps_depend_count ?? 0, 1));
                }
                else {
                    parent_contrib = assessment.parent_contribution_override ?? 0;
                }                
            }
            else {
                parent_contrib = 0;
            }
            
            assets = Math.max((assessment.married_assets ?? 0), (assets ?? 0));

            result = assets + contrib + ps_contrib + parent_contrib;
        }
        else {
            result = (assessment.student_contribution ?? 0) + (assessment.spouse_contribution ?? 0);
        }

        return result;
    }
}