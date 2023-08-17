export default [
  {
    path: "/administration/csl-restricted-data",
    name: "AdminChequeReq",
    component: () => {
      return import("../views/CSLRestrictedData.vue");
    },
    meta: {
      requiresAuth: true,
    },
  },
];
