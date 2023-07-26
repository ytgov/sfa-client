export default [
  {
    path: "/administration/csl-certificate-export",
    name: "AdminCslCodes",
    component: () => {
      return import("../views/CslCertificateExport.vue");
    },
    meta: {
      requiresAuth: true,
    },
  },
];
