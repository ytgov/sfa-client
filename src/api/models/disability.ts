// NOTE: These fields are referenced in the UI,
// the similar disability_type table is not related to this data.
enum Disabilities {
  NONE = "None",
  PERMANENT = "Permanent",
  PERSISTENT = "Persistent",
  OTHER = "Other",
}

export default class Disability {
  id: number
  applicationId: number
  disabilityTypeId: number
  description?: string
  verifiedDisabilityNeed: boolean

  constructor({
    id,
    applicationId,
    disabilityTypeId,
    description,
    verifiedDisabilityNeed,
  }: {
    id: number
    applicationId: number
    disabilityTypeId: number
    description?: string
    verifiedDisabilityNeed: boolean
  }) {
    this.id = id
    this.applicationId = applicationId
    this.disabilityTypeId = disabilityTypeId
    this.description = description
    this.verifiedDisabilityNeed = verifiedDisabilityNeed
  }

  // not in database
  static readonly Types = Disabilities
}
