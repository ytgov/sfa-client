export default interface StudentConsent {
  id: number
  studentId: number
  startAcademicYearId: number
  endAcademicYearId?: number
  consentPerson: string
  consentSfa: boolean
  consentCsl: boolean
}
