import Relationship from "@/models/relationship"

export default interface ParentDependent {
  id: number
  applicationId: number
  relationshipId?: number
  firstName?: string
  lastName?: string
  birthDate?: Date
  age?: number
  isResiding: boolean
  isSharedCustody: boolean
  isAttendPostSecondary: boolean
  comments?: string
  isEligible: boolean
  isDisabled: boolean
  conversion: boolean
  relationship?: Relationship
}
