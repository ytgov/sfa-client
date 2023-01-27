
export default [

    {
        path: "/administration/indigenous-learner",
        name: "AdminIndigenousLearner",
        component: () => { return import("../views/IndigenousLearnerMain.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




