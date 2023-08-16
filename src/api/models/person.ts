import Citizenship from "@/models/citizenship"
import Language from "@/models/language"
import PersonAddress from "@/models/person-address"
import Sex from "@/models/sex"

export default interface Person {
  id: number
  languageId?: number
  sexId?: number
  birthCityId?: number
  birthProvinceId?: number
  birthCountryId?: number
  firstName?: string
  lastName?: string
  initials?: string
  previousLastName?: string
  sin?: string
  citizenshipCode?: number
  birthDate?: Date
  telephone?: string
  email?: string
  personAddresses?: PersonAddress[]
  citizenship?: Citizenship // foreign key on citizenshipCode
  language?: Language
  sex?: Sex
}
