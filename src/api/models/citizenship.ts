// TODO: question whether this should be in the database at all.
// And if so, why is it its own table?
enum Citizenships {
  UNKNOWN = 0,
  NOT_RECORDED = 1,
  CANADIAN = 2,
  PERMANENT_RESIDENT = 3,
  PROTECTED_PERSON = 4,
  NO_CITIZEN = 5,
}

export default class Citizenship {
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
  static readonly Types = Citizenships
}
