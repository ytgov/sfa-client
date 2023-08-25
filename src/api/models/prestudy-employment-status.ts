// TODO: question whether this should be in the database at all.
// And if so, why is it its own table?
enum EmploymentStatuses {
  UNEMPLOYED = "Unemployed",
  EMPLOYED = "Employed",
}

enum EmploymentStatusesUI {
  EMPLOYED = "Employed",
  NOT_EMPLOYED = "Not Employed",
  UNKNOWN = "Unknown"
}

export default class PrestudyEmploymentStatus {
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
  static readonly Statuses = EmploymentStatuses
  static readonly StatusesUI = EmploymentStatusesUI

  isUnemployed(): boolean {
    return this.description.includes(EmploymentStatuses.UNEMPLOYED)
  }

  isEmployed(): boolean {
    return this.description.includes(EmploymentStatuses.EMPLOYED)
  }
}
