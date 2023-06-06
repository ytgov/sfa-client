export default [
  {
    path: "/administration/requirement_type",
    name: "AdminReqType",
    component: () => {
      return import("../views/CitiesMain.vue");
    },
    meta: {
      requiresAuth: true,
    },
  },
];
