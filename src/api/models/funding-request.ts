import Assessment from "@/models/assessment"
import RequestType from "@/models/request-type"

export default interface FundingRequest {
  id: number
  applicationId: number
  requestTypeId?: number
  statusId?: number
  statusReasonId?: number
  comments?: string
  customStatus?: string
  receivedDate?: Date
  statusDate?: Date
  yeaRequestAmount?: number
  yeaRequestType?: number
  cslRequestAmount?: number
  isCslFullAmount?: boolean
  isCsgOnly: boolean
  enteringFirstYear?: boolean
  studentMeetHsOEquivReq?: boolean
  studentMeetResidencyReq?: boolean
  studentIsntEligFFundInAnotherJur?: boolean
  studentIsInFtStudy?: boolean
  studentIsAttInEligProgDesPsInst?: boolean
  studentIsEligForAirfareTrvlAmount?: boolean
  studentIsMovToAnthCmmToAttdPrgm?: boolean
  studentIsMainteningTwoResidences?: boolean
  studentWNotReceiveFundFromOtrOrg?: boolean
  assessments?: Assessment[]
  requestType?: RequestType
}
