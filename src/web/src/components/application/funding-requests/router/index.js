
export default [
  {
    path: "/application/:id/funding-requests",
    name: "FundingRequests",
    component: () => import("../views/FundingRequestList.vue"),
    meta: {
      requiresAuth: true,
    },
  },
/*   {
    path: "/application/:id/funding-requests/:fundingRequestId",
    name: "FRCSGDEP",
    component: () => import("../views/CSGFTDEP.vue"),
    meta: {
      requiresAuth: true,
    },
  }, */
];
