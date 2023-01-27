
import * as config from "./config";

export const LOGIN_URL = `${config.apiBaseUrl}/auth/login`;
export const AUTH_CHECK_URL = `${config.apiBaseUrl}/api/auth/isAuthenticated`;
export const LOGOUT_URL = `${config.apiBaseUrl}/api/auth/logout`;
export const PROFILE_URL = `${config.apiBaseUrl}/api/user`;

export const STATIC_URL = `${config.apiBaseUrl}/api/v1/data`;
export const LANGUAGE_URL = `${STATIC_URL}/languages`;
export const ABORIGINAL_STATUS_URL = `${STATIC_URL}/aboriginalstatus`;
export const FIRST_NATIONS_URL = `${STATIC_URL}/firstnations`;
export const MARITAL_URL = `${STATIC_URL}/maritalstatus`;
export const HIGH_SCHOOOL_URL = `${STATIC_URL}/highschools`;
export const EDUCATION_LEVEL_URL = `${STATIC_URL}/educationlevel`;
export const RELATIONSHIP_URL = `${STATIC_URL}/relationships`;
export const REQUIREMENT_TYPE_URL =`${STATIC_URL}/requirementtypes`;
export const FUNDING_TYPE_URL =`${STATIC_URL}/requesttypes`;
export const FUNDING_STATUS_URL =`${STATIC_URL}/status`;
export const FUNDING_REASON_URL =`${STATIC_URL}/statusreasons`;
export const CATEGORY_URL=`${STATIC_URL}/studentcategory`;
export const AGENCY_URL=`${STATIC_URL}/agency`;
export const PROGRAM_AREA_URL=`${STATIC_URL}/studyareas`;
export const PROGRAM_TYPE_URL=`${STATIC_URL}/programs`;
export const PROGRAM_DIVISION_URL=`${STATIC_URL}/programdivisions`;

export const REFERENCE_BASE_URL = `${config.apiBaseUrl}/api/v2/reference`;
export const CITY_URL = `${REFERENCE_BASE_URL}/city`;
export const PROVINCE_URL = `${REFERENCE_BASE_URL}/province`;
export const COUNTRY_URL = `${REFERENCE_BASE_URL}/country`;
export const INSTITUTION_LEVEL_URL=`${REFERENCE_BASE_URL}/institution_level`;


export const APPLICATION_URL = `${config.apiBaseUrl}/api/v2/admin/application`;
export const STUDENT_URL = `${config.apiBaseUrl}/api/v2/admin/student`;
export const STUDENT_SEARCH_URL = `${config.apiBaseUrl}/api/v2/admin/student/search`;
export const INSTITUTION_URL=`${config.apiBaseUrl}/api/v2/admin/institution`;
export const ACADEMIC_YEAR_URL=`${config.apiBaseUrl}/api/v2/admin/academic-year`;
export const PROVINCE=`${config.apiBaseUrl}/api/v2/admin/province`;
export const COUNTRIES=`${config.apiBaseUrl}/api/v2/admin/countries`;
export const CITIES=`${config.apiBaseUrl}/api/v2/admin/cities`;
export const ADDRESS_TYPE=`${config.apiBaseUrl}/api/v2/admin/address-type`;
export const INDIGENOUS_LERNER=`${config.apiBaseUrl}/api/v2/admin/indigenous-learner`;
export const LANGUAGE=`${config.apiBaseUrl}/api/v2/admin/language`;
export const MARITAL_STATUS=`${config.apiBaseUrl}/api/v2/admin/marital-status`;
export const STUDY_FIELD =`${config.apiBaseUrl}/api/v2/admin/study-field`;
export const PARENTAL_RELATIONSHIP =`${config.apiBaseUrl}/api/v2/admin/parental-relationship`;
export const FIRST_NATION =`${config.apiBaseUrl}/api/v2/admin/first-nation`;
export const PORTAL_STATUS =`${config.apiBaseUrl}/api/v2/admin/portal-status`;
