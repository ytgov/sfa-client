export default [
  {
    path: "/administration/csl_codes",
    name: "AdminCslCodes",
    component: () => {
      return import("../views/CitiesMain.vue");
    },
    meta: {
      requiresAuth: true,
    },
  },
];
