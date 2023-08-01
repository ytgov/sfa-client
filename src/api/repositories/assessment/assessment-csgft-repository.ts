import { Knex } from "knex";
import { AssessmentBaseRepository } from "./assessment-base-repository";
import { ApplicationDTO, AssessmentDTO, DisbursementDTO, FundingRequestDTO, StudentDTO } from "models";
import { NumbersHelper } from "utils/NumbersHelper";
import { ApplicationRepository, CslLookupRepository, DisbursementRepository, ExpenseRepository, FundingRequestRepository, ProvinceRepository, StudentContributionRepository, StudentLivingAllowanceRepository, StudentRepository } from "repositories";

export class AssessmentCsgftRepository extends AssessmentBaseRepository {

    // Repos
    private applicationRepo: ApplicationRepository;
    private studentRepo: StudentRepository;
    private fundingRequestRepo: FundingRequestRepository;
    private disbursementRepo: DisbursementRepository;

    private numHelper: NumbersHelper;
    private assessment: Partial<AssessmentDTO> = {};
    private application: Partial<ApplicationDTO> = {};
    private student: Partial<StudentDTO> = {};
    private funding_request: Partial<FundingRequestDTO> = {};
    private disbursement: Partial<DisbursementDTO> = {};
    private disbursements: Array<Partial<DisbursementDTO>> = [];

    constructor(maindb: Knex<any, unknown>) {
        super(maindb);
        this.numHelper = new NumbersHelper();
        this.applicationRepo = new ApplicationRepository(maindb);
        this.studentRepo = new StudentRepository(maindb);
        this.fundingRequestRepo = new FundingRequestRepository(maindb);
        this.disbursementRepo = new DisbursementRepository(maindb);
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

    async getInitValues() {
        
    }
}