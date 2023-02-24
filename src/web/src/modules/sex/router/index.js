
export default [

    {
        path: "/administration/sex",
        name: "Sex",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




