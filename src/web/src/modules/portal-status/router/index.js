
export default [

    {
        path: "/administration/portal-status",
        name: "Portal Status",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




