export default [
  {
    path: "/administration/csl-msfaa-receive",
    name: "AdminCslMsfaaReceive",
    component: () => {
      return import("../views/CslMsfaaReceive.vue");
    },
    meta: {
      requiresAuth: true,
    },
  },
];
