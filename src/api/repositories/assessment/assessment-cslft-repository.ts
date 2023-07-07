import { Knex } from "knex";
import moment from "moment";
import {AssessmentDTO, ApplicationDTO, StudentDTO, FundingRequestDTO, PersonAddressDTO} from "models";
import { AssessmentBaseRepository } from "./assessment-base-repository";
import { ApplicationRepository } from "../application";
import { StudentRepository, StudentLivingAllowanceRepository, StudentContributionRepository } from "../student";
import { FundingRequestRepository } from "../funding_request";
import { CslLookupRepository } from "../csl_lookup";
import { ExpenseRepository } from "../expense";
import { ProvinceRepository } from "../province";
import { DisbursementRepository } from "../disbursement";
import { ChildCareCeilingRepository } from "../child_care_ceiling";
import { TaxRateRepository } from "../tax_rate";
import { FieldProgramRepository } from "../field_program";
import { PersonRepository } from "../person";
import { StandardOfLivingRepository } from "../standard_of_living";
import { ParentRepository } from "../parent";
import { DependentRepository } from "../dependent";
import { InvestmentRepository } from "../investment";
import { CsgThresholdRepository } from "../csg_threshold";
import { NumbersHelper } from "../../utils/NumbersHelper";

export class AssessmentCslftRepository extends AssessmentBaseRepository {

    // Repos
    private applicationRepo: ApplicationRepository;
    private studentRepo: StudentRepository;
    private studentLivingAllowanceRepo: StudentLivingAllowanceRepository;
    private studentContributionRepo: StudentContributionRepository;
    private fundingRequestRepo: FundingRequestRepository;
    private cslLookupRepo: CslLookupRepository;
    private expenseRepo: ExpenseRepository;
    private provinceRepo: ProvinceRepository;
    private disbursementRepo: DisbursementRepository;
    private childCareCeilingRepo: ChildCareCeilingRepository;
    private taxRateRepo: TaxRateRepository;
    private fieldProgramRepo: FieldProgramRepository;
    private personRepo: PersonRepository;
    private standardLivingRepo: StandardOfLivingRepository;
    private parentRepo: ParentRepository;
    private dependentRepo: DependentRepository;
    private investmentRepo: InvestmentRepository;
    private csgThresholdRepo: CsgThresholdRepository;

    // Globals
    private assessment: Partial<AssessmentDTO> = {};
    private application: Partial<ApplicationDTO> = {};
    private student: Partial<StudentDTO> = {};
    private new_calc: boolean = false;
    private study_code?: number;
    private prestudy_code?: number;
    private assessment_id?: number;
    private assess_id?: number;
    private study_period_id: number = 2;
    private prestudy_period_id: number = 1;

