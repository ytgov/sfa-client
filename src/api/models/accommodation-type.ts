// TODO: question whether this should be in the database at all.
// And if so, why is it its own table?
enum AccommodationTypes {
  LIVING_AT_PARENTS = 1,
  LIVING_ON_OWN = 2,
  BOTH = 3,
}

export default class AccommodationType {
  id: number
  description: string
  isActive: boolean

  constructor({
    id,
    description,
    isActive,
  }: {
    id: number
    description: string
    isActive: boolean
  }) {
    this.id = id
    this.description = description
    this.isActive = isActive
  }

  // not in database
  static readonly Types = AccommodationTypes
}
