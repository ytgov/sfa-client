import Assessment from "@/models/assessment";
import { BaseGlobalDTO } from "../BaseGlobalDTO";
import { AssessmentDTO } from "@/models/dto";

export interface CslftGlobalDTO extends BaseGlobalDTO {
    assessments?: Record<string, AssessmentDTO>;
    assessment?: string;
}