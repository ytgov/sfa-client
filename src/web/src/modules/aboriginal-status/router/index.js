
export default [

    {
        path: "/administration/aboriginal-status",
        name: "Aboriginal Status",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




