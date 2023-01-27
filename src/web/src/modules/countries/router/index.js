
export default [

    {
        path: "/administration/countries",
        name: "AdminCountries",
        component: () => { return import("../views/CountriesMain.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




