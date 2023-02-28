
export default [

    {
        path: "/administration/funding-group",
        name: "Funding Group",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




