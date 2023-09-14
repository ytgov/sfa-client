import Application from "@/models/application"
import Assessment from "@/models/assessment"
import Disbursement from "@/models/disbursement"
import RequestType from "@/models/request-type"
import Status from "@/models/status"
import StatusReason from "@/models/status-reason"

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

  // Relations
  application?: Application
  assessments?: Assessment[]
  disbursements?: Disbursement[]
  requestType?: RequestType
  status?: Status
  statusReason?: StatusReason
  yeaRemaining?: number
  msfaaNumber?: number | string
  msfaaSigned?: Date
}
