
export default [

    {
        path: "/administration/education-level",
        name: "Education Level",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




