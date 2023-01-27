
export default [

    {
        path: "/administration/province",
        name: "AdminProvince",
        component: () => { return import("../views/ProvinceMain.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




