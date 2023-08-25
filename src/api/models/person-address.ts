import AddressType from "@/models/address-type"
import City from "@/models/city"
import Country from "@/models/country"
import Province from "@/models/province"

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

  // Relations
  addressType?: AddressType
  city?: City
  province?: Province
  country?: Country
}
