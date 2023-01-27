
export default [

    {
        path: "/administration/student-category",
        name: "Student Category",
        component: () => { return import("../views/Main.vue") },
        meta: {
            requiresAuth: true
        }
    },
];




