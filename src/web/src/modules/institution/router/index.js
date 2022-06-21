
export default [

    {
        path: "/administration/institutions",
        name: "AdminInstitution",
        component: () => { return import("../views/List.vue") },
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/administration/institutions/create",
        name: "AdminInstitutionCreate",
        component: () => { return import("../views/InstitutionCreate.vue") },
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/administration/institutions/:id",
        name: "AdminInstitutionEdit",
        component: () => { return import("../views/InstitutionEdit.vue") },
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/administration/institutions/:id/campus/:campus_id",
        name: "AdminCampusEdit",
        component: () => { return import("../views/CampusEdit.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




