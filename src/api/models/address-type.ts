// TODO: question whether this should be in the database at all.
// And if so, why is it its own table?
enum AddressTypes {
  HOME = 1,
  MAILING = 2,
  SCHOOL = 3,
  PARENT = 4,
}

export default class AddressType {
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
  static readonly Types = AddressTypes
}
