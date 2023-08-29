import Assessment from "@/models/assessment";
import { BaseGlobalDTO } from "../BaseGlobalDTO";
import { AssessmentDTO, DisbursementDTO } from "@/models/dto";

export interface CslftGlobalDTO extends BaseGlobalDTO {
    assessments?: Record<string, AssessmentDTO>;
    disbursements?: Record<string, Array<DisbursementDTO>>;
    assessment?: string;
}