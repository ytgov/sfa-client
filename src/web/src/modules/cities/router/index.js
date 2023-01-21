
export default [

    {
        path: "/administration/cities",
        name: "AdminCities",
        component: () => { return import("../views/CitiesMain.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




