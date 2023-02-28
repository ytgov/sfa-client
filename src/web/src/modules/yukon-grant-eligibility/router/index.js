
export default [

    {
        path: "/administration/yukon-grant-eligibility",
        name: "Yukon Grant Eligibility",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




