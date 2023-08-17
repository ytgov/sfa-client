import { BaseGlobalDTO } from "../BaseGlobalDTO";

export interface CslftGlobalDTO extends BaseGlobalDTO {
    assessments?: Array<number>;
    assessment?: number;
}