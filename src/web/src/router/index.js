import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import NotFound from "../views/NotFound.vue";
import Login from "../views/Login";
import LoginComplete from "../views/LoginComplete";
import Profile from "../views/Profile";
import store from "../store";

import Reports from "../views/Reports";
import AdministrationHome from "../views/Administration/AdministrationHome";
import Search from "../views/Search";

import ApplicationDetails from "../components/application/ApplicationDetails";
import FamilyInfo from "../components/application/family-info/FamilyInfo";
import StudentDetails from "../components/student/StudentDetails";
import CommunicationsLog from "../components/student/CommunicationsLog";
import Status from "../components/application/Status";
import AcademicYear from "../components/application/AcademicYear";
import SFAFundingRequests from "../components/application/sfa-funding-requests/SFAFundingRequests";
import ScholarshipApplications from "../components/application/sfa-funding-requests/scholarships/ScholarshipApplications";
import CSFAFundingRequests from "../components/application/csfa-funding-requests/CSFAFundingRequests";
import CSFANeedsAssessment from "../components/application/csfa-needs-assessment/CSFANeedsAssessment";
import Documentation from "../components/application/Documentation";

import GrantforMatureLearnersTop_Up from "../components/application/csfa-needs-assessment/GrantforMatureLearnersTop_Up.vue";
import YukonHuskysCBRadioClubScholarship from "../components/application/csfa-needs-assessment/YukonHuskysCBRadioClubScholarship.vue";
import NicholasJohnHarachScholarship from "../components/application/csfa-needs-assessment/NicholasJohnHarachScholarship.vue";
import CSLFT from "../components/application/csfa-needs-assessment/CSLFT.vue";
import CSLPT from "../components/application/csfa-needs-assessment/CSLPT.vue";
import CSGPTDEP from "../components/application/csfa-needs-assessment/CSGPTDEP.vue";
import CSGPT from "../components/application/csfa-needs-assessment/CSGPT.vue";
import CSGDSE from "../components/application/csfa-needs-assessment/CSGDSE.vue";
import CSGTP from "../components/application/csfa-needs-assessment/CSGTP.vue";
import CSGD from "../components/application/csfa-needs-assessment/CSGD.vue";
import CSGFTDEP from "../components/application/csfa-needs-assessment/CSGFTDEP.vue";
import CSGFT from "../components/application/csfa-needs-assessment/CSGFT.vue";
import CanadianArmyScholarship from "../components/application/csfa-needs-assessment/CanadianArmyScholarship.vue";
import TrainingAllowance from "../components/application/csfa-needs-assessment/TrainingAllowance.vue";
import YukonGrant from "../components/application/csfa-needs-assessment/YukonGrant.vue";
import YukonExcellenceAwards from "../components/application/csfa-needs-assessment/YukonExcellenceAwards.vue";

