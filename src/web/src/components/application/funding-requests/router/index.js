export default [
  {
    path: "/application/:id/funding-requests",
    name: "FundingRequests",
    component: () => import("../views/FundingRequestList.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/application/:id/csgd/:fundingRequestId",
    name: "FR_CSGD",
    component: () => import("../../assessments/views/CSGD.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/csgdse/:fundingRequestId",
    name: "FR_CSGDSE",
    component: () => import("../../assessments/views/CSGDSE.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/csgft/:fundingRequestId",
    name: "FR_CSGFT",
    component: () => import("../../assessments/views/CSGFT.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/csgftdep/:fundingRequestId",
    name: "FR_CSGFTDEP",
    component: () => import("../../assessments/views/CSGFTDEP.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/csgtp/:fundingRequestId",
    name: "FR_CSGTP",
    component: () => import("../../assessments/views/CSGTP.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/cslpt/:fundingRequestId",
    name: "FR_CSLPT",
    component: () => import("../../assessments/views/CSLPT.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/scholarship-army/:fundingRequestId",
    name: "FR_CSLPT",
    component: () => import("../../assessments/views/Scholarship-Army.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/scholarship-huskys/:fundingRequestId",
    name: "FR_CSLPT",
    component: () => import("../../assessments/views/Scholarship-Huskys.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/scholarship-harach/:fundingRequestId",
    name: "FR_CSLPT",
    component: () => import("../../assessments/views/Scholarship-Harach.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/application/:id/cslft/:fundingRequestId/:assessmentId?",
    name: "FR_CSLFT",
    component: () => import("../../assessments/views/CSLFT.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];
