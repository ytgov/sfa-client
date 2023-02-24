
export default [

    {
        path: "/administration/marital-status",
        name: "AdminMaritalStatus",
        component: () => { return import("../views/MaritalStatusMain.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