import StudentModuleRoutes from "@/modules/student/router";
import ApplicationTypeModuleRooutes from "@/modules/application-type/router";
import InstitutionModuleRoutes from "@/modules/institution/router";
import CslCertificateExportModuleRoutes from "@/modules/csl-certificate-export/router";
import CslMsfaaReceiveModuleRoutes from "@/modules/csl-msfaa-receive/router";
import CslEntitlementFeedbackModuleRoutes from "@/modules/csl-entitlement-feedback/router";
import ProvinceModuleRoutes from "@/modules/province/router";
import CountriesModuleRoutes from "@/modules/countries/router";
import CitiesModuleRoutes from "@/modules/cities/router";
import AddressTypeModuleRoutes from "@/modules/address-type/router";
import IndigenousLearnerModuleRoutes from "@/modules/indigenous-learner/router";
import languageModuleRoutes from "@/modules/language/router";
import maritalStatusModuleRoutes from "@/modules/marital-status/router";
import studyFieldModuleRoutes from "@/modules/study-field/router";
import parentalRelationshipModuleRoutes from "@/modules/parental-relationship/router";
import firstNationModuleRoutes from "@/modules/first-nation/router";
import portalStatusModuleRoutes from "@/modules/portal-status/router";
import sexModuleRoutes from "@/modules/sex/router";
import institutionLevelModuleRoutes from "@/modules/institution-level/router";
import ageDistributionModuleRoutes from "@/modules/age-distribution/router";
import highSchoolModuleRoutes from "@/modules/high-school/router";
import assessmentTypeModuleRoutes from "@/modules/assessment-type/router";
import studentCategoryModuleRoutes from "@/modules/student-category/router";
import batchGroupModuleRoutes from "@/modules/batch-group/router";
import educationLevelModuleRoutes from "@/modules/education-level/router";
import reasonsForChangeModuleRoutes from "@/modules/reasons-for-change/router";
import disbursementTypeModuleRoutes from "@/modules/disbursement-type/router";
import statusModuleRoutes from "@/modules/status/router";
import statusReasonModuleRoutes from "@/modules/status-reason/router";
import yukonGrantEligibilityRoutes from "@/modules/yukon-grant-eligibility/router";
import fundingGroupRoutes from "@/modules/funding-group/router";
import disabilityTypeRoutes from "@/modules/disability-type/router";
import disabilityTypeWithoutCSLRoutes from "@/modules/disability-type-without-csl/router";
import aboriginalStatusRoutes from "@/modules/aboriginal-status/router";
import disabilityServiceRoutes from "@/modules/disability-service/router";
import officerRoutes from "@/modules/officer/router";
import ChequeReqListModuleRoutes from "@/modules/cheque-req-list/router";
import CslCertificateAuditReportRoutes from "@/modules/csl-certificate-audit-report/router";
import CslMsfaaSendRoutes from "@/modules/csl-msfaa-send/router";
import CSLRestrictedDataModuleRoutes from "@/modules/csl-restricted-data/router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/application/:id/personal",
    name: "ApplicationDetails",
    component: ApplicationDetails,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/family-info",
    name: "FamilyInfo",
    component: FamilyInfo,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/status",
    name: "Status",
    component: Status,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/academic-year",
    name: "AcademicYear",
    component: AcademicYear,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/sfa-funding-requests",
    name: "SFAFundingRequests",
    component: SFAFundingRequests,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/scholarship-applications",
    name: "ScholarshipApplications",
    component: ScholarshipApplications,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/csfa-funding-requests",
    name: "CSFAFundingRequests",
    component: CSFAFundingRequests,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/csfa-needs-assessment",
    name: "CSFANeedsAssessment",
    component: CSFANeedsAssessment,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/documentation",
    name: "Documentation",
    component: Documentation,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/assessment/canadian-armys-cholarship/0",
    name: "CanadianArmyScholarship",
    component: CanadianArmyScholarship,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/assessment/nicholas-john-harach-scholarship/0",
    name: "NicholasJohnHarachScholarship",
    component: NicholasJohnHarachScholarship,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/assessment/yukon-huskys-CB-Radio-Club-Scholarship/0",
    name: "YukonHuskysCBRadioClubScholarship",
    component: YukonHuskysCBRadioClubScholarship,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/assessment/Grant-for-Mature-Learners-Top-Up/0",
    name: "GrantforMatureLearnersTop_Up",
    component: GrantforMatureLearnersTop_Up,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/assessment/training-allowance/0",
    name: "CanadianArmyScholarship",
    component: TrainingAllowance,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/assessment/yukon-grant/0",
    name: "YukonGrant",
    component: YukonGrant,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/assessment/yukon-excellence-awards/0",
    name: "YukonExcellenceAwards",
    component: YukonExcellenceAwards,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/assessment/csgft/0",
    name: "CSGFT",
    component: CSGFT,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/assessment/csgftdep/0",
    name: "CSGFTDEP",
    component: CSGFTDEP,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/assessment/csgd/0",
    name: "CSGD",
    component: CSGD,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/assessment/csgtp/0",
    name: "CSGTP",
    component: CSGTP,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/assessment/csgdse/0",
    name: "CSGTP",
    component: CSGDSE,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/assessment/csgpt/0",
    name: "CSGPT",
    component: CSGPT,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/assessment/csgptdep/0",
    name: "CSGPTDEP",
    component: CSGPTDEP,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/assessment/cslpt/0",
    name: "CSLPT",
    component: CSLPT,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/assessment/CSLFT/0",
    name: "CSLFT",
    component: CSLFT,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/student/:id",
    name: "StudentDetails",
    component: StudentDetails,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/communications-log/:id",
    name: "CommunicationsLog",
    component: CommunicationsLog,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/administration",
    name: "AdministrationHome",
    component: AdministrationHome,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/sign-in",
    name: "Login",
    component: Login,
  },
  {
    path: "/login-complete",
    name: "LoginComplete",
    component: LoginComplete,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },

  ...ApplicationTypeModuleRooutes,
  ...StudentModuleRoutes,
  ...InstitutionModuleRoutes,
  ...CslCertificateExportModuleRoutes,
  ...CslMsfaaReceiveModuleRoutes,
  ...CslEntitlementFeedbackModuleRoutes,
  ...ProvinceModuleRoutes,
  ...CountriesModuleRoutes,
  ...CitiesModuleRoutes,
  ...AddressTypeModuleRoutes,
  ...IndigenousLearnerModuleRoutes,
  ...languageModuleRoutes,
  ...maritalStatusModuleRoutes,
  ...studyFieldModuleRoutes,
  ...parentalRelationshipModuleRoutes,
  ...firstNationModuleRoutes,
  ...portalStatusModuleRoutes,
  ...sexModuleRoutes,
  ...studentCategoryModuleRoutes,
  ...institutionLevelModuleRoutes,
  ...ageDistributionModuleRoutes,
  ...highSchoolModuleRoutes,
  ...assessmentTypeModuleRoutes,
  ...batchGroupModuleRoutes,
  ...educationLevelModuleRoutes,
  ...reasonsForChangeModuleRoutes,
  ...disbursementTypeModuleRoutes,
  ...statusModuleRoutes,
  ...statusReasonModuleRoutes,
  ...yukonGrantEligibilityRoutes,
  ...fundingGroupRoutes,
  ...disabilityTypeRoutes,
  ...disabilityTypeWithoutCSLRoutes,
  ...aboriginalStatusRoutes,
  ...disabilityServiceRoutes,
  ...officerRoutes,
  ...ChequeReqListModuleRoutes,
  ...CslCertificateAuditReportRoutes,
  ...CslMsfaaSendRoutes,
  ...CSLRestrictedDataModuleRoutes,

  {
    path: "*",
    name: "Not Found",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  var requiresAuth = to.meta.requiresAuth || false;

  store.dispatch("setAppSidebar", to.path.startsWith("/application") || to.path.startsWith("/student"));
  store.dispatch("setAppSideBarAdmin", to.path.startsWith("/administration"));

  if (!requiresAuth) {
    return next();
  }

  await store.dispatch("checkAuthentication");
  var isAuthenticated = store.getters.isAuthenticated;

  if (requiresAuth && !isAuthenticated) {
    console.log("You aren't authenticatd, redirecting to sign-in");
    next("/sign-in");
    return;
  }

  return next();
});

export default router;
