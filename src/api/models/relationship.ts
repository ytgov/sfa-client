// TODO: question whether this should be in the database at all.
// And if so, why is it its own table?
enum Relationships {
  SON = "Son",
  DAUGHTER = "Daughter",
  STEP_SON = "Step-Son",
  STEP_DAUGHTER = "Step-Daughter",
  PARENT = "Parent",
  WIFE = "Wife",
  SPOUSE = "Spouse",
  NIECE = "Niece",
  GRANDDAUGHTER = "Granddaughter",
  FOSTER_CHILD = "Foster Child",
  COMMON_LAW = "Common Law",
  MOTHER = "Mother",
  GRANDSON = "Grandson",
  NEPHEW = "Nephew",
  HUSBAND = "Husband",
  FATHER = "Father",
  BROTHER = "Brother",
  STEP_FATHER = "Step-Father",
  STEP_MOTHER = "Step-Mother",
  SISTER = "Sister",
  GUARDIAN = "Guardian",
  GRANDPARENT = "Grandparent",
  GRANDMOTHER = "Grandmother",
  COUSIN = "Cousin",
  ADOPTED = "Adopted",
  CHILD = "Child",
}

export default class Relationship {
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
  static readonly Types = Relationships
}
