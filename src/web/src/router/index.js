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
import AdminInstitution from "../views/Administration/Institutions";
import Search from "../views/Search";

import ApplicationDetails from "../views/ApplicationDetails";
import StudentDetails from "../views/StudentDetails";
import Status from "../views/Status";
import AcademicYear from "../views/AcademicYear";
import SFAFundingRequests from "../views/SFAFundingRequests";
import ScholarshipApplications from "../views/ScholarshipApplications";
import CSLFundingRequests from "../views/CSLFundingRequests";
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
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/application/:id/personal",
    name: "ApplicationDetails",
    component: ApplicationDetails,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/application/:id/status",
    name: "Status",
    component: Status,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/application/:id/academic-year",
    name: "AcademicYear",
    component: AcademicYear,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/application/:id/sfa-funding-requests",
    name: "SFAFundingRequests",
    component: SFAFundingRequests,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/application/:id/scholarship-applications",
    name: "ScholarshipApplications",
    component: ScholarshipApplications,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/application/:id/csl-funding-requests",
    name: "CSLFundingRequests",
    component: CSLFundingRequests,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/application/:id/documentation",
    name: "Documentation",
    component: Documentation,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/student/:id",
    name: "StudentDetails",
    component: StudentDetails,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/administration",
    name: "AdministrationHome",
    component: AdministrationHome,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/administration/institutions",
    name: "AdminInstitution",
    component: AdminInstitution,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: {
      requiresAuth: true
    }
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

  store.dispatch("setAppSidebar", to.path.startsWith("/application") || to.path.startsWith("/student"))

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
