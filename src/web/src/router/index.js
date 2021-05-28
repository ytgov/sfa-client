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
import Administration from "../views/Administration";
import Search from "../views/Search";

import Personal from "../views/Personal";
import Status from "../views/Status";
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
    path: "/application/:id/personal",
    name: "Personal",
    component: Personal,
    meta: {
      //requiresAuth: true
    }
  },
  {
    path: "/application/:id/status",
    name: "Status",
    component: Status
  },
  {
    path: "/application/:id/academic-year",
    name: "AcademicYear",
    component: AcademicYear
  },
  {
    path: "/application/:id/other-agencies-funding",
    name: "OtherAgencyFunding",
    component: OtherAgencyFunding
  },
  {
    path: "/application/:id/sfa-funding-requests",
    name: "SFAFundingRequests",
    component: SFAFundingRequests
  },

  {
    path: "/application/:id/education-history",
    name: "EducationHistory",
    component: EducationHistory
  },
  {
    path: "/application/:id/student-dependents",
    name: "StudentDependents",
    component: StudentDependents
  },
  {
    path: "/application/:id/scholarship-applications",
    name: "ScholarshipApplications",
    component: ScholarshipApplications
  },
  {
    path: "/application/:id/csl-funding-requests",
    name: "CSLFundingRequests",
    component: CSLFundingRequests
  },
  {
    path: "/application/:id/accommodation",
    name: "Accommodation",
    component: Accommodation
  },
  {
    path: "/application/:id/expenses",
    name: "Expenses",
    component: Expenses
  },
  {
    path: "/application/:id/income",
    name: "Income",
    component: Income
  },
  {
    path: "/application/:id/parent-information",
    name: "ParentInformation",
    component: ParentInformation
  },
  {
    path: "/application/:id/spouse",
    name: "Spouse",
    component: Spouse
  },
  {
    path: "/application/:id/documentation",
    name: "Documentation",
    component: Documentation
  },

  {
    path: "/reports",
    name: "Reports",
    component: Reports
  },
  {
    path: "/administration",
    name: "Administration",
    component: Administration
  },
  {
    path: "/search",
    name: "Search",
    component: Search
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

  store.dispatch("setAppSidebar", to.path.startsWith("/application"))

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
