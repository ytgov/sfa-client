
export default [

    {
        path: "/administration/age-distribution",
        name: "Age",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




