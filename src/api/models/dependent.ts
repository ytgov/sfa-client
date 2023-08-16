import DependentEligibility from "@/models/dependent-eligibility"
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
  // NOTE: there isn't a constraint forcing the dependent -> dependent eligibility relationship to be one to one.
  // While this seems like the obvious intent of the system, the data is not one-to-one so I can't treat it that way.
  // In the future, we will probably want to enforce the one-to-one constraint.
  dependentEligibilities?: DependentEligibility[]
}
