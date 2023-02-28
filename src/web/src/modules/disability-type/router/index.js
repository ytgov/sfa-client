
export default [

    {
        path: "/administration/disability-type",
        name: "Disability Type with CSL Code",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




