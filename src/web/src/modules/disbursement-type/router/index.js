
export default [

    {
        path: "/administration/disbursement-type",
        name: "Disbursement Type",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




