export default interface Disbursement {
  id: number
  disbursementTypeId?: number
  assessmentId?: number
  fundingRequestId: number
  disbursedAmount?: number
  dueDate?: Date
  taxYear?: number
  issueDate?: Date
  paidAmount?: number
  changeReasonId?: number
  financialBatchId?: number
  financialBatchIdYear?: number
  financialBatchRunDate?: Date
  financialBatchSerialNo?: number
  transactionNumber?: string
  cslCertSeqNumber?: number
  ecertSentDate?: Date
  ecertResponseDate?: Date
  ecertStatus?: string
  ecertPortalStatusId?: number
}
