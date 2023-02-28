
export default [

    {
        path: "/administration/disability-service",
        name: "Disability Service",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




