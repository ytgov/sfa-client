export default [
  {
    path: "/administration",
    name: "AdministrationHome",
    component: () => import("../views/AdministrationHome.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/administration/reports",
    name: "AdministrationHome",
    component: () => import("../views/ReportHome.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];
