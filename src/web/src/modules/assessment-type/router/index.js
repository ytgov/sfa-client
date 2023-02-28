
export default [

    {
        path: "/administration/assessment-type",
        name: "Assessment Type",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




