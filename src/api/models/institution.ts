export enum InstitutionNames {
  YUKON_UNIVERSITY = "Yukon University",
  ALKAN_AIR_FLIGHT_TRAINING = "Alkan Air Flight Training",
}

export interface InstitutionRecord {
  id: number
  name: string
  isActive: boolean
  federalInstitutionCode?: string
  institutionLevelId: number
}

interface Institution extends InstitutionRecord {}

class Institution {
  constructor(params: InstitutionRecord) {
    this.id = params.id
    this.name = params.name
    this.isActive = params.isActive
    this.federalInstitutionCode = params.federalInstitutionCode
    this.institutionLevelId = params.institutionLevelId
  }

  static readonly Names = InstitutionNames

  static isValidInstitutionName(institutionName: any): institutionName is InstitutionNames {
    return Object.values(InstitutionNames).includes(institutionName)
  }
}

export default Institution
