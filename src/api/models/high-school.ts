enum SpecialTypesOfHighSchools {
  NOT_LISTED = 0,
}

export interface HighSchoolRecord {
  id: number
  name: string
  cityId: number
  provinceId: number
  countryId: number
  isActive: boolean
}

interface HighSchool extends HighSchoolRecord {}

class HighSchool {
  static readonly SpecialTypes = SpecialTypesOfHighSchools
}

export default HighSchool
