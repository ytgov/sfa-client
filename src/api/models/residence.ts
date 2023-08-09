export default interface Residence {
  id: number
  studentId: number
  address?: string
  cityId?: number
  provinceId?: number
  countryId?: number
  postalCode?: string
  inSchool?: number
  fromYear?: number
  fromMonth?: number
  toYear?: number
  toMonth?: number
  isInProgress: boolean
}
