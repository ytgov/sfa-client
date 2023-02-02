
export default [

    {
        path: "/administration/language",
        name: "AdminLanguage",
        component: () => { return import("../views/LanguageMain.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




