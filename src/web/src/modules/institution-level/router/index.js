
export default [

    {
        path: "/administration/institution-level",
        name: "Institution Level",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




