export enum RequestTypes {
  STUDENT_TRAINING_ALLOWANCE = 1,
  YUKON_GRANT = 2,
  YUKON_EXCELLENCE_AWARDS = 3,
  CANADA_STUDENT_LOAN_FULL_TIME = 4,
  CANADA_STUDENT_LOAN_PART_TIME = 5,
  CANADA_STUDY_GRANT_HIGH_NEED_DISABILITY = 6,
  CANADIAN_ARMY_SCHOLARSHIP = 7,
  VANCOUVER_YUKONERS_ASSOCIATION_MEMORIAL_SCHOLARSHIP = 8,
  NICHOLAS_JOHN_HARACH_SCHOLARSHIP = 9,
  YUKON_ART_SOCIETY_SCHOLARSHIP = 10,
  YUKON_HUSKYS_CB_RADIO_CLUB_SCHOLARSHIP = 11,
  CANADA_STUDY_GRANT_DISABILITY = 15,
  CANADA_STUDY_GRANT_DOCTORAL = 16,
  CANADA_STUDY_GRANT_DEPENDENTS = 17,
  CANADA_STUDY_GRANT_HIGH_NEED_PART_TIME = 18,
  CANADA_MILLENNIUM_BURSARY = 19,
  LULU_FAIRBANKS_MEMORIAL_SCHOLARSHIP = 20,
  SFA_GENERAL = 21,
  CANADA_ACCESS_GRANT_FOR_STUDENTS_WITH_PERMANENT_DISABILITIES = 22,
  CANADA_ACCESS_GRANT_FOR_STUDENTS_FROM_LOW_INCOME_FAMILIES = 23,
  CANADA_MILLENNIUM_ACCESS_BURSARY = 24,
  CANADA_BASKETBALL_SCHOLARSHIP = 25,
  TRANSITION_GRANT = 26,
  GRANT_FOR_STUDENTS_FROM_LOW_INCOME_FAMILIES = 27,
  GRANT_FOR_MATURE_LEARNERS_TOP_UP = 28,
  GRANT_FOR_STUDENTS_WITH_PERMANENT_DISABILITIES = 29,
  GRANT_FOR_SERVICES_EQUIPMENT_FOR_PD_STUDENTS = 30,
  GRANT_FOR_PART_TIME_STUDIES = 31,
  GRANT_FOR_STUDENTS_WITH_DEPENDENTS_FT = 32,
  GRANT_FOR_STUDENTS_WITH_DEPENDENTS_PT = 33,
  GRANT_FOR_STUDENTS_WITH_PERMANENT_DISABILITIES_PT = 34,
  GRANT_FOR_FULL_TIME_STUDENTS = 35,
  MATURE = 41,
}

interface RequestTypeRecord {
  id: number;
  applicationTypeId?: number;
  fundingGroupId?: number;
  batchGroupId?: number;
  description?: string;
  scholarshipFlag: number;
  applicationDeadline?: string;
  regulation?: string;
  programType?: string;
  staticDescriptionFlag?: number;
  financialCoding?: string;
  t4aRequired: boolean;
  csgOtherFlag?: number;
  glBudget?: number;
  autoAppear?: string;
  showOnline: boolean;
  shortName?: string;
  helpUrl?: string;
  helpText?: string;
  isActive: boolean;
}

interface RequestType extends RequestTypeRecord {}

class RequestType {
  constructor(params: RequestTypeRecord) {
    this.id = params.id;
    this.applicationTypeId = params.applicationTypeId;
    this.fundingGroupId = params.fundingGroupId;
    this.batchGroupId = params.batchGroupId;
    this.description = params.description;
    this.scholarshipFlag = params.scholarshipFlag;
    this.applicationDeadline = params.applicationDeadline;
    this.regulation = params.regulation;
    this.programType = params.programType;
    this.staticDescriptionFlag = params.staticDescriptionFlag;
    this.financialCoding = params.financialCoding;
    this.t4aRequired = params.t4aRequired;
    this.csgOtherFlag = params.csgOtherFlag;
    this.glBudget = params.glBudget;
    this.autoAppear = params.autoAppear;
    this.showOnline = params.showOnline;
    this.shortName = params.shortName;
    this.helpUrl = params.helpUrl;
    this.helpText = params.helpText;
    this.isActive = params.isActive;
  }

  // not in database
  static readonly Types = RequestTypes;

  static isValidRequestType(requestType: any): requestType is RequestTypes {
    return Object.values(RequestTypes).includes(requestType);
  }
}

export default RequestType;
