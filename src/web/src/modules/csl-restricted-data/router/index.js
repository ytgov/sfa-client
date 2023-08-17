export default [
  {
    path: "/administration/csl-restricted-data",
    name: "AdminCSLRestricted",
    component: () => {
      return import("../views/CSLRestrictedData.vue");
    },
    meta: {
      requiresAuth: true,
    },
  },
];
