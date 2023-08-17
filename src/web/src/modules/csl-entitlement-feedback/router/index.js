
export default [
    {
      path: "/administration/csl-entitlement-feedback",
      name: "AdminCslEntitlementFeedback",
      component: () => {
        return import("../views/CSLEntitlementFeedback.vue");
      },
      meta: {
        requiresAuth: true,
      },
    },
  ];