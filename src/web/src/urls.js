
import * as config from "./config";

export const LOGIN_URL = `${config.apiBaseUrl}/auth/login`;
export const AUTH_CHECK_URL = `${config.apiBaseUrl}/api/auth/isAuthenticated`;
export const LOGOUT_URL = `${config.apiBaseUrl}/api/auth/logout`;
export const PROFILE_URL = `${config.apiBaseUrl}/api/user`;

export const STATIC_URL = `${config.apiBaseUrl}/api/v1/data`;
export const PROVINCE_URL = `${STATIC_URL}/provinces`;
export const COUNTRY_URL = `${STATIC_URL}/country`;
export const CITY_URL = `${STATIC_URL}/city`;
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

export const APPLICATION_URL = `${config.apiBaseUrl}/api/v1/admin/application`;
export const STUDENT_URL = `${config.apiBaseUrl}/api/v1/admin/student`;
export const STUDENT_SEARCH_URL = `${config.apiBaseUrl}/api/v1/admin/student/search`;