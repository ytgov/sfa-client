
export default [

    {
        path: "/administration/address-type",
        name: "AdminAddresType",
        component: () => { return import("../views/AddressTypeMain.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




