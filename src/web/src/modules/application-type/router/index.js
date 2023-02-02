
export default [

    {
        path: "/administration/application-type",
        name: "Application Type",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