    // Utils
    private numHelper: NumbersHelper;

    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
        this.numHelper = new NumbersHelper();
        this.applicationRepo = new ApplicationRepository(maindb);
        this.studentRepo = new StudentRepository(maindb);
        this.studentLivingAllowanceRepo = new StudentLivingAllowanceRepository(maindb);
        this.fundingRequestRepo = new FundingRequestRepository(maindb);
        this.cslLookupRepo = new CslLookupRepository(maindb);
        this.expenseRepo = new ExpenseRepository(maindb);
        this.provinceRepo = new ProvinceRepository(maindb);
        this.disbursementRepo = new DisbursementRepository(maindb);
        this.childCareCeilingRepo = new ChildCareCeilingRepository(maindb);
        this.taxRateRepo = new TaxRateRepository(maindb);
        this.studentContributionRepo = new StudentContributionRepository(maindb);
        this.fieldProgramRepo = new FieldProgramRepository(maindb);
        this.personRepo = new PersonRepository(maindb);
        this.standardLivingRepo = new StandardOfLivingRepository(maindb);
        this.parentRepo = new ParentRepository(maindb);
        this.dependentRepo = new DependentRepository(maindb);
        this.investmentRepo = new InvestmentRepository(maindb);
        this.csgThresholdRepo = new CsgThresholdRepository(maindb);
    }

    academicYearValidation = (year: number): boolean => {
        return !!(this.application.academic_year_id && this.application.academic_year_id < year);
    };

    getNetAmount(assessed_amount?: number, previous_disbursement?: number, return_uncashable_cert?: number): number {
        let result = (assessed_amount ?? 0) - (previous_disbursement ?? 0) + (return_uncashable_cert ?? 0);

        if (result >= -250 && result <= 0) {
            result = 0;
        }

        return result;
    }

    async getPreviousAssessment(assessment_id?: number): Promise<void> {
        let previous_assessment = undefined;

        if (assessment_id) {
            previous_assessment = await this.mainDb.raw(`EXEC sfa.sp_get_previous_assessment ${assessment_id};`) as AssessmentDTO;
            this.assessment = { ...this.assessment, ...previous_assessment };
        }
    }

    async getParentDependentCount(application_id?: number, attend_post_second?: boolean): Promise<number> {
        let result = 0;

        if (application_id) {
            let param = 'DEFAULT';
            if (attend_post_second !== undefined) {
                param = attend_post_second ? "1" : "0";
            }
            result = await this.getScalarValue<number>("fn_get_parent_dependent_count", [application_id, param]);
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

    async getOtherIncomeAmount(application_id?: number, academic_year_id?: number): Promise<number> {
        let result = 0;

        if (application_id && academic_year_id) {
            result = await this.getScalarValue<number>("fn_get_other_income_amount", [application_id, academic_year_id]);
        }

        return result;
    }

    async getCalculatedValues(): Promise<void> {

        // Get the study expenses.
        this.assessment.uncapped_costs_total = await this.getExpenseAmount(this.application.id, 2);

        // Financial investments
        const student_investment_total: number = await this.investmentRepo.getInvestmentTotalAmount(this.application.id, 1, false);
        const spouse_investment_total: number = await this.investmentRepo.getInvestmentTotalAmount(this.application.id, 2, false);
        this.assessment.financial_investments = student_investment_total + spouse_investment_total;

        this.assessment.rrsp_student_gross = await this.investmentRepo.getInvestmentTotalAmount(this.application.id, 1, true);
        this.assessment.rrsp_spouse_gross = await this.investmentRepo.getInvestmentTotalAmount(this.application.id, 2, true);
        // Skip calculation of vehicle assessment. IS NOT BEING USED.

        this.assessment.other_income = await this.getOtherIncomeAmount(this.application.id, this.application.academic_year_id);

        const totalGrantAmount = await this.disbursementRepo.getTotalGrantAmount(this.application.id)
        const grantAmount = await this.disbursementRepo.getGrantAmount(this.application.id, 30);
        this.assessment.total_grant_awarded = totalGrantAmount - grantAmount;
    }

    async getContributionValues(): Promise<void> {
        const max_weeks = 8/12*52;

        if (this.assessment.csl_classification === 1) {
            this.assessment.student_family_size = await this.getParentFamilySize(this.application.id);
            this.assessment.family_income = (this.assessment.parent1_income ?? 0) + (this.assessment.parent2_income ?? 0);
        }
        else if (this.assessment.csl_classification === 4) {
            this.assessment.student_family_size = await this.dependentRepo.getCslDependentCount(this.application.id) + 1;
            this.assessment.family_income = (this.assessment.student_ln150_income ?? 0);
        }
        else if (this.assessment.csl_classification === 3) {
            this.assessment.student_family_size = await this.dependentRepo.getCslDependentCount(this.application.id) + 2;
            this.assessment.family_income = (this.assessment.student_ln150_income ?? 0) + (this.assessment.spouse_ln150_income ?? 0);
        }
        else {
            this.assessment.student_family_size = 1;
            this.assessment.family_income = (this.assessment.student_ln150_income ?? 0);
        }

        const family_size = this.assessment.student_family_size > 7 ? 7 : this.assessment.student_family_size;
        const income_threshold = await this.csgThresholdRepo.getIncomeThresholdAmount(this.application.academic_year_id, family_size);

        const cslLookupContribTable = await this.cslLookupRepo.getContribPct(this.application.academic_year_id);

        if (this.assessment.family_income <= income_threshold) {
            this.assessment.student_expected_contribution = this.numHelper.round(Math.min(cslLookupContribTable.low_income_student_contrib_amount ?? 0, (((cslLookupContribTable.low_income_student_contrib_amount ?? 0) / (8*12/52)) * (this.assessment.study_weeks ?? 0))));
        }
        else {
            const weekly_student_contrib = ((cslLookupContribTable.low_income_student_contrib_amount ?? 0)/(8*12/52)) + ((((this.assessment.family_income ?? 0) - income_threshold)/(8*12/52))*(cslLookupContribTable.student_contrib_percent ?? 0));
            const weekly_calc = (weekly_student_contrib * Math.min((this.assessment.study_weeks ?? 0), max_weeks)) ?? 0;
            this.assessment.student_expected_contribution = this.numHelper.round(Math.min(weekly_calc, cslLookupContribTable.student_contrib_max_amount ?? 0));
        }

        this.assessment.student_previous_contribution = await this.getStudentPreviousContribAmount(this.assessment.id, this.application.academic_year_id, this.application.student_id);
        this.assessment.student_contribution = this.assessment.student_contrib_exempt ? 0 : ((this.assessment.student_expected_contribution ?? 0) - (this.assessment.student_previous_contribution));

        if (this.assessment.csl_classification === 3 && this.assessment.family_income > income_threshold) {
            const weekly_spouse_contrib = (cslLookupContribTable.spouse_contrib_percent ?? 0) * (((this.assessment.family_income ?? 0) - income_threshold)/(8*12/52));
            this.assessment.spouse_expected_contribution = this.numHelper.round(weekly_spouse_contrib * Math.min((this.assessment.study_weeks ?? 0), max_weeks));
            this.assessment.spouse_previous_contribution = await this.getSpousePreviousContribAmount(this.assessment.id, this.application.academic_year_id, this.application.student_id);

            this.assessment.spouse_contribution = this.assessment.spouse_contrib_exempt ? 0 : this.numHelper.round(((this.assessment.spouse_expected_contribution ?? 0) - (this.assessment.spouse_previous_contribution)));
        }
        else {
            this.assessment.spouse_expected_contribution = 0;
            this.assessment.spouse_previous_contribution = 0;
            this.assessment.spouse_contribution = 0;
        }

        await this.getContribDisplayValues();
    }

    async setIdGlobals(): Promise<void> {
        const studyCodes: Record<string, number> = {
            'SP': await this.studentRepo.getStudentCategoryId("'SP'"),
            'M': await this.studentRepo.getStudentCategoryId("'M'"),
            'DEP': await this.studentRepo.getStudentCategoryId("'DEP'"),
            'SDA': await this.studentRepo.getStudentCategoryId("'SDA'"),
            'SDH': await this.studentRepo.getStudentCategoryId("'SDH'"),
            'MW': await this.studentRepo.getStudentCategoryId("'MW'"),
            'SIH': await this.studentRepo.getStudentCategoryId("'SIH'"),
            'SIA': await this.studentRepo.getStudentCategoryId("'SIA'"),
        };

        const assignCode = (csl_classification: number, accom_code: number): number | undefined => {
            if (csl_classification === 1 && accom_code === 1) {
                return studyCodes.SDH;
            }
            else if (csl_classification === 1 && accom_code === 2) {
                return studyCodes.SDA;
            }
            else if ([2,5].includes(csl_classification) && accom_code === 1) {
                return studyCodes.SIH;
            }
            else if ([2,5].includes(csl_classification ?? 0) && accom_code === 2) {
                return studyCodes.SIA;
            }
            else if (csl_classification === 3) {
                return studyCodes.M;
            }
            else if (csl_classification === 4) {
                return studyCodes.SP;
            }
            else {
                return undefined;
            }
        }

        this.study_code = assignCode(this.assessment.csl_classification ?? 0, this.assessment.study_accom_code ?? 0);
        this.prestudy_code = assignCode(this.assessment.prestudy_csl_classification ?? 0, this.assessment.prestudy_accom_code ?? 0);
    }

    async getAssessInfoCslft(funding_request_id?: number): Promise<AssessmentDTO> {

        let assess_id: number | undefined = undefined;        

        if (funding_request_id) {
            this.application = await this.applicationRepo.getApplicationByFundingRequestId(funding_request_id);
            this.student = await this.studentRepo.getStudentById(this.application.student_id);
            if (!this.assessment.id) {
                const assess_count = await this.getAssessmentCount(funding_request_id);
            
                if (assess_count !== undefined && assess_count > 0) {
                    assess_id = await this.getAssessmentInfoPrc(funding_request_id);
        
                    await this.getPreviousAssessment(assess_id);
                }
                else {
                    await this.getNewInfo(funding_request_id);
                }
            }
            else {
                this.assessment_id = this.assessment.id;
            }

            await this.setIdGlobals();

            if (!this.assessment.program_id && !this.assessment.study_area_id) {
                this.assessment.field_program_code = await this.fieldProgramRepo.getFieldProgramCode(this.assessment.study_area_id, this.assessment.program_id);
            }

            this.assessment.recovered_overaward = await this.getCslOveraward(this.application.student_id, this.assessment.id);

            assess_id = (((this.assessment_id ?? 0) < (this.assess_id ?? 0) && !this.assessment.id) || this.assess_id === 0) ? this.assessment_id : this.assess_id;

            const disbursed_amt = await this.disbursementRepo.getDisbursedAmount(funding_request_id, assess_id);
            this.assessment.previous_disbursement = disbursed_amt > 0 ? disbursed_amt : 0;

            this.assessment.previous_cert = await this.disbursementRepo.getPreviousDisbursedAmount(funding_request_id, this.assessment.id);

            this.assessment.net_amount = this.getNetAmount(this.assessment.assessed_amount, this.assessment.previous_disbursement, this.assessment.return_uncashable_cert);

            await this.getLookupValues(funding_request_id);

            await this.getContribDisplayValues();

            if (this.new_calc) {
                this.new_calc = false;
                await this.getCalculatedValues();

                if (this.application.academic_year_id && this.application.academic_year_id >= 2017) {
                    await this.getContributionValues();
                }
            }
        }

        return this.assessment;
    }

    async getLookupValues(funding_request_id: number): Promise<void> {
        const canadianProvinces = [
            1,2,3,4,5,6,7,8,9,10,11,12,13
        ];

        /**
         * @todo Try to get all the values with a Promise.All OR Create a single function to return the catalog.
         */
        const studyCodes: Record<string, number> = { 
            'SP': await this.studentRepo.getStudentCategoryId("'SP'"),
            'M': await this.studentRepo.getStudentCategoryId("'M'"),
            'DEP': await this.studentRepo.getStudentCategoryId("'DEP'"),
            'SDA': await this.studentRepo.getStudentCategoryId("'SDA'"),
            'SDH': await this.studentRepo.getStudentCategoryId("'SDH'"),
            'MW': await this.studentRepo.getStudentCategoryId("'MW'")
        };

        let max_x_trans: number = 0;
        let calc_x_trans: number = 0;
        let prestudy_prov = this.assessment.prestudy_province_id;
        let study_prov = this.assessment.study_province_id;
        if (!canadianProvinces.includes(this.assessment.prestudy_province_id ?? 0)) {
            prestudy_prov = 3;
        }

        if (!canadianProvinces.includes(this.assessment.study_province_id ?? 0)) {
            study_prov = prestudy_prov;
        }

        // Cost Tab
        if (this.assessment.study_distance ?? 0 > 0) {
            max_x_trans = await this.studentLivingAllowanceRepo.getShelterAmount(this.application.academic_year_id, study_prov, studyCodes.SDA) * (this.assessment.study_months ?? 0);  
            
            calc_x_trans = (this.assessment.study_distance ?? 0) * 2 * await this.cslLookupRepo.getMileageRate(this.application.academic_year_id) * (this.assessment.study_weeks ?? 0) * 5;

            this.assessment.x_trans_total = this.numHelper.round(Math.min(max_x_trans, calc_x_trans));
        }

        if (this.assessment.study_province_id !== this.assessment.prestudy_province_id) {
            if (!this.assessment.relocation_total || this.assessment.relocation_total === 0) {
                this.assessment.relocation_total = await this.cslLookupRepo.getMaxRelocation(this.application.academic_year_id);
            }

            if ((!(this.assessment.study_living_w_spouse_flag ?? false) && this.assessment.csl_classification === 3) || (this.assessment.prestudy_accom_code ?? 0) === 1 && (!this.assessment.r_trans_16wk || this.assessment.r_trans_16wk === 0)) {
                this.assessment.r_trans_16wk = await this.cslLookupRepo.getMaxReturnTransport(this.application.academic_year_id);
            }
        }

        // Prestudy and Study Tab
        if (this.academicYearValidation(2017)) {
            if (this.assessment.prestudy_distance ?? 0 > 0) {
                max_x_trans = await this.studentLivingAllowanceRepo.getShelterAmount(this.application.academic_year_id, prestudy_prov, studyCodes.SDA) * (this.assessment.pstudy_months ?? 0);  
            
                calc_x_trans = (this.assessment.prestudy_distance ?? 0) * 2 * await this.cslLookupRepo.getMileageRate(this.application.academic_year_id) * (this.assessment.pstudy_weeks ?? 0) * 5; 

                this.assessment.pstudy_x_trans_total = this.numHelper.round(Math.min(max_x_trans, calc_x_trans));
            }

            let prestudy_code: number | undefined = this.prestudy_code;
            if (this.prestudy_code === studyCodes.M && (this.assessment.dependent_count ?? 0) > 0) {
                prestudy_code = studyCodes.MW;
            }
            this.assessment.pstudy_expected_contrib = await this.studentContributionRepo.getStudentContribution(this.application.academic_year_id, prestudy_prov, prestudy_code, 1) * (this.assessment.pstudy_months ?? 0);

            const student_exemption = await this.cslLookupRepo.getStudentExemptAmount(this.application.academic_year_id);
            let student_exemption_modifier = (this.assessment.study_weeks ?? 0);
            let spouse_exemption_modifier = Math.min(student_exemption_modifier, moment(this.application.spouse_study_school_to).diff(this.application.spouse_study_school_from, "week"));
            if (this.academicYearValidation(2004)) {                
                student_exemption_modifier = 1;
                spouse_exemption_modifier = 1;
            }
            this.assessment.student_exemption = student_exemption * student_exemption_modifier;

            if (this.application.spouse_study_school_to && this.application.spouse_study_school_from) {
                this.assessment.spouse_exemption = student_exemption * spouse_exemption_modifier;
            }
        }

        // Assets Tab
        if (this.academicYearValidation(2017)) {            
            this.assessment.vehicle_deduction = await this.cslLookupRepo.getVehicleDeductionAmount(this.application.academic_year_id);
            this.assessment.rrsp_student_ann_deduct = await this.cslLookupRepo.getRRSPDeductionYearlyAmount(this.application.academic_year_id);
            this.assessment.rrsp_spouse_ann_deduct = this.assessment.rrsp_student_ann_deduct;
        }

        // Parent Tab
        if (this.study_code === studyCodes.SDA || this.study_code === studyCodes.SDH) {
            const mailing_address: PersonAddressDTO = await this.personRepo.getPersonAddress(this.student.person_id, 2);
            if (mailing_address && mailing_address.province_id) {
                this.assessment.parent_msol = await this.standardLivingRepo.getStandardLivingAmount(this.application.academic_year_id, mailing_address.province_id, this.assessment.family_size ?? 0);

                if ((this.assessment.parent_discretionary_income ?? 0) > 0) {
                    this.assessment.parent_weekly_contrib = await this.parentRepo.getParentContributionAmount(this.application.academic_year_id, this.numHelper.round(this.assessment.parent_discretionary_income ?? 0));
                }
            }
        }

        // Calculate previous disbursement amount.
        const assess_id = (((this.assessment_id ?? 0) < (this.assess_id ?? 0) && !this.assessment.id) || this.assess_id === 0) ? this.assessment_id : this.assess_id;

        const disbursed_amt = await this.disbursementRepo.getDisbursedAmount(funding_request_id, assess_id);
        this.assessment.previous_disbursement = disbursed_amt > 0 ? disbursed_amt : 0;

        this.assessment.net_amount = this.getNetAmount(this.assessment.assessed_amount, this.assessment.previous_disbursement, this.assessment.return_uncashable_cert);

        // Cost Tab
        this.assessment.p_trans_month = this.assessment.p_trans_month ?? 0;
        this.assessment.r_trans_16wk = this.assessment.r_trans_16wk ?? 0;
		this.assessment.day_care_allowable = this.assessment.day_care_allowable ?? 0;
        this.assessment.depend_food_allowable = this.assessment.depend_food_allowable ?? 0;
        this.assessment.depend_tran_allowable = this.assessment.depend_tran_allowable ?? 0;
        this.assessment.x_trans_total = this.assessment.x_trans_total ?? 0;
        this.assessment.relocation_total = this.assessment.relocation_total ?? 0;
        this.assessment.day_care_actual = this.assessment.day_care_actual ?? 0;

        if (this.academicYearValidation(2017)) {
            // Pre Study Tab	
            this.assessment.pstudy_shelter_month = this.assessment.pstudy_shelter_month ?? 0;
            this.assessment.pstudy_p_trans_month = this.assessment.pstudy_p_trans_month ?? 0;
            this.assessment.pstudy_day_care_allow = this.assessment.pstudy_day_care_allow ?? 0;
            this.assessment.pstudy_dep_food_allow = this.assessment.pstudy_dep_food_allow ?? 0;
            this.assessment.pstudy_dep_tran_allow = this.assessment.pstudy_dep_tran_allow ?? 0;
            this.assessment.pstudy_x_trans_total = this.assessment.pstudy_x_trans_total ?? 0;
            this.assessment.pstudy_day_care_actual = this.assessment.pstudy_day_care_actual ?? 0;
            this.assessment.spouse_pstudy_tax_rate = this.assessment.spouse_pstudy_tax_rate ?? 0;
            // Study Tab	
            this.assessment.spouse_expected_income = this.assessment.spouse_expected_income ?? 0;
            this.assessment.spouse_tax_rate = this.assessment.spouse_tax_rate ?? 0;
            this.assessment.spouse_exemption = this.assessment.spouse_exemption ?? 0;
        }

    }

    async getContribDisplayValues(): Promise<void> {

        const student_cppd_count = await this.countIncomeTypeByApplication(3, this.application.id);

        if (this.application.is_perm_disabled) {
            this.assessment.student_exemption_reason = "Is Disabled";
        }

        if (student_cppd_count > 0) {
            this.assessment.student_exemption_reason = "Receives CPP Disability";
        }

        if (this.assessment.dependent_count && this.assessment.dependent_count > 0) {
            this.assessment.student_exemption_reason = "Has Dependents";
        }

        if (this.student.is_crown_ward) {
            this.assessment.student_exemption_reason = "Crown Ward";
        }

        if (this.student.indigenous_learner_id && this.student.indigenous_learner_id > 0) {
            this.assessment.student_exemption_reason = "Indigenous Learner";
        }

        // Spouse exempt reason
        const spouse_sa_count = await this.countIncomeTypeByApplication(21, this.application.id);
        const spouse_ie_count = await this.countIncomeTypeByApplication(2, this.application.id);
        const spouse_cppd_count = await this.countIncomeTypeByApplication(3, this.application.id);

        if (spouse_sa_count > 0) {
            this.assessment.spouse_exemption_reason = "Receives SA";
        }

        if (spouse_cppd_count > 0) {
            this.assessment.spouse_exemption_reason = "Receives CPP Disability";
        }

        if (spouse_ie_count > 0) {
            this.assessment.spouse_exemption_reason = "Receives IE";
        }

        if (this.application.spouse_study_school_from) {
            this.assessment.spouse_exemption_reason = "Is a student";
        }

        this.getCombinedContribution();

        // Family Size and Income
        switch (this.assessment.csl_classification) {
            case 1:
                this.assessment.family_income = (this.assessment.parent1_income ?? 0) + (this.assessment.parent2_income ?? 0);
                break;
            case 4:
                this.assessment.family_income = (this.assessment.student_ln150_income ?? 0);
                break;
            case 3:
                this.assessment.family_income = (this.assessment.student_ln150_income ?? 0) + (this.assessment.spouse_ln150_income ?? 0);
                break;
            default:
                this.assessment.family_income = (this.assessment.student_ln150_income ?? 0);
        }
    }

    getCombinedContribution(): void {
        let combined: number = this.assessment.student_contribution ?? 0;
        if (this.assessment.student_contribution_override || this.assessment.student_contribution_review) {
            combined = this.assessment.student_contribution_override ?? 0;
        }

        if (this.assessment.spouse_contribution_override || this.assessment.spouse_contribution_review) {
            combined = combined + (this.assessment.spouse_contribution_override ?? 0);
        }
        else {
            combined = combined + (this.assessment.spouse_contribution ?? 0);
        }

        this.assessment.combined_contribution = combined;
    }

    async getMsfaaInfo(info_type: string): Promise<void> {
        /**
         * @todo Complete this section.
         * @link https://docs.google.com/document/d/1aKyZJEr5bamxZc5vvT3LProGZpAmJ6QV/edit?pli=1#bookmark=id.cua76h7kh2cj
         */
    }

    async getNewInfo(funding_request_id: number): Promise<void> {

        const funding_request: FundingRequestDTO = await this.fundingRequestRepo.getFudningRequestById(funding_request_id);

        if (!this.assessment.id) {
            this.new_calc = true;
            this.assessment.assessment_type_id = 1;
        }

        this.assessment.student_contrib_exempt = false;
        this.assessment.spouse_contrib_exempt = false;

        this.assessment.dependent_count = await this.getScalarValue<number>("fn_get_dependent_count", [this.application.id ?? 0])
        this.assessment.classes_start_date = this.application.classes_start_date;
        this.assessment.classes_end_date = this.application.classes_end_date;
        this.assessment.study_weeks = moment(this.assessment.classes_end_date).diff(moment(this.assessment.classes_start_date), "week");
        this.assessment.study_months = moment(this.assessment.classes_end_date).diff(moment(this.assessment.classes_start_date), "month");

        this.assessment.pstudy_start_date = this.application.prestudy_start_date;
        this.assessment.pstudy_end_date = this.application.prestudy_end_date;
        
        if (this.application.prestudy_start_date) {
            this.assessment.pstudy_end_date = moment(this.application.classes_start_date).add(-1, "month").endOf("month").toDate();
            this.assessment.pstudy_start_date = moment(this.assessment.pstudy_end_date).add(-3, "month").startOf("month").toDate();
        }

        this.assessment.pstudy_weeks = moment(this.assessment.pstudy_end_date).diff(moment(this.assessment.pstudy_start_date), "week");
        this.assessment.pstudy_months = moment(this.assessment.pstudy_end_date).diff(moment(this.assessment.pstudy_start_date), "month");

        this.assessment.prestudy_province_id = this.application.prestudy_province_id;
        this.assessment.prestudy_province_id = this.application.prestudy_province_id;
        this.assessment.prestudy_accom_code = this.application.prestudy_accom_code;
        this.assessment.marital_status_id = this.application.marital_status_id;
        this.assessment.study_area_id = this.application.study_area_id;
        this.assessment.program_id = this.application.program_id;
        this.assessment.study_province_id = this.application.study_province_id;
        this.assessment.study_accom_code = this.application.study_accom_code;
        this.assessment.prestudy_csl_classification = this.application.prestudy_csl_classification;
        this.assessment.csl_classification = this.application.csl_classification;
        this.assessment.tuition_estimate = this.application.tuition_estimate_amount;
        this.assessment.books_supplies_cost = Math.min(await this.cslLookupRepo.getMaxBooks(this.application.academic_year_id), this.application.books_supplies_cost ?? 0);
        this.assessment.study_distance = this.application.study_distance;
        this.assessment.prestudy_distance = this.application.prestudy_distance;
        this.assessment.parent1_income = this.application.parent1_income;
        this.assessment.parent2_income = this.application.parent2_income;
        this.assessment.study_living_w_spouse_flag = this.application.study_living_w_spouse;
        this.assessment.parent1_tax_paid = this.application.parent1_tax_paid;
        this.assessment.parent2_tax_paid = this.application.parent2_tax_paid;
        this.assessment.csl_request_amount = funding_request.csl_request_amount;
        this.assessment.csl_full_amt_flag = funding_request.is_csl_full_amount;
        this.assessment.discretionary_cost_actual = await this.expenseRepo.getAllowableExpense(2,7,this.application.id) + await this.expenseRepo.getAllowableExpense(2,11,this.application.id);
        this.assessment.day_care_actual = await this.expenseRepo.getActualExpense(2,3,this.application.id); 
        this.assessment.study_bus_flag = this.application.study_bus;
        this.assessment.prestudy_bus_flag = this.application.prestudy_bus;
        this.assessment.family_size = await this.getParentFamilySize(this.application.id);
        this.assessment.parent_ps_depend_count = await this.getParentDependentCount(this.application.id, true);
        this.assessment.parent_province = await this.provinceRepo.getProvinceId(this.application.id);
        this.assessment.total_grant_awarded = await this.disbursementRepo.getTotalGrantAmount(this.application.id);

        const canadianProvinces = [
            1,2,3,4,5,6,7,8,9,10,11,12,13
        ];

        let prestudy_prov = this.assessment.prestudy_province_id;
        let study_prov = this.assessment.study_province_id;
        let spouse_prov = this.assessment.spouse_province_id;
        if (!canadianProvinces.includes(this.assessment.prestudy_province_id ?? 0)) {
            prestudy_prov = 3;
        }

        if (!canadianProvinces.includes(this.assessment.study_province_id ?? 0)) {
            study_prov = prestudy_prov;
        }

        if ([3,4].includes(this.assessment.marital_status_id ?? 0)) {
            if (this.assessment.study_living_w_spouse_flag) {
                this.assessment.spouse_province_id = this.application.study_province_id;

                if (!canadianProvinces.includes(this.assessment.spouse_province_id ?? 0)) {
                    spouse_prov = study_prov;
                }
            }
            else {
                this.assessment.spouse_province_id = this.application.prestudy_province_id;

                if (!canadianProvinces.includes(this.assessment.spouse_province_id ?? 0)) {
                    spouse_prov = prestudy_prov;
                }
            }
        }

        this.assessment.period = this.assessment.study_months <= 4 ? "S" : "P";

        //Cost tab
        this.assessment.shelter_month = await this.studentLivingAllowanceRepo.getShelterFoodMisc(this.application.academic_year_id, study_prov, this.study_code);
        this.assessment.discretionary_cost = await this.cslLookupRepo.getMaxDiscretionary(this.application.academic_year_id);

        const studyCodes: Record<string, number> = { 
            'SP': await this.studentRepo.getStudentCategoryId("'SP'"),
            'M': await this.studentRepo.getStudentCategoryId("'M'"),
            'DEP': await this.studentRepo.getStudentCategoryId("'DEP'")
        };

        const studyCodeValidation: boolean = this.study_code === studyCodes.SP || this.study_code === studyCodes.M;
        const prestudyCodeValidation: boolean = this.prestudy_code === studyCodes.SP || this.prestudy_code === studyCodes.M;

        if (studyCodeValidation && this.assessment.dependent_count > 0) {
            this.assessment.depend_food_allowable = await this.studentLivingAllowanceRepo.getShelterFoodMisc(this.application.academic_year_id, study_prov, studyCodes.DEP);
            this.assessment.day_care_allowable = await this.childCareCeilingRepo.getChildCare(this.application.academic_year_id, study_prov) * this.assessment.dependent_count;
        }

        if (this.assessment.study_bus_flag) {
            if (studyCodeValidation && this.assessment.dependent_count > 0) {
                this.assessment.depend_tran_allowable = await this.studentLivingAllowanceRepo.getPublicTransportaion(this.application.academic_percent, study_prov, studyCodes.DEP) * this.assessment.dependent_count;
            }
            
            this.assessment.p_trans_month = await this.studentLivingAllowanceRepo.getPublicTransportaion(this.application.academic_year_id, study_prov, this.study_code);
        }

        if (this.application.academic_year_id && this.application.academic_year_id < 2017) {
            this.assessment.pstudy_day_care_actual = await this.expenseRepo.getActualExpense(1,3, this.application.id);

            // Prestudy Tab
            let pstudy_student_monthly_amount = 0;
            let pstudy_spouse_monthly_amount = 0;
            if (this.assessment.stud_pstudy_gross && this.assessment.stud_pstudy_gross !== 0) {
                pstudy_student_monthly_amount = this.assessment.stud_pstudy_gross / this.assessment.pstudy_months;
            }

            this.assessment.stud_pstudy_tax_rate = await this.taxRateRepo.getPrestudyTaxRate(this.application.academic_year_id, pstudy_student_monthly_amount);

            if (prestudyCodeValidation) {
                if (this.assessment.stud_pstudy_gross && this.assessment.stud_pstudy_gross !== 0) {
                    pstudy_spouse_monthly_amount = this.assessment.stud_pstudy_gross / this.assessment.pstudy_months;
                }
    
                this.assessment.spouse_pstudy_tax_rate = await this.taxRateRepo.getSpouseTaxRate(this.application.academic_year_id, pstudy_spouse_monthly_amount);

                if (this.assessment.dependent_count > 0) {
                    this.assessment.pstudy_depend_food_allow = await this.studentLivingAllowanceRepo.getShelterFoodMisc(this.application.academic_year_id, prestudy_prov, studyCodes.DEP) * this.assessment.dependent_count;
                }
            }

            this.assessment.pstudy_shelter_month = await this.studentLivingAllowanceRepo.getShelterFoodMisc(this.application.academic_year_id, prestudy_prov, this.prestudy_code);

            if (this.assessment.prestudy_bus_flag) {

                if (prestudyCodeValidation && this.assessment.dependent_count > 0) {
                    this.assessment.pstudy_depend_tran_allow = await this.studentLivingAllowanceRepo.getPublicTransportaion(this.application.academic_year_id, studyCodes.DEP) * this.assessment.dependent_count;
                }

                this.assessment.pstudy_p_trans_month = await this.studentLivingAllowanceRepo.getPublicTransportaion(this.application.academic_year_id, this.prestudy_code);
            }            

            // Study Tab
            let study_student_monthly_amount = 0;
            let study_spouse_monthly_amount = 0;
            if (this.assessment.student_gross_income && this.assessment.student_gross_income !== 0) {
                study_student_monthly_amount = this.assessment.student_gross_income / this.assessment.study_months;
            }

            this.assessment.student_tax_rate = await this.taxRateRepo.getStudyTaxRate(this.application.academic_year_id, study_student_monthly_amount);

            if (studyCodeValidation) {
                if (this.assessment.student_gross_income && this.assessment.student_gross_income !== 0) {
                    study_spouse_monthly_amount = this.assessment.student_gross_income / this.assessment.study_months;
                }
    
                this.assessment.spouse_tax_rate = await this.taxRateRepo.getSpouseTaxRate(this.application.academic_year_id, study_spouse_monthly_amount);

                this.assessment.spouse_expected_income = 0;
                if (!(this.application.spouse_study_school_to && this.application.spouse_study_school_from)) {
                    this.assessment.spouse_expected_income = await this.studentContributionRepo.getStudentContribution(this.application.academic_year_id, spouse_prov, this.study_code, 2) * this.assessment.study_months;
                }
            }
            
        }
        else {
            this.assessment.student_ln150_income = this.application.student_ln150_income;
            this.assessment.spouse_ln150_income = this.application.spouse_ln150_income;

            let student_cppd_count = 0;
            const incomeQuery = (types: Array<number>) => 
                this.mainDb
                    .count("id", { as: "count"})
                    .from("sfa.income")
                    .whereIn("income_type_id", types);
            const sccResult = await incomeQuery([3]); 
            student_cppd_count = parseInt(sccResult.count.toString());                                   

            if (this.student.indigenous_learner_id === 1 || this.student.is_crown_ward || this.application.is_perm_disabled || this.assessment.dependent_count > 0 || student_cppd_count > 0) {
                this.assessment.student_contrib_exempt = true;
            }
            
            let spouse_exempt_count = 0;
            const secResult = await incomeQuery([2,3,21]);
            spouse_exempt_count = parseInt(secResult.count.toString());

            if (spouse_exempt_count > 0 || this.application.spouse_study_school_from) {
                this.assessment.spouse_contrib_exempt = true;
            }
        }

        this.assessment.asset_tax_rate = 0;

        // Calculate the total
        if (!this.assessment.csl_full_amt_flag) {
            this.assessment.assessed_amount = Math.max(Math.min(this.assessment.calculated_award ?? 0, this.assessment.csl_request_amount) - (this.assessment.recovered_overaward ?? 0), 0);
        }
        else {
            this.assessment.assessed_amount = Math.max((this.assessment.calculated_award ?? 0) - (this.assessment.recovered_overaward ?? 0), 0);
        }
        
        this.assessment.net_amount = this.getNetAmount(this.assessment.assessed_amount, this.assessment.previous_disbursement, this.assessment.return_uncashable_cert);

    }
}