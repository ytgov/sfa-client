import {Knex} from "knex";
import moment from "moment";
import {
    ApplicationDTO,
    AssessmentDTO,
    CslftResultDTO,
    CslftGlobalDTO,    
    DisbursementDTO,
    FundingRequestDTO,
    MsfaaDTO,
    PersonAddressDTO,
    StudentDTO
} from "../../models";
import { NumbersHelper } from "../../utils/NumbersHelper";
import { AssessmentBaseRepository } from "./assessment-base-repository";
import { ApplicationRepository } from "../application";
import { StudentContributionRepository, StudentLivingAllowanceRepository, StudentRepository} from "../student";
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
import { MsfaaRepository } from "../msfaa";
import { CslReasonRepository } from '../csl_reason';
import { CorrespondenceRepository } from '../correspondence';
import { AboriginalStatusRepository } from "../aboriginal_status";
import { IncomeRepository } from "../income";
import { EmploymentStatusRepository } from "../employment_status";

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
    private msfaaRepo: MsfaaRepository;
    private correspondenceRepo: CorrespondenceRepository;
    private cslReasonRepo: CslReasonRepository;
    private aboriginalStatusRepo: AboriginalStatusRepository;
    private incomeRepo: IncomeRepository;
    private employmentStatusRepo: EmploymentStatusRepository;

    // Globals
    private assessment: Partial<AssessmentDTO> = {};
    private application: Partial<ApplicationDTO> = {};
    private student: Partial<StudentDTO> = {};
    private funding_request: Partial<FundingRequestDTO> = {};
    private disbursement: Partial<DisbursementDTO> = {};
    private disbursements: Array<Partial<DisbursementDTO>> = [];
    private e_certs: Array<Partial<DisbursementDTO>> = [];
    private msfaa: Partial<MsfaaDTO> = {};
    private global: Partial<CslftGlobalDTO> = {};
    private resultDto: Partial<CslftResultDTO> = {};
    private assessment_id?: number;
    private assess_id?: number;

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
        this.msfaaRepo = new MsfaaRepository(maindb);
        this.correspondenceRepo = new CorrespondenceRepository(maindb);
        this.cslReasonRepo = new CslReasonRepository(maindb);
        this.aboriginalStatusRepo = new AboriginalStatusRepository(maindb);
        this.incomeRepo = new IncomeRepository(maindb);
        this.employmentStatusRepo = new EmploymentStatusRepository(maindb);
    }
    
    academicYearValidation = (year: number): boolean => {
        return !!(this.application.academic_year_id && this.application.academic_year_id < year);
    };

    getNetAmount(assessed_amount?: number, previous_disbursement?: number, return_uncashable_cert?: number): number {
        let result = this.numHelper.getNum(assessed_amount ?? 0) - this.numHelper.getNum(previous_disbursement ?? 0) + this.numHelper.getNum(return_uncashable_cert ?? 0);

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

    async getOtherIncomeAmount(application_id?: number, academic_year_id?: number): Promise<number> {
        let result = 0;

        if (application_id && academic_year_id) {
            result = await this.getScalarValue<number>("fn_get_other_income_amount", [application_id, academic_year_id]);
        }

        return result;
    }

    async getCalculatedValues(): Promise<void> {

        const pDaysDiff = moment.utc(this.assessment.pstudy_end_date).diff(moment.utc(this.assessment.pstudy_start_date), "day");
        this.assessment.pstudy_weeks = Math.trunc((pDaysDiff + 1)/7 + .9999);
        this.assessment.pstudy_months = Math.trunc((pDaysDiff + 1)/30.44 + .9999);

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

        const cslLookup = await this.cslLookupRepo.getCslLookupByYear(this.application.academic_year_id);

        this.assessment.max_allowable = 0;
        if (cslLookup) {
            this.assessment.max_allowable = (cslLookup.allowable_weekly_amount ?? 0) * (this.assessment.study_weeks ?? 0);
        }

        this.assessment.asset_tax_rate = 0;

        if ((this.assessment.calculated_award ?? 0) === 0) {
            await this.getCalculatedAward();
        }
    }

    async calcFamilyDetails(): Promise<void> {            
        
        if (this.assessment.csl_classification === 1) {
            this.assessment.student_family_size = await this.getParentFamilySize(this.application.id) + 1;
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
        this.assessment.family_size = this.assessment.student_family_size;
    }

    async getContributionValues(): Promise<void> {
        const max_weeks = 8/12*52;

        await this.calcFamilyDetails();
        const family_size = (this.assessment.student_family_size ?? 0) > 7 ? 7 : this.assessment.student_family_size;
        const income_threshold = await this.csgThresholdRepo.getIncomeThresholdAmount(this.application.academic_year_id, family_size);

        const cslLookupContribTable = await this.cslLookupRepo.getContribPct(this.application.academic_year_id);

        if ((this.assessment.family_income ?? 0) <= income_threshold) {
            this.assessment.student_expected_contribution = this.numHelper.round(Math.min(cslLookupContribTable.low_income_student_contrib_amount ?? 0, (((cslLookupContribTable.low_income_student_contrib_amount ?? 0) / (8*12/52)) * (this.assessment.study_weeks ?? 0))));
        }
        else {
            const weekly_student_contrib = ((cslLookupContribTable.low_income_student_contrib_amount ?? 0)/(8*12/52)) + ((((this.assessment.family_income ?? 0) - income_threshold)/(8*12/52))*(cslLookupContribTable.student_contrib_percent ?? 0));
            const weekly_calc = (weekly_student_contrib * Math.min((this.assessment.study_weeks ?? 0), max_weeks)) ?? 0;
            this.assessment.student_expected_contribution = this.numHelper.round(Math.min(weekly_calc, cslLookupContribTable.student_contrib_max_amount ?? 0));
        }

        this.assessment.student_previous_contribution = await this.getStudentPreviousContribAmount(this.assessment.id, this.application.academic_year_id, this.application.student_id);
        this.assessment.student_contribution = this.assessment.student_contrib_exempt === "YES" ? 0 : ((this.assessment.student_expected_contribution ?? 0) - (this.assessment.student_previous_contribution));

        if (this.assessment.csl_classification === 3 && (this.assessment.family_income ?? 0) > income_threshold) {
            const weekly_spouse_contrib = (cslLookupContribTable.spouse_contrib_percent ?? 0) * (((this.assessment.family_income ?? 0) - income_threshold)/(8*12/52));
            this.assessment.spouse_expected_contribution = this.numHelper.round(weekly_spouse_contrib * Math.min((this.assessment.study_weeks ?? 0), max_weeks));
            this.assessment.spouse_previous_contribution = await this.getSpousePreviousContribAmount(this.assessment.id, this.application.academic_year_id, this.application.student_id);

            this.assessment.spouse_contribution = this.assessment.spouse_contrib_exempt === "YES" ? 0 : this.numHelper.round(((this.assessment.spouse_expected_contribution ?? 0) - (this.assessment.spouse_previous_contribution)));
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

        this.global.study_code = assignCode(this.assessment.csl_classification ?? 0, this.assessment.study_accom_code ?? 0);
        this.global.prestudy_code = assignCode(this.assessment.prestudy_csl_classification ?? 0, this.assessment.prestudy_accom_code ?? 0);
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
            this.msfaa = await this.msfaaRepo.getMsfaaByStudentId(this.student.id);
            this.e_certs = await this.disbursementRepo.getECertificateList(this.assessment.id);
        }
    }

    async getAssessInfoCslft(funding_request_id?: number): Promise<Partial<CslftResultDTO>> {

        let assess_id: number | undefined = undefined;        

        if (funding_request_id) {
            await this.loadData(funding_request_id);           
            if (!this.assessment.id) {
                const assess_count = await this.getAssessmentCount(funding_request_id);
            
                if (assess_count !== undefined && assess_count > 0) {
                    this.assess_id = await this.getAssessmentInfoPrc(funding_request_id);

                    this.assessment.assessment_type_id = 2;
        
                    await this.getPreviousAssessment(this.assess_id);
                }
                else {
                    this.assessment.funding_request_id = funding_request_id;
                    await this.getNewInfo();
                }

                if ((this.assessment.csl_assessed_need ?? 0) > 0 || this.assessment.total_grant_awarded && (this.application.academic_year_id ?? 0) > 2012) {
                    await this.getMsfaaInfo("assess");
                }
            }
            else {
                this.global.new_calc = true;
                this.assessment_id = this.assessment.id;
            }

            await this.setIdGlobals();

            if (this.assessment.program_id && this.assessment.study_area_id) {
                this.assessment.field_program_code = await this.fieldProgramRepo.getFieldProgramCode(this.assessment.study_area_id, this.assessment.program_id);
            }

            this.assessment.recovered_overaward = await this.getCslOveraward(this.application.student_id, this.assessment.id);

            assess_id = (((this.assessment_id ?? 0) < (this.assess_id ?? 0) && !this.assessment.id) || (this.assess_id ?? 0) === 0) ? this.assessment_id : this.assess_id;

            const disbursed_amt = await this.disbursementRepo.getDisbursedAmount(funding_request_id, assess_id);
            this.assessment.previous_disbursement = disbursed_amt > 0 ? disbursed_amt : 0;

            this.assessment.previous_cert = await this.disbursementRepo.getPreviousDisbursedAmount(funding_request_id, this.assessment.id);

            this.assessment.net_amount = this.getNetAmount(this.assessment.assessed_amount, this.assessment.previous_disbursement, this.assessment.return_uncashable_cert);

            await this.getLookupValues(funding_request_id);

            await this.getContribDisplayValues();

            if (this.global.new_calc) {
                this.global.new_calc = false;
                await this.getCalculatedValues();

                if (this.application.academic_year_id && this.application.academic_year_id >= 2017) {
                    await this.getContributionValues();
                }
            }

            this.assessment.student_contribution_review = this.assessment.assessment_type_id === 2 ? "YES" : "NO";
            this.assessment.spouse_contribution_review = this.assessment.assessment_type_id === 2 ? "YES" : "NO";
            this.assessment.parent_contribution_review = this.assessment.assessment_type_id === 2 ? "YES" : "NO";
        }

        this.resultDto.data = this.assessment;
        this.resultDto.globals = this.global;
        this.resultDto.disbursements = this.disbursements;
        this.resultDto.funding_request = this.funding_request;        
        this.resultDto.msfaa = this.msfaa;
        this.resultDto.e_certs = this.e_certs;

        return this.resultDto;
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

            let prestudy_code: number | undefined = this.global.prestudy_code;
            if (this.global.prestudy_code === studyCodes.M && (this.assessment.dependent_count ?? 0) > 0) {
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
        await this.getCalcParentContributions(this.student.person_id, this.application.academic_year_id, studyCodes);

        // Calculate previous disbursement amount.
        if (!this.assessment.previous_disbursement) {
            const disbursed_amt = await this.disbursementRepo.getDisbursedAmount(funding_request_id, this.assessment.id);
            this.assessment.previous_disbursement = disbursed_amt > 0 ? disbursed_amt : 0;
        }

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

    async getCalcParentContributions(student_person_id?: number, academic_year_id?: number, studyCodes?: Record<string, number>): Promise<void> {

        if (!studyCodes) {
            return;
        }
        
        const parentTotalIncome = this.numHelper.round(this.numHelper.getNum(this.assessment.parent1_income ?? 0) + this.numHelper.getNum(this.assessment.parent2_income ?? 0));
        const parentTotalTax = this.numHelper.round(this.numHelper.getNum(this.assessment.parent1_tax_paid ?? 0) + this.numHelper.getNum(this.assessment.parent2_tax_paid ?? 0));
        const parentNetAmount = parentTotalIncome - parentTotalTax;

        // Parent Tab
        if (this.global.study_code === studyCodes.SDA || this.global.study_code === studyCodes.SDH) {
            const mailing_address: PersonAddressDTO = await this.personRepo.getPersonAddress(student_person_id, 4);
            if (mailing_address && mailing_address.province_id) {
                this.assessment.parent_msol = await this.standardLivingRepo.getStandardLivingAmount(academic_year_id, mailing_address.province_id, this.assessment.family_size ?? 0);

                this.assessment.parent_discretionary_income = this.numHelper.round(parentNetAmount - this.assessment.parent_msol);

                if ((this.assessment.parent_discretionary_income ?? 0) > 0) {
                    this.assessment.parent_weekly_contrib = await this.parentRepo.getParentContributionAmount(academic_year_id, this.numHelper.round(this.assessment.parent_discretionary_income ?? 0));
                }
            }
        }
    }

    async getContribDisplayValues(): Promise<void> {

        const student_cppd_count = await this.countIncomeTypeByApplication(3, this.application.id);
        const aboriginalStatusCount = await this.aboriginalStatusRepo.getAboriginalStatusCount(this.application.aboriginal_status_id);

        if (this.application.is_perm_disabled || this.application.is_disabled) {
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

        if ((this.student.indigenous_learner_id && this.student.indigenous_learner_id > 0) || aboriginalStatusCount > 0) {
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
        let combined: number = this.numHelper.getNum(this.assessment.student_contribution ?? 0);
        if (this.numHelper.getNum(this.assessment.student_contribution_override ?? 0) !== 0 || this.assessment.student_contribution_review === "YES") {
            combined = this.numHelper.getNum(this.assessment.student_contribution_override ?? 0);
        }

        if (this.numHelper.getNum(this.assessment.spouse_contribution_override ?? 0) !== 0 || this.assessment.spouse_contribution_review === "YES") {
            combined = combined + this.numHelper.getNum(this.assessment.spouse_contribution_override ?? 0);
        }
        else {
            combined = combined + this.numHelper.getNum(this.assessment.spouse_contribution ?? 0);
        }

        this.assessment.combined_contribution = combined;
    }

    async getMsfaaInfo(info_type: string): Promise<void> {
        const msfaa_id = this.msfaa.id;
        const count = await this.msfaaRepo.getCountMsfaaFullTimeStudent(this.student.id);
        let expired = false;

        if (count > 0) {
            const msfaa_app = await this.msfaaRepo.getMsfaaApplicationByStudentId(this.student.id);

            if (msfaa_app.msfaa_status === 'Cancelled' || moment(new Date()).diff(msfaa_app.classes_end_date, "year") > 2) {
                expired = true;
                if (msfaa_app.msfaa_status !== "Cancelled") {
                    this.msfaa.cancel_date = new Date();
                    this.msfaa.cancel_reason = "> 2 yrs out of school";
                }
            }

            if (this.application.id !== msfaa_app.application_id && !expired) {
                this.msfaa.application_id = this.application.id;
            }
            else if (expired && info_type === 'Disburse') {
                this.msfaa.id = undefined;
                this.msfaa.student_id = this.student.id;
                this.msfaa.msfaa_status = "Pending";
                this.msfaa.application_id = this.application.id;
                this.msfaa.is_full_time = true;
            }
        }
        else {
            if (info_type === "Disburse") {
                this.msfaa.id = undefined;
                this.msfaa.student_id = this.student.id;
                this.msfaa.msfaa_status = "Pending";
                this.msfaa.application_id = this.application.id;
                this.msfaa.is_full_time = true;
            }
        }
    }

    async getNewInfo(isRecalc: boolean = false): Promise<void> {

        if (!this.assessment.id) {
            this.global.new_calc = true;
            this.assessment.assessment_type_id = 1;
        }

        this.assessment.assessed_date = moment.utc().toDate();

        this.assessment.student_contrib_exempt = "NO";
        this.assessment.spouse_contrib_exempt = "NO";

        this.assessment.dependent_count = await this.getScalarValue<number>("fn_get_dependent_count", [this.application.id ?? 0])
        this.assessment.classes_start_date = this.application.classes_start_date;
        this.assessment.classes_end_date = this.application.classes_end_date;
        const daysDiff = moment.utc(this.assessment.classes_end_date).diff(moment(this.assessment.classes_start_date), "day");
        this.assessment.study_weeks = Math.trunc((daysDiff + 1)/7 + .9999);
        this.assessment.study_months = Math.trunc((daysDiff + 1)/30.44 + .9999);

        this.assessment.pstudy_start_date = this.application.prestudy_start_date;
        this.assessment.pstudy_end_date = this.application.prestudy_end_date;
        
        if (!this.application.prestudy_start_date) {
            this.assessment.pstudy_end_date = moment.utc(this.application.classes_start_date).add(-1, "month").endOf("month").toDate();
            this.assessment.pstudy_start_date = moment.utc(this.assessment.pstudy_end_date).add(-3, "month").startOf("month").toDate();
        }

        const pDaysDiff = moment.utc(this.assessment.pstudy_end_date).diff(moment(this.assessment.pstudy_start_date), "day");
        this.assessment.pstudy_weeks = Math.trunc((pDaysDiff + 1)/7 + .9999);
        this.assessment.pstudy_months = Math.trunc((pDaysDiff + 1)/30.44 + .9999);

        this.assessment.prestudy_province_id = this.application.prestudy_province_id;
        this.assessment.prestudy_province_id = this.application.prestudy_province_id;
        this.assessment.prestudy_accom_code = this.application.prestudy_accom_code;
        this.assessment.marital_status_id = this.application.marital_status_id;
        this.assessment.study_area_id = this.application.study_area_id;
        this.assessment.program_id = this.application.program_id;
        this.assessment.study_province_id = this.application.study_province_id;
        this.assessment.study_accom_code = this.application.study_accom_code;
        this.assessment.csl_classification = this.application.csl_classification;
        this.assessment.prestudy_csl_classification = this.assessment.csl_classification;
        this.assessment.tuition_estimate = this.application.tuition_estimate_amount;
        this.assessment.books_supplies_cost = Math.min(await this.cslLookupRepo.getMaxBooks(this.application.academic_year_id), this.application.books_supplies_cost ?? 0);
        this.assessment.study_distance = this.application.study_distance;
        this.assessment.prestudy_distance = this.application.prestudy_distance;
        this.assessment.parent1_income = this.application.parent1_income;
        this.assessment.parent2_income = this.application.parent2_income;
        this.assessment.study_living_w_spouse_flag = this.application.study_living_w_spouse;
        this.assessment.parent1_tax_paid = this.application.parent1_tax_paid;
        this.assessment.parent2_tax_paid = this.application.parent2_tax_paid;
        this.assessment.csl_request_amount = this.funding_request.csl_request_amount;
        this.assessment.csl_full_amt_flag = this.funding_request.is_csl_full_amount;
        this.assessment.discretionary_cost_actual = await this.expenseRepo.getAllowableExpense(2,7,this.application.id) + await this.expenseRepo.getAllowableExpense(2,11,this.application.id);
        this.assessment.day_care_actual = await this.expenseRepo.getActualExpense(2,3,this.application.id); 
        this.assessment.study_bus_flag = this.application.study_bus;
        this.assessment.prestudy_bus_flag = this.application.prestudy_bus;        
        this.assessment.parent_ps_depend_count = await this.getParentDependentCount(this.application.id, true);
        this.assessment.parent_province_id = await this.provinceRepo.getStudentProvinceIdByApplication(this.application.id, 4);
        this.assessment.total_grant_awarded = await this.disbursementRepo.getTotalGrantAmount(this.application.id);
        
        await this.calcFamilyDetails();
        await this.setIdGlobals();

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

        this.assessment.spouse_province_id = this.application.spouse_last_jurisdiction_id;

        this.assessment.period = this.assessment.study_months <= 4 ? "S" : "P";

        //Cost tab
        this.assessment.shelter_month = await this.studentLivingAllowanceRepo.getShelterFoodMisc(this.application.academic_year_id, study_prov, this.global.study_code);
        this.assessment.discretionary_cost = await this.cslLookupRepo.getMaxDiscretionary(this.application.academic_year_id);

        const studyCodes: Record<string, number> = { 
            'SP': await this.studentRepo.getStudentCategoryId("'SP'"),
            'M': await this.studentRepo.getStudentCategoryId("'M'"),
            'DEP': await this.studentRepo.getStudentCategoryId("'DEP'")
        };

        const studyCodeValidation: boolean = this.global.study_code === studyCodes.SP || this.global.study_code === studyCodes.M;
        const prestudyCodeValidation: boolean = this.global.prestudy_code === studyCodes.SP || this.global.prestudy_code === studyCodes.M;

        if (studyCodeValidation && this.assessment.dependent_count > 0) {
            this.assessment.depend_food_allowable = await this.studentLivingAllowanceRepo.getShelterFoodMisc(this.application.academic_year_id, study_prov, studyCodes.DEP);
            this.assessment.day_care_allowable = await this.childCareCeilingRepo.getChildCare(this.application.academic_year_id, study_prov) * this.assessment.dependent_count;
        }

        if (this.assessment.study_bus_flag) {
            if (studyCodeValidation && this.assessment.dependent_count > 0) {
                this.assessment.depend_tran_allowable = await this.studentLivingAllowanceRepo.getPublicTransportaion(this.application.academic_percent, study_prov, studyCodes.DEP) * this.assessment.dependent_count;
            }
            
            this.assessment.p_trans_month = await this.studentLivingAllowanceRepo.getPublicTransportaion(this.application.academic_year_id, study_prov, this.global.study_code);
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

            this.assessment.pstudy_shelter_month = await this.studentLivingAllowanceRepo.getShelterFoodMisc(this.application.academic_year_id, prestudy_prov, this.global.prestudy_code);

            if (this.assessment.prestudy_bus_flag) {

                if (prestudyCodeValidation && this.assessment.dependent_count > 0) {
                    this.assessment.pstudy_depend_tran_allow = await this.studentLivingAllowanceRepo.getPublicTransportaion(this.application.academic_year_id, studyCodes.DEP) * this.assessment.dependent_count;
                }

                this.assessment.pstudy_p_trans_month = await this.studentLivingAllowanceRepo.getPublicTransportaion(this.application.academic_year_id, this.global.prestudy_code);
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
                    this.assessment.spouse_expected_income = await this.studentContributionRepo.getStudentContribution(this.application.academic_year_id, spouse_prov, this.global.study_code, 2) * this.assessment.study_months;
                }
            }
            
        }
        else {
            this.assessment.student_ln150_income = this.application.student_ln150_income;
            this.assessment.spouse_ln150_income = this.application.spouse_ln150_income;

            let student_cppd_count = 0;            
            
            const aStatusCount = await this.aboriginalStatusRepo.getAboriginalStatusCount(this.application.aboriginal_status_id);
            student_cppd_count = await this.incomeRepo.getIncomeByType(this.application.id, [3]);

            if (aStatusCount > 0 || this.student.indigenous_learner_id === 1 || this.student.is_crown_ward || this.application.is_disabled || this.application.is_perm_disabled || this.assessment.dependent_count > 0 || student_cppd_count > 0) {
                this.assessment.student_contrib_exempt = "YES";
            }
            
            let spouse_exempt_count = await this.employmentStatusRepo.isEmployed(this.application.spouse_study_emp_status_id);

            // Validation change accordingly to an email from SFA team.
            if (spouse_exempt_count) {
                this.assessment.spouse_contrib_exempt = "YES";
            }
        }

        const cslLookup = await this.cslLookupRepo.getCslLookupByYear(this.application.academic_year_id);

        this.assessment.max_allowable = 0;
        if (cslLookup) {
            this.assessment.max_allowable = (cslLookup.allowable_weekly_amount ?? 0) * (this.assessment.study_weeks ?? 0);
        }

        this.assessment.asset_tax_rate = 0;

        if ((this.assessment.calculated_award ?? 0) === 0) {
            await this.getCalculatedAward();
        }

        // Calculate the totaln_disbursments_required
        if (!this.assessment.csl_full_amt_flag) {
            this.assessment.assessed_amount = Math.max(Math.min(this.assessment.calculated_award ?? 0, this.assessment.csl_request_amount ?? 0) - (this.assessment.recovered_overaward ?? 0), 0);
        }
        else {
            this.assessment.assessed_amount = Math.max((this.assessment.calculated_award ?? 0) - (this.assessment.recovered_overaward ?? 0), 0);
        }
        
        this.assessment.net_amount = this.getNetAmount(this.assessment.assessed_amount, this.assessment.previous_disbursement, this.assessment.return_uncashable_cert);

    }

    async getCalculatedAward(): Promise<void> {
 
        // Anonymous Setup
        const calcByStudyMonths = (value?: number) => (value ?? 0) * (this.assessment.study_months ?? 0);        
        const transMultiplier = (): number => {
            let multiplier = 0;
            const studyWeeks = (this.assessment.study_weeks ?? 0);
            if (studyWeeks >= 1 && studyWeeks < 24)
            {
                multiplier = 1;
            }
            else if (studyWeeks >= 24) {
                multiplier = 2;
            }

            return multiplier;
        };
                
        const scholastic_total: number = (this.assessment.tuition_estimate ?? 0) + (this.assessment.books_supplies_cost ?? 0);
        const shelter_total: number = calcByStudyMonths(this.assessment.shelter_month);
        const p_trans_total: number = calcByStudyMonths(this.assessment.p_trans_month);
        const r_trans_total: number = (this.assessment.r_trans_16wk ?? 0) * transMultiplier();
        const day_care_total: number = calcByStudyMonths(Math.min((this.assessment.day_care_allowable ?? 0), (this.assessment.day_care_actual ?? 0)));
        const dependent_shelter_total: number = calcByStudyMonths(this.assessment.depend_food_allowable);
        const dependent_trans_total: number = calcByStudyMonths(this.assessment.depend_tran_allowable);
        const discretionary_total: number = Math.min((this.assessment.discretionary_cost ?? 0), (this.assessment.discretionary_cost_actual ?? 0));
        const x_trans_total: number = this.numHelper.round((this.assessment.x_trans_total ?? 0));
        const relocation_total: number = this.numHelper.round((this.assessment.relocation_total ?? 0));

        const capped_expenses: number = shelter_total + p_trans_total + r_trans_total + day_care_total + dependent_shelter_total + dependent_trans_total + discretionary_total + x_trans_total + relocation_total;

        const total_study_cost: number = scholastic_total + capped_expenses + (this.assessment.uncapped_costs_total ?? 0); 

        const calc_parental_contrib: number = (this.assessment.parent_ps_depend_count ?? 0) === 0 ? 0 : this.numHelper.round((this.assessment.parent_weekly_contrib ?? 0) * (this.assessment.study_weeks ?? 0) / (this.assessment.parent_ps_depend_count ?? 0));
        const parental_total_contrib: number = this.numHelper.round(Math.max((this.assessment.parent_contribution_override ?? 0), calc_parental_contrib));

        const total_assets: number = (this.assessment.married_assets ?? 0) === 0 ? (this.assessment.other_income ?? 0) : (this.assessment.married_assets ?? 0);
        const total_assets_combined: number = total_assets + (this.assessment.combined_contribution ?? 0);

        let resources_total: number = 0;
        if ((this.application.academic_year_id ?? 0) > 2017) {
            resources_total = total_assets_combined + parental_total_contrib;
        }

        const assess_needed: number = this.numHelper.round(Math.max((total_study_cost - resources_total), 0));
        const assess_needed_sixty: number = this.numHelper.round(assess_needed * 0.6);
                
        const calculated_award_min = Math.min(assess_needed_sixty - (this.assessment.total_grant_awarded ?? 0), (this.assessment.max_allowable ?? 0));
        const calculated_award: number = Math.max(0, this.numHelper.round(calculated_award_min));
        this.assessment.calculated_award = calculated_award;
    }

    async executeRecalc(funding_request_id: number, assessment: Partial<AssessmentDTO> = {}, disbursements: Array<DisbursementDTO> = []): Promise<Partial<CslftResultDTO>> {

        this.assessment = assessment;
        this.disbursements = disbursements;
        await this.loadData(funding_request_id, false);

        await this.getNewInfo(true);

        await this.setIdGlobals();

        if (this.assessment.program_id && this.assessment.study_area_id) {
            this.assessment.field_program_code = await this.fieldProgramRepo.getFieldProgramCode(this.assessment.study_area_id, this.assessment.program_id);
        }

        this.assessment.recovered_overaward = await this.getCslOveraward(this.application.student_id, this.assessment.id);

        let disbursed_amt = 0;
        if (this.disbursements.length == 0) {
            disbursed_amt = await this.disbursementRepo.getDisbursedAmount(funding_request_id, this.assessment.id);
        }
        else {
            this.disbursements.forEach((x) => {
                disbursed_amt += parseInt((x.disbursed_amount?.toString() ?? '0'));
            });
        }
        
        this.assessment.previous_disbursement = disbursed_amt > 0 ? disbursed_amt : 0;
        this.assessment.previous_cert = await this.disbursementRepo.getPreviousDisbursedAmount(funding_request_id, this.assessment.id);

        await this.getLookupValues(funding_request_id);

        await this.getCalculatedValues();

        await this.getContributionValues();

        this.resultDto.data = this.assessment;
        this.resultDto.globals = this.global;
        this.resultDto.disbursements = this.disbursements;
        this.resultDto.funding_request = this.funding_request;        
        this.resultDto.msfaa = this.msfaa;

        return this.resultDto;
    }

    async calculateCombinedContrib(assessment: Partial<AssessmentDTO>): Promise<number | undefined> {
        this.assessment = assessment;

        this.getCombinedContribution();

        return this.assessment.combined_contribution;
    }

    async calculateParentWeeklyContrib(person_id: number, academic_year_id: number, assessment: Partial<AssessmentDTO>): Promise<number> {

        this.assessment = assessment;

        const studyCodeKeys = [
            "SP",
            "M",
            "DEP",
            "SDA",
            "SDH",
            "MW"
        ];

        const studyCodesAll = await Promise.all([
            this.studentRepo.getStudentCategoryId("'SP'"),
            this.studentRepo.getStudentCategoryId("'M'"),
            this.studentRepo.getStudentCategoryId("'DEP'"),
            this.studentRepo.getStudentCategoryId("'SDA'"),
            this.studentRepo.getStudentCategoryId("'SDH'"),
            this.studentRepo.getStudentCategoryId("'MW'")
        ]);
    
        const studyCodes: Record<string, number> = studyCodeKeys.reduce((map, key, index) => {
            map[key] = studyCodesAll[index];
            return map;
        }, {} as Record<string, number>);

        await this.setIdGlobals();

        await this.getCalcParentContributions(person_id, academic_year_id, studyCodes);

        return this.assessment.parent_weekly_contrib ?? 0;
    }

    async executeDisburse(funding_request_id: number, assessment: Partial<AssessmentDTO> = {}, disbursements: Array<DisbursementDTO> = []): Promise<Partial<CslftResultDTO>> {
        
        disbursements = disbursements.filter((x) => x.transaction_number !== null);
        this.assessment = assessment;
        this.disbursements = disbursements;
        await this.loadData(funding_request_id, false);

        if (!this.disbursement.delete_flag) {
            this.disbursement.delete_flag = false;
        }
        
        this.disbursement.assessment_id = this.assessment.id;
        this.disbursement.funding_request_id = funding_request_id;
        this.disbursement.issue_date = new Date();
        
        const positiveDisbursement = (): boolean => ((this.assessment.net_amount ?? 0) > 0 && this.assessment.assessment_type_id === 3);
        this.disbursement.disbursed_amount = positiveDisbursement() ? 0 : this.assessment.net_amount;
        this.disbursement.paid_amount = positiveDisbursement() ? 0 : this.assessment.net_amount;
        
        this.global.csl_letter_flag = positiveDisbursement();

        const isNetAmountAndAssessmentType = (assessmentType: number): boolean => ((this.assessment.net_amount ?? 0) >= 0 && this.assessment.assessment_type_id !== assessmentType); 
        if ((this.assessment.net_amount ?? 0) < 0) {
            this.disbursement.transaction_number = await this.disbursementRepo.getMaxTransaction(funding_request_id);
        }
        else {
            if (isNetAmountAndAssessmentType(3)) {
                this.disbursement.disbursement_type_id = 4;
               
                if ((this.assessment.csl_assessed_need ?? 0) > 0 || (this.assessment.total_grant_awarded ?? 0) > 0 && (this.application.academic_year_id ?? 0) > 2012) {
                    await this.getMsfaaInfo("Disburse");
                }

                if ((this.assessment.net_amount ?? 0) > 0 && this.assessment.assessment_type_id !== 3) {
                    this.funding_request.status_id = 7;
                    this.funding_request.status_date = new Date();

                    this.global.update_status = true;

                }
                this.disbursement.transaction_number = await this.disbursementRepo.getNextTransactionSequenceValue();
            }
        }

        if (this.assessment.csl_over_reason_id) {
            this.assessment.over_award = Math.max((this.assessment.over_award ?? 0) - (this.assessment.net_amount ?? 0), 0);

            await this.correspondenceRepo.cslNonOrOverawardLetter("CSL_Over_Award_ltr", this.application.student_id, funding_request_id, 4, this.assessment.csl_over_reason_id, this.application.id);
        }

        if (this.assessment.csl_non_reason_id || this.assessment.csl_over_reason_id) {
            if (this.assessment.csl_non_reason_id) {
                const cslReason = await this.cslReasonRepo.getCslReasonById(this.assessment.csl_non_reason_id);

                if (cslReason.name?.toUpperCase() === "CSG ONLY") {
                    this.funding_request.status_id = 40;
                    this.funding_request.status_date = new Date();

                    this.global.update_status = true;
                }
                else {
                    if ((this.assessment.total_grant_awarded ?? 0) === 0) {
                        await this.correspondenceRepo.cslNonOrOverawardLetter("CSL_Non_Award_ltr", this.application.student_id, funding_request_id, 4, this.assessment.csl_over_reason_id, this.application.id);

                        this.funding_request.status_id = 4;
                        this.funding_request.status_date = new Date();

                        this.global.update_status = true;
                    }
                }
            }
        }

        this.global.disbursement_flag = true;

        let disbursed_amt = 0;
        if (this.disbursements.length == 0) {
            disbursed_amt = await this.disbursementRepo.getDisbursedAmount(funding_request_id, this.assessment.id);
        }
        else {
            this.disbursements.forEach((x) => {
                disbursed_amt += parseInt((x.disbursed_amount?.toString() ?? '0'));
            });
        }
        
        this.assessment.previous_disbursement = disbursed_amt > 0 ? disbursed_amt : 0;
        this.assessment.net_amount = this.getNetAmount(this.assessment.assessed_amount, this.assessment.previous_disbursement, this.assessment.return_uncashable_cert);         

        if ((this.disbursement.id ?? -1) < 0) {
            this.disbursements.push(this.disbursement);
        }

        this.disbursements.sort((x,y) => parseInt(x.transaction_number ?? '0') - parseInt(y.transaction_number ?? '0'));

        this.resultDto.data = this.assessment;
        this.resultDto.globals = this.global;        
        this.resultDto.disbursements = this.disbursements;
        this.resultDto.funding_request = this.funding_request;        
        this.resultDto.msfaa = this.msfaa;
       
        return this.resultDto;
    }

    async insertUpdateAll(payload: Partial<CslftResultDTO>): Promise<Partial<CslftResultDTO>> {

        const result: Partial<CslftResultDTO> = {};
        let assessment_id = undefined;

        if (payload.data) {
            
            if (payload.data.id && payload.data.id > 0)
            {
                result.data = await this.updateAssessment(payload.data.id, payload.data);
            }
            else
            {
                result.data = await this.insertAssessment(payload.data);
                if (Array.isArray(payload.disbursements))
                {
                    for (let idx in payload.disbursements) {
                        payload.disbursements[idx].assessment_id = result.data.id;
                    }
                }
            }
            assessment_id = result.data.id;
        }

        if (payload.disbursements)
        {            
            result.disbursements = await this.processDisbursements(payload.disbursements, assessment_id);
        }

        if (payload.funding_request)
        {
            if (payload.funding_request.id)
            {
                result.funding_request = await this.fundingRequestRepo.updateFundingRequest(payload.funding_request.id, payload.funding_request);
            }
        }

        if (payload.msfaa && Object.keys(payload.msfaa).length > 0) {
            if (payload.msfaa.id && payload.msfaa.id > 0) {
                payload.msfaa.rec_last_mod_date = new Date();
                result.msfaa = await this.msfaaRepo.updateMsfaa(payload.msfaa.id, payload.msfaa);
            }
            else {
                result.msfaa = await this.msfaaRepo.insertMsfaa(payload.msfaa);
            }
        }

        return result;
    }
    
    async insertAssessment(assessment: AssessmentDTO): Promise<AssessmentDTO> {
        const filtered = this.getAssessmentTable(assessment);
        const result = await this.mainDb(this.mainTable).insert(filtered).returning("*");        
        return result[0];
    }

    async updateAssessment(id: number, assessment: AssessmentDTO): Promise<AssessmentDTO> {
        const filtered = this.getAssessmentTable(assessment);
        const result = await this.mainDb(this.mainTable)
                                .update(filtered)
                                .where({
                                    id: id
                                })
                                .returning("*");
        return result[0];
    }

    async processDisbursements(disbursements: Array<DisbursementDTO>, assessment_id?: number): Promise<DisbursementDTO[]> {
        let result: Array<DisbursementDTO> = [];
        let stored: Array<DisbursementDTO> = [];
        if (assessment_id) {
            stored = await this.disbursementRepo.getByAssessmentId(assessment_id);            
        }

        disbursements.forEach(async (x: DisbursementDTO) => {
            const dis = this.disbursementRepo.getDisbursementTable(x);
            let record: DisbursementDTO;
            let query;

            if (x.id && x.id > 0)
            {
                query = await this.mainDb(this.disbursementRepo.getMainTable())
                                .update(dis)
                                .where({
                                    id: x.id
                                })
                                .returning("*");
            }
            else {
                if (dis.assessment_id && dis.funding_request_id) {
                    query = await this.mainDb(this.disbursementRepo.getMainTable()).insert(dis).returning("*");
                }                
            }
            
            if (query) {
                record = query[0];
                result.push(record);
            }
        });

        // Delete missing disbursements
        if (stored) {
            stored.forEach(async (x) => {
                let matched = disbursements.find((d) => d.id === x.id);
                if (!matched) {
                    await this.mainDb(this.disbursementRepo.getMainTable())
                            .where("id", x.id)
                            .del();
                }
            });
        }
        
        return result;
    }
}