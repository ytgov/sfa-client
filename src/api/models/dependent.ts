import Relationship from "@/models/relationship"

// TODO: normalize everything to one spelling, currently in code its sometimes spelled as dependant instead of dependent.
export default interface Dependent {
  id: number
  studentId?: number
  relationshipId?: number
  firstName?: string
  lastName?: string
  comments?: string
  birthDate?: Date
  isInProgress?: boolean
  isConversion?: boolean
  isDisability?: boolean
  relationship?: Relationship
}
