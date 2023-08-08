// TODO: question whether this should be in the database at all.
// And if so, why is it its own table?
enum Sexes {
  UNKNOWN =	-1,
  PREFER_NOT_TO_SAY = 0,
  MALE =	1,
  FEMALE =	2,
}

export default class Sex {
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
  static readonly Types = Sexes
}
