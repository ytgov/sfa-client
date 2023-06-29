export default [
  {
    path: "/administration/officers",
    name: "AdminOfficers",
    component: () => {
      return import("../views/OfficerList.vue");
    },
    meta: {
      requiresAuth: true,
    },
  },
];
