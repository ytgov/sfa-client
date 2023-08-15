export default interface ApplicationDraft {
  id: number
  studentId: number
  academicYearId: number
  createDate: Date
  updateDate: Date
  isActive?: boolean
  applicationJson: string
  submitDate?: Date
  status?: string
}
