import Institution from "@/models/institution"

export default interface InstitutionCampus {
  id: number
  institutionId?: number
  name: string
  federalInstitutionCode?: string
  isActive: boolean
  isPrimary: boolean
  careOf?: string
  addressLine1?: string
  addressLine2?: string
  addressCityId?: number
  addressProvinceId?: number
  addressCountryId?: number
  addressPostalCode?: string
  emailAddress?: string

  // Relations
  institution: Institution
}
