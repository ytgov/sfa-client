import { AssessmentDTO, DisbursementDTO, FundingRequestDTO } from "models/dto";
import { ResultDTO } from "../../ResultDTO";
import { CsgftGlobalDTO } from "./CsgftGlobalDTO";

export interface CsgftResultDTO extends ResultDTO<AssessmentDTO> {
    funding_request?: FundingRequestDTO;
    disbursements: Array<DisbursementDTO>;
    globals: CsgftGlobalDTO;
}