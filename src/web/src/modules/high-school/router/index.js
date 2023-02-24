
export default [

    {
        path: "/administration/high-school",
        name: "High School",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




