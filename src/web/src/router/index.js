import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import NotFound from "../views/NotFound.vue";
import Login from "../views/Login";
import LoginComplete from "../views/LoginComplete";
import Profile from "../views/Profile";
import store from "../store";

import Personal from "../views/Personal";
import Status from "../views/Status";
import ResidenceHistory from "../views/ResidenceHistory";
import AcademicYear from "../views/AcademicYear";
import OtherAgencyFunding from "../views/OtherAgencyFunding";
import SFAFundingRequests from "../views/SFAFundingRequests";
import EducationHistory from "../views/EducationHistory";
import StudentDependents from "../views/StudentDependents";
import ScholarshipApplications from "../views/ScholarshipApplications";
import CSLFundingRequests from "../views/CSLFundingRequests";
import Accommodation from "../views/Accommodation";
import Expenses from "../views/Expenses";
import Income from "../views/Income";
import ParentInformation from "../views/ParentInformation";
import Spouse from "../views/Spouse";
import Documentation from "../views/Documentation";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },

  {
    path: "/personal",
    name: "Personal",
    component: Personal
  },
  {
    path: "/status",
    name: "Status",
    component: Status
  },
  {
    path: "/residence-history",
    name: "ResidenceHistory",
    component: ResidenceHistory
  },
  
  {
    path: "/academic-year",
    name: "AcademicYear",
    component: AcademicYear
  },
  {
    path: "/other-agencies-funding",
    name: "OtherAgencyFunding",
    component: OtherAgencyFunding
  },
  {
    path: "/sfa-funding-requests",
    name: "SFAFundingRequests",
    component: SFAFundingRequests
  },

  {
    path: "/education-history",
    name: "EducationHistory",
    component: EducationHistory
  },
  {
    path: "/student-dependents",
    name: "StudentDependents",
    component: StudentDependents
  },
  {
    path: "/scholarship-applications",
    name: "ScholarshipApplications",
    component: ScholarshipApplications
  },
  {
    path: "/csl-funding-requests",
    name: "CSLFundingRequests",
    component: CSLFundingRequests
  },
  {
    path: "/accommodation",
    name: "Accommodation",
    component: Accommodation
  },
  {
    path: "/expenses",
    name: "Expenses",
    component: Expenses
  },
  {
    path: "/income",
    name: "Income",
    component: Income
  },
  {
    path: "/parent-information",
    name: "ParentInformation",
    component: ParentInformation
  },
  {
    path: "/spouse",
    name: "Spouse",
    component: Spouse
  },
  {
    path: "/documentation",
    name: "Documentation",
    component: Documentation
  },









  {
    path: "/sign-in",
    name: "Login",
    component: Login
  },
  {
    path: "/login-complete",
    name: "LoginComplete",
    component: LoginComplete
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "*",
    name: "Not Found",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  var requiresAuth = to.meta.requiresAuth || false;

  if (!requiresAuth) {
    return next();
  }

  await store.dispatch("checkAuthentication");
  var isAuthenticated = store.getters.isAuthenticated;

  if (requiresAuth && !isAuthenticated) {
    console.log("You aren't authenticatd, redirecting to sign-in")
    next("/sign-in");
    return;
  }

  return next();
});

export default router;
