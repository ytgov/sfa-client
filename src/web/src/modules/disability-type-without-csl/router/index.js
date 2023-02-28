
export default [

    {
        path: "/administration/disability-type-without-csl",
        name: "Disability Type without CSL Code",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




