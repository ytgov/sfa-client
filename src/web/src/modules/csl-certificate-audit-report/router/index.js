export default [
  {
    path: "/administration/csl-certificate-audit-report",
    name: "AdminCslCertificateAuditReport",
    component: () => {
      return import("../views/CslCertificateAuditReport.vue");
    },
    meta: {
      requiresAuth: true,
    },
  },
];
