
export default [
    {
        path: "/administration/students",
        component: () => { return import("../views/StudentMain.vue") },
        meta: { requiresAuth: true },
        children: [
            {
                path: "",
                name: "StudentList",
                component: () => { return import("../views/StudentList.vue") },
            },
            {
                path: ":id",
                name: "StudentDetail",
                component: () => { return import("../views/StudentDetail.vue") },
            }
        ]
    }
];
