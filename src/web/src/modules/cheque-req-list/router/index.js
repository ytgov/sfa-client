export default [
  {
    path: "/administration/cheque-req-list",
    name: "AdminChequeReq",
    component: () => {
      return import("../views/ChequeReqList.vue");
    },
    meta: {
      requiresAuth: true,
    },
  },
];
