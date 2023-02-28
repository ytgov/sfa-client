
export default [

    {
        path: "/administration/status",
        name: "Status",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




