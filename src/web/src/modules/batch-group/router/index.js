
export default [

    {
        path: "/administration/batch-group",
        name: "Batch group",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




