// TODO: question whether this should be in the database at all.
// And if so, why is it its own table?
enum Languages {
  ENGLISH = 1,
  FRENCH = 2,
}

export default class Language {
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
  static readonly Types = Languages
}
