import { AssessmentDTO, DisbursementDTO, FundingRequestDTO } from "models/dto";
import { ResultDTO } from "../../ResultDTO";
import { CslftGlobalDTO } from "./CslftGlobalDTO";

export interface CslftResultDTO extends ResultDTO<AssessmentDTO> {
    funding_request?: FundingRequestDTO;
    disbursements: Array<DisbursementDTO>;
    globals: CslftGlobalDTO
}