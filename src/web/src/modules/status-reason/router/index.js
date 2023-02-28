
export default [

    {
        path: "/administration/status-reason",
        name: "Status Reason",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




