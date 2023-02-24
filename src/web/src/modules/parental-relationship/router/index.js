
export default [

    {
        path: "/administration/parental-relationship",
        name: "AdminParentalRelationship",
        component: () => { return import("../views/ParentalRelationshipMain.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




