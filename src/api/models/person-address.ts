import AddressType from "@/models/address-type"

export default interface PersonAddress {
  id: number
  personId: number
  addressTypeId: number
  address1?: string
  address2?: string
  cityId?: number
  provinceId?: number
  countryId?: number
  postalCode?: string
  notes?: string
  telephone?: string
  email?: string
  isActive: boolean
  addressType?: AddressType
}
