
export default [

    {
        path: "/administration/first-nation",
        name: "AdminFirstNation",
        component: () => { return import("../views/FirstNationMain.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




