export default [
  {
    path: "/administration/csl-msfaa-send",
    name: "AdminCslMsfaaSend",
    component: () => {
      return import("../views/CslMsfaaSend.vue");
    },
    meta: {
      requiresAuth: true,
    },
  },
];
