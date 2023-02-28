
export default [

    {
        path: "/administration/reasons-for-change",
        name: "Reasons for Change",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




